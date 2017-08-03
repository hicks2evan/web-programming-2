import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ingredientSchema = Schema({
  name: {type: String, required: true},
  description: {type: String, required: false}
});

let recipeSchema = Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  pictureURL: {type: String, required: true},
  prepTime: {type: Number, required: true},
  cookTime: {type: Number, required: true},
  directions: {type: [String], required: true},
  ingredients: {type: [ingredientSchema], required: true},
  reviews: {type: [Schema.ObjectId], ref: 'Review', required: false}
});

let Ingredient = mongoose.model('Ingredient', ingredientSchema);
let Recipe = mongoose.model('Recipe', recipeSchema);

export {Recipe, Ingredient};
