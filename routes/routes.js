const UserController = require('../controllers/User');
const PostsController = require('../controllers/Posts');
module.exports = app => {
  // root
  app.get('/', (req, res, next) => {
    res.send({ message: 'Welcome to the backend server for Tangle' });
  });
  // create user
  app.post('/user', UserController.create);
  // auto sign in
  app.post('/token-signin', UserController.tokenSignIn);
  // delete user
  app.delete('/user', UserController.delete);
  // update user
  app.put('/user', UserController.update);
  // create posts
  app.post('/post', PostsController.create);
  // delete post
  app.delete('/post', PostsController.delete);
};
