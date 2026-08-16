import ShopDetails from "./ShopDetails";

export const dynamic = "force-dynamic"; // <--- Add this to fix the build error

export async function generateMetadata({ params }: any) {
  const { slug } = params;

  try {
    // Add a timeout or check if we are in a build environment if needed
    const response = await fetch(
      `https://server.ponnobari.store/api/v1/product/${slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) throw new Error("Fetch failed");

    const product = await response.json();
    const productData = product?.payload;

    if (!productData) throw new Error("No data");

    const cleanProductName = productData?.productName?.replace(/<[^>]+>/g, "") || "Organic Ajwa Dates";
    const cleanDescription = productData?.seo?.description || "Premium quality product";

    return {
      title: cleanProductName,
      description: cleanDescription,
      openGraph: {
        title: cleanProductName,
        description: cleanDescription,
        images: [{ url: productData?.productImage || "https://i.ibb.co/F4DgKLbT/image.webp" }],
      },
    };
  } catch (error) {
    // This block runs if the DNS fails or the server is down
    console.error("Metadata fetch failed for slug:", slug);
    return {
      title: "Product | Khidma Organic",
      description: "High quality authentic products.",
    };
  }
}

export default function Page({ params }: any) {
  const { slug } = params;

  return (
    <main className="mx-auto bg-pageColor">
      <ShopDetails slug={slug} />
    </main>
  );
}