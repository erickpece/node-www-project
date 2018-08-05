function authentication(req, res, next) {
  let auth = req.headers.authorization;

  if (auth !== undefined) {
    auth = auth.replace('Bearer ', '');

    // We need some default to prevent it from being wide open
    /* istanbul ignore next */
    let expected = process.env.API_TOKEN || 'password';

    // Check to see if the token matches the one provided in the environment
    if (process.env.API_TOKEN === auth) {
      return next();
    }
  }

  return res.sendStatus(401);
}

module.exports = authentication;
