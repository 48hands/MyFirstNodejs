const express = require('express');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const logger = require('./middleware/logger');
const setHeader = require('./middleware/setHeader');

const home = require('./routes/home');
const courses = require('./routes/courses');

const app = express();

app.use(logger);
app.use(setHeader);
app.use(morgan('tiny'));

app.use('/', home);
app.use('/api/courses', courses);

const port = process.env.PORT || 3000
app.listen(port, () =>
{
  startupDebugger('StartUp Seerver!');
  console.log(`Application Author: ${config.get('name')}`);
  console.log(`Applicaion Mail Server: ${config.get('email.host')}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`app: ${app.get('env')}`);
  console.log(`Server Start Port: ${port}`);
});
