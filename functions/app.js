const express = require('express');
const serverless = require('serverless-http');
const apiRoutes = require('./api');

const app = express();
app.use('/api', apiRoutes);

module.exports.handler = serverless(app);