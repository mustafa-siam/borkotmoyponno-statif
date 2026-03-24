import React, { useState } from "react";
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
import { useHandleMultipleOrderStatusMutation } from "@/redux/features/order/orderApi";
import toast from "react-hot-toast";

interface MultiOrderStatusProps {
  selectedOrders: string[]; 
  onSuccess?: () => void;   
  refetch?: () => void;
}

const MultiOrderStatus: React.FC<MultiOrderStatusProps> = ({
  selectedOrders,
  onSuccess,
  refetch
}) => {
  const [newStatus, setNewStatus] = useState("processing");
  const [handleUpdateMulti, { isLoading }] =
    useHandleMultipleOrderStatusMutation();

  const handleStatusUpdate = async () => {
    if (selectedOrders.length === 0) {
      toast.error("No orders selected.");
      return;
    }

    try {
      await handleUpdateMulti({
        ids: selectedOrders,
        orderStatus: newStatus,
      }).unwrap();

      if (onSuccess) onSuccess();
      if (refetch) refetch();
      toast.success("Order status updated successfully.");
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-1 cursor-pointer flex justify-center items-center gap-2">
          Update Status
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to update the status of {selectedOrders.length} order(s)?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select New Status:
          </label>
          <select
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
            onClick={handleStatusUpdate}
          >
            {isLoading ? "Updating..." : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MultiOrderStatus;
