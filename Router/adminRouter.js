const express = require('express');
const {verifyToken} = require('../middleware/verifyToken');
const {newAdmin, loginAdmin, logoutAdmin, ShowUser,ShowUserById,UpdateUserAdmin,DeleteUser} = require('../Controller/adminController');
const checkAdmin = require('../middleware/checkAdmin');
const router = express.Router();



router.post('/register', newAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/showUser', verifyToken,checkAdmin, ShowUser);
router.get('/showUser/:UserID', verifyToken,checkAdmin, ShowUserById);
router.put('/update/:UserID', verifyToken,checkAdmin, UpdateUserAdmin);
router.delete('/delete/:UserID', verifyToken,checkAdmin, DeleteUser);

module.exports = router;