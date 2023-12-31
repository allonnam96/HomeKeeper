const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contractor = mongoose.model('Contractor');
const Category = mongoose.model('Category');
const Review = mongoose.model('Review')
const { requireUser } = require('../../config/passport');
const validateContractorInput = require('../../validations/contractors'); // Assuming your model file is in a 'models' directory

// GET all contractors
router.get('/', async (req, res) => {
    try {
        const contractors = await Contractor.find()
            .populate('category', '_id name');
        return res.json(contractors);
    }
    catch (err) {
        return res.json([]);
    }
});

router.get('/:categoryId/contractors', async (req, res, next) => {
    try {
        const contractors = await Contractor.find({ category: req.params.categoryId })
            .populate('category', '_id name');
        
        return res.json(contractors);
    }
    catch (err) {
        const error = new Error('Error retrieving contractors for this category');
        error.statusCode = 500; 
        return next(error);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const { name, category, title } = req.query;

        const searchQuery = {};
        if (name) {
            searchQuery.name = { $regex: new RegExp(name, 'i') };
        }
        if (category) {
            searchQuery.category = category;
        }
        if (title) {
            searchQuery.title = { $regex: new RegExp(title, 'i') };
        }

        const contractors = await Contractor.find(searchQuery)
            .populate('category', '_id name');

        return res.json(contractors);
    } catch (err) {
        console.error(err);
        const error = new Error('Error during contractor search');
        error.statusCode = 500;
        return next(error);
    }
});

// router.get('/search', async (req, res, next) => {
//     try {
//         const queryParams = req.query;

//         const searchQuery = {};
//         Object.keys(queryParams).forEach((key) => {
//             searchQuery[key] = { $regex: new RegExp(queryParams[key], 'i') };
//         });

//         const contractors = await Contractor.find(searchQuery)
//             .populate('category', '_id name');

//         return res.json(contractors);
//     } catch (err) {
//         console.error(err);
//         const error = new Error('Error during contractor search');
//         error.statusCode = 500;
//         return next(error);
//     }
// });

router.get('/:id', async (req, res, next) => {
    try {
        const contractor = await Contractor.findById(req.params.id)
            .populate('category', '_id name')

        return res.json(contractor);
    }
    catch (err) {
        const error = new Error('Contractor not found');
        error.statusCode = 404;
        error.errors = { message: "No Contractor found with that id" }
        return next(error);
    }

});


module.exports = router;
