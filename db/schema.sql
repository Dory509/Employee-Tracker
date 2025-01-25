DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

\c employeeTracker_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
name VARCHAR(30) UNIQUE NOT NULl
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary decimal NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id) ON DELETE SET NULL
);
  
CREATE TABLE employee (
  
     id SERIAL PRIMARY KEY,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INTEGER REFERENCES role (id) ON DELETE CASCADE,
    manager_id INTEGER REFERENCES employee (id) ON DELETE SET NULL
);
