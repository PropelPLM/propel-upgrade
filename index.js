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
const PimOneTwoFiveClient = require('./lib/client/PimOneTwoFiveClient');

const ERROR_OBJ = { message: '', success: false };
const SUCCESS_OBJ = { message: 'Request received', success: true };


/**
 * routes for our node app
 */
app.get('/', (req, res) => {
  res.status(200).send('Propel Upgrade server is running.');
});

app.post('/upgrade/package/pim/1.25', (req, res) => {
  try {
    new PimOneTwoFiveClient(req, res);
    res.status(200).send(SUCCESS_OBJ);
  } catch(error) {
    ERROR_OBJ.message = error;
    res.status(400).send(ERROR_OBJ);
    console.error(ERROR_OBJ)
  }
});
