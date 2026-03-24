"use client";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  useHandleDeleteReviewMutation,
  useHandleGetAllReviewQuery,
} from "@/redux/features/review/reviewApi";
import ReviewTable from "./table";
import { GlobalPagination } from "@/components/layout/dashboard/shared/GlobalPagination/GlobalPagination";
import Filters from "@/components/layout/dashboard/shared/Filters";
import { CloudDownloadIcon } from "lucide-react";
import { exportToExcel } from "@/utils/exportToExcel";

const ManageReview = () => {
  const [searchText, setSearchText] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [isLoadingLimit, setIsLoadingLimit] = useState<boolean>(false);
  const { data, refetch, isError, isLoading } = useHandleGetAllReviewQuery({
    search: searchText,
    page: currentPage,
    limit,
  });

  const reviews = data?.payload?.reviews || [];
  const totalPages = data?.payload?.totalPages || 1;

  const [deleteReview, { isLoading: deleteLoading }] =
    useHandleDeleteReviewMutation();

  const handleDeleteReview = async (deleteId: any) => {
    try {
      await deleteReview(deleteId);
      refetch();
      toast.success("Deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.payload?.message || "An error occurred");
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    setIsSearching(true);
    const trimmedValue = searchRef.current?.value.trim() || ""; // Trim whitespace from the search query
    setSearchText(trimmedValue);
    setCurrentPage(1); // Reset to first page after search
    toast.success(`Searching for "${trimmedValue || "all"}"`); // Show search message
    await refetch(); // Refetch the data based on the new search query
    setIsSearching(false);
  };

  // Function to handle page changes
  const handlePageChange = async (page: number) => {
    setIsLoadingPage(true); // Set loading state for page change
    if (page >= 1 && page <= totalPages) {
      // Ensure the page is within valid range
      setCurrentPage(page);
      await refetch(); // Refetch the data for the selected page
      setIsLoadingPage(false);
    }
  };


  const handleLimitChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoadingLimit(true);
    setLimit(Number(e.target.value));
    setCurrentPage(1); 
    await refetch(); 
    setIsLoadingLimit(false);
  };

  const handleExport = () => {
    const dataForExport: any[] =
      reviews?.map((item: any) => {
        const baseData: any = {
          Name: item.name || "",
          Designation: item.designation || "",
          Review: item.content || "",
          Rating: item.rating || "",
          "Created time": new Date(item.createdAt).toLocaleString(),
        };

        return baseData;
      }) || [];
    exportToExcel(dataForExport, "Category_List");
  };


  

  return (
    <>
      <div>
        <Filters
          searchRef={searchRef}
          handleSearch={handleSearch}
          limit={limit}
          handleLimitChange={handleLimitChange}
          headingTitle="Manage Review"
          headingSubtitle="Manage all your review. You can delete or edit reviews."
          rowClassName="flex items-center gap-2"
        />
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-1 cursor-pointer flex justify-center items-center gap-2"
        >
          <CloudDownloadIcon />
          Export to Excel
        </button>

        <GlobalPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          className="sm:justify-end justify-center"
          totalCount={reviews?.length}
        />

        <div className="flex justify-between items-center gap-5 my-5"></div>
        <Table className="max-h-[calc(100vh-15rem)] border border-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <ReviewTable
            reviews={reviews}
            isLoading={isLoading || isSearching}
            isError={isError}
            handleDeleteReview={handleDeleteReview}
            deleteLoading={deleteLoading}
            isLoadingPage={isLoadingPage}
            isLoadingLimit={isLoadingLimit}
          />
        </Table>
      </div>
    </>
  );
};

export default ManageReview;
