DROP DATABASE IF EXISTS company_data;

CREATE DATABASE company_data;

USE company_data;

CREATE TABLE department(
	deptID INT NOT NULL AUTO_INCREMENT,
	compName VARCHAR(25) NOT NULL,
	deptName VARCHAR(255) NOT NULL,
	deptNum VARCHAR(20) NOT NULL,
	deptLoc VARCHAR(255) NULL,
	PRIMARY KEY (deptID)
);

INSERT INTO department VALUES 
(1, 'bb8512', 'IT', 'D1', 'Building A'),
(2, 'bb8512', 'HR', 'D2', 'Building B'),
(3, 'bb8512', 'Finance', 'D3', 'Building C');

-- SELECT * FROM department;

CREATE TABLE employee(
	empID INT NOT NULL AUTO_INCREMENT,
	deptID INT NOT NULL,
	empName VARCHAR(50) NOT NULL,
	empNum VARCHAR(20) NOT NULL,
	hireDate DATE NOT NULL,
	jobPos VARCHAR(30) NOT NULL,
	salary FLOAT NOT NULL,
    mngID INT NOT NULL,
	PRIMARY KEY (empID)
);

INSERT INTO employee VALUES 
(1, 1, 'Baki', 'E1', '2021-06-15', 'Software Engineer', 75000, 1),
(2, 2, 'John', 'E2', '2019-03-10', 'HR Manager', 65000, 2),
(3, 3, 'Paul', 'E3', '2020-08-21', 'Financial Analyst', 70000, 3);

-- SELECT * FROM employee;

CREATE TABLE timecard(
	cardID INT NOT NULL AUTO_INCREMENT,
	empID INT NOT NULL,
	startTime DATETIME NOT NULL,
	endTime DATETIME NOT NULL,
	PRIMARY KEY (cardID),
    FOREIGN KEY (empID) REFERENCES employee (empID) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);

INSERT INTO timecard VALUES 
(1, 1, '2024-11-25 09:00:00', '2024-11-25 17:00:00'),
(2, 2, '2024-11-26 09:00:00', '2024-11-26 17:30:00'),
(3, 3, '2024-11-27 10:15:00', '2024-11-27 11:15:00');

-- SELECT * FROM timecard;
