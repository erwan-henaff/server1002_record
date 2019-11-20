//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
var mongoose = require('mongoose');


/////////////////   routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const ordersRouter = require('./routes/orders');


//////////////////////////// middleware

const {setCors} = require('./middleware/security');

//////////////////    init the server
var app = express();

// view engine setup
//////// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


//////  logs
app.use(logger('dev'));

/// connect to database 

mongoose.connect('mongodb://localhost:27017/server1002', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
});

mongoose.connection.on(
    'error',
    console.error.bind(console, "connection error:")
);

mongoose.connection.on(
    'open',
    () => {
        console.log("connected to the database ...");
    }
)

/** SET UP LOWDB */
const adapter = new FileSync('data/db.json');
const db = low(adapter);
db.defaults({ records: [], users: [], orders: [] }).write();

//////////////    request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);


////////    static files 
app.use(express.static(path.join(__dirname, 'public')));

////////////////    routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/orders', ordersRouter);


///////////////    error handling

app.use(function(req,res,next){
    const error1 = new Error('Looks like something went wrong, mister');
    next(error1);
});

app.use(function(err,req,res,next){
    res.status(400).send({
        error : {
            message : err.message}
    });
});


module.exports = app;
