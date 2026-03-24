"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { EditIcon, Ellipsis, Eye, Trash2 } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import TableSkeleton from "@/components/layout/dashboard/shared/TableSkeleton";
import { IReview } from "@/redux/features/review/reviewType";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
interface TableProps {
  isLoading: boolean;
  isError: boolean;
  reviews: IReview[];
  handleDeleteReview: any;
  deleteLoading: any;
  isLoadingPage?: boolean;
  isLoadingLimit?: boolean;
}
const ReviewTable = ({
  isLoading,
  isError,
  reviews,
  isLoadingPage,
  handleDeleteReview,
  deleteLoading,
  isLoadingLimit,
}: TableProps) => {
  const { data: user, isLoading: userLoading } = useLoggedInUserQuery();
  const userModerator = user?.payload;
  if (!reviews || isLoading || isLoadingPage || userLoading||isLoadingLimit) {
    return <TableSkeleton />;
  }

  if (reviews.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center text-gray-500 py-10">
          No reviews found.
        </TableCell>
      </TableRow>
    );
  }
  if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center text-gray-500 py-10">
          No reviews found.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableBody>
      {reviews?.map((review) => (
        <TableRow key={review._id} className="hover:bg-gray-100">
          <TableCell>{review.name}</TableCell>

          <TableCell>{review.designation}</TableCell>

          <TableCell>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <p className="flex items-center gap-2 cursor-pointer">
                  {" "}
                  <Eye className="text-blue-600 text-base cursor-pointer" />{" "}
                  View
                </p>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Review by {review.name}</AlertDialogTitle>
                  {review.content}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
          <TableCell>
            <Rating style={{ maxWidth: 120 }} value={review.rating} readOnly />
          </TableCell>

          {/* Actions */}
          <TableCell className="text-right">
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-gray-200">
                    <Ellipsis className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link
                    href={`/dashboard/update-reviews/${review?._id}`}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  >
                    <EditIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  {userModerator?.role == "admin" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="flex items-center gap-2 text-red-600 p-2 hover:bg-gray-100 rounded w-full">
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this review?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDeleteReview(review._id);
                            }}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {deleteLoading ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ReviewTable;
