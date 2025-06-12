// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";
// import { Heart } from "lucide-react";

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddtoCart,
//   handleAddToWishlist,
// }) {
//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <div onClick={() => handleGetProductDetails(product?._id)}>

//         <div className="relative">
//           {/* Heart Button positioned on top-right of image */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering product details click
//               handleAddToWishlist(product);
//             }}
//             className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-pink-100 z-10"
//             aria-label="Add to Wishlist"
//           >
//             <Heart className="w-5 h-5 text-pink-500" />
//           </button>

//           {/* Product Image */}
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg"
//           />

//           {/* Stock Badge */}
//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Sale
//             </Badge>
//           ) : null}
//         </div>

//         {/* Product Info */}
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-[16px] text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-[16px] text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               ${product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-semibold text-primary">
//                 ${product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>

//       {/* Add to Cart Button */}
//       <CardFooter>
//         {product?.totalStock === 0 ? (
//           <Button className="w-full opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
//             className="w-full"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;
// -----------------------------------------

// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";
// import { Heart } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useToast } from "../ui/use-toast";

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddtoCart,
//   handleAddToWishlist,
//   isWishlisted = false,
//   wishlist = [],
//   isWishlistPage = false,
// }) {

//   const { toast } = useToast();

//   // Check if product is in wishlist
//   const wishlistItems = useSelector((state) => state.shopWishlist.wishlist || []);

//   const handleWishlistClick = (e) => {
//     e.stopPropagation();
//     handleAddToWishlist(product).then((result) => {
//       if (result?.type?.includes("add")) {
//         toast({ title: "Added to wishlist!" });
//       } else if (result?.type?.includes("remove")) {
//         toast({ title: "Removed from wishlist", variant: "destructive" });
//       }
//     });
//   };

//   return (
//     <Card className="w-full max-w-sm mx-auto relative">
//       {/* Wishlist Heart Button */}
//       {typeof handleAddToWishlist === "function" && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             handleAddToWishlist(product);
//           }}
//           className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-pink-100 z-10"
//           aria-label="Toggle Wishlist"
//         >
//           {isWishlistPage ? (
//             <X
//               className="w-5 h-5 text-red-500"
//               onClick={() => handleAddToWishlist(product?._id)}
//             />
//           ) : (
//           <Heart
//             className={`w-5 h-5 transition-all duration-300 transform ${
//               isWishlisted ? " fill-red-500 text-red-500 scale-110" : "text-pink-400 scale-100"
//             }`}
//           />
//           )}
//         </button>
//       )}

//       {/* Product Image & Details */}
//       <div
//         className="cursor-pointer"
//         onClick={() => handleGetProductDetails(product?._id)}
//       >
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg"
//           />

//           {/* Stock/Sale Badges */}
//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
//               {`Only ${product?.totalStock} left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
//               Sale
//             </Badge>
//           ) : null}
//         </div>

//         {/* Product Info */}
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
//             <span>{categoryOptionsMap[product?.category]}</span>
//             <span>{brandOptionsMap[product?.brand]}</span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               ${product?.price}
//             </span>
//             {product?.salePrice > 0 && (
//               <span className="text-lg font-semibold text-primary">
//                 ${product?.salePrice}
//               </span>
//             )}
//           </div>
//         </CardContent>
//       </div>

//       {/* Add to Cart */}
//       <CardFooter>
//         {product?.totalStock === 0 ? (
//           <Button className="w-full opacity-60 cursor-not-allowed" disabled>
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
//             className="w-full"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;

import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Heart, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  handleAddToWishlist,
  wishlist = [],
  isWishlistPage = false,
}) {
  const { toast } = useToast();
  const wishlistItems = useSelector((state) => state.shopWishlist.wishlist || []);

  // Determine if the product is in wishlist
  const isWishlisted = wishlistItems.some(
    (item) => item.productId === product._id
  );

  // Unified handler for wishlist toggle
  const handleWishlistClick = (e) => {
    e.stopPropagation();

    const result = handleAddToWishlist(product );

  if (result && typeof result.then === "function") {
    result.then((res) => {
      if (res?.type?.includes("add")) {
        toast({ title: "Added to wishlist!" });
      } else if (res?.type?.includes("remove")) {
        toast({ title: "Removed from wishlist", variant: "destructive" });
      }
    });
  }
};

  return (
    <Card className="w-full max-w-sm mx-auto relative">
      {/* Wishlist Button */}
      {typeof handleAddToWishlist === "function" && (
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-pink-100 z-10"
          aria-label="Toggle Wishlist"
        >
          {isWishlistPage ? (
            <X className="w-5 h-5 text-red-500" />
          ) : (
            <Heart
              className={`w-5 h-5 transition-all duration-300 transform ${
                isWishlisted
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-pink-400 scale-100"
              }`}
            />
          )}
        </button>
      )}

      {/* Product Display */}
      <div
        className="cursor-pointer"
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {/* Stock or Sale Labels */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      {/* Add to Cart */}
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;

