'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { api_prefix } = require('./../config').mock;
const app = express();

const { log4js, expressLogger } = require('./utils/logger');
app.use(log4js.connectLogger(expressLogger, { level: log4js.levels.INFO }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('src/static'));
app.use('/mock', require('./server/routers'));

app.use(`/${api_prefix || ''}`, require('./mock'));

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
