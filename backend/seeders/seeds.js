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


const nycAddresses = [
  '350 5th Ave, New York, NY 10118',
  '40 Wall St, New York, NY 10005',
  '1 Rockefeller Plaza, New York, NY 10020',
  '1280 Avenue of the Americas, New York, NY 10019',
  '233 Broadway, New York, NY 10279',
  '1600 Broadway, New York, NY 10019',
  '55 Broadway, New York, NY 10006',
  '120 Broadway, New York, NY 10271',
  '1 Liberty Plaza, New York, NY 10006',
  '60 Wall St, New York, NY 10005',
  '345 Park Ave, New York, NY 10154',
  '100 Wall St, New York, NY 10005',
  '11 Times Square, New York, NY 10036',
  '30 Rockefeller Plaza, New York, NY 10112',
  '20 Exchange Pl, New York, NY 10005',
  '299 Park Ave, New York, NY 10171',
  '1 New York Plaza, New York, NY 10004',
  '7 World Trade Center, New York, NY 10007',
  '685 5th Ave, New York, NY 10022',
  '23 Wall St, New York, NY 10005',
  '570 Lexington Ave, New York, NY 10022',
  '9 W 57th St, New York, NY 10019',
  '4 Times Square, New York, NY 10036',
  '1 Union Square W, New York, NY 10003',
  '300 Park Ave, New York, NY 10022',
  '375 Park Ave, New York, NY 10152',
  '1350 Broadway, New York, NY 10018',
  '450 Park Ave, New York, NY 10022',
  '250 Vesey St, New York, NY 10281',
  '1 Battery Park Plaza, New York, NY 10004',
  '3 Times Square, New York, NY 10036',
  '2 Park Ave, New York, NY 10016',
  '55 Water St, New York, NY 10041',
  '7 Bryant Park, New York, NY 10018',
  '110 Wall St, New York, NY 10005',
  '2 Broadway, New York, NY 10004',
  '1177 Avenue of the Americas, New York, NY 10036',
  '1095 6th Ave, New York, NY 10036',
  '230 Park Ave, New York, NY 10169',
  '810 7th Ave, New York, NY 10019',
  '1345 Avenue of the Americas, New York, NY 10105',
  '51 Astor Pl, New York, NY 10003',
  '151 W 42nd St, New York, NY 10036',
  '120 Wall St, New York, NY 10005',
  '1 Bryant Park, New York, NY 10036',
  '1301 Avenue of the Americas, New York, NY 10019',
  '75 Wall St, New York, NY 10005',
  '2 Penn Plz, New York, NY 10121',
  '450 Lexington Ave, New York, NY 10017',
];



const generateFakeContractor = (categoryObjectIds) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phoneNum = formatPhoneNumber();
  const randomCategoryObjectId = categoryObjectIds[Math.floor(Math.random() * categoryObjectIds.length)]._id;
  const randomAddress = nycAddresses[Math.floor(Math.random() * nycAddresses.length)];

  const genericPhrases = [
    'Experienced professional in the field',
    'Passionate about delivering high-quality service',
    'Committed to customer satisfaction',
    'Skilled and reliable contractor',
    'Dedicated to excellence in every project',
  ];


  return new Contractor({
    name: `${firstName} ${lastName}`,
    title: faker.name.jobTitle(),
    bio: genericPhrases[Math.floor(Math.random() * genericPhrases.length)],
    address: randomAddress,
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

    const genericReviewPhrases = [
      'Provided great service! The attention to detail and commitment to excellence were truly impressive. Highly recommended for anyone looking for top-notch work.',
      'I am extremely satisfied with the work done. The professionalism and efficiency exhibited throughout the project were exceptional. Will definitely hire again for future needs.',
      'The service received was nothing short of professional and efficient. Every aspect of the job was handled with expertise and care. I highly recommend this contractor for any project.',
      'Exceeded all expectations! The dedication to delivering high-quality service was evident in every step of the process. I will certainly hire again for any upcoming projects.',
      'Impressed by the exceptional quality of workmanship. The attention to detail and craftsmanship were remarkable. A reliable and skilled contractor that I would recommend without hesitation.',
    ];


    const reviews = [];
    for (let i = 0; i < 500; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const contractor = insertedContractors[Math.floor(Math.random() * insertedContractors.length)];
      reviews.push({
        reviewStar: faker.datatype.number({ min: 1, max: 5 }),
        reviewSummary: genericReviewPhrases[Math.floor(Math.random() * genericReviewPhrases.length)],
        name: `${firstName} ${lastName}`,
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