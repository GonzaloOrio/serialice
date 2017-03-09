const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
