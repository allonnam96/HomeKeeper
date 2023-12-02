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
  const categories = ['Plumber', 'Painter', 'Electrician', 'Remodeler', 'Lawyer'];
  return await Category.insertMany(categories.map(category => ({ name: category })));
};


const nycAddressesWithCoordinates = [
  ['350 5th Ave, New York, NY 10118', '40.748817', '-73.985428'],
  ['40 Wall St, New York, NY 10005', '40.706982', '-74.009033'],
  ['1 Rockefeller Plaza, New York, NY 10020', '40.758740', '-73.979098'],
  ['1280 Avenue of the Americas, New York, NY 10019', '40.761423', '-73.978327'],
  ['233 Broadway, New York, NY 10279', '40.712776', '-74.008836'],
  ['1600 Broadway, New York, NY 10019', '40.758650', '-73.985264'],
  ['55 Broadway, New York, NY 10006', '40.706539', '-74.013759'],
  ['120 Broadway, New York, NY 10271', '40.708489', '-74.010266'],
  ['1 Liberty Plaza, New York, NY 10006', '40.709327', '-74.012345'],
  ['60 Wall St, New York, NY 10005', '40.706573', '-74.008283'],
  ['345 Park Ave, New York, NY 10154', '40.757137', '-73.972119'],
  ['100 Wall St, New York, NY 10005', '40.704630', '-74.007200'],
  ['11 Times Square, New York, NY 10036', '40.756091', '-73.989567'],
  ['30 Rockefeller Plaza, New York, NY 10112', '40.758740', '-73.978327'],
  ['20 Exchange Pl, New York, NY 10005', '40.706539', '-74.013759'],
  ['299 Park Ave, New York, NY 10171', '40.755708', '-73.974512'],
  ['1 New York Plaza, New York, NY 10004', '40.702036', '-74.011703'],
  ['7 World Trade Center, New York, NY 10007', '40.713008', '-74.013169'],
  ['685 5th Ave, New York, NY 10022', '40.761181', '-73.975412'],
  ['23 Wall St, New York, NY 10005', '40.706314', '-74.009758'],
  ['570 Lexington Ave, New York, NY 10022', '40.757758', '-73.971535'],
  ['9 W 57th St, New York, NY 10019', '40.763642', '-73.975772'],
  ['4 Times Square, New York, NY 10036', '40.756097', '-73.985941'],
  ['1 Union Square W, New York, NY 10003', '40.735751', '-73.990811'],
  ['300 Park Ave, New York, NY 10022', '40.757243', '-73.974413'],
  ['375 Park Ave, New York, NY 10152', '40.758980', '-73.972235'],
  ['1350 Broadway, New York, NY 10018', '40.750836', '-73.987499'],
  ['450 Park Ave, New York, NY 10022', '40.761764', '-73.970987'],
  ['250 Vesey St, New York, NY 10281', '40.713017', '-74.015827'],
  ['1 Battery Park Plaza, New York, NY 10004', '40.703287', '-74.014919'],
  ['3 Times Square, New York, NY 10036', '40.756335', '-73.986618'],
  ['2 Park Ave, New York, NY 10016', '40.747973', '-73.980353'],
  ['55 Water St, New York, NY 10041', '40.703101', '-74.008445'],
  ['7 Bryant Park, New York, NY 10018', '40.754511', '-73.984598'],
  ['110 Wall St, New York, NY 10005', '40.705878', '-74.006145'],
  ['2 Broadway, New York, NY 10004', '40.704136', '-74.012063'],
  ['1177 Avenue of the Americas, New York, NY 10036', '40.757050', '-73.981809'],
  ['1095 6th Ave, New York, NY 10036', '40.754654', '-73.984846'],
  ['230 Park Ave, New York, NY 10169', '40.754522', '-73.976748'],
  ['810 7th Ave, New York, NY 10019', '40.761393', '-73.982896'],
  ['1345 Avenue of the Americas, New York, NY 10105', '40.761876', '-73.978488'],
  ['51 Astor Pl, New York, NY 10003', '40.731413', '-73.988105'],
  ['151 W 42nd St, New York, NY 10036', '40.755592', '-73.986546'],
  ['120 Wall St, New York, NY 10005', '40.705490', '-74.007185'],
  ['1 Bryant Park, New York, NY 10036', '40.755693', '-73.982373'],
  ['1301 Avenue of the Americas, New York, NY 10019', '40.761477', '-73.979320'],
  ['75 Wall St, New York, NY 10005', '40.705901', '-74.008488'],
  ['2 Penn Plz, New York, NY 10121', '40.751028', '-73.993244'],
  ['450 Lexington Ave, New York, NY 10017', '40.753146', '-73.975739'],
];



const generateFakeContractor = (categoryObjectIds) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phoneNum = formatPhoneNumber();
  const randomCategoryObjectId = categoryObjectIds[Math.floor(Math.random() * categoryObjectIds.length)]._id;
  const randomAddressWithCoordinates = nycAddressesWithCoordinates[Math.floor(Math.random() * nycAddressesWithCoordinates.length)];

  const [address, latitude, longitude] = randomAddressWithCoordinates;

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
    address,
    latitude,
    longitude,
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
  await Category.deleteMany({});
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
      // Additional reviews
      'Remarkable service! The dedication to perfection and consistent delivery of outstanding results were truly commendable. Highly recommended for their expertise.',
      'Exceptionally satisfied with the service provided. The professionalism and dedication displayed were beyond compare. I\'ll definitely engage their services again.',
      'A truly professional experience from start to finish. The meticulous attention to detail and proficiency in handling the project were outstanding. Strongly recommend!',
      'Surpassed all expectations! The commitment to delivering top-tier service was evident throughout. I\'ll absolutely rehire for any future projects.',
      'Impressed by the impeccable quality of work. The precision and skill exhibited were truly impressive. A dependable contractor I\'d endorse wholeheartedly.',
      'Outstanding service delivered! The meticulous approach and commitment to excellence were evident at every stage. Highly recommend this contractor for their expertise.',
      'Extremely satisfied with the exceptional service. The professionalism and efficiency shown throughout the project were exemplary. Will definitely hire again!',
      'A seamless, professional experience. The attention to detail and expertise displayed were remarkable. I highly recommend this contractor for their exceptional work.',
      'Exceeded expectations in every aspect! The dedication to delivering high-quality results was evident throughout. I\'ll certainly engage their services again.',
      'Impressed by the exceptional craftsmanship. The attention to detail and commitment to quality were unparalleled. A highly skilled and reliable contractor.',
      'Delivered exceptional service! The attention to detail and dedication to excellence were truly commendable. Highly recommended for their expertise.',
      'Extremely satisfied with the professionalism exhibited. The efficiency and expertise displayed were exceptional. Will definitely engage their services again.',
      'A top-notch, professional experience. The meticulous attention to detail and proficiency in handling the project were truly impressive. Strongly recommend!',
      'Surpassed all expectations! The commitment to delivering outstanding service was evident at every turn. I\'ll absolutely rehire for future projects.',
      'Impressed by the impeccable quality of workmanship. The precision and skill exhibited were truly remarkable. A dependable contractor I\'d endorse wholeheartedly.',
      'Delivered exceptional service! The dedication to perfection and consistent delivery of top-tier results were truly commendable. Highly recommended for their expertise.',
      'Exceptionally satisfied with the outstanding service provided. The professionalism and dedication shown were beyond compare. I\'ll definitely engage their services again.',
      'A truly professional and seamless experience. The attention to detail and expertise displayed were remarkable. I highly recommend this contractor for their exceptional work.',
      'Exceeded expectations in every aspect! The commitment to delivering high-quality service was evident throughout. I\'ll certainly engage their services again.',
      'Impressed by the exceptional craftsmanship. The attention to detail and commitment to excellence were unparalleled. A highly skilled and reliable contractor.'
    ];
    


    const reviews = [];
    for (let i = 0; i < 500; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const contractor = insertedContractors[Math.floor(Math.random() * insertedContractors.length)];
      reviews.push({
        reviewStar: faker.datatype.number({ min: 3, max: 5 }),
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