const { verifyJWT } = require('../auth');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid user' });

  const decoded = verifyJWT(token);
  if (!decoded) return res.status(401).json({ message: 'Invalid user' });

  req.user = decoded;
  next();
};

module.exports = authMiddleware;