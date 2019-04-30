'use strict'

const Jimp = require('jimp');

exports.thumbnail = async (req, res, next)=>{
	//extract url from body
	const imgURL = req.body.url;

	//fetch the image from URL and gets a callback with img
	Jimp.read(imgURL, function(err,img){

		//error handling if URL do not respond with an image
		if (err){
			res.status(404).json({
				message: new Error(err),
				errors: {
					errorCode: 125,
					message: 'bad data received from URL: mime type not matched'
				}
			});
			return ;
		};
		//resize image to 50x50 and convert it to base64 encoding
		img.resize(50, 50).getBase64( Jimp.AUTO , function(e,img64){
			if(e) throw e;
			//respond with image tag to preview in any API testing tool
			res.status(200).send('<img src="'+img64+'">');
		});
	});
}