require('dotenv').config();
const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const Contractor = require('../models/Contractor');
const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');
const faker = require('faker');

const NUM_SEED_CONTRACTORS = 10;

const generateFakeContractor = () => {
  return {
    name: faker.name.findName(),
    title: faker.name.jobTitle(),
    reviewStar: faker.random.number({ min: 1, max: 5 }),
    bio: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    photoUrl: faker.image.imageUrl(),
    category: mongoose.Types.ObjectId() // Assuming this generates a new ObjectId
  };
};

const contractors = [];

for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
  const newContractor = generateFakeContractor();
  contractors.push(newContractor);
}

// Validate contractors before insertion
const validateContractorInput = [
  check('name').exists({ checkFalsy: true }).withMessage('Name is required'),
  check('title').exists({ checkFalsy: true }).withMessage('Title is required'),
  check('reviewStar')
    .isInt({ min: 1, max: 5 })
    .withMessage('Review star must be between 1 and 5'),
  check('bio').exists({ checkFalsy: true }).withMessage('Bio is required'),
  check('address').exists({ checkFalsy: true }).withMessage('Address is required'),
  check('photoUrl').exists({ checkFalsy: true }).withMessage('Photo URL is required'),
  check('category')
    .exists({ checkFalsy: true })
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Category should be a valid ID'),
  handleValidationErrors
];

// Connect to the database and insert contractors
const insertContractors = async () => {
  try {
    console.log('Resetting db and seeding contractors...');

    await Contractor.deleteMany({});
    await Promise.all(contractors.map(contractor => Contractor.create(contractor)));

    console.log('Seeding completed!');
    mongoose.disconnect();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
};

// Connect to the database
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertContractors();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
