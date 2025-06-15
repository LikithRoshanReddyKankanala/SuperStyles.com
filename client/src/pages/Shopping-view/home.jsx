import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-01.jpg";
import bannerTwo from "../../assets/banner-02.jpg";
import bannerThree from "../../assets/banner-03.jpg";
import bannerFour from "../../assets/banner-3.jpg";
import bannerFive from "../../assets/banner-1.jpg";
import bannerSix from "../../assets/banner-2.jpg";
import OversizedImg from "../../assets/Category-Images/OversizedImg.jpg";
import PoloImg from "../../assets/Category-Images/PolosImg.jpg";
import SleevelessImg from "../../assets/Category-Images/Sleeveless.jpg";
import AcidWashImg from "../../assets/Category-Images/Acid Wash.jpg";
import hoodiesImg from "../../assets/Category-Images/hoodiesImg.jpg";
import GraphicprintImg from "../../assets/Category-Images/Graphicprint.jpg";
import LongsleeveImg from "../../assets/Category-Images/Longsleeve.jpg";
import SolidColorImg from "../../assets/Category-Images/SolidColor.jpg";
import henleyImg from "../../assets/Category-Images/henley.jpg";
import MarvelImg from "../../assets/Fandom-Images/Marvel.jpg";
import DCImg from "../../assets/Fandom-Images/DC-Comics.jpg";
import AnimeImg from "../../assets/Fandom-Images/Anime.jpg";
import FantasyImg from "../../assets/Fandom-Images/Fantasy.jpg";
import FanArtImg from "../../assets/Fandom-Images/Fan Art.jpg";
import VideogameImg from "../../assets/Fandom-Images/cartoon.jpg";


import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { useRef } from "react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

// Wishlist slice
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/store/shop/wishlist-slice";

const localFeatureImages = [bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix];

const categoriesWithIcon = [
  { id: "Oversized", label: "Oversized", image: OversizedImg },
  { id: "Acid Wash", label: "Acid Wash", image: AcidWashImg },
  { id: "Graphic printed", label: "Graphic printed", image: GraphicprintImg },
  { id: "Soild Colors", label: "Soild Colors", image: SolidColorImg  },
  { id: "Polo T-Shirts", label: "Polo T-Shirts", image: PoloImg },
  { id: "Sleeveless", label: "Sleeveless", image: SleevelessImg },
  { id: "Long Sleeve", label: "Long Sleeve", image: LongsleeveImg },
  { id: "Henley", label: "Henley", image: henleyImg},
  { id: "Hooded", label: "Hooded", image: hoodiesImg },
  { id: "CropTops", label: "Crop Tops", image: PoloImg },
];

const brandsWithIcon = [
  { id: "Marvel", label: "Marvel Universe", image: MarvelImg },
  { id: "DC", label: "Dc Comics", image: DCImg },
  { id: "Anime", label: "Anime Superheros", image: AnimeImg },
  { id: "Fantasy", label: "Sci-Fi & Fantasy", image: FantasyImg },
  { id: "video games", label: " Video Game Characters",image: VideogameImg },
  { id: "Fan Art", label: "Custom Fan Art", image: FanArtImg },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const wishlistItems = useSelector((state) => state.shopWishlist.items);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
   const scrollRef = useRef(null);
  

  const CategoriesSection = ({ categoriesWithIcon, handleNavigateToListingPage }) => {
 

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
   }
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleToggleWishlist = (product) => {
   const isWishlisted = Array.isArray(wishlistItems) && wishlistItems.some(
  (item) => item.productId === product._id
);

    if (isWishlisted) {
        return dispatch(removeFromWishlist({ userId: user.id, productId: product._id }));

    } else {
      console.log("Toggling wishlist for:", product);
      return dispatch(addToWishlist({ productId: product._id, userId: user.id }));
    }
  };

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    if (localFeatureImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % localFeatureImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-black min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {localFeatureImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Feature ${index}`}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + localFeatureImages.length) % localFeatureImages.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % localFeatureImages.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories */}
      {/* <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-8  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      <section className="py-12 bg-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Shop by category
        </h2>

        {/* Scroll Arrows */}
        <Button
      size="icon"
      variant="outline"
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80"
      onClick={() => {
        scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
      }}
    >
           <ChevronLeftIcon className="w-4 h-4" />
    </Button>
    <Button
      size="icon"
      variant="outline"
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80"
      onClick={() => {
        scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
      }}
    >
          <ChevronRightIcon className="w-4 h-4" />
    </Button>

        {/* ------Scrollable Categories ------*/}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2"
        >
          {categoriesWithIcon.map((categoryItem) => {
            // const Icon = categoryItem.icon;
            return (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="min-w-[250px] w-[250px] h-[320px] flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow rounded-2xl bg-white"
              >
                {/* <CardContent className="flex flex-col items-center justify-center p-6">
                  <Icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold text-center text-black">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card> */}

               <CardContent className="flex flex-col items-center justify-center p-4">
            <img
                src={categoryItem.image}
                alt={categoryItem.label}
                className="w-full h-full object-cover  rounded-2xl"
            />
        <span className="text-center font-semibold text-sm">{categoryItem.label}</span>
      </CardContent>
    </Card>
            );
          })}
        </div>
      </div>
    </section>


      {/* Fandom-- */}
      <section className="py-12 bg-black">
     <div className="container mx-auto px-4">
    <h2 className="text-4xl font-extrabold text-center mb-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
      choose your fandom
    </h2>

    <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4">
      {brandsWithIcon.map((brandItem) => (
        <Card
          key={brandItem.id}
          onClick={() => handleNavigateToListingPage(brandItem, "Universe")}
          className="min-w-[200px] w-[250px] h-[320px] flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow bg-white rounded-2xl"
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            <img
              src={brandItem.image}
              alt={brandItem.label}
              className="w-full h-full object-cover rounded-xl "
            />
            {/* <span className="text-center font-semibold text-base">{brandItem.label}</span> */}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-8  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
  New Arrivals
</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList &&
              productList.length > 0 &&
              productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToWishlist={handleToggleWishlist}
                  wishlist={wishlistItems}
                />
              ))}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;


 