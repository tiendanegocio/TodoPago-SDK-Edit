var request = require('request'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire');
var nock = require('nock');
var mock = require('mock-require');


var options = {
    endpoint: "developers",
    Authorization: 'TODOPAGO 1ac443c358f04c9f80bf8867efc57885'
};

var responseMockOk = {
    StatusCode: 2011,
    StatusMessage: 'Devolucion OK',
    AuthorizationKey: 'a61de00b-c118-2688-77b0-16dbe5799913',
    AUTHORIZATIONCODE: '654402'
}

var responseMockOFail = {
    StatusCode: 2013,
    StatusMessage: 'No es posible obtener los importes de las comisiones para realizar la devolucion',
    AuthorizationKey: null,
    AUTHORIZATIONCODE: null
}
var responseMockFail702 = {
    StatusCode: 702,
    StatusMessage: 'ERROR: Cuenta Inexistente',
    AuthorizationKey: null,
    AUTHORIZATIONCODE: null
}


describe('TEST Credentials Request: ', function() {
    it('Request ok', function(done) {
            console.log('')
            console.log('Expected Response ok:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var parameters = {
                'Security': '1ac443c358f04c9f80bf8867efc57885',
                'Merchant': '15846',
                'RequestKey': '3b5a0b92-b053-5e27-5445-3262a2b138df'
            };
            mock('soap', {
                createClient: function() {
                    console.log(responseMockOk);
                    console.log('');
                    done()
                }
            });
            sdk.voidRequest(options, parameters, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
            });
        }),
        it('Request fail', function(done) {
            console.log('')
            console.log('Expected Response fail:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var incorrectRequestKey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx'
            var parameters = {
                'Security': '1ac443c358f04c9f80bf8867efc57885',
                'Merchant': '15846',
                'RequestKey': incorrectRequestKey
            };
            mock('soap', {
                createClient: function() {
                    console.log(responseMockOFail);
                    console.log('');
                    done()
                }
            });
            sdk.voidRequest(options, parameters, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
            });
        }),
        it('Request fail 702', function(done) {
            console.log('')
            console.log('Expected Response fail 702:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var incorrectMerchant = '4444'
            var parameters = {
                'Security': '1ac443c358f04c9f80bf8867efc57885',
                'Merchant': incorrectMerchant,
                'RequestKey': '3b5a0b92-b053-5e27-5445-3262a2b138df'
            };
            mock('soap', {
                createClient: function() {
                    console.log(responseMockFail702);
                    console.log('');
                    done()
                }
            });
            sdk.voidRequest(options, parameters, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
            });
        })
});
