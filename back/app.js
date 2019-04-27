const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
require('./database');
const routing = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, OPTIONS, GET, POST, DELETE");
  next();
});
app.use(express.static(path.join(__dirname, '../client-build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use(routing);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});


app.listen(3000);
