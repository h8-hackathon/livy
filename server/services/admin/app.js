const express = require('express');
const app = express();
const router = require('./routes/index');
const cors = require('cors');
const errorHandler = require('./helper/errorHandler');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler);

module.exports = { app };
