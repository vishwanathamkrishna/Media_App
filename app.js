const express = require('express');
const app = express();
const db = require('./db');

const AdminController = require('./controllers/AdminController');
app.use('/admin', AdminController);

module.exports = app;