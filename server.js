// Sqreen needs to run first.
require('sqreen');

const express = require('express');
const next = require('next');
const http = require('http');
const https = require('https');
const fs = require('fs');
const wwwhisper = require('connect-wwwhisper');

const httpsPort = 3443;
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(wwwhisper());

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  if (dev) {
    const options = {
      key: fs.readFileSync('localhost.key'),
      cert: fs.readFileSync('localhost.crt'),
    };
    http.createServer(server).listen(port);
    https.createServer(options, server).listen(httpsPort);
  } else {
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});
