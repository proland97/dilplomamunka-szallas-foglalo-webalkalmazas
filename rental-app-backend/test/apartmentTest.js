const expect = require('chai').expect
const request = require('supertest')
const User = require('../models/user')
const Apartment = require('../models/apartment')

const app = require('../app')
const testdb = require('../db/database')

// util variables
let apartmentId

describe('Apartment test', () => {

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

    it('Get all apartments', async() => {
        let res = await request(app).get('/apartment')
        const body = res.body
        expect(res.statusCode).to.equal(200)
        expect(body.apartments[0]).to.have.property('id')
    })

    it('Get own apartments, without token', async() => {
        let res = await request(app).get('/apartment/own')
        const body = res.body
        expect(res.statusCode).to.equal(401)
        expect(body).to.have.property('error', 'Access Denied')
    })

    it('Get own apartments, with invalid token', async() => {
        let res = await request(app)
            .get('/apartment/own')
            .set('Authorization', 'Bearer abcxyz')
        const body = res.body
        expect(res.statusCode).to.equal(403)
        expect(body).to.have.property('error', 'Invalid token')
    })

    it('Full apartment test', async() => {
        let res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@test.com',
                password: 'asdASD123',
            })
        expect(res.statusCode).to.equal(200)
        const token = res.body.authToken

        res = await request(app)
            .post('/apartment')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "test apartment",
                description: "this is from test",
                rooms: 2,
                pricePerDay: 1756.758,
                address: "Test utca",
                amenities: {
                    beds: 3,
                    TV: 4
                }
            })
        expect(res.statusCode).to.equal(201)
        apartmentId = res.body.id

        res = await request(app)
            .get(`/apartment/${apartmentId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('id', apartmentId)
        expect(res.body).to.have.property('name', 'test apartment')

        res = await request(app)
            .put('/apartment')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 2,
                name: 'updated'
            })
        expect(res.statusCode).to.equal(200)

        res = await request(app)
            .get(`/apartment/${apartmentId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('id', apartmentId)
        expect(res.body).to.have.property('name', 'updated')

        res = await request(app)
            .delete(`/apartment/${apartmentId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('message', 'Apartment deleted')

        res = await request(app)
            .get(`/apartment/${apartmentId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.body).to.equal(null)
    })
})