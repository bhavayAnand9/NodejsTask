const jsonpatch = require('jsonpatch');

exports.jsonpatch = (req, res, next)=>{

	const jsonPatch = {
		patch: req.body.patch,
		JSONdata: req.body.JSONdata
	};

	const patchedDATA = jsonpatch.apply_patch(jsonPatch.JSONdata, jsonPatch.patch)

	res.status(200).json({
		message: "handling patch req to /jsonpatch",
		patchedData: patchedDATA
	});
}