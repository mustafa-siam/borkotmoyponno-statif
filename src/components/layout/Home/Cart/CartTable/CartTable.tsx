import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";

export function stripHtmlTags(str: string) {
  if (!str) return "";
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export default function CartTable({
  cartProducts,
  setCartProducts,
  loading,
}: any) {
  const updateLocalStorage = (updatedCart: any[]) => {
    const simplified = updatedCart.map((item) => ({
      product: item.payload.slug,
      quantity: item.quantity,
    }));
    localStorage.setItem("ponnoBariCart", JSON.stringify(simplified));
    console.log(simplified)
  };


  const updateQuantity = (slug: string, type: "increment" | "decrement") => {
    setCartProducts((prev: any[]) => {
      const updated = prev.map((item) => {
        if (item.payload.slug === slug) {
          if (type === "increment") {
            const product = item.payload;
       
            const newQuantity = item.quantity + 1;

            window.dataLayer?.push({
              event: "add_to_cart",
              ecommerce: {
                currency: "BDT",
                items: [
                  {
                    item_id: product?._id,
                    item_slug: product?.slug,
                    price: Number(product?.price),
                    item_name: stripHtmlTags(product.productName),
                    item_image: product?.productImage,
                    item_tag_line: stripHtmlTags(product?.tagline),
                    shipping_cost: product?.shipping,
                    unit: stripHtmlTags(product?.unit),
                    buyingReason: {
                      heading : stripHtmlTags(product?.buyingReason?.heading),
                      steps : product?.buyingReason?.steps
                    },
                    hadith: stripHtmlTags(product?.hadith),
                    benefits: {
                      heading : stripHtmlTags(product?.benefits?.heading),
                      steps : product?.benefits?.steps
                    },
                    category: product?.category,
                    quantity: newQuantity,
                    prvPrice: product?.prvPrice,
                  },
                ],
              },
            });
          }
          const newQty =
            type === "increment"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1); // minimum 1
          return { ...item, quantity: newQty };
        }
        return item;
      });
      updateLocalStorage(updated);
      return updated;
    });
  };

  const removedFromCart = (slug: string) => {
    const storedCart: { product: string; quantity: number }[] = JSON.parse(
      localStorage.getItem("ponnoBariCart") || "[]"
    );

    const updatedCart = storedCart.filter(
      (product) => product.product !== slug
    );

    localStorage.setItem("ponnoBariCart", JSON.stringify(updatedCart));

    setCartProducts((prev: any[]) =>
      prev.filter((item) => item?.payload?.slug !== slug)
    );
    toast.success("Item removed from cart");

    setTimeout(() => {
      window.dispatchEvent(new Event("cartUpdated"));
    }, 100);
  };

  const SkeletonRow = () => (
    <TableRow className="border-gray-50">
      <TableCell>
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 bg-gray-100 animate-pulse" />
          <div className="w-32 h-4 bg-gray-100 animate-pulse" />
        </div>
      </TableCell>
      <TableCell>
        <div className="h-8 w-24 bg-gray-100 animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-10 bg-gray-100 animate-pulse" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-6 bg-gray-100 animate-pulse" />
      </TableCell>
    </TableRow>
  );

  const MobileSkeleton = () => (
    <div className="border border-gray-100 p-3 animate-pulse space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-[70px] w-[70px] bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-100 w-3/4" />
          <div className="h-3 bg-gray-100 w-1/2" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 bg-gray-100" />
        <div className="h-6 w-24 bg-gray-100" />
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white border border-gray-100 p-3 sm:p-4 h-fit">
      {/* Desktop View */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              <TableHead className="text-gray-400 text-xs uppercase tracking-wider">Product</TableHead>
              <TableHead className="text-gray-400 text-xs uppercase tracking-wider">Quantity</TableHead>
              <TableHead className="text-gray-400 text-xs uppercase tracking-wider">Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(3)].map((_, idx) => <SkeletonRow key={idx} />)
            ) : cartProducts?.length < 1 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <p className="text-gray-400 text-sm">
                    No products in the cart
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              cartProducts.map(({ payload, quantity }: any) => (
                <TableRow key={payload._id} className="border-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        height={80}
                        width={80}
                        src={payload?.productImage}
                        alt={payload?.productName}
                        className=""
                      />
                      <span
                        className="w-52 break-words whitespace-normal text-sm text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: payload?.productName,
                        }}
                      ></span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center w-fit p-0.5 text-base border border-gray-200">
                      <span
                        className="cursor-pointer bg-gray-100 p-2 h-7 w-7 flex justify-center items-center hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          updateQuantity(payload.slug, "decrement")
                        }
                      >
                        <FaMinus className="text-xs" />
                      </span>
                      <Input
                        className="w-10 border-none text-center shadow-none text-sm"
                        value={quantity}
                        readOnly
                      />
                      <span
                        className="cursor-pointer bg-gray-100 p-2 h-7 w-7 flex justify-center items-center hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          updateQuantity(payload.slug, "increment")
                        }
                      >
                        <FaPlus className="text-xs" />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-midnight-navy">৳ {payload.price} </TableCell>
                  <TableCell className="text-right">
                    <RxCross2
                      className="text-2xl cursor-pointer border border-gray-200 p-1 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                      onClick={() => removedFromCart(payload.slug)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          [...Array(3)].map((_, idx) => <MobileSkeleton key={idx} />)
        ) : cartProducts?.length < 1 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm text-center">
              No products in the cart
            </p>
          </div>
        ) : (
          cartProducts.map(({ payload, quantity }: any) => (
            <div
              key={payload._id}
              className="border border-gray-100 p-3 relative"
            >
              <div className="flex items-center gap-3">
                <Image
                  height={70}
                  width={70}
                  src={payload?.productImage}
                  alt={payload?.productName}
                  className=""
                />
                <div>
                  <p
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: payload?.productName }}
                  ></p>
                  <p className="text-forest-green text-sm font-medium mt-1">
                    ৳ {payload.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 relative">
                <span className="text-xs text-gray-400">Quantity:</span>
                <div className="flex items-center border border-gray-200 px-1 text-base">
                  <span
                    className="cursor-pointer bg-gray-100 p-1.5 h-6 w-6 flex justify-center items-center"
                    onClick={() => updateQuantity(payload.slug, "decrement")}
                  >
                    <FaMinus className="text-[10px]" />
                  </span>
                  <Input
                    className="w-10 border-none text-center shadow-none text-sm"
                    value={quantity}
                    readOnly
                  />
                  <span
                    className="cursor-pointer bg-gray-100 p-1.5 h-6 w-6 flex justify-center items-center"
                    onClick={() => updateQuantity(payload.slug, "increment")}
                  >
                    <FaPlus className="text-[10px]" />
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-3 absolute top-2 right-2">
                <RxCross2
                  className="text-xl cursor-pointer border border-gray-200 p-0.5 hover:bg-red-50 hover:text-red-500 transition-colors"
                  onClick={() => removedFromCart(payload.slug)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
