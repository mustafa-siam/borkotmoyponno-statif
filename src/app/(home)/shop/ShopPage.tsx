"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ShopBreadcrumb } from "./ShopBreadcrumb/ShopBreadcrumb";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { products } from "@/hooks/useProducts";
import ProductCard from "@/components/layout/Home/shared/ProductCard";

type SortOption = 'default' | 'price-asc' | 'price-desc';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterOpen, setFilterOpen] = useState(false);

  const derivedCategories = [...new Set(
  products.map(p => p.category?.categoryName)
)].map(name => ({
  name,
  slug: name 
}));
  useEffect(() => {
  const cat = searchParams.get('category');
  if (cat) setSelectedCategory(cat);
}, [searchParams.toString()]);
  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [filterOpen]);

 const filtered = products
  .filter((p) => {
    const productCategory = p.category?.categoryName;

    if (selectedCategory !== 'all' && productCategory !== selectedCategory)
      return false;

    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;

    return true;
  })

  const reset = () => {
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('default');
  };

  return (
    <div>
      <main>
        <ShopBreadcrumb />
        <div className="bg-white border-b border-gray-100 py-6">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-forest-green">
                আমাদের পণ্যসমূহ
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {filtered.length}টি পণ্য পাওয়া গেছে
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative inline-block w-36">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm bg-white text-gray-700 shadow-sm cursor-pointer hover:border-forest-green focus:outline-none"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="price-asc">দাম: কম থেকে বেশি</option>
                  <option value="price-desc">দাম: বেশি থেকে কম</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <ChevronDown size={16}></ChevronDown>
                </div>
              </div>
              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:border-forest-green hover:text-forest-green transition-colors cursor-pointer"
              >
                <SlidersHorizontal size={15} />
                ফিল্টার
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-100">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 text-sm whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-forest-green text-white'
                  : 'border border-gray-200 text-gray-600 hover:border-forest-green hover:text-forest-green'
              }`}
            >
              সব পণ্য
            </button>
            {derivedCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-1.5 text-sm whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-forest-green text-white'
                    : 'border border-gray-200 text-gray-600 hover:border-forest-green hover:text-forest-green'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <section className="py-10 bg-pageColor">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">
                  কোনো পণ্য পাওয়া যায়নি
                </p>
                <button
                  onClick={reset}
                  className="border border-forest-green text-forest-green px-6 py-2 hover:bg-forest-green hover:text-white transition-colors text-sm"
                >
                  ফিল্টার রিসেট করুন
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setFilterOpen(false)}
          />
          <div className="relative ml-auto w-[300px] bg-white h-full overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-semibold text-midnight-navy">ফিল্টার</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <div>
                <h4 className="font-medium text-midnight-navy mb-3 text-sm">
                  ক্যাটাগরি
                </h4>
                <ul className="space-y-2">
                  <li>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === 'all'}
                        onChange={() => setSelectedCategory('all')}
                        className="accent-[#1a3c2a]"
                      />
                      <span className="text-sm text-gray-700">সব পণ্য</span>
                    </label>
                  </li>
                  {derivedCategories.map((cat) => (
                    <li key={cat.slug}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.slug}
                          onChange={() => setSelectedCategory(cat.slug)}
                          className="accent-[#1a3c2a]"
                        />
                        <span className="text-sm text-gray-700">
                          {cat.name}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-midnight-navy mb-3 text-sm">
                  মূল্য পরিসর (৳)
                </h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="সর্বনিম্ন"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 border border-gray-200 p-2 text-sm outline-none focus:border-forest-green"
                  />
                  <input
                    type="number"
                    placeholder="সর্বোচ্চ"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 border border-gray-200 p-2 text-sm outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-medium text-midnight-navy mb-3 text-sm">
                  সাজান
                </h4>
                <div className="relative inline-block w-full">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full appearance-none border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm bg-white text-gray-700 shadow-sm cursor-pointer hover:border-forest-green focus:outline-none"
                  >
                    <option value="default">ডিফল্ট</option>
                    <option value="price-asc">দাম: কম থেকে বেশি</option>
                    <option value="price-desc">দাম: বেশি থেকে কম</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                    <ChevronDown size={16}></ChevronDown>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    reset();
                    setFilterOpen(false);
                  }}
                  className="flex-1 cursor-pointer border border-gray-200 py-2 text-sm text-gray-600 hover:border-forest-green hover:text-forest-green transition-colors"
                >
                  রিসেট
                </button>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="flex-1 cursor-pointer bg-forest-green text-white py-2 text-sm hover:bg-deepGreen transition-colors"
                >
                  প্রয়োগ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 overflow-hidden animate-pulse">
      <div className="w-full h-52 sm:h-60 bg-gray-100"></div>
      <div className="p-4 sm:p-5 space-y-3">
        <div className="h-4 bg-gray-100 w-3/4"></div>
        <div className="h-4 bg-gray-100 w-1/2"></div>
        <div className="flex gap-2.5 pt-1">
          <div className="h-10 bg-gray-100 flex-1"></div>
          <div className="h-10 bg-gray-100 w-12"></div>
        </div>
      </div>
    </div>
  );
}