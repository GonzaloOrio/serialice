const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SerieSchema = new Schema({
  serieName: {
    type: String,
    required: true
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Serie = mongoose.model('Serie', SerieSchema);
module.exports = Serie;
