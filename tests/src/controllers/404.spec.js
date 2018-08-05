const request = require('supertest');

describe('404 handler', () => {
  var server;

  beforeEach(() => {
    server = require('../../../index').server;
  });

  it('should return a 404', (done) => {
    request(server)
      .get('/not-here')
      .expect(404)
      .end(done);
  });
});
