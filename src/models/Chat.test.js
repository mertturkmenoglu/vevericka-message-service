const expect = require('chai').expect;
const Chat = require('./Chat');

describe('Chat Model', () => {
    it('Should be invalid if parameter is empty object', (done) => {
        const chat = new Chat({})

        chat.validate((err) => {
            expect(err.errors.length !== 0)
            done();
        });
    });

    it('Should be valid for all correct cases', (done) => {
        const chat = new Chat({
            fst: 'First user',
            snd: 'Second user'
        })

        chat.validate(err => {
            expect(err).to.not.exist
            done()
        })
    })
});