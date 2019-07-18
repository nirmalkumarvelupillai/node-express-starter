
import APP_CONFIG from './config';
const fs = require('fs');
const express = require("express");
const logger = require('morgan');
const path = require('path');
const bodyparser = require("body-parser");
const expressRequestId = require('express-request-id');

const router = express.Router();
const app = express();
const routes = require('./routes');
const winston = require('./config/winston');

app.use(expressRequestId());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const appLogStream = fs.createWriteStream(path.join(__dirname, '/logs/application.log'), { flags: 'a' })
const errorLogStream = fs.createWriteStream(path.join(__dirname, '/logs/error.log'), { flags: 'a' })

logger.token('id', req => req.id);
logger.token('headers', req => JSON.stringify(req.headers, null, 2));
const loggerFormat = (tokens, req, res) => {
  return [
    tokens.id(req),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.headers(req)
  ].join(' ')
}; // ':id [:date[web]]" :method :url" :status :responsetime';
app.use(logger(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode < 400
  },
  stream: winston.stream // errorLogStream // process.stderr 
}));
app.use(logger(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode >= 400
  },
  stream: winston.stream // appLogStream // process.stdout
}));

app.use(routes);

app.set("PORT", APP_CONFIG.APP_PORT);
app.listen(app.get('PORT'), () => {
  console.log(`Running on ${app.get('PORT')}`);
});