const express = require('express');
const Comments = require('../../models/comment');
const Movie = require('../../models/movie');
const router = express.Router();
const winston = require('winston');

//[Netguru Task]
//Should fetch list of all comments present in application database.
router.get('/', (req, res) => {
    Comments.find({})
        .exec()
        .then(comments => {
            winston.log('info', '[API] - Fetched all comments');
            res.status(200).json(comments);
        })
        .catch(error => {
            winston.log('error', error);
            res.status(500).json({
                error: error
            });
        });
});

//[Netguru Task}
//Request body should contain ID of movie already present in database, and comment text body.
//Comment should be saved to application database and returned in request response
router.post('/', (req, res) => {
    if (!req.body.movieId && !req.body.comment) {
        res.json({
            message: 'You need to fill the moveId!'
        });
    }
    else {
        Movie.findOne({_id: req.body.movieId}, (err, movie) => {
            if (!err) {
                const comment = new Comments({
                    movieId: movie.id,
                    text: req.body.comment
                });
                comment.save().then(comment => {
                    if (comment) {
                        winston.log('info', `[API] - New comment posted: ${comment}`);
                        res.status(201).json(comment);
                    } else {
                        res.status(500).json({message: 'The id of movie is invalid or it does not exists!'});
                    }
                }).catch(error => {
                    winston.log('error', error);
                    res.status(500).json({
                        error: error
                    });
                });
            }
            else {
                winston.log('error', err);
                res.status(500).json({message: err});
            }
        });
    }
});

//[Netguru Task]
// Should allow filtering comments by associated movie, by passing its ID.
router.get('/:movieId', (req, res) => {
    const id = req.params.movieId;
    Comments.find({
        movieId: id
    }).exec().then(comments => {
        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(500).json({message: 'The movie is invalid or it does not exists!'});
        }
    })
        .catch(err => {
            winston.log('error', err);
            res.status(500).json({error: err});
        }
        );
});

// If you want to delete a specific comment you can uncomment this method
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Comments.remove({_id: id})
        .exec()
        .then(movies => {
            winston.log('info', `[API] - Comment has been removed [id:${id}]`);
            res.status(200).json(movies);
        })
        .catch(error => {
            winston.log('error', error);
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;