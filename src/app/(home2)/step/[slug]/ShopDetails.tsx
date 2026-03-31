"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { FaArrowRightLong, FaFacebookF } from "react-icons/fa6";
import { FaMinus, FaPlus, FaWhatsapp } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Footer from "@/components/layout/Home/shared/Footer";
import Navbar from "@/components/layout/Home/shared/Navbar";
import {
  useHandleFindProductQuery,
  useHandleFindSingleProductQuery,
} from "@/redux/features/product/productApi";
import ProductCard from "@/components/layout/Home/shared/ProductCard";
import { useHandleFIndReviewsByProductQuery } from "@/redux/features/review/reviewApi";
import { useHandleAddOrderMutation } from "@/redux/features/order/orderApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react";
import { Product, products, Variant } from "@/hooks/useProducts";
import { reviews } from "@/hooks/useReviews";

type ShippingOption = "dhakaCity" | "dhakaCityOuter" | "outsideDhaka";
type PaymentOption = "cash" | "bkash";

interface FormData {
  name: string;
  phone: string;
  address: string;
  shipping: ShippingOption;
  payment: PaymentOption;
  bkashTransactionId?: string; // Optional for bkash payment
  bkashPhone?: string; // Optional for bkash payment
  cashPaymentMessage?: string; // Optional for cash payment
}

const ShopDetails = ({ slug }: { slug: string }) => {
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
 
  const router = useRouter();
 
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { shipping: "dhakaCity", payment: "cash" },
  });
 
  const paymentMethod = watch("payment");
 
  // ── Find product from static data ──────────────────────────────────────────
  const productData = products.find((p) => p.slug === slug) ?? products[0];
 
  const {
    _id,
    productName,
    tagline,
    unit,
    shipping,
    prvPrice,
    category,
    price,
    productImage,
    hadith,
    benefits,
    buyingReason,
    productType,
    variants,
  } = productData;
 
  // ── Variant init ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (productType === "variant" && variants?.length > 0) {
      setSelectedVariant(variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [productType, variants]);
 
  const displayPrice = selectedVariant ? selectedVariant.price : price;
  const displayImage = selectedVariant ? selectedVariant.image : productImage;
 
  // ── Related products (same category, excluding current) ───────────────────
  const allData = products.filter(
    (p) => p.category._id === category._id && p.slug !== slug
  );
 
  // ── Shipping costs ─────────────────────────────────────────────────────────
  const shippingCost: Record<ShippingOption, number> = {
    dhakaCity: shipping?.dhakaCity ?? 0,
    dhakaCityOuter: shipping?.dhakaCityOuter ?? 0,
    outsideDhaka: shipping?.outsideDhaka ?? 0,
  };
 
  const selectedShipping = watch("shipping", "dhakaCity");
  const subTotal = (displayPrice || 0) * quantity;
  const total = (displayPrice || 0) * quantity + shippingCost[selectedShipping];
 
  // ── Submit ─────────────────────────────────────────────────────────────────
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (productType === "variant" && !selectedVariant) {
        toast.error("Please select a variant");
        return;
      }
 
      setPlaceOrderLoading(true);
 
      const payload = {
        user: { name: data.name, phone: data.phone, address: data.address },
        products: [
          {
            product: _id,
            quantity,
            ...(selectedVariant && {
              variant: {
                name: selectedVariant.name,
                price: selectedVariant.price,
                image: selectedVariant.image,
              },
            }),
          },
        ],
        paymentInfo: {
          method: data.payment,
          bkashPhone: data.bkashPhone,
          bkashTransactionId: data.bkashTransactionId,
          cashPaymentMessage: data.cashPaymentMessage,
        },
        shippingArea: data.shipping,
      };
 
      // Simulate order placement with static data
      await new Promise((res) => setTimeout(res, 800));
      localStorage.setItem(
  "orderData",
  JSON.stringify({
    ...payload,
    products: [
      {
        slug: _id,
        name: selectedVariant ? selectedVariant.name : productName,
        price: selectedVariant ? selectedVariant.price : displayPrice,
        image: selectedVariant ? selectedVariant.image : displayImage,
        unit: selectedVariant ? selectedVariant.name : "pcs",
        quantity,
      },
    ],
    trackingId: "ORD-" + Date.now(),
    createdAt: new Date().toISOString(),
    totalAmount: total,
    shippingCost:
      data.shipping === "dhakaCity"
        ? shipping?.dhakaCity
        : data.shipping === "dhakaCityOuter"
        ? shipping?.dhakaCityOuter
        : shipping?.outsideDhaka,
  })
);
      router.push(`/success`);
      toast.success("Order Placed Successfully!");
 
      reset({
        name: "",
        phone: "",
        address: "",
        shipping: "dhakaCity",
        payment: "cash",
      });
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setPlaceOrderLoading(false);
    }
  };
 
  return (
    <>
      <Navbar />
      <div
        className="bg-warm-ivory text-midnight-navy min-h-screen scroll-smooth"
        style={{ fontFamily: "SolaimanLipi" }}
      >
        <div className="px-[5%]">
          <div className="max-w-screen-xl mx-auto font-anek_bangla md:pt-10 pt-0">
 
            {/* ── Tagline ── */}
            <div className="bg-white rounded-lg">
              <h1
                className="py-10 sm:pt-16 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-deepGreen leading-8 sm:leading-12 max-w-5/6 sm:max-w-2/3 mx-auto"
                dangerouslySetInnerHTML={{ __html: tagline }}
              />
            </div>
 
            <Link
              href="#orderSection"
              className="relative flex items-center justify-center gap-2 mx-auto my-3 bg-[#FFa800] text-[#0E243A] text-2xl font-bold py-2 px-4 cursor-pointer text-center w-fit mb-5 overflow-hidden"
            >
              অর্ডার করতে চাই
            </Link>
 
            {/* ── Product Header Banner ── */}
            <div className="bg-deepGreen py-10 text-center space-y-3 rounded-lg">
              <p
                id="order-form"
                className="text-2xl space-y-2 gap-2 sm:text-3xl lg:text-4xl font-bold text-white text-center py-2 max-w-72 sm:max-w-lg lg:max-w-full leading-relaxed mx-auto"
              >
                <span dangerouslySetInnerHTML={{ __html: productName }} />
              </p>
              <h1
                className="text-xl sm:text-2xl lg:text-3xl font-medium text-white"
                dangerouslySetInnerHTML={{ __html: unit }}
              />
              {productType === "variant" && selectedVariant?.prvPrice ? (
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                  পূর্বের মূল্য : ৳{" "}
                  <span className="line-through">{selectedVariant.prvPrice}</span>টাকা
                </h1>
              ) : prvPrice ? (
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                  পূর্বের মূল্য : ৳{" "}
                  <span className="line-through">{prvPrice}</span>টাকা
                </h1>
              ) : null}
             <div className="flex flex-col justify-center items-center sm:flex-row sm:items-center gap-5 mt-5">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
    বর্তমান মূল্য :{" "}
    <span className="bg-[#FFA800] text-black px-4">
      ৳ {displayPrice} টাকা
    </span>
  </h1>

  {(productType === "variant"
    ? (selectedVariant?.prvPrice ?? 0) > displayPrice
    : prvPrice > displayPrice) && (
    <span className="bg-green-500 text-white text-sm sm:text-base px-3 py-1 rounded-full w-fit">
      Save ৳
      {(
        (productType === "variant"
          ? selectedVariant?.prvPrice ?? 0
          : prvPrice ?? 0) - displayPrice
      ).toLocaleString()}
    </span>
  )}
</div>
            </div>
 
            {/* ── Order Form ── */}
            <div className="relative">
              <div className="absolute w-full flex flex-col items-center pt-10 h-[350px] bg-[#E4E9E6] rounded-lg">
                <a
                  href="tel:01342106348"
                  className="text-xl sm:text-2xl font-medium text-white cursor-pointer block text-center bg-deepGreen px-5 py-2 rounded"
                >
                  প্রয়োজনে কল করুন: 01342106348
                </a>
                <div className="flex flex-col items-center lg:flex-row gap-1 text-center px-5 text-xl sm:text-2xl text-wrap mt-4">
                  <p className="flex">
                    "<span dangerouslySetInnerHTML={{ __html: productName }} className="text-[#D61355]" />"
                  </p>
                  <p> নিতে নিচের ফর্মটি পূরণ করুন এবং অর্ডার নিশ্চিত করুন</p>
                </div>
              </div>
 
              <form
                id="orderSection"
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-40 top-36 sm:top-24 lg:top-20 flex flex-col lg:flex-row justify-between gap-5 px-[5%] py-20"
              >
                {/* ── Billing Details ── */}
                <div className="bg-white p-5 flex-1 space-y-5 rounded-lg">
                  <h2 className="text-lg font-bold text-[#FFA800] mb-4">Billing Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-forest-green font-semibold text-sm">আপনার নাম *</label>
                      <input
                        {...register("name", { required: "নাম প্রয়োজন" })}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-forest-green font-semibold text-sm">মোবাইল নাম্বার *</label>
                      <input
                        {...register("phone", {
                          pattern: {
                            value: /^01[0-9]{9}$/,
                            message: "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
                          },
                        })}
                        placeholder="01XXXXXXXXX"
                        type="tel"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="text-forest-green font-semibold text-sm">
                        আপনার ঠিকানা ( এলাকা, থানা, জেলা )
                      </label>
                      <textarea
                        {...register("address", { required: "ঠিকানা প্রয়োজন" })}
                        placeholder="এলাকা, থানা, জেলা লিখুন"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address.message}</p>
                      )}
                    </div>
                  </div>
                </div>
 
                {/* ── Your Order ── */}
                <div className="bg-white md:p-5 flex-1 rounded-lg">
                  <h2 className="text-xl font-bold text-[#FFA800] mb-5 p-5 md:p-0">Your Order</h2>
                  <div className="pt-2">
                    {/* Product Card */}
                    <div className="border border-gray-200 rounded-xl p-4 sm:p-5 mb-6 shadow-sm bg-gray-50/50">
                      {/* Regular product header */}
                      {productType !== "variant" && (
                        <div className="flex items-center gap-4">
                          <div className="bg-white p-1 rounded-md border border-gray-100 shadow-sm">
                            <Image
                              height={70}
                              width={70}
                              src={displayImage}
                              alt={productName}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className="text-gray-900 font-semibold text-sm sm:text-base leading-snug"
                              dangerouslySetInnerHTML={{ __html: productName }}
                            />
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-forest-green font-bold text-lg">৳ {displayPrice}</p>
                              {prvPrice > displayPrice && (
                                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                  Save ৳{(prvPrice - displayPrice).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
 
                      {/* Variant selector */}
                      {productType === "variant" && variants && variants.length > 0 && (
                        <div className="pt-4 border-gray-200">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                            Select Variant:
                          </p>
                          <div className="space-y-3">
                            {variants.map((variant, index) => {
                              const isSelected = selectedVariant?.name === variant.name;
                              return (
                                <label
                                  key={index}
                                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer p-3 sm:p-4 border-2 rounded-xl transition-all duration-200 ${
                                    isSelected
                                      ? "border-forest-green bg-forest-green/5 shadow-sm"
                                      : "border-gray-200 hover:border-forest-green/40 bg-white"
                                  }`}
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <input
                                      type="radio"
                                      name="variant-unified"
                                      checked={isSelected}
                                      onChange={() => setSelectedVariant(variant)}
                                      className="w-4 h-4 accent-forest-green flex-shrink-0 cursor-pointer"
                                    />
                                    <div className="bg-white p-1 rounded border border-gray-100">
                                      <Image
                                        src={variant.image}
                                        alt={variant.name}
                                        width={45}
                                        height={45}
                                        className="object-contain"
                                      />
                                    </div>
                                    <div>
                                      <p className="text-sm sm:text-base font-semibold text-gray-900">
                                        {variant.name}
                                      </p>
                                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                        <p className="text-forest-green font-bold text-sm sm:text-base">
                                          ৳{variant.price.toLocaleString()}
                                        </p>
                                        {variant.prvPrice && variant.prvPrice > variant.price && (
                                          <>
                                            <p className="text-xs text-gray-400 line-through">
                                              ৳{variant.prvPrice.toLocaleString()}
                                            </p>
                                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                              Save ৳{(variant.prvPrice - variant.price).toLocaleString()}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
 
                                  {isSelected && (
                                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-none border-gray-200/60">
                                      <span className="sm:hidden text-sm font-medium text-gray-600">
                                        Quantity:
                                      </span>
                                      <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                                          <span
                                            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full h-8 w-8 flex justify-center items-center transition-colors"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              if (quantity > 0) setQuantity(quantity - 1);
                                            }}
                                          >
                                            <FaMinus size={12} />
                                          </span>
                                          <Input
                                            className="w-10 bg-transparent border-none text-center font-semibold text-gray-900 shadow-none focus-visible:ring-0 p-0 h-8"
                                            value={quantity}
                                            readOnly
                                          />
                                          <span
                                            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full h-8 w-8 flex justify-center items-center transition-colors"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setQuantity(quantity + 1);
                                            }}
                                          >
                                            <FaPlus size={12} />
                                          </span>
                                        </div>
                                        <p className="font-bold text-gray-900 text-base min-w-[3rem] text-right">
                                          ৳ {displayPrice}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
 
                      {/* Regular quantity control */}
                      {productType !== "variant" && (
                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-200">
                          <span className="text-sm font-semibold text-gray-600">Select Quantity:</span>
                          <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                            <span
                              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full h-8 w-8 flex justify-center items-center transition-colors"
                              onClick={() => { if (quantity > 0) setQuantity(quantity - 1); }}
                            >
                              <FaMinus size={12} />
                            </span>
                            <Input
                              className="w-12 bg-transparent border-none text-center font-semibold text-gray-900 shadow-none focus-visible:ring-0 p-0 h-8"
                              value={quantity}
                              readOnly
                            />
                            <span
                              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full h-8 w-8 flex justify-center items-center transition-colors"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              <FaPlus size={12} />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
 
                    {/* Subtotal & Shipping */}
                    <div className="bg-gray-50/50 rounded-xl p-4 sm:p-5 border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium text-gray-600">Subtotal</span>
                        <span className="font-bold text-gray-900 text-lg">৳ {subTotal}</span>
                      </div>
                      <div className="space-y-3 mb-4">
                        <p className="font-bold text-gray-800 border-b pb-2">Shipping Method</p>
                        <label className="flex justify-between items-center cursor-pointer p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white transition-colors">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              value="dhakaCity"
                              {...register("shipping")}
                              defaultChecked
                              className="w-4 h-4 accent-forest-green"
                            />
                            <span className="text-gray-700 text-sm">ঢাকা সিটি</span>
                          </div>
                          <span className="font-medium text-gray-900">৳ {shipping?.dhakaCity}</span>
                        </label>
                        <label className="flex justify-between items-center cursor-pointer p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white transition-colors">
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              value="dhakaCityOuter"
                              {...register("shipping")}
                              className="w-4 h-4 accent-forest-green mt-1"
                            />
                            <span className="text-gray-700 text-sm max-w-[200px] sm:max-w-none">
                              ঢাকা সিটির বাহিরে <br className="sm:hidden" />
                              (গাজীপুর, নারায়ণগঞ্জ, কেরানীগঞ্জ, সাভার, টঙ্গী, দোহার, নবাবগঞ্জ)
                            </span>
                          </div>
                          <span className="font-medium text-gray-900 mt-1 sm:mt-0">
                            ৳ {shipping?.dhakaCityOuter}
                          </span>
                        </label>
                        <label className="flex justify-between items-center cursor-pointer p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white transition-colors">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              value="outsideDhaka"
                              {...register("shipping")}
                              className="w-4 h-4 accent-forest-green"
                            />
                            <span className="text-gray-700 text-sm">ঢাকার বাহিরে</span>
                          </div>
                          <span className="font-medium text-gray-900">৳ {shipping?.outsideDhaka}</span>
                        </label>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                        <span className="font-bold text-lg text-gray-800">Total</span>
                        <span className="font-extrabold text-forest-green text-xl">৳ {total}</span>
                      </div>
                    </div>
 
                    {/* Payment Options */}
                    <div className="my-6">
                      <p className="font-bold text-gray-800 mb-3">Payment Option</p>
                      <div className="flex items-center gap-6 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="cash"
                            {...register("payment")}
                            defaultChecked
                            className="w-4 h-4 accent-forest-green"
                          />
                          <span className="font-medium text-gray-700">Cash on delivery</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="bkash"
                            {...register("payment")}
                            className="w-4 h-4 accent-forest-green"
                          />
                          <span className="font-medium text-gray-700">Bkash</span>
                        </label>
                      </div>
 
                      {paymentMethod === "cash" && (
                        <div className="mt-3 animate-in fade-in duration-300">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delivery Instructions (Optional)
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-forest-green focus:border-forest-green outline-none"
                            placeholder="Any special instructions for the rider?"
                            {...register("cashPaymentMessage")}
                          />
                          <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-midnight-navy mt-4">
                            <h1 className="text-lg font-bold text-forest-green flex items-center gap-2 mb-2">
                              <LockKeyhole size={18} /> ক্যাশ অন ডেলিভারি
                            </h1>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              আমরা দিচ্ছি হোম ডেলিভারির সুবিধা — পণ্য হাতে পাওয়ার পর দেখে
                              নিশ্চিন্তে পেমেন্ট করুন, ইনশাআল্লাহ।
                            </p>
                          </div>
                        </div>
                      )}
 
                      {paymentMethod === "bkash" && (
                        <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100 animate-in fade-in duration-300">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bkash Phone Number
                            </label>
                            <input
                              type="tel"
                              className={`w-full p-3 border rounded-lg outline-none focus:ring-1 ${
                                errors.bkashPhone
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-300 focus:ring-forest-green focus:border-forest-green"
                              }`}
                              placeholder="01XXXXXXXXX"
                              {...register("bkashPhone", {
                                required: "Bkash number is required",
                                pattern: {
                                  value: /^01\d{9}$/,
                                  message: "দয়া করে একটি সঠিক মোবাইল (01XXXXXXXXX) নম্বর দিন",
                                },
                              })}
                            />
                            {errors.bkashPhone && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.bkashPhone.message as string}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Transaction ID
                            </label>
                            <input
                              type="text"
                              className={`w-full p-3 border rounded-lg outline-none focus:ring-1 ${
                                errors.bkashTransactionId
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-300 focus:ring-forest-green focus:border-forest-green"
                              }`}
                              placeholder="Enter transaction ID"
                              {...register("bkashTransactionId", {
                                required: "Transaction ID is required",
                              })}
                            />
                            {errors.bkashTransactionId && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.bkashTransactionId.message as string}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
 
                    {/* Submit Button */}
                    <motion.div
                      animate={
                        placeOrderLoading
                          ? {}
                          : { scale: [1, 1.02, 1, 1.02, 1] }
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                      className="mt-6"
                    >
                      <button
                        type="submit"
                        disabled={placeOrderLoading}
                        className={`w-full py-4 border border-4 border-[#FFa800] rounded-lg flex items-center justify-center gap-3 text-lg sm:text-xl font-bold transition-all shadow-md ${
                          placeOrderLoading
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-[#1a6630] hover:bg-[#152a1f] text-white cursor-pointer hover:shadow-lg"
                        }`}
                      >
                        <LockKeyhole className="mb-0.5" size={22} />
                        {placeOrderLoading ? "অর্ডার প্রসেস হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
                        <span className="bg-white/20 px-3 py-1 rounded-md text-sm sm:text-base ml-2">
                          ৳ {price || "000"}
                        </span>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </form>
            </div>
 
            {/* ── Benefits Section ── */}
            <div className="mt-24 my-10 bg-white">
              <h1
                className="bg-deepGreen py-3 px-5 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white"
                dangerouslySetInnerHTML={{ __html: benefits?.heading }}
              />
              <div className="py-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-2 px-[5%]">
                  <div className="sm:col-span-2 place-content-center space-y-2 sm:space-y-5">
                    {benefits?.steps?.map((item, i) => (
                      <p
                        key={i}
                        className="flex items-start gap-2 text-lg lg:text-xl leading-relaxed font-semibold"
                      >
                        <FaArrowRightLong className="text-bright-orange text-xl mt-1 mr-2" />
                        {item}
                      </p>
                    ))}
                  </div>
 
                  {/* Mobile CTA */}
                  <div className="flex sm:hidden text-center py-7 flex-col items-center gap-4">
                    <Link
                      href="#orderSection"
                      className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                    >
                      অর্ডার করতে চাই
                    </Link>
                    <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                      তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ করুন - +8801342106348
                    </p>
                    <a href="https://wa.me/+8801342106348" target="_blank" rel="noopener noreferrer">
                      <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                        <FaWhatsapp /> WhatsApp
                      </button>
                    </a>
                  </div>
 
                  <Image
                    height={1000}
                    width={1000}
                    src={displayImage}
                    alt={productName}
                    className="sm:my-10 w-full max-w-[500px] h-auto object-contain mx-auto"
                  />
                </div>
 
                {/* Desktop CTA */}
                <div className="hidden sm:flex text-center pt-10 sm:py-7 flex-col items-center gap-4">
                  <Link
                    href="#orderSection"
                    className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                  >
                    অর্ডার করতে চাই
                  </Link>
                  <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                    তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ করুন - +8801342106348
                  </p>
                  <a href="https://wa.me/+8801342106348" target="_blank" rel="noopener noreferrer">
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            </div>
 
            {/* ── Hadith ── */}
            <p
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-relaxed"
              dangerouslySetInnerHTML={{ __html: hadith }}
            />
 
            {/* ── Buying Reason Section ── */}
            <div className="bg-white my-10">
              <h1
                className="bg-[#1F6E43] py-3 px-5 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white"
                dangerouslySetInnerHTML={{ __html: buyingReason?.heading }}
              />
              <div className="px-[5%]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2 place-content-center space-y-2 sm:space-y-5 py-6 sm:py-10 px-[5%]">
                    {buyingReason?.steps?.map((item, i) => (
                      <p
                        key={i}
                        className="flex items-start gap-2 text-lg lg:text-xl leading-relaxed font-semibold"
                      >
                        <FaArrowRightLong className="text-bright-orange text-xl mt-1 mr-2 flex-shrink-0" />
                        {item}
                      </p>
                    ))}
                  </div>
                  <Image
                    height={1000}
                    width={1000}
                    src={displayImage}
                    alt={productName}
                    className="sm:my-10 w-full max-w-[500px] h-auto object-contain mx-auto"
                  />
                </div>
                <div className="flex text-center pt-4 sm:pt-0 pb-10 flex-col items-center gap-4">
                  <Link
                    href="#orderSection"
                    className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                  >
                    অর্ডার করতে চাই
                  </Link>
                  <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                    তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ করুন - +8801342106348
                  </p>
                  <a href="https://wa.me/+8801342106348" target="_blank" rel="noopener noreferrer">
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            </div>
 
            {/* ── Reviews Section ── */}
            <div className="pt-5 pb-24 px-[5%] bg-[#E4E9E6] flex flex-col-reverse lg:flex-row justify-between items-center gap-5">
              <div className="w-full">
                <p className="text-lg font-semibold text-[#D61355]">ক্রেতাদের কথা</p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F6E43] my-3">
                  নিয়মিত কাস্টমারদের রিভিউ সমূহ
                </h1>
                <p className="text-lg font-medium">
                  বিষাদ্ধ ও খাঁটি পণ্য সরবরাহের কারণে আমরা প্রায় সবসময়ই ইতিবাচক মন্তব্য পেয়ে থাকি।
                  আপনার প্রত্যাশিত ফলাফল পেতে সঠিক নিয়মে নিয়মিত ব্যবহার অপরিহার্য।
                </p>
                <div className="hidden sm:block sm:text-start py-7">
                  <a href="https://wa.me/+8801342106348" target="_blank" rel="noopener noreferrer">
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>
 
              <div className="py-12 px-[5%] bg-[#1F6E43] text-center text-white space-y-5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  নানান রকম অফার আপডেট পেতে <br /> আমাদের পেইজে লাইক দিন
                </h1>
                <Link target="_blank" href={"https://www.facebook.com/borkotmoyponno"}>
                  <button className="mx-auto text-center bg-bright-orange px-3 py-2 text-lg text-midnight-navy cursor-pointer flex items-center">
                    <FaFacebookF className="text-blue-500 mr-2 text-xl" /> Borkotmoy Ponno
                  </button>
                </Link>
                <Link
                  href="https://www.facebook.com/borkotmoyponno"
                  target="_blank"
                  className="text-base w-fit px-4 py-2 mx-auto mt-3 block text-white rounded"
                >
                  Borkotmoy Ponno— যেখানে প্রতিটি পণ্যের মাঝে থাকে সততা, বিশ্বাস ও খোদাভীতির ছোঁয়া।
                </Link>
              </div>
            </div>
 
            {/* ── Review Carousel (Static) ── */}
            <div className="-mt-32 px-[10%]">
              <Carousel>
                <CarouselContent className="h-full mt-20">
                  {reviews.map((review, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-full">
                      <div className="bg-white mx-2 p-5 rounded h-full flex flex-col">
                        <p className="text-sm text-[#656565] mb-5 flex-1">{review.comment}</p>
                        <div className="flex justify-between items-center gap-5">
                          <div className="space-y-2">
                            <p className="text-lg text-[#2A3347] font-semibold">{review.name}</p>
                            <p className="text-sm text-[#656565]">{review.location} — {review.date}</p>
                          </div>
                          {/* Star rating */}
                          <div className="flex text-yellow-400 text-lg">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                            {Array.from({ length: 5 - review.rating }).map((_, i) => (
                              <span key={i} className="text-gray-300">★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
 
            {/* ── Order CTA ── */}
            <div className="flex justify-center items-center my-10 -mt-2">
              <Link
                href="#orderSection"
                className="rounded-none bg-[#FFa800] text-[#0E243A] text-2xl font-bold py-3 px-5 cursor-pointer mt-10"
              >
                অর্ডার করতে চাই
              </Link>
            </div>
 
            {/* ── Related Products ── */}
            <div className="my-10 font-caladea">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1F6E43] mb-5">
                Related Product
              </p>
              {allData.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              
                    {allData.slice(0,4).map((product) => (
                      <ProductCard
                                    key={product._id}  
                                    product={product}
                                
                                  />
                    ))}
                
                </div>
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-10 bg-white rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
 
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
 
export default ShopDetails;
 
