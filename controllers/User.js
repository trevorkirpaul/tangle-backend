const User = require('../models/user');

// create user
exports.create = (req, res, next) => {
  const user = req.body;
  User.create(user)
    .then(user => res.send({ user }))
    .catch(next);
};
