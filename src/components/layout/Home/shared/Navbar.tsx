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
  const products = data?.payload || [];
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
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-[9999]">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/carclelogo.svg" alt="Logo" width={80} height={80} className="h-9 sm:h-11 w-auto" />
            <span className="text-sm sm:text-lg font-semibold text-deepGreen">
              Borkotmoy Ponno
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex gap-8 items-center">
            <Link href="/" className={path === "/" ? active : normal}>Home</Link>
            <Link href="/shop" className={path === "/shop" ? active : normal}>Shop</Link>
            <Link href="/about" className={path === "/about" ? active : normal}>About</Link>
            {user && (
              <Link href="/dashboard" className={path === "/dashboard" ? active : normal}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Desktop Search */}
            <div className="hidden sm:block relative">
              <Input
                className="bg-gray-50 pl-9 py-2 w-60 focus:w-72 transition-all"
                placeholder="Search products..."
                onChange={(e) => {
                  setSearch(e.target.value);
                  refetch();
                }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              {search && products.length > 0 && (
                <div className="absolute top-12 right-0 w-80 bg-white shadow-xl z-[10000] max-h-96 overflow-y-auto border">
                  {products.map((product:any) => (
                    <Link
                      key={product._id}
                      href={`/step/${product.slug}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50"
                    >
                      <div className="w-12 h-12 relative bg-gray-100">
                        <Image src={product.productImage} alt={product.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm">{product.productName}</h4>
                        <p className="text-xs text-gray-400">৳ {product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Search */}
            <button
              className="sm:hidden p-2"
              onClick={() => {
                setShowMobileMenu(false);
                setIsOpenSearch(true);
              }}
            >
              <AiOutlineSearch className="text-xl" />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-forest-green/5 flex items-center justify-center">
                <MdLocalGroceryStore />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-forest-green text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => {
                setIsOpenSearch(false);
                setShowMobileMenu(!showMobileMenu);
              }}
              className="sm:hidden p-2"
            >
              <GrMenu className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[60px] left-0 right-0 bg-white shadow-lg sm:hidden transition-all duration-300 z-[10000] ${
          showMobileMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 space-y-2">
          <Link onClick={() => setShowMobileMenu(false)} href="/" className={mobileLink(path === "/")}>Home</Link>
          <Link onClick={() => setShowMobileMenu(false)} href="/shop" className={mobileLink(path === "/shop")}>Shop</Link>
          <Link onClick={() => setShowMobileMenu(false)} href="/about" className={mobileLink(path === "/about")}>About</Link>
          {user && (
            <Link onClick={() => setShowMobileMenu(false)} href="/dashboard" className={mobileLink(path === "/dashboard")}>
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
    

      {/* Mobile Search Overlay */}
      {isOpenSearch && (
        <div className="fixed inset-0 z-[10001] bg-white px-5 pt-6 sm:hidden">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setIsOpenSearch(false)}>
              <TiDeleteOutline className="text-2xl" />
            </button>
            <Input
              autoFocus
              placeholder="Search..."
              onChange={(e) => {
                setSearch(e.target.value);
                refetch();
              }}
            />
          </div>

          {search && products.length > 0 && (
            <div className="overflow-y-auto max-h-[80vh]">
              {products.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/step/${product.slug}`}
                  className="flex gap-3 p-3 border-b"
                  onClick={() => setIsOpenSearch(false)}
                >
                  <div className="w-12 h-12 relative bg-gray-100">
                    <Image src={product.productImage} alt={product.productName} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm">{product.productName}</h4>
                    <p className="text-sm font-semibold">৳ {product.price}</p>
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

const active = "text-forest-green font-medium text-sm border-b-2 border-forest-green pb-0.5";
const normal = "text-gray-500 hover:text-forest-green text-sm font-medium";
const mobileLink = (active: boolean) =>
  `block py-3 px-3 rounded ${
    active ? "text-forest-green bg-forest-green/5" : "text-gray-700 hover:bg-gray-50"
  }`;

export default Navbar;