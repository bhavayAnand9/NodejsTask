exports.jsonpatch = (req, res, next)=>{
	console.log('abcdefgh');
	const jsonPatch = {
		patch: req.body.patch
	};
	console.log(`patch received: ${req.body.patch}`);
	res.status(200).json({
		message: "handling patch req to /jsonpatch",
		patchedData: 'send patched data',
		userData: req.userData,
		receivedData: req.body.patch
	});
}