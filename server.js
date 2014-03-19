var http = require('http'); // Llamada al módulo HTTP
var url = require('url'); // Llamada al módulo url
var querystring = require('querystring'); // Llamada al módulo url

function iniciar(route, handle) {
  function onRequest(request, response) {
/*  ---------- EXAMPLES OF MODULES URL AND QUERYSTRING ----------
                                url.parse(string).query
                                            |
           url.parse(string).pathname       |
                        |                   |
                        |                   |
                      ------- -------------------
http://localhost:8888/iniciar?foo=bar&hello=world
                                  ---       -----
                                   |          |
                                   |          |
              querystring(string)["foo"]      |
                                              |
                                     querystring(string)["hello"]
    You can uncomment the next four lines with comment '//' for you see the results.
*/
    //console.log('URL: ' + url.parse('http://localhost:8888/iniciar?foo=bar&hello=world').pathname + '.');
    //console.log('URL query: ' + url.parse('http://localhost:8888/iniciar?foo=bar&hello=world').query + '.');
    //console.log('variable foo: ' + querystring.parse('foo=bar&hello=world').foo + '.');
    //console.log('variable hello: ' + querystring.parse('foo=bar&hello=world').hello + '.');
    var pathname = url.parse(request.url).pathname;
    console.log('Peticion para ' + pathname + ' recibida.');
    route(handle, pathname, response, request);
  } // onRequest
  http.createServer(onRequest).listen(8888); // createServer es una función que devuelve un objeto
                 // éste objeto tiene un método llamado listen que toma
                 // un valor númerico que indica el puerto en el que
                 // nuestro servidor va a escuchar (8888 en nuestro caso).
  console.log('Servidor en marcha.'); // Mensajes de log
} // iniciar

exports.start = iniciar; // Cuándo llamemos a server.start llamará
                         // a la función iniciar de éste archivo