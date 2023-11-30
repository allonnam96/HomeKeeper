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

router.post('/appointments/new', requireUser, async (req, res, next) => {
    try {
        const newAppointment = new Appointment({
            appointmentDate: req.body.appointmentDate,
            status: req.body.status,
            contractor: req.contractor._id,
            user: req.user._id
        });
        let appointment = await newAppointment.save();
        appointment = await appointment.populate('user', '_id name')
        .populate('contractor', '_id name');
        return res.json(appointment);
    }
    catch(err) {
        next(err);
    }
});

router.patch('/appointments/:appointmentId', requireUser, async (req, res, next) => {
    try {
        const appointment = await Appointment.findOneAndUpdate(
            { _id: req.params.appointmentId, user: req.user._id },
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

router.delete('/appointments/:appointmentId', requireUser, async (req, res, next) => {
    try {
        const appointment = await Appointment.findOneAndDelete({
            _id: req.params.appointmentId,
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