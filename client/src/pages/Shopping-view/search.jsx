import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "@/store/shop/wishlist-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { wishlist } = useSelector((state) => state.shopWishlist);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchWishlist(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    const trimmed = keyword.trim();
    if (trimmed !== "" && trimmed.length > 3) {
      const timer = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${trimmed}`));
        dispatch(getSearchResults(trimmed));
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch]);

  function handleAddToCart(productId, totalStock) {
    const cartList = cartItems.items || [];

    const existing = cartList.find((item) => item.productId === productId);
    if (existing && existing.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existing.quantity} quantity can be added for this item`,
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
        toast({ title: "Product is added to cart" });
      }
    });
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  function handleWishlistToggle(productId) {
    const exists = wishlist?.some((item) => item.productId === productId);

    const action = exists
      ? removeFromWishlist({ userId: user?.id, productId })
      : addToWishlist({ userId: user?.id, productId });

    dispatch(action).then(() => {
      dispatch(fetchWishlist(user?.id));
      toast({
        title: exists
          ? "Product removed from wishlist"
          : "Product added to wishlist",
      });
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>

      {!searchResults.length && keyword.length > 3 && (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            key={item.id}
            product={item}
            handleAddtoCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
            handleWishlistToggle={handleWishlistToggle}
            isWishlisted={wishlist?.some(
              (wishItem) => wishItem.productId === item.id
            )}
          />
        ))}
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
