const app = require('../app');
const request = require('supertest');

describe('GET /api/movies', function () {
    it('Should return movies', function (done) {
        request(app).get('/api/movies')
            .expect(200)
            .expect('Content-Type', /json/, done);
    });
});

//make sure that you will send the movie that is not included in the movie json list
describe('POST /api/movies', function () {
    it('Should post the movie and return it', function (done) {
        request(app).post('/api/movies')
            .expect(201)
            .send({title: 'Predator'})
            .expect('Content-Type', /json/, done);
    });
});