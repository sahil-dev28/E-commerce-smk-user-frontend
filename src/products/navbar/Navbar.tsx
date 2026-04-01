import { SelectLanguage } from "@/helper/SelectLanguage";
import { Heart, Menu, Search, ShoppingCartIcon, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import darkLogo from "./../../assets/darkLogo.png";
import lightLogo from "./../../assets/lightLogo.png";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SearchInput from "./SearchInput";

type props = {
  onSearch: (value: string) => void;
};

export function Navbar({ onSearch }: props) {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <div className="flex items-center justify-between px-4 py-2 bg-primary text-primary-foreground text-sm">
        <SelectLanguage />
        <p className="text-center flex-1">
          🔥 Limited Time Offer – Up to 30% Off on All Products
        </p>
        {!isAuthorized && (
          <Link to="/auth/register" className="flex items-center gap-1">
            <User size={18} />
            <span className="hidden sm:block">Sign In</span>
          </Link>
        )}
      </div>
      <div className="flex justify-between items-center bg-muted py-5">
        <div className="flex pl-5 items-center gap-10">
          <div className="flex">
            <Menu
              className="xl:hidden block cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <div
              className={`absolute xl:hidden top-30 left-0 w-full backdrop-blur-lg h-screen bg-muted flex flex-col items-center text-center overflow-y-hidden gap-4 text-lg transform transition-transform ${isMenuOpen ? "flex" : "hidden"}`}
              style={{ transition: "transform 0.3 ease, opacity 0.3 ease" }}
            >
              <li className="w-full list-none p-4 cursor-pointer">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="w-full list-none p-4 cursor-pointer">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Men
                </NavLink>
              </li>
              <li className="w-full list-none p-4 cursor-pointer">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Women
                </NavLink>
              </li>
              <li className="w-full list-none p-4 cursor-pointer">
                <NavLink
                  to="/"
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
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "hover:underline"
                  }
                >
                  Sports
                </NavLink>
              </li>
            </div>
            <Link to="/" className="text-lg font-semibold mx-5">
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
        <div className="flex items-center justify-center gap-6 pr-5">
          <div className="hidden md:flex">
            <Search className="absolute m-2 w-5 h-5 text-muted-foreground" />
            <div>
              <SearchInput onSearch={onSearch} />
            </div>
          </div>
          <ul className="sm:flex hidden gap-5 justify-center items-center">
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0">
                    <Link to="/wishlist" className="text-[12px]">
                      <Heart
                        className="mx-auto"
                        size={20}
                        strokeWidth={"1.5"}
                      />
                      Wishlist
                    </Link>
                  </div>
                  <TooltipContent>
                    <p>Wishlist</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0">
                    <Link to="/profile" className="text-[12px]">
                      <User className="mx-auto" size={20} strokeWidth={"1.5"} />
                      Profile
                    </Link>
                  </div>
                  <TooltipContent>
                    <p>Profile</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0">
                    <Link to="/product/cart" className="text-[12px]">
                      <ShoppingCartIcon
                        className="mx-auto"
                        size={20}
                        strokeWidth={"1.5"}
                      />
                      Cart
                    </Link>
                  </div>
                  <TooltipContent>
                    <p>Cart</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li>
              <ModeToggle />
              {/* <ThemeToggle /> */}
            </li>
          </ul>
          <ul className="sm:hidden flex gap-5 justify-center items-center">
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0">
                    <Link to="/wishlist" className="text-[12px]">
                      <Heart
                        className="mx-auto"
                        size={20}
                        strokeWidth={"1.5"}
                      />
                      Wishlist
                    </Link>
                  </div>
                  <TooltipContent>
                    <p>Wishlist</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0">
                    <Link to="/product/cart" className="text-[12px]">
                      <ShoppingCartIcon
                        className="mx-auto"
                        size={20}
                        strokeWidth={"1.5"}
                      />
                      Cart
                    </Link>
                  </div>
                  <TooltipContent>
                    <p>Cart</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <div className="rounded-none shadow-none focus-visible:z-10 p-0">
                    <Link to="/profile" className="text-[12px]">
                      <User className="mx-auto" size={20} strokeWidth={"1.5"} />
                      Profile
                    </Link>
                  </div>
                  <TooltipContent>
                    <p>Profile</p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
