"use client";
import Link from "next/link";
import React, { useState } from "react";
import ProductCard from "../../shared/ProductCard";
import { Product, products } from "@/hooks/useProducts";
import { ChevronRight, LayoutGrid, LayoutList } from "lucide-react";
import { motion ,Variants} from "framer-motion";
const iconVariants: Variants = {
  initial: { x: 0 },
  hover: {
    x: 8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function FeaturedProduct() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const featured: Product[] = products.slice(0, 8);

  return (
    <section className="py-16 bg-pageColor">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-deepGreen text-sm font-medium mb-1">
              আমাদের পণ্যসমূহ
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-forest-green">
              বিশেষ পণ্য
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 border transition-colors ${
                view === "grid"
                  ? "bg-forest-green text-white border-forest-green"
                  : "border-gray-200 text-gray-500 hover:border-forest-green hover:text-forest-green"
              }`}
            >
              <LayoutGrid size={18} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-2 border transition-colors ${
                view === "list"
                  ? "bg-forest-green text-white border-forest-green"
                  : "border-gray-200 text-gray-500 hover:border-forest-green hover:text-forest-green"
              }`}
            >
              <LayoutList size={18} />
            </button>
          </div>
        </div>

        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              : "flex flex-col gap-4"
          }
        >
          {featured.map((product) => (
            <ProductCard
              key={product._id}   // ✅ FIXED
              product={product}
              view={view}
            />
          ))}
        </div>

        
        <motion.div
      className="text-center mt-12"
      initial="initial"
      whileHover="hover"
    >
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white px-8 py-3 font-semibold transition-all duration-200"
      >
        সব পণ্য দেখুন

        <motion.span variants={iconVariants}>
          <ChevronRight />
        </motion.span>
      </Link>
    </motion.div>
      </div>
    </section>
  );
}