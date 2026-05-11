'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { Product } from '@/hooks/useProducts';

interface Props {
  product: Product;
  view?: 'grid' | 'list';
}

export function addToCart(product: Product) {
  const cart = JSON.parse(localStorage.getItem('ponnoBariCart') || '[]');
  const existing = cart.find((item: { slug: string }) => item.slug === product.slug);
  
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      slug: product.slug,
      name: product.productName,
      price: product.price,
      image: product.productImage,
      unit: product.unit,
      quantity: 1,
    });
  }
  
  localStorage.setItem('ponnoBariCart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
  toast.success('কার্টে যোগ হয়েছে!');
}

export default function ProductCard({ product, view = 'grid' }: Props) {
  const discount = product.prvPrice && product.prvPrice > product.price
    ? Math.round(((product.prvPrice - product.price) / product.prvPrice) * 100)
    : null;

  const categoryTag = product.seo.tag?.[0] || 'পণ্য';

  if (view === 'list') {
    return (
      <div className="flex gap-4 border border-gray-100 bg-white p-4 hover:shadow-sm transition-shadow">
        <Link
          href={`/step/${product?.slug}`}
          className="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-gray-50"
        >
          <Image
            src={product.productImage}
            alt={product.productName}
            fill
            className="object-cover"
          />
        </Link>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs text-deepGreen bg-mint-background px-2 py-0.5">
              {categoryTag}
            </span>
            <Link href={`/step/${product?.slug}`}>
              <h3 
                className="font-semibold text-midnight-navy mt-1 hover:text-forest-green transition-colors"
                dangerouslySetInnerHTML={{ __html: product.productName }}
              />
            </Link>
            <div 
              className="text-xs text-gray-400 line-clamp-1"
              dangerouslySetInnerHTML={{ __html: product.unit }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-forest-green">
                ৳ {product.price}
              </span>
              {product.prvPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ৳ {product.prvPrice}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(product)}
                className="bg-forest-green text-white px-3 py-1.5 text-sm flex items-center gap-1 hover:bg-deepGreen transition-colors"
              >
                <ShoppingCart size={13} />
                কার্টে যোগ
              </button>
              <Link
                href={`/step/${product.slug}`}
                className="border border-forest-green text-forest-green px-3 py-1.5 text-sm hover:bg-forest-green hover:text-white transition-colors"
              >
                দেখুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group h-full flex flex-col bg-white border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden relative">
      {discount && (
        <div className="absolute top-2 left-2 z-10 bg-rose-red text-white text-xs px-2 py-0.5 font-medium">
          -{discount}%
        </div>
      )}

      <Link href={`/step/${product?.slug}`}>
  {/* উচ্চতা h-48 থেকে বাড়িয়ে h-64 বা h-72 করা হয়েছে */}
  <div className="relative h-72 overflow-hidden bg-gray-50 p-2"> 
    <Image
      src={product.productImage}
      alt="product image"
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-500" // object-contain করা হয়েছে
    />
  </div>
</Link>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-deepGreen bg-mint-background px-2 py-0.5 w-fit">
          {categoryTag}
        </span>
        <Link href={`/step/${product?.slug}`}>
          <h3 
            className="font-semibold text-lg text-midnight-navy mt-2 hover:text-forest-green transition-colors line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.productName }}
          />
        </Link>
        <div 
          className="text-sm text-gray-400 mt-auto pt-2 line-clamp-1"
          dangerouslySetInnerHTML={{ __html: product.unit }}
        />

        <div className="flex items-center gap-2 mt-auto pt-3">
          <span className="text-lg font-bold text-forest-green">
            ৳ {product.price}
          </span>
          {product.prvPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ৳ {product.prvPrice}
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-2 mt-auto pt-3">
  <button
    onClick={() => addToCart(product)}
    className="flex-1 bg-forest-green hover:bg-deepGreen text-white text-sm py-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
  >
    <ShoppingCart size={14} />
    কার্টে যোগ
  </button>

  <Link
    href={`/step/${product?.slug}`}
    className="flex items-center justify-center border border-forest-green text-forest-green cursor-pointer hover:bg-forest-green hover:text-white text-sm px-3 py-2 transition-colors"
  >
    বিস্তারিত
  </Link>
</div>
      </div>
    </div>
  );
}