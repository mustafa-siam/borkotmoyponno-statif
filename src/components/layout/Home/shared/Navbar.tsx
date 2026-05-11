"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { MdLocalGroceryStore } from "react-icons/md";
import { GrMenu } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { Search } from "lucide-react";
import { products } from "@/hooks/useProducts";

// Strip HTML tags for plain-text comparison
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

const Navbar = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { data: user } = useLoggedInUserQuery();
  const path = usePathname();

  // Search against productName (Bangla/English), slug, category, and SEO tags
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      const name = stripHtml(p.productName).toLowerCase();
      const slug = p.slug.toLowerCase();
      const category = p.category?.categoryName?.toLowerCase() ?? "";
      const tags = (p.seo?.tag ?? []).join(" ").toLowerCase();
      const tagline = stripHtml(p.tagline ?? "").toLowerCase();
      return (
        name.includes(q) ||
        slug.includes(q) ||
        category.includes(q) ||
        tags.includes(q) ||
        tagline.includes(q)
      );
    });
  }, [search]);

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
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.svg" alt="Logo" width={80} height={80} className="h-16 w-16 " />
            <span className="text-lg sm:text-xl tracking-tight font-semibold text-deepGreen">
              Khidmah Organic
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              {search.trim() && (
                <div className="absolute top-12 right-0 w-80 bg-white shadow-xl z-[10000] max-h-96 overflow-y-auto border">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product._id}
                        href={`/step/${product.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                        onClick={() => setSearch("")}
                      >
                        <div className="w-12 h-12 relative bg-gray-100 flex-shrink-0">
                          <Image
                            src={product.productImage}
                            alt={stripHtml(product.productName)}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className="text-sm text-gray-800 leading-snug line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: product.productName }}
                          />
                          <p className="text-xs text-forest-green font-semibold mt-0.5">
                            ৳ {product.price}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-400">
                      কোনো পণ্য পাওয়া যায়নি
                    </div>
                  )}
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

      {/* Mobile Search Overlay */}
      {isOpenSearch && (
        <div className="fixed inset-0 z-[10001] bg-white px-5 pt-6 sm:hidden">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => {
                setIsOpenSearch(false);
                setSearch("");
              }}
            >
              <TiDeleteOutline className="text-2xl" />
            </button>
            <Input
              autoFocus
              placeholder="পণ্য খুঁজুন... (বাংলা / English)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {search.trim() && (
            <div className="overflow-y-auto max-h-[80vh]">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    key={product._id}
                    href={`/step/${product.slug}`}
                    className="flex gap-3 p-3 border-b"
                    onClick={() => {
                      setIsOpenSearch(false);
                      setSearch("");
                    }}
                  >
                    <div className="w-12 h-12 relative bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.productImage}
                        alt={stripHtml(product.productName)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm text-gray-800 leading-snug line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: product.productName }}
                      />
                      <p className="text-sm font-semibold text-forest-green mt-0.5">
                        ৳ {product.price}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-10 text-center text-sm text-gray-400">
                  কোনো পণ্য পাওয়া যায়নি
                </div>
              )}
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