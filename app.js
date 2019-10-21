const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(MONGO_URL,
    {
        useNewUrlParser: true
    });


const moviesApiRouter = require('./routes/api/movies');
const commentsApiRoute = require('./routes/api/comments');

const moviesRouter = require('./routes/movies');
const searchRoute = require('./routes/search');
const commentsRoute = require('./routes/comments');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//Simple API
app.use('/api/movies', moviesApiRouter);
app.use('/api/comments', commentsApiRoute);

// Displaying all movies, comments in ejs
app.use('/movies', moviesRouter);
app.use('/search', searchRoute);
app.use('/comments', commentsRoute);


app.use('/', (req, res) => {
    res.status(200).render('../views/main.ejs');
});


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
    next(error);
});


module.exports = app;
