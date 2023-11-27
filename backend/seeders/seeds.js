
// require('dotenv').config();

// const mongoose = require("mongoose");
// const { mongoURI: db } = require('../config/keys.js');
// const User = require('../models/User');
// const Contractor = require('../models/Contractor');
// const bcrypt = require('bcryptjs');
// const { faker } = require('@faker-js/faker');

// // Create your seeds (users and tweets)
// const NUM_SEED_USERS = 1;
// const NUM_SEED_CONTRACTORS = 10;

// const users = [];

// users.push(
//   new User({
//     username: 'demo-user',
//     email: 'demo-user@appacademy.io',
//     hashedPassword: bcrypt.hashSync('starwars', 1)
//   })
// );

// const categories = ['Plumber', 'Painter', 'Electrician', 'Home Remodeler', 'Lawyer'];

// const generateFakeContractor = () => {
//     const randomCategory = faker.random.arrayElement(categories);
//     return new Contractor({
//       name: faker.name.findName(),
//       title: faker.name.jobTitle(),
//       reviewStar: faker.random.number({ min: 1, max: 5 }),
//       bio: faker.lorem.paragraph(),
//       address: faker.address.streetAddress(),
//       photoUrl: faker.image.imageUrl(),
//       category: randomCategory // Assuming 'category' is stored as a string in the Contractor model
//     });
// };


// const contractors = [];

// for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
//     const newContractor = generateFakeContractor();
//     contractors.push(newContractor);
// }

// // Connect to the database and insert your seeds
// const insertSeeds = () => {
//   console.log("Resetting db and seeding users and tweets...");

//   User.collection.drop()
//     .then(() => Contractor.collection.drop())
//     .then(() => User.insertMany(users))
//     .then(() => Contractor.insertMany(contractors))
//     .then(() => {
//       console.log("Done!");
//       mongoose.disconnect();
//     })
//     .catch(err => {
//       console.error(err.stack);
//       process.exit(1);
//     });
// };

// // Connect to the database
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//     insertSeeds();
//   })
//   .catch(err => {
//     console.error(err.stack);
//     process.exit(1);
//   });


require('dotenv').config();

const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Contractor = require('../models/Contractor');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const NUM_SEED_USERS = 1;
const NUM_SEED_CONTRACTORS = 10;

const users = [];

users.push(
  new User({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 1),
  })
);

const categories = ['Plumber', 'Painter', 'Electrician', 'Home Remodeler', 'Lawyer'];

const generateFakeContractor = () => {
  const randomCategory = faker.random.arrayElement(categories);
  return new Contractor({
    name: faker.name.findName(),
    title: faker.name.jobTitle(),
    reviewStar: faker.random.number({ min: 1, max: 5 }),
    bio: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    photoUrl: faker.image.imageUrl(),
    category: randomCategory,
  });
};

const contractors = [];

for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
  const newContractor = generateFakeContractor();
  contractors.push(newContractor);
}

// Connect to the database and insert your seeds
const insertSeeds = async () => {
  try {
    console.log('Resetting db and seeding users and contractors...');

    await User.deleteMany({});
    await Contractor.deleteMany({});

    await User.insertMany(users);
    await Contractor.insertMany(contractors);

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
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
