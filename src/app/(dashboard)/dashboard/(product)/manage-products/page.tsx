"use client"; // ⚛️ React Core
import React, { useEffect, useRef, useState } from "react";

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

// 🧱 UI Components - Miscellaneous
import { Skeleton } from "@/components/ui/skeleton";

// 🔢 Pagination Component
// import { GlobalPagination } from "@/components/layout/dashboard/shared/GlobalPagination/GlobalPagination";

// // 🔍 Filters Component
// import Filters from "@/components/layout/dashboard/shared/Filters";

// 🗑️ Delete Confirmation Dialog
import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";

// 📦 Redux API Hooks (data-related)

import {
  useHandleDeleteProductMutation,
  useHandleFindProductQuery,
} from "@/redux/features/product/productApi";

// 🔔 Notifications
import toast from "react-hot-toast";

// 📸 Images and Links
import Image from "next/image";
import Link from "next/link";

// 🎨 Icons - Lucide
import {
  Boxes,
  CloudDownloadIcon,
  MoreHorizontal,
  Package,
  ShoppingCart,
  Tag,
  UserCog,
} from "lucide-react";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { exportToExcel } from "@/utils/exportToExcel";
import { Button } from "@/components/ui/button";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { Input } from "@/components/ui/input";

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  productName: string; // Title of the data
  productImage: string; // URL of the image associated with the data (e.g., thumbnail)
  price: number;
  quantity: number;
  sold: number;
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

const ManagePage = () => {
  //  State management for the search and pagination features
  const [searchText, setSearchText] = useState<string>(""); // Stores the search query
  const searchRef = useRef<HTMLInputElement>(null); // Reference to the search input
  const [isSearching, setIsSearching] = useState<boolean>(false); // Tracks if a search is ongoing
  // const [currentPage, setCurrentPage] = useState<number>(1); // Tracks the current page
  // const [limit, setLimit] = useState<number>(10); // Sets the limit (items per page)
  // const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false); // Loading state for page change
  // const [isLoadingLimit, setIsLoadingLimit] = useState<boolean>(false); // Loading state for limit change
  // Query to fetch all data based on pagination and search text
  const { data, refetch, isLoading } = useHandleFindProductQuery({
    search: searchText, // The search text to filter data
  });

  // Extracting the data list and total pages from the response
  const allData: IData[] = data?.payload || [];
  // const totalPages = data?.payload?.pagination?.totalPages || 1;

  // Mutation to handle data deletion
  const [handleDeleteProduct, { isLoading: isDeleting }] =
    useHandleDeleteProductMutation();

  const { data: user, isLoading: userLoading } = useLoggedInUserQuery();
  const userModerator = user?.payload;

  // Function to delete a selected data
  const handleDelete = async (id: string) => {
    try {
      await handleDeleteProduct(id).unwrap(); // Call the delete mutation
      refetch(); // Re-fetch the list of data after deletion
      toast.success("Successfully deleted data!"); // Show success toast
    } catch (error: any) {
      const message = error?.data?.payload?.message || "Something went wrong"; // Handle error
      toast.error(message); // Show error toast
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    setIsSearching(true);
    const trimmedValue = searchRef.current?.value.trim() || ""; // Trim whitespace from the search query
    setSearchText(trimmedValue);
    // setCurrentPage(1); // Reset to first page after search
    toast.success(`Searching for "${trimmedValue || "all"}"`); // Show search message
    await refetch(); // Refetch the data based on the new search query
    setIsSearching(false);
  };

  // Function to handle page changes
  // const handlePageChange = async (page: number) => {
  //   setIsLoadingPage(true); // Set loading state for page change
  //   if (page >= 1 && page <= totalPages) {
  //     // Ensure the page is within valid range
  //     setCurrentPage(page);
  //     await refetch(); // Refetch the data for the selected page
  //     setIsLoadingPage(false);
  //   }
  // };

  // Function to handle changes in items per page (pagination limit)
  // const handleLimitChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setIsLoadingLimit(true); // Set loading state for limit change
  //   setLimit(Number(e.target.value)); // Update the limit based on user selection
  //   setCurrentPage(1); // Reset to first page after limit change
  //   await refetch(); // Refetch the data with the new limit
  //   setIsLoadingLimit(false);
  // };

  const handleExport = () => {
    function stripHtmlTags(html: string): string {
      return html.replace(/<[^>]*>/g, "").trim();
    }

    const dataForExport: any[] =
      allData?.map((item: any) => {
        const rawName = stripHtmlTags(item.productName || "");
        const baseData: any = {
          "Product name": rawName || "",
          Price: item.price || "",
          "Previous price ": item.prvPrice || "",
          "Quantity ": item.quantity || "",
          "Sold ": item.sold || "0",
        };

        return baseData;
      }) || [];
    exportToExcel(dataForExport, "Product_List");
  };

  // Use effect to trigger refetch when search text changes
  useEffect(() => {
    if (searchText === "") {
      refetch(); // Refetch all data if the search text is empty
    }
  }, [searchText, refetch]);

  return (
    <div>

      <div>
        {/* Heading */}
        <div className="mb-5 flex justify-between flex-wrap gap-4 lg:gap-0">
          <Heading
            title="Manage Products"
            subTitle="Manage all your products. You can delete or edit products."
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

      <div className="flex justify-between items-center gap-5 mb-5">
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-1 cursor-pointer flex justify-center items-center gap-2"
        >
          <CloudDownloadIcon />
          Export to Excel
        </button>
        <br />
        <Button variant="outline" className="">
          {allData?.length} products Loaded
        </Button>
      </div>

      {/* Table */}
      <Table className="max-h-[calc(100vh-15rem)] border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>productName</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ||
          isSearching ||
          // isLoadingPage ||
          // isLoadingLimit ||
          userLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-20 w-32 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-80" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-8 ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : allData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            allData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Image
                    width={150}
                    height={100}
                    src={item.productImage}
                    alt={item.productName}
                    className="rounded-md object-cover h-20 w-32"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.productName,
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <p dangerouslySetInnerHTML={{ __html: item?.price }} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-blue-600" />
                    <p dangerouslySetInnerHTML={{ __html: item?.quantity }} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                    {item?.sold ? (
                      <p dangerouslySetInnerHTML={{ __html: item?.sold }} />
                    ) : (
                      0
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full cursor-pointer">
                        <MoreHorizontal />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href={`/dashboard/update-product/${item.slug}`}>
                        <button className="flex items-center gap-2 text-blue-600 p-2 hover:bg-blue-50 w-full cursor-pointer">
                          <UserCog className="w-4 h-4" />
                          Edit
                        </button>
                      </Link>
                      {userModerator?.role == "admin" && (
                        <GlobalDelete
                          onConfirm={() => handleDelete(item._id)}
                          loading={isDeleting}
                        />
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination & Selection Info */}
      {/* <GlobalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        className="sm:justify-end justify-center"
        totalCount={allData.length}
      /> */}
    </div>
  );
};

export default ManagePage;
