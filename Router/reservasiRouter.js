const prisma = require('../prisma/client');
const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const checkAdmin = require('../middleware/checkAdmin');
const { CreateReservasi, ShowReservasi, ShowReservasiById, UpdateReservasi, DeleteReservasi } = require('../Controller/reservasiController');
const router = express.Router();

router.post('/create',verifyToken,CreateReservasi);
router.get('/showAll',verifyToken,ShowReservasi);
router.get('/showReservasi/:ReservationID',verifyToken,ShowReservasiById);
router.put('/updateReservasi/:ReservationID',verifyToken,checkAdmin,UpdateReservasi);
router.delete('/deleteReservasi/:ReservationID',verifyToken,checkAdmin,DeleteReservasi);

module.exports = router;