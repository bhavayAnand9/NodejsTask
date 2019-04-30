const express = require('express');
const config = require('./config');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//call express contructor
const app = express();

//for logging and monitoring
//stream all logs to file `access.log`
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//all express routes
const loginRoute = require('./api/routes/login');
const jsonPatch = require('./api/routes/patching');
const thumbnail = require('./api/routes/thumbnail');

app.use('/login', loginRoute);
app.use('/jsonpatch', jsonPatch);
app.use('/thumbnail', thumbnail);

app.use((req, res, next)=> {
	Errors = [
		"Error: 404 Warning: Blackhole ahead, There's no coming back from there.",
		"Error: 404 You've reached at the end of the world.",
		"Error: 404 That mouse is nibbling the wires again."
	];
	const error = new Error(Errors[Math.floor(Math.random()*Errors.length)]);
	next(error);
});

app.use((error, req, res, next) => {
	res.status(404).json({
		error: {
			message: error.message
		}
	});
});

app.listen(config.port, (err)=>{
	if(err)	throw err;
	else console.log(`Server listening on post ${config.port}`);
});

//for testing purpose
module.exports = app;