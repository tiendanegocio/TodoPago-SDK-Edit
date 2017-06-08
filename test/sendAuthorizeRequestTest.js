var request = require('request'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    nock = require('nock'),
    mock = require('mock-require'),
    dataProvider = require('./dataProvider')


var options = {
    endpoint: "developers",
    Authorization: 'TODOPAGO 1ac443c358f04c9f80bf8867efc57885'
};

var responseMockOk = {
    StatusCode: -1,
    StatusMessage: 'Solicitud de Autorizacion Registrada',
    URL_Request: 'https://developers.todopago.com.ar/formulario/commands?command=formulario&m=tc74437a8-63f2-240e-df63-ed400c7da075',
    RequestKey: 'fbf23a2d-9241-7703-9e4f-a41375f51e6f',
    PublicRequestKey: 'tc74437a8-63f2-240e-df63-ed400c7da075'
}

var responseMockOFailRequired = {
    StatusCode: 98005,
    StatusMessage: 'El campo CSBTEMAIL es obligatorio. (Min Length 1)'
}

var responseMockFail702 = {
    StatusCode: 702,
    StatusMessage: 'Cuenta de vendedor invalida'
}

var parameters = {
    'Security': '1ac443c358f04c9f80bf8867efc57885',
    'EncodingMethod': 'XML',
    'Merchant': '15846',
    'URL_OK': 'http://someurl.com/ok/',
    'URL_ERROR': 'http://someurl.com/fail/',
    'MERCHANT': "15846",
    'OPERATIONID': "60",
    'CURRENCYCODE': "032",
    'AMOUNT': "54",
    'MAXINSTALLMENTS': "3",
    'MAXINSTALLMENTS': "6"
};
//Control de Fraude
var fraudControl = {
    'CSBTCITY': 'Villa General Belgrano',
    'CSSTCITY': 'Villa General Belgrano',

    'CSBTCOUNTRY': 'AR',
    'CSSTCOUNTRY': 'AR',

    'CSBTEMAIL': 'todopago@hotmail.com',
    'CSSTEMAIL': 'todopago@hotmail.com',

    'CSBTFIRSTNAME': 'Juan',
    'CSSTFIRSTNAME': 'Juan',

    'CSBTLASTNAME': 'Perez',
    'CSSTLASTNAME': 'Perez',

    'CSBTPHONENUMBER': '541160913988',
    'CSSTPHONENUMBER': '541160913988',

    'CSBTPOSTALCODE': ' 1010',
    'CSSTPOSTALCODE': ' 1010',

    'CSBTSTATE': 'B',
    'CSSTSTATE': 'B',

    'CSBTSTREET1': 'Cerrito 740',
    'CSSTSTREET1': 'Cerrito 740',

    'CSBTCUSTOMERID': '453458',
    'CSBTIPADDRESS': '192.0.0.4',
    'CSPTCURRENCY': 'ARS',
    'CSPTGRANDTOTALAMOUNT': '99.00',
    'CSMDD7': '',
    'CSMDD8': 'Y',
    'CSMDD9': '',
    'CSMDD10': '',
    'CSMDD11': '',
    'CSMDD12': '',
    'CSMDD13': '',
    'CSMDD14': '',
    'CSMDD15': '',
    'CSMDD16': '',
    'CSITPRODUCTCODE': 'electronic_good#chocho',
    'CSITPRODUCTDESCRIPTION': 'NOTEBOOK L845 SP4304LA DF TOSHIBA#chocho',
    'CSITPRODUCTNAME': 'NOTEBOOK L845 SP4304LA DF TOSHIBA#chocho',
    'CSITPRODUCTSKU': 'LEVJNSL36GN#chocho',
    'CSITTOTALAMOUNT': '1254.40#10.00',
    'CSITQUANTITY': '1#1',
    'CSITUNITPRICE': '1254.40#15.00'
};

describe('TEST sendAuthorize Request: ', function() {
    it('Request ok', function(done) {
            console.log('')
            console.log('Expected Response ok:')
            console.log('')
            var sdk = require('../lib/todo-pago');

            mock('soap', {
                createClient: function() {
                    console.log(responseMockOk);
                    console.log('');
                    done()
                }
            });
            sdk.sendAutorizeRequest(options, parameters, fraudControl, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
            });
        }),
        it('Request fail Required', function(done) {
            console.log('')
            console.log('Expected Response fail Required:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            delete fraudControl.CSBTEMAIL
            delete fraudControl.CSSTEMAIL
            mock('soap', {
                createClient: function() {
                    console.log(responseMockOFailRequired);
                    console.log('');
                    done()
                }
            });
            sdk.sendAutorizeRequest(options, parameters, fraudControl, function(result, err) {
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
                    console.log(responseMockFail702);
                    console.log('');
                    done()
                }
            });
            sdk.sendAutorizeRequest(options, parameters, fraudControl, function(result, err) {
                console.log(JSON.stringify(result))
                console.log('')
            });
        })
});
