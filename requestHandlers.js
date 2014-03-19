//var exec = require('child_process').exec; // Módulo para poder ejecutar comandos Linux
var querystring = require("querystring"); // LLamada al módulo querystring
var fs = require('fs'); // Llamada al módulo fs
var formidable = require('formidable'); // Llamada al módulo formidable

/*
 * función que mostrará el html
 * para subir una imagen PNG
 */
function start(response) {
  console.log('Manipulador de petición "start" ha sido llamado.');

  var body = '<!doctype>' +
      '<html>' +
      '<head>' +
      '<meta charset="UTF-8"/>' +
      '</head>' +
      '<body>' +
      '<form action="/upload" enctype="multipart/form-data" method="post">' +
      '<input type="file" name="upload" multiple="multiple">' +
      '<input type="submit" value="Submit image" />' +
      '</form>' +
      '</body>' +
      '</html>';
  //var sys = require('util'); // Módulo util
  //var child;
  /*exec('find /',
    { timeout : 10000, maxBuffer: 20000*1024 }, // 10 seg*/
      //function (error, stdout, stderr) {
  response.writeHead(200, {'Content-Type' : 'text/html'});
  response.write(body);
  response.end();
  //});
  // Función para ejecutar comandos linux en Node.js
  /*exec('ls -lha', function (error, stdout, stderr) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(stdout);
    response.end();
  });*/

  /*function sleep(milliSeconds) {
    // Obten la hora actual
    var startTime = new Date().getTime();
    // Atasca la CPU
    while (new Date().getTime() < startTime + milliSeconds);
  }*/

  //sleep(10000);
  //return 'Hola Iniciar';
} // start

/*
 * Función que carga la imagen del servidor
 */
function upload(response, request) {
  console.log('Manipulador de petición "upload" ha sido llamado.');
  var form = new formidable.IncomingForm(); // Creamos una instancia de IncomingForm
                               // para analizar la imagen que vamos a recibir
  // *IMPORTANT The formidable module needs to be installed: npm install formidable
  form.parse(request, function (error, fields, files) {
    fs.rename(files.upload.path, './tmp/test.png', function (error) { // Renombramos el archivo
                                                        // que ha sido subido a test.png
      if (error) { // Si hay algún error
        fs.unlink('./tmp/test.png'); // Elimina la imagen
        fs.rename(files.upload.path, './tmp/test.png'); // Y vuelve a renombrar el archivo subido
      } // if
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Received image:<br/>');
    response.write('<img src="/show" />'); // Llama a la función show para mostrar la imagen
    response.end();
  });
} // upload

/*
 * Función que muestra la imagen
 */
function show(response) {
  console.log('Manipulador de petición "show" ha sido llamado.');
  fs.readFile('./tmp/test.png', 'binary', function (error, file) { // Lee la imagen
    if (error) { // Si hay algún error muestra un mensaje de error
      response.writeHead(500, {'Content-Type' : 'text/plain'});
      response.write(error + '\n');
      response.end();
    } else { // Si no, carga la imagen
      response.writeHead(200, {'Content-Type' : 'image/png'});
      response.write(file, 'binary');
      response.end();
    } // else
  }); // fs.readFile
} // show

exports.start = start;
exports.upload = upload;
exports.show = show;