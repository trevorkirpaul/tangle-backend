const app = require('./app');

const port = 3001;

app.listen(port, () => {
  console.log(`Tangle backend server running on port: ${port}`);
});
