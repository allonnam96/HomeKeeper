// const mongoose = require('mongoose');
// const Contractor = mongoose.model('Contractor');
// const Category = mongoose.model('Category');
// const express = require('express');
// const router = express.Router();
// const validateContractorInput  = require('../../validations/contractors'); // Assuming your model file is in a 'models' directory

// // GET all contractors
// router.get('/', async (req, res, next) => {
//     try {
//       const contractors = await Contractor.find().populate('category', '_id name');
//       return res.json(contractors);
//     } catch (err) {
//       next(err); // Passes the caught error to the next error-handling middleware
//     }
//   });
  
//   router.get('/:id', async (req, res, next) => {
//     try {
//       const contractor = await Contractor.findById(req.params.id).populate('category', '_id name');
  
//       if (!contractor) {
//         const error = new Error('Contractor not found');
//         error.statusCode = 404;
//         throw error;
//       }
  
//       return res.json(contractor);
//     } catch (err) {
//       next(err); // Passes the caught error to the next error-handling middleware
//     }
//   });
  
//   router.post('/', validateContractorInput, async (req, res, next) => {
//     try {
//       const {
//         name,
//         title,
//         reviewStar,
//         bio,
//         address,
//         photoUrl,
//         category
//       } = req.body;
  
//       const newContractor = new Contractor({
//         name,
//         title,
//         reviewStar,
//         bio,
//         address,
//         photoUrl,
//         category
//       });
  
//       const savedContractor = await newContractor.save();
//       return res.status(201).json(savedContractor);
//     } catch (err) {
//       next(err); // Passes the caught error to the next error-handling middleware
//     }
//   });
  
//   module.exports = router;
