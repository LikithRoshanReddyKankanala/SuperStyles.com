// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getWishlist,
//   addWishlistItem,
//   removeWishlistItem,
// } from "@/lib/wishlistapi";

// // ✅ Add item to wishlist
// export const addToWishlist = createAsyncThunk(
//   "wishlist/add",
//   async ({ userId, productId }, thunkAPI) => {
//     console.log("Thunk dispatch, product:", product);
//     await addWishlistItem({ userId, productId: product._id });
//     return { userId, productid }; // Return full product object
//   }

// );
// // ✅ Fetch wishlist for a specific user
// export const fetchWishlist = createAsyncThunk(
//   "wishlist/fetch",
//   async (userId) => {
//     const data = await getWishlist(userId);
//     return data; // Should return full product objects from backend
//   }
// );




// // ✅ Remove item from wishlist
// export const removeFromWishlist = createAsyncThunk(
//   "wishlist/remove",
//   async ({ userId, productId }) => {
//     await removeWishlistItem({ userId, productId });
//     return productId;
//   }
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: {
//     wishlist: [], // Full product objects
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     clearWishlist(state) {
//       state.wishlist = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWishlist.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.wishlist = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.isLoading = false;
//       })
//       .addCase(addToWishlist.fulfilled, (state, action) => {
//         const exists = state.wishlist.find(
//           (item) => item.product._id === action.payload.product._id
//         );
//         if (!exists) {
//           state.wishlist.push({
//              product: action.payload.product,
//              productId: action.payload.product._id,
//         }); // Push full product
//         }
//       })
//       .addCase(removeFromWishlist.fulfilled, (state, action) => {
//         state.wishlist = state.wishlist.filter(
//           (item) => item.productId !== action.payload
//         );
//       });
//   },
// });

// export const { clearWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "@/lib/wishlistapi";

// ✅ Fetch wishlist for a specific user
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (userId) => {
    const data = await getWishlist(userId);
    return data; // Should return full product objects from backend
  }
);

// ✅ Add item to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const data = await addWishlistItem({ userId, productId });
      return data; // Must return { product, productId }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Add to wishlist failed");
    }
  }
);

// ✅ Remove item from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ userId, productId }) => {
    await removeWishlistItem({ userId, productId });
    return productId; // Returning only the productId to filter it out
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [], // Full product objects or { product, productId }
    isLoading: false,
    error: null,
  },
  reducers: {
    clearWishlist(state) {
      state.wishlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ FETCH
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // ✅ ADD
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const product = action.payload?.product;
        const productId = product?._id;

        if (!productId) return;

        const exists = state.wishlist.find(
          (item) => item.productId === productId
        );
        if (!exists) {
          state.wishlist.push({
            product,
            productId,
          });
        }
      })

      // ✅ REMOVE
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (item) => item.productId !== action.payload
        );
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
