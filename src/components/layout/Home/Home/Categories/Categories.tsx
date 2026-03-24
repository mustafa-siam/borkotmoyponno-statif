"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/hooks/useCategory";

export default function Categories() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-deepGreen text-sm font-medium mb-1">
            আমাদের বিভাগসমূহ
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-forest-green">
            পণ্যের ধরন
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center gap-1"
            >
              {/* Box */}
              <div className="w-14 sm:w-28 h-14 sm:h-28 relative flex items-center justify-center rounded-md bg-mint-background border border-gray-100 group-hover:border-deepGreen transition-colors">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs sm:text-lg text-midnight-navy group-hover:text-forest-green text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}