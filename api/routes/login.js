const express = require('express');
const router = express.Router();

router.post('/', (req, res, next)=>{
	const user = {
		username: req.body.name,
		password: req.body.password
	};
	console.log(`new user created ${req.body.name} ${req.body.password}`);
	res.status(200).json({
		message: "handling post req to /login",
		userCreated: user 
	});
});

module.exports = router;