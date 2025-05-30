const express = require('express');
const router = express.Router();
const {handleGetAllUser, getUserById, deleteUserById, updateUserById, addNewUser} = require('../controllers/user');

// Route
router
  .route('/')
  .get(handleGetAllUser)
  .post(addNewUser);

router
  .route('/:id')
  .get(getUserById)
  .delete(deleteUserById)
  .patch(updateUserById);

module.exports = router;