const UserController = require('../controllers/User');

module.exports = app => {
  // root
  app.get('/', (req, res, next) => {
    res.send({ message: 'Welcome to the backend server for Tangle' });
  });
  // user
  app.post('/user', UserController.create);
};
