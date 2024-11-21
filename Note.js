//note model
const mongoose = require('Mongoose');

const noteSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
