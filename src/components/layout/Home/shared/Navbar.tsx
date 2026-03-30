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
import { Search } from "lucide-react";
import { products } from "@/hooks/useProducts";

const Navbar = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const path = usePathname();

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.productName?.toLowerCase().includes(query) ||
      product.category?.categoryName?.toLowerCase().includes(query)
    );
  });

  const highlightText = (text: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(
      regex,
      "<span class='text-forest-green font-semibold'>$1</span>"
    );
  };

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(
        localStorage.getItem("ponnoBariCart") || "[]"
      );
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
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/carclelogo.svg"
              alt="Logo"
              width={80}
              height={80}
              className="h-9 sm:h-11 w-auto"
            />
            <span className="text-sm sm:text-lg font-semibold text-deepGreen tracking-tight">
              Borkotmoy Ponno
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex gap-8 items-center">
            <Link href="/" className={path === "/" ? active : normal}>Home</Link>
            <Link href="/shop" className={path === "/shop" ? active : normal}>Shop</Link>
            <Link href="/about" className={path === "/about" ? active : normal}>About</Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Desktop Search */}
            <div className="hidden sm:block relative">
              <Input
                className="bg-gray-50 pl-9 py-2 w-72 border border-gray-200 text-sm"
                placeholder="Search products..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />

              {search && (
                <div className="absolute top-12 right-0 w-72 bg-white shadow-xl z-50 max-h-96 overflow-y-auto border">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Link
                        key={product._id}
                        href={`/step/${product.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50"
                        onClick={() => setSearch("")}
                      >
                        <div className="w-12 h-12 relative bg-gray-100">
                          <Image
                            src={product.productImage}
                            alt={product.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4
                            className="text-sm font-medium"
                            dangerouslySetInnerHTML={{
                              __html: highlightText(product.productName),
                            }}
                          />
                          <p className="text-xs text-gray-400">
                            ৳ {product.price}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-gray-400">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search Icon */}
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

            {/* Menu */}
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

      {/* Mobile Search */}
      {isOpenSearch && (
        <div className="fixed inset-0 z-[10000] bg-white px-5 pt-6 sm:hidden">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setIsOpenSearch(false)}>
              <TiDeleteOutline className="text-2xl" />
            </button>
            <Input
              autoFocus
              placeholder="Search products..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {search && (
            <div className="max-h-[80vh] overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/step/${product.slug}`}
                    className="flex gap-3 p-3 border-b"
                    onClick={() => setIsOpenSearch(false)}
                  >
                    <div className="w-12 h-12 relative bg-gray-100">
                      <Image
                        src={product.productImage}
                        alt={product.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(product.productName),
                        }}
                      />
                      <p className="text-sm font-semibold">৳ {product.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-gray-400">No products found</div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const active =
  "text-forest-green font-medium text-sm border-b-2 border-forest-green pb-0.5";
const normal =
  "text-gray-500 hover:text-forest-green text-sm font-medium";

export default Navbar;