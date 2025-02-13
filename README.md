# Employee-Tracker


Description

The Employee Tracker is a powerful command-line application designed for businesses to efficiently manage employee records. It allows users to view, add, and update employees, roles, and departments in a structured PostgreSQL database. Built using Node.js, Inquirer, and PostgreSQL, this tool streamlines HR and management tasks with an intuitive command-line interface.

✅ Track and manage employees in real-time
✅ Easily update roles and department structures
✅ Maintain an organized company hierarchy
✅ Seamless interaction with PostgreSQL for secure data handling

Table of Contents
	•	Installation
	•	Usage
	•	Features
	•	Database Schema
	•	Technologies Used
	•	Demo
	•	License
	•	Questions

Installation

Step 1: Clone the Repository

git clone https://github.com/your-username/employee-tracker.git
cd employee-tracker

Step 2: Install Dependencies

npm install

Step 3: Set Up PostgreSQL Database
	1.	Create the database in PostgreSQL:

CREATE DATABASE employeeTracker_db;


	2.	Connect to the database using psql:

psql -d employeeTracker_db


	3.	Run the schema file to create tables:

\i db/schema.sql


	4.	(Optional) Seed the database with test data:

\i db/seeds.sql



Step 4: Configure Database Connection

Modify index.js with your PostgreSQL credentials:

const pool = new Pool({
  user: "your_username",
  password: "your_password",
  host: "localhost",
  database: "employeeTracker_db",
  port: 5432,
});

Usage

Start the Application

Run the following command in your terminal:

node index.js

Select an Action from the Menu

The application presents a dynamic menu where users can choose an option:

? Please select an option:
  > View All Employees
    View All Roles
    View All Departments
    View All Employees By Department
    Update Employee Role
    Add Employee
    Add Role
    Add Department
    Exit

Perform Business Operations

✅ View all employees, roles, and departments
✅ Add new employees, roles, and departments
✅ Update an employee’s role to reflect promotions or restructuring
✅ View employees based on departments

After completing an action, the menu reappears, allowing users to continue managing records seamlessly.

Features

Effortless Employee Management-Track employees, roles, and departments with ease
Role & Department Assignment- Organize employees within structured departments
 Real-time Updates-Modify employee roles dynamically
PostgreSQL Integration- Secure and efficient database transactions
Command-Line Friendly-Fast and intuitive CLI interface
Formatted Data Display-View tables in a structured layout

Database Schema

department Table

Column	Data Type	Constraints
id	SERIAL	PRIMARY KEY
name	VARCHAR(30)	UNIQUE, NOT NULL

role Table

Column	Data Type	Constraints
id	SERIAL	PRIMARY KEY
title	VARCHAR(30)	UNIQUE, NOT NULL
salary	DECIMAL	NOT NULL
department_id	INTEGER	REFERENCES department(id) ON DELETE SET NULL

employee Table

Column	Data Type	Constraints
id	SERIAL	PRIMARY KEY
first_name	VARCHAR(30)	NOT NULL
last_name	VARCHAR(30)	NOT NULL
role_id	INTEGER	REFERENCES role(id) ON DELETE CASCADE
manager_id	INTEGER	REFERENCES employee(id) ON DELETE SET NULL

Technologies Used

Node.js -JavaScript runtime for backend logic
Inquirer.js -Interactive command-line user prompts PostgreSQL -Secure and scalable relational database
pg (node-postgres) -PostgreSQL client for executing queries
Console.table -Structured display of database records

Demo

📽Walkthrough Video: Click here to watch 
( https://app.screencastify.com/v3/watch/4y8Gqyz3l2eF5fazgw94 )


License

This project is licensed under the MIT License. Feel free to modify and use it in your projects.

Questions?

Email: dorycelestin@outlook.com
GitHub: Dory509

For further inquiries, reach out via GitHub or email!


