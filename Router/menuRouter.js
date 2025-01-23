const { verify } = require('jsonwebtoken');
const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const checkAdmin = require('../middleware/checkAdmin');
const { CreateMenu, ShowMenu, ShowMenuById, UpdateMenu, DeleteMenu } = require('../Controller/menuController');
const router = express.Router();

router.post('/create',verifyToken,checkAdmin,CreateMenu);
router.get('/showall',verifyToken,ShowMenu);
router.get('/:MenuID',verifyToken,ShowMenuById);
router.put('/update/:MenuID',verifyToken,checkAdmin,UpdateMenu);
router.delete('/delete/:MenuID',verifyToken,checkAdmin,DeleteMenu);

module.exports = router;