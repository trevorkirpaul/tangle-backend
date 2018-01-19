const UserController = require('../controllers/User');
const PostsController = require('../controllers/Posts');
const CommentController = require('../controllers/Comments');
module.exports = app => {
  // root
  app.get('/', (req, res, next) => {
    res.send({ message: 'Welcome to the backend server for Tangle' });
  });

  // USER
  // create user
  app.post('/user', UserController.create);
  // auto sign in
  app.post('/token-signin', UserController.tokenSignIn);
  // delete user
  app.delete('/user', UserController.delete);
  // update user
  app.put('/user', UserController.update);

  // POSTS
  // create posts
  app.post('/post', PostsController.create);
  // delete post
  app.delete('/post', PostsController.delete);
  // like post
  app.put('/post/like/add', PostsController.addLike);
  // remove like from post
  app.put('/post/like/remove', PostsController.removeLike);

  // COMMENTS
  // create comment
  app.post('/comment', CommentController.create);
  // delete comment
  app.delete('/comment', CommentController.delete);
  // add like to comment
  app.put('/comment/like/add', CommentController.addLike);
  // remove like from comment
  app.put('/comment/like/remove', CommentController.removeLike);
};
