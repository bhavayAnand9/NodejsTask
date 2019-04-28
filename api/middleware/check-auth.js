const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.body.token);
        const decoded = jwt.verify(req.body.token, 'secretKey');
        req.userData = decoded;
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}