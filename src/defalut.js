'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const registHelpers = require('./hbsHelpers');
const { api_prefix } = require('./../config').mock;
const { serverSideRender, env } = require('./../config');
const app = express();

const { log4js, expressLogger } = require('./utils/logger');

app.use(log4js.connectLogger(expressLogger, { level: log4js.levels.INFO }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, '/static')));
app.use('/mock', require('./server/routers'));

app.set('view engine', 'html');
app.engine('html', registHelpers(hbs).__express);
app.set('views', path.join(__dirname, './server/templates'));
app.locals = Object.assign({}, app.locals, { env, cache: env === 'production' ? true : false }, serverSideRender);

app.use(`/${api_prefix || ''}`, require('./mock'));

app.get('/', (req, res) => {
    res.redirect('/mock/management');
})

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
