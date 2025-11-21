require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./src/config/passport');
const { connectDb } = require('./src/config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./src/docs/swagger.json');

const app = express();

app.use(cors());
app.use(
  express.json({ type: ['application/json', 'application/*+json', 'text/json'] })
);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'devSecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./src/routes/auth.routes'));
app.use('/api/transactions', require('./src/routes/transactions.routes'));
app.use('/api/accounts', require('./src/routes/accounts.routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;

  res.status(status).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDb();
});
