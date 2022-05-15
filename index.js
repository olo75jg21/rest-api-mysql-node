const express = require('express');
const cors = require('cors');
const app = express();

const pool = require('./db');

//middleware
// allows to use req.body
app.use(express.json());

// routes
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES (?)', [description]);

    res.json('Todo was added');
  } catch (e) {
    console.log(e.message);
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todo');

    res.json(todos[0]);
  } catch (e) {
    console.log(e.message);
  }
});

app.get('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ?`, [id]);

    res.json(todo[0]);
  } catch (e) {
    console.log(e.message);
  }
});

app.put('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const todo = await pool.query(`UPDATE todo SET description = ? WHERE todo_id = ?`, [description, id]);

    res.json('Todo was updated successfully');
  } catch (e) {
    console.log(e.message);
  }
});

app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(`DELETE FROM todo WHERE todo_id = ?`, [id]);

    res.json('Todo was deleted');
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});