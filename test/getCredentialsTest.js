var request = require('request'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    nock = require('nock'),
    dataProvider = require('./dataProvider');

var options = {
    endpoint: "developers",
    Authorization: 'TODOPAGO 1ac443c358f04c9f80bf8867efc57885'
};

describe('TEST Credentials Request: ', function() {
    it('Request ok', function(done) {
            console.log('')
            console.log('Expected Response ok:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var email = 'alan.corcos@softtek.com';
            var pass = 'Camino01';
            var scope = nock('https://developers.todopago.com.ar')
                .post('/api/Credentials')
                .reply(200, dataProvider.getCredentials.responseMockOk())
            sdk.getCredentials(email, pass, options, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
                done()
            });
        }),
        it('Request fail User', function(done) {
            console.log('')
            console.log('Expected Response fail User:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var incorrectUser = 'badUser@dominio.com';
            var pass = 'Camino01';
            var scope = nock('https://developers.todopago.com.ar')
                .post('/api/Credentials')
                .reply(200, dataProvider.getCredentials.responseMockFailUser())
            sdk.getCredentials(incorrectUser, pass, options, function(result, err) {
                console.log(JSON.stringify(err))
                console.log('')
                done()
            });

        }),
        it('Request fail Password', function(done) {
            console.log('')
            console.log('Expected Response fail Password:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var email = 'alan.corcos@softtek.com';
            var incorrectPassword = 123;
            var scope = nock('https://developers.todopago.com.ar')
                .post('/api/Credentials')
                .reply(200, dataProvider.getCredentials.responseMockFailPassword())
            sdk.getCredentials(email, incorrectPassword, options, function(result, err) {
                console.log(JSON.stringify(err))
                console.log('')
                done()
            });

        });

});
