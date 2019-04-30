const jwt = require('jsonwebtoken');
const config = require('../../config')

exports.login = (req, res, next)=>{
	const user = {
		username: req.body.name,
		password: req.body.password
	};
	console.log(`new user created ${req.body.name} ${req.body.password}`);

	let token = jwt.sign(
		{
			username: user.username
		},
		config.secretKey,
		{
			expiresIn: '1h'
		}
	)

	res.status(200).json({
		sucess: true,
		message: "handling post req to /login",
		userCreated: user.username,
		token: token
    });
}    