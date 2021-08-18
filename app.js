const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var hbs = exphbs.create({});

const oneDay = 1000 * 60 * 60 * 24;

// cookie parser middleware


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); // New

// Parse application/json 
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));
 
// Templating Engine 
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');


const routes = require('./server/routes/guest');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});