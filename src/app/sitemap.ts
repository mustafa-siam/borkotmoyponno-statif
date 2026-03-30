export const revalidate = 3600; // Revalidate the sitemap every hour

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
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  try {
    // Adding a cache tag or revalidate to the fetch itself
    const response = await fetch(
      "https://server.ponnobari.store/api/v1/product",
      { next: { revalidate: 3600 } } 
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const products = data?.payload || [];

    const productPages = products.map((product: any) => ({
      url: `${baseUrl}/product/${product.slug}`,
      // Fallback to current date if product dates are missing
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    }));

    return [...staticPages, ...productPages];
    
  } catch (error) {
    // CRITICAL: If the API is down, we still return the static pages 
    // so the build doesn't fail and the sitemap isn't broken.
    console.error("Sitemap Fetch Error:", error);
    return staticPages;
  }
}