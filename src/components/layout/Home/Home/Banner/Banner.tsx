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
import { useHandleFindBannerQuery } from "@/redux/features/banner/bannerApi";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import Marquee from "react-fast-marquee";
import { useHandleFindLevelQuery } from "@/redux/features/level/levelAPi";
// import Link from "next/link";

export default function Banner() {
  const { data, isLoading } = useHandleFindBannerQuery({});
  const images: any = data?.payload || [];

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  // Query to fetch all data based on pagination and search text
  const { data: data2 } = useHandleFindLevelQuery({});
  // Extracting the data list and total pages from the response
  const lavel: any[] = data2?.payload || [];

  return (
    <div className="px-4 sm:px-[5%] mb-6 sm:mb-6 sm:mt-4">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="max-w-screen-xl mx-auto w-full"
      >
        <CarouselContent>
              <CarouselItem>
                <div className="overflow-hidden">
                  <Image
                    height={1000}
                    width={500}
                    src="https://i.ibb.co/7Jt1TYd5/image.webp"
                    alt="Banner Image"
                    className="w-full h-[180px] sm:h-[300px] lg:h-[480px] object-cover"
                  />
                </div>
              </CarouselItem>
        </CarouselContent>
       <div className="hidden md:block"> <CarouselPrevious2 />
        <CarouselNext2 /></div>
          <div className="bg-forest-green text-white/90 py-2.5 -mt-1">
            <div className="flex justify-between items-center gap-5 text-sm">
              <Marquee gradient={false} speed={50}>               
১০০% নির্ভরযোগ্য অর্গানিক ফুড স্টোর | সুস্থ ও প্রাকৃতিক খাবার, স্বাস্থ্যসচেতনদের জন্য | প্রতিদিনের তাজা ও গুণগতমানসম্পন্ন পণ্যের নিশ্চয়তা।
              </Marquee>
            </div>
          </div>
      </Carousel>
    </div>
  );
}
