const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  post: { type: Schema.Types.ObjectId, ref: 'post' },
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

const Model = mongoose.model('comment', CommentSchema);

module.exports = Model;
