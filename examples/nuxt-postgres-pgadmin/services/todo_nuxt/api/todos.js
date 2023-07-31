const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});

// API endpoints
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todo_nuxt');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM todo_nuxt WHERE id = $1', [id]);
    const todo = result.rows[0];
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/todos', async (req, res) => {
  const newTodo = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todo_nuxt (title, completed) VALUES ($1, $2) RETURNING *',
      [newTodo.title, newTodo.completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  try {
    const result = await pool.query(
      'UPDATE todo_nuxt SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [updatedTodo.title, updatedTodo.completed, id]
    );
    const todo = result.rows[0];
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM todo_nuxt WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {
  path: '/api',
  handler: app,
};
