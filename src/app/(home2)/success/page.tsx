"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { pdf } from "@react-pdf/renderer";
import OrderInvoice from "@/components/OrderInvoice";

interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  quantity: number;
}

export default function OrderInvoicePage() {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("orderData");
    if (data) setOrder(JSON.parse(data));
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No order found
      </div>
    );
  }

  const subtotal =
    order.products?.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    ) || 0;

  const handleDownload = async () => {
    try {
      setLoading(true);

      const blob = await pdf(
        <OrderInvoice  payload={order}
  products={order.products} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `invoice-${order.trackingId}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.log("PDF generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pageColor flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white border border-gray-100 shadow-sm p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-forest-green">
            Order Confirmed 
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Info */}
        <div className="flex justify-between text-sm border-b pb-4">
          <div>
            <p className="text-gray-500">Order ID</p>
            <p className="font-semibold">{order.trackingId}</p>
          </div>

          <div className="text-right">
            <p className="text-gray-500">Date</p>
            <p className="font-semibold">
              {format(new Date(order.createdAt), "dd MMM yyyy")}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Customer</h3>
            <p>{order.user?.name}</p>
            <p>{order.user?.phone}</p>
            <p>{order.user?.address}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Payment</h3>
            <p className="capitalize">{order.paymentInfo?.method}</p>
            <p>Shipping: ৳{order.shippingCost}</p>
          </div>
        </div>

        {/* Products */}
        <div className="mt-6">
  <h3 className="font-semibold mb-3">Items</h3>

  <div className="space-y-3">
    {order.products?.map((item: CartItem) => (
      <div
        key={item.slug}
        className="border p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <Image
            src={item.image}
            alt={item.name}
            width={50}
            height={50}
            className="rounded object-cover"
          />

          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-gray-400">{item.unit}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end text-sm w-full sm:w-auto">
          <p className="text-gray-500 text-xs sm:text-sm">
            Qty: {item.quantity}
          </p>

          <p className="font-semibold text-forest-green">
            ৳{item.price * item.quantity}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Summary */}
        <div className="mt-6 border-t pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>৳{order.shippingCost}</span>
          </div>

          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span className="text-forest-green">
              ৳{order.totalAmount}
            </span>
          </div>
        </div>

        {/* Download Button */}
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 w-full cursor-pointer bg-forest-green text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <FiDownload />
          {loading ? "Generating Invoice..." : "Download Invoice"}
        </motion.button>
      </div>
    </div>
  );
}