function errorHandler(error, req, res, next) {
  console.log(error, 'dari error handler');
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      error: error.errors[0].message,
    });
  } else if (error.name === 'EmailRequired') {
    res.status(400).json({
      error: 'email is required',
    });
  } else if (error.name === 'PasswordRequired') {
    res.status(400).json({
      error: 'password is required',
    });
  } else if (error.name === 'OthersRequired') {
    res.status(400).json({
      error: 'others image is required',
    });
  } else if (error.name === 'InvalidEmailOrPassword') {
    res.status(401).json({
      error: 'invalid email or password',
    });
  } else if (error.name === 'InvalidToken') {
    res.status(401).json({
      error: 'please login',
    });
  } else if (error.name === 'Unauthorized' || error.name === 'JsonWebTokenError') {
    res.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'NotFound') {
    res.status(404).json({
      error: 'not found',
    });
  } else {
    res.status(500).json({
      error: 'internal server error',
    });
  }
}

module.exports = errorHandler;
