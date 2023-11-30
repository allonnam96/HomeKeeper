const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const { requireUser } = require('../../config/passport');
const Contractor = require('../../models/Contractor');

router.get('/', async (req, res) => {
    try{
        const reviews = await Review.find()
        .populate('contractor', '_id name');
        return res.json(reviews)
    }
    catch(err) {
        return res.json([]);
    }
});

router.get('/:contractorId/reviews', async (req, res, next) => {
    try {
        const reviews = await Review.find({ contractor: req.params.contractorId})
        .populate('contractor', '_id ');

        return res.json(reviews);
    }
    catch (err) {
        const error = new Error('Error retrieving reviews for this contractor');
        error.statusCode = 500;
        return next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('contractor', '_id name');

        return res.json(review);
    }
    catch (err) {
        const error = new Error('Contractor not found');
        error.statusCode = 404;
        error.errors = { message: "No Contractor found with that id" }
        return next(error);
    }
});

module.exports = router;
