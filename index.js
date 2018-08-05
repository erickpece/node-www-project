// Load the environment first!
const env = require('./src/utils/env');
env.load();

// Load the rest of the dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const log = require('sensible-logger');
const middleware = require('./src/middleware');
const morgan = require('morgan');
const routes = require('./src/routes');

const app = express();

app.use(cors());

// Configure logging
morgan.token('protocol', function getProtocol(req) {
  let proto = 'http://';

  if (req.secure) {
    proto = 'https://';
  }

  return proto;
});

morgan.token('hostname', function getHostname(req) {
  return req.hostname;
});

// Morgan request logging
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :protocol:hostname:url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
  stream: log.stream
}));

// Process JSON body
app.use(bodyParser.json());

// Routes
app.use('/', routes.sample);
app.use('/secure', middleware.authentication, routes.sample);

// 404 Handler - must be last
app.use(function (req, res, next) {
  res.sendStatus(404);
});

let server = app.listen(3000, () => {
  log.info('express server started on port 3000');
});

module.exports = {
  server
};
