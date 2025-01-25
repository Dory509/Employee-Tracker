const express = require('express');
// Import and require Pool NP
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connection to database
const pool = new Pool({
  user: 'Postgres', 
  password: '123123', 
  host: 'localhost',
  database: 'employeeTracker_db',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Connection error:', err.message);
    return;
  }
  console.log('Connected to the employeeTracker_db database.');
});

// Make an API department
app.post('/api/new-department', ({ body }, res) => {
  const sql = `INSERT INTO department (name) VALUES ($1)`;
  const params = [body.name];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// ALL department
app.get('/api/department', (req, res) => {
  const sql = `SELECT id, name FROM department`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Able to delete a department
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = $1`;
  const params = [req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Department not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.rowCount,
        id: req.params.id,
      });
    }
  });
});

//USING LEFT JOIN for Role ID
app.get('/api/role', (req, res) => {
  const sql = `SELECT role.id, role.title, role.salary, department.name AS department 
               FROM role 
               LEFT JOIN department ON role.department_id = department.id`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

//employee review
app.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = $1 WHERE id = $2`;
  const params = [req.body.review, req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Review not found',
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.rowCount,
      });
    }
  });
});

// Default if field is not found
app.use((req, res) => {
  res.status(404).end();
});

// server starter
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});