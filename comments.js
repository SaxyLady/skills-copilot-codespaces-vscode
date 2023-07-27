// Create a web server that can respond to requests for /comments.json
// with a random comment from the array of comments in the data file.
// Use the fs module to read the file and JSON.parse() to convert it to an array.
// Use the path module to get the extension from the incoming URL, and use that
// to set the Content-Type header on the response appropriately.
// Use res.end() to send the response back to the client.
// Finally, use http.createServer() to create the server, passing it a
// callback function that takes a request and response as arguments.

var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {
  var ext = path.extname(req.url);
  var contentType = 'text/html';
  if (ext === '.css') {
    contentType = 'text/css';
  }
  if (ext === '.js') {
    contentType = 'text/javascript';
  }
  if (req.url === '/comments.json') {
    fs.readFile('data/comments.json', function(err, data) {
      if (err) {
        console.log(err);
      }
      var comments = JSON.parse(data);
      var randomIndex = Math.floor(Math.random() * comments.length);
      var randomComment = comments[randomIndex];
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(randomComment));
    });
  } else {
    fs.readFile('public' + req.url, function(err, data) {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, {
        'Content-Type': contentType
      });
      res.end(data);
    });
  }
});

server.listen(8080);