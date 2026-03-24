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
  bkashTransactionId?: string; // Optional for bkash payment
  bkashPhone?: string; // Optional for bkash payment
  cashPaymentMessage?: string; // Optional for cash payment
}

export default function CartCard({
  cartProducts,
  loading,
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
  const [handleAddOrder] = useHandleAddOrderMutation();
  const router = useRouter();

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const payload = {
        user: {
          name: data?.name,
          phone: data?.phone,
          address: data?.address,
        },
        products: cartProducts?.map((item: any) => {
          return {
            product: item?.payload?._id,
            quantity: item?.quantity,
          };
        }),

        paymentInfo: {
          method: data?.payment,
          bkashPhone: data?.bkashPhone,
          bkashTransactionId: data?.bkashTransactionId,
          cashPaymentMessage: data?.cashPaymentMessage,
        },
        shippingArea: data?.shipping,
      };

      const response = await handleAddOrder(payload).unwrap();

      // Then navigate to success page
      router.push(`/success`);
      toast.success("Order Placed Successfully!");
      localStorage.removeItem("ponnoBariCart");
      setCartProducts([]); // if using useState

      window.dataLayer?.push({
        event: "purchase",
        ecommerce: {
          transaction_id: response.data._id, // Unique transaction ID
          value: cost, // Total order value
          currency: "BDT", // Currency
          items: cartProducts.map((item: any) => ({
            item_id: item.payload.slug,
            item_name: item.payload.productName,
            price: item.payload.price,
            quantity: item.quantity,
          })),
        },
      });

      reset({
        name: "",
        phone: "",
        address: "",
        shipping: "dhakaCity",
        payment: "cash",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
  
    }
  };

  // 🧮 Calculate total product cost
  const productCost = cartProducts.reduce(
    (total: number, item: any) => total + item?.payload?.price * item?.quantity,
    0
  );

  const selectedShipping = watch("shipping", "dhakaCity");
  const cost = productCost + shippingCost[selectedShipping];

  return (
    <div className="w-full lg:w-96 p-4 bg-white rounded shadow h-fit">
      <h2 className="text-lg font-bold text-[#FFA800] mb-4">Billing Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-forest-green font-semibold text-sm">
            আপনার নাম *
          </label>
          <input
            {...register("name", { required: "নাম প্রয়োজন" })}
            placeholder="আপনার নাম লিখুন"
            className="w-full border rounded p-2 mt-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-forest-green font-semibold text-sm">
            মোবাইল নাম্বার *
          </label>
          <input
            placeholder="01XXXXXXXXX"
            type="tel"
            {...register("phone", {
              pattern: {
                value: /^01[0-9]{9}$/,
                message:
                  "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
              },
            })}
            className="w-full border rounded p-2 mt-1"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
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

        <div className="pt-2 border-t">
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span className="font-bold text-green-600">
              Tk {cost.toLocaleString()}
            </span>
          </div>

          <div className="space-y-3 my-5">
            <p className="font-semibold text-gray-700">Shipping</p>
            <label className="block cursor-pointer">
              <span className="flex justify-between items-center gap-5">
                <p>
                  <input
                    type="radio"
                    value="dhakaCity"
                    className="cursor-pointer"
                    {...register("shipping")}
                    defaultChecked
                  />{" "}
                  ঢাকা সিটি
                </p>
                <p className="whitespace-nowrap">
                  {" "}
                  ৳ {shippingCost?.dhakaCity}
                </p>
              </span>
            </label>

            <label className="block cursor-pointer">
              <span className="flex justify-between items-center gap-5">
                <p>
                  <input
                    type="radio"
                    value="dhakaCityOuter"
                    className="cursor-pointer"
                    {...register("shipping")}
                  />{" "}
                  ঢাকা সিটির বাহিরে ( গাজীপুর, নারায়ণগঞ্জ, কেরানীগঞ্জ, সাভার,
                  টঙ্গী, দোহার, নবাবগঞ্জ )
                </p>
                <p className="whitespace-nowrap">
                  ৳ {shippingCost?.dhakaCityOuter}
                </p>
              </span>
            </label>

            <label className="block cursor-pointer">
              <span className="flex justify-between items-center gap-5">
                <p className="whitespace-nowrap">
                  <input
                    type="radio"
                    value="outsideDhaka"
                    className="cursor-pointer"
                    {...register("shipping")}
                  />{" "}
                  ঢাকার বাইরে
                </p>
                <p>৳ {shippingCost?.outsideDhaka}</p>
              </span>
            </label>
          </div>

          <hr className="my-3" />
          <div className="flex justify-between mt-1">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-green-600">
              Tk {cost.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="my-3">
          <p className="font-medium text-forest-green">Payment Option</p>
          <div className="flex justify-between items-center gap-5">
            <label className="block mt-1">
              <input
                type="radio"
                className="cursor-pointer"
                value="cash"
                {...register("payment")}
                defaultChecked
              />
              <span className="ml-2">Cash on delivery</span>
            </label>
            <label className="block">
              <input
                type="radio"
                className="cursor-pointer"
                value="bkash"
                {...register("payment")}
              />
              <span className="ml-2">Bkash</span>
            </label>
          </div>

          {/* Conditional fields based on payment selection */}
          {paymentMethod === "cash" && (
            <div className="mt-3">
              <label className="block">
                Delivery Instructions (Optional)
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Any special instructions?"
                  {...register("cashPaymentMessage")}
                />
              </label>

              <div className="p-5 bg-mint-background text-midnight-navy mt-5">
                <h1 className="text-xl font-medium mb-3">ক্যাশ অন ডেলিভারি</h1>
                <p className=" bg-white p-5">
                  আমরা দিচ্ছি হোম ডেলিভারি, পন্য হাতে পেয়ে দেখে রিসিভ করবেন, আশা
                  করছি আপনি আমাদের পণ্যটি রিসিভ করবেন।
                </p>
              </div>
            </div>
          )}

          {paymentMethod === "bkash" && (
            <div className="mt-3 space-y-3">
              <label className="block">
                Bkash Phone Number
                <input
                  type="tel"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="01XXXXXXXXX"
                  {...register("bkashPhone", {
                    required: "Bkash number is required",
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message:
                        "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
                    },
                  })}
                />
                {errors?.bkashPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bkashPhone.message}
                  </p>
                )}
              </label>

              <label className="block">
                Transaction ID
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter transaction ID"
                  {...register("bkashTransactionId", {
                    required: "Transaction ID is required",
                  })}
                />
              </label>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#1F6E43] text-white py-2 rounded hover:bg-forest-green cursor-pointer"
          disabled={loading}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
