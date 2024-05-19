const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send('no token provided.');

    jwt.verify(token, 'supersecret', (err, decoded) => {
        if (err) 
        return res.status(500).send('failed to authenticate token.');
        req.userId = decoded.id;
        next();
    });
};
