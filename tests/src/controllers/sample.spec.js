const request = require('supertest');

describe('404 handler', () => {
  var server;

  beforeEach(() => {
    server = require('../../../index').server;
  });

  it('should return a 200', (done) => {
    request(server)
    .get('/')
    .expect(200)
    .expect(function (res) {
      if (res.text.indexOf('got here!') === -1) {
        throw new Error('page content does not match');
      }
    })
    .end(done);
  });

  it('should return a 200 if authenticated', (done) => {
    request(server)
    .get('/secure')
    .set('Authorization', 'Bearer loremipsum')
    .expect(200)
    .expect(function (res) {
      if (res.text.indexOf('got here!') === -1) {
        throw new Error('page content does not match');
      }
    })
    .end(done);
  });

  it('should return a 401 if not authorized', (done) => {
    request(server)
    .get('/secure')
    .expect(401)
    .end(done);
  });
});
