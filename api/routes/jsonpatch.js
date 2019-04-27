const express = require('express');
const router = express.Router();

// router.patch('/', (req, res, next)=>{
// 	res.status(200).json({
// 		message: "handling patch req to /jsonpatch"
// 	});
// });

router.post('/', (req, res, next)=>{
	const jsonPatch = {
		patch: req.body.patch
	};
	console.log(`patch received: ${req.body.patch}`);
	res.status(200).json({
		message: "handling patch req to /jsonpatch",
		patchedData: 'send patched data' 
	});
});

module.exports = router;