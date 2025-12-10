// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useToast } from "@/components/ui/use-toast";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { fetchProductDetails } from "@/store/shop/products-slice";
// import {
//   fetchWishlist,
//   removeFromWishlist,
// } from "@/store/shop/wishlist-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function WishlistPage() {
//   const dispatch = useDispatch();
//   const { toast } = useToast();


//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productDetails } = useSelector((state) => state.shopProducts);
//   const wishlistItems = useSelector((state) => state.shopWishlist.wishlist); // ✅ correct

//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

//   // Fetch wishlist when user logs in
//   useEffect(() => {
//     if (user?.id) {
//       dispatch(fetchWishlist(user.id));
//     }
//   }, [dispatch, user]);

//   // Add to cart handler
//   function handleAddtoCart(productId, totalStock) {
//     const cartItemsList = cartItems.items || [];

//     const existingItem = cartItemsList.find(
//       (item) => item.productId === productId
//     );

//     if (existingItem && existingItem.quantity + 1 > totalStock) {
//       toast({
//         title: `Only ${existingItem.quantity} quantity can be added for this item`,
//         variant: "destructive",
//       });
//       return;
//     }

//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product is added to cart",
//         });
//       }
//     });
//   }

//   // Wishlist toggle
//   function handleWishlistToggle(productId) {
//     dispatch(removeFromWishlist({ userId: user?.id, productId }))
//       .then(() => dispatch(fetchWishlist(user?.id)))
//       .then(() =>
//         toast({
//           title: "Removed from wishlist",
//         })
//       );
//   }

//   // Product detail dialog
//   function handleGetProductDetails(productId) {
//     dispatch(fetchProductDetails(productId));
//   }

//   useEffect(() => {
//     if (productDetails !== null) {
//       setOpenDetailsDialog(true);
//     }
//   }, [productDetails]);

//   return (
//     <div className="container mx-auto md:px-6 px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

//       {wishlistItems.length === 0 ? (
//         <p className="text-muted-foreground text-lg">Your wishlist is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {wishlistItems.map((item) =>
//             item?.product ? (
//               <ShoppingProductTile
//                 key={item.productId}
//                 product={item.product}
//                 handleAddtoCart={handleAddtoCart}
//                 handleAddToWishlist={() => handleWishlistToggle(item.product)}
//                 wishlist={wishlistItems}
//                 handleGetProductDetails={handleGetProductDetails}
//               />
//             ) : null
//           )}
//         </div>
//       )}

//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default WishlistPage;


import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  fetchWishlist,
  removeFromWishlist,
} from "@/store/shop/wishlist-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react"; // ✖️ icon
import Header from "@/components/Shopping-view/Header";

function WishlistPage() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { wishlist } = useSelector((state) => state.shopWishlist);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user]);

  function handleAddtoCart(productId, totalStock) {
    const cartItemsList = cartItems.items || [];

    const existingItem = cartItemsList.find(
      (item) => item.productId === productId
    );

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existingItem.quantity} quantity can be added for this item`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleWishlistRemove(productId) {
    dispatch(removeFromWishlist({ userId: user?.id, productId }))
      .then(() => dispatch(fetchWishlist(user?.id)))
      .then(() =>
        toast({
          title: "Removed from wishlist",
        })
      );
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      < Header />
      {/* ✅ Header */}
      <header className="mb-8 w-full ">
        <h1 className="text-3xl font-bold text-primary">Your Wishlist</h1>
      </header>

      {wishlist.length === 0 ? (
        <p className="text-muted-foreground text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map((item) => (
            <div key={item.productId} className="relative">
              {/* ✖️ X button instead of heart */}
              <button
                onClick={() => handleWishlistRemove(item.productId)}
                className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-red-100 z-10"
                aria-label="Remove from Wishlist"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>

              <ShoppingProductTile
                product={item.product}
                handleAddtoCart={handleAddtoCart}
                wishlist={wishlist}
                handleGetProductDetails={handleGetProductDetails}
                // Do not pass handleAddToWishlist to avoid double icon
              />
            </div>
          ))}
        </div>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default WishlistPage;
