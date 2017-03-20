const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  serieId: {
    type: String,
    required: true
  },
  isView: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const List = mongoose.model('List', ListSchema);
module.exports = List;
