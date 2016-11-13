'use strict';

const http = require('http');
const fs = require('fs');
const uuid = require('uuid');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const putBucketName = 'comments-inbox';

module.exports.getComment = (event, context, callback) => {

  http.get({
    host: 'jsonplaceholder.typicode.com',
    path: '/comments/' + event.path.id,
  }, function (response) {

    var body = '';

    response.on('data', function (d) {
      body += d;
    });

    response.on('end', function () {

      const uniqueId = uuid.v4();
      const fileName = uniqueId + '.json';

      fs.writeFile('/tmp/' + fileName, body, function (err) {

        console.log("write to lamdba locally. err : " + err);

        console.log("putting objects into bucket...");

        s3.putObject({
          Bucket: putBucketName,
          Key: fileName,
          Body: body,
        }, function (err, data) {
          console.log("putting objects into bucket callback");
          console.log(err);
          console.log(data);
          callback(null, { data: data, err: err });
        });

      });
    });
  });
};

module.exports.commentParser = (event, context, callback) => {
  console.log(event);
  console.log("######");
  console.log(context);
  callback(null, event);
}



