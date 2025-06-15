import axios from 'axios';

// Make sure this matches the Express mount path: /api/shop/wishlist
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/shop/wishlist`;

// ✅ Get all wishlist items
export const getWishlist = async (userId) => {
  const res = await axios.get(API_BASE_URL, {
    params: { userId },
  });
  return res.data;
};

// ✅ Add item to wishlist
export const addWishlistItem = async ({ userId, productId }) => {
  const res = await axios.post(API_BASE_URL, { userId, productId });
  return res.data;
};

// ✅ Remove item from wishlist
export const removeWishlistItem = async ({ userId, productId }) => {
  const res = await axios.delete(API_BASE_URL, {
    data: { userId, productid },
  });
  return res.data;
};
