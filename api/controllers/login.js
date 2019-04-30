const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.login = (req, res, next)=>{
	//create a new user object

	const user = {
		username: req.body.name,
		password: req.body.password
	};

	//test user credentials edge cases
	if(req.body.name === undefined || req.body.password === undefined || req.body.name.trim().length === 0 || req.body.password.trim().length === 0){
		res.status(404).json({
			errors: {
				errorCode: 123,
				message: 'Auth not successful : bad credentials'
			}
		});
		return ;
	}

	//generate a jwt token using username and a secret key
	let token = jwt.sign(
		{
			username: user.username
		},
		config.secretKey,
		{
			expiresIn: '1h'
		}
	)
	//respnd with the 202 status code and username and it's jwt token
	res.status(200).json({
		sucess: true,
		userCreated: user.username,
		token: token
    });
}    