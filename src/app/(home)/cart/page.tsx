"use client";

import CartTable from "@/components/layout/Home/Cart/CartTable/CartTable";
import { CartBreadcrumb } from "./CartBreadcrumb/CartBreadcrumb";
import CartCard from "@/components/layout/Home/Cart/CartCard/CartCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  quantity: number;
}
export default function ShopCart() {
 const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCart(JSON.parse(localStorage.getItem('ponnoBariCart') || '[]'));
  }, []);

  const saveCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem('ponnoBariCart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQty = (slug: string, delta: number) => {
    const updated = cart
      .map((item) =>
        item.slug === slug
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const remove = (slug: string) => {
    saveCart(cart.filter((item) => item.slug !== slug));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


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
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.slug}
                      className="bg-white border border-gray-100 p-4 flex gap-4 hover:shadow-sm transition-shadow"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        className="relative w-20 h-20 flex-shrink-0 bg-gray-50 overflow-hidden"
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
                              className="font-medium text-midnight-navy hover:text-forest-green transition-colors text-sm line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.unit}
                            </p>
                          </div>
                          <button
                            onClick={() => remove(item.slug)}
                            className="text-gray-300 hover:text-rose-red transition-colors flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.slug, -1)}
                              className="w-7 h-7 border border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-green hover:text-forest-green transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.slug, 1)}
                              className="w-7 h-7 border border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-green hover:text-forest-green transition-colors"
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

                {/* Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-100 p-6 sticky top-24">
                    <h3 className="font-bold text-midnight-navy mb-4">
                      অর্ডার সারসংক্ষেপ
                    </h3>
                    <div className="space-y-2 mb-4">
                      {cart.map((item) => (
                        <div
                          key={item.slug}
                          className="flex justify-between text-sm text-gray-600"
                        >
                          <span className="line-clamp-1 flex-1 mr-2">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="flex-shrink-0">
                            ৳ {item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-midnight-navy">
                      <span>সাব-টোটাল</span>
                      <span className="text-forest-green">৳ {total}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      + ডেলিভারি চার্জ (পণ্য পেজে নির্ধারণ করুন)
                    </p>
                    <div className="mt-4 space-y-2">
                      {cart.length > 0 && (
                        <Link
                          href={`/product/${cart[0].slug}#orderSection`}
                          className="block w-full bg-forest-green text-white text-center py-3 font-medium hover:bg-deepGreen transition-colors text-sm"
                        >
                          অর্ডার দিন →
                        </Link>
                      )}
                      <Link
                        href="/shop"
                        className="block w-full border border-forest-green text-forest-green text-center py-2.5 hover:bg-forest-green hover:text-white transition-colors text-sm"
                      >
                        কেনাকাটা চালিয়ে যান
                      </Link>
                    </div>
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
