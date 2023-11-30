require('dotenv').config();

const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Contractor = require('../models/Contractor');
const Category = require('../models/Category');
const Review = require('../models/Review');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_CONTRACTORS = 100;

const users = [];

const seedCategories = async () => {
  const categories = ['Plumber', 'Painter', 'Electrician', 'Home Remodeler', 'Lawyer'];
  return await Category.insertMany(categories.map(category => ({ name: category })));
};

const generateFakeContractor = (categoryObjectIds) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phoneFormats = ['###-###-####', '(###) ###-####', '1-###-###-####'];
  const phoneNum = formatPhoneNumber();
  const randomCategoryObjectId = categoryObjectIds[Math.floor(Math.random() * categoryObjectIds.length)]._id;

  // const imageUrl = 'https://source.unsplash.com/400x400/?headshot%20professional';

  const genericPhrases = [
    'Experienced professional in the field',
    'Passionate about delivering high-quality service',
    'Committed to customer satisfaction',
    'Skilled and reliable contractor',
    'Dedicated to excellence in every project',
  ];

  const genericReviewPhrases = [
    'Great service and highly recommended!',
    'Extremely satisfied with the work done.',
    'Professional and efficient service.',
    'Exceeded expectations, will hire again!',
    'Impressed by the quality of workmanship.',
  ];

  return new Contractor({
    name: `${firstName} ${lastName}`,
    title: faker.name.jobTitle(),
    bio: genericPhrases[Math.floor(Math.random() * genericPhrases.length)],
    address: faker.address.streetAddress(),
    photoUrl: faker.image.avatarLegacy(),
    phoneNum: phoneNum,
    email: faker.internet.email(firstName),
    category: randomCategoryObjectId,
  });
};

const formatPhoneNumber = () => {
  const phoneFormats = ['###-###-####', '(###) ###-####', '1-###-###-####'];
  const randomPhoneFormat = phoneFormats[Math.floor(Math.random() * phoneFormats.length)];

  return randomPhoneFormat.replace(/#/g, () => Math.floor(Math.random() * 10));
};

const seedData = async () => {
  const categoryObjectIds = await seedCategories();

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

  const contractors = [];
  for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
    const newContractor = generateFakeContractor(categoryObjectIds);
    contractors.push(newContractor);
  }

  try {
    console.log("Resetting db and seeding users and contractors...");

    await User.deleteMany({});
    await Contractor.deleteMany({});
    await Review.deleteMany({});
    await User.insertMany(users);
    const insertedContractors = await Contractor.insertMany(contractors);


    const reviews = [];
    for (let i = 0; i < 200; i++) {
      const contractor = insertedContractors[Math.floor(Math.random() * insertedContractors.length)];
      reviews.push({
        reviewStar: faker.datatype.number({ min: 1, max: 5 }),
        reviewSummary: genericReviewPhrases[Math.floor(Math.random() * genericReviewPhrases.length)],
        contractor: contractor._id,
      });
    }


    await Review.insertMany(reviews);

    console.log("Seeding completed!");
  } catch (err) {
    console.error(err.stack);
  } finally {
    mongoose.disconnect();
  }
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