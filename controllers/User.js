const User = require('../models/user');
const jwt = require('../services/jwt');
const { createToken, readToken } = jwt;
// create user
exports.create = (req, res, next) => {
  const user = req.body;
  User.create(user)
    .then(user => res.send({ token: createToken(user._id), userInfo: user }))
    .catch(next);
};

// standard sign in
exports.signIn = (req, res, next) => {
  const user = req.user;

  const token = createToken(user._id);

  res.send({
    userInfo: user,
    token,
    auth: true,
  });
};

// auto sign in
exports.tokenSignIn = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;

  User.findById(userID)
    .then(user => {
      user &&
        res.send({ auth: true, userInfo: user, token: createToken(userID) });
      !user && res.send({ auth: false });
    })
    .catch(next);
};

// delete user
exports.delete = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;

  User.findByIdAndRemove(userID)
    .then(user => {
      user && res.send({ delete: true });
      !user && res.send({ delete: false });
    })
    .catch(next);
};

// fetch user info for dashboard
exports.fetchUserInfo = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;

  User.findById(userID)
    .populate('posts')
    .populate('comments')
    .then(user => res.send({ user }))
    .catch(next);
};

// update user info
exports.update = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const { firstName, lastName, favoriteColor, favoriteAnimal } = req.body;

  User.findByIdAndUpdate(
    userID,
    {
      $set: {
        firstName,
        lastName,
        favoriteAnimal,
        favoriteColor,
      },
    },
    { new: true }
  )
    .then(user => {
      user && res.send({ update: true, user });
      !user && res.send({ update: false });
    })
    .catch(next);
};
