const express = require('express');
const Comment = require('../models/comment');
const Movie = require('../models/movie');
const router = express.Router();
const winston = require('winston');

//[BONUS]
//Displaying comments in ejs
router.get('/', (req, res) => {
    Comment.find({})
        .exec()
        .then(comments => {
            winston.log('info','Rendering comments.ejs');
            res.status(200).render('../views/comments.ejs', {
                comments: comments
            });
        })
        .catch(error => {
            winston.log('error',error);
            res.status(500).json({
                error: error
            });
        });
});

//[BONUS]
//Add comments in ejs
router.get('/new', (req, res) => {
    Comment.find({})
        .exec()
        .then(comments => {
            winston.log('info', `Rendering newComment.ejs`);
            res.status(200).render('../views/newComment.ejs', {
                comments: comments
            });
        })
        .catch(error => {
            winston.log('error',error);
            res.status(500).json({
                error: error
            });
        });
});

//[Bonus}
//Adding comments with input
router.post('/new', (req, res) => {
    if (!req.body.movieId) {
        res.json({
            message: 'You need to fill the input!'
        });
    }
    else {
        Movie.findOne({_id: req.body.movieId}, (err, movie) => {
            if (!err) {
                const comment = new Comment({
                    movieId: movie.id,
                    text: req.body.comment
                });
                comment.save().then(comments => {
                    if (comments) {
                        winston.log('info', `new comment: ${comments}`);
                        res.status(201).redirect('/comments');
                    } else {
                        res.status(500).json({message: 'The id of movie is invalid or it does not exists!'});
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
                res.status(500).json({message: err});
            }
        });
    }
});

//[BONUS]
//Find comment by passing movie's id
router.post('/comment', (req, res) => {
    Comment.findOne({movieId: req.body.movieIdentify})
        .exec()
        .then(comment => {
            winston.log('info', `Comment related with movie Id ${comment}`);
            res.status(200).json(comment);
        })
        .catch(error => {
            winston.log('error',error);
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;