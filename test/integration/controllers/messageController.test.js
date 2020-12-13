const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
const mockList = require('../../mocks/invalidUsernameChatsMock.json')
let server

describe('Auth Controller Integration Tests', () => {
    before(() => {
        process.env.NODE_ENV = 'test'
    })

    beforeEach(() => {
        server = require('../../../src/app')
    })

    afterEach(done => {
        server.close( () => {
            delete require.cache[require.resolve( '../../../src/app' )]
            done()
        })
    })

    it('Should return an empty list for invalid username', done => {
        request(server)
            .get('/message/get_chats/invalid_username')
            //.set('Accept', 'application/json')
            //.expect('Content-Type', /json/)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.statusCode).to.be.a('number')
                expect(res.statusCode).to.eq(200)
                expect(res.body).to.be.deep.eq(mockList)
                done()
            })
    }).timeout(15000)
})

