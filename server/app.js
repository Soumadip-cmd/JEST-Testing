const express = require('express');
const app = express();
app.use(express.json());

let items = [];

// CREATE
app.post('/items', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// READ
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// UPDATE
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    const deleted = items.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

module.exports = app;
