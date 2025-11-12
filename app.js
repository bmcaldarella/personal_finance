require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./src/config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./src/docs/swagger.json');

const app = express();

app.use(cors());
app.use(express.json({ type: ['application/json', 'application/*+json', 'text/json'] }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/transactions', require('./src/routes/transactions.routes'));
app.use('/api/accounts', require('./src/routes/accounts.routes'));

app.get('/', (_req, res) => res.send('Welcome to the API'));

// ===== SWAGGER DOCS =====
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((err, req, res, next) => {
  console.error('ERROR:', err);

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
