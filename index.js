const express = require('express');

const app = express();

const config = require('./config');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;

const loginRoute = require('./api/routes/login');
const jsonPatch = require('./api/routes/jsonpatch');
const thumbnail = require('./api/routes/thumbnail');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

app.listen(config.port, (err)=>{
	if(err)	throw err;
	else console.log(`Server listening on post ${config.port}`);
});
