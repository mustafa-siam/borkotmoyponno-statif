"use client";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

// Utility function to strip HTML tags
// update
function stripHtmlTags(str: string) {
  if (!str) return "";
  return str.replace(/<[^>]+>/g, "");
}

export default function ProductCard({ product }: any) {

  const handleAddToCart = () => {
    const storedCart = JSON.parse(
      localStorage.getItem("ponnoBariCart") || "[]"
    );

    const existingItemIndex = storedCart.findIndex(
      (item: { product: string }) => item.product === product.slug
    );

    if (existingItemIndex === -1) {
      storedCart.push({ product: product.slug, quantity: 1 });
      localStorage.setItem("ponnoBariCart", JSON.stringify(storedCart));
      toast.success("Added to cart");
      window.dataLayer?.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "BDT",
          items: [
            {
              item_id: product?._id,
              item_slug: product?.slug,
              price: Number(product?.price),
              item_name: stripHtmlTags(product.productName),
              item_image: product?.productImage,
              item_tag_line: stripHtmlTags(product?.tagline),
              shipping_cost: product?.shipping,
              unit: stripHtmlTags(product?.unit),
              buyingReason: {
                heading: stripHtmlTags(product?.buyingReason?.heading),
                steps: product?.buyingReason?.steps,
              },
              hadith: stripHtmlTags(product?.hadith),
              benefits: {
                heading: stripHtmlTags(product?.benefits?.heading),
                steps: product?.benefits?.steps,
              },
              category: product?.category,
              quantity: 1,
              prvPrice: product?.prvPrice,
            },
          ],
        },
      });
    } else {
      toast.error("Already added to cart");
    }

    setTimeout(() => {
      window.dispatchEvent(new Event("cartUpdated"));
    }, 100);
  };

  const handleViewDetails = () => {
    window.dataLayer?.push({
      event: "view_item",
      ecommerce: {
        items: [
          {
            item_id: product?._id,
            item_slug: product?.slug,
            price: Number(product?.price),
            item_name: stripHtmlTags(product.productName),
            item_image: product?.productImage,
            item_tag_line: stripHtmlTags(product?.tagline),
            shipping_cost: product?.shipping,
            unit: stripHtmlTags(product?.unit),
            buyingReason: {
              heading: stripHtmlTags(product?.buyingReason?.heading),
              steps: product?.buyingReason?.steps,
            },
            hadith: stripHtmlTags(product?.hadith),
            benefits: {
              heading: stripHtmlTags(product?.benefits?.heading),
              steps: product?.benefits?.steps,
            },
            category: product?.category,
            quantity: product?.quantity,
            prvPrice: product?.prvPrice,
          },
        ],
      },
    });
  };

  return (

    <div className="bg-white rounded-md  overflow-hidden flex flex-col relative py-3 px-2 border border-deepGreen/20" key={product?._id}>

      {/* Product Image with Hover Overlay */}
      <div className="relative w-full h-52 aspect-square overflow-hidden rounded-lg">
        <Image
          width={400}
          height={400}
          src={product?.productImage}
          alt={product?.productName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="px-2 py-3 flex flex-col gap-2">
        <h1
          className="hidden sm:block text-sm sm:text-xl font-semibold flex-1 my-1 text-gray-800"
          dangerouslySetInnerHTML={{ __html: product?.productName }}
        />

        <h1
          className="block sm:hidden text-sm sm:text-xl font-semibold flex-1 my-1 text-gray-800"
          dangerouslySetInnerHTML={{
            __html: product?.productName
              ?.split(' ')
              .slice(0, 3)
              .join(' ') + (product?.productName?.split(' ').length > 3 ? '...' : '')
          }}
        />


        <p className="text-base sm:text-lg font-medium flex gap-5">
          <span className="text-medium-gray font-normal line-through">
            ৳ {product?.prvPrice}
          </span>
          <span className="text-midnight-navy">৳ {product?.price}</span>
        </p>

        {product?.prvPrice > product?.price && (
          <div className="absolute top-6 left-6 bg-green-600 text-white text-xs font-semibold rounded-full px-2 py-1">
            {Math.round(((product.prvPrice - product.price) / product.prvPrice) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4  ">
        {/* View Details Icon Button */}
        <Link href={`/step/${product?.slug}`} onClick={handleViewDetails} className="w-full">
          <button className="w-full px-3 py-2 gap-2 rounded  cursor-pointer flex items-center justify-center text-base bg-mint-background hover:bg-forest-green text-midnight-navy  group hover:text-mint-background">
            Details
            <ArrowUpRight
              className="w-5 h-5 text-midnight-navy transition-transform duration-500 ease-in-out will-change-transform group-hover:rotate-45 group-hover:text-mint-background"
            />
          </button>
        </Link>

        <div onClick={handleAddToCart} className="w-full px-3 py-2 gap-2 rounded hover:bg-mint-background  transition cursor-pointer flex items-center justify-center text-base font-normal bg-forest-green text-warm-ivory group hover:text-[#0E243A] cart-shake-hover">
          Add to cart
          <ShoppingCart
            className="w-5 h-5 text-warm-ivory group-hover:text-[#0E243A] "
          />

        </div>

      </div>
    </div>
  );
}




