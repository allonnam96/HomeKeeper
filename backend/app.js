const debug = require('debug');
const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./models/User');
require('./models/Contractor');
require('./models/Category');
require('./models/Review');
require('./models/Appointment')
require('./models/Document')
require('./config/passport');
const passport = require('passport');

const usersRouter = require('./routes/api/users'); 
const contractorsRouter = require('./routes/api/contractors');
const categoriesRouter = require('./routes/api/categories');
const reviewsRouter = require('./routes/api/reviews');
const appointmentsRouter = require('./routes/api/appointments');
const documentsRouter = require('./routes/api/documents');
const csrfRouter = require('./routes/api/csrf');

const app = express();

app.use(logger('dev')); // log request components (URL/method) to terminal
app.use(express.json()); // parse JSON request body
app.use(express.urlencoded({ extended: false })); // parse urlencoded request body
app.use(cookieParser()); // parse cookies as an object on req.cookies

app.use(passport.initialize());
const cors = require('cors');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');

// Security Middleware
if (!isProduction) {
    // Enable CORS only in development because React will be on the React
    // development server (http://localhost:3000). (In production, the Express 
    // server will serve the React files statically.)
    app.use(cors());
}

// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token
app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
);

// Attach Express routers
app.use('/api/users', usersRouter); // update the path
app.use('/api/contractors', contractorsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/csrf', csrfRouter);

// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});
  
const serverErrorLogger = debug('backend:error');
  
// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
});

module.exports = app;
