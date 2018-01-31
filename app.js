const express = require('express');
const http = require('http');
const path = require('path');
const mysql = require('mysql');

// require routes
var home = require('./routes/homeRouter');
var dashboard = require('./routes/dashboardRouter');
var details = require('./routes/detailsRouter');
var listings = require('./routes/listingsRouter');
var login = require('./routes/loginRouter');
var signup = require('./routes/signupRouter');
var upload = require('./routes/uploadRouter');

// configure database
global.connection = mysql.createConnection({
  host: 'localhost',
  user: 'fa17g10',
  password: 'csc648fa17g10',
  database: 'fa17g10'
});

// connect to database
connection.connect((error) => {
  if(error) {
    console.log(error);
  }
  console.log('Successfully connected to database!');
});

// set up server
const port = 17010;
var app = express();
app.set('port', port);

// configure templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.use(express.static(path.join(__dirname,'/public')));
app.use('/details', express.static(path.join(__dirname,'/public')));
app.use('/dashboard', express.static(path.join(__dirname,'/public')));
app.use('/', home);
app.use('/dashboard', dashboard);
app.use('/details', details);
app.use('/listings', listings);
app.use('/login', login);
app.use('/signup', signup);
app.use('/upload', upload);

const startServer = () => {
  server.listen(app.get('port'), () => {
    console.log(path.join(__dirname,'/public'));
    console.log('Server is running on port ' + app.get('port'));
  });
}

const server = http.createServer(app);
startServer();
