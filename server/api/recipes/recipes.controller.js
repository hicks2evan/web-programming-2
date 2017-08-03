'use strict';

import {Recipe, Ingredient} from './recipes.model';
import {Review} from './reviews/reviews.model';


// Find all Recipes
export function index(req, res) {
  Recipe.find()
     .populate('ingredients.ingredient')
     .populate({
       path: 'reviews',
       model: Review,
       populate: [{
         path: 'reviews.review'
       }]
     })
    .exec()
    // This then method will only be called if the query was successful, so no need to error check!
    .then(function(recipes) {
      res.json(recipes);
    })
    /*
     Any errors encountered here must be server side, since there are no arguments to the find
     Return 500 (server error) and send the error encountered back to the requester
    */
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one recipe
export function show(req, res) {
  Recipe.findById(req.params.id)
     .populate('ingredients.ingredient')
     .populate({
       path: 'reviews',
       model: Review,
       populate: [{
         path: 'reviews.review'
       }]
     })
    .exec()
    .then(function(existingRecipe) {
      /*
       findById will return null if the object was not found
       This if check will evaluate to false for a null recipe
      */
      if(existingRecipe) {
        // Recipe was found by Id
        res.status(200);
        res.json(existingRecipe);
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new recipe
export function create(req, res) {
  //let ingredients = req.body.ingredients;
  var recipe = req.body;
  recipe.reviews = Reviews.find;
  var ingredientsArray = [];
  var counter = 1;
  req.body.ingredients.forEach(function(anIngredient) {
    Ingredient.create(anIngredient)
        .then(function(createdIngredient) {
          ingredientsArray.push(createdIngredient);
          if(counter >= req.body.ingredients.length) {
            recipe.ingredients = ingredientsArray;
            Recipe.create(recipe)
                 .then(function(createdRecipe) {
                   res.status(201);
                   res.json(createdRecipe);
                 })
                 .catch(function(err) {
                   res.status(400);
                   res.send(err);
                 });
          }
          counter++;
        });
  });
}

// Update a recipe
export function update(req, res) {
  // This value will be set by the successful update of the user so that it can be returned
  var updatedRecipe;
  // Start by trying to find the user by its id
  Recipe.findById(req.params.id)
    //.populate('ingredients')
    .exec()
    // Update user and address
    .then(function(existingRecipe) {
      // If recipe exists, update all fields of the object
      if(existingRecipe) {
        var ingredientsArray = [];
        var counter = 1;
        req.body.ingredients.forEach(function(anIngredient) {
          Ingredient.create(anIngredient)
               .then(function(createdIngredient) {
                 ingredientsArray.push(createdIngredient);
                 if(counter >= req.body.ingredients.length) {
                   existingRecipe.ingredients = ingredientsArray;
                 }
                 counter++;
               });
        });
        existingRecipe.name = req.body.name;
        existingRecipe.description = req.body.description;
        existingRecipe.pictureURL = req.body.pictureURL;
        existingRecipe.prepTime = req.body.prepTime;
        existingRecipe.cookTime = req.body.cookTime;
        existingRecipe.directions = req.body.directions;

         // Set externally declared updatedRecipe so that later promise can return it
        updatedRecipe = existingRecipe;

        return Promise.all([
          //existingRecipe.ingredients.save(),
          existingRecipe.save()
        ]);
      } else {
        // User was not found
        return null;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the recipe was not found
    .then(function(savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (recipe was found)
      if(savedObjects) {
        res.status(200);
        res.json(updatedRecipe);
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Error encountered during the save of the recipe or ingredients
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a recipe
export function destroy(req, res) {
  Recipe.findById(req.params.id)
    .populate('ingredients.ingredient')
     .populate({
       path: 'reviews',
       model: Review,
       populate: [{
         path: 'reviews.review'
       }]
     })
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        return Promise.all([
          existingRecipe.ingredients.remove(),
          existingRecipe.reviews.remove(),
          existingRecipe.remove()
        ]);
      } else {
        return null;
      }
    })
    // Delete was successful
    .then(function(recipe) {
      if(recipe) {
        res.status(204).send();
      } else {
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Recipe or ingredient delete failed
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

