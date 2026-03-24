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
  };

  const updateQuantity = (slug: string, type: "increment" | "decrement") => {
    setCartProducts((prev: any[]) => {
      const updated = prev.map((item) => {
        if (item.payload.slug === slug) {
          if (type === "increment") {
            const product = item.payload;
            window.dataLayer?.push({
              event: "add_to_cart",
              ecommerce: {
                items: [
                  {
                    item_id: product._id,
                    item_name: stripHtmlTags(product.productName),
                    price: product.price,
                    quantity: 1,
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
    // Step 1: Get stored cart IDs
    const storedCart: string[] = JSON.parse(
      localStorage.getItem("ponnoBariCart") || "[]"
    );

    // Step 2: Remove the selected product ID
    const updatedCart = storedCart.filter(
      (product: any) => product.product !== slug
    );

    // Step 3: Update localStorage with the correct key
    localStorage.setItem("ponnoBariCart", JSON.stringify(updatedCart));

    // Step 4: Update UI (cartProducts state)
    setCartProducts((prev: any[]) =>
      prev.filter((item) => item?.payload?.slug !== slug)
    );
    toast.success("Item removed from cart");

    setTimeout(() => {
      window.dispatchEvent(new Event("cartUpdated"));
    }, 100);
  };

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-5">
          <div className="h-[100px] w-[100px] bg-gray-200 animate-pulse rounded" />
          <div className="w-32 h-6 bg-gray-200 animate-pulse rounded" />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-full" />
        </div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-10 bg-gray-200 animate-pulse rounded hidden sm:hidden" />
      </TableCell>
      <TableCell>
        <RxCross2 className="text-xl hidden sm:hidden" />
      </TableCell>
    </TableRow>
  );

  const MobileSkeleton = () => (
    <div className="border rounded-lg p-4 shadow-sm animate-pulse space-y-4">
      {/* Image & title row */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 bg-gray-300 rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>

      {/* Quantity row */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-300 rounded-full" />
          <div className="h-6 w-10 bg-gray-200 rounded" />
          <div className="h-6 w-6 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Cross icon */}
      <div className="absolute top-0 right-3">
        <div className="h-7 w-7 bg-gray-300 rounded-full" />
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white p-2 h-fit">
      {/* 🖥 Desktop View (Table) */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#808080]">Product</TableHead>
              <TableHead className="text-[#808080]">Quantity</TableHead>
              <TableHead className="text-[#808080]">Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(3)].map((_, idx) => <SkeletonRow key={idx} />)
            ) : cartProducts?.length < 1 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <p className="text-gray-500 text-lg font-medium">
                    🛒 No products in the cart
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              cartProducts.map(({ payload, quantity }: any) => (
                <TableRow key={payload._id}>
                  <TableCell>
                    <div className="flex items-center gap-5">
                      <Image
                        height={100}
                        width={100}
                        src={payload?.productImage}
                        alt={payload?.productName}
                      />
                      <span
                        className="w-60 break-words whitespace-normal"
                        dangerouslySetInnerHTML={{
                          __html: payload?.productName,
                        }}
                      ></span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center rounded-full w-fit p-1 text-xl border">
                      <span
                        className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                        onClick={() =>
                          updateQuantity(payload.slug, "decrement")
                        }
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
                        onClick={() =>
                          updateQuantity(payload.slug, "increment")
                        }
                      >
                        <FaPlus />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>৳ {payload.price} </TableCell>
                  <TableCell className="text-right">
                    <RxCross2
                      className="text-3xl cursor-pointer border-3 rounded-full p-1"
                      onClick={() => removedFromCart(payload.slug)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 📱 Mobile View (Card) */}
      <div className="sm:hidden space-y-4">
        {loading ? (
          [...Array(3)].map((_, idx) => <MobileSkeleton key={idx} />)
        ) : cartProducts?.length < 1 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg font-medium text-center">
              🛒 No products in the cart
            </p>
          </div>
        ) : (
          cartProducts.map(({ payload, quantity }: any) => (
            <div
              key={payload._id}
              className="border rounded-lg p-4 shadow-sm relative"
            >
              <div className="flex items-center gap-4">
                <Image
                  height={80}
                  width={80}
                  src={payload?.productImage}
                  alt={payload?.productName}
                />
                <div>
                  <p
                    dangerouslySetInnerHTML={{ __html: payload?.productName }}
                  ></p>
                  <p className="text-gray-600 text-sm mt-1">
                    Price: {payload.price} ৳
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 relative">
                <span className="text-sm text-gray-500">Quantity:</span>
                <div className="flex items-center border rounded-full px-2 text-xl">
                  <span
                    className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                    onClick={() => updateQuantity(payload.slug, "decrement")}
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
                    onClick={() => updateQuantity(payload.slug, "increment")}
                  >
                    <FaPlus />
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-3 absolute top-0 right-3">
                <RxCross2
                  className="text-3xl cursor-pointer rounded-full border p-1"
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
