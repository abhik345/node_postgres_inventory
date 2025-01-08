const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');




router.post('/create', userController.createUser);  // Create user
router.get('/get-all', userController.getUsers);    // Get all users
router.get('/get-all/:id', userController.getUserById); // Get a user by ID
router.put('/update/:id', userController.updateUser); // Update user
router.delete('/delete/:id', userController.deleteUser); // Delete user



module.exports = router;
