"use client";

import OrderInvoice from "@/components/OrderInvoice";
import { useHandleFindSingleOrderQuery } from "@/redux/features/order/orderApi";
import { pdf } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DownloadInvoiceButton({ payload }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const Id = payload?._id;

  const { data } = useHandleFindSingleOrderQuery(Id, { skip: !Id });
  const products = data?.payload?.products;

  const handleDownloadInvoice = async () => {
    setIsLoading(true);
    try {
      const blob = await pdf(
        <OrderInvoice payload={payload} products={products} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${payload.trackingId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p
        onClick={!isLoading ? handleDownloadInvoice : undefined}
        className={`text-blue-600 cursor-pointer flex items-center gap-2 ${
          isLoading ? "opacity-70 pointer-events-none" : ""
        }`}
      >
        {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
        {isLoading ? "Generating..." : "Invoice"}
      </p>
    </div>
  );
}
