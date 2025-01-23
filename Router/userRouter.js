const express = require('express');
const {verifyToken} = require('../middleware/verifyToken');
const { newUser , loginUser,logoutUser, updateUser } = require('../Controller/userController');
const router = express.Router();



router.post('/register', newUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/update', verifyToken,updateUser);

module.exports = router;