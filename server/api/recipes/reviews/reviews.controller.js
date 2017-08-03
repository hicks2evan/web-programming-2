'use strict';

import {Review} from './reviews.model';
import {User} from '/Users/Evan/Documents/GIT/COMP-3705/server/api/users/users.model';
import {Recipe} from '/Users/Evan/Documents/GIT/COMP-3705/server/api/recipes/recipes.model';


// Find all Reviews
export function index(req, res) {
  Review.find()
      .populate('user')
      .exec()
      // This then method will only be called if the query was successful, so no need to error check!
      .then(function(reviews) {
        res.json(reviews);
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
  Review.findById(req.params.id)
      .populate('user')
      .exec()
      .then(function(existingReview) {
         /*
          findById will return null if the object was not found
          This if check will evaluate to false for a null review
          */
        if(existingReview) {
            // Recipe was found by Id
          res.status(200);
          res.json(existingReview);
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

// Create a new review
export function create(req, res) {
  var review = req.body;
  review.created = Date.now();
  review.updated = Date.now();
  review.thumbsUp = 0;
  let username = req.body.author;

  User.findOne({username}, function(user) {
    return user;
  })
      .then(function(u) {
        review.author = u;
        Review.create(review)
            .then(function(createdReview) {
              var newReview = createdReview;
              Recipe.findById(req.params.id)
              .then(function(foundRecipe) {
                foundRecipe.reviews.push(newReview);
                foundRecipe.save();
                return newReview;
              })
               .then(function(returnReview) {
                 res.status(201);
                 res.json(returnReview);
               });
            })
            .catch(function(err) {
              res.status(400);
              res.send(err.toString());
            });
      });
}

// Update a recipe
export function update(req, res) {
   // This value will be set by the successful update of the user so that it can be returned
  var updatedReview;
   // Start by trying to find the user by its id
  Review.findById(req.params.id)
   //.populate('ingredients')
      .exec()
      // Update user and address
      .then(function(existingReview) {
         // If recipe exists, update all fields of the object
        if(existingReview) {
          existingReview.description = req.body.description;
          existingReview.rating = req.body.rating;
          existingReview.thumbsUp = req.body.thumbsUp;
          existingReview.updated = Date.now();

          updatedReview = existingReview;

          return Promise.all([
            existingReview.save()
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
          res.json(updatedReview);
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
  Review.findById(req.params.id)
      .exec()
      .then(function(existingReview) {
        if(existingReview) {
          existingReview.remove()
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
        } else {
          return null;
        }
      });
}

