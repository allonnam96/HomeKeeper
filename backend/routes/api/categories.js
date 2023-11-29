const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Contractor = mongoose.model('Contractor');
const { requireUser } = require('../../config/passport');
const validateCategoryInput = require('../../validations/categories')

router.get('/', async (req,res) => {
    res.json({
        message: "GET /api/categories"
    });
});

router.get('/:id', async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)

        return res.json(category);
    }
    catch (err) {
        const error = new Error('Category not found')
        error.statusCode = 404;
        error.errors = { message: "No Category found with that id" }
        return next(error);
    }
});

module.exports = router;