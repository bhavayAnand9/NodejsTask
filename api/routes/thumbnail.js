const express = require('express');
const router = express.Router();

// router.post('/', (req, res, next)=>{
// 	res.status(200).json({
// 		message: "handling post req to /thumbnail"
// 	});
// });


router.post('/', (req, res, next)=>{
	const thumbnail = {
		url: req.body.url
	};
	console.log(`url received: ${req.body.url}`);
	res.status(200).json({
		message: "handling post req to /thumbnail",
		url: 'will send image file' 
	});
});

module.exports = router;