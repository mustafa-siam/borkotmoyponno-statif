// app/(home)/shop/page.tsx
import { Suspense } from "react";
import ShopPage from "./ShopPage";
export default function Shop() {
  return (
    <Suspense fallback={<div></div>}>
      <ShopPage />
    </Suspense>
  );
}

// export default dynamic(() => Promise.resolve(Shop), { ssr: false });