const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  author: { type: Schema.Types.ObjectId, ref: 'user' },
});

const Model = mongoose.model('post', PostSchema);

module.exports = Model;
