const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingController');
const authMiddleware = require('../middlewares/AuthMiddleware');


router.post('/rate/:productId', authMiddleware, ratingController.rateProduct);

module.exports = router;