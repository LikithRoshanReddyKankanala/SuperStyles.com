const express = require('express');
const router = express.Router();
const Product = require('../../models/Product'); // adjust path as needed
const Wishlist = require('../../models/Wishlist'); // you'll create this

// ✅ Get wishlist items for a user (with product data)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const wishlist = await Wishlist.findOne({ userId }).populate('products'); // 'products' is an array of ObjectIds

    if (!wishlist) return res.json([]);

    const result = wishlist.products.map(product => ({
      productId: product._id,
      product,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// ✅ Add item to wishlist
router.post('/wishlist', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.status(200).json({ success: true, productId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

 

// ✅ Remove item from wishlist
router.delete('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
      await wishlist.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

module.exports = router;
