const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const cors = require("cors");

const { database } = require('./keys');

// Initializations
const app = express();
require('./lib/passport');

// CORS
app.use(cors({ origin: "*" }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Routes
app.use('/api', require('./routes'));
app.use('/api', require('./routes/recover'));
app.use('/api', require('./routes/analista'));
app.use('/api', require('./routes/control-estudio'));

// Starting Server
app.listen(app.get('port'), () => console.log('Server on port ', app.get('port')));