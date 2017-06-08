var request = require('request'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    nock = require('nock'),
    dataProvider = require('./dataProvider');

var options = {
    endpoint: "developers",
    Authorization: 'TODOPAGO 1ac443c358f04c9f80bf8867efc57885'
};

describe('TEST Discover Request: ', function() {
    it('Request ok', function(done) {
            console.log('')
            console.log('Expected Response ok:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var scope = nock('https://developers.todopago.com.ar')
                .get('/t/1.1/api//PaymentMethods/Discover')
                .reply(200, dataProvider.discover.responseMockOk())
            sdk.discoverPaymentMethods(options, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
                done()
            });

        }),

        it('Request fail', function(done) {
            console.log('')
            console.log('Expected Response fail:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var scope = nock('https://developers.todopago.com.ar')
                .get('/t/1.1/api//PaymentMethods/Discover')
                .reply(702, dataProvider.discover.responseMockFail())
            sdk.discoverPaymentMethods(options, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
                done()
            });

        });
});
