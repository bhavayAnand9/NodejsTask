'use strict'

const jsonpatch = require('jsonpatch');

exports.jsonpatch = (req, res, next)=>{

	//extract patch JSON and data JSON from request body object
	const jsonPatch = {
		patch: req.body.patch,
		JSONdata: req.body.JSONdata
	};

	//patch should always be an array
	if(jsonPatch.patch.constructor !== Array){
		res.status(404).json({
			errors: {
				errorCode: 124,
				message: 'bad data received: patch should be an array'
			}
		});
		return ;
	}

	//apply patch to JSONdata
	const patchedDATA = jsonpatch.apply_patch(jsonPatch.JSONdata, jsonPatch.patch);

	//respond back with 200 status code and patched data 
	res.status(200).json({
		patchedData: patchedDATA
	});
}