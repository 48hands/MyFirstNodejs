function log(req, res, next)
{
  console.log('Hello My Appplication..');
  next();
}

module.exports = log;
