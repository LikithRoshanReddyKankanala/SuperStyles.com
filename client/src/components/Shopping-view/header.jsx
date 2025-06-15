import { Search, LogOut, Menu, ShoppingCart, UserCog, Heart } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import logo from "@/assets/logo-1.png";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (
      location.pathname.includes("listing") &&
      currentFilter !== null
    ) {
      setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
    } else {
      navigate(getCurrentMenuItem.path);
    }
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { wishlist } = useSelector((state) => state.shopWishlist || {});
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Search Icon */}
      <Button
        onClick={() => navigate("/shop/search")}
        variant="outline"
        size="icon"
        className="relative bg-black"
      >
        <Search className="w-6 h-6" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Wishlist Icon */}
      <Button
        onClick={() => navigate("/wishlist")}
        variant="outline"
        size="icon"
        className="relative bg-black"
      >
        <Heart className="w-6 h-6 " />
        <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
          {wishlist?.length || 0}
        </span>
        <span className="sr-only">Wishlist</span>
      </Button>

      {/* Cart Icon */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative  bg-black"
        >
          <ShoppingCart className="w-6 h-6 " />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only ">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      {/* Avatar + Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-white w-10 h-10">
            {user?.avatar ? (
              <img
                src={`/avatars/${user.avatar}.png`}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.userName?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-black ">
      <div className="relative flex h-16 items-center text-white justify-between px-4 md:px-6 ">
        <Link
          to="/shop/home"
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2"
        >
          <img
            src={logo}
            alt="SuperStyles Logo"
            className="h-16 w-16 object-contain"
          />
          <span className="text-3xl font-extrabold tracking-tight uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[2px_2px_0_rgba(0,0,0,0.75)]">
            SuperStyles
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <Sheet className="lg:hidden bg-black">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full  max-w-xs ">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* Desktop Nav */}
        <div className=" hidden lg:block">
          <MenuItems />
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
