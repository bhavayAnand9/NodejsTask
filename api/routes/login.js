const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


router.post('/', (req, res, next)=>{
	User.findOne({username: req.body.name}).exec().then(user => {

		//user already registered before so check his credentials
		if(user) {

			bcrypt.compare(req.body.password, user.password, (err, result) => {

				//422 code is for unprocessed requests			
				//wrong credentials
				if(err) {
					return res.status(401).json({
						message: "Username already exist. Please choose another one"
					});
				}

				//username and password are correct
				if(result) {
					const token = jwt.sign(
						{
							username: user.username,
							userID: user._id
						}, 
						'secretKey',
						{
							expiresIn: "1h"
						}
					);
					return res.status(200).json({
						message: 'Auth Successful',
						token: token
					});
				}

				return res.status(200).json({
					message: 'Auth Failed..'
				});

			});
		} 

		// user is not in out database so push to our db
		else {
			password: bcrypt.hash(req.body.password, 10, (err, hash) => {
				if(err)	{
					res.status(500).json({
						error: err
					});
				} else {
					const newuser = new User({
						username: req.body.name,
						password: hash
					});
					newuser.save()
					.then(result => {
						res.status(200).json({
							message: "handling post req to /login",
							
						});
					})
					.catch(err => {
						console.error(err);
						res.status(500).json({
							error: err
						});
					});
				}
			});
		}
	})
});

module.exports = router;