"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import GlobalHistoryModal from "@/components/layout/dashboard/shared/GlobalHistoryModal/GlobalHistoryModal";
import GlobalFieldRenderer from "@/components/layout/dashboard/shared/GlobalFieldRenderer/GlobalFieldRenderer";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { GlobalAICommandInput } from "@/components/layout/dashboard/shared/inputs/GlobalAICommandInput/GlobalAICommandInput";
import Heading from "@/components/layout/dashboard/shared/Heading";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormItem, FormLabel } from "@/components/ui/form";
import {
  useHandleFindSingleOrderQuery,
  useHandleUpdateOrderDataMutation,
} from "@/redux/features/order/orderApi";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";

// Types
interface IFormInput {
  userName: string;
  userPhone: string;
  userAddress: string;
  paymentMethod: "cash" | "bkash";
  shippingArea: "dhakaCity" | "dhakaCityOuter" | "outsideDhaka";
  paymentStatus: "pending" | "paid";
  paymenCashPaymentMessage: string;
  paymentBkashTransactionId: string;
  paymentBkashPhone: string;
  orderStatus:
    | "processing"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled";
  products: {
    product: string;
    quantity: number;
  }[];
}

interface Fields {
  label: string;
  valueKey: string;
  placeholder: string;
  type: "text" | "richtext" | "keywords" | "number";
  formType: "string" | "array" | "number";
}
interface Params {
  id: string;
}

const fieldConfig: Fields[] = [
  {
    label: "User Name",
    valueKey: "userName",
    placeholder: "Enter the User Name",
    type: "text",
    formType: "string",
  },
  {
    label: "User Phone",
    valueKey: "userPhone",
    placeholder: "Enter the User Phone",
    type: "text",
    formType: "string",
  },
  {
    label: "User Address",
    valueKey: "userAddress",
    placeholder: "Enter the User Address",
    type: "text",
    formType: "string",
  },
];

const getInitialMetaData = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [];
    } else {
      acc[field.valueKey] = "";
    }
    return acc;
  }, {} as Record<string, any>);
};

const getInitialMetaDataHistory = () => {
  return fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") {
      acc[field.valueKey] = [[]];
    } else {
      acc[field.valueKey] = [];
    }
    return acc;
  }, {} as Record<string, any>);
};

const UpdatePage: React.FC<{ params: Promise<Params> }> = ({ params }) => {
  const [id, setId] = useState<string>("");
  const [metaData, setMetaData] = useState(getInitialMetaData);
  const [metaDataHistory, setMetaDataHistory] = useState(
    getInitialMetaDataHistory
  );
  const [handleUpdateOrderData, { isLoading }] =
    useHandleUpdateOrderDataMutation();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const router = useRouter();
  const [shippingArea, setShippingArea] = useState<string>("dhakaCity");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  const [orderStatus, setOrderStatus] = useState<string>("processing");

  const [paymenCashPaymentMessage, setPaymenCashPaymentMessage] =
    useState<string>("");
  const [paymentBkashTransactionId, setPaymentBkashTransactionId] =
    useState<string>("");
  const [paymentBkashPhone, setPaymentBkashPhone] = useState<string>("");
  const [products, setProducts] = useState<
    { productId: string; quantity: number; price: number }[]
  >([]);

  const { data: productData } = useHandleFindProductQuery({
    search: "", // The search text to filter data
  });
  // Extracting the data list and total pages from the response
  const allData: any[] = productData?.payload || [];

  const [historyModal, setHistoryModal] = useState<{
    open: boolean;
    field: any;
  }>({ open: false, field: null });

  const { data, refetch } = useHandleFindSingleOrderQuery(id);

  // Resolve the params promise and set the slug
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  const defaultValues = fieldConfig.reduce((acc, field) => {
    if (field.formType === "array") acc[field.valueKey] = [];
    else acc[field.valueKey] = "";
    return acc;
  }, {} as Record<string, any>);

  const methods = useForm<IFormInput>({ defaultValues });

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    setIsImageUploading(true);

    try {
      const payload = {
        user: {
          name: metaData?.userName,
          phone: metaData?.userPhone,
          address: metaData?.userAddress,
        },
        paymentInfo: {
          method: paymentMethod,
          status: paymentStatus,
          bkashTransactionId: paymentBkashTransactionId,
          bkashPhone: paymentBkashPhone,
          cashPaymentMessage: paymenCashPaymentMessage,
        },
        orderStatus,
        shippingArea,
        products: products?.map((item) => ({
          product: item?.productId,
          quantity: item?.quantity,
        })),
      };
      await handleUpdateOrderData({
        id,
        payload,
      }).unwrap();
      toast.success("Data updated successfully!");
      refetch();
      router.push("/dashboard/manage-order");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      setIsImageUploading(false);
    }

    // You can send the data to an API or save it to your database here
  };

  const handleProductChange = (index: number, productId: string) => {
    const selectedProduct = allData.find((p) => p._id === productId);
    const updated = [...products];
    updated[index].productId = productId;
    updated[index].price = selectedProduct?.price || 0;
    setProducts(updated);
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    const updated = [...products];
    updated[index].quantity = parseInt(quantity || "1");
    setProducts(updated);
  };

  useEffect(() => {
    if (data?.payload) {
      const payload = data.payload;

      const newMetaData = {
        userName: payload.user?.name || "",
        userPhone: payload.user?.phone || "",
        userAddress: payload.user?.address || "",
      };

      setMetaData(newMetaData);

      // Populate history with the initial values as first entries
      const newMetaDataHistory = {
        userName: payload.user?.name || "",
        userPhone: payload.user?.phone || "",
        userAddress: payload.user?.address || "",
      };

      setMetaDataHistory(newMetaDataHistory);

      // Set form values
      methods.reset({
        userName: payload.user?.name || "",
        userPhone: payload.user?.phone || "",
        userAddress: payload.user?.address || "",
      });

      setId(payload._id);
      setPaymentMethod(payload.paymentInfo?.method);
      setPaymentStatus(payload.paymentInfo?.status);
      setOrderStatus(payload.orderStatus);
      setPaymenCashPaymentMessage(payload.paymentInfo?.cashPaymentMessage);
      setPaymentBkashTransactionId(payload.paymentInfo?.bkashTransactionId);
      setPaymentBkashPhone(payload.paymentInfo?.bkashPhone);
      const shippingCost = {
        dhakaCity: payload?.products?.reduce(
          (acc: number, item: any) =>
            acc + (item.product?.shipping?.dhakaCity || 0),
          0
        ),

        dhakaCityOuter: payload?.products?.reduce(
          (acc: number, item: any) =>
            acc + (item.product?.shipping?.dhakaCityOuter || 0),
          0
        ),

        outsideDhaka: payload?.products?.reduce(
          (acc: number, item: any) =>
            acc + (item.product?.shipping?.outsideDhaka || 0),
          0
        ),
      };

      if (shippingCost?.dhakaCity === payload?.shippingCost) {
        setShippingArea("dhakaCity");
      }
      if (shippingCost?.dhakaCityOuter === payload?.shippingCost) {
        setShippingArea("dhakaCityOuter");
      }
      if (shippingCost?.outsideDhaka === payload?.shippingCost) {
        setShippingArea("outsideDhaka");
      }
    }
  }, [data, methods]);
  useEffect(() => {
    if (data?.payload?.products) {
      const loadedProducts = data.payload.products.map((p: any) => ({
        productId: p.product._id,
        quantity: p.quantity,
        price: p.price,
      }));
      setProducts(loadedProducts);
    }
  }, [data, data?.payload?.products]);

  function stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
  }

  return (
    <div>
      <Heading
        title="Update Category"
        subTitle="Please update your category content."
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 lg:pt-7 lg:w-[60%] space-y-10"
        >
          <GlobalFieldRenderer
            fieldConfig={fieldConfig}
            metaData={metaData}
            setMetaData={setMetaData}
            methods={methods}
            setHistoryModal={setHistoryModal}
            setMetaDataHistory={setMetaDataHistory}
          />
          {products.map((item, index) => (
            <div
              className="flex flex-wrap justify-between items-center gap-5 bg-gray-50 py-5"
              key={index}
            >
              <FormItem className="flex-1">
                <FormLabel>Product Name</FormLabel>
                <Select
                  value={item.productId}
                  onValueChange={(value) => handleProductChange(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Product Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allData?.map((product) => (
                        <SelectItem value={product._id} key={product._id}>
                          {stripHtmlTags(product.productName)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>

              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="w-full border px-4 py-2 flex-1"
                />
              </FormItem>

              <FormItem>
                <FormLabel>Price</FormLabel>
                <input
                  type="text"
                  value={item.price * item.quantity}
                  readOnly
                  className="w-full border px-4 py-2 flex-1 bg-gray-100 cursor-not-allowed"
                />
              </FormItem>
            </div>
          ))}

          <FormItem>
            <FormLabel>Shipping Area</FormLabel>
            <Select
              onValueChange={(value) => setShippingArea(value)}
              value={shippingArea}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Shipping Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="dhakaCity">Dhaka City</SelectItem>
                  <SelectItem value="dhakaCityOuter">
                    Dhaka City Outer
                  </SelectItem>
                  <SelectItem value="outsideDhaka">Out Side Dhaka</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
          <FormItem>
            <FormLabel>Order Status</FormLabel>
            <Select
              onValueChange={(value) => setOrderStatus(value)}
              value={orderStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>

          <FormItem>
            <FormLabel>Payment Status</FormLabel>
            <Select
              onValueChange={(value) => setPaymentStatus(value)}
              value={paymentStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pending">pending</SelectItem>
                  <SelectItem value="paid">paid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>

          <FormItem>
            <FormLabel>Payment Method</FormLabel>
            <Select
              onValueChange={(value) => setPaymentMethod(value)}
              value={paymentMethod}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bkash">bKash</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>

          {paymentMethod === "cash" ? (
            <FormItem>
              <FormLabel>Cash Payment Message</FormLabel>
              <textarea
                placeholder="Enter cash payment message"
                value={paymenCashPaymentMessage}
                onChange={(e) => setPaymenCashPaymentMessage(e.target.value)}
                className="w-full border px-4 py-2 h-40"
              />
            </FormItem>
          ) : (
            <>
              <FormItem>
                <FormLabel>bKash Transaction ID</FormLabel>
                <input
                  type="text"
                  placeholder="Enter bKash transaction ID"
                  value={paymentBkashTransactionId}
                  onChange={(e) => setPaymentBkashTransactionId(e.target.value)}
                  className="w-full border px-4 py-2 "
                />
              </FormItem>

              <FormItem>
                <FormLabel>bKash Phone Number</FormLabel>
                <input
                  type="text"
                  placeholder="Enter bKash phone number"
                  value={paymentBkashPhone}
                  onChange={(e) => setPaymentBkashPhone(e.target.value)}
                  className="w-full border px-4 py-2 "
                />
              </FormItem>
            </>
          )}

          <Button
            type="submit"
            // className="w-full sm:w-auto"
            disabled={isLoading || isImageUploading}
            className={`rounded-none mr-5 ${
              isLoading || isImageUploading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading || isImageUploading ? "Please Wait..." : "Update Level"}
          </Button>

          <GlobalAICommandInput
            metaData={metaData}
            setMetaData={setMetaData}
            setMetaDataHistory={setMetaDataHistory}
            methods={methods}
            fieldConfig={fieldConfig}
          />
        </form>
      </FormProvider>
      <GlobalHistoryModal
        historyModal={historyModal}
        metaData={metaData}
        metaDataHistory={metaDataHistory}
        setMetaData={setMetaData}
        setHistoryModal={setHistoryModal}
        methods={methods}
      />
    </div>
  );
};

export default UpdatePage;
