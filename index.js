var server = require('./server'); // Llamada al módulo server
var router = require('./router'); // Llama al módulo router
var requestHandlers = require('./requestHandlers'); // Llama al módulo requestHandlers

// Crearemos una variable para maneras las diversas peticiones HTTP
var handle = {}; // Object JSON
handle['/'] = requestHandlers.start; // Para la ruta localhost:8888/
handle['/start'] = requestHandlers.start; // Para la ruta localhost:8888/start
handle['/upload'] = requestHandlers.upload; // Para la ruta localhost:8888/upload
handle['/show'] = requestHandlers.show; // Para la ruta localhost:8888/show

server.start(router.route, handle); // Arrancamos el servidor