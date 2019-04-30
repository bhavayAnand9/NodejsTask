const Jimp = require('jimp');
const nodefetch = require('node-fetch');

exports.thumbnail = async (req, res, next)=>{
	const imgURL = req.body.url;

	Jimp.read(imgURL, function(err,img){
		if (err) throw err;
		img.resize(50, 50).getBase64( Jimp.AUTO , function(e,img64){
			if(e)throw e
			res.status(200).send('<img src="'+img64+'">');
		});
	});
}