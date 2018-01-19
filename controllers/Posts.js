const Post = require('../models/post');
const User = require('../models/user');
// todo: replace userID with decoding JWT for userID
exports.create = (req, res, next) => {
  const userID = req.body.userID;
  const post = { ...req.body.post, author: userID };

  Post.create(post)
    .then(post =>
      User.findByIdAndUpdate(userID, { $push: { posts: post } }, { new: true })
    )
    .then(user => res.send({ user }));
};
