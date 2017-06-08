var sdk = require('../lib/todo-pago');

var options = {
	endpoint : "developers",
	Authorization:'TODOPAGO 1ac443c358f04c9f80bf8867efc57885'
};


exampleSendAuthorizeRequest();
exampleGetAuthorizeAnswer();
exampleGetStatus();
exampleGetPaymentMethods();
exampleDiscoverPaymentMethods();
exampleGetByRangeDateTime();
exampleReturnRequest();
exampleVoidRequest();
exampleGetCredentials();

function exampleGetStatus(){
	sdk.getStatus(options, '15846', '60', function(result, err){
		console.log("-------------------***-------------------");
		console.log("getStatus result:");
		console.log(JSON.stringify(result));
		console.log("getStatus error:");
		console.log(err);
		console.log("-------------------***-------------------");
	});
}

function exampleGetPaymentMethods(){
	sdk.getPaymentMethods(options, '15846', function(result, err){
		console.log("-------------------***-------------------");
		console.log("getAllPaymentMethods");
		console.log(JSON.stringify(result));
		console.log(err);
		console.log("-------------------***-------------------");
	});
}

function exampleDiscoverPaymentMethods(){
	sdk.discoverPaymentMethods(options, function(result, err){
		console.log("-------------------***-------------------");
		console.log("discoverPaymentMethods");
		console.log(JSON.stringify(result));
		console.log(err);
		console.log("-------------------***-------------------");
	});
}

function exampleGetAuthorizeAnswer(){
	var parameters = {
		'Security'   : 'f3d8b72c94ab4a06be2ef7c95490f7d3',
		'Merchant' 	 : '2153',
		'RequestKey' : '710268a7-7688-c8bf-68c9-430107e6b9da',
		'AnswerKey'  : '693ca9cc-c940-06a4-8d96-1ab0d66f3ee6'
	};
	sdk.getAutorizeAnswer(options, parameters, function(result, err){
		console.log("getAutorizeAnswer");
		console.log(result);
		console.log(err);
		console.log("-------------------");
	});
}

function exampleSendAuthorizeRequest(){
	var parameters = {
		'Session': 'ABCDEF-1234-12221-FDE1-00000200',
		'Security':'f3d8b72c94ab4a06be2ef7c95490f7d3',
		'EncodingMethod':'XML',
		'Merchant':15846,
		'URL_OK':'http://someurl.com/ok/',
		'URL_ERROR':'http://someurl.com/fail/',
		'MERCHANT': "2153",
		'OPERATIONID':"60",
		'CURRENCYCODE': "032",
		'AMOUNT':"54",
		'MAXINSTALLMENTS':"3",
		'MAXINSTALLMENTS':"6"
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

	sdk.sendAutorizeRequest(options, parameters, fraudControl, function(result, err){
		console.log("------------- sendAutorizeRequest ---------------");
		if(result){
			console.log(result);
		}
		if(err){
			console.error(err);
		}
		console.log("------------------------------------------------");
	});
}

function exampleGetByRangeDateTime(){

	var parameters = {
		'MERCHANT': '2153',
		'STARTDATE': '2015-01-01',
		'ENDDATE': '2015-12-20',
                'PAGENUMBER': 1
	};

	sdk.getByRangeDateTime(options, parameters, function(result, err){
		console.log("-------------------***-------------------");
		console.log("GetByRangeDateTime");
		console.log(result);
		console.log(err);
		console.log("-------------------***-------------------");
	});
}

function exampleReturnRequest(){

	var parameters = {
		'Security': '108fc2b7c8a640f2bdd3ed505817ffde',
		'Merchant': '2669',
		'RequestKey': '0d801e1c-e6b1-672c-b717-5ddbe5ab97d6',
		'AMOUNT': 1.00
	};

	sdk.returnRequest(options, parameters, function(result, err){
		console.log("-------------------***-------------------");
		console.log("ReturnRequest");
		console.log(result);
		console.log(err);
		console.log("-------------------***-------------------");
	});
}


function exampleVoidRequest(){

	var parameters = {
		'Security': '108fc2b7c8a640f2bdd3ed505817ffde',
		'Merchant': '2669',
		'RequestKey': '0d801e1c-e6b1-672c-b717-5ddbe5ab97d6'
	};

	sdk.voidRequest(options, parameters, function(result, err){
		console.log("-------------------***-------------------");
		console.log("VoidRequest");
		console.log(result);
		console.log(err);
		console.log("-------------------***-------------------");
	});
}


function exampleGetCredentials(){
	var email = 'midireccion@deemail.com';
	var pass = 'MyPassword';

	sdk.getCredentials(email, pass, options ,  function(result, err){
		console.log("-------------------***-------------------");
		console.log("getCredentials:");
		console.log('RESULTADO FINAL' + JSON.stringify(result));
		console.log('Error: ');
		console.log(err);
		console.log("-------------------***-------------------");
	});
}
