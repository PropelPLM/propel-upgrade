/* eslint-disable no-undef */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

// app Configuration
const bodySize = '80mb';
app.use(bodyParser.json({ limit: bodySize }));
app.use(bodyParser.urlencoded({ extended: false, limit: bodySize }));
app.use(helmet.frameguard());
app.use(express.static(__dirname + '/public'));
module.exports = app.listen(process.env.PORT || 5001);

/**
 * objects used in routes
 */


/**
 * routes for our node app
 */
app.get('/', (req, res) => {
  res.status(200).send('Propel Upgrade server is running.');
});
