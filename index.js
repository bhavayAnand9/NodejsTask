const express = require('express');

const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;

const loginRoute = require('./api/routes/login');
const jsonPatch = require('./api/routes/jsonpatch');
const thumbnail = require('./api/routes/thumbnail');

mongoose.connect('mongodb://localhost:27017/nodetask', {useNewUrlParser: true})
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongoose connected successfully");
});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/login', loginRoute);
app.use('/jsonpatch', jsonPatch);
app.use('/thumbnail', thumbnail);


app.use((req, res, next)=> {
	const error = new Error("Warning: Blackhole ahead, There's no coming back from there.");
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

app.listen(port, (err)=>{
	if(err)	throw err;
	else console.log(`Server listening on post ${port}`);
});
