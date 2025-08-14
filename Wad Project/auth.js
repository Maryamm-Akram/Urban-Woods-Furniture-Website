const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
         {
            return res.status(401).json({ error: 'Token missing.' });
        }

    // Verify the token and attach the payload to `req.user`
    const decoded = jwt.verify(token, '1234_KEY');

    req.user = decoded; // Contains userId and role from token payload
    
    next();
  } 
  catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;