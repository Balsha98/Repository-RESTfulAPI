# RESTfulAPI - Simple RESTful API Implementation

A RESTful API built with Node.js for managing department, employee, and timecard data. Features a three-layer architecture with comprehensive data validation.

## Features

-   **RESTful Architecture** - Standard HTTP methods and endpoints.
-   **Three-Layer Design** - Separation of concerns with service, business, and data layers.
-   **Data Validation** - Robust validation using Joi.
-   **MySQL Integration** - Relational database for data persistence.
-   **Express Framework** - Fast and minimal web framework.
-   **Auto-Restart** - Nodemon for automatic server restarts during development.
-   **Department Management** - CRUD operations for department data.
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
// Edit database.js script.
HOST = localhost;
USER = root;
PASS = "";
DB = company_data;
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
DELETE /CompanyServices/company?compName=yourCompany                         - Delete company departments.
```

### Department Endpoints

```
GET    /CompanyServices/departments?compName=yourCompany                     - Get all departments for company.
GET    /CompanyServices/department?deptID=yourDeptID&compName=yourCompany    - Get department by ID.
POST   /CompanyServices/department                                           - Create new department.
PUT    /CompanyServices/department                                           - Update department.
DELETE /CompanyServices/department?deptID=yourDeptID&compName=yourCompany    - Delete department.
```

### Employee Endpoints

```
GET    /CompanyServices/employees?compName=yourCompany                       - Get all employees for company.
GET    /CompanyServices/employee?empID=yourEmpID                             - Get employee by ID.
POST   /CompanyServices/employee                                             - Create new employee.
PUT    /CompanyServices/employee                                             - Update employee.
DELETE /CompanyServices/employee?empID=yourEmpID                             - Delete employee.
```

### Timecard Endpoints

```
GET    /CompanyServices/timecards?empID=yourEmpID                            - Get all timecards for employee.
GET    /CompanyServices/timecard?cardID=yourCardID                           - Get timecard by ID.
POST   /CompanyServices/timecard                                             - Create new timecard.
PUT    /CompanyServices/timecard                                             - Update timecard.
DELETE /CompanyServices/timecard?cardID=yourCardID                           - Delete timecard.
```

## Project Structure

```

```

## Data Validation

The API uses Joi for comprehensive data validation:

-   **Required Fields** - Ensures all mandatory fields are provided.
-   **Data Types** - Validates correct data types.
-   **String Formats** - Email, phone number format validation.
-   **Numeric Ranges** - Hours worked limits, ID validation.
-   **Date Formats** - Proper date validation.

## Request Examples

### Create Department

```bash
POST /CompanyServices/department
Content-Type: application/json

{
    "compName": "Company",
    "deptName": "HR",
    "deptNum": "A1001",
    "deptLoc": "Building A"
}
```

### Create Employee

```bash
POST /CompanyServices/employee
Content-Type: application/json

{
    "deptID": 1,
    "empName": "John",
    "empNum": "E1",
    "hireDate": "2025-12-31",
    "jobPos": "Developer",
    "salary": 5000,
    "mngID": 1
}
```

### Create Timecard

```bash
POST /CompanyServices/timecard
Content-Type: application/json

{
    "empID": 1,
    "startTime": "2025-12-31 06:00:00",
    "endTime": "2025-12-31 18:00:00"
}
```

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
