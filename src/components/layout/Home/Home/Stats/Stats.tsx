/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Shield,
  Truck,
  DollarSign,
  Award,
} from "lucide-react";

export default function ProfessionalStats() {
  const stats = [
    {
      icon: Shield,
      title: "১০০% খাঁটি ও অর্গানিক",
      subtitle: "সম্পূর্ণ প্রাকৃতিক",
      description: "রাসায়নিক মুক্ত খাদ্য",
      imageSrc: "/2.svg",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Truck,
      title: "দ্রুত ডেলিভারি",
      subtitle: "দ্রুততম সেবা",
      description: "সময়মতো পৌঁছে দেওয়া",
      imageSrc: "/3.svg",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: DollarSign,
      title: "সাশ্রয়ী মূল্য",
      subtitle: "সাধ্যের মধ্যে",
      description: "সেরা দামে সেরা পণ্য",
      imageSrc: "/4.svg",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Award,
      title: "নিশ্চিত কোয়ালিটি",
      subtitle: "গুণগত মান",
      description: "প্রিমিয়াম গুণমান নিশ্চয়তা",
      imageSrc: "/1.svg",
      color: "text-violet-600",
      bgColor: "bg-violet-50",
    },
  ];

  return (
    <section
      className="relative px-4 sm:px-[5%] py-16 lg:py-24"
    >
      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-forest-green/70 mb-3">
            আমাদের বিশেষত্ব
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-midnight-navy mb-3">
            কেন আমাদের বেছে নেবেন?
          </h2>
          <p className="text-base text-gray-400 max-w-lg mx-auto">
            আমাদের প্রতিটি সেবায় রয়েছে গুণমান এবং বিশ্বস্ততার নিশ্চয়তা
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            return (
              <div
                key={index}
                className="group bg-white border border-gray-100 p-5 lg:p-7 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300 cursor-pointer"
              >
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 ${stat.bgColor} flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105`}>
                    <img
                      src={stat.imageSrc}
                      alt={stat.title}
                      className="w-7 h-7 lg:w-8 lg:h-8 opacity-70"
                    />
                  </div>

                  {/* Text */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm lg:text-base font-semibold text-midnight-navy">
                      {stat.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
