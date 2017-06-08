var request = require('request'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    nock = require('nock'),
    mock = require('mock-require'),
    dataProvider = require('./dataProvider');


var options = {
    endpoint: "developers",
    Authorization: 'TODOPAGO 1ac443c358f04c9f80bf8867efc57885'
};

var parameters = {
    'Security': 'f3d8b72c94ab4a06be2ef7c95490f7d3',
    'Merchant': '15846',
    'RequestKey': '710268a7-7688-c8bf-68c9-430107e6b9da',
    'AnswerKey': '693ca9cc-c940-06a4-8d96-1ab0d66f3ee6'
};

describe('TEST getAuthorize Request: ', function() {
    it('Request ok', function(done) {
            console.log('')
            console.log('Expected Response ok:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            parameters.RequestKey = '';
            mock('soap', {
                createClient: function() {
                    console.log(dataProvider.getAuthorizeAnswer.responseMockOk());
                    console.log('');
                    done()
                }
            });
            sdk.getAutorizeAnswer(options, parameters, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
            });
        }),
        it('Request fail', function(done) {
            console.log('')
            console.log('Expected Response fail:')
            console.log('')
            var sdk = require('../lib/todo-pago');

            mock('soap', {
                createClient: function() {
                    console.log(dataProvider.getAuthorizeAnswer.responseMockFail());
                    console.log('');
                    done()
                }
            });
            sdk.getAutorizeAnswer(options, parameters, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
            });
        }),
        it('Request fail 702', function(done) {
            console.log('')
            console.log('Expected Response fail 702:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var incorrectMerchant = '4444';
            parameters.Merchant = incorrectMerchant;
            mock('soap', {
                createClient: function() {
                    console.log(dataProvider.getAuthorizeAnswer.responseMockFail702());
                    console.log('');
                    done()
                }
            });
            sdk.getAutorizeAnswer(options, parameters, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
            });
        })
});
