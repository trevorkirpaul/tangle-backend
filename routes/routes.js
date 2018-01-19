const UserController = require('../controllers/User');
const PostsController = require('../controllers/Posts');
module.exports = app => {
  // root
  app.get('/', (req, res, next) => {
    res.send({ message: 'Welcome to the backend server for Tangle' });
  });
  // user
  app.post('/user', UserController.create);
  app.post('/token-signin', UserController.tokenSignIn);
  app.delete('/user', UserController.delete);
  app.put('/user', UserController.update);
  // posts
  app.post('/post', PostsController.create);
};
