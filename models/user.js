const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    favoriteColor: {
      type: String,
    },
    favoriteAnimal: {
      type: String,
    },
    active: Boolean,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'post',
      },
    ],
  },
  { usePushEach: true }
);

// pw encrypt on save hook
UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// add method to model for comparing pw
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const Model = mongoose.model('user', UserSchema);

module.exports = Model;
