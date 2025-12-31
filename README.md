# RESTfulAPI - Simple RESTful API Implementation

A RESTful API built with Node.js for managing company, employee, and timecard data. Features a three-layer architecture with comprehensive data validation.

## Features

-   **RESTful Architecture** - Standard HTTP methods and endpoints.
-   **Three-Layer Design** - Separation of concerns with service, business, and data layers.
-   **Data Validation** - Robust validation using Joi,
-   **MySQL Integration** - Relational database for data persistence,
-   **Express Framework** - Fast and minimal web framework,
-   **Auto-Restart** - Nodemon for automatic server restarts during development.
-   **Company Management** - CRUD operations for company data.
-   **Employee Management** - Complete employee information handling.
-   **Timecard Tracking** - Employee timecard management system.

## Tech Stack

-   **Node.js** - Runtime Environment
-   **Express** - Web Application Framework
-   **MySQL** - Relational Database
-   **Joi** - Data Validation Library
-   **Nodemon** - Development Auto-Restart Utility

## Architecture

The application follows a three-layer architecture pattern:

### Service Layer

-   Handles HTTP requests and responses.
-   Routes incoming requests to appropriate handlers.
-   Passes data to the business layer.
-   Returns responses to clients.

### Business Layer

-   Validates incoming data using Joi.
-   Implements business logic and rules.
-   Invokes data layer for database operations.
-   Processes and transforms data.

### Data Layer

-   Manages database connections.
-   Executes SQL queries.
-   Performs CRUD operations.
-   Returns data to business layer.

```
Client Request
      ↓
Service Layer (Routes & Controllers)
      ↓
Business Layer (Validation & Logic)
      ↓
Data Layer (Database Operations)
      ↓
MySQL Database
```

## Installation

### Prerequisites

-   Node.js 14.0 or higher.
-   MySQL server.
-   npm (Node Package Manager).

### Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Balsha98/Repository-RESTfulAPI.git
```

2. Navigate to the project directory:

```bash
cd Repository-RESTfulAPI/restful-api
```

3. Install dependencies:

```bash
npm install
```

4. Configure database connection:

```javascript
// Edit config/database.js or create a .env file
DB_HOST = localhost;
DB_USER = root;
DB_PASSWORD = "";
DB_NAME = company_data;
```

5. Import the database schema:

```bash
mysql -u root -p company_data < assets/database/database.sql
```

6. Start the development server:

```bash
npm start server
```

7. The API will be running at:

```
http://localhost:8080
```

## API Endpoints

### Company Endpoints

```
GET    /api/companies       - Get all companies
GET    /api/companies/:id   - Get company by ID
POST   /api/companies       - Create new company
PUT    /api/companies/:id   - Update company
DELETE /api/companies/:id   - Delete company
```

### Employee Endpoints

```
GET    /api/employees       - Get all employees
GET    /api/employees/:id   - Get employee by ID
POST   /api/employees       - Create new employee
PUT    /api/employees/:id   - Update employee
DELETE /api/employees/:id   - Delete employee
```

### Timecard Endpoints

```
GET    /api/timecards              - Get all timecards
GET    /api/timecards/:id          - Get timecard by ID
GET    /api/employees/:id/timecards - Get timecards for employee
POST   /api/timecards              - Create new timecard
PUT    /api/timecards/:id          - Update timecard
DELETE /api/timecards/:id          - Delete timecard
```

## Project Structure

```
Repository-RESTfulAPI/
│
├── config/
│   └── database.js         # Database configuration
│
├── layers/
│   ├── service/            # Service layer
│   │   ├── routes/         # Route definitions
│   │   └── controllers/    # Request handlers
│   │
│   ├── business/           # Business layer
│   │   ├── validation/     # Joi validation schemas
│   │   └── logic/          # Business logic
│   │
│   └── data/               # Data layer
│       ├── company.js      # Company data operations
│       ├── employee.js     # Employee data operations
│       └── timecard.js     # Timecard data operations
│
├── database/
│   └── schema.sql          # Database schema
│
├── server.js               # Application entry point
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Request/Response Examples

### Create Company

```bash
POST /api/companies
Content-Type: application/json

{
  "company_name": "Tech Corp",
  "address": "123 Main St",
  "phone": "555-0100",
  "email": "contact@techcorp.com"
}
```

### Create Employee

```bash
POST /api/employees
Content-Type: application/json

{
  "company_id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@techcorp.com",
  "phone": "555-0101",
  "hire_date": "2024-01-15"
}
```

### Create Timecard

```bash
POST /api/timecards
Content-Type: application/json

{
  "employee_id": 1,
  "date": "2024-01-20",
  "hours_worked": 8,
  "description": "Software development tasks"
}
```

## Data Validation

The API uses Joi for comprehensive data validation:

-   **Required fields** - Ensures all mandatory fields are provided
-   **Data types** - Validates correct data types
-   **String formats** - Email, phone number format validation
-   **Numeric ranges** - Hours worked limits, ID validation
-   **Date formats** - Proper date validation

## Dependencies

```json
{
    "express": "^4.21.1",
    "joi": "^13.1.0",
    "mysql": "^2.18.1",
    "nodemon": "^3.1.7"
}
```

## Let's Connect

If you enjoyed this project or have any questions, feel free to reach out!

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:balsa.bazovic@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/balsha-bazovich)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Balsha98)

⭐ If you found this project helpful, please consider giving it a star!

---

Made with NodeJS and ❤️!
