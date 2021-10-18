/** Server startup for Message.ly. */

const http2 = require('http2');
const app = require('./app');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/home/euki/Programming/SpringBoard_Projects/express-messagely/key.pem'),
  cert: fs.readFileSync('/home/euki/Programming/SpringBoard_Projects/express-messagely/cert.pem'),
  allowHTTP1: true,
};

const server = http2.createSecureServer(options, app);

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'application/json',
    status: 200,
  });
  stream.end(
    JSON.stringify({
      _data: 'http2-test',
    })
  );
});

server.listen(5001, function () {
  console.log('Listening on 5001');
});
