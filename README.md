Personal Finance API

This project was created for CSE 341 – Web Services as part of the Week 03–04 assignment. The goal was to build a small but functional REST API that supports full CRUD operations, uses MongoDB Atlas as a database, includes proper validation and error handling, and is fully documented through Swagger.
In Week 04, the project will also include authentication using OAuth.

Overview

The API manages two main resources:

Accounts – bank accounts or financial accounts the user wants to track

Transactions – income, expenses, savings, bills, etc.

The idea is simple: provide a basic backend service that could later be used by a budgeting app or personal finance dashboard.

Key Features
✔ Full CRUD Functionality

Both collections (accounts and transactions) support:

GET all

GET by ID

POST

PUT

DELETE

✔ Two Collections in MongoDB

accounts

transactions

At least one collection (transactions) contains 7+ fields, as required.

✔ Data Validation

The API uses Zod to validate POST and PUT requests.
Invalid data returns a 400 Bad Request.

✔ Error Handling

All routes use try/catch blocks, and unexpected issues are caught by a global error-handling middleware that returns a 500 Internal Server Error when needed.

✔ Swagger API Documentation

The entire API is documented and testable under the /docs route.

✔ Deployment Ready

The API is configured to run on Render, with environment variables stored securely.

Tech Stack

Node.js

Express

MongoDB Atlas

Zod (validation)

Swagger (API documentation)

Render (hosting)

Project Structure
src/
  config/
    db.js
  controllers/
    accounts.controller.js
    transactions.controller.js
  routes/
    accounts.routes.js
    transactions.routes.js
  validation/
    accounts.schema.js
    transactions.schema.js
    validate.js
  docs/
    swagger.json
app.js
package.json

Database Collections
Accounts Example
{
  "_id": "674f1e9b2a501b4d933e2123",
  "name": "Main Checking Account",
  "type": "checking",
  "balance": 1200.50,
  "currency": "USD",
  "createdAt": "2025-11-11T18:20:32.000Z"
}

Transactions Example
{
  "_id": "674f1e9b2a501b4d933e2124",
  "type": "expense",
  "amount": 40,
  "category": "food",
  "description": "Lunch",
  "paymentMethod": "card",
  "date": "2025-11-12T13:00:00.000Z",
  "accountId": "674f1e9b2a501b4d933e2123",
  "createdAt": "2025-11-12T14:30:00.000Z"
}

Endpoints
Accounts

GET /api/accounts

GET /api/accounts/:id

POST /api/accounts

PUT /api/accounts/:id

DELETE /api/accounts/:id

Transactions

GET /api/transactions

GET /api/transactions/:id

POST /api/transactions

PUT /api/transactions/:id

DELETE /api/transactions/:id

Swagger Documentation

All routes are documented and testable at:

/docs

Environment Variables

The project uses a .env file containing:

MONGO_URI=your_mongo_connection_string
DB_NAME=financeDB
PORT=3000


(The .env file is ignored in GitHub for security.)








Author

Brandon Caldarella
CSE 341 — Web Services
Brigham Young University–Idaho
