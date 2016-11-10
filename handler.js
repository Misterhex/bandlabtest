'use strict';

var http = require('http');

module.exports.getComments = (event, context, callback) => {

  console.log(event);

  http.get({
    host: 'jsonplaceholder.typicode.com',
    path: '/comments/' + event.path.id,
  }, function (response) {

    console.log(response.statusCode);

    var body = '';

    response.on('data', function (d) {
      body += d;
    });

    response.on('end', function () {
      var response = {
        statusCode: 200,
        body: body
      };
      
      callback(null, body);

    });
  });
};



