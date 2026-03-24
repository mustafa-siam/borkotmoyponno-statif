"use client";
import { useHandleAddOrderMutation } from "@/redux/features/order/orderApi";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type ShippingOption = "dhakaCity" | "dhakaCityOuter" | "outsideDhaka";
type PaymentOption = "cash" | "bkash";

interface FormData {
  name: string;
  phone: string;
  address: string;
  shipping: ShippingOption;
  payment: PaymentOption;
  bkashTransactionId?: string;
  bkashPhone?: string;
  cashPaymentMessage?: string;
}

// function stripHtmlTags(str: string) {
//   if (!str) return "";
//   return str.replace(/<\/?[^>]+(>|$)/g, "");
// }

export default function CartCard({
  cartProducts,
  setCartProducts,
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      shipping: "dhakaCity",
      payment: "cash",
    },
  });

  const paymentMethod = watch("payment");
  const shippingSelected = watch("shipping", "dhakaCity");

  const [handleAddOrder, { isLoading: placeOrderLoading }] = useHandleAddOrderMutation();
  const router = useRouter();

  // Calculate shipping cost based on selected option
  const shippingCost: Record<ShippingOption, number> = {
    dhakaCity: cartProducts?.reduce(
      (acc: number, item: any) =>
        acc + (item.payload?.shipping?.dhakaCity || 0),
      0
    ),
    dhakaCityOuter: cartProducts?.reduce(
      (acc: number, item: any) =>
        acc + (item.payload?.shipping?.dhakaCityOuter || 0),
      0
    ),
    outsideDhaka: cartProducts?.reduce(
      (acc: number, item: any) =>
        acc + (item.payload?.shipping?.outsideDhaka || 0),
      0
    ),
  };

  // Calculate total product cost
  const productCost = cartProducts.reduce(
    (total: number, item: any) => total + item?.payload?.price * item?.quantity,
    0
  );

  const cost = productCost + (shippingCost[shippingSelected] || 0);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const payload = {
        user: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
        products: cartProducts.map((item: any) => ({
          product: item.payload._id,
          quantity: item.quantity,
        })),
        paymentInfo: {
          method: data.payment,
          bkashPhone: data.bkashPhone,
          bkashTransactionId: data.bkashTransactionId,
          cashPaymentMessage: data.cashPaymentMessage,
        },
        shippingArea: data.shipping,
      };

      const response = await handleAddOrder(payload).unwrap();

      // GA4 purchase event push
      // window.dataLayer?.push({
      //   event: "purchase",
      //   ecommerce: {
      //     transaction_id: response._id || response.data?._id || "", // fallback
      //     value: cost,
      //     currency: "BDT",
      //     items: cartProducts.map((item: any) => ({
      //       item_id: item.payload._id,
      //       item_name: stripHtmlTags(item.payload.productName),
      //       price: item.payload.price,
      //       quantity: item.quantity,
      //     })),
      //   },
      //   customer: {
      //     name: data.name,
      //     phone: data.phone,
      //     address: data.address,
      //   },
      // });

      toast.success("Order Placed Successfully!");
      // Store response in localStorage
      localStorage.setItem("orderData", JSON.stringify(response));
      localStorage.removeItem("ponnoBariCart");
      setCartProducts([]);

      router.push("/success");

      reset({
        name: "",
        phone: "",
        address: "",
        shipping: "dhakaCity",
        payment: "cash",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <div className="w-full lg:w-96 p-5 bg-white border border-gray-100 h-fit">
      <h2 className="text-base font-semibold text-midnight-navy mb-5">Billing Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-xs font-medium text-gray-500">
            আপনার নাম *
          </label>
          <input
            {...register("name", { required: "নাম প্রয়োজন" })}
            placeholder="আপনার নাম লিখুন"
            className="w-full border border-gray-200 p-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-medium text-gray-500">
            মোবাইল নাম্বার *
          </label>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            {...register("phone", {
              required: "মোবাইল নম্বর প্রয়োজন",
              pattern: {
                value: /^01[0-9]{9}$/,
                message:
                  "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
              },
            })}
            className="w-full border border-gray-200 p-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="text-xs font-medium text-gray-500">
            আপনার ঠিকানা ( এলাকা, থানা, জেলা ) *
          </label>
          <textarea
            {...register("address", { required: "ঠিকানা প্রয়োজন" })}
            placeholder="এলাকা, থানা, জেলা লিখুন"
            className="w-full border border-gray-200 p-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Shipping Options */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">Subtotal</span>
            <span className="text-sm font-semibold text-forest-green">
              Tk {cost.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2.5 my-4">
            <p className="text-xs font-semibold text-midnight-navy uppercase tracking-wider">Shipping</p>
            <label className="block cursor-pointer">
              <span className="flex justify-between items-center gap-5 text-sm">
                <p>
                  <input
                    type="radio"
                    value="dhakaCity"
                    {...register("shipping")}
                    defaultChecked
                    className="cursor-pointer w-4 accent-forest-green"
                  />
                  {" "}ঢাকা সিটি
                </p>
                <p className="whitespace-nowrap text-gray-500">৳ {shippingCost.dhakaCity}</p>
              </span>
            </label>

            <label className="block cursor-pointer text-sm">
              <span className="flex justify-between items-center gap-5">
                <p>
                  <input
                    type="radio"
                    value="dhakaCityOuter"
                    {...register("shipping")}
                    className="cursor-pointer w-4 accent-forest-green"
                  />
                  {" "}ঢাকা সিটির বাহিরে (গাজীপুর, নারায়ণগঞ্জ, কেরানীগঞ্জ, সাভার,
                  টঙ্গী, দোহার, নবাবগঞ্জ)
                </p>
                <p className="whitespace-nowrap text-gray-500">
                  ৳ {shippingCost.dhakaCityOuter}
                </p>
              </span>
            </label>

            <label className="block cursor-pointer text-sm">
              <span className="flex justify-between items-center gap-5">
                <p className="whitespace-nowrap">
                  <input
                    type="radio"
                    value="outsideDhaka"
                    {...register("shipping")}
                    className="cursor-pointer w-4 accent-forest-green"
                  />
                  {" "}ঢাকার বাইরে
                </p>
                <p className="text-gray-500">৳ {shippingCost.outsideDhaka}</p>
              </span>
            </label>
          </div>

          <div className="h-px bg-gray-100 my-3"></div>
          <div className="flex justify-between mt-1">
            <span className="text-sm font-semibold text-midnight-navy">Total</span>
            <span className="text-sm font-bold text-forest-green">
              Tk {cost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="my-3">
          <p className="text-xs font-semibold text-midnight-navy uppercase tracking-wider mb-2">Payment Option</p>
          <div className="flex justify-between items-center gap-5 text-sm">
            <label className="block">
              <input
                type="radio"
                value="cash"
                {...register("payment")}
                defaultChecked
                className="cursor-pointer accent-forest-green"
              />
              <span className="ml-2">Cash on delivery</span>
            </label>
            <label className="block">
              <input
                type="radio"
                value="bkash"
                {...register("payment")}
                className="cursor-pointer accent-forest-green"
              />
              <span className="ml-2">Bkash</span>
            </label>
          </div>

          {/* Conditional Fields */}
          {paymentMethod === "cash" && (
            <div className="mt-3">
              <label className="block text-sm">
                Delivery Instructions (Optional)
                <input
                  type="text"
                  {...register("cashPaymentMessage")}
                  placeholder="Any special instructions?"
                  className="w-full p-2.5 border border-gray-200 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors"
                />
              </label>

              <div className="p-4 bg-forest-green/5 text-midnight-navy mt-4">
                <h1 className="text-base font-medium mb-2">ক্যাশ অন ডেলিভারি</h1>
                <p className="bg-white p-4 text-sm text-gray-600">
                  আমরা দিচ্ছি হোম ডেলিভারি, পন্য হাতে পেয়ে দেখে রিসিভ করবেন, আশা
                  করছি আপনি আমাদের পণ্যটি রিসিভ করবেন।
                </p>
              </div>
            </div>
          )}

          {paymentMethod === "bkash" && (
            <div className="mt-3 space-y-3">
              <label className="block">
                Bkash Phone Number *
                <input
                  type="tel"
                  {...register("bkashPhone", {
                    required: "Bkash number is required",
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message:
                        "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
                    },
                  })}
                  placeholder="01XXXXXXXXX"
                  className="w-full p-2 border border-gray-200 mt-1 focus:ring-forest-green/20 focus:border-forest-green focus:outline-none"
                />
                {errors.bkashPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bkashPhone.message}
                  </p>
                )}
              </label>

              <label className="block">
                Transaction ID *
                <input
                  type="text"
                  {...register("bkashTransactionId", {
                    required: "Transaction ID is required",
                  })}
                  placeholder="Enter transaction ID"
                  className="w-full p-2 border border-gray-200 mt-1 focus:ring-forest-green/20 focus:border-forest-green focus:outline-none"
                />
                {errors.bkashTransactionId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bkashTransactionId.message}
                  </p>
                )}
              </label>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={placeOrderLoading}
          className={`w-full py-2.5 cursor-pointer text-sm font-medium transition-colors ${placeOrderLoading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-forest-green hover:bg-deepGreen text-white"
            }`}
        >
          {placeOrderLoading ? "Place Order.." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
