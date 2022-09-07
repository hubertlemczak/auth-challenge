const MY_ERRORS = {
  MISSING_BODY: 'Missing fields in request body',
  INVALID_USERNAME_PW: 'Invalid username or password',
  UNAUTHORIZED: 'User unauthorized',
};

class MyError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = { MyError, MY_ERRORS };
