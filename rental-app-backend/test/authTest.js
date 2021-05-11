const expect = require('chai').expect
const request = require('supertest')
const User = require('../models/user')
const Apartment = require('../models/apartment')

const app = require('../app')
const testdb = require('../db/database')

// Util variables
let token

describe('Auth test', () => {

    before(async() => {
        await testdb.sync({ force: true })
        let user = await User.create({
            username: 'testuser',
            email: 'test@test.com',
            password: 'asdASD123'
        })
        await Apartment.create({
            name: 'first apartment',
            description: 'this is a good apartment',
            rooms: 4,
            pricePerDay: 3842.758,
            address: 'Valami utca 25',
            amenities: {
                beds: 3,
                TV: 4
            },
            userId: user.id,
            createdAt: '2021-01-18 22:57:10.338+01',
            updatedAt: '2021-01-18 22:57:10.338+01'
        })
    })

    after(() => {});

    it('Sign up', async() => {
        let res = await request(app)
            .post('/auth/signup')
            .send({
                email: 'test2@test.com',
                username: 'test2',
                password: 'asdASD123',
            })
        expect(res.statusCode).to.equal(201)
        expect(res.body).to.have.property('message', 'Signup was successful!')
    })

    it('Sign in with incorrect password', async() => {
        let res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@2bad.com',
                password: 'badpassword',
            })
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.have.property('error', 'Email or password is wrong!')
    })

    it('Sign in', async() => {
        let res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test2@test.com',
                password: 'asdASD123',
            })
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('authToken')
        token = res.body.authToken
    })

    it('Use auth token', async() => {
        let res = await request(app)
            .get('/apartment/own')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).to.equal(200)
    })

    it('Use incorrect auth token', async() => {
        let res = await request(app)
            .get('/apartment/own')
            .set('Authorization', `Bearer incorrect token`)
        expect(res.statusCode).to.equal(403)
        expect(res.body).to.have.property('error', 'Invalid token')
    })

})