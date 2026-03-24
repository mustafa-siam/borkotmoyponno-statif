"use client";
import { useHandleFindCategoryQuery } from "@/redux/features/categories/categoriesApi";
import { useHandleFindOrderQuery } from "@/redux/features/order/orderApi";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";
import { useHandleGetAllReviewQuery } from "@/redux/features/review/reviewApi";
import { useGetAllUserQuery } from "@/redux/features/users/userApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/layout/dashboard/shared/Icons";
import { Overview } from "@/components/layout/dashboard/shared/Overview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MonthlySales } from "@/components/layout/dashboard/shared/MonthlySales";
import { DashboardSkeleton } from "@/components/layout/dashboard/shared/Skeloton";

const Dashboard = () => {
  const { data: categoryData, isLoading: isCategoryLoading } =
    useHandleFindCategoryQuery({});
  const { data: orderData, isLoading: isOrderLoading } =
    useHandleFindOrderQuery({});
  const { data: productData, isLoading: isProductLoading } =
    useHandleFindProductQuery({});
  const { data: reviewData, isLoading: isReviewLoading } =
    useHandleGetAllReviewQuery({});
  const { data: userData, isLoading: isUserLoading } = useGetAllUserQuery({});

  if (
    isCategoryLoading ||
    isOrderLoading ||
    isProductLoading ||
    isReviewLoading ||
    isUserLoading
  ) {
    return <DashboardSkeleton />;
  }

  // Calculate metrics
  const totalRevenue =
    orderData?.payload?.orders?.reduce(
      (sum: number, order: any) => sum + order.totalAmount,
      0
    ) || 0;
  const totalProducts = productData?.payload?.length || 0;
  const totalCategories = categoryData?.payload?.length || 0;
  const totalUsers = userData?.payload?.users?.length || 0;

  const monthlySalesData = [
    { name: "Jan", sales: 4000, orders: 24 },
    { name: "Feb", sales: 3000, orders: 13 },
    { name: "Mar", sales: 2000, orders: 8 },
    { name: "Apr", sales: 2780, orders: 11 },
    {
      name: "May",
      sales: totalRevenue,
      orders: orderData?.payload?.orders?.length || 0,
    },
    { name: "Jun", sales: 0, orders: 0 },
    { name: "Jul", sales: 0, orders: 0 },
    { name: "Aug", sales: 0, orders: 0 },
    { name: "Sep", sales: 0, orders: 0 },
    { name: "Oct", sales: 0, orders: 0 },
    { name: "Nov", sales: 0, orders: 0 },
    { name: "Dec", sales: 0, orders: 0 },
  ];

  // Prepare product categories data
  const categories =
    categoryData?.payload?.map((category: any) => ({
      name: category.categoryName,
      value:
        productData?.payload?.filter(
          (product: any) => product?.category?._id === category?._id
        ).length || 0,
    })) || [];
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <input type="date" name="from" />
            <input type="date" name="to" />
            <button className="btn" type="submit">
              Go
            </button>
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
              <div className="text-2xl font-bold">
                ৳{totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Icons.package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
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
              <div className="text-2xl font-bold">{totalCategories}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(totalCategories * 0.05)} from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Icons.users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(totalUsers * 0.18)} since last month
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <MonthlySales data={monthlySalesData} />
            </CardContent>
          </Card>
          <div className="col-span-3">
            <CardContent className="pl-2">
              <Overview data={categories} />
            </CardContent>
          </div>
        </div>

        {/* Recent Reviews */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviewData?.payload?.slice(0, 3).map((review: any) => (
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
    </div>
  );
};

export default Dashboard;
