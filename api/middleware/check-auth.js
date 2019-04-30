const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('inside check-auth');
    console.log(req.headers.authorization.split(" ")[1]);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secretKey');
        req.userData = decoded;
        console.log('calling next next');
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}