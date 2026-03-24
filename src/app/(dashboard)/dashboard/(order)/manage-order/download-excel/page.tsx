"use client"; // ⚛️ React Core
import React, { useEffect, useRef, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

// 🧱 UI Components - Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 🧱 UI Components - Dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// 🧱 UI Components - Miscellaneous
import { Skeleton } from "@/components/ui/skeleton";


// 📦 Redux API Hooks (data-related)
import {
  useHandleDeleteOrderMutation,
  useHandleFindOrder2Query,
} from "@/redux/features/order/orderApi";

// 🔔 Notifications
import toast from "react-hot-toast";

// 🎨 Icons - Lucide
import {
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";
import { LogsModal, ManageOrdertModal, UpdateStatus } from "../Dialogboxs";

import { Button } from "@/components/ui/button";

import { exportToExcel } from "@/utils/exportToExcel";
import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import DateTimePicker from "@/components/layout/dashboard/DateTimeRangePicker";
import { useHandleFindCategoryQuery } from "@/redux/features/categories/categoriesApi";
import DownloadInvoiceButton from "@/components/layout/dashboard/DownloadInvoiceButton";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { Input } from "@/components/ui/input";
// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  orderStatus: string; // URL of the image associated with the data (e.g., thumbnail)
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
  orderedAt: string; // ISO date string when the data was last updated
  trackingId: string; // Unique tracking ID for the order
  paymentInfo: {
    method: string;
    status: string;
    bkashTransactionId: string;
    bkashPhone: string;
    cashPaymentMessage: string;
  };
  products: any[];
  logs: any[];
  shippingCost: number;
  totalAmount: number;
  user: {
    address: string;
    name: string;
    phone: string;
  };
}

interface IData2 {
  userName: string;
  userPhone: string;
  userAddress: string;
  orderStatus: string;
  orderedAt: string;
  trackingId: string;
  totalAmount: number;
  shippingCost: number;
  paymentMethod: string;
  paymentStatus: string;
  bkashPhone?: string;
  bkashTransactionId?: string;
  [key: string]: any; // to allow dynamic product fields
}

interface ICategory {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  categoryName: string; // Title of the data
  categoryPhoto: string; // URL of the image associated with the data (e.g., thumbnail)
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

const DownloadExel = () => {
  //  State management for the search and pagination features
  const [searchText, setSearchText] = useState<string>(""); // Stores the search query
  const [status, setStatus] = useState<string>(""); // Stores the search query
  const searchRef = useRef<HTMLInputElement>(null); // Reference to the search input
  const [isSearching, setIsSearching] = useState<boolean>(false); // Tracks if a search is ongoing
  const [isLoadingLimit, setIsLoadingLimit] = useState<boolean>(false); // Loading state for limit change
  // const [date, setDate] = useState<string>("");
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);
  const [appliedStart, setAppliedStart] = useState<string | undefined>();
  const [appliedEnd, setAppliedEnd] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string>("");
  // Query to fetch all data based on pagination and search text
  const { data, refetch, isLoading, error } = useHandleFindOrder2Query({
    search: searchText, // The search text to filter data
    status,
    // date,
    startDateTime: appliedStart,
    endDateTime: appliedEnd,
    categoryId: categoryId,
  });

  const { data: user } = useLoggedInUserQuery();
  const userModerator = user?.payload;

  console.log({ error });

  // Mutation to handle data deletion
  const [handleDeleteOrder, { isLoading: isDeleting }] =
    useHandleDeleteOrderMutation();

  // Function to delete a selected data
  const handleDelete = async (id: string) => {
    try {
      const productsForDelete = allData.find((item: any) => item?._id === id);
      const ids = productsForDelete?.products?.map((item: any) => item._id);

      const OrderIds = {
        id,
        ids,
      };

      await handleDeleteOrder(OrderIds).unwrap(); // Call the delete mutation
      refetch(); // Re-fetch the list of data after deletion
      toast.success("Successfully deleted data!"); // Show success toast
    } catch (error: any) {
      const message = error?.data?.payload?.message || "Something went wrong"; // Handle error
      toast.error(message); // Show error toast
    }
  };


  // Extracting the data list and total pages from the response
  const allData: IData[] = data?.payload?.orders || [];


  // Query to fetch all data based on pagination and search text
  const { data: category } = useHandleFindCategoryQuery({});
  // Extracting the data list and total pages from the response
  const allCategory: ICategory[] = category?.payload || [];

  // Function to handle search
  const handleSearch = async () => {
    setIsSearching(true);
    const trimmedValue = searchRef.current?.value.trim() || ""; // Trim whitespace from the search query
    setSearchText(trimmedValue);
    toast.success(`Searching for "${trimmedValue || "all"}"`); // Show search message
    await refetch(); // Refetch the data based on the new search query
    setIsSearching(false);
  };
  
  // Function to handle changes in items per page (pagination limit)
  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsLoadingLimit(true); // Set loading state for limit change
    setStatus(e.target.value); // Update the limit based on user selection
    await refetch(); // Refetch the data with the new limit
    setIsLoadingLimit(false);
  };
  const handleStatusCategory = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsLoadingLimit(true); // Set loading state for limit change
    setCategoryId(e.target.value); // Update the limit based on user selection
    await refetch(); // Refetch the data with the new limit
    setIsLoadingLimit(false);
  };
  const handleResetFilter = () => {
    setStartDateTime(null);
    setEndDateTime(null);
    setAppliedStart(undefined);
    setAppliedEnd(undefined);
  };
  const handleApplyDateFilter = () => {
    setAppliedStart(startDateTime?.toISOString());
    setAppliedEnd(endDateTime?.toISOString());
  };

  const handleExport = () => {
    const dataForExport: IData2[] =
      allData?.map((item) => {
        const baseData: any = {
          "User name": item.user?.name || "",
          "User phone": item.user?.phone || "",
          "User address": item.user?.address || "",
          "Order status": item.orderStatus,
          "Create time": new Date(item.orderedAt).toLocaleString(),
          "Tracking id": item.trackingId || "",
          "Total amount": item.totalAmount,
          "Shipping cost": item.shippingCost,
          "Payment method": item.paymentInfo?.method || "",
          "Payment status": item.paymentInfo?.status || "",
          "Bkash phone": item.paymentInfo?.bkashPhone || "",
          "Bkash transaction id": item.paymentInfo?.bkashTransactionId || "",
        };

        item.products?.forEach((productItem, index) => {
          const productNumber = index + 1;
          const cleanProductName =
            productItem.product?.productName?.replace(/<\/?[^>]+(>|$)/g, "") ||
            "";

          baseData[`product-${productNumber}:product-name`] = cleanProductName;
          baseData[`product-${productNumber}:price`] = productItem.price;
          baseData[`product-${productNumber}:quantity`] = productItem.quantity;
        });

        return baseData;
      }) || [];
    exportToExcel(dataForExport, "Order_List");
  };

  // Use effect to trigger refetch when search text changes
  useEffect(() => {
    if (searchText === "") {
      refetch(); // Refetch all data if the search text is empty
    }
  }, [searchText, refetch]);

  const statusIcons: Record<string, string> = {
    processing: "🔄",
    confirmed: "✅",
    shipped: "📦",
    delivered: "📬",
    cancelled: "❌",
  };

  const selectedStatus = status || "All";
  return (
    <div>
      <div>
        {/* Heading */}
        <div className="mb-5 flex justify-between flex-wrap gap-4 lg:gap-0">
          <Heading
            title="Export to Excel With Custom"
            subTitle="Easily export your data with custom formatting and manage your categories seamlessly."
          />

          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex gap-2 w-[350px]">
              <Input ref={searchRef} placeholder="Enter query" />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 flex-wrap mb-5">
        <div className="flex items-center gap-2 ">
          <label htmlFor="filter" className="text-sm font-medium">
            Filter by order Status:
          </label>
          <select
            id="filter"
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 px-2 py-1 cursor-pointer"
          >
            <option value="">All</option>
            {[
              "processing",
              "confirmed",
              "shipped",
              "delivered",
              "cancelled",
            ].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 ">
          <label htmlFor="category" className="text-sm font-medium">
            Filter by Category:
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={handleStatusCategory}
            className="border border-gray-300 px-2 py-1 cursor-pointer"
          >
            <option value="">All</option>
            {allCategory.map((val) => (
              <option key={val?._id} value={val?._id}>
                {val?.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 ">
          <div className="flex gap-2">
            <DateTimePicker
              label="Start Date & Time"
              selectedDate={startDateTime}
              onChange={setStartDateTime}
            />
            <DateTimePicker
              label="End Date & Time"
              selectedDate={endDateTime}
              onChange={setEndDateTime}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleApplyDateFilter} className="">
              Apply
            </Button>
            <Button variant="outline" onClick={handleResetFilter} className="">
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5 mb-5">
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
        >
          Export to Excel
        </button>
        <br />
        <Button variant="outline" className="">
          {selectedStatus === "All"
            ? `${data?.payload?.meta?.totalAllOrders || 0} orders loaded`
            : `${statusIcons[selectedStatus] || ""} ${
                data?.payload?.meta?.statusCounts?.[selectedStatus] || 0
              } ${selectedStatus} orders loaded`}
        </Button>
      </div>

      {/* Table */}
      <Table className="max-h-[calc(100vh-15rem)] border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead className="w-[20px]"></TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Billing</TableHead>
            <TableHead>Payment Info</TableHead>
            <TableHead>Download Invoice</TableHead>
            <TableHead>Logs</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading || isSearching || isLoadingLimit ? (
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-4/5 my-3 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-6 my-3 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-4/5 my-3 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-4/5 my-3 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-4/5 my-3 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-4/5 my-3 rounded" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-4 my-3 rounded ml-auto mr-2" />
                </TableCell>
              </TableRow>
            ))
          ) : allData.length === 0 || error ? (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center text-gray-500 py-8"
              >
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            allData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    #{item?.trackingId}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ManageOrdertModal
                      item={item}
                      allData={allData}
                      refetch={refetch}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  {item?.createdAt
                    ? formatDistanceToNowStrict(new Date(item.createdAt), {
                        addSuffix: true,
                      })
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {item?.orderStatus === "processing" ? (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    ) : item?.orderStatus === "confirmed" ? (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    ) : item?.orderStatus === "shipped" ? (
                      <Truck className="w-4 h-4 text-purple-600" />
                    ) : item?.orderStatus === "delivered" ? (
                      <PackageCheck className="w-4 h-4 text-green-600" />
                    ) : item?.orderStatus === "cancelled" ? (
                      <XCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-600" />
                    )}

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        item?.orderStatus === "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : item?.orderStatus === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : item?.orderStatus === "shipped"
                          ? "bg-purple-100 text-purple-700"
                          : item?.orderStatus === "delivered"
                          ? "bg-green-100 text-green-700"
                          : item?.orderStatus === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item?.orderStatus || "unknown"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm text-gray-800">
                      <b>{item?.user?.name || "N/A"}</b>{" "}
                      <span>{item?.user?.address || "N/A"}</span>
                    </p>
                    <p className="text-gray-500 mt-1 text-xs">
                      Delivary on {item?.paymentInfo?.method} payment
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <Eye className="w-4 h-4 text-blue-600" />
                        View
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Info from {item?.user?.name || "N/A"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {item?.paymentInfo?.bkashTransactionId ? (
                            <div>
                              <p>
                                <strong>Bkash Transaction ID:</strong>{" "}
                                {item.paymentInfo.bkashTransactionId}
                              </p>
                              <p>
                                <strong>Bkash Phone:</strong>{" "}
                                {item.paymentInfo.bkashPhone}
                              </p>
                            </div>
                          ) : item?.paymentInfo?.cashPaymentMessage ? (
                            <div>
                              <p>
                                <strong>Cash Payment Details:</strong>{" "}
                                {item.paymentInfo.cashPaymentMessage}
                              </p>
                            </div>
                          ) : item.paymentInfo?.method === "cash" ? (
                            <>
                              <p>
                                <b>Payment Type: </b>Cash on Delivery
                              </p>
                              <p>
                                <b>Payment Status: </b>
                                {item?.paymentInfo?.status}
                              </p>
                              <p></p>
                            </>
                          ) : (
                            <p>No payment information available</p>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>

                <TableCell>
                  {/* Other order details */}
                  <DownloadInvoiceButton payload={item} />
                </TableCell>

                <TableCell>
                  <LogsModal logs={item?.logs} />
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full cursor-pointer">
                        <MoreHorizontal />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <UpdateStatus item={item} refetch={refetch} />
                      <div className="">
                        {userModerator?.role == "admin" && (
                          <GlobalDelete
                            onConfirm={() => handleDelete(item?._id)}
                            loading={isDeleting}
                          />
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DownloadExel;
