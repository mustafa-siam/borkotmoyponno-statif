"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdLocalGroceryStore } from "react-icons/md";
import { GrMenu } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { Search } from "lucide-react";

interface IData {
  _id: string;
  slug: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}

const Navbar = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { data, refetch } = useHandleFindProductQuery({
    page: 1,
    limit: 10000,
    search,
  });

  const { data: user } = useLoggedInUserQuery();
  const products: IData[] = data?.payload || [];
  const path = usePathname();

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("ponnoBariCart") || "[]");
      setCartCount(storedCart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-[9999]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo — always on the left */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/carclelogo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="h-9 sm:h-11 w-auto"
          />
          <span className="text-sm sm:text-lg font-semibold text-deepGreen tracking-tight">Borkotmoy Ponno</span>
        </Link>

        {/* Nav Links - Desktop only (center) */}
        <div className="hidden sm:flex gap-8 items-center">
          <Link href="/" className={path === "/" ? "text-forest-green font-medium text-sm border-b-2 border-forest-green pb-0.5" : "text-gray-500 hover:text-forest-green text-sm font-medium transition-colors duration-200"}>Home</Link>
          <Link href="/shop" className={path === "/shop" ? "text-forest-green font-medium text-sm border-b-2 border-forest-green pb-0.5" : "text-gray-500 hover:text-forest-green text-sm font-medium transition-colors duration-200"}>Shop</Link>
          <Link href="/about" className={path === "/about" ? "text-forest-green font-medium text-sm border-b-2 border-forest-green pb-0.5" : "text-gray-500 hover:text-forest-green text-sm font-medium transition-colors duration-200"}>About</Link>
          {user && (
            <Link href="/dashboard" className={path === "/dashboard" ? "text-forest-green font-medium text-sm border-b-2 border-forest-green pb-0.5" : "text-gray-500 hover:text-forest-green text-sm font-medium transition-colors duration-200"}>Dashboard</Link>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Search */}
          <div className="hidden sm:block relative">
            <Input
              className="bg-gray-50 text-midnight-navy pl-9 py-2 w-56 border border-gray-200 placeholder:text-gray-400 text-sm focus:w-72 focus:border-forest-green/30 transition-all duration-300"
              placeholder="Search products..."
              onChange={(e) => {
                setSearch(e.target.value);
                refetch();
              }}
            />
            <Search className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            {search && products.length > 0 && (
              <div className="absolute top-12 right-0 w-80 bg-white text-midnight-navy shadow-2xl shadow-black/10 z-50 max-h-96 overflow-y-auto border border-gray-100">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/step/${product.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="w-12 h-12 relative overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.productImage}
                        alt={product.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4
                        className="text-sm font-medium text-midnight-navy"
                        dangerouslySetInnerHTML={{ __html: product.productName }}
                      />
                      <p className="text-xs text-gray-400 mt-0.5">৳ {product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Search Icon */}
          <button
            className="sm:hidden p-2 text-midnight-navy"
            onClick={() => {
              setShowMobileMenu(false);
              setIsOpenSearch(true);
            }}
          >
            <AiOutlineSearch className="text-xl" />
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-forest-green/5 text-forest-green flex items-center justify-center transition-all duration-200 hover:bg-forest-green hover:text-white">
              <MdLocalGroceryStore className="text-lg" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-forest-green text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger — right side */}
          <button
            onClick={() => {
              setIsOpenSearch(false);
              setShowMobileMenu(!showMobileMenu);
            }}
            className="sm:hidden p-2 text-midnight-navy"
          >
            <GrMenu className="text-xl" />
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Top Dropdown Menu */}
      <div
        className={`fixed top-[60px] left-0 right-0 w-full bg-white shadow-lg sm:hidden transition-all duration-300 ease-in-out z-[9998] origin-top ${
          showMobileMenu
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        }`}
        style={{
          transform: showMobileMenu ? "scaleY(1)" : "scaleY(0.95)",
          transformOrigin: "top",
        }}
      >
        <div className="px-5 py-4 space-y-1">
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/"
            className={`block py-3 px-3 font-medium rounded transition-colors ${
              path === "/"
                ? "text-forest-green bg-forest-green/5"
                : "text-midnight-navy hover:bg-gray-50"
            }`}
          >
            Home
          </Link>
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/shop"
            className={`block py-3 px-3 font-medium rounded transition-colors ${
              path === "/shop"
                ? "text-forest-green bg-forest-green/5"
                : "text-midnight-navy hover:bg-gray-50"
            }`}
          >
            Shop
          </Link>
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/about"
            className={`block py-3 px-3 font-medium rounded transition-colors ${
              path === "/about"
                ? "text-forest-green bg-forest-green/5"
                : "text-midnight-navy hover:bg-gray-50"
            }`}
          >
            About
          </Link>
          {user && (
            <Link
              onClick={() => setShowMobileMenu(false)}
              href="/dashboard"
              className={`block py-3 px-3 font-medium rounded transition-colors ${
                path === "/dashboard"
                  ? "text-forest-green bg-forest-green/5"
                  : "text-midnight-navy hover:bg-gray-50"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Overlay Backdrop for Mobile Menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-[9997] sm:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Search Overlay */}
      {isOpenSearch && (
        <div className="fixed inset-0 z-[10000] bg-white px-5 pt-6 sm:hidden">
          <div className="flex items-center gap-3 mb-4">
            <button
              className="text-gray-400 hover:text-midnight-navy text-2xl transition-colors"
              onClick={() => setIsOpenSearch(false)}
            >
              <TiDeleteOutline />
            </button>
            <Input
              autoFocus
              className="bg-gray-50 text-midnight-navy w-full py-3 px-4 border border-gray-200 placeholder:text-gray-400"
              placeholder="Search products..."
              onChange={(e) => {
                setSearch(e.target.value);
                refetch();
              }}
            />
          </div>
          {search && products.length > 0 && (
            <div className="space-y-1 max-h-[calc(100vh-100px)] overflow-y-auto">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/step/${product.slug}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpenSearch(false)}
                >
                  <div className="w-12 h-12 relative overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={product.productImage}
                      alt={product.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-medium text-midnight-navy"
                      dangerouslySetInnerHTML={{ __html: product.productName }}
                    />
                    <p className="text-xs text-gray-400 mt-0.5">৳ {product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
