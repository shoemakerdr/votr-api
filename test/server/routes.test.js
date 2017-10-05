import { assert } from 'chai'
import supertest from 'supertest'
// import app from '../src/index'

const request = supertest('http://localhost:8000')

describe('GET /', function () {
    const json = JSON.stringify({message: 'Welcome to the votr API. Please use the /api route.'})
    it('should respond with json', function (done) {
        // request(app)
        request
            .get('/')
            .set('Accept', 'application/json')
            .expect(200, (err, res) => {
                if (err) return done(err)
                assert.equal(res.body, json)
                done()
            })
    })
})

describe('GET /api', function () {
    const json = JSON.stringify({message: 'Welcome to the Votr API!'})
    it('should respond with json', function (done) {
        request
            .get('/api')
            .set('Accept', 'application/json')
            .expect(200, (err, res) => {
                if (err) return done(err)
                assert.equal(res.body, json)
                done()
            })
    })
})

describe('GET /api/polls', function () {
    it('should respond with json', function (done) {
        request
            .get('/api/polls')
            .set('Accept', 'application/json')
            .expect(200, done)
    })
})

describe('GET /api/polls/:poll', function () {
    it('should respond with json', function (done) {
        request
            .get('/api/polls/1')
            .set('Accept', 'application/json')
            .expect(200, done)
    })
})

describe('GET /api/users/:user', function () {
    it('should respond with json', function (done) {
        request
            .get('/api/users/1')
            .set('Accept', 'application/json')
            .expect(200, done)
    })
})

describe('GET /api/users/:user/polls', function () {
    it('should respond with json', function (done) {
        request
            .get('/api/users/1/polls')
            .set('Accept', 'application/json')
            .expect(200, done)
    })
})
