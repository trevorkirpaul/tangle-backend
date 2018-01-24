const UserController = require('../controllers/User');
const PostsController = require('../controllers/Posts');
const CommentController = require('../controllers/Comments');
const passportService = require('../services/passport');
const passport = require('passport');
const reqSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  // root
  app.get('/', (req, res, next) => {
    res.send({ message: 'Welcome to the backend server for Tangle' });
  });

  // USER
  // create user
  app.post('/user', UserController.create);
  // local signin
  app.post('/user/signin', reqSignIn, UserController.signIn);
  // auto sign in
  app.post('/token-signin', UserController.tokenSignIn);
  // fetch user info, populated comments and posts
  app.post('/user/fetch', UserController.fetchUserInfo);
  // delete user
  app.delete('/user', UserController.delete);
  // update user
  app.put('/user', UserController.update);

  // POSTS
  // fetch all posts
  app.get('/post', PostsController.fetchPosts);
  // fetch one post
  app.post('/post/single', PostsController.fetchOnePost);
  // create posts
  app.post('/post', PostsController.create);
  // delete post
  app.delete('/post', PostsController.delete);
  // like post
  app.put('/post/like/add', PostsController.addLike);
  // remove like from post
  app.put('/post/like/remove', PostsController.removeLike);
  // dislike post
  app.put('/post/dislike/add', PostsController.addDisLike);
  // remove dislike from post
  app.put('/post/dislike/remove', PostsController.removeDisLike);

  // COMMENTS
  // create comment
  app.post('/comment', CommentController.create);
  // delete comment
  app.post('/comment/delete', CommentController.delete);
  // add like to comment
  app.put('/comment/like/add', CommentController.addLike);
  // remove like from comment
  app.put('/comment/like/remove', CommentController.removeLike);
  // add dislike to comment
  app.put('/comment/dislike/add', CommentController.addDisLike);
  // remove dislike from comment
  app.put('/comment/dislike/remove', CommentController.removeDisLike);
};
