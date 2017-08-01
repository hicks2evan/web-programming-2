import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// This schema represents the name of the user
let fullNameSchema = Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true}
});

// This is the main user schema
let userSchema = Schema({
  fullName: fullNameSchema,
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true}
});

let User = mongoose.model('User', userSchema);

// Export the two created models, Address and User
export {User};
