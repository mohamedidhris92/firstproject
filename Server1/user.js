const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  photo: String,
});

const User = mongoose.model('user', userschema); // create table model what are the fields wanted with the help of schema

//For Signup Users
const signUpSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirmPassword: String
});

const signUp = mongoose.model('Regusers', signUpSchema)

module.exports = {User,signUp};