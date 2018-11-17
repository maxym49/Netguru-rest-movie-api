const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();
const request = require('request');
const winston = require('winston');

//[BONUS]
//Displaying search input in ejs
router.get('/', (req, res,) => {
    res.status(200).render('../views/search.ejs');
});

//[BONUS]
//Adding movie
router.post('/', (req, res) => {
    const url = 'http://www.omdbapi.com/?' + 'apikey=7345ff0f&t=' + req.body.title;
    if (!req.body.title) {
        res.json({
            message: 'You need to fill the input!'
        });
    }
    else {
        Movie.findOne({userTitle: req.body.title.toString().toLowerCase()}, (err, existingMovie) => {
            if (!existingMovie) {
                request(url, (err, response, body) => {
                    if (!err) {
                        const data = JSON.parse(body);
                        const movie = new Movie({
                            movie: data,
                            userTitle: req.body.title.toString().toLowerCase()
                        });
                        movie.save().then(movies => {
                            if (movies) {
                                winston.log('info', 'Success - new movie has been added');
                                res.status(201).redirect('/movies');
                            } else {
                                res.status(500).json({message: 'The movie is invalid or it does not exists!'});
                            }
                        }).catch(error => {
                            winston.log('error',error);
                            res.status(500).json({
                                error: error
                            });
                        });
                    }
                    else {
                        winston.log('error',err);
                    }
                });
            }
            else {
                res.status(500).json({message: 'The movie already exists!'});
            }
        });
    }
});

module.exports = router;