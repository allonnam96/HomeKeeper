// require('dotenv').config();
// const mongoose = require('mongoose');
// const { mongoURI: db } = require('../config/keys.js');
// const Contractor = require('../models/Contractor');
// const { check } = require('express-validator');
// const handleValidationErrors = require('./handleValidationErrors');
// const faker = require('faker');

// const NUM_SEED_CONTRACTORS = 10;

// const generateFakeContractor = () => {
//   return {
//     name: faker.name.findName(),
//     title: faker.name.jobTitle(),
//     reviewStar: faker.random.number({ min: 1, max: 5 }),
//     bio: faker.lorem.paragraph(),
//     address: faker.address.streetAddress(),
//     photoUrl: faker.image.imageUrl(),
//     category: mongoose.Types.ObjectId() // Assuming this generates a new ObjectId
//   };
// };

// const contractors = [];

// for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
//   const newContractor = generateFakeContractor();
//   contractors.push(newContractor);
// }

// // Validate contractors before insertion
// const validateContractorInput = [
//   check('name').exists({ checkFalsy: true }).withMessage('Name is required'),
//   check('title').exists({ checkFalsy: true }).withMessage('Title is required'),
//   check('reviewStar')
//     .isInt({ min: 1, max: 5 })
//     .withMessage('Review star must be between 1 and 5'),
//   check('bio').exists({ checkFalsy: true }).withMessage('Bio is required'),
//   check('address').exists({ checkFalsy: true }).withMessage('Address is required'),
//   check('photoUrl').exists({ checkFalsy: true }).withMessage('Photo URL is required'),
//   check('category')
//     .exists({ checkFalsy: true })
//     .withMessage('Category is required')
//     .isMongoId()
//     .withMessage('Category should be a valid ID'),
//   handleValidationErrors
// ];

// // Connect to the database and insert contractors
// const insertContractors = async () => {
//   try {
//     console.log('Resetting db and seeding contractors...');

//     await Contractor.deleteMany({});
//     await Promise.all(contractors.map(contractor => Contractor.create(contractor)));

//     console.log('Seeding completed!');
//     mongoose.disconnect();
//   } catch (err) {
//     console.error(err.stack);
//     process.exit(1);
//   }
// };

// // Connect to the database
// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//     insertContractors();
//   })
//   .catch((err) => {
//     console.error(err.stack);
//     process.exit(1);
//   });

require('dotenv').config();

const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
<<<<<<< HEAD
=======
// const Contractor = require('../models/Contractor');
>>>>>>> 9dc7937 (users seeding working)
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// Create your seeds (users and tweets)
const NUM_SEED_USERS = 10;
<<<<<<< HEAD

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
=======
// const NUM_SEED_CONTRACTORS = 10;

const users = [];

users.push(
  new User({
    name: 'Demo User',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    birthday: faker.date.past(30), // Adjust the age as needed
  })
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  users.push(
    new User({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      birthday: faker.date.past(30), // Adjust the age as needed
    })
  );
}

// const contractors = [];
// const categories = ['Plumber', 'Painter', 'Electrician', 'Home Remodeler', 'Lawyer'];

// const generateFakeContractor = () => {
//   const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//   return new Contractor({
//     person: faker.name.firstName(),
//     title: faker.name.jobTitle(),
//     reviewStar: faker.datatype.number({ min: 1, max: 5 }),
//     bio: faker.lorem.paragraph(),
//     address: faker.address.streetAddress(),
//     photoUrl: faker.image.imageUrl(),
//     category: randomCategory,
//   });
// };

// for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
//   const newContractor = generateFakeContractor();
//   contractors.push(newContractor);
// }
>>>>>>> 9dc7937 (users seeding working)

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

<<<<<<< HEAD
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
=======
  User.deleteMany({})
    // .then(() => Contractor.deleteMany({}))
    .then(() => User.insertMany(users))
    // .then(() => Contractor.insertMany(contractors))
    .then(() => {
      console.log("Seeding completed!");
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    });
>>>>>>> 9dc7937 (users seeding working)
};

// Connect to the database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
