"use client";
import { useHandleFindCategoryQuery } from "@/redux/features/categories/categoriesApi";
import {
  useHandleFindCategoryForDashboardQuery,
  useHandleFindOrderForDashboardQuery,
} from "@/redux/features/order/orderApi";
import { useHandleFindProductCountQuery } from "@/redux/features/product/productApi";
import { useHandleGetAllReviewQuery } from "@/redux/features/review/reviewApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/layout/dashboard/shared/Icons";
import { Overview } from "@/components/layout/dashboard/shared/Overview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MonthlySales } from "@/components/layout/dashboard/shared/MonthlySales";
import { DashboardSkeleton } from "@/components/layout/dashboard/shared/Skeloton";
import { useState } from "react";
import DateTimePicker from "@/components/layout/dashboard/DateTimeRangePicker";
import { AlignEndHorizontal } from "lucide-react";
import { CategoryOrderChart } from "@/components/layout/dashboard/shared/CategoryOrderChart";

const Dashboard = () => {
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);
  const [appliedStart, setAppliedStart] = useState<string | undefined>();
  const [appliedEnd, setAppliedEnd] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string>("");

 

  const { data: categoryData, isLoading: isCategoryLoading } =
    useHandleFindCategoryQuery({});
 

  const {
    data: cateOrderData,
    isLoading: isCateOrderLoading,
    refetch,
  } = useHandleFindCategoryForDashboardQuery({
    categoryId,
    startDateTime: appliedStart,
    endDateTime: appliedEnd,
  });

  const { data: orderData, isLoading: isOrderLoading } =
    useHandleFindOrderForDashboardQuery({
      startDateTime: appliedStart,
      endDateTime: appliedEnd,
    });

  const { data: reviewData, isLoading: isReviewLoading } =
    useHandleGetAllReviewQuery({});

  const { data: products, isLoading: isProductCountLoading } =
    useHandleFindProductCountQuery({});

  const handleApplyDateFilter = () => {
    setAppliedStart(startDateTime?.toISOString());
    setAppliedEnd(endDateTime?.toISOString());
  };

  const handleResetFilter = () => {
    setStartDateTime(null);
    setEndDateTime(null);
    setAppliedStart(undefined);
    setAppliedEnd(undefined);
  };

  const handleStatusCategory = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryId(e.target.value);
    await refetch();
  };

  if (
    isCategoryLoading ||
    isOrderLoading ||
    isReviewLoading ||
    isProductCountLoading ||
    isCateOrderLoading
  ) {
    return <DashboardSkeleton />;
  }

  // Get pre-calculated values from backend
  const totalRevenue = orderData?.payload?.totalRevenue || 0;
  const monthlySalesData = orderData?.payload?.monthlySalesData || [];
  const totalProducts = products?.payload?.totalProducts || 0;
  const totalCategories = categoryData?.payload?.length || 0;

  // Prepare product categories data
  const categories =
    categoryData?.payload?.map((category: any) => ({
      name: category.categoryName,
      value:
        products?.payload?.categoryCounts?.find(
          (productCa: any) => category?.categoryName === productCa?.category
        ).count || 0,
    })) || [];

  const formattedRevenue = new Intl.NumberFormat("en-IN").format(totalRevenue);
  const formattedProducts = new Intl.NumberFormat("en-IN").format(
    totalProducts
  );
  const formattedCategories = new Intl.NumberFormat("en-IN").format(
    totalCategories
  );

  
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center justify-between space-y-2">
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
              {categoryData?.payload?.map((val: any) => (
                <option key={val?._id} value={val?._id}>
                  {val?.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-5 ">
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
            <div className="flex gap-2 ">
              <Button onClick={handleApplyDateFilter} className="">
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={handleResetFilter}
                className=""
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <Icons.dollar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{formattedRevenue}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <AlignEndHorizontal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Orders
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {cateOrderData?.payload?.overall?.orderCount?.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Total Revenue
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ৳
                    {cateOrderData?.payload?.overall?.totalRevenue?.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <AlignEndHorizontal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Orders
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {cateOrderData?.payload?.overall?.orderCount?.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Total Revenue
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                   {formattedRevenue}৳
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Icons.package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formattedProducts}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(totalProducts * 0.12)} from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Icons.layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formattedCategories}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(totalCategories * 0.05)} from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Icons.layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/dashboard/add-category">
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/dashboard/manage-categories">
                    <Icons.settings className="mr-2 h-4 w-4" />
                    Manage Categories
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Icons.package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/dashboard/add-product">
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/dashboard/manage-products">
                    <Icons.settings className="mr-2 h-4 w-4" />
                    Manage Products
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <Icons.shoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/dashboard/manage-order">
                    <Icons.alertCircle className="mr-2 h-4 w-4" />
                    Manage Orders
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews</CardTitle>
              <Icons.star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/dashboard/add-reviews">
                    <Icons.list className="mr-2 h-4 w-4" />
                    Add Reviews
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/dashboard/manage-reviews">
                    <Icons.alertCircle className="mr-2 h-4 w-4" />
                    Manage Reviews
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Charts and Recent Orders */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Chart</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <MonthlySales data={monthlySalesData} />
            </CardContent>
          </Card>
          <div className="col-span-4">
            <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Category Performances Chart</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <CategoryOrderChart data={cateOrderData} />
            </CardContent>
          </Card>
             
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <CardContent className="pl-2">
            <Overview data={categories} />
          </CardContent>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewData?.payload?.reviews
                  ?.slice(0, 3)
                  ?.map((review: any) => (
                    <div key={review._id} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icons.star className="h-5 w-5 text-yellow-500" />
                          <span className="text-xs font-bold ml-0.5">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {review.designation}
                        </p>
                        <p className="mt-1 text-sm">{review.content}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reviews */}
      </div>
    </div>
  );
};

export default Dashboard;
