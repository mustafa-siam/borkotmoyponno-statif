"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { pdf } from "@react-pdf/renderer";
import { format } from "date-fns";
import { useHandleFindSingleOrderQuery } from "@/redux/features/order/orderApi";
import OrderInvoice from "@/components/OrderInvoice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiDownload } from "react-icons/fi";

// Utility function to strip HTML tags
function stripHtmlTags(str: string) {
  if (!str) return "";
  return str.replace(/<[^>]+>/g, "");
}

export default function ShopCart() {
  const [response, setResponse] = useState<any>(null);
  const [Id, setId] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem("orderData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setResponse(parsed);
      setId(parsed?.payload?._id);
    }
  }, []);

  const { data } = useHandleFindSingleOrderQuery(Id, { skip: !Id });

  const products = data?.payload?.products;

  useEffect(() => {
    if (data && products) {
      const items = products.map((item: any) => ({
        item_id: item?.product?._id,
        item_slug: item?.product?.slug,
        price: Number(item?.price),
        item_name: stripHtmlTags(item?.product?.productName),
        item_image: item?.product?.productImage,
        item_tag_line: stripHtmlTags(item?.product?.tagline),
        shipping_cost: item?.product?.shipping,
        unit: stripHtmlTags(item?.product?.unit),
        buyingReason: {
          heading: stripHtmlTags(item?.product?.buyingReason?.heading),
          steps: item?.product?.buyingReason?.steps,
        },
        hadith: stripHtmlTags(item?.product?.hadith),
        benefits: {
          heading: stripHtmlTags(item?.product?.benefits?.heading),
          steps: item?.product?.benefits?.steps,
        },
        category: item?.product?.category,
        quantity: item?.quantity,
        prvPrice: item?.product?.prvPrice,
      }));

      window.dataLayer?.push({
        event: "purchase",
        ecommerce: {
          transaction_id: response?.payload?._id,
          value: response?.payload?.totalAmount,
          tax: 0,
          shipping: response?.payload?.shippingCost,
          currency: "BDT",
          items: items,
          userInfo: {
            name: response?.payload?.user?.name || "N/A",
            phone: response?.payload?.user?.phone || "N/A",
            address: response?.payload?.user?.address || "N/A",
          },
        },
      });
    }
  }, [data, products, response]);

  const handleDownloadInvoice = async () => {
    setLoading(true);
    const blob = await pdf(
      <OrderInvoice payload={response.payload} products={products} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${response.payload.trackingId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    router.push("/");
    setLoading(false);
  };

  return (
    <div className="bg-pageColor min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* === Header === */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3">
            <svg
              className="h-9 w-9 text-forest-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h1 className="text-2xl sm:text-3xl font-bold text-midnight-navy">
              Thank you for your order!
            </h1>
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            Your order has been placed successfully and is being processed.
          </p>
        </div>

        {/* === Main Content Card === */}
        <div className="bg-white p-6 sm:p-8 border border-gray-100 shadow-sm space-y-8">
          {/* --- Order Summary Header --- */}
          <div className="flex justify-between items-start flex-wrap gap-4 pb-6 border-b border-gray-100">
            <div>
              <h2 className="font-semibold text-base text-midnight-navy">
                Order ID:{" "}
                <span className="font-mono text-forest-green">
                  {response?.payload?.trackingId}
                </span>
              </h2>
              <p className="text-gray-400 text-sm">
                Placed on{" "}
                {response?.payload?.createdAt
                  ? format(new Date(response.payload.createdAt), "MMMM d, yyyy")
                  : "N/A"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs mb-1">Order Total</p>
              <span className="text-2xl font-bold text-midnight-navy">
                ৳{response?.payload?.totalAmount}
              </span>
            </div>
          </div>

          {/* --- Customer & Order Details --- */}
          <div className="grid md:grid-cols-2 gap-8 bg-gray-50/50 p-5">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 pb-2 mb-3 border-b border-gray-100">
                Customer Information
              </h3>
              <p className="text-gray-600">
                <b className="font-medium text-gray-800">Name:</b>{" "}
                {response?.payload?.user?.name}
              </p>
              <p className="text-gray-600">
                <b className="font-medium text-gray-800">Phone:</b>{" "}
                {response?.payload?.user?.phone}
              </p>
              <p className="text-gray-600">
                <b className="font-medium text-gray-800">Address:</b>{" "}
                {response?.payload?.user?.address}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 pb-2 mb-3 border-b border-gray-100">
                Order Details
              </h3>
              <p className="flex items-center gap-3 text-gray-600">
                <b className="font-medium text-gray-800">Payment:</b>
                <span className="bg-forest-green/10 text-forest-green text-xs font-semibold py-1 px-3">
                  {response?.payload?.paymentInfo?.method === "cash"
                    ? "Cash on Delivery"
                    : response?.payload?.paymentInfo?.method}
                </span>
              </p>
              <p className="text-gray-600">
                <b className="font-medium text-gray-800">Delivery Charge:</b> ৳
                {response?.payload?.shippingCost}
              </p>
            </div>
          </div>

          {/* --- Products Table --- */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Items Ordered
            </h3>
            <div className="border border-gray-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="text-gray-400 text-xs uppercase tracking-wider font-medium">
                      Product
                    </TableHead>
                    <TableHead className="text-center text-gray-400 text-xs uppercase tracking-wider font-medium">
                      Quantity
                    </TableHead>
                    <TableHead className="text-right text-gray-400 text-xs uppercase tracking-wider font-medium pr-5">
                      Price
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((item: any, i: any) => (
                    <TableRow key={i} className="hover:bg-gray-50/50 border-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.product.productImage}
                            width={64}
                            height={64}
                            alt={item.product.productName}
                            className="border border-gray-100"
                          />
                          <span
                            className="font-medium text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: item.product.productName,
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold text-midnight-navy pr-5">
                        ৳{item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* --- Totals Summary --- */}
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>
                  ৳
                  {response?.payload?.totalAmount -
                    response?.payload?.shippingCost}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery charge</span>
                <span>৳{response?.payload?.shippingCost}</span>
              </div>
              <div className="border-t border-gray-100 my-2"></div>
              <div className="flex justify-between text-base font-semibold text-midnight-navy">
                <span>Total</span>
                <span>৳{response?.payload?.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* --- Action Button --- */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center justify-center gap-2 bg-forest-green text-white py-2.5 px-6 hover:bg-deepGreen text-sm font-medium cursor-pointer transition-colors duration-300"
            >
              <FiDownload />
              {loading ? "Generating..." : " Download Invoice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
