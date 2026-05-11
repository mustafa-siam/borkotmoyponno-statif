"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/hooks/useProducts";
import { useMemo } from "react";

interface Category {
  name: string;
  slug: string;
  photo: string;
}

export default function Categories() {
  const categories: Category[] = useMemo(() => {
    const map = new Map<string, Category>();

    products.forEach((p) => {
      const name = p.category?.categoryName;
      const photo = p.category?.categoryPhoto;

      if (name && !map.has(name)) {
        map.set(name, {
          name,
          slug: name, 
          photo,
        });
      }
    });

    // প্রথম ৬টি ক্যাটাগরি নিচ্ছি
    return Array.from(map.values()).slice(0, 6);
  }, []);

  return (
    <div className="px-4 sm:px-[5%]" id="categories">
      <div className="max-w-screen-xl mx-auto">
        {/* গ্রিড কলাম মোবাইলে ৩টি এবং বড় স্ক্রিনে ৬টি */}
        <div className="py-6 sm:py-8 grid grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={{
                pathname: "/shop",
                query: { category: category.slug },
              }}
              /* 
                ইন্ডেক্স ৩ এর বেশি হলে (অর্থাৎ ৪র্থ, ৫ম, ৬ষ্ঠ ক্যাটাগরি) 
                মোবাইলে hidden থাকবে এবং বড় স্ক্রিনে block হয়ে যাবে।
              */
              className={`group block ${index >= 3 ? "hidden lg:block" : "block"}`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="relative aspect-square w-full bg-gray-50 overflow-hidden border border-gray-100 group-hover:border-forest-green/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-forest-green/5">
                  <Image
                    fill
                    src={category.photo}
                    alt={category.name}
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-forest-green transition-colors duration-200 line-clamp-1 text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}