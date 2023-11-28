require('dotenv').config();

const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Contractor = require('../models/Contractor');
const Category = require('../models/Category');
// const Review = require('../models/Review')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_CONTRACTORS = 30;

const users = [];
const contractors = [];

const seedCategories = async () => {
  const categories = ['Plumber', 'Painter', 'Electrician', 'Home Remodeler', 'Lawyer'];

  return await Category.insertMany(categories.map(category => ({ name: category })));
};

const generateFakeContractor = (categoryObjectIds) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phoneFormats = ['###-###-####', '(###) ###-####', '1-###-###-####']; // Add more formats if needed
  const randomPhoneFormat = faker.random.arrayElement(phoneFormats);
  const phoneNum = faker.phone.phoneNumberFormat({ format: randomPhoneFormat });
  const randomCategoryObjectId = categoryObjectIds[Math.floor(Math.random() * categoryObjectIds.length)]._id;
  
  return new Contractor({
    name: `${firstName} ${lastName}`,
    title: faker.name.jobTitle(),
    bio: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    photoUrl: faker.image.imageUrl(),
    phoneNum: phoneNum,
    email: faker.internet.email(firstName),
    category: randomCategoryObjectId,
  });
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

  for (let i = 0; i < NUM_SEED_CONTRACTORS; i++) {
    const newContractor = generateFakeContractor(categoryObjectIds);
    contractors.push(newContractor);
  };

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

