function route(handle, pathname, response, request) {
  console.log('A punto de lanzar una peticion para ' + pathname + '.');
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log('No se encontro manipulador para ' + pathname + '.');
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write('404 Not Found');
    response.end();
  } // else
} // route

exports.route = route; // Cuándo llamemos a route llamará
                       // a la función route de éste archivo