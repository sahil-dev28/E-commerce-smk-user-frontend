import { SelectLanguage } from "@/helper/SelectLanguage";
import { Heart, Menu, Search, ShoppingCartIcon, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import darkLogo from "./../../assets/darkLogo.png";
import lightLogo from "./../../assets/lightLogo.png";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useDebounce } from "@/utils/debounce";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SearchInput from "./SearchInput";
import useGetCartProduct from "@/hooks/product/cart/useGetCartProduct";

type Props = {
  onSearch: (value: string) => void;
};

export function Navbar({ onSearch }: Props) {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 1000);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const { data: showMeProduct } = useGetCartProduct();
  const cartProduct = showMeProduct?.products || [];

  return (
    <nav className="relative">
      {/* Announcement bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-primary text-primary-foreground text-sm">
        <SelectLanguage />
        <p className="hidden sm:block text-center flex-1">
          🔥 Limited Time Offer – Up to 30% Off on All Products
        </p>
        {!isAuthorized && (
          <Link to="/auth/register" className="flex items-center gap-1">
            <User size={18} />
            <span className="hidden sm:block">Sign In</span>
          </Link>
        )}
      </div>

      {/* Main navbar */}
      <div className="flex justify-between items-center bg-muted py-3 md:py-5">
        <div className="flex pl-4 sm:pl-5 items-center gap-4 xl:gap-10">
          <div className="flex items-center">
            {/* Hamburger */}
            <Menu
              className="xl:hidden block cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />

            {/* Mobile drawer */}
            <div
              className={`absolute top-full left-0 w-full z-50 bg-muted backdrop-blur-lg
                flex flex-col items-center text-center text-lg pb-6
                transition-all duration-300 ease-in-out
                ${isMenuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
              {/* Search in mobile menu */}
              <div className="w-full px-6 pt-4 pb-2 flex items-center gap-2 md:hidden">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <SearchInput value={searchTerm} onChange={setSearchTerm} />
              </div>

              <li className="w-full list-none p-4 cursor-pointer border-b border-border/40">
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="w-full list-none p-4 cursor-pointer border-b border-border/40">
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Men
                </NavLink>
              </li>
              <li className="w-full list-none p-4 cursor-pointer border-b border-border/40">
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Women
                </NavLink>
              </li>
              <li className="w-full list-none p-4 cursor-pointer border-b border-border/40">
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Kids
                </NavLink>
              </li>
              <li className="w-full list-none p-4 cursor-pointer">
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Sports
                </NavLink>
              </li>
            </div>

            {/* Logo */}
            <Link to="/" className="text-lg font-semibold mx-4 sm:mx-5">
              <div className="overflow-hidden hover:scale-105 transition-all">
                <img
                  src={darkLogo}
                  alt="Logo"
                  className="size-25 h-full hidden [html.dark_&]:block"
                />
                <img
                  src={lightLogo}
                  alt="Logo"
                  className="size-25 h-full hidden [html.light_&]:block"
                />
              </div>
            </Link>
          </div>

          {/* Desktop nav links */}
          <ul className="hidden xl:flex space-x-5 text-[17px]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:underline"
                }
              >
                Men
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:underline"
                }
              >
                Women
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:underline"
                }
              >
                Kids
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:underline"
                }
              >
                Sports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:underline"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:underline"
                }
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right side: search + icons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 pr-4 sm:pr-5">
          {/* Search — desktop/tablet only */}
          <div className="hidden md:flex items-center">
            <Search className="absolute m-2 w-5 h-5 text-muted-foreground" />
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Icon list — unified, single source of truth */}
          <ul className="flex gap-4 sm:gap-5 justify-center items-center">
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0">
                    <Link to="/wishlist" className="text-[12px]">
                      <Heart className="mx-auto" size={20} strokeWidth="1.5" />
                      <span className="hidden sm:block">Wishlist</span>
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0">
                    <Link to="/profile" className="text-[12px]">
                      <User className="mx-auto" size={20} strokeWidth="1.5" />
                      <span className="hidden sm:block">Profile</span>
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0 relative">
                    <Link to="/product/cart" className="text-[12px]">
                      <ShoppingCartIcon
                        className="mx-auto"
                        size={20}
                        strokeWidth="1.5"
                      />
                      {cartProduct.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                          {cartProduct.length}
                        </span>
                      )}
                      <span className="hidden sm:block">Cart</span>
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cart</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
