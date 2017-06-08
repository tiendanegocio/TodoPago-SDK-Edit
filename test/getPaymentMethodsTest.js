var request = require('request'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    nock = require('nock'),
    dataProvider = require('./dataProvider');

var options = {
    endpoint: 'developers',
    Authorization: 'TODOPAGO 1ac443c358f04c9f80bf8867efc57885'
};

describe('TEST getAllPayments Request: ', function() {
    it('Request ok', function(done) {
        console.log('')
        console.log('Expected Response ok:')
        console.log('')
        var scope = nock('https://developers.todopago.com.ar')
            .get('/t/1.1/api//PaymentMethods/Get/MERCHANT/15846')
            .reply(200, dataProvider.getPaymentMethods.responseMockOk())
        var sdk = require('../lib/todo-pago');
        sdk.getPaymentMethods(options, '15846', function(result, err) {
            console.log(JSON.stringify(result))
            console.log('')
            done()
        });

    })

});
