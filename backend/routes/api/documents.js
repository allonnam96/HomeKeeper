const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Document = mongoose.model('Document');
const User = mongoose.model('User');
const { requireUser } = require('../../config/passport');
const validateDocumentInput = require('../../validations/documents')

router.get('/user/:userId', async (req, res, next) => {
    let user;
    try{
        user = await User.findById(req.params.userId);
    } catch(err) {
        const error = new Error("User not found");
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try{
        const documents = await Document.find({ user: user._id })
        .populate("user", "_id name");
        return res.json(documents);
    }
    catch(err) {
        return res.json([]);
    }
});


router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const document = await Document.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        if (!document) {
            const error = new Error('Appointment not found or unauthorized');
            error.statusCode = 404;
            error.errors = { message: 'No appointment found with that id or unauthorized access'};
            return next(error);
        }
        return res.json({ message: 'Document deleted successfully'});
    } catch (err) {
        next(err);
    }
});

module.exports = router;