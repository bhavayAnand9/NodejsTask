const jwt = require('jsonwebtoken');
const config = require('../../config');

//An express middleware to validate jwt token
module.exports = (req, res, next) => {

    if(config.env === 'test'){
        next();
        return ;
    }

    try {
        // console.log(req.headers.authorization.split(' ')[1]);
        //splits 'Bearer' from token
        const token = req.headers.authorization.split(' ')[1];
        //verify received token
        const decoded = jwt.verify(token, config.secretKey);
        req.userData = decoded;
        //trasfer control to next middlware if everything goes right
        next();
    } catch(error) {
        console.error(error);
        return res.status(401).json({
            message: 'Auth failed..'
        });
    }
}