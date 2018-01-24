const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('../services/jwt');
const { readToken } = jwt;

exports.fetchPosts = (req, res, next) => {
  Post.find({})
    .populate('author')
    .populate('comments')
    .populate('likes')
    .populate('dislikes')
    .then(posts => res.send({ posts }))
    .catch(next);
};

exports.fetchOnePost = (req, res, next) => {
  const postID = req.body.postID;
  Post.findById(postID)
    .populate('author')
    .populate('comments')
    .then(post => res.send({ post }))
    .catch(next);
};

exports.create = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;

  const post = { body: req.body.post, title: req.body.title, author: userID };

  Post.create(post)
    .then(post =>
      User.findByIdAndUpdate(userID, { $push: { posts: post } }, { new: true })
    )
    .then(user => res.send({ posts: user.posts }))
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

exports.addLike = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const postID = req.body.postID;

  // using $addToSet prevents duplicate userIDs

  Post.findByIdAndUpdate(
    postID,
    { $addToSet: { likes: userID } },
    { new: true }
  )
    .then(post => res.send({ likedPost: true, post }))
    .catch(next);
};

exports.removeLike = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const postID = req.body.postID;

  Post.findByIdAndUpdate(postID, { $pull: { likes: userID } }, { new: true })
    .then(post => res.send({ removedLike: true, post }))
    .catch(next);
};

exports.addDisLike = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const postID = req.body.postID;

  Comment.findByIdAndUpdate(
    postID,
    { $addToSet: { dislikes: userID } },
    { new: true }
  )
    .then(post => res.send({ dislikedComment: true, post }))
    .catch(next);
};

exports.removeDisLike = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const postID = req.body.postID;

  Post.findByIdAndUpdate(postID, { $pull: { dislikes: userID } }, { new: true })
    .then(post => res.send({ removedDisLike: true, post }))
    .catch(next);
};
