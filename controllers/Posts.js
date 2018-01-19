const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('../services/jwt');
const { readToken } = jwt;

exports.create = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;

  const post = { ...req.body.post, author: userID };

  Post.create(post)
    .then(post =>
      User.findByIdAndUpdate(userID, { $push: { posts: post } }, { new: true })
    )
    .then(user => res.send({ user }))
    .catch(next);
};

exports.delete = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const postID = req.body.postID;

  User.findByIdAndUpdate(userID, { $pull: { posts: postID } }, { new: true })
    .then(() => Post.findByIdAndRemove(postID))
    .then(post => res.send({ postRemoved: true, post }))
    .catch(next);
};
