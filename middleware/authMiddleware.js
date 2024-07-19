const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  
  jwt.verify(token, 'jwt_secret_nxtjob', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
