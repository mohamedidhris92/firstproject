const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// connect with local database with name
mongoose.connect('mongodb://127.0.0.1:27017/demo')//creat a database here "demo" is a database name
  .then(() => console.log('Connected!'));

// create schema 
const userschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  photo: String,
});

// create schema 
const userschema1 = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirmPassword: String
});

//create table model
const User = mongoose.model('user', userschema)// here user is a table name in mongodb
const User1 = mongoose.model('employee', userschema)
const SignUpUser = mongoose.model('Regusers', userschema1)

const server = express();
server.use(cors());
server.use(bodyParser.json());

//create API
//API for users
server.post('/demo', async (req, res) => {
  const doc = await User.create(req.body);
  // let user = new User();        //mention the model(table)here
  // user.firstname = req.body.firstname;
  // user.lastname = req.body.lastname;
  // user.email = req.body.email;
  // user.phone = req.body.phone;
  // user.photo = req.body.photo;
  // const doc = await User.save();
  console.log("doc", doc);
  res.json(doc);
  console.log("reqbody", req.body);
})

// API for employees
server.post('/demo1', async (req, res) => {
  console.log("Received request body:", req.body);
  let user = new User1();   //mention the model(table)here
  const doc = await User1.create(req.body);
  console.log("doc", doc);
  res.json(doc);
  console.log("reqbody", req.body);
})

//Read All API
server.get('/demo', async (req, res) => {
  const doc = await User.find({});   //mention the model(table)here
  res.json(doc);
})

//Read API with ID
server.get('/demo/:id', async (req, res) => {
  const doc = await User.findById(req.params.id);   //mention the model(table)here
  res.json(doc);
})

//Delete Api with ID
const deleteUser = require('./delete.js') // this will navigate to delete.js component
server.delete('/demo/:id', (req, res) => deleteUser(User, req, res));

//use above code for delete or use the following code for delete 

// const deleteUser = require('./delete');
// server.delete('/demo/:id', deleteUser)
// server.delete('/demo/:id', async (req, res) => {
//   const doc = await User.deleteOne({ _id: req.params.id });   //mention the model(table)here
//   res.json(doc);
//   console.log("doc", doc);
// })

//Update User with ID
server.put('/demo/:id', async (req, res) => {
  const doc = await User.findOneAndUpdate(
    { _id: req.params.id }, // Filter: Find the document by ID
    { $set: req.body },     // Update: Set the fields to the values in req.body
    { new: true }           // Options: Return the modified document (optional)
  );
  console.log("doc", doc);
  res.json(doc);
  console.log("reqbody", req.body);
})

server.listen(4545, () => {
  console.log("server 4545 started")
})

module.exports = User;

//SignUp Registration Users 


//create API
//API for users
server.post('/demo/signup', async (req, res) => {
  const { email } = req.body;
  const validate = await SignUpUser.findOne({ email: email })
  if (validate) {
    res.json("Email Id already exists")
  }
  else {
    console.log("Received request body:", req.body);
    let user = new SignUpUser();
    const doc = await SignUpUser.create(req.body);
    console.log("doc", doc);
    res.json(doc);
    console.log("reqbody", req.body);
  }
})

//Login Verification
server.post('/demo/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Received request body:", req.body);
  const doc = await SignUpUser.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("success")
        } else {
          res.json("the password is incorrect")
        }
      } else {
        res.json("no record found")
      }
    })
})


