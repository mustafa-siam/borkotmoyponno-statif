"use client";

import Image from "next/image";
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious2,
  CarouselNext2,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Marquee from "react-fast-marquee";

export default function Banner() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const bannerImages = [
    "https://i.ibb.co/7Jt1TYd5/image.webp",
    "https://i.ibb.co/7Jt1TYd5/image.webp",
    "https://i.ibb.co/7Jt1TYd5/image.webp",
  ];

  return (
    <div className="px-4 sm:px-[5%] mb-6 sm:mb-6 sm:mt-4">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="max-w-screen-xl mx-auto w-full"
      >
        <CarouselContent>
          {bannerImages.map((src, index) => (
            <CarouselItem key={index}>
              <div className="overflow-hidden">
                <Image
                  height={1000}
                  width={500}
                  src={src}
                  alt={`Banner Image ${index + 1}`}
                  className="w-full h-[180px] sm:h-[300px] lg:h-[480px] object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden md:block">
          <CarouselPrevious2 />
          <CarouselNext2 />
        </div>

        <div className="bg-forest-green text-white/90 py-2.5 -mt-1 overflow-hidden pointer-events-none select-none">
          <div className="flex items-center text-sm">
            <Marquee gradient={false} speed={50} className="overflow-hidden">
              <span className="px-4">
                ১০০% নির্ভরযোগ্য অর্গানিক ফুড স্টোর | সুস্থ ও প্রাকৃতিক খাবার,
                স্বাস্থ্যসচেতনদের জন্য | প্রতিদিনের তাজা ও গুণগতমানসম্পন্ন
                পণ্যের নিশ্চয়তা।
              </span>
            </Marquee>
          </div>
        </div>
      </Carousel>
    </div>
  );
}