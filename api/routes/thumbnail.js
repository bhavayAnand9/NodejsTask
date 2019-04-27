const express = require('express');
const router = express.Router();

router.post('/', (req, res, next)=>{
	res.status(200).json({
		message: "handling post req to /thumbnail"
	});
});

module.exports = router;