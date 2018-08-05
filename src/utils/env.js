const dotenv = require('dotenv');

function load() {
  // Load from .env if running in development
  switch (process.env.NODE_ENV) {
    case 'development':
      dotenv.config();
      break;
    case 'test':
      dotenv.config({
        path: './.env-test'
      });
  }
}

module.exports = {
  load
};
