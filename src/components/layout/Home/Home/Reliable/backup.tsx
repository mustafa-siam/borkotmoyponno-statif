import Image from "next/image";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";


import { ImPhone } from "react-icons/im";
export default function Reliable() {
  return (
    <div className="px-[5%] bg-no-repeat max-w-screen-2xl mx-auto bg-left-top md:bg-[url('/assets/Group.png')]" >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 relative " >
        <div className="grid grid-cols-8 gap-2 sm:gap-5 relative">
          <Image
            height={100}
            width={100}
            src="/assets/pata.svg"
            alt=""
            className={`absolute bottom-0 sm:bottom-10 -left-12 z-40`} // Add animation class
          />

          <div className="col-span-3 relative z-30">
            <Image
              height={500}
              width={500}
              src="/reliable2.png"
              alt="১০০% নির্ভরযোগ্য অর্গানিক ফুড স্টোর"
              className="w-full h-fit z-30 "
            />
            <div className="absolute bottom-0 lg:-bottom-10 -right-20 rounded-t-md p-2 sm:p-3 bg-pageColor">
              <Image
                height={200}
                width={300}
                src="/honeyChak.jpg"
                alt="১০০% নির্ভরযোগ্য অর্গানিক ফুড স্টোর"
                className=" w-20 sm:w-52 h-20 sm:h-40 object-cover rounded-md"
              />
            </div>

          </div>
          <Image
            height={80}
            width={80}
            src="/assets/tree2.svg"
            alt=""
            className="absolute -top-12 left-12 sm:left-36 z-10" />
          <Image
            height={500}
            width={500}
            src="/reliable1.png"
            alt="১০০% নির্ভরযোগ্য অর্গানিক ফুড স্টোর"
            className="w-full h-fit col-span-5"
          />
        </div>
        <div className="font-anek_bangla">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-5 leading-snug font-anek_bangla">
            <span className="text-forest-green">১০০% নির্ভরযোগ্য </span>অর্গানিক
            ফুড স্টোর
          </h1>
          <p className="flex items-center gap-2 mb-2 sm:text-lg font-medium text-[#1A1A1A]">
            <FaCheckCircle className="bg-white text-forest-green text-2xl" />
            সুস্থ ও প্রাকৃতিক খাবার, স্বাস্থ্যসচেতনদের জন্য
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-gray ml-7">
            <GoDotFill className="" />
            প্রাকৃতিক মধু ও অর্গানিক খাদ্যের বিশ্বস্ত ঠিকানা।
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-gray ml-7">
            <GoDotFill className="" />
            স্বাস্থ্যই সম্পদ — অর্গানিক খাদ্যে জীবন হোক আরও সুন্দর।
          </p>
          <p className="flex items-center gap-2 mb-2 sm:text-lg font-medium text-[#1A1A1A] mt-5">
            <FaCheckCircle className="bg-white text-forest-green text-2xl" />
            প্রতিদিনের তাজা ও গুণগতমানসম্পন্ন পণ্যের নিশ্চয়তা।
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-gray ml-7">
            <GoDotFill className="" />
            রাসায়নিক মুক্ত খাদ্যে ফিরে যান প্রকৃতির কোলে।
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-gray ml-7">
            <GoDotFill className="" />
            আপনার পরিবারের জন্য নিরাপদ ও স্বাস্থ্যকর খাবার।
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-gray ml-7">
            <GoDotFill className="" />
            প্রতিদিনের পুষ্টি চাহিদা মেটাতে প্রাকৃতিক সমাধান।
          </p>
          <a
            href="tel:+8801342106348"
            className="flex w-fit items-center gap-2 px-10 py-2 text-white bg-forest-green font-medium rounded mt-5 "
          >
            <ImPhone /> +8801342106348

          </a>
        </div>

        <Image
          height={120}
          width={120}
          src="/assets/Honey.svg"
          alt=""
          className="absolute right-0 bottom-0 rotate-12" />
      </div>
    </div>
  );
}
