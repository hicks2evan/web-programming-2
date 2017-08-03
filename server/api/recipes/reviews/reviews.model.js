import mongoose from 'mongoose';
import User from '../../users/users.model';

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
