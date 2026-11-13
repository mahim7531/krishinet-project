const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  plantName: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('CommunityPost', communityPostSchema);