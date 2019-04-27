const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/', (req, res, next)=>{
	const newuser = new User({
		username: req.body.name,
		password: req.body.password
	});
	
	newuser.save()
	.then(result => {
		console.log(result);
		console.log(`new user created ${req.body.name} ${req.body.password}`);
		res.status(200).json({
			message: "handling post req to /login",
			userCreated: newuser 
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;