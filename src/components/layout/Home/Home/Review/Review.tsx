/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Quote, User, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useHandleGetAllReviewQuery } from "@/redux/features/review/reviewApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextReview,
  CarouselPreviousReview,
} from "@/components/ui/carousel";
import { reviews } from "@/hooks/useReviews";



export default function Review() {
const [current, setCurrent] = useState(0);
  const perPage = 3;
  const total = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(current * perPage, current * perPage + perPage);
  return (
    <section className="bg-white px-4 sm:px-[5%] py-16 lg:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-deepGreen text-sm font-medium mb-1">গ্রাহকরা কী বলেন</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-forest-green">
            গ্রাহক পর্যালোচনা
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((review) => (
            <div
              key={review.id}
              className="bg-pageColor border border-gray-100 p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < review.rating
                        ? 'fill-bright-orange text-bright-orange'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-forest-green text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-midnight-navy text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {review.location} · {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {total > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setCurrent((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-green hover:text-forest-green disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-500">
              {current + 1} / {total}
            </span>
            <button
              onClick={() => setCurrent((p) => Math.min(total - 1, p + 1))}
              disabled={current === total - 1}
              className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-green hover:text-forest-green disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
