const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
const config = require('./config');
const dbUser = config.dbUser;
const app = express();

// set up mongoose
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    `mongodb://${dbUser.username}:${
      dbUser.password
    }@ds261917.mlab.com:61917/tangle`
  );
}

// set up middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

// routes
routes(app);

// error middleware
app.use((err, req, res, next) => {
  res.status(422).send({ ServerError: err.message });
});

module.exports = app;
