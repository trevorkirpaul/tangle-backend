const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('../services/jwt');
const { readToken } = jwt;

exports.create = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const postID = req.body.postID;

  const comment = {
    ...req.body.comment,
    author: userID,
    post: postID,
  };

  Comment.create(comment)
    .then(comments => {
      const addToPost = Post.findByIdAndUpdate(postID, { $push: { comments } });
      const addToUser = User.findByIdAndUpdate(userID, { $push: { comments } });

      Promise.all([addToPost, addToUser])
        .then(comments => res.send({ comment }))
        .catch(next);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const commentID = req.body.commentID;
  //check if user from token exists
  User.findById(userID).then(user => {
    if (user) {
      Comment.findByIdAndRemove(commentID)
        .then(comment => {
          // after we delete comment, grab author and post objectIDs
          const postID = comment.post;
          const userID = comment.author;
          const commentID = comment._id;
          // create variables to remove comment from respective post and user
          const removeFromPost = Post.findByIdAndUpdate(postID, {
            $pull: { comments: commentID },
          });
          const removeFromUser = User.findByIdAndUpdate(userID, {
            $pull: { comments: commentID },
          });
          // execute removal
          Promise.all([removeFromPost, removeFromUser])
            .then(() => res.send({ commentDeleted: true }))
            .catch(next);
        })
        .catch(next);
    } else {
      res.send({ error: 'user not found' });
    }
  });
};

exports.addLike = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const commentID = req.body.commentID;

  Comment.findByIdAndUpdate(
    commentID,
    { $addToSet: { likes: userID } },
    { new: true }
  )
    .then(comment => res.send({ likedComment: true, comment }))
    .catch(next);
};

exports.removeLike = (req, res, next) => {
  const token = readToken(req.body.token);
  const userID = token.userID;
  const commentID = req.body.commentID;

  Comment.findByIdAndUpdate(
    commentID,
    { $pull: { likes: userID } },
    { new: true }
  )
    .then(comment => res.send({ removedLike: true, comment }))
    .catch(next);
};
