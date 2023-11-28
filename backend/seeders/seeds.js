// require('dotenv').config();

// const mongoose = require('mongoose');
// const { mongoURI: db } = require('../config/keys.js');
// const User = require('../models/User');
// // const Contractor = require('../models/Contractor');
// const bcrypt = require('bcryptjs');
// const { faker } = require('@faker-js/faker');

// const NUM_SEED_USERS = 10;
// // const NUM_SEED_CONTRACTORS = 10;

// const users = [];

// users.push(
//   new User({
//     name: 'Demo User',
//     email: 'demo-user@appacademy.io',
//     hashedPassword: bcrypt.hashSync('starwars', 10),
//     birthday: faker.date.past(30), // Adjust the age as needed
//   })
// );

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.person.firstName();
//   const lastName = faker.person.lastName();
//   users.push(
//     new User({
//       name: `${firstName} ${lastName}`,
//       email: faker.internet.email({ firstName, lastName }),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
//       birthday: faker.date.past(30), // Adjust the age as needed
//     })
//   );
// }

// // const contractors = [];
// // const categories = ['Plumber', 'Painter', 'Electrician', 'Home Remodeler', 'Lawyer'];

// // const generateFakeContractor = () => {
// //   const randomCategory = categories[Math.floor(Math.random() * categories.length)];
// //   return new Contractor({
// //     person: faker.name.firstName(),
// //     title: faker.name.jobTitle(),
// //     reviewStar: faker.datatype.number({ min: 1, max: 5 }),
// //     bio: faker.lorem.paragraph(),
// //     address: faker.address.streetAddress(),
// //     photoUrl: faker.image.imageUrl(),
// //     category: randomCategory,
// //   });
// // };

// // for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
// //   const newContractor = generateFakeContractor();
// //   contractors.push(newContractor);
// // }

// // Connect to the database and insert your seeds
// const insertSeeds = () => {
//   console.log("Resetting db and seeding users and contractors...");

//   User.deleteMany({})
//     // .then(() => Contractor.deleteMany({}))
//     .then(() => User.insertMany(users))
//     // .then(() => Contractor.insertMany(contractors))
//     .then(() => {
//       console.log("Seeding completed!");
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

const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
<<<<<<< HEAD
<<<<<<< HEAD
=======
// const Contractor = require('../models/Contractor');
>>>>>>> 9dc7937 (users seeding working)
=======
const Contractor = require('../models/Contractor');
const Category = require('../models/Category');
>>>>>>> 3c83671 (seeds for contractors)
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// Create your seeds (users and tweets)
const NUM_SEED_USERS = 10;
<<<<<<< HEAD
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
=======
const NUM_SEED_CONTRACTORS = 10;
>>>>>>> 3c83671 (seeds for contractors)

const users = [];
const contractors = [];

const seedCategories = async () => {
  const categories = ['Plumber', 'Painter', 'Electrician', 'Home Remodeler', 'Lawyer'];

  return await Category.insertMany(categories.map(category => ({ name: category })));
};

// users.push(
//   new User({
//     name: 'Demo User',
//     email: 'demo-user@appacademy.io',
//     hashedPassword: bcrypt.hashSync('starwars', 10),
//     birthday: faker.date.past(30),
//   })
// );

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.person.firstName();
//   const lastName = faker.person.lastName();
//   users.push(
//     new User({
//       name: `${firstName} ${lastName}`,
//       email: faker.internet.email({ firstName, lastName }),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
//       birthday: faker.date.past(30),
//     })
//   );
// }

const generateFakeContractor = (categoryObjectIds) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  // const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomCategoryObjectId = categoryObjectIds[Math.floor(Math.random() * categoryObjectIds.length)]._id;
  return new Contractor({
    name: `${firstName} ${lastName}`,
    title: faker.name.jobTitle(),
    reviewStar: faker.datatype.number({ min: 1, max: 5 }),
    bio: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    photoUrl: faker.image.imageUrl(),
    // category: randomCategory,
    category: randomCategoryObjectId,
  });
};

// for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
//   const newContractor = generateFakeContractor();
//   contractors.push(newContractor);
// }
>>>>>>> 9dc7937 (users seeding working)

<<<<<<< HEAD
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
=======
// const insertSeeds = () => {
//   console.log("Resetting db and seeding users and contractors...");

//   User.deleteMany({})
//     .then(() => Contractor.deleteMany({}))
//     .then(() => User.insertMany(users))
//     .then(() => Contractor.insertMany(contractors))
//     .then(() => {
//       console.log("Seeding completed!");
//       mongoose.disconnect();
//     })
//     .catch(err => {
//       console.error(err.stack);
//       process.exit(1);
//     });
// };

const seedData = async () => {
  // Seed categories
  const categoryObjectIds = await seedCategories();

  // Seed users
  users.push(
    new User({
      name: 'Demo User',
      email: 'demo-user@appacademy.io',
      hashedPassword: bcrypt.hashSync('starwars', 10),
      birthday: faker.date.past(30),
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
        birthday: faker.date.past(30),
      })
    );
  }

  // Seed contractors
  for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
    const newContractor = generateFakeContractor(categoryObjectIds);
    contractors.push(newContractor);
  };

  // Connect to the database and insert your seeds
  try {
    console.log("Resetting db and seeding users and contractors...");

    await User.deleteMany({});
    await Contractor.deleteMany({});
    await User.insertMany(users);
    await Contractor.insertMany(contractors);

    console.log("Seeding completed!");
  } catch (err) {
    console.error(err.stack);
  } finally {
    mongoose.disconnect();
  }
>>>>>>> 3c83671 (seeds for contractors)
};

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    seedData();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

