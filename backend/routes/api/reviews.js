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

router.post('/new', async (req, res, next) => {
    try {
        const { reviewStar, reviewSummary, name, contractor } = req.body;
        if (!reviewStar || !reviewSummary || !name || !contractor) {
            return res.status(400).json({ message: 'Invalid request. Please provide all required fields.' });
        }

        const newReview = new Review({
            reviewStar,
            reviewSummary,
            name,
            contractor
        });

        const validationError = newReview.validateSync();
        if (validationError) {
            return res.status(400).json({ message: validationError.message });
        }

        let review = await newReview.save();
        review = await review.populate('contractor', '_id name').execPopulate();
        return res.json(review);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not create review.' });
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
