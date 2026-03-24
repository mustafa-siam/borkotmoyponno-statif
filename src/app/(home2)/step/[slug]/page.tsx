import ShopDetails from "./ShopDetails";

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  try {
    const response = await fetch(
      `https://server.ponnobari.store/api/v1/product/${slug}`
    );



    if (!response.ok) {
      throw new Error(
        `Failed to fetch product data: ${response.status} ${response.statusText}`
      );
    }
    const product = await response.json();
    const productData = product?.payload;

    if (!productData) {
      throw new Error("Product data is undefined or null.");
    }
    const cleanProductName =
      productData?.productName?.replace(/<[^>]+>/g, "") || "Organic Ajwa Dates";
    const cleanTagline =
      productData?.tagline?.replace(/<[^>]+>/g, "") ||
      "Premium quality Ajwa dates imported from Madina";
    const cleanDescription = productData?.seo?.description || cleanTagline;
    const cleanHadith =
      productData?.hadith?.replace(/<[^>]+>/g, "") ||
      "Ajwa dates are from Paradise. They are a remedy for poison.";

    return {
      title: cleanProductName,
      description: cleanDescription,
      openGraph: {
        title: cleanProductName,
        description: cleanDescription,
        images: [
          {
            url:
              productData?.productImage ||
              "https://i.ibb.co/F4DgKLbT/image.webp",
            alt: cleanProductName,
          },
        ],
        url: `https://yourwebsite.com/product/${slug}`,
        type: "website",
      },
      alternates: {
        canonical: `https://yourwebsite.com/product/${slug}`,
      },
      keywords: ["Islamic products", ...(productData?.seo?.tag || [])].filter(
        Boolean
      ),
      other: {
        hadith: cleanHadith,
        price: productData?.price?.toString() || "150",
        original_price: productData?.prvPrice?.toString() || "200",
      },
      additionalMetaTags: [
        {
          name: "hadith",
          content: cleanHadith,
        },
        {
          name: "price",
          content: productData?.price?.toString() || "150",
        },
        {
          name: "original_price",
          content: productData?.prvPrice?.toString() || "200",
        },
      ],
    };
  } catch (error) {
    console.warn("Error generating metadata:", error);
    return {
      title: "Organic Ajwa Dates",
      description: "Premium quality Ajwa dates imported from Madina",
      openGraph: {
        title: "Organic Ajwa Dates",
        description: "Premium quality Ajwa dates imported from Madina",
        images: [
          {
            url: "https://i.ibb.co/F4DgKLbT/image.webp",
            alt: "Organic Ajwa Dates",
          },
        ],
        url: `https://yourwebsite.com/product/${slug}`,
        type: "website",
      },
      alternates: {
        canonical: `https://yourwebsite.com/product/${slug}`,
      },
      keywords: [
        "Ajwa dates",
        "Organic dates",
        "Madina dates",
        "Premium dates",
        "Islamic products",
      ],
    };
  }
}

export default function Page({ params }: any) {
  const { slug } = params;

  return (
    <main className=" mx-auto bg-pageColor">
      <ShopDetails slug={slug} />
    </main>
  );
}
