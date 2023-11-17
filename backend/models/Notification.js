const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // The user who performed the action
  type: String,  // 'like', 'follow', 'comment'
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // The post that was liked or commented on
  comment:String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
