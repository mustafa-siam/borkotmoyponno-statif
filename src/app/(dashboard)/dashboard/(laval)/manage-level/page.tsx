"use client"; // ⚛️ React Core

// 🧱 UI Components - Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
// 🧱 UI Components - Dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 🧱 UI Components - Miscellaneous
import { Skeleton } from "@/components/ui/skeleton";

// 🗑️ Delete Confirmation Dialog
import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";

// 🔔 Notifications
import toast from "react-hot-toast";

// 📸 Images and Links
import Link from "next/link";

// 🎨 Icons - Lucide
import { CalendarDays, Eye, MoreHorizontal, UserCog } from "lucide-react";
import {
  useHandleDeleteLevelMutation,
  useHandleFindLevelQuery,
} from "@/redux/features/level/levelAPi";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { exportToExcel } from "@/utils/exportToExcel";
import Heading from "@/components/layout/dashboard/shared/Heading";

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  text: string; // Title of the data
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

const ManagePage = () => {
  // Query to fetch all data based on pagination and search text
  const { data, refetch, isLoading } = useHandleFindLevelQuery({});
  // Extracting the data list and total pages from the response
  const allData: IData[] = data?.payload || [];

  // Mutation to handle data deletion
  const [handleDeleteLevel, { isLoading: isDeleting }] =
    useHandleDeleteLevelMutation();

  const { data: user, isLoading: userLoading } = useLoggedInUserQuery();
  const userModerator = user?.payload;

  // Function to delete a selected data
  const handleDelete = async (id: string) => {
    try {
      await handleDeleteLevel(id).unwrap(); // Call the delete mutation
      refetch(); // Re-fetch the list of data after deletion
      toast.success("Successfully deleted data!"); // Show success toast
    } catch (error: any) {
      const message = error?.data?.payload?.message || "Something went wrong"; // Handle error
      toast.error(message); // Show error toast
    }
  };


  const handleExport = () => {
    exportToExcel(allData, "Level_List");
  };

  return (
    <div>
      <Heading
        title="Manage Level"
        subTitle="Manage all your levels. You can delete or edit levels."
      />

      <button
        onClick={handleExport}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded my-5 cursor-pointer"
      >
        Export to Excel
      </button>

      {/* Table */}
      <Table className="max-h-[calc(100vh-15rem)] border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ||
          userLoading ? (
            Array.from({ length: 1 }).map((_, i) => (
              <TableRow key={i}>
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
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <Eye className="w-4 h-4 text-blue-600" />
                        View
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Your Level</AlertDialogTitle>
                        <AlertDialogDescription>
                          {item.text}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-blue-600" />
                    <span>
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
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
                      <Link href={`/dashboard/update-level/${item._id}`}>
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
    </div>
  );
};

export default ManagePage;
