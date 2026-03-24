import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function ShopBreadcrumb() {
  return (
    <div className="px-4 sm:px-[5%] border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto py-6 sm:py-8 flex justify-between items-center gap-5 w-full">
        <h1 className="text-xl sm:text-2xl font-semibold text-midnight-navy">All Product</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm font-medium text-gray-400 hover:text-forest-green transition-colors"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <p className="text-gray-300 text-sm">/</p>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-medium text-midnight-navy">Shop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
