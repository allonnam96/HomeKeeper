const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
const User = mongoose.model('User');
const { requireUser } = require('../../config/passport');
const validateAppointmentInput = require('../../validations/appointments')

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
        const appointments = await Appointment.find({ user: user._id })
        .populate("user", "_id name");
        return res.json(appointments);
    }
    catch(err) {
        return res.json([]);
    }
});

router.post('/new', requireUser, async (req, res, next) => {
    try {
        const newAppointment = new Appointment({
            appointmentDate: req.body.appointmentDate,
            status: req.body.status,
            type: req.body.type,
            contractor: req.body.contractor,
            user: req.body.user
        });
        let appointment = await newAppointment.save();
        appointment = await appointment.populate('user', '_id name')
        await appointment.populate('contractor', '_id name');
        console.log("hello")
        return res.json(appointment);
    }
    catch(err) {
        // next(err);
        return res.json({
            Message: "Could not create appointment"
        })
    }
});

router.patch('/:id', requireUser, async (req, res, next) => {
    try {
        const appointment = await Appointment.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                $set: {
                    appointmentDate: req.body.appointmentDate,
                    status: req.body.status
                }
            },
            { new: true }
        );
        if (!appointment) {
            const error = new Error('Appointment not found or unauthorized');
            error.statusCode = 404;
            error.errors = { message: 'No appointment found with that id or unauthorized access' };
            return next(error);
        }
        return res.json(appointment);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const appointment = await Appointment.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        if (!appointment) {
            const error = new Error('Appointment not found or unauthorized');
            error.statusCode = 404;
            error.errors = { message: 'No appointment found with that id or unauthorized access' };
            return next(error);
        }
        return res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        next(err);
    }
});



module.exports = router;