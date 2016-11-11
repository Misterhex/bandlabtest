'use strict';

const http = require('http');
const fs = require('fs');
const uuid = require('uuid');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = 'comments.inbox';

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

      const uniqueId = uuid.v4();
      const fileName = uniqueId + '.json';

      fs.writeFile('/tmp/' + fileName, body, function (err) {
        callback(null, { data: body, err: err });
      });

      // s3.putObject({
      //   Bucket: bucketName,
      //   Key: + '.json',
      //   Body: body,
      // }, function (err, data) {
      //   callback(null, { data: data, err: err });
      // });

      // s3.headBucket({
      //   Bucket: bucketName,
      // }, function (err, data) {
      //   callback(null, { data: data, err: err });
      // });

      // s3.listBuckets(function (err, data) {
      //   callback(null, { data: data, err: err });
      // });

    });
  });
};



