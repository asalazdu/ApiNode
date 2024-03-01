const express = require('express');
const app = express();

const taskRoutes = require('./routes/taskRouter');

app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);

module.exports = app;