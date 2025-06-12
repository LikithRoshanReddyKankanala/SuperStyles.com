import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.query;

    const wishlistItems = await Wishlist.find({ userId }).populate("productId");
    const formatted = wishlistItems.map((item) => ({
      productId: item.productId._id,
      product: item.productId,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error });
  }
};

export const addWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const exists = await Wishlist.findOne({ userId, productId });
    if (exists) return res.status(400).json({ message: "Item already in wishlist" });

    const newItem = new Wishlist({ userId, productId });
    await newItem.save();

    res.status(201).json({ message: "Added to wishlist", productId });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to wishlist", error });
  }
};

export const removeWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await Wishlist.findOneAndDelete({ userId, productId });

    res.json({ message: "Removed from wishlist", productId });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from wishlist", error });
  }
};
