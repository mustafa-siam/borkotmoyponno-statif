import React from "react";
import { CheckCircle, Phone, Leaf, Shield, Heart, Award } from "lucide-react";

export default function ReliableOrganicStore() {
const features = [
  {
    title: "সুস্থ ও প্রাকৃতিক খাবার, স্বাস্থ্যসচেতনদের জন্য",
  },
  {
    title: "প্রতিদিনের তাজা ও গুণগতমানসম্পন্ন পণ্যের নিশ্চয়তা।",
  },
  {
    title: "রোগপ্রতিরোধে সহায়ক ভেষজ উপাদানসমূহ।",
  },
  {
    title: "বিজ্ঞানসম্মত প্যাকেজিং ও সঠিক সংরক্ষণ।",
  },
  {
    title: "বিশ্বস্ত উৎস থেকে সংগ্রহ করা অরগানিক খাদ্য।",
  },
  {
    title: "সহজ অনলাইন অর্ডার ও দ্রুত হোম ডেলিভারি।",
  },
  {
    title: "পরিবেশবান্ধব ও টেকসই কৃষি পণ্যের সমাহার।",
  },
];


  const stats = [
    { icon: Shield, label: "১০০% নিরাপদ", value: "Certified" },
    { icon: Leaf, label: "অর্গানিক", value: "Pure" },
    { icon: Heart, label: "স্বাস্থ্যকর", value: "Natural" },
    { icon: Award, label: "গুণগত মান", value: "Premium" },
  ];

  return (
    <section className="relative px-4 sm:px-[5%] py-16 lg:py-24">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row-reverse gap-10 lg:gap-16">
          {/* Stats Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-5 py-10 sm:py-14 bg-white border border-gray-100 hover:border-forest-green/10 hover:shadow-lg hover:shadow-forest-green/5 transition-all duration-300"
                  >
                    <div className="w-11 h-11 bg-forest-green/10 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-5 h-5 text-forest-green" />
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      {stat.value}
                    </div>
                    <div className="text-base font-medium text-midnight-navy">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 sm:gap-6 pt-5 mt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Shield className="w-3.5 h-3.5 text-forest-green" />
                <span>নিরাপদ ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>স্বাস্থ্য গ্যারান্টি</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>প্রিমিয়াম মান</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-5">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-forest-green/10 text-forest-green px-3.5 py-1.5 text-xs font-medium">
                <Leaf className="w-3.5 h-3.5" />
                <span>প্রাকৃতিক ও বিশুদ্ধ</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight">
                <span className="text-forest-green">১০০% নির্ভরযোগ্য</span>
                <br />
                <span className="text-midnight-navy">অর্গানিক ফুড স্টোর</span>
              </h1>

              <p className="text-base text-gray-500 leading-relaxed">
                প্রকৃতির সেরা উপহার আপনার দোরগোড়ায়। স্বাস্থ্যকর জীবনযাত্রার
                জন্য বেছে নিন আমাদের ১০০% অর্গানিক পণ্য।
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2.5">
              {features.map((feature, index) => (
                  <div className="flex items-start gap-2.5" key={index}>
                    <div className="flex-shrink-0 w-5 h-5 bg-forest-green/10 flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-forest-green" />
                    </div>
                    <p className="text-gray-600 text-[15px]">{feature.title}</p>
                  </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="tel:+8801860986633"
                className="inline-flex items-center gap-3 bg-forest-green text-white px-6 py-3.5 text-sm font-medium hover:bg-deepGreen transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-white/15 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="">+8801342-106348</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
