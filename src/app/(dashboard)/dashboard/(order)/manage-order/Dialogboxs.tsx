"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 🧱 UI Components - Table
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Boxes,
  CheckCircle,
  Clock,
  Clock1,
  Edit2,
  Eye,
  Package,
  PackageCheck,
  ShieldCheck,
  Tag,
  Truck,
  UserCog,
  UserRound,
  XCircle,
} from "lucide-react";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useHandleDeleteOrderMutation,
  useHandleOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LogsModal({ logs }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          <Eye className="w-4 h-4 text-blue-600" />
          View
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] overflow-x-auto">
        <DialogHeader>
          <DialogTitle>Logs</DialogTitle>
          <DialogDescription>
            <Table className="max-h-[calc(100vh-15rem)] border border-gray-200">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date and Time</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {logs?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={30}
                      className="text-center text-gray-500 py-8"
                    >
                      No data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((item: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserRound className="w-4 h-4 text-blue-600" />
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item?.updatedBy?.name,
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item?.updatedBy?.role,
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item?.status === "processing" ? (
                            <Clock className="w-4 h-4 text-yellow-600" />
                          ) : item?.status === "confirmed" ? (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          ) : item?.status === "shipped" ? (
                            <Truck className="w-4 h-4 text-purple-600" />
                          ) : item?.status === "delivered" ? (
                            <PackageCheck className="w-4 h-4 text-green-600" />
                          ) : item?.status === "cancelled" ? (
                            <XCircle className="w-4 h-4 text-red-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-600" />
                          )}

                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
        ${
          item?.status === "processing"
            ? "bg-yellow-100 text-yellow-700"
            : item?.status === "confirmed"
            ? "bg-blue-100 text-blue-700"
            : item?.status === "shipped"
            ? "bg-purple-100 text-purple-700"
            : item?.status === "delivered"
            ? "bg-green-100 text-green-700"
            : item?.status === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700"
        }
      `}
                          >
                            {item?.status || "unknown"}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock1 className="w-4 h-4 text-blue-600" />
                          <span>
                            {item?.updatedAt
                              ? format(new Date(item?.updatedAt), "PPPpp") // "Jun 13, 2025 at 8:57 PM"
                              : "N/A"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateStatus({ item, refetch }: any) {
  const [newStatus, setNewStatus] = useState(item.orderStatus); // or 'user'/'admin'
  const [handleOrderStatus, { isLoading }] = useHandleOrderStatusMutation();
  const handleStatusUpdate = async (id: string) => {
    try {
      const data = {
        id,
        orderStatus: newStatus,
        paymentStatus: item?.paymentInfo?.status,
      };

    

      await handleOrderStatus(data).unwrap();
      toast.success("Successfully updated order status!");
      refetch();
    } catch (error: any) {
      console.log({ error });
      toast.error(error?.data?.payload?.message || "Something went wrong");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 text-blue-600 p-2 hover:bg-blue-50 w-full cursor-pointer">
          <UserCog className="w-4 h-4" />
          Status
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to update the order status?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select New Status:
          </label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="processing">processing</option>
            <option value="confirmed">confirmed</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-blue-600 text-white"
            onClick={() => handleStatusUpdate(item._id)}
          >
            {isLoading ? "Updating..." : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ManageOrdertModal({ item, allData, refetch }: any) {
  const { data: user } = useLoggedInUserQuery();
  const userModerator = user?.payload;

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye className="w-4 h-4 text-blue-600 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Manage Order
          </DialogTitle>
          <DialogTitle className="mt-5">User Information</DialogTitle>
          <DialogDescription>
            <p>
              <b>Name: </b>
              {item?.user?.name}
            </p>
            <p>
              <b>Phone: </b>
              {item?.user?.phone}
            </p>
            <p>
              <b>Address: </b>
              {item?.user?.address}
            </p>
          </DialogDescription>
          <DialogTitle className="mt-5">Products Information</DialogTitle>
          <DialogDescription>
            <Table className="max-h-[calc(100vh-15rem)] border border-gray-200">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>productName</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {item?.products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500 py-8"
                    >
                      No data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  item?.products.map((item: any) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Image
                          width={150}
                          height={100}
                          src={item?.product?.productImage}
                          alt={item?.product?.productName}
                          className="rounded-md object-cover h-20 w-32"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-600" />
                          <p className="overflow-clip w-40"
                            dangerouslySetInnerHTML={{
                              __html:
                                item?.product?.productName
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-blue-600" />
                          <p
                            dangerouslySetInnerHTML={{ __html: item?.price }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Boxes className="w-4 h-4 text-blue-600" />
                          <p
                            dangerouslySetInnerHTML={{ __html: item?.quantity }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right pr-4">
                    <div className="flex justify-between items-center gap-5">
                      <p>
                        <b>Method: </b>
                        {item?.paymentInfo?.method}
                      </p>
                      <p>
                        <b>Status: </b>
                        {item?.paymentInfo?.status}
                      </p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center gap-5">
                      <p>
                        <b>Shipping Cost: </b>
                        {item?.shippingCost}
                      </p>
                      <p>
                        <b>Total amount: </b>
                        {item?.totalAmount}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </DialogDescription>
          <DialogDescription className="flex justify-center items-center gap-5 mt-10">
            {/* Delete Order Dialog */}
            <div className="">
              {userModerator?.role == "admin" && (
                <GlobalDelete
                  onConfirm={() => handleDelete(item?._id)}
                  loading={isDeleting}
                />
              )}
            </div>

            <Button>
              <Link href={`/dashboard/update-order/${item?._id}`}>
                <Edit2 className="w-4 h-4 ml-1 inline" /> Edit
              </Link>
            </Button>

            {/* Update Order Status Dialog */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

