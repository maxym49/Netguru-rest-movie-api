const app = require('../app');
const request = require('supertest');

describe('GET /api/comments', function () {
    it('Should return comments', function (done) {
        request(app).get('/api/comments')
            .expect(200)
            .expect('Content-Type', /json/, done);
    });
});

describe('GET /api/comments/:id', function () {
    it('Should return comments related with movie id', function (done) {
        request(app).get('/api/comments/5bf02df475cc1d08f8dfcdcf')
            .expect(200)
            .expect('Content-Type', /json/, done);
    });
});

describe('POST /api/comments', function () {
    it('Should post the comment and return it', function (done) {
        request(app).post(`/api/comments`)
            .send({movieId: '5bf02df475cc1d08f8dfcdcf', comment: 'This test will pass!'})
            .expect(201)
            .expect('Content-Type', /json/, done);
    });
});