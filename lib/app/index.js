const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const config = require('../config');
const guess = require('./guess/router');

const app = express();

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession(config.sessionOptions));

// Features
app.use('/guess', guess.router);

app.use(express.static('./static'));

module.exports = { app };
