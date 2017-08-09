<a name="inicio"></a>
Todo Pago - módulo SDK-NodeJS para conexión con gateway de pago
=======

 + [Instalación](#instalacion)
 	+ [Versiones de Node soportadas](#versionesdenodesoportadas)
 	+ [Generalidades](#general)
 + [Ambientes](#test)
 + [Uso](#uso)
    + [Inicializar la clase correspondiente al conector (todo-pago.js)](#initconector)
    + [Operatoria Agrupador](#agrupador)
      + [Diagrama de secuencia](#secuencia)
      + [Solicitud de autorización](#solicitudautorizacion)
      + [Datos adicionales para prevención de fraude](#datosadicionales)
      + [Opciones adicionales](#opcionesadicionales)
        + [Rango de cuotas](#coutas)
        + [Tiempo de vida de la transacción](#timeout)      
      + [Confirmación de transacción](#confirmatransaccion)
      + [Ejemplo](#ejemplo)
      + [Características](#caracteristicas)
        + [Status de la operación](#status)
        + [Consulta de operaciones por rango de tiempo](#statusdate)
        + [Devoluciones](#devoluciones)
        + [Devolución parcial](#devolucionparcial)
        + [Formulario híbrido](#formhidrido)
        + [Obtener Credenciales](#credenciales)
 + [Tablas de referencia](#tablareferencia)
 + [Tabla de errores operativos](#codigoerrores)
 + [Tabla de errores de integración](#interrores)


<a name="instalacion"></a>
## Instalación
Se debe descargar la última versión desde del botón Download ZIP o desde https://github.com/TodoPago/sdk-nodejs/archive/master.zip.
Una vez descargado y descomprimido, debe incluirse el archivo todo-pago.js como módulo del proyecto.


[<sub>Volver a inicio</sub>](#inicio)

<a name="versionesdenodesoportadas"></a>
#### Versiones de node soportadas
La versi&oacute;n implementada del SDK, esta testeada para versiones desde Node 0.10.x en adelante.

</br>

[<sub>Volver a inicio</sub>](#inicio)

<a name="general"></a>
#### Generalidades
Esta versión soporta únicamente pago en moneda nacional argentina (CURRENCYCODE = 32).

</br>

[<sub>Volver a inicio</sub>](#inicio)

<a name="test"></a>
#### Modo test
- Para utlilizar el modo test se debe pasar un end point de prueba (provisto por TODO PAGO).

```nodejs
var options = {
	endpoint : "developers",
	Authorization:'PRISMA f3d8b72c94ab4a06be2ef7c95490f7d3'
}; // End Point = "developers" para test
```

</br>

[<sub>Volver a inicio</sub>](#inicio)

<a name="uso"></a>
## Uso

<a name="initconector"></a>
#### Inicializar la clase correspondiente al conector (todo-pago.js)
- Importar el módulo:
   ```nodejs
   var sdk = require('../lib/todo-pago');
   ```
- Crear dos objetos (uno de configuración y el otro con los parámetros)
- La configuración debe contar con el ApiKey provisto por Todo Pago

```nodejs
var parameters = {
};

var options = {
	endpoint : "developers", // "developers" o "production"
	Authorization:'PRISMA f3d8b72c94ab4a06be2ef7c95490f7d3'
};
```
- Los datos como Authorization , merchantId y ApiKey se pueden obtener mediante el método getCredentials [Obtener Credenciales](#credenciales)
[<sub>Volver a inicio</sub>](#inicio)

<a name="agrupador"></a>
### Operatoria Agrupador

Mediante una única y simple adhesión, los vendedores acceden a todos los medios de pago que el Botón de pago ofrezca sin necesidad de contar con ningún tipo de contrato adicional con cada medio de pago. La funcionalidad “agrupador” de TodoPago, se ocupa de gestionar los acuerdos necesarios con todos los medios de pago a efectos de disponibilizarlos en el Botón.

Para acceder al servicio, los vendedores podrán adherirse en el sitio exclusivo de TodoPago o a través de su ejecutivo comercial. En estos procesos se generará el usuario y clave para este servicio.

Una vez adheridos se creará automáticamente una cuenta virtual, en la cual se acreditarán los fondos provenientes de los cobros realizados con la presente modalidad de pago.
[<sub>Volver a inicio</sub>](#inicio)

<a name="secuencia"></a>
## Diagrama de secuencia
![imagen de configuracion](https://raw.githubusercontent.com/TodoPago/imagenes/master/README.img/secuencia-003.jpg)

<a name="solicitudautorizacion"></a>
#### Solicitud de autorización
- En este caso hay que llamar a sendAuthorizeRequest(), el resultado se obtendrá mediante la funcion callback:
```nodejs
var parameters = {
    'Session': 'ABCDEF-1234-12221-FDE1-00000200',
    'Security':'f3d8b72c94ab4a06be2ef7c95490f7d3',
    'EncodingMethod':'XML',
    'Merchant':2153,
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
```
<ins><strong>Datos propios del comercio</strong></ins>

<table>
  <tr>
    <th>Campo</th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Tipo de Dato</th>
    <th>Valores posibles / Ejemplo</th>
  </tr>
  <tr>
    <td><b>Security</b></td>
    <td>Sí</td>
    <td>API Keys sin PRISMA o TODOPAGO y sin espacio.</td>
    <td>Alfanumérico hasta 32 caracteres</td>
    <td>912EC803B2CE49E4A541068D495AB570</td>
  </tr>
  <tr>
    <td><b>Merchant</b></td>
    <td>Sí</td>
    <td>Nro. de Comercio (Merchant ID) provisto por TodoPago</td>
    <td>Numérico</td>
    <td>12345678</td>
  </tr>
  <tr>
    <td><b>URL_OK</b></td>
    <td>No</td>
    <td>URL a la que el comprador será dirigido cuando la compra resulte exitosa</td>
    <td>Alfanumérico hasta 256 caracteres</td>
    <td>http://susitio.com/payment/Ok</td>
  </tr>
  <tr>
    <td><b>URL_Error</b></td>
    <td>No</td>
    <td>URL a la que el comprador será dirigido cuando la compra no resulte exitosa</td>
    <td>Alfanumérico hasta 256 caracteres</td>
    <td>http://susitio.com/payment/Error</td>
  </tr>
</table>

<ins><strong>Datos propios del comercio - Ejemplo</strong></ins>
```nodejs
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
```
<ins><strong>Datos propios de la operación</strong></ins>
<table>
  <tr>
    <th><b>Campo</b></th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Tipo de Dato</th>
    <th>Valores Posibles / Ejemplos</th>
  </tr>
  <tr>
    <td><b>MERCHANT</b></td>
    <td>Sí</td>
    <td>Nro. de Comercio (Merchant ID) provisto por TodoPago</td>
    <td>Numérico</td>
    <td>12345</td>
  </tr>
  <tr>
    <td><b>OPERATIONID</b></td>
    <td>Sí</td>
    <td>Identificación de la transacción para el Comercio. Debe ser distinto para cada operación.</td>
    <td>Alfanumérico de 1 a 40 caracteres</td>
    <td>10000012</td>
  </tr>
    <tr>
    <td><b>CURRENCYCODE</b></td>
    <td>Sí</td>
    <td>Tipo de moneda de la operación. Sólo válido pesos argentinos (32)</td>
    <td>Numérico de dos posiciones</td>
    <td>32</td>
  </tr>
  <tr>
    <td><b>AMOUNT</b></td>
    <td>Sí</td>
    <td>Importe en Pesos de la transacción.</td>
    <td>Numérico con 9 dígitos con hasta 2 decimales 999999[.CC]
Usando el punto como separador de decimales. No se permiten comas, ni como separador de miles ni como separador de decimales.</td>
    <td>$125,38 -> 125.38</td>
  </tr>
  <tr>
    <td><b>EMAILCLIENTE</b></td>
    <td>Si</td>
    <td>El comercio deberá enviar a TodoPago el email del cliente. Esta dirección se utilizará para enviar el mail de confirmación de la compra al cliente</td>
    <td>Alfanumérico de hasta 80 caracteres.</td>
    <td>cliente@mail.com</td>
  </tr>
</table>

**Respuesta**

<table><tr>
<td>Campo</td><td>Requerido</td><td>Descripción</td><td>Tipo de Dato</td><td>Valores posibles / Ejemplo</td></tr>
<tr><td>**StatusCode**</td><td>Sí</td><td>Código de estado o valor de retorno del Servicio</td><td>Numérico de 5 posiciones</td><td> <ul><li>-1 -> OK</li><li>otro ->Error</li></ul></td></tr>
<tr><td>**StatusMessage**</td><td>Sí</td><td>Descripción del códgo de retorno o estado del servicio</td><td>Alfanumérico hasta 256</td><td>-</td></tr>
<tr><td>**URL_Request**</td><td>Sí</td><td>Url del formulario de pago</td><td>URL</td><td>https://forms.todopago.com.ar/formulario/commands?command=formulario&m=t7d3938c9-f7b1-4ee9-e76b-9cc84f73fe81</td></tr>
<tr><td>**RequestKey**</td><td>No</td><td>Identificador Privado del Requerimiento obtenido en la respuesta de la operación SendAuthorizeRequest. Nunca debe ser expuesto hacia el Web Browser. Solo será utilizado entre el ecommerce y TodoPago</td><td>Alfanumérico hasta 48 caracteres</td><td>8496472a-8c87-e35b-dcf2-94d5e31eb12f</td></tr>
<tr><td>**PublicRequestKey**</td><td>No</td><td>Identificador Público del Requerimiento obtenido en la respuesta de la operación SendAuthorizeRequest</td><td>Alfanumérico de hasta 48 caracteres</td><td>7d3938c9-f7b1-4ee9-e76b-9cc84f73fe81</td></tr>
</table>

<a name="datosadicionales"></a>
## Datos adicionales para control de fraude
Los datos adicionales para control de fraude son **obligatorios** para la operatoria con TodoPago.

**Parámetros Generales:**
<table>
  <tr>
    <th>Parámetro</th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Descripción</th>
    <th>Valores posibles</th>
  </tr>
  <tr>
    <td><b>CSBTCITY</b></td>
    <td>Sí</td>
    <td>Ciudad de facturación</td>
    <td>Alfanumérico de 50 caracteres.</td>
    <td>Ejemplo: Villa General Belgrano</td>
  </tr>
  <tr>
    <td><b>CSBTCOUNTRY</b></td>
    <td>Sí</td>
    <td>País de facturación</td>
    <td>Alfanumérico de 2 caracteres.</td>
    <td>Código ISO</td>
  </tr>
  <tr>
    <td><b>CSBTCUSTOMERID</b></td>
    <td>Si</td>
    <td>Identificador del usuario al que se le emite la factura. No puede contener un correo electrónico</td>
    <td>Alfanumérico de 50 caracteres.</td>
    <td>Ejemplos:
A.Carlos
453458</td>
  </tr>
  <tr>
    <td><b>CSBTIPADDRESS</b></td>
    <td>Sí</td>
    <td>IP de la PC del comprador </td>
    <td>Alfanumérico de 15 caracteres.</td>
    <td>Ejemplo: 10.1.27.63</td>
  </tr>
  <tr>
    <td><b>CSBTEMAIL</b></td>
    <td>Si</td>
    <td>Mail del usuario al que se le emite la factura</td>
    <td>Alfanumérico de 100 caracteres.</td>
    <td>Ejemplo: todopago@hotmail.com</td>
  </tr>
  <tr>
    <td><b>CSBTFIRSTNAME</b></td>
    <td>Si</td>
    <td>Nombre del usuario al que se le emite la factura</td>
    <td>Alfanumérico de 60 caracteres.</td>
    <td>Ejemplo: Juan</td>
  </tr>
  <tr>
    <td><b>CSBTLASTNAME</b></td>
    <td>Si</td>
    <td>Apellido del usuario al que se le emite la factura</td>
    <td>Alfanumérico de 60 caracteres.</td>
    <td>Ejemplo: Perez</td>
  </tr>
  <tr>
    <td><b>CSBTPHONENUMBER</b></td>
    <td>Si</td>
    <td>Teléfono del usuario al que se le emite la factura. No utilizar guiones, puntos o espacios. Incluir código de país</td>
    <td>Alfanumérico de 15 caracteres.</td>
    <td>Ejemplo: 541160913988</td>
  </tr>
  <tr>
    <td><b>CSBTPOSTALCODE</b></td>
    <td>Si</td>
    <td>Código Postal de la dirección de facturación</td>
    <td>Alfanumérico de 10 caracteres.</td>
    <td>Ejemplo: C1010AAP ó 1010</td>
  </tr>
  <tr>
    <td><b>CSBTSTATE</b></td>
    <td>Si</td>
    <td>Provincia de la dirección de facturación</td>
    <td>Alfanumérico de 2 caracteres.</td>
    <td><a href="#tablareferencia">Ver Provincias</a>
Ejemplo: Enviar C si corresponde a CABA</td>
  </tr>
  <tr>
    <td><b>CSBTSTREET1</b></td>
    <td>Si</td>
    <td>Domicilio de facturación (Calle Numero interior Numero Exterior)</td>
    <td>Alfanumérico de 60 caracteres.</td>
    <td>Ejemplo: Cerrito 740 piso 8</td>
  </tr>
  <tr>
    <td><b>CSBTSTREET2</b></td>
    <td>No</td>
    <td>Localidad</td>
    <td>Alfanumérico de 60 caracteres.</td>
    <td>Ejemplo: CABA</td>
  </tr>
  <tr>
    <td><b>CSPTCURRENCY</b></td>
    <td>Si</td>
    <td>Moneda</td>
    <td>Alfanumérico de 5 caracteres.</td>
    <td>Ejemplo: ARS</td>
  </tr>
  <tr>
    <td><b>CSPTGRANDTOTALAMOUNT</b></td>
    <td>Si</td>
    <td>"999999.CC"
Con decimales obligatorios, usando el puntos como separador de decimales. No se permiten comas, ni como separador de miles ni como separador de decimales.</td>
    <td>Numérico de 15 posiciones</td>
    <td>Ejemplos:
$125,38 -> 125.38
$12 -> 12.00</td>
  </tr>
  <tr>
    <td><b>CSMDD6</b></td>
    <td>No</td>
    <td>Canal de venta</td>
    <td>Alfanumérico de 255 caracteres.</td>
    <td>Valores posibles: Web, Mobile, Telefonica</td>
  </tr>
  <tr>
    <td><b>CSMDD7</b></td>
    <td>No</td>
    <td>Cantidad de dias que está registrado el cliente en el sitio del comercio. (num Dias)</td>
    <td>Alfanumérico de 255 caracteres.</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSMDD8</b></td>
    <td>No</td>
    <td>Para indicar si el usuario está comprando como invitado en la página del comercio. En caso de ser "S", el campo CSMDD9 no deberá enviarse.</td>
    <td>Valor Booleano</td>
    <td>Valores posibles (S/N)</td>
  </tr>
  <tr>
    <td><b>CSMDD9</b></td>
    <td>No</td>
    <td>Valor del password del usuario registrado en el portal del comercio. Incluir el valor en hash</td>
    <td>Alfanumérico de 255 caracteres.</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSMDD10</b></td>
    <td>No</td>
    <td>Cantidad de transacciones realizadas por el mismo usuario registrado en el portal del comercio (Num transacciones)</td>
    <td>Alfanumérico de 255 caracteres.</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSMDD11</b></td>
    <td>No</td>
    <td>Celular del cliente</td>
    <td>Alfanumérico de 255 caracteres.</td>
    <td></td>
  </tr>
</table>

**Parámetros del vertical "Retail":**
<table>
  <tr>
    <th>Parámetro</th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Descripción</th>
    <th>Valores posibles</th>
  </tr>
  <tr>
    <td><b>CSSTCITY</b></td>
    <td>Si</td>
    <td>Ciudad de envío de la orden</td>
    <td>Alfanumérico de 50 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSSTCOUNTRY</b></td>
    <td>Si</td>
    <td>País de envío de la orden</td>
    <td>Alfanumérico de 2 caracteres</td>
    <td>Código ISO</td>
  </tr>
  <tr>
    <td><b>CSSTEMAIL</b></td>
    <td>Si</td>
    <td>Correo electrónico del comprador</td>
    <td>Alfanumérico de 100 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSSTFIRSTNAME</b></td>
    <td>Si</td>
    <td>Nombre de la persona que recibe el producto</td>
    <td>Alfanumérico de 60 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSSTLASTNAME</b></td>
    <td>Si</td>
    <td>Apellido de la persona que recibe el producto</td>
    <td>Alfanumérico de 60 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSSTPHONENUMBER</b></td>
    <td>Si</td>
    <td>Número de teléfono del destinatario</td>
    <td>Alfanumérico de 15 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSSTPOSTALCODE</b></td>
    <td>Si</td>
    <td>Código postal del domicilio de envío</td>
    <td>Alfanumérico de 10 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSSTSTATE</b></td>
    <td>Si</td>
    <td>Provincia de envío</td>
    <td>Alfanumérico de 2 caracteres</td>
    <td>Es un carácter. <a href="#tablareferencia">Ver Provincias</a></td>
  </tr>
  <tr>
    <td><b>CSSTSTREET1</b></td>
    <td>Si</td>
    <td>Domicilio de envío</td>
    <td>Alfanumérico de 60 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSSTSTREET2</b></td>
    <td>No</td>
    <td>Localidad de envío</td>
    <td>Alfanumérico de 60 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSMDD12</b></td>
    <td>No</td>
    <td>Cantidad de días que tiene el comercio para hacer la entrega</td>
    <td>Alfanumérico de 255 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSMDD13</b></td>
    <td>No</td>
    <td>Método de Despacho</td>
    <td>Alfanumérico de 255 caracteres</td>
    <td>Valores posibles:  storepickup, deliverypropio, deliverycarrier <br>
    Notas:  deliverypropio: envío realizado con operador logístico propio.
    deliverycarrier: envío realizado con operador logístico tercerizado (ej. Andreani).
    </td>
    </tr>
  <tr>
    <td><b>CSMDD14</b></td>
    <td>No</td>
    <td>Valor booleano para identificar si el cliente requiere un comprobante fiscal o no S / N</td>
    <td>Valor Booleano</td>
    <td>S/N</td>
  </tr>
  <tr>
    <td><b>CSMDD15</b></td>
    <td>No</td>
    <td>CustomerLoyalityNumber - número de cliente frecuente</td>
    <td>Alfanumérico de 255 caracteres</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CSMDD16</b></td>
    <td>No</td>
    <td>Promotional / CouponCode - número de cupón de descuento</td>
    <td>Alfanumérico de 255 caracteres</td>
    <td></td>
  </tr>
</table>

**Datos a enviar por cada producto, los valores deben estar separados con "#":**

<table>
  <tr>
    <th><b>Parámetro</b></th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Descripción</th>
    <th>Valores posibles</th>
  </tr>
  <tr>
    <td><b>CSITPRODUCTCODE</b></td>
    <td>Condicional</td>
    <td>Categoria del producto</td>
    <td>Alfanumérico de 255 caracteres</td>
    <td>Valor por defecto: default</td>
  </tr>
  <tr>
    <td><b>CSITPRODUCTDESCRIPTION</b></td>
    <td>Condicional</td>
    <td>Descripción del producto </td>
    <td>Alfanumérico de 255 caracteres</td>
    <td>NOTEBOOK L845 SP4304LA DF TOSHIBA 4GB RAM 233 MHZ</td>
  </tr>
  <tr>
    <td><b>CSITPRODUCTNAME</b></td>
    <td>Condicional</td>
    <td>Nombre del producto</td>
    <td>Alfanumérico de 255 caracteres</td>
    <td>NOTEBOOK L845 SP4304LA DF TOSHIBA</td>
  </tr>
  <tr>
    <td><b>CSITPRODUCTSKU</b></td>
    <td>Condicional</td>
    <td>Código identificador del producto</td>
    <td>Alfanumérico de 255 caracteres</td>
    <td>Ejemplo: LEVJNSL36GN</td>
  </tr>
  <tr>
    <td><b>CSITTOTALAMOUNT</b></td>
    <td>Condicional</td>
    <td>CSITTOTALAMOUNT = CSITUNITPRICE * CSITQUANTITY
"999999.CC"
Es mandatorio informar los decimales, usando el punto como separador de decimales. No se permiten comas, ni como separador de miles ni como separador de decimales.</td>
    <td>Numérico</td>
    <td>Ejemplos:
$125,38 -> 125.38
$12 -> 12.00</td>
  </tr>
  <tr>
    <td><b>CSITQUANTITY</b></td>
    <td>Condicional</td>
    <td>Cantidad del producto</td>
    <td>Numérico</td>
    <td>Ejemplo: 1</td>
  </tr>
  <tr>
    <td><b>CSITUNITPRICE</b></td>
    <td>Condicional</td>
    <td>"999999.CC"
Es mandatorio informar los decimales, usando el punto como separador de decimales. No se permiten comas, ni como separador de miles ni como separador de decimales.</td>
    <td>Numérico</td>
    <td>Ejemplos:
$125,38 -> 125.38
$12 ->  12.00</td>
  </tr>
</table>

##### Parámetros Adicionales en el post inicial:
```nodejs
var payload = {
'CSBTCITY':'Villa General Belgrano', //Ciudad de facturación, MANDATORIO.
'CSBTCOUNTRY':'AR', //País de facturación. MANDATORIO. Código ISO. (http://apps.cybersource.com/library/documentation/sbc/quickref/countries_alpha_list.pdf)
'CSBTCUSTOMERID':'453458', //Identificador del usuario al que se le emite la factura. MANDATORIO. No puede contener un correo electrónico.
'CSBTIPADDRESS':'192.0.0.4', //IP de la PC del comprador. MANDATORIO.
'CSBTEMAIL':'some@someurl.com', //Mail del usuario al que se le emite la factura. MANDATORIO.
'CSBTFIRSTNAME':'Juan' ,//Nombre del usuario al que se le emite la factura. MANDATORIO.
'CSBTLASTNAME':'Perez', //Apellido del usuario al que se le emite la factura. MANDATORIO.
'CSBTPHONENUMBER':'541160913988', //Teléfono del usuario al que se le emite la factura. No utilizar guiones, puntos o espacios. Incluir código de país. MANDATORIO.
'CSBTPOSTALCODE':'1010', //Código Postal de la dirección de facturación. MANDATORIO.
'CSBTSTATE':'B', //Provincia de la dirección de facturación. MANDATORIO. Ver tabla anexa de provincias.
'CSBTSTREET1':'Some Street 2153', //Domicilio de facturación (calle y nro). MANDATORIO.
'CSBTSTREET2':'Piso 8', //Complemento del domicilio. (piso, departamento). NO MANDATORIO.
'CSPTCURRENCY':'ARS', //Moneda. MANDATORIO.
'CSPTGRANDTOTALAMOUNT':'125.38', //Con decimales opcional usando el puntos como separador de decimales. No se permiten comas, ni como separador de miles ni como separador de decimales. MANDATORIO. (Ejemplos:$125,38-> 125.38 $12-> 12 o 12.00)
'CSMDD7':'', // Fecha registro comprador(num Dias). NO MANDATORIO.
'CSMDD8':'', //Usuario Guest? (Y/N). En caso de ser Y, el campo CSMDD9 no deberá enviarse. NO MANDATORIO.
'CSMDD9':'', //Customer password Hash: criptograma asociado al password del comprador final. NO MANDATORIO.
'CSMDD10':'', //Histórica de compras del comprador (Num transacciones). NO MANDATORIO.
'CSMDD11':'', //Customer Cell Phone. NO MANDATORIO.

//Retail
'CSSTCITY':'Villa General Belgrano', //Ciudad de enví­o de la orden. MANDATORIO.
'CSSTCOUNTRY':'', //País de envío de la orden. MANDATORIO.
'CSSTEMAIL':'some@someurl.com', //Mail del destinatario, MANDATORIO.
'CSSTFIRSTNAME':'Jose', //Nombre del destinatario. MANDATORIO.
'CSSTLASTNAME':'Perez', //Apellido del destinatario. MANDATORIO.
'CSSTPHONENUMBER':'541155893737', //Número de teléfono del destinatario. MANDATORIO.
'CSSTPOSTALCODE':'1010', //Código postal del domicilio de envío. MANDATORIO.
'CSSTSTATE':'B', //Provincia de envío. MANDATORIO. Son de 1 caracter
'CSSTSTREET1':'Some Street 2153', //Domicilio de envío. MANDATORIO.
'CSMDD12':'',//Shipping DeadLine (Num Dias). NO MADATORIO.
'CSMDD13':'',//Método de Despacho. NO MANDATORIO.
'CSMDD14':'',//Customer requires Tax Bill ? (Y/N). NO MANDATORIO.
'CSMDD15':'',//Customer Loyality Number. NO MANDATORIO.
'CSMDD16':'',//Promotional / Coupon Code. NO MANDATORIO.
//Datos a enviar por cada producto, los valores deben estar separado con #:
'CSITPRODUCTCODE':'electronic_good', //Código de producto. CONDICIONAL. Valores posibles(adult_content;coupon;default;electronic_good;electronic_software;gift_certificate;handling_only;service;shipping_and_handling;shipping_only;subscription)
'CSITPRODUCTDESCRIPTION':'Test Prd Description', //Descripción del producto. CONDICIONAL.
'CSITPRODUCTNAME':'TestPrd', //Nombre del producto. CONDICIONAL.
'CSITPRODUCTSKU':'SKU1234', //Código identificador del producto. CONDICIONAL.
'CSITTOTALAMOUNT':'10.01', //CSITTOTALAMOUNT=CSITUNITPRICE*CSITQUANTITY "999999[.CC]" Con decimales opcional usando el puntos como separador de decimales. No se permiten comas, ni como separador de miles ni como separador de decimales. CONDICIONAL.
'CSITQUANTITY':'1', //Cantidad del producto. CONDICIONAL.
'CSITUNITPRICE':'10.01', //Formato Idem CSITTOTALAMOUNT. CONDICIONAL.
	...........................................................
```
[<sub>Volver a inicio</sub>](#inicio)

<a name="opcionesadicionales"></a>
#### Opciones adicionales
Dentro del parámetro *$optionsSAR_operacion* pueden enviarse opciones adicionales que habilitan características para esa transacción en particular. A continuación se describen las mismas

<a name="coutas"></a>
##### Rango de Cuotas
Es posible setear el rango de cuotas a mostrar en el formulario entre un mínimo y un máximo, enviando los siguientes parametros adicionales

<table>
  <tr>
    <th>Campo</th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Tipo de Dato</th>
    <th>Valores posibles / Ejemplo</th>
  </tr>
  <tr>
    <td><b>MININSTALLMENTS</b></td>
    <td>No</td>
    <td>Mínimo de cuotas a mostrar en el formulario</td>
    <td>Numérico</td>
    <td>3</td>
  </tr>
  <tr>
    <td><b>MAXINSTALLMENTS</b></td>
    <td>No</td>
    <td>Máximo de cuotas a mostrar en el formulario</td>
    <td>Numérico</td>
    <td>9</td>
  </tr>  
</table>

<a name="timeout"></a>
##### Tiempo de vida de la transacción
Es posible setear el tiempo máximo disponible para que el cliente complete el pago en el formulario, el valor por defecto es de 30 minutos. El rango posible es de 5 minutos a 6 horas. Los valores deben ser expresados en milisegundos

<table>
  <tr>
    <th>Campo</th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Tipo de Dato</th>
    <th>Valores posibles / Ejemplo</th>
  </tr>
  <tr>
    <td><b>TIMEOUT</b></td>
    <td>No</td>
    <td>Tiempo de vida de la transacción en milisegundos</td>
    <td>Numérico</td>
    <td>1800000</td>
  </tr>
</table>

[<sub>Volver a inicio</sub>](#inicio)
<br>

<a name="confirmatransaccion"></a>
#### Confirmación de transacción
- En este caso hay que llamar a getAuthorizeAnswer(), enviando como parámetro un objeto como se describe a continuación.

<table>
  <tr>
    <th>Campo</th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Tipo de Dato</th>
    <th>Valores posibles / Ejemplo</th>
  </tr>
  <tr>
    <td><b>Security</b></td>
    <td>No</td>
    <td>Token  de Seguridad Generado en el Portal de TodoPago</td>
    <td>Alfanumérico hasta 32 caracteres</td>
    <td>1234567890ABCDEF1234567890ABCDEF</td>
  </tr>
  <tr>
    <td><b>Merchant</b></td>
    <td>Si</td>
    <td>Nro. de Comercio (Merchant ID) provisto por TodoPago</td>
    <td>Alfanumérico de  8 caracteres</td>
    <td>12345678</td>
  </tr>
  <tr>
    <td><b>RequestKey</b></td>
    <td>Si</td>
    <td>Identificador Privado del Requerimiento obtenido en la respuesta de la operación SendAuthorizeRequest . Nunca debe ser expuesto hacia el Web Browser. Solo será utilizado entre el ecommerce y TodoPago</td>
    <td>Alfanumérico hasta 48 caracteres</td>
    <td>8496472a-8c87-e35b-dcf2-94d5e31eb12f</td>
  </tr>
  <tr>
    <td><b>AnswerKey</b></td>
    <td>Sí</td>
    <td>Identificador Público de la Respuesta. Recibido según el formulario utilizado, en la url de redirección hacia el ecommerce, o como propiedad retornada en el callback del formulario híbrido.</td>
    <td>Alfanumérico hasta 48 caracteres</td>
    <td>8496472a-8c87-e35b-dcf2-94d5e31eb12f</td>
  </tr>
</table>

```nodejs
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

result :
{ StatusCode = -1,
      StatusMessage = APROBADA,
      AuthorizationKey = 1294-329E-F2FD-1AD8-3614-1218-2693-1378,
      EncodingMethod = XML,
      Payload = { Answer = { DATETIME = 2014/08/11 15:24:38,
                             RESULTCODE = -1,
                             RESULTMESSAGE = APROBADA,
                             CURRENCYNAME = Pesos,
                             PAYMENTMETHODNAME = VISA,
                             TICKETNUMBER = 12,
                             CARDNUMBERVISIBLE = 450799******4905,
                             AUTHORIZATIONCODE = TEST38,
                             INSTALLMENTPAYMENTS = 6 },
                { Request = { MERCHANT = 12345678,
                              OPERATIONID = ABCDEF-1234-12221-FDE1-00000012,
                              AMOUNT = 1.00,
                              CURRENCYCODE = 032,
			      AMOUNTBUYER = 1.20}
                }
    }

```
<ins><strong>Importante</strong></ins> El campo **AnswerKey** se adiciona  en la redirección que se realiza a alguna de las direcciones ( URL ) epecificadas en el  servicio **SendAurhorizationRequest**, esto sucede cuando la transacción ya fue resuelta y es necesario regresar al site para finalizar la transacción de pago, también se adiciona el campo Order, el cual tendrá el contenido enviado en el campo **OPERATIONID**. Para nuestro ejemplo: <strong>http://susitio.com/paydtodopago/ok?Order=27398173292187&Answer=1111-2222-3333-4444-5555-6666-7777</strong>

<table>
<tr><td>Campo</td><td>Requerido</td><td>Descripción</td><td>Tipo de Dato</td><td>Valores posibles / Ejemplo</td></tr>
<tr><td>**StatusCode** </td><td>Si</td><td>Código de estado o valor de retorno del Servicio</td><td>Numèrico de 5 posiciones</td><td> <b>-1 -> OK<br> 0 a 99999 o vacío -> error</b></td></tr>
<tr><td>**StatusMessage**</td><td>Si</td><td>Descripción del código de retorno o estado del servicio</td><td>Alfanumérico hasta 256</td><td>-</td></tr>
<tr><td>**AuthorizationKey**</td><td>No</td><td>Identificador Privado de la Respuesta</td><td>Alfanumérico hasta 256 caracteres</td><td>-</td></tr>
<tr><td>**EncodingMethod**</td><td>No</td><td>Especifica el tipo codificación que se usa para los datos de la transacciones de pagos</td><td>Alfanumérico hasta 16 caracteres</td><td>XML</td></tr>
<tr><td>**Payload**</td><td>No</td><td>Documento codificado  en el  formato especificado en el campo EncodingMethod  el cual contiene los datos de la transacción ejecutada</td><td>Alfanumérico hasta 2048 caracteres</td><td>-</td></tr></table>
.

El campo o elemento Payload es utilizado para retornar los datos de la respuesta de la transacción. En la siguiente Tabla se muestran los valores enviados en el campo _Answer_ de dicho elemento. (El otro campo presente, de nombre _Request_ contiene información enviada en el requerimiento del _GetAuthorizeAnswer_)

<table>
<tr><td>Campo</td><td>Requerido</td><td>Descripción</td><td>Tipo de Dato</td><td>Valores posibles / Ejemplo</td></tr>
<tr><td>**DATETIME**</td><td>Si</td><td>Fecha y Hora de la Transacción</td><td>Fecha y Hora. aaaammddTHHMMSSZ La hora se expresa en formato 24 hs.</td><td></td></tr>
<tr><td>**RESULTCODE**</td><td>Si</td><td>Código de estado o valor de retorno del Servicio</td><td>Numérico de 5 posiciones</td><td> <b>-1 -> OK<br> 0 a 99999 o vacío -> error</b></td></tr>
<tr><td>**RESULTMESSAGE**</td><td>Si</td><td>Descripción del código de retorno o estado del servicio</td><td>Alfanumérico hasta 256</td><td>-</td></tr>
<tr><td>**CURRENCYNAME**</td><td>No</td><td>Nombre de la Moneda</td><td> 'Pesos'</td><td> </td></tr>
<tr><td>**PAYMENTMETHODNAME**</td><td>Sí </td><td>Medio de pago usado para la operación</td><td>'VISA'</td><td></td></tr>
<tr><td>**TICKETNUMBER** </td><td>No</td><td>Número de Ticket o Voucher</td><td>Numérico de Hasta 4 dígitos</td><td></td></tr>
<tr><td>**CARDNUMBERVISIBLE**</td><td>No</td><td>Número de Tarjeta, enmascarado según normativas nacionales, regionales o globales</td><td></td><td></td></tr>
<tr><td>**AUTHORIZATIONCODE**</td><td>No</td><td>Código de Autorización</td><td>Alfanumérico de hasta 8 caracteres</td><td></td></tr>
<tr><td>**INSTALLMENTPAYMENTS**</td><td>No</td><td>Cantidad de cuotas elegidas para la operación</td><td>Numérico</td><td> Ejemplo: 03</td></tr>
<tr><td>**AMOUNTBUYER**</td><td>Si</td><td>Monto final (incluyendo Costo Financiero) pagado por el comprador</td><td>Decimal</td><td> Ejemplo: 129.68</td></tr>
</table>

Este método devuelve el resumen de los datos de la transacción.

<ins><strong>Aclaración:</strong></ins> El campo AMOUNTBUYER es el monto efectivamente pagado por el comprador, que incluye el costo financiero total.

[<sub>Volver a inicio</sub>](#inicio)


<a name="ejemplo"></a>
#### Ejemplo
- Existe un ejemplo en la carpeta https://github.com/TodoPago/SDK-Node.js/tree/master/ejemplo que muestra los resultados de los métodos principales del SDK.
- Para ejecutar este ejemplo correr la linea de comando npm install y luego ejecutar node ejemplo.js



<a name="caracteristicas"></a>
## Características

<table>
  <tr>
    <th>Campo</th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Tipo de Dato</th>
    <th>Valores posibles / Ejemplo</th>
  </tr>
  <tr>
    <td><b>MERCHANT</b></td>
    <td>Sí</td>
    <td>Código de comercio o cuenta provisto por TodoPago</td>
    <td>Alfanumérico de 8 caracteres</td>
    <td>12345678</td>
  </tr>
  <tr>
    <td><b>OPERATIONID</b></td>
    <td>Sí</td>
    <td>Identificación de la transacción para el Comercio. Debe ser distinto para cada operación.</td>
    <td>Alfanumérico de 1 a 40 caracteres.</td>
    <td>141120084707</td>
  </tr>
</table>

<a name="status"></a>
#### Status de la operación
- El SDK cuenta con un m&eacute;todo para consultar el status de la transacci&oacute;n desde la misma SDK. El m&eacute;todo se utiliza de la siguiente manera:
```nodejs
sdk.getStatus(options, merchant, operationId, callback);// Merchant es el id site y operationId es el id operación que se envió en el objeto a través del método sendAuthorizeRequest()
```
- Dicho m&eacute;todo retornara el status actual de la transacci&oacute;n en Todopago.

![estado](https://raw.githubusercontent.com/TodoPago/imagenes/master/README.img/secuencia-status.jpg)

<table>
  <tr>
    <th>Campo</th>
    <th>Requerido</th>
    <th>Descripción</th>
    <th>Tipo de Dato</th>
    <th>Valores posibles / Ejemplo</th>
  </tr>
  <tr>
  <td><b>RESULTCODE</b></td>
  <td>Sí</td>
  <td>Número identificador del estado en el que se encuentra la transacción</td>
  <td>Numérico</td>
  <td></td>
  </tr>
  <tr>
  <td><b>RESULTMESSAGE</b></td>
  <td>Sí</td>
  <td>Describe el estado en el que se encuentra la transacción</td>
  <td>Alfanumérico</td>
  <td></td>
  </tr>
  <tr>
    <td><b>DATETIME</b></td>
    <td>No</td>
    <td></td>
    <td></td>
    <td>2015-05-13T14:11:38.287+00:00</td>
  </tr>
  <tr>
    <td><b>OPERATIONID</b></td>
    <td>Sí</td>
    <td>Identificación de la transacción para el Comercio. Debe ser distinto para cada operación.</td>
    <td>Alfanumérico de 1 a 40 caracteres.</td>
    <td>141120084707</td>
  </tr>
  <tr>
    <td><b>CURRENCYCODE</b></td>
    <td>Sí</td>
    <td>Códiog de moneda utilizado en la transacción. Por el momento solo 32 (Pesos</td>
    <td>Numérico/td>
    <td>32</td>
  </tr>
  <tr>
    <td><b>AMOUNT</b></td>
    <td>Sí</td>
    <td>Importe original en Pesos de la transacción.</td>
    <td>Numérico con 9 dígitos con hasta 2 decimales 999999[.CC]
Usando el punto como separador de decimales. No se permiten comas, ni como separador de miles ni como separador de decimales.</td>
    <td>$125,38 -> 125.38 <br />$12 -> 12.00</td>
  </tr>
  <tr>
    <td><b>AMOUNTBUYER</b></td>
    <td>Sí</td>
    <td>Importe final en Pesos de la transacción.</td>
    <td>Numérico con 9 dígitos con hasta 2 decimales 999999[.CC]
Usando el punto como separador de decimales. No se permiten comas, ni como separador de miles ni como separador de decimales.</td>
    <td>$125,38 -> 125.38 <br />$12 -> 12.00</td>
  </tr>
  <tr>
    <td><b>TYPE</b></td>
    <td>Sí</td>
    <td>Tipo de Operación, en el caso del GetStatus siempre será *compra_online*</td>
    <td>Alfanumérico</td>
    <td>compra_online</td>
  </tr>
  <tr>
    <td><b>INSTALLMENTPAYMENTS</b></td>
    <td>No</td>
    <td>Código de autorización generado por el medio de pago</td>
    <td>Decimal de hasta dos dígitos.</td>
    <td>01, 02, 06, 12, etc.</td>
  </tr>
  <tr>
  <td><b>CUSTOMEREMAIL</b></td>
  <td>Sí</td>
  <td>Mail del usuario al que se le emite la factura</td>
  <td>Alfanumérico de 100 caracteres.</td>
  <td>Ejemplo: cosme@fulanito.com</td>
  </tr>
  <tr>
  <td><b>IDENTIFICATIONTYPE</b></td>
  <td>No</td>
  <td>Tipo de documento</td>
  <td></td>
  <td>DNI<br />CI<br />LE<br />LC</td>
  </tr>
  <tr>
    <td><b>IDENTIFICATION</b></td>
    <td>No</td>
    <td>Número de documento</td>
    <td>Numérico</td>
    <td></td>
  </tr>
  <tr>
    <td><b>CARDNUMBER</b></td>
    <td>No</td>
    <td>Número de Tarjeta, enmascarado según normativas nacionales</td>
    <td>alfanumérico de 20 caracteres</td>
    <td></td>
  </tr>
  <tr>
  <td><b>TITULAR</b></td>
  <td>No</td>
  <td>Nombre del titular de la tarjeta.</td>
  <td>Alfanumérico</td>
  <td></td>
  </tr>
  <tr>
    <td><b>NROTICKET</b></td>
    <td>No</td>
    <td>Numero de Ticket o Voucher</td>
    <td>Numérico de Hasta 4 dígitos</td>
    <td></td>
  </tr>
</table>

[<sub>Volver a inicio</sub>](#inicio)

<a name="statusdate"></a>
#### Consulta de operaciones por rango de tiempo

![obtener operaciones por rango](https://raw.githubusercontent.com/TodoPago/imagenes/master/README.img/secuencia-getoperations.jpg)

En este caso hay que llamar a getByRangeDateTime() y devolvera todas las operaciones realizadas en el rango de fechas dado

```nodejs

	var parameters = {
		'MERCHANT': '2153',
		'STARTDATE': '2015-01-01T17:34:42.903',
		'ENDDATE': '2015-12-10T17:34:42.903'
	};

	sdk.getByRangeDateTime(options, parameters, function(result, err){
		console.log("-------------------***-------------------");
		console.log("GetByRangeDateTime");
		console.log(result);
		console.log(err);
		console.log("-------------------***-------------------");
	});


```

[<sub>Volver a inicio</sub>](#inicio)

<a name="devoluciones"></a>
#### Devoluciones

![devolucion total](https://raw.githubusercontent.com/TodoPago/imagenes/master/README.img/secuencia-devolucion-total.jpg)

![devolucion parcial](https://raw.githubusercontent.com/TodoPago/imagenes/master/README.img/secuencia-devolucion-parcial.jpg)

El SDK dispone de métodos para realizar la devolución online, total o parcial, de una transacción realizada a traves de TodoPago.
- Devolución Total
- Se debe llamar al método ```voidRequest``` de la siguiente manera:

Campo            | Requerido  | Descripción                                                              | Tipo de Dato | Valores posibles / Ejemplo
-----------------|------------|---------------------------------------------------------------------     |--------------|---------------------------
Security         | Sí         | API Key del comercio asignada por TodoPago                               | alfanumérico | 837BE68A892F06C17B944F344AEE8F5F
Merchant         | Sí         | Nro de comercio asignado por TodoPago                                    | numérico     | 12345
RequestKey       | No*        | RequestKey devuelto como respuesta del servicio SendAutorizeRequest      | alfanumérico | 6d2589f2-37e6-1334-7565-3dc19404480c
AuthorizationKey | No*        | AuthorizationKey devuelto como respuesta del servicio GetAuthorizeAnswer | alfanumérico | 4a2569a2-38e6-4589-1564-4480c3dc1940

_*Es requerida la presencia de sólo uno de estos 2 campos_

```nodejs

	var parameters = {
		'Security': '108fc2b7c8a640f2bdd3ed505817ffde',
		'Merchant': '2669',
		'RequestKey': '0d801e1c-e6b1-672c-b717-5ddbe5ab97d6',
		'AMOUNT': 1.00
	};

	sdk.voidRequest(options, parameters, function(result, err){
		console.log("-------------------***-------------------");
		console.log("VoidRequest");
		console.log(result);
		console.log(err);
		console.log("-------------------***-------------------");
	});
```

- También se puede llamar al método ```voidRequest``` de esta otra manera:
```nodejs

	var parameters = {
		'Security': '108fc2b7c8a640f2bdd3ed505817ffde',
		'Merchant': '2669',
		'AuthorizationKey': '0d801e1c-e6b1-672c-b717-5ddbe5ab97d6',
		'AMOUNT': 1.00
	};

	sdk.voidRequest(options, parameters, function(result, err){
		console.log("-------------------***-------------------");
		console.log("VoidRequest");
		console.log(result);
		console.log(err);
		console.log("-------------------***-------------------");
	});
```

[<sub>Volver a inicio</sub>](#inicio)

<a name="devolucionparcial"></a>
#### Devolución parcial
Se debe llamar al método ```returnRequest``` de la siguiente manera:

```nodejs

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
```

También se puede llamar al método ```returnRequest``` de la esta otra manera:
```nodejs

	var parameters = {
		'Security': '108fc2b7c8a640f2bdd3ed505817ffde',
		'Merchant': '2669',
		'AuthorizationKey': '0d801e1c-e6b1-672c-b717-5ddbe5ab97d6',
		'AMOUNT': 1.00
	};

	sdk.returnRequest(options, parameters, function(result, err){
		console.log("-------------------***-------------------");
		console.log("ReturnRequest");
		console.log(result);
		console.log(err);
		console.log("-------------------***-------------------");
	});
```
[<sub>Volver a inicio</sub>](#inicio)




<a name="formhidrido"></a>
#### Formulario híbrido
**Conceptos básicos**<br>
El formulario híbrido, es una alternativa al medio de pago actual por redirección al formulario externo de TodoPago.<br>
Con el mismo, se busca que el comercio pueda adecuar el look and feel del formulario a su propio diseño.

**Librería**<br>
El formulario requiere incluir en la página una librería Javascript de TodoPago.<br>
El endpoint depende del entorno:
+ Desarrollo: https://developers.todopago.com.ar/resources/TPHybridForm-v0.1.js
+ Producción: https://forms.todopago.com.ar/resources/TPHybridForm-v0.1.js

**Restricciones y libertades en la implementación**

+ Ninguno de los campos del formulario podrá contar con el atributo name.
+ Se deberá proveer de manera obligatoria un botón para gestionar el pago con Billetera Todo Pago.
+ Todos los elementos de tipo <option> son completados por la API de Todo Pago.
+ Los campos tienen un id por defecto. Si se prefiere utilizar otros ids se deberán especificar los
mismos cuando se inicialice el script de Todo Pago.
+ Pueden aplicarse todos los detalles visuales que se crean necesarios, la API de Todo Pago no
altera los atributos class y style.
+ Puede utilizarse la API para setear los atributos placeholder del formulario, para ello deberá
especificar dichos placeholders en la inicialización del formulario "window.TPFORMAPI.hybridForm.setItem". En caso de que no se especifiquen los placeholders se usarán los valores por defecto de la API.

**HTML del formulario**

El formulario implementado debe contar al menos con los siguientes campos.

```html
<body>
	<select id="formaDePagoCbx"></select>
	<select id="bancoCbx"></select>
	<select id="promosCbx"></select>
	<label id="labelPromotionTextId"></label>

  <!-- Para los casos en el que el comercio opera con PEI -->
  <label id="labelPeiCheckboxId"></label>
  <input id="peiCbx"/>

	<input id="numeroTarjetaTxt"/>
	<input id="mesTxt"/>
	<input id="anioTxt"/>
	<input id="codigoSeguridadTxt"/>
	<label id="labelCodSegTextId"></label>
	<input id="apynTxt"/>
	<select id="tipoDocCbx"></select>
	<input id="nroDocTxt"/>
	<input id="emailTxt"/><br/>

  <!-- Para los casos en el que el comercio opera con PEI -->
 	<label id="labelPeiTokenTextId"></label>
 	<input id="peiTokenTxt"/>

        <button id="MY_btnPagarConBilletera" class="tp-button"/>
	<button id="MY_btnConfirmarPago"/>
</body>
```

**Inizialización y parámetros requeridos**<br>
Para inicializar el formulario se usa window.TPFORMAPI.hybridForm.initForm. El cual permite setear los elementos y ids requeridos.

Para inicializar un ítem de pago, es necesario llamar a window.TPFORMAPI.hybridForm.setItem. Este requiere obligatoriamente el parámetro publicKey que corresponde al PublicRequestKey (entregado por el SAR).
Se sugiere agregar los parámetros usuario, e-mail, tipo de documento y número.

**Javascript**
```js
window.TPFORMAPI.hybridForm.initForm({
    callbackValidationErrorFunction: 'validationCollector',
	callbackCustomSuccessFunction: 'customPaymentSuccessResponse',
	callbackCustomErrorFunction: 'customPaymentErrorResponse',
	callbackBilleteraFunction: 'billeteraPaymentResponse',
	botonPagarId: 'MY_btnConfirmarPago',
	modalCssClass: 'modal-class',
	modalContentCssClass: 'modal-content',
	beforeRequest: 'initLoading',
	afterRequest: 'stopLoading'
});

window.TPFORMAPI.hybridForm.setItem({
    publicKey: 'taf08222e-7b32-63d4-d0a6-5cabedrb5782', //obligatorio
    defaultNombreApellido: 'Usuario',
    defaultNumeroDoc: 20234211,
    defaultMail: 'todopago@mail.com',
    defaultTipoDoc: 'DNI'
});

//callbacks de respuesta del pago
function validationCollector(parametros) {
}
function customPaymentSuccessResponse(response) {
}
function customPaymentErrorResponse(response) {
}
function billeteraPaymentResponse(response) {
}
function initLoading() {
}
function stopLoading() {
}
```

**Callbacks**<br>
El formulario define callbacks javascript, que son llamados según el estado y la información del pago realizado:
+ billeteraPaymentResponse: Devuelve response si el pago se realizó con Billetera.
+ customPaymentSuccessResponse: Devuelve response si el pago se realizó correctamente.
+ customPaymentErrorResponse: Si hubo algun error durante el proceso de pago, este devuelve el response con el código y mensaje correspondiente.

**Ejemplo de Implementación**:
<a href="/form_hibrido-ejemplo/index.html" target="_blank">Formulario híbrido</a>
<br>

[<sub>Volver a inicio</sub>](#inicio)


<a name="credenciales"></a>
#### Obtener Credenciales

![credenciales](https://raw.githubusercontent.com/TodoPago/imagenes/master/README.img/secuencia-credenciales.jpg)

- Los datos como Authorization , merchantId y ApiKey se pueden obtener mediante el método getCredentials del objeto User llamada desde el sdk.
- Se debe pasar por parámetro los datos de ingreso de todoPago (mail y password) en caso de no tener una cuenta podes registrarte en http://www.todopago.com.ar/registrate  y generar tus credenciales en Soluciones para Vendedores -> Comercios:Integración


```
	var email = 'micuentademail@gmail.com';
	var pass = 'Password01';

	sdk.getCredentials(email, pass, options ,  function(result, err){
		console.log("-------------------***-------------------");
		console.log("getCredentials:");
		console.log(result);
		console.log('err: ');
		console.log(err);
		console.log("-------------------***-------------------");
	});


```


[Volver a inicio](#inicio)


<a name="tablareferencia"></a>
## Tablas de Referencia
###### [Provincias](#p)

<p>Solo utilizado para incluir los datos de control de fraude</p>
<table>
<tr><th>Provincia</th><th>Código</th></tr>
<tr><td>CABA</td><td>C</td></tr>
<tr><td>Buenos Aires</td><td>B</td></tr>
<tr><td>Catamarca</td><td>K</td></tr>
<tr><td>Chaco</td><td>H</td></tr>
<tr><td>Chubut</td><td>U</td></tr>
<tr><td>Córdoba</td><td>X</td></tr>
<tr><td>Corrientes</td><td>W</td></tr>
<tr><td>Entre Ríos</td><td>E</td></tr>
<tr><td>Formosa</td><td>P</td></tr>
<tr><td>Jujuy</td><td>Y</td></tr>
<tr><td>La Pampa</td><td>L</td></tr>
<tr><td>La Rioja</td><td>F</td></tr>
<tr><td>Mendoza</td><td>M</td></tr>
<tr><td>Misiones</td><td>N</td></tr>
<tr><td>Neuquén</td><td>Q</td></tr>
<tr><td>Río Negro</td><td>R</td></tr>
<tr><td>Salta</td><td>A</td></tr>
<tr><td>San Juan</td><td>J</td></tr>
<tr><td>San Luis</td><td>D</td></tr>
<tr><td>Santa Cruz</td><td>Z</td></tr>
<tr><td>Santa Fe</td><td>S</td></tr>
<tr><td>Santiago del Estero</td><td>G</td></tr>
<tr><td>Tierra del Fuego</td><td>V</td></tr>
<tr><td>Tucumán</td><td>T</td></tr>
</table>

[<sub>Volver a inicio</sub>](#inicio)

<a name="codigoerrores"></a>
## Tabla de errores operativos

<table>
<tr><th>Id mensaje</th><th>Mensaje</th></tr>
<tr><td>-1</td><td>Tu compra fue exitosa.</td></tr>
<tr><td>1081</td><td>Tu saldo es insuficiente para realizar la transacción.</td></tr>
<tr><td>1100</td><td>El monto ingresado es menor al mínimo permitido</td></tr>
<tr><td>1101</td><td>El monto ingresado supera el máximo permitido.</td></tr>
<tr><td>1102</td><td>La tarjeta ingresada no corresponde al Banco indicado. Revisalo.</td></tr>
<tr><td>1104</td><td>El precio ingresado supera al máximo permitido.</td></tr>
<tr><td>1105</td><td>El precio ingresado es menor al mínimo permitido.</td></tr>
<tr><td>2010</td><td>En este momento la operación no pudo ser realizada. Por favor intentá más tarde. Volver a Resumen.</td></tr>
<tr><td>2031</td><td>En este momento la validación no pudo ser realizada, por favor intentá más tarde.</td></tr>
<tr><td>2050</td><td>Lo sentimos, el botón de pago ya no está disponible. Comunicate con tu vendedor.</td></tr>
<tr><td>2051</td><td>La operación no pudo ser procesada. Por favor, comunicate con tu vendedor.</td></tr>
<tr><td>2052</td><td>La operación no pudo ser procesada. Por favor, comunicate con tu vendedor.</td></tr>
<tr><td>2053</td><td>La operación no pudo ser procesada. Por favor, intentá más tarde. Si el problema persiste comunicate con tu vendedor</td></tr>
<tr><td>2054</td><td>Lo sentimos, el producto que querés comprar se encuentra agotado por el momento. Por favor contactate con tu vendedor.</td></tr>
<tr><td>2056</td><td>La operación no pudo ser procesada. Por favor intentá más tarde.</td></tr>
<tr><td>2057</td><td>La operación no pudo ser procesada. Por favor intentá más tarde.</td></tr>
<tr><td>2059</td><td>La operación no pudo ser procesada. Por favor intentá más tarde.</td></tr>
<tr><td>90000</td><td>La cuenta destino de los fondos es inválida. Verificá la información ingresada en Mi Perfil.</td></tr>
<tr><td>90001</td><td>La cuenta ingresada no pertenece al CUIT/ CUIL registrado.</td></tr>
<tr><td>90002</td><td>No pudimos validar tu CUIT/CUIL.  Comunicate con nosotros <a href="#contacto" target="_blank">acá</a> para más información.</td></tr>
<tr><td>99005</td><td>Tu compra no pudo realizarse. Iniciala nuevamente.</td></tr>
<tr><td>99900</td><td>El pago fue realizado exitosamente</td></tr>
<tr><td>99901</td><td>No hemos encontrado tarjetas vinculadas a tu Billetera. Podés  adherir medios de pago desde www.todopago.com.ar</td></tr>
<tr><td>99902</td><td>No se encontro el medio de pago seleccionado</td></tr>
<tr><td>99903</td><td>Lo sentimos, hubo un error al procesar la operación. Por favor reintentá más tarde.</td></tr>
<tr><td>99904</td><td>Tu compra no puede ser realizada. Comunicate con tu vendedor.</td></tr>
<tr><td>99953</td><td>Tu compra no pudo realizarse. Iniciala nuevamente o utilizá otro medio de pago.</td></tr>
<tr><td>99960</td><td>Esta compra requiere autorización de VISA. Comunicate al número que se encuentra al dorso de tu tarjeta.</td></tr>
<tr><td>99961</td><td>Esta compra requiere autorización de AMEX. Comunicate al número que se encuentra al dorso de tu tarjeta.</td></tr>
<tr><td>99970</td><td>Lo sentimos, no pudimos procesar la operación. Por favor reintentá más tarde.</td></tr>
<tr><td>99971</td><td>Lo sentimos, no pudimos procesar la operación. Por favor reintentá más tarde.</td></tr>
<tr><td>99978</td><td>Lo sentimos, no pudimos procesar la operación. Por favor reintentá más tarde.</td></tr>
<tr><td>99979</td><td>Lo sentimos, el pago no pudo ser procesado.</td></tr>
<tr><td>99980</td><td>Ya realizaste un pago en este sitio por el mismo importe. Si querés realizarlo nuevamente esperá 5 minutos.</td></tr>
<tr><td>99982</td><td>Tu compra no pudo ser procesada. Iniciala nuevamente utilizando otro medio de pago.</td></tr>
<tr><td>99983</td><td>Lo sentimos, el medio de pago no permite la cantidad de cuotas ingresadas. Por favor intentá más tarde.</td></tr>
<tr><td>99984</td><td>Lo sentimos, el medio de pago seleccionado no opera en cuotas.</td></tr>
<tr><td>99985</td><td>Lo sentimos, el pago no pudo ser procesado.</td></tr>
<tr><td>99986</td><td>Lo sentimos, en este momento la operación no puede ser realizada. Por favor intentá más tarde.</td></tr>
<tr><td>99987</td><td>Lo sentimos, en este momento la operación no puede ser realizada. Por favor intentá más tarde.</td></tr>
<tr><td>99988</td><td>Lo sentimos, momentaneamente el medio de pago no se encuentra disponible. Por favor intentá más tarde.</td></tr>
<tr><td>99989</td><td>La tarjeta ingresada no está habilitada. Comunicate con la entidad emisora de la tarjeta para verificar el incoveniente.</td></tr>
<tr><td>99990</td><td>La tarjeta ingresada está vencida. Por favor seleccioná otra tarjeta o actualizá los datos.</td></tr>
<tr><td>99991</td><td>Los datos informados son incorrectos. Por favor ingresalos nuevamente.</td></tr>
<tr><td>99992</td><td>La fecha de vencimiento es incorrecta. Por favor seleccioná otro medio de pago o actualizá los datos.</td></tr>
<tr><td>99993</td><td>La tarjeta ingresada no está vigente. Por favor seleccioná otra tarjeta o actualizá los datos.</td></tr>
<tr><td>99994</td><td>El saldo de tu tarjeta no te permite realizar esta compra. Iniciala nuevamente utilizando otro medio de pago.</td></tr>
<tr><td>99995</td><td>La tarjeta ingresada es invalida. Seleccioná otra tarjeta para realizar el pago.</td></tr>
<tr><td>99996</td><td>La operación fué rechazada por el medio de pago porque el monto ingresado es inválido.</td></tr>
<tr><td>99997</td><td>Lo sentimos, en este momento la operación no puede ser realizada. Por favor intentá más tarde.</td></tr>
<tr><td>99998</td><td>Lo sentimos, la operación fue rechazada. Comunicate con la entidad emisora de la tarjeta para verificar el incoveniente o seleccioná otro medio de pago.</td></tr>
<tr><td>99999</td><td>Lo sentimos, la operación no pudo completarse. Comunicate con la entidad emisora de la tarjeta para verificar el incoveniente o seleccioná otro medio de pago.</td></tr>
</table>

[<sub>Volver a inicio</sub>](#inicio)

<a name="interrores"></a>
## Tabla de errores de integración

<table>
<tr><td>**Id mensaje**</td><td>**Descripción**</td></tr>
<tr><td>98001 </td><td>ERROR: El campo CSBTCITY es requerido</td></tr>
<tr><td>98002 </td><td>ERROR: El campo CSBTCOUNTRY es requerido</td></tr>
<tr><td>98003 </td><td>ERROR: El campo CSBTCUSTOMERID es requerido</td></tr>
<tr><td>98004 </td><td>ERROR: El campo CSBTIPADDRESS es requerido</td></tr>
<tr><td>98005 </td><td>ERROR: El campo CSBTEMAIL es requerido</td></tr>
<tr><td>98006 </td><td>ERROR: El campo CSBTFIRSTNAME es requerido</td></tr>
<tr><td>98007 </td><td>ERROR: El campo CSBTLASTNAME es requerido</td></tr>
<tr><td>98008 </td><td>ERROR: El campo CSBTPHONENUMBER es requerido</td></tr>
<tr><td>98009 </td><td>ERROR: El campo CSBTPOSTALCODE es requerido</td></tr>
<tr><td>98010 </td><td>ERROR: El campo CSBTSTATE es requerido</td></tr>
<tr><td>98011 </td><td>ERROR: El campo CSBTSTREET1 es requerido</td></tr>
<tr><td>98012 </td><td>ERROR: El campo CSBTSTREET2 es requerido</td></tr>
<tr><td>98013 </td><td>ERROR: El campo CSPTCURRENCY es requerido</td></tr>
<tr><td>98014 </td><td>ERROR: El campo CSPTGRANDTOTALAMOUNT es requerido</td></tr>
<tr><td>98015 </td><td>ERROR: El campo CSMDD7 es requerido</td></tr>
<tr><td>98016 </td><td>ERROR: El campo CSMDD8 es requerido</td></tr>
<tr><td>98017 </td><td>ERROR: El campo CSMDD9 es requerido</td></tr>
<tr><td>98018 </td><td>ERROR: El campo CSMDD10 es requerido</td></tr>
<tr><td>98019 </td><td>ERROR: El campo CSMDD11 es requerido</td></tr>
<tr><td>98020 </td><td>ERROR: El campo CSSTCITY es requerido</td></tr>
<tr><td>98021 </td><td>ERROR: El campo CSSTCOUNTRY es requerido</td></tr>
<tr><td>98022 </td><td>ERROR: El campo CSSTEMAIL es requerido</td></tr>
<tr><td>98023 </td><td>ERROR: El campo CSSTFIRSTNAME es requerido</td></tr>
<tr><td>98024 </td><td>ERROR: El campo CSSTLASTNAME es requerido</td></tr>
<tr><td>98025 </td><td>ERROR: El campo CSSTPHONENUMBER es requerido</td></tr>
<tr><td>98026 </td><td>ERROR: El campo CSSTPOSTALCODE es requerido</td></tr>
<tr><td>98027 </td><td>ERROR: El campo CSSTSTATE es requerido</td></tr>
<tr><td>98028 </td><td>ERROR: El campo CSSTSTREET1 es requerido</td></tr>
<tr><td>98029 </td><td>ERROR: El campo CSMDD12 es requerido</td></tr>
<tr><td>98030 </td><td>ERROR: El campo CSMDD13 es requerido</td></tr>
<tr><td>98031 </td><td>ERROR: El campo CSMDD14 es requerido</td></tr>
<tr><td>98032 </td><td>ERROR: El campo CSMDD15 es requerido</td></tr>
<tr><td>98033 </td><td>ERROR: El campo CSMDD16 es requerido</td></tr>
<tr><td>98034 </td><td>ERROR: El campo CSITPRODUCTCODE es requerido</td></tr>
<tr><td>98035 </td><td>ERROR: El campo CSITPRODUCTDESCRIPTION es requerido</td></tr>
<tr><td>98036 </td><td>ERROR: El campo CSITPRODUCTNAME es requerido</td></tr>
<tr><td>98037 </td><td>ERROR: El campo CSITPRODUCTSKU es requerido</td></tr>
<tr><td>98038 </td><td>ERROR: El campo CSITTOTALAMOUNT es requerido</td></tr>
<tr><td>98039 </td><td>ERROR: El campo CSITQUANTITY es requerido</td></tr>
<tr><td>98040 </td><td>ERROR: El campo CSITUNITPRICE es requerido</td></tr>
<tr><td>98101 </td><td>ERROR: El formato del campo CSBTCITY es incorrecto</td></tr>
<tr><td>98102 </td><td>ERROR: El formato del campo CSBTCOUNTRY es incorrecto</td></tr>
<tr><td>98103 </td><td>ERROR: El formato del campo CSBTCUSTOMERID es incorrecto</td></tr>
<tr><td>98104 </td><td>ERROR: El formato del campo CSBTIPADDRESS es incorrecto</td></tr>
<tr><td>98105 </td><td>ERROR: El formato del campo CSBTEMAIL es incorrecto</td></tr>
<tr><td>98106 </td><td>ERROR: El formato del campo CSBTFIRSTNAME es incorrecto</td></tr>
<tr><td>98107 </td><td>ERROR: El formato del campo CSBTLASTNAME es incorrecto</td></tr>
<tr><td>98108 </td><td>ERROR: El formato del campo CSBTPHONENUMBER es incorrecto</td></tr>
<tr><td>98109 </td><td>ERROR: El formato del campo CSBTPOSTALCODE es incorrecto</td></tr>
<tr><td>98110 </td><td>ERROR: El formato del campo CSBTSTATE es incorrecto</td></tr>
<tr><td>98111 </td><td>ERROR: El formato del campo CSBTSTREET1 es incorrecto</td></tr>
<tr><td>98112 </td><td>ERROR: El formato del campo CSBTSTREET2 es incorrecto</td></tr>
<tr><td>98113 </td><td>ERROR: El formato del campo CSPTCURRENCY es incorrecto</td></tr>
<tr><td>98114 </td><td>ERROR: El formato del campo CSPTGRANDTOTALAMOUNT es incorrecto</td></tr>
<tr><td>98115 </td><td>ERROR: El formato del campo CSMDD7 es incorrecto</td></tr>
<tr><td>98116 </td><td>ERROR: El formato del campo CSMDD8 es incorrecto</td></tr>
<tr><td>98117 </td><td>ERROR: El formato del campo CSMDD9 es incorrecto</td></tr>
<tr><td>98118 </td><td>ERROR: El formato del campo CSMDD10 es incorrecto</td></tr>
<tr><td>98119 </td><td>ERROR: El formato del campo CSMDD11 es incorrecto</td></tr>
<tr><td>98120 </td><td>ERROR: El formato del campo CSSTCITY es incorrecto</td></tr>
<tr><td>98121 </td><td>ERROR: El formato del campo CSSTCOUNTRY es incorrecto</td></tr>
<tr><td>98122 </td><td>ERROR: El formato del campo CSSTEMAIL es incorrecto</td></tr>
<tr><td>98123 </td><td>ERROR: El formato del campo CSSTFIRSTNAME es incorrecto</td></tr>
<tr><td>98124 </td><td>ERROR: El formato del campo CSSTLASTNAME es incorrecto</td></tr>
<tr><td>98125 </td><td>ERROR: El formato del campo CSSTPHONENUMBER es incorrecto</td></tr>
<tr><td>98126 </td><td>ERROR: El formato del campo CSSTPOSTALCODE es incorrecto</td></tr>
<tr><td>98127 </td><td>ERROR: El formato del campo CSSTSTATE es incorrecto</td></tr>
<tr><td>98128 </td><td>ERROR: El formato del campo CSSTSTREET1 es incorrecto</td></tr>
<tr><td>98129 </td><td>ERROR: El formato del campo CSMDD12 es incorrecto</td></tr>
<tr><td>98130 </td><td>ERROR: El formato del campo CSMDD13 es incorrecto</td></tr>
<tr><td>98131 </td><td>ERROR: El formato del campo CSMDD14 es incorrecto</td></tr>
<tr><td>98132 </td><td>ERROR: El formato del campo CSMDD15 es incorrecto</td></tr>
<tr><td>98133 </td><td>ERROR: El formato del campo CSMDD16 es incorrecto</td></tr>
<tr><td>98134 </td><td>ERROR: El formato del campo CSITPRODUCTCODE es incorrecto</td></tr>
<tr><td>98135 </td><td>ERROR: El formato del campo CSITPRODUCTDESCRIPTION es incorrecto</td></tr>
<tr><td>98136 </td><td>ERROR: El formato del campo CSITPRODUCTNAME es incorrecto</td></tr>
<tr><td>98137 </td><td>ERROR: El formato del campo CSITPRODUCTSKU es incorrecto</td></tr>
<tr><td>98138 </td><td>ERROR: El formato del campo CSITTOTALAMOUNT es incorrecto</td></tr>
<tr><td>98139 </td><td>ERROR: El formato del campo CSITQUANTITY es incorrecto</td></tr>
<tr><td>98140 </td><td>ERROR: El formato del campo CSITUNITPRICE es incorrecto</td></tr>
<tr><td>98201 </td><td>ERROR: Existen errores en la información de los productos</td></tr>
<tr><td>98202 </td><td>ERROR: Existen errores en la información de CSITPRODUCTDESCRIPTION los productos</td></tr>
<tr><td>98203 </td><td>ERROR: Existen errores en la información de CSITPRODUCTNAME los productos</td></tr>
<tr><td>98204 </td><td>ERROR: Existen errores en la información de CSITPRODUCTSKU los productos</td></tr>
<tr><td>98205 </td><td>ERROR: Existen errores en la información de CSITTOTALAMOUNT los productos</td></tr>
<tr><td>98206 </td><td>ERROR: Existen errores en la información de CSITQUANTITY los productos</td></tr>
<tr><td>98207 </td><td>ERROR: Existen errores en la información de CSITUNITPRICE de los productos</td></tr>
</table>

[<sub>Volver a inicio</sub>](#inicio)
