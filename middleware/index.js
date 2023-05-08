const jwt = require('jsonwebtoken')
const verifyToken = async (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            return res.status(401).json({ message: 'Invalid token!' });
        }
        const token = header.split(' ');
        if (token[0] != '') {
            return res.status(401).json({ message: 'Invalid token!' });
        }
        if (!token[1]) {
            return res.status(401).json({ message: 'Invalid token!' });
        }
        const payload = await jwt.verify(token[1],'secret key');
        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.payload = payload;
        next();
    } catch (error) {
        req.payload = null;
        return res.status(401).json({ message: 'error' });
    }
};

module.exports = verifyToken;