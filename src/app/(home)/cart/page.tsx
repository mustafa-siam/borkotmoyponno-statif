"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartBreadcrumb } from "./CartBreadcrumb/CartBreadcrumb";
import CartCard from "@/components/layout/Home/Cart/CartCard/CartCard";
interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  quantity: number;
}

const cleanText = (html: string) =>
  html?.replace(/<[^>]*>?/gm, "") || "";

export default function ShopCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("ponnoBariCart");
      const parsed: CartItem[] = stored ? JSON.parse(stored) : [];

      const cleanedCart = parsed.map((item) => ({
        ...item,
        name: cleanText(item.name),
        unit: cleanText(item.unit),
      }));

      setCart(cleanedCart);
    } catch {
      setCart([]);
    }
  }, []);

  const saveCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem("ponnoBariCart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = (slug: string, delta: number) => {
    const updated = cart.map((item) =>
      item.slug === slug
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    saveCart(updated);
  };

  const remove = (slug: string) => {
    saveCart(cart.filter((item) => item.slug !== slug));
  };

  return (
    <div>
      <CartBreadcrumb />

      <main>
        <section className="py-12 bg-pageColor min-h-[60vh]">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

            <h1 className="text-2xl font-bold text-forest-green mb-8">
              আপনার কার্ট
            </h1>

            {!mounted ? null : cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-xl font-semibold text-midnight-navy mb-3">
                  কার্ট খালি আছে
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  পণ্য কার্টে যোগ করুন এবং অর্ডার দিন।
                </p>
                <Link
                  href="/shop"
                  className="inline-block bg-forest-green text-white px-8 py-3 font-medium hover:bg-deepGreen transition-colors text-sm"
                >
                  পণ্য দেখুন
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8 relative items-start">

                {/* 🛒 Left: Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.slug}
                      className="bg-white border border-gray-100 p-4 flex gap-4 hover:shadow-sm transition-shadow rounded-xl"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        className="relative w-20 h-20 flex-shrink-0 bg-gray-50 overflow-hidden rounded"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/product/${item.slug}`}
                              className="font-medium text-midnight-navy hover:text-forest-green text-sm line-clamp-2"
                            >
                              {item.name}
                            </Link>

                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.unit}
                            </p>
                          </div>

                          <button
                            onClick={() => remove(item.slug)}
                            className="text-white bg-red-500 hover:bg-red-400 p-2 rounded-full cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.slug, -1)}
                              className="w-7 h-7 border flex items-center justify-center cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>

                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQty(item.slug, 1)}
                              className="w-7 h-7 border flex items-center justify-center cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span className="font-bold text-forest-green text-sm">
                            ৳ {item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 💳 Right: Billing Card (Replaces Summary) */}
                <div className="lg:col-span-1 sticky top-24">
                  <div className="relative [&>div]:static [&>div]:max-h-none [&>div]:shadow-md [&>div]:animate-none">
                    <CartCard
                      cartProducts={cart}
                      setCartProducts={setCart}
                    />
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}