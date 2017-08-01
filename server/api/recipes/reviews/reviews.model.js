import mongoose from 'mongoose';
import User from '/Users/Evan/Documents/GIT/COMP-3705/server/api/users/users.model.js';

let Schema = mongoose.Schema;

let reviewSchema = Schema({
  description: {type: String, required: true},
  rating: {type: Number, required: true},
  created: {type: Date, require: true},
  updated: {type: Date, require: true},
  author: {type: Schema.Types.ObjectId, ref: User},
  thumbsUp: {type: Number, required: false}
});

let Review = mongoose.model('Review', reviewSchema);

export {Review};
