"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { CartItem } from "@/hooks/cart";

interface Props {
  cartProducts: CartItem[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function CartCard({ cartProducts, setCartProducts }: Props) {
  const [shippingOption, setShippingOption] = useState<"dhaka" | "outsideDhaka">("dhaka");
  const [paymentOption, setPaymentOption] = useState<"cash" | "bkash">("cash");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [bkashNumber, setBkashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const router = useRouter();

  const shippingCost = shippingOption === "dhaka" ? 50 : 120;
  const subtotal = cartProducts.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    const newErrors = {
      name: name ? "" : "Name is required",
      phone: phone ? "" : "Phone is required",
      address: address ? "" : "Address is required",
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone || newErrors.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    // This object matches the structure your OrderInvoicePage is looking for
    const orderData = {
      trackingId: `PB-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      user: {
        name,
        phone,
        address,
      },
      products: cartProducts, // Adding the items so the invoice can map over them
      shippingCost: shippingCost,
      totalAmount: total,
      paymentInfo: {
        method: paymentOption,
        bkashNumber: bkashNumber || "",
        transactionId: transactionId || "",
      },
    };

    // Save the complete object
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Cleanup
    localStorage.removeItem("ponnoBariCart");
    setCartProducts([]);
    
    toast.success("Order placed successfully!");
    router.push("/success");
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-5 lg:p-7 space-y-6">

      {/* HEADER */}
      <h2 className="text-lg font-semibold text-gray-800">
        Checkout Details
      </h2>

      {/* CUSTOMER */}
      <div className="space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Customer
        </p>

        {/* NAME */}
        <div>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-green-100 focus:border-forest-green outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <input
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-green-100 focus:border-forest-green outline-none"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div>
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-green-100 focus:border-forest-green outline-none"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      {/* SHIPPING */}
      <div className="space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Delivery
        </p>

        {[
          { id: "dhaka", label: "ঢাকা সিটি", cost: 50 },
          { id: "outsideDhaka", label: "ঢাকার বাইরে", cost: 120 },
        ].map((o) => (
          <div
            key={o.id}
            onClick={() => setShippingOption(o.id as any)}
            className={`flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer border transition
              ${
                shippingOption === o.id
                  ? "bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <span className="text-sm">
              {o.label} <span className="text-gray-400">৳ {o.cost}</span>
            </span>

            <input
              type="radio"
              checked={shippingOption === o.id}
              readOnly
              className="accent-forest-green cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* PAYMENT */}
      <div className="space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Payment
        </p>

        {[
          { id: "cash", label: "Cash on Delivery" },
          { id: "bkash", label: "bKash Payment" },
        ].map((o) => (
          <div
            key={o.id}
            onClick={() => setPaymentOption(o.id as any)}
            className={`flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer border transition
              ${
                paymentOption === o.id
                  ? "bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <span className="text-sm">{o.label}</span>

            <input
              type="radio"
              checked={paymentOption === o.id}
              readOnly
              className="accent-forest-green cursor-pointer"
            />
          </div>
        ))}

        {paymentOption === "bkash" && (
          <div className="mt-2 space-y-2">
            <input
              placeholder="bKash Number"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
            />
            <input
              placeholder="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
            />
          </div>
        )}
      </div>

      {/* SUMMARY */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>৳ {subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span>৳ {shippingCost}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-forest-green">৳ {total}</span>
        </div>
      </div>

      {/* BUTTON */}
      <motion.button
        onClick={handlePlaceOrder}
        whileTap={{ scale: 0.96 }}
        className="w-full cursor-pointer bg-forest-green hover:bg-emerald-800 text-white py-3 rounded-lg text-sm font-semibold transition"
      >
        Confirm Order • ৳ {total}
      </motion.button>
    </div>
  );
}