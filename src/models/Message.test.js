const expect = require('chai').expect;
const Message = require('./Message');

describe('Message Model', function() {
    it('Should be invalid if parameter is empty object', (done) => {
        const message = new Message({})

        message.validate((err) => {
            expect(err.errors.length !== 0)
            done();
        });
    });

    it('Should be valid for all correct cases', (done) => {
        const message = new Message({
            chat_id: 'chat_id_string',
            content: 'message content',
            sent_by: 'sender username'
        })

        message.validate(err => {
            expect(err).to.not.exist
            done()
        })
    })
});