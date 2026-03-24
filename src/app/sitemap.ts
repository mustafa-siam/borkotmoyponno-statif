export default async function sitemap() {
  const baseUrl = "https://ponnobari.store";

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily", // More frequent for product pages
      priority: 0.8,
    },
  ];

  // Dynamic product pages
  let productPages = [];

  try {
    const response = await fetch(
      "https://server.ponnobari.store/api/v1/product"
    );
    const data = await response.json();

    // Transform API response to sitemap format
    productPages = (data?.payload || []).map((product: any) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt || product.createdAt),
      changeFrequency: "daily",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return [...staticPages, ...productPages];
}
