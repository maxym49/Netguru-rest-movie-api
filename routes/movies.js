const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();
const winston = require('winston');

//[Netguru task]
//Should fetch list of all movies already present in application database.
//Additional filtering, sorting is fully optional (BONUS points)
router.get('/', (req, res) => {
    Movie.find({})
        .exec()
        .then(movies => {
            winston.log('info', `The quantity of movies: ${movies.length}`);
            res.status(200).render('../views/movies.ejs', {
                movies: movies.sort()
            });
        })
        .catch(error => {
            winston.log('error',error);
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;