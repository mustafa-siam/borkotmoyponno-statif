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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { LockKeyhole, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Product, products } from "@/hooks/useProducts";
import { addToCart } from "@/components/layout/Home/shared/ProductCard";
import { reviews } from "@/hooks/useReviews";

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

interface Props {
  slug: string;
}
const ShopDetails = ({ slug }: any) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  //const [reviews, setReviews] = useState<any[]>([]); // Placeholder if you have reviews

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      shipping: "dhakaCity",
      payment: "cash",
    },
  });

  const paymentMethod = watch("payment");

  const product = products.find((p) => p.slug === slug);
  if (!product) return <div>Product not found</div>;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const otherProducts =
    relatedProducts.length < 4
      ? [
          ...relatedProducts,
          ...products
            .filter(
              (p) =>
                p.id !== product.id &&
                !relatedProducts.find((r) => r.id === p.id)
            )
            .slice(0, 4 - relatedProducts.length),
        ]
      : relatedProducts;

  const shippingZone: ShippingOption = watch("shipping", "dhakaCity");
  const shippingCost = product.shipping[shippingZone] || 0;
  const subtotal = product.price * quantity;
  const total = subtotal + shippingCost;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setPlaceOrderLoading(true);
    try {
      const payload = {
        user: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
        products: [
          {
            product: product.id,
            quantity,
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

      // Replace this with your actual API call
      // const response = await handleAddOrder(payload).unwrap();
      const response = { _id: "12345" }; // Mock response

      localStorage.setItem("orderData", JSON.stringify(response));
      toast.success("Order Placed Successfully!");
      reset({
        name: "",
        phone: "",
        address: "",
        shipping: "dhakaCity",
        payment: "cash",
      });
      router.push("/success");
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      setPlaceOrderLoading(false);
    }
  };
  return (
    <>
    <Navbar></Navbar>
      <div
        className="bg-warm-ivory text-midnight-navy min-h-screen scroll-smooth "
        style={{ fontFamily: "SolaimanLipi" }}
      >
        <div className="hidden bg-white px-[5%] font-anek_bangla">
          <div className=" max-w-screen-xl mx-auto flex flex-col justify-center items-center gap-5 sm:gap-10 text-center py-10 sm:py-20">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-deepGreen"
              dangerouslySetInnerHTML={{
                __html: product.tagline,
              }}
            ></h1>
            <Link
              href="#orderSection"
              className="rounded-none bg-[#FFa800] hover:bg-[#FFa800] text-[#0E243A] text-2xl font-bold  py-3 px-5 cursor-pointer"
            >
              অর্ডার করতে চাই
            </Link>
          </div>
        </div>

        <div className="px-[5%]">
          <div className="max-w-screen-xl mx-auto font-anek_bangla pt-10">
            <div className="bg-white rounded-lg">
              <h1
                className="py-10 sm:pt-16 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-deepGreen leading-8 sm:leading-12    max-w-5/6 sm:max-w-2/3 mx-auto"
                dangerouslySetInnerHTML={{
                  __html: product.tagline,
                }}
              ></h1>
            </div>
            <Link
              href="#orderSection"
              className="relative flex items-center justify-center gap-2 mx-auto my-3  bg-[#FFa800] text-[#0E243A] text-2xl font-bold py-2 px-4 cursor-pointer text-center w-fit mb-5 overflow-hidden "
            >
              অর্ডার করতে চাই
            </Link>
            <div className="bg-deepGreen py-10 text-center space-y-3 rounded-lg ">
              <p
                id="order-form"
                className="text-2xl space-y-2 gap-2 sm:text-3xl lg:text-4xl font-bold text-white text-center py-2 max-w-72 sm:max-w-lg lg:max-w-full leading-relaxed mx-auto"
              >
                <span
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: product.name,
                  }}
                ></span>{" "}
              </p>
              <h1
                className="text-xl sm:text-2xl lg:text-3xl font-medium text-white"
                dangerouslySetInnerHTML={{
                  __html: product.unit,
                }}
              ></h1>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                পূর্বের মূল্য : ৳{" "}
                <span className="line-through">{product.prvPrice} </span>টাকা
              </h1>
              <h1 className="text-2xl mt-5 sm:text-3xl lg:text-4xl font-semibold text-white">
                বর্তমান মূল্য :{" "}
                <span className="bg-[#FFA800] text-black px-4">
                  ৳ {product.price} টাকা
                </span>
              </h1>
            </div>

            <Image
              height={1000}
              width={1000}
              src={product.image}
              alt={product.name}
              className="hidden my-10 w-full h-fit object-cover mx-auto"
            />

            <div className="relative ">
              {/* contact number */}
              <div className="absolute w-full flex flex-col items-center pt-10 h-[350px] bg-[#E4E9E6] rounded-lg">
                <a
                  href="tel:01342106348"
                  className="text-xl sm:text-2xl font-medium text-white cursor-pointer block text-center bg-deepGreen px-5 py-2 rounded "
                >
                  প্রয়োজনে কল করুন: 01342106348
                </a>
                <div className="flex flex-col items-center lg:flex-row gap-1 text-center px-5 text-xl sm:text-2xl text-wrap mt-4 ">
                  <p className="flex">
                    “
                    <span
                      dangerouslySetInnerHTML={{ __html: product.name }}
                      className="text-[#D61355]"
                    />
                    ”
                  </p>
                  <p> নিতে নিচের ফর্মটি পূরণ করুন এবং অর্ডার নিশ্চিত করুন</p>
                </div>
              </div>

              <form
                id="orderSection"
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-40 top-36 sm:top-24 lg:top-20 flex flex-col lg:flex-row justify-between gap-5 px-[5%] py-20"
              >
                <div className="bg-white p-5 flex-1 space-y-5 rounded-lg">
                  <h2 className="text-lg font-bold text-[#FFA800] mb-4">
                    Billing Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-forest-green font-semibold text-sm ">
                        আপনার নাম *
                      </label>
                      <input
                        {...register("name", { required: "নাম প্রয়োজন" })}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-forest-green font-semibold text-sm">
                        মোবাইল নাম্বার *
                      </label>
                      <input
                        {...register("phone", {
                          pattern: {
                            value: /^01[0-9]{9}$/,
                            message:
                              "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
                          },
                        })}
                        placeholder="01XXXXXXXXX"
                        type="tel"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-forest-green font-semibold text-sm">
                        আপনার ঠিকানা ( এলাকা, থানা, জেলা )
                      </label>
                      <textarea
                        {...register("address", {
                          required: "ঠিকানা প্রয়োজন",
                        })}
                        placeholder="এলাকা, থানা, জেলা লিখুন"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 flex-1 rounded-lg">
                  <h2 className="text-lg font-bold text-[#FFA800] mb-4">
                    Your Order
                  </h2>
                  <div className="pt-2">
                    <Table className="hidden sm:block">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#808080]">
                            Product
                          </TableHead>
                          <TableHead className="text-[#808080]">
                            Quantity
                          </TableHead>
                          <TableHead className="text-[#808080]">
                            Price
                          </TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-5">
                              <Image
                                height={100}
                                width={100}
                                src={product.image}
                                alt={product.name}
                              />
                              <span
                                className="w-60 break-words whitespace-normal"
                                dangerouslySetInnerHTML={{
                                  __html: product.name,
                                }}
                              ></span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center rounded-full w-fit p-1 text-xl border">
                              <span
                                className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                                onClick={() => {
                                  if (quantity > 0) {
                                    setQuantity(quantity - 1);
                                  }
                                }}
                              >
                                <FaMinus />
                              </span>
                              <Input
                                className="w-12 border-none text-center shadow-none "
                                value={quantity}
                                readOnly
                              />
                              <span
                                className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                                onClick={() => setQuantity(quantity + 1)}
                              >
                                <FaPlus />
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>৳ {product.price} </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="sm:hidden space-y-4">
                      <div className="border rounded-lg p-4 shadow-sm relative">
                        <div className="flex items-center gap-4">
                          <Image
                            height={80}
                            width={80}
                            src={product.image}
                            alt={product.name}
                          />
                          <div>
                            <p
                              dangerouslySetInnerHTML={{ __html: product.name }}
                            ></p>
                            <p className="text-gray-600 text-sm mt-1">
                              Price: {product.price} ৳
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 relative">
                          <span className="text-sm text-gray-500">
                            Quantity:
                          </span>
                          <div className="flex items-center border rounded-full px-2 text-xl">
                            <span
                              className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                              onClick={() => {
                                if (quantity > 0) {
                                  setQuantity(quantity - 1);
                                }
                              }}
                            >
                              <FaMinus />
                            </span>
                            <Input
                              className="w-12 border-none text-center shadow-none "
                              value={quantity}
                              readOnly
                            />
                            <span
                              className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              <FaPlus />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between">
                      <span className="font-semibold">Subtotal</span>
                      <span className="font-bold text-green-600">
                        Tk {subtotal}
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
                              {...register("shipping")}
                              defaultChecked
                              className="cursor-pointer w-5"
                            />{" "}
                            ঢাকা সিটি
                          </p>
                          <p className="whitespace-nowrap">
                            {" "}
                            ৳ {product.shipping?.dhakaCity}
                          </p>
                        </span>
                      </label>

                      <label className="block cursor-pointer">
                        <span className="flex justify-between items-center gap-5">
                          <p>
                            <input
                              type="radio"
                              value="dhakaCityOuter"
                              {...register("shipping")}
                              className="cursor-pointer w-5"
                            />{" "}
                            ঢাকা সিটির বাহিরে ( গাজীপুর, নারায়ণগঞ্জ, কেরানীগঞ্জ,
                            সাভার, টঙ্গী, দোহার, নবাবগঞ্জ )
                          </p>
                          <p className="whitespace-nowrap">
                            ৳ {product.shipping?.dhakaCityOuter}
                          </p>
                        </span>
                      </label>

                      <label className="block cursor-pointer">
                        <span className="flex justify-between items-center gap-5">
                          <p>
                            <input
                              type="radio"
                              value="outsideDhaka"
                              {...register("shipping")}
                              className="cursor-pointer w-5"
                            />{" "}
                            ঢাকার বাহিরে
                          </p>
                          <p className="whitespace-nowrap">
                            ৳ {product.shipping?.outsideDhaka}
                          </p>
                        </span>
                      </label>
                    </div>

                    <hr className="my-3" />
                    <div className="flex justify-between mt-1">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-green-600">
                        Tk {total}
                      </span>
                    </div>
                  </div>

                  <div className="my-3">
                    <p className="font-medium text-forest-green">
                      Payment Option
                    </p>
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
                          <h1 className="text-xl font-medium mb-3">
                            ক্যাশ অন ডেলিভারি
                          </h1>
                          <p className=" bg-white p-5">
                            আমরা দিচ্ছি হোম ডেলিভারির সুবিধা — পণ্য হাতে পাওয়ার
                            পর দেখে নিশ্চিন্তে রিসিভ করুন, ইনশাআল্লাহ
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
                                value: /^01\d{9}$/,
                                message:
                                  "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
                              },
                            })}
                          />
                          {errors.bkashPhone && (
                            <p className="text-red-500 text-sm">
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
                          {errors.bkashTransactionId && (
                            <p className="text-red-500 text-sm">
                              {errors.bkashTransactionId.message}
                            </p>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                  <motion.div
                    // কন্টিনিউয়াস অ্যানিমেশন: বর্ডারসহ পুরো কন্টেইনার মুভ করবে
                    animate={
                      placeOrderLoading
                        ? {}
                        : {
                            scale: [1, 1.03, 1, 1.03, 1], // হার্টবিট পালস
                            rotate: [0, -0.5, 0.5, -0.5, 0.5, 0], // খুব সূক্ষ্ম প্রফেশনাল শেক
                          }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                    className="border-2 border-deepGreen p-0.5 rounded shadow-none"
                  >
                    <button
                      type="submit"
                      disabled={placeOrderLoading}
                      // সাইজ একদম আপনার প্রথম কোডের মতো রাখা হয়েছে (py-3, text-xl)
                      className={`w-full py-3 rounded flex items-center justify-center gap-2 text-xl font-medium border border-white transition-colors ${
                        placeOrderLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-deepGreen hover:bg-green-800 text-white cursor-pointer"
                      }`}
                    >
                      <LockKeyhole />
                      {placeOrderLoading
                        ? "অর্ডার করা হচ্ছে..."
                        : "অর্ডার করুন"}
                      <span> {product.price || "000"}৳</span>
                    </button>
                  </motion.div>
                </div>
              </form>
            </div>

            {/* <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-forest-green mt-3">
            (সুরা নাহল, আয়াত-৬৯)
          </p> */}

            {/* product benefit  1*/}
            <div className="mt-24 my-10 bg-white">
              <h1
                className="bg-deepGreen py-3 px-5 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white"
                dangerouslySetInnerHTML={{
                  __html: product.benefits?.heading,
                }}
              ></h1>
              <div className="py-10 ">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-2 px-[5%]">
                  <div className="sm:col-span-2 place-content-center space-y-2 sm:space-y-5 ">
                    {product.benefits?.steps?.map((item: string, i: number) => (
                      <p
                        key={i}
                        className="flex items-start  gap-2 text-lg lg:text-xl leading-relaxed font-semibold"
                      >
                        <FaArrowRightLong className="text-bright-orange text-xl mt-1 mr-2" />{" "}
                        {item}
                      </p>
                    ))}
                  </div>

                  <div className="flex sm:hidden text-center py-7 flex-col items-center gap-4">
                    {/* অর্ডার বাটন */}
                    <Link
                      href="#orderSection"
                      className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                    >
                      অর্ডার করতে চাই
                    </Link>

                    {/* টেক্সট */}
                    <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                      তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ
                      করুন - +8801342106348
                    </p>

                    {/* হোয়াটসঅ্যাপ বাটন */}
                    <a
                      href="https://wa.me/+8801342106348"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                        <FaWhatsapp /> WhatsApp
                      </button>
                    </a>
                  </div>

                  <Image
                    height={1000}
                    width={1000}
                    src={product.image}
                    alt={product.name}
                    className="sm:my-10 w-full max-w-[500px] h-auto object-contain mx-auto"
                  />
                </div>
                <div className="hidden sm:flex text-center pt-10 sm:py-7  flex-col items-center gap-4">
                  {/* অর্ডার বাটন */}
                  <Link
                    href="#orderSection"
                    className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                  >
                    অর্ডার করতে চাই
                  </Link>

                  {/* টেক্সট */}
                  <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                    তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ
                    করুন - +8801342106348
                  </p>

                  {/* হোয়াটসঅ্যাপ বাটন */}
                  <a
                    href="https://wa.me/+8801342106348"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="text-center py-3.5 sm:py-7 ">
              <Link
                href="#orderSection"
                className="rounded-none bg-[#FFa800] text-[#0E243A] text-2xl font-bold  py-3 px-5 cursor-pointer"
              >
                অর্ডার করতে চাই
              </Link>
            </div> */}

            <p
              className=" text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: product.hadith,
              }}
            ></p>

            {/* whatsapp number and text */}
            <div className="hidden  flex-col justify-center items-center gap-5">
              <Link
                href="#orderSection"
                className="rounded-none bg-[#FFa800] text-[#0E243A] text-2xl font-bold  py-3 px-5 cursor-pointer"
              >
                অর্ডার করতে চাই
              </Link>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
                তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ
                করুন -+8801342106348
              </p>
              <a
                href="https://wa.me/+8801342106348" // Replace with your full number including country code
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                  <FaWhatsapp /> WhatsApp
                </button>
              </a>
            </div>

            {/* product benefit 2*/}
            <div className="bg-white my-10">
              <h1
                className="bg-[#1F6E43] py-3 px-5 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white"
                dangerouslySetInnerHTML={{
                  __html: product.buyingReason?.heading,
                }}
              ></h1>

              <div className="px-[5%]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2 place-content-center space-y-2 sm:space-y-5 py-6 sm:py-10 px-[5%]">
                    {product.buyingReason?.steps?.map((item: string, i: number) => (
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
                    src={product.image}
                    alt={product.name}
                    className="sm:my-10 w-full max-w-[500px] h-auto object-contain mx-auto"
                  />
                </div>

                <div className="flex text-center pt-4 sm:pt-0 pb-10   flex-col items-center gap-4">
                  {/* অর্ডার বাটন */}
                  <Link
                    href="#orderSection"
                    className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                  >
                    অর্ডার করতে চাই
                  </Link>

                  {/* টেক্সট */}
                  <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                    তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ
                    করুন - +8801342106348
                  </p>

                  {/* হোয়াটসঅ্যাপ বাটন */}
                  <a
                    href="https://wa.me/+8801342106348"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-5 pb-24 px-[5%] bg-[#E4E9E6] flex flex-col-reverse lg:flex-row  justify-between items-center gap-5 ">
              <div className="w-full">
                <p className="text-lg font-semibold text-[#D61355]">
                  ক্রেতাদের কথা
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F6E43] my-3">
                  নিয়মিত কাস্টমারদের রিভিউ সমূহ
                </h1>
                <p className="text-lg font-medium">
                  বিষাদ্ধ ও খাঁটি পণ্য সরবরাহের কারণে আমরা প্রায় সবসময়ই ইতিবাচক
                  মন্তব্য পেয়ে থাকি। আপনার প্রত্যাশিত ফলাফল পেতে সঠিক নিয়মে
                  নিয়মিত ব্যবহার অপরিহার্য। আমাদের লক্ষ্য সবসময় আপনার সন্তুষ্টি
                  নিশ্চিত করা।
                </p>

                <div className="hidden sm:block sm:text-start py-7">
                  <a
                    href="https://wa.me/+8801342106348" // Replace with your full number including country code
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>

              <div className="py-12 px-[5%] bg-[#1F6E43] text-center text-white space-y-5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  নানান রকম অফার আপডেট পেতে <br />
                  আমাদের পেইজে লাইক দিন
                </h1>

                <Link
                  target="_blank"
                  href={"https://www.facebook.com/borkotmoyponno"}
                >
                  <button className="mx-auto text-center bg-bright-orange px-3 py-2 text-lg text-midnight-navy cursor-pointer flex items-center">
                    <FaFacebookF className="text-blue-500 mr-2 text-xl" />{" "}
                    Borkotmoy Ponno
                  </button>
                </Link>

                <Link
                  href="https://www.facebook.com/borkotmoyponno"
                  target="_blank"
                  className="text-base w-fit px-4 py-2 mx-auto mt-3 block text-white rounded"
                >
                  Borkotmoy Ponno— যেখানে প্রতিটি পণ্যের মাঝে থাকে সততা, বিশ্বাস
                  ও খোদাভীতির ছোঁয়া।
                </Link>
              </div>
            </div>
            <div className="-mt-32 px-[10%]">
              <Carousel>
                <CarouselContent className=" h-full mt-20">
              {reviews?.map((review: any, index: number) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/3 h-full"
                        >
                          <div className="bg-white mx-2 p-5 rounded h-full flex flex-col">
                            <p className="text-sm text-[#656565] mb-5 flex-1">
                              {review?.comment}
                            </p>
                            <div className="flex justify-between items-center gap-5">
                              <div className="space-y-2">
                                <p className="text-lg text-[#2A3347] font-semibold">
                                  {review?.name}
                                </p>
                                 <p className="text-sm text-[#656565]">
                                  {review?.location}
                                </p>
                                <p className="text-sm text-[#656565]">
                                  {review?.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="flex justify-center items-center my-10 -mt-2 ">
              <Link
                href="#orderSection"
                className="rounded-none bg-[#FFa800] text-[#0E243A] text-2xl font-bold  py-3 px-5 cursor-pointer mt-16"
              >
                অর্ডার করতে চাই
              </Link>
            </div>

           {/* Related Products */}
      {otherProducts.length > 0 && (
        <section className="py-14 bg-pageColor">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-forest-green mb-8 text-center">
              আরও পণ্য দেখুন
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {otherProducts.map((p) => (
                <div
                  className="group bg-white border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <div
                  className="relative h-36 overflow-hidden bg-gray-50">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-midnight-navy line-clamp-2 mb-1">
                      {p.name}
                    </p>
                    <p className="text-sm font-bold text-forest-green">
                      ৳ {p.price}
                    </p>
                  </div>
                   <div className="flex gap-2 mt-auto pt-3">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-forest-green hover:bg-deepGreen text-white text-sm py-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingCart size={14} />
            কার্টে যোগ
          </button>
          <Link
            href={`/step/${product?.slug}`}
            className="border border-forest-green text-forest-green cursor-pointer hover:bg-forest-green hover:text-white text-sm px-3 py-2 transition-colors"
          >
            বিস্তারিত
          </Link>
        </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopDetails;

