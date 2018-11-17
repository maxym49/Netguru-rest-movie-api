const express = require('express');
const request = require('request');
const Movie = require('../../models/movie');
const router = express.Router();
const winston = require('winston');


//[Netguru task]
//Should fetch list of all movies already present in application database.
//Additional filtering, sorting is fully optional (BONUS points)
router.get('/', (req, res) => {
    Movie.find({})
        .exec()
        .then(movies => {
            winston.log('info', `[API] - The quantity of movies: ${movies.length}`);
            res.status(200).json(movies.sort());
        })
        .catch(error => {
            winston.log('error', error);
            res.status(500).json({
                error: error
            });
        });
});

//[Netguru task]
//Request response should include full movie object, along with all data fetched from external API.
//Request body should contain only movie title, and its presence should be validated.
//Based on passed title, other movie details should be fetched from http://www.omdbapi.com/ (or other similar, public movie database) - and saved to application database.
router.post('/', (req, res) => {
    const url = 'http://www.omdbapi.com/?' + 'apikey=7345ff0f&t=' + req.body.title;
    if (!req.body.title) {
        res.json({
            message: 'You need to fill the title property!'
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
                                winston.log('info', '[API] - New movie has been posted');
                                res.status(201).json(movies);
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

////If you want to delete a specific movie you can uncomment this method
// router.delete('/:id', (req, res) => {
//     const id = req.params.id;
//     Movie.remove({_id: id})
//         .exec()
//         .then(movies => {
//             winston.log('info', `[API] - Movie has been removed [id:${id}]`);
//             res.status(200).json(movies);
//         })
//         .catch(error => {
//             winston.log('error', error);
//             res.status(500).json({
//                 error: error
//             });
//         });
// });
module.exports = router;