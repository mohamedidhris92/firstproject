const express = require('express');
const router = express.Router();
const userController = require('./userController');
const signUpController = require('./signUpController')
const loginController = require('./loginController')

// Define your DELETE endpoint using the userController function
// Declares the method 
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/', userController.fetchAllUser);
router.get('/:id', userController.fetchOneUser)
router.delete('/:id', userController.deleteUserById);

//SignUp
router.post('/signup', signUpController.signUpUser);

//Loginverification
router.post('/login', loginController.loginUser)

module.exports = router;
