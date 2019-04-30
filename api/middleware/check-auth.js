const jwt = require('jsonwebtoken');
const config = require('../../config');


module.exports = (req, res, next) => {
    console.log(req.headers.authorization.split(" ")[1]);
    try {
        console.log('a');
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.secretKey);
        req.userData = decoded;
        console.log('calling next next');
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}