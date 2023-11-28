const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Review = mongoose.model('Review');
const { requireUser } = require('../../config/passport');

router.get('/:contractorId/reviews', async (req, res, next) => {
    try {
        const reviews = await Review.find({ category: req.params.contractorId})
        .populate('contractor', '_id name');

        return res.json(reviews);
    }
    catch (err) {
        const error = new Error('Error retrieving reviews for this contractor');
        error.statusCode = 500;
        return next(error);
    }
});

module.exports = router;
