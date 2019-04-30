exports.thumbnail = (req, res, next)=>{
	const thumbnail = {
		url: req.body.url
	};
	console.log(`url received: ${req.body.url}`);
	res.status(200).json({
		message: "handling post req to /thumbnail",
		url: 'will send image file',
		userData: req.userData 
	});
}