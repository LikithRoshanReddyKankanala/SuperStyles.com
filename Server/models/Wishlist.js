const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);

