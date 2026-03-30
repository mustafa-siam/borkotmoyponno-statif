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
      const slug = p.category?.slug;
      const photo = p.category?.categoryPhoto;

      if (name && !map.has(name)) {
        map.set(name, {
          name,
          slug: name, // use name for filtering
          photo,
        });
      }
    });

    return Array.from(map.values());
  }, []);

  return (
    <div className="px-4 sm:px-[5%]" id="categories">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-6 sm:py-8 flex flex-wrap justify-center gap-x-2 gap-y-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={{
                pathname: "/shop",
                query: { category: category.slug },
              }}
              className="group block p-2"
            >
              <div className="flex flex-col items-center space-y-2.5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-50 overflow-hidden border border-gray-100 group-hover:border-forest-green/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-forest-green/5">
                  <Image
                    height={112}
                    width={112}
                    src={category.photo}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-forest-green transition-colors duration-200 line-clamp-2 leading-tight text-center">
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