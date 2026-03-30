"use client";

import React, { useState } from "react";
import { 
  User, 
  MapPin, 
  Phone, 
  CreditCard, 
  Truck, 
  CheckCircle2,
  Wallet 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import { CartItem } from "@/hooks/cart";
interface Props {
  cartProducts: CartItem[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onClose?: () => void;
}

interface Errors {
  name?: string;
  phone?: string;
  address?: string;
  bkashNumber?: string;
  transactionId?: string;
}

export default function CartCard({ cartProducts, setCartProducts }: Props) {
  const [shippingOption, setShippingOption] = useState<"dhaka" | "outsideDhaka">("dhaka");
  const [paymentOption, setPaymentOption] = useState<"cash" | "bkash">("cash");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const shippingCost = shippingOption === "dhaka" ? 50 : 120;
  const subtotal = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    const newErrors: Errors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Mobile No is required";
    if (!address) newErrors.address = "Address is required";
    if (paymentOption === "bkash") {
      if (!bkashNumber) newErrors.bkashNumber = "Bkash Number is required";
      if (!transactionId) newErrors.transactionId = "Transaction ID is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    const orderData = {
      _id: `order_${Date.now()}`,
      trackingId: `TRK-${Date.now()}`,
      createdAt: new Date().toISOString(),
      user: { name, phone, address },
      paymentInfo: { method: paymentOption, bkashNumber, transactionId },
      shippingOption,
      shippingCost,
      products: cartProducts,
      totalAmount: total,
    };

    localStorage.setItem("orderData", JSON.stringify(orderData));
    toast.success("Order placed successfully!");
    localStorage.removeItem("ponnoBariCart");
    setCartProducts([]);
    router.push("/success");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-5 lg:p-8">
      <h2 className="text-xl font-bold text-midnight-navy flex items-center gap-2 mb-6">
        <CheckCircle2 className="text-forest-green" size={24} />
        Billing Details
      </h2>

      {/* Customer Info */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all outline-none focus:bg-white focus:ring-2 ${
              errors.name ? "border-rose-500 focus:ring-rose-200" : "border-gray-200 focus:ring-green-100 focus:border-forest-green"
            }`}
          />
          {errors.name && <p className="text-rose-500 text-xs mt-1 ml-1">{errors.name}</p>}
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all outline-none focus:bg-white focus:ring-2 ${
              errors.phone ? "border-rose-500 focus:ring-rose-200" : "border-gray-200 focus:ring-green-100 focus:border-forest-green"
            }`}
          />
          {errors.phone && <p className="text-rose-500 text-xs mt-1 ml-1">{errors.phone}</p>}
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
          <textarea
            placeholder="Full Delivery Address"
            rows={2}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setErrors((prev) => ({ ...prev, address: undefined }));
            }}
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all outline-none focus:bg-white focus:ring-2 ${
              errors.address ? "border-rose-500 focus:ring-rose-200" : "border-gray-200 focus:ring-green-100 focus:border-forest-green"
            }`}
          />
          {errors.address && <p className="text-rose-500 text-xs mt-1 ml-1">{errors.address}</p>}
        </div>
      </div>

      {/* Shipping Method */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Truck className="text-gray-500" size={18} />
          <h3 className="text-sm font-bold text-gray-700">Delivery Area</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "dhaka", label: "ঢাকা সিটি", cost: 50 },
            { id: "outsideDhaka", label: "ঢাকার বাইরে", cost: 120 }
          ].map((option) => (
            <label
              key={option.id}
              className={`relative flex flex-col items-center p-3 border rounded-2xl cursor-pointer transition-all ${
                shippingOption === option.id
                  ? "border-forest-green bg-green-50 ring-1 ring-forest-green"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="shipping"
                className="sr-only"
                checked={shippingOption === option.id}
                onChange={() => setShippingOption(option.id as any)}
              />
              <span className="text-xs font-medium">{option.label}</span>
              <span className="text-[10px] text-gray-500 mt-1">৳ {option.cost}</span>
              {shippingOption === option.id && (
                <div className="absolute top-2 right-2">
                   <div className="w-3 h-3 bg-forest-green rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full" />
                   </div>
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="text-gray-500" size={18} />
          <h3 className="text-sm font-bold text-gray-700">Payment Method</h3>
        </div>
        <div className="space-y-3">
          {[
            { id: "cash", label: "Cash on Delivery", icon: "🚚" },
            { id: "bkash", label: "bKash Payment", icon: "📱" }
          ].map((option) => (
            <label
              key={option.id}
              className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                paymentOption === option.id
                  ? "border-forest-green bg-green-50 ring-1 ring-forest-green"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              <input
                type="radio"
                name="payment"
                className="accent-forest-green h-4 w-4"
                checked={paymentOption === option.id}
                onChange={() => setPaymentOption(option.id as any)}
              />
            </label>
          ))}
        </div>

        {paymentOption === "bkash" && (
          <div className="mt-4 p-4 bg-pink-50 border border-pink-100 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-2">
            <p className="text-[11px] text-pink-700 leading-tight">
              Please send money to <strong>01XXXXXXXXX</strong> and provide details below:
            </p>
            <input
              type="text"
              placeholder="bKash Number"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              className="w-full p-2.5 bg-white border border-pink-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink-200"
            />
            <input
              type="text"
              placeholder="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-2.5 bg-white border border-pink-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
        )}
      </div>

      {/* Order Summary Summary */}
      <div className="bg-gray-50 rounded-2xl p-4 space-y-2 mb-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>৳ {subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping Fee</span>
          <span>৳ {shippingCost}</span>
        </div>
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between items-center text-lg font-extrabold text-midnight-navy">
          <span>Total</span>
          <span className="text-forest-green">৳ {total}</span>
        </div>
      </div>

     <motion.button
  onClick={handlePlaceOrder}
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="w-full cursor-pointer bg-forest-green hover:bg-emerald-800 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2 relative overflow-hidden"
>
  {/* Glow effect */}
  <motion.span
    className="absolute inset-0 bg-white/10"
    initial={{ x: "-100%" }}
    whileHover={{ x: "100%" }}
    transition={{ duration: 0.6 }}
  />

  Confirm Order
</motion.button>
      
      <p className="text-center text-[10px] text-gray-400 mt-4">
        By clicking, you agree to our Terms & Conditions
      </p>
    </div>
  );
}