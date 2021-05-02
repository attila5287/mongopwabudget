const path = require('path');
const helpers = require( './utils/helpers' );
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
// mongoose.set('returnOriginal', false);
const app = express();

const routes = require('./routes');
const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget_loc', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

app.listen(PORT, () => console.log('\n>> Now listening at PORT : ' + PORT));
