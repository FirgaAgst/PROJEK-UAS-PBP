const express = require("express");
const router = express.Router();
const {AddReview,ShowReview} = require('../Controller/reviewController');


router.post('/create',AddReview);
router.get('/showall',ShowReview);

module.exports = router;