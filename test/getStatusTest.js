var request = require('request'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    nock = require('nock'),
    dataProvider = require('./dataProvider')

var options = {
    endpoint: "developers",
    Authorization: 'TODOPAGO 1ac443c358f04c9f80bf8867efc57885'
};

var responseMockOk = "<OperationsColections xmlns='http://api.todopago.com.ar'><Operations><RESULTCODE>'1102'</RESULTCODE><RESULTMESSAGE>La tarjeta ingresada no corresponde al medio de pago indicado. Revisalo.</RESUL\
TMESSAGE><DATETIME>2016-11-17T12:42:33.303-03:00</DATETIME><OPERATIONID>2</OPERATIONID><CURRENCYCODE>32</CURRENCYCODE><AMOUNT>34.99</AMOUNT><FEEAMOUNT xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'>\
</FEEAMOUNT><TAXAMOUNT xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></TAXAMOUNT><SERVICECHARGEAMOUNT xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></SERVICECHARGEAMOUNT><CREDITEDAMOUNT>34.99</CREDITEDAMOUNT><AMOUNTBUYER>34.99</AMOUNTBUYER>\
<FEEAMOUNTBUYER xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></FEEAMOUNTBUYER><TAXAMOUNTBUYER xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></TAXAMOUNTBUYER><CREDITEDAMOUNTBUYER>34.99</CREDITEDAMOUNTBUYER><BANKID>5<\
/BANKID><PROMOTIONID>2706</PROMOTIONID><TYPE>compra_online</TYPE><INSTALLMENTPAYMENTS>1</INSTALLMENTPAYMENTS><CUSTOMEREMAIL>a@hotmail.com</CUSTOMEREMAIL><IDENTIFICATIONTYPE>DNI</IDENTIFICATION\
TYPE><IDENTIFICATION>35434213</IDENTIFICATION><CARDNUMBER>45454545XXXXXX4545</CARDNUMBER><CARDHOLDERNAME>jorge drexler</CARDHOLDERNAME><TICKETNUMBER>0</TICKETNUMBER><AUTHORIZATIONCODE xmlns:xs\
i='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></AUTHORIZATIONCODE><BARCODE xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></BARCODE><COUPONEXPDATE xmlns:xs\
i='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></COUPONEXPDATE><COUPONSECEXPDATE xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></COUPONSECEXPDATE><COUPONSU\
BSCRIBER xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></COUPONSUBSCRIBER><PAYMENTMETHODCODE>42</PAYMENTMETHODCODE><PAYMENTMETHODNAME>VISA</PAYMENTMETHODNAME><PAYMENTMET\
HODTYPE>Crédito</PAYMENTMETHODTYPE><REFUNDED xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></REFUNDED><PUSHNOTIFYMETHOD xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></PUSHNOTIFYMETHOD><PUSHNOTIFYENDPOINT xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'>\
</PUSHNOTIFYENDPOINT><PUSHNOTIFYSTATES xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></PUSHNOTIFYSTATES><IDCONTRACARGO>0</IDCONTRACARGO><FECHANOTIFICACIONCUENTA xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></F\
ECHANOTIFICACIONCUENTA><ESTADOCONTRACARGO xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></ESTADOCONTRACARGO><COMISION xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:nil='true'></COMISION><REFUNDS></REFUNDS></Operations></OperationsColections>"

var responseMockFail = '<OperationsColections xmlns="http://api.todopago.com.ar"><Status>702</Status></OperationsColections>'

describe('TEST getStatus Request: ', function() {
    it('Request ok', function(done) {
            console.log('')
            console.log('Expected Response ok:')
            console.log('')
            var sdk = require('../lib/todo-pago');
            var scope = nock('https://developers.todopago.com.ar')
                .get('/t/1.1/api/Operations/GetByOperationId/MERCHANT/15846/OPERATIONID/2')
                .reply(200, responseMockOk)
            sdk.getStatus(options, '15846', '2', function(result, err) {
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
            incorrectMerchant = '4444'
            var scope = nock('https://developers.todopago.com.ar')
                .get('/t/1.1/api/Operations/GetByOperationId/MERCHANT/4444/OPERATIONID/2')
                .reply(702, responseMockFail)
            sdk.getStatus(options, incorrectMerchant, '2', function(result, err) {
                console.log(JSON.stringify(err))
                console.log('')
                done()
            });

        });
});
