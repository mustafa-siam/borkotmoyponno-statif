"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import {
    useHandleChangeOrderBannerMutation,
  useHandleDeleteBannerMutation,
  useHandleFindBannerQuery,
} from "@/redux/features/banner/bannerApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BannerRow } from "./BannerRow";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { exportToExcel } from "@/utils/exportToExcel";

interface IData {
  _id: string;
  slug: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

const ManagePage = () => {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [bannerData, setBannerData] = useState<IData[]>([]);

  const { data, refetch, isLoading } = useHandleFindBannerQuery({});
  const [handleChangeOrderBanner] = useHandleChangeOrderBannerMutation();
  const allData: IData[] = useMemo(() => data?.payload || [], [data?.payload]);

  const [handleDeleteBanner, { isLoading: isDeleting }] =
    useHandleDeleteBannerMutation();

  // Sync API data to local state for drag & drop reordering
  useEffect(() => {
    if (allData.length) {
      setBannerData(allData);
    }
  }, [allData]);

  const allSelected =
    bannerData.length > 0 && selectedData.length === bannerData.length;

  const handleSelectAll = () => {
    setSelectedData(allSelected ? [] : bannerData.map((data) => data._id));
  };

  const handleSelect = (id: string) => {
    setSelectedData((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await handleDeleteBanner(id).unwrap();
      refetch();
      toast.success("Successfully deleted banner!");
    } catch (error: any) {
      const message = error?.data?.payload?.message || "Something went wrong";
      toast.error(message);
    }
  };

  // 🔁 Drag-and-Drop reorder handler
  const moveRow = async (dragIndex: number, hoverIndex: number) => {
    const updated = [...bannerData];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setBannerData(updated);
    const payload = {
        banners:[
            ...updated.map((item, index) => ({
                _id: item._id,
                order: index + 1, // Assuming order is 1-based index
            })),
        ]
    }
   
    await handleChangeOrderBanner(payload).unwrap();
  };


  
  const handleExport = () => {
    exportToExcel(bannerData, "Banner_List");
  };

  return (
    <div>
      <Heading
        title="Manage Banner"
        subTitle="Manage all your banners. You can delete or edit banners."
      />

      <button
        onClick={handleExport}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded mt-5 cursor-pointer"
      >
        Export to Excel
      </button>

      <DndProvider backend={HTML5Backend}>
        <Table className="max-h-[calc(100vh-15rem)] border border-gray-200 mt-5">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">
                <Checkbox
                  className="cursor-pointer"
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Create Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-4 my-3 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-20 w-32 rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-80" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : bannerData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-8"
                >
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              bannerData.map((item, index) => (
                <BannerRow
                  key={item._id}
                  item={item}
                  index={index}
                  moveRow={moveRow}
                  handleSelect={handleSelect}
                  selected={selectedData.includes(item._id)}
                  handleDelete={handleDelete}
                  isDeleting={isDeleting}
                />
              ))
            )}
          </TableBody>
        </Table>
      </DndProvider>
    </div>
  );
};

export default ManagePage;
