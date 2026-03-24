"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AtSign,
  CircleArrowOutDownRight,
  CloudDownloadIcon,
  MoreHorizontal,
  ShieldAlertIcon,
  Trash2,
  User,
  UserCog,
} from "lucide-react";
import { PaginationGlobal } from "./pagination";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAllUserQuery,
  useHandleDeleteUserMutation,
  useHandleUserStatusMutation,
} from "@/redux/features/users/userApi";
import Heading from "../shared/Heading";
import ModeratorLogin from "../shared/moderatorLogin/from";
import { exportToExcel } from "@/utils/exportToExcel";

interface User {
  _id: string;
  name: string;
  email: string;
  isBanned: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

const UserTable = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const searchRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [isLoadingLimit, setIsLoadingLimit] = useState<boolean>(false);

  const { data, refetch, isLoading } = useGetAllUserQuery({
    page: currentPage,
    limit,
    search: searchText,
  });

  

  const [handleUserStatus] = useHandleUserStatusMutation();

  const users = data?.payload?.users || [];
  const [newStatus, setNewStatus] = useState(users.role); // or 'user'/'admin'
  const totalPages = data?.payload?.pagination?.totalPages || 0;

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const allSelected = selectedUsers.length === users.length;

  const [handleDeleteUser, { isLoading: deleteLoading }] =
    useHandleDeleteUserMutation();
  const handleSelectAll = () => {
    setSelectedUsers(allSelected ? [] : users.map((user: User) => user._id));
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await handleDeleteUser(id).unwrap();
      refetch();
      toast.success("Successfully deleted user!");
    } catch (error: any) {
      const errorMessage =
        error?.data?.payload?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    const trimmedValue = searchRef.current?.value.trim() || "";
    setSearchText(trimmedValue);
    setCurrentPage(1);
    toast.success(`Searching for "${trimmedValue || "all"}"`);
    await refetch();
    setIsSearching(false);
  };

  const handlePageChange = async (page: number) => {
    setIsLoadingPage(true);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      await refetch();
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

  const handleStatusUpdate = async (id: string) => {
    try {
      const data = { id, role: newStatus };
      await handleUserStatus(data).unwrap();
      refetch();
      toast.success("Successfully updated user status!");
    } catch (error: any) {
      const errorMessage =
        error?.data?.payload?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const handleExport = () => {
    const dataForExport: User[] =
      users?.map((item: any) => {
        const baseData: any = {
          Name: item.name || "",
          Email: item.email || "",
          Role: item.role || "",
          "Account created time": new Date(item.createdAt).toLocaleString(),
        };

        return baseData;
      }) || [];
    exportToExcel(dataForExport, "User_List");
  };



  useEffect(() => {
    if (searchText === "") {
      refetch();
    }
  }, [searchText, refetch]);

  return (
    <div>
      <div className="mb-5 flex justify-between flex-wrap gap-4 lg:gap-0">
        <Heading
          title="Manage User"
          subTitle="Manage all your users. You can delete or ban users."
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex gap-2">
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="rounded-xs cursor-pointer">
                    <ShieldAlertIcon className="w-4 h-4" />
                    Add Moderator
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-background/0 border-none shadow-none">
                  <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                  </AlertDialogHeader>
                  <ModeratorLogin />
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Input
              ref={searchRef}
              className="rounded-xs"
              placeholder="Enter query"
            />
            <Button
              onClick={handleSearch}
              className="rounded-xs cursor-pointer"
            >
              Search
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="limit" className="text-sm font-medium">
              Rows:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              className="border border-gray-300 px-2 py-1"
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
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
      </div>
      <div className="my-3 flex sm:items-center items-center gap-4 sm:gap-0 flex-col sm:flex-row sm:justify-between">
        <div className="flex-1 text-sm text-muted-foreground text-nowrap">
          {users.length} users Loaded
        </div>
        <PaginationGlobal
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          className="sm:justify-end justify-center"
        />
      </div>

      <Table className="max-h-[calc(100vh-15rem)] border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">
              <Checkbox
                className="mb-2"
                checked={allSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading || isSearching || isLoadingPage || isLoadingLimit ? (
            <>
              {[...Array(limit)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-4 my-3" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-96 my-3" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-96 my-3" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 my-3" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-4 my-3 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : users?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No user found.
              </TableCell>
            </TableRow>
          ) : (
            <>
              {users.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Checkbox
                      className="mb-2"
                      checked={selectedUsers.includes(user._id)}
                      onCheckedChange={() => handleSelectUser(user._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-emerald-600" />
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AtSign size={16} className="text-blue-500" />
                      <span>{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CircleArrowOutDownRight
                        size={16}
                        className={
                          user.role === "admin"
                            ? "text-amber-400"
                            : "text-purple-500"
                        }
                      />
                      <span>
                        {user.role === "admin" ? (
                          <span className="bg-amber-400 px-2 py-1 text-white rounded-sm">
                            {user.role}
                          </span>
                        ) : (
                          user.role
                        )}
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
                        {/* Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="flex items-center gap-2 text-red-600 p-2 hover:bg-red-50 w-full cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this user?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 text-white"
                                onClick={() => handleDelete(user._id)}
                                disabled={deleteLoading}
                              >
                                {deleteLoading ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Update Status */}
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
                                Are you sure you want to update the user&#39;s
                                status?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <div>
                              <label
                                htmlFor="status"
                                className="block mb-1 text-sm font-medium text-gray-700"
                              >
                                Select New Status:
                              </label>
                              <select
                                id="status"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              >
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-blue-600 text-white"
                                onClick={() => handleStatusUpdate(user._id)}
                                disabled={deleteLoading}
                              >
                                {deleteLoading ? "Updating..." : "Update"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        {/* Access */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
