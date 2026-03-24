"use client";
import {
  useHandleFindSingleOrderQuery,
  useHandleUpdateOrderDataMutation,
} from "@/redux/features/order/orderApi";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";

import { useParams } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */
interface ProductInForm {
  product: string; // product _id
  quantity: number; // quantity ordered
  price: number; // ***line‑total*** price (unit × qty)
  _id?: string; // react key helper
}

interface UserInForm {
  name: string;
  phone: string;
  address: string;
}

interface PaymentInfoInForm {
  method: string;
  status: string;
}

interface OrderFormValues {
  user: UserInForm;
  paymentInfo: PaymentInfoInForm;
  products: ProductInForm[];
  shippingArea: string;
  totalAmount: number;
  orderStatus: string;
}

/* -------------------------------------------------------------------------- */
/*                               Main component                               */
/* -------------------------------------------------------------------------- */
const UpdateOrder = () => {
  /* ---------------------------- read route param --------------------------- */
  const params = useParams();
  const id = params?.id as string;
 

  /* ------------------------- fetch order & products ------------------------ */
  const { data: singleOrderData, isLoading: singleOrderLoading } =
    useHandleFindSingleOrderQuery(id);
  const mainData = singleOrderData?.payload;
  

  const { data: productListData, isLoading: productsLoading } =
    useHandleFindProductQuery({});
  

  const productOptions = React.useMemo(() => {
    if (!productListData?.payload) return [];
    const raw = Array.isArray(productListData.payload)
      ? productListData.payload
      : productListData.payload.products;
    const options = Array.isArray(raw)
      ? raw.map((p: any) => ({
          id: p._id,
          name: p.productName.replace(/<[^>]+>/g, ""), // strip HTML
          unitPrice: p.price,
        }))
      : [];
    
    return options;
  }, [productListData]);

  /* --------------------------- mutation handle ----------------------------- */
  const [handleUpdateOrderData, { isLoading: updateOrderLoading }] =
    useHandleUpdateOrderDataMutation();

  /* ----------------------------- react‑hook‑form --------------------------- */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<OrderFormValues>({
    defaultValues: {
      user: {
        name: mainData?.user?.name || "",
        phone: mainData?.user?.phone || "",
        address: mainData?.user?.address || "",
      },
      paymentInfo: {
        method: mainData?.paymentInfo?.method || "cash",
        status: mainData?.paymentInfo?.status || "pending",
      },
      products:
        mainData?.products?.map((line: any) => ({
          ...line,
          price: line.price,
        })) || [],
      shippingArea: mainData?.shippingArea || "dhakaCity",
      totalAmount: mainData?.totalAmount || 0,
      orderStatus: mainData?.orderStatus || "processing",
    },
  });

  /* -------- update form defaults when the single order finally loads ------- */
  React.useEffect(() => {
    if (mainData) {
     
      reset({
        user: {
          name: mainData.user?.name || "",
          phone: mainData.user?.phone || "",
          address: mainData.user?.address || "",
        },
        paymentInfo: {
          method: mainData.paymentInfo?.method || "cash",
          status: mainData.paymentInfo?.status || "pending",
        },
        products:
          mainData.products?.map((p: any) => ({
            product: p.product?._id || p.product,
            quantity: p.quantity,
            price: p.price,
            _id: p._id,
          })) || [],
        shippingArea: mainData.shippingArea || "dhakaCity",
        totalAmount: mainData.totalAmount || 0,
        orderStatus: mainData.orderStatus || "processing",
      });
    }
  }, [mainData, reset]);

  /* ----------------- recompute total when qty / price / ship  -------------- */
  const watchProducts = watch("products");
  const watchShippingArea = watch("shippingArea");

  React.useEffect(() => {
    // This would ideally calculate shipping based on products and area
    // For now, we'll just recalculate the products total
    const productsTotal = watchProducts?.reduce(
      (acc: number, cur) => acc + Number(cur.price),
      0
    );
    setValue("totalAmount", productsTotal);
  }, [watchProducts, watchShippingArea, setValue]);

  /* ---------------------------- submit handler ----------------------------- */
  const onSubmit: SubmitHandler<OrderFormValues> = async (values) => {
   
    try {
      await handleUpdateOrderData({ id, payload: values }).unwrap();
      toast.success("Order updated successfully ✨");
    } catch (error: any) {
      console.error("❌ Error updating order:", error);
      toast.error(error?.data?.message || "Failed to update order");
    }
  };

  /* ---------------------- loading state & early return --------------------- */
  if (singleOrderLoading || productsLoading) {
   
    return <div>Loading...</div>;
  }
  if (!mainData) {
    return <div className="text-red-500">Could not load order data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Order</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* User Info */}
        <fieldset className="border p-4 rounded">
          <legend className="font-semibold mb-2">User Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="user-name">
                Name
              </label>
              <input
                id="user-name"
                className="w-full p-2 border rounded"
                {...register("user.name", { required: "Name is required" })}
              />
              {errors.user?.name && (
                <span className="text-red-600 text-sm">
                  {errors.user.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="user-phone">
                Phone
              </label>
              <input
                id="user-phone"
                className="w-full p-2 border rounded"
                {...register("user.phone", { required: "Phone is required" })}
              />
              {errors.user?.phone && (
                <span className="text-red-600 text-sm">
                  {errors.user.phone.message}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="user-address">
                Address
              </label>
              <input
                id="user-address"
                className="w-full p-2 border rounded"
                {...register("user.address", {
                  required: "Address is required",
                })}
              />
              {errors.user?.address && (
                <span className="text-red-600 text-sm">
                  {errors.user.address.message}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        {/* Payment Info */}
        <fieldset className="border p-4 rounded">
          <legend className="font-semibold mb-2">Payment Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block mb-1 font-medium"
                htmlFor="payment-method"
              >
                Method
              </label>
              <select
                id="payment-method"
                className="w-full p-2 border rounded"
                {...register("paymentInfo.method", { required: true })}
                defaultValue="cash"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div>
              <label
                className="block mb-1 font-medium"
                htmlFor="payment-status"
              >
                Status
              </label>
              <select
                id="payment-status"
                className="w-full p-2 border rounded"
                {...register("paymentInfo.status", { required: true })}
                defaultValue="pending"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Shipping Area */}
        <div className="border p-4 rounded">
          <label className="block mb-2 font-medium" htmlFor="shipping-area">
            Shipping Area
          </label>
          <select
            id="shipping-area"
            className="w-full p-2 border rounded"
            {...register("shippingArea", { required: true })}
          >
            <option value="dhakaCity">Dhaka City</option>
            <option value="dhakaCityOuter">Dhaka Outer City</option>
            <option value="outsideDhaka">Outside Dhaka</option>
          </select>
        </div>

        {/* Products List */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Products</h3>
          {watch("products")?.map((prod, index) => {
            // Handle both nested and direct product structures
            const productData = prod.product || prod;
            const selected = productOptions.find((p) =>
              typeof productData === "object" && productData !== null
                ? p.id ===
                  (productData._id || (productData as ProductInForm).product)
                : p.id === productData
            );
            const unitPrice = selected
              ? selected.unitPrice
              : (typeof productData === "object" && productData !== null
                  ? productData.price
                  : 0) || 0;

            return (
              <div
                key={prod._id || index}
                className="border p-3 rounded mb-3 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {/* Product selector */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    {...register(`products.${index}.product` as const, {
                      required: "Product is required",
                    })}
                    value={
                      typeof productData === "object" && productData !== null
                        ? productData._id ||
                          (productData as ProductInForm).product
                        : productData
                    }
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const opt = productOptions.find(
                        (p) => p.id === selectedId
                      );
                      if (opt) {
                        const lineTotal = opt.unitPrice * prod.quantity;
                        setValue(
                          `products.${index}.product` as const,
                          selectedId
                        );
                        setValue(`products.${index}.price` as const, lineTotal);
                      }
                    }}
                  >
                    {productOptions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    {...register(`products.${index}.quantity` as const, {
                      required: "Quantity is required",
                      min: 1,
                      valueAsNumber: true,
                    })}
                    value={prod.quantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      setValue(`products.${index}.quantity` as const, qty);
                      const lineTotal = unitPrice * qty;
                      setValue(`products.${index}.price` as const, lineTotal);
                    }}
                  />
                  {errors.products?.[index]?.quantity && (
                    <span className="text-red-500 text-sm">
                      {errors.products[index]?.quantity?.message}
                    </span>
                  )}
                </div>

                {/* Line Total Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded bg-gray-100"
                    {...register(`products.${index}.price` as const, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    value={prod.price}
                    readOnly
                  />
                </div>

                {/* Display product name (optional) */}
                <div className="md:col-span-3">
                  <p className="text-sm text-gray-600">
                    {typeof productData === "object" &&
                    "productName" in productData &&
                    typeof productData.productName === "string" &&
                    productData.productName
                      ? productData.productName.replace(/<[^>]*>/g, "")
                      : selected?.name || "No product name"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Amount */}
        <div className="mt-6">
          <label className="block mb-1 font-medium" htmlFor="total-amount">
            Total Amount
          </label>
          <input
            id="total-amount"
            type="number"
            className="w-full p-2 border rounded bg-gray-100"
            {...register("totalAmount", { valueAsNumber: true })}
            readOnly
          />
        </div>

        {/* Order Status */}
        <div className="mt-6">
          <label className="block mb-1 font-medium" htmlFor="order-status">
            Order Status
          </label>
          <select
            id="order-status"
            className="w-full p-2 border rounded"
            {...register("orderStatus", { required: true })}
            defaultValue="processing"
          >
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            disabled={updateOrderLoading}
          >
            {updateOrderLoading ? "Updating…" : "Update Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrder;
