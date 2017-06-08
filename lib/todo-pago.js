var versionTodoPago = '1.4.0';
var tenant = 't/1.1/';
var soapAppend = 'services/';
var soapAthorizeAppend = 'Authorize';
var soapOperationsAppend = 'Operations';
var soapEchoDSS = 'EchoServiceDSS';
var soapEchoESB = 'EchoServiceESB';
var restAppend = 'api/';
var Client = require('node-rest-client').Client;
var restClient = new Client();
exports.restClient = restClient;
var User = require(__dirname + '/User');
var Funciones = require(__dirname + '/func_validaciones.js'); // 01/06 Agregado por AA


var wsdl = {
    operations: __dirname + "/Operations.wsdl",
    authorize: __dirname + "/Authorize.wsdl",
    echo: __dirname + "/Echo.wsdl"
}

var endpoint = {
    production: 'https://apis.todopago.com.ar/',
    developers: 'https://developers.todopago.com.ar/'
}

function parseToAuthorizeRequest(optionsAuthorize, fraudControl) {
    optionsAuthorize["SDK"] = "NodeJS";
    optionsAuthorize["SDKVERSION"] = versionTodoPago;
    optionsAuthorize["LENGUAGEVERSION"] = process.version;

    var payload = "<Request>";

    for (var key in optionsAuthorize) {
        var value = optionsAuthorize[key];
        payload += "<" + key + ">" + value + "</" + key + ">";
    }

    for (var key in fraudControl) {
        var value = fraudControl[key];
        payload += "<" + key + ">" + value + "</" + key + ">";
    }

    payload += "</Request>";
    optionsAuthorize.Payload = payload;
    return optionsAuthorize;
}


module.exports = {

    sendAutorizeRequest: function(options, parameters, fraudControl, callback) {
        var soap = require('soap');
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        var config = {
            "endpoint": endpoint[options.endpoint] + soapAppend + tenant + soapAthorizeAppend
        };


        soap.createClient(wsdl.authorize, config, function(err, client) {

            var xml = parseToAuthorizeRequest(parameters, fraudControl);
            client.SendAuthorizeRequest(xml, function(err, result) {
                console.log(result)
                callback(result, err);
            }, {}, {
                'Authorization': options.Authorization
            });

        });
    },

    getAutorizeAnswer: function(options, parameters, callback) {
        var soap = require('soap');
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        var config = {
            "endpoint": endpoint[options.endpoint] + soapAppend + tenant + soapAthorizeAppend
        };

        soap.createClient(wsdl.authorize, config, function(err, client) {
            client.GetAuthorizeAnswer(parameters, function(err, result) {
                callback(result, err);
            }, {}, {
                'Authorization': options.Authorization
            });
        });
    },
    returnRequest: function(options, parameters, callback) {
        var soap = require('soap');
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        var config = {
            "endpoint": endpoint[options.endpoint] + soapAppend + tenant + soapAthorizeAppend
        };
        console.log('err')

        soap.createClient(wsdl.authorize, config, function(err, client) {
            client.ReturnRequest(parameters, function(err, result) {

                callback(result, err);
            }, {}, {
                'Authorization': options.Authorization
            });
        });
    },
    voidRequest: function(options, parameters, callback) {
        var soap = require('soap');
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        var config = {
            "endpoint": endpoint[options.endpoint] + soapAppend + tenant + soapAthorizeAppend
        };
        soap.createClient(wsdl.authorize, config, function(err, client) {
            client.VoidRequest(parameters, function(err, result) {
                callback(result, err);
            }, {}, {
                'Authorization': options.Authorization
            });
        });
    },


    getStatus: function(options, merchant, operationId, callback) {
        var args = {
            headers: {
                "Authorization": options.Authorization,
                "Content-Type": "application/json"
            } // request headers
        };


        restClient.get(endpoint[options.endpoint] + tenant + restAppend + "Operations/GetByOperationId/MERCHANT/" + merchant + "/OPERATIONID/" + operationId, args, function(data, response) {
            var aux = data.toString('utf-8');
            var parseString = require('xml2js').parseString;
            parseString(aux, function(err, result) {

                ret = result.OperationsColections.Operations;
                if (ret === undefined) {
                    if (result.OperationsColections.Status === undefined) {
                        ret = {
                            "Status": "No hay estado para esa operacion"
                        };
                    } else {
                        ret = {};
                        err = result.OperationsColections.Status;
                    }

                }
                callback(ret, err);
            });
        });
    },

    getPaymentMethods: function(options, merchant, callback) {

        restClient.get(endpoint[options.endpoint] + tenant + restAppend + "/PaymentMethods/Get/MERCHANT/" + merchant, function(data, response) {
            var aux = data.toString('utf-8');
            var parseString = require('xml2js').parseString;

            parseString(aux, function(err, result) {

                var ret = {
                    'PaymentMethodsCollection': result.Result.PaymentMethodsCollection,
                    'BanksCollection': result.Result.BanksCollection,
                    'PaymentMethodBanksCollection': result.Result.PaymentMethodBanksCollection,
                };
                callback(ret, err);
            });
        });
    },

    discoverPaymentMethods: function(options, callback) {

        restClient.get(endpoint[options.endpoint] + tenant + restAppend + '/PaymentMethods/Discover', function(data, response) {
            var aux = data.toString('utf-8');
            var parseString = require('xml2js').parseString;
            parseString(aux, function(err, result) {
                callback(result, err);
            });
        });
    },

    getByRangeDateTime: function(options, parameters, callback) {
        var soap = require('soap');
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        var config = {
            "endpoint": endpoint[options.endpoint] + soapAppend + tenant + soapOperationsAppend
        };

        soap.createClient(wsdl.operations, config, function(err, client) {
            client.GetByRangeDateTime(parameters, function(err, result) {
                callback(result, err);
            }, {}, {
                'Authorization': options.Authorization
            });
        });
    },


    getCredentials: function(email, pass, options, callback) {
        var d = new Date();
        var config = {
            "endpoint": endpoint[options.endpoint] + 'api/Credentials'
        };


        var args = {
            data: {
                "USUARIO": email,
                "CLAVE": pass
            },
            headers: {
                "Content-Type": "application/json"
            }
        };

        var req = restClient.post(endpoint[options.endpoint] + 'api/Credentials', args, function(data, response) {

            if (Buffer.isBuffer(data)) {
                data = JSON.parse(data.toString('utf8'));
            }

            err = null;

            if (data.Credentials.resultado.codigoResultado == 0) {

                this.merchantId = data.Credentials.merchantId;
                this.apiKey = data.Credentials.APIKey;

            } else {
                this.merchantId = '';
                this.apiKey = '';
                err = d.toISOString() + '- ERROR : ' + data.Credentials.resultado.codigoResultado + ', message: ' + data.Credentials.resultado.mensajeResultado;
            }
            var credentials = {
                'merchantId': this.merchantId,
                'apiKey': this.apiKey
            };

            callback(credentials, err);
        });

    }

};
