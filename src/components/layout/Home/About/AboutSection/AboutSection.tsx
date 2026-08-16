import Image from "next/image";
import React from "react";
import aboutImage from '@/../public/about.png'

export default function AboutSection() {
  return (
    <div className="px-4 sm:px-[5%]">
      <div className="max-w-screen-lg mx-auto mt-8 mb-20 py-8 lg:py-12">
        <Image
          width={1000}
          height={500}
          alt="about"
          src={aboutImage}
          className="w-full h-fit mb-10"
        />
        <div className="text-base text-gray-500 space-y-5 leading-relaxed">
          <p>
            🌿 <span className="font-semibold text-forest-green">খিদমা অর্গানিক</span> — বিশ্বাস, বরকত ও ভালোবাসার একটি নাম
          </p>

          <p>
            আমরা বিশ্বাস করি, রিজিক শুধু উপার্জনের নাম নয়—এটি একটি আমানত, যার হিসাব আল্লাহর দরবারে দিতে হবে। আর তাই সততা, খোদাভীতি ও হালাল উপার্জন—এই তিনটি মূলনীতির ওপর ভর করে শুরু হয়েছে আমাদের যাত্রা।
          </p>

          <p>
            <span className="italic">‘খিদমা অর্গানিক’</span> কেবল একটি ব্র্যান্ড নয়, এটি একটি ইবাদতের মাধ্যম। প্রতিটি পণ্যের পেছনে রয়েছে পরিশ্রম, দোয়া, এবং আমানতের দায়িত্ববোধ। আমরা শুধু পণ্য দিই না, আপনাকে পৌঁছে দিই প্রাকৃতিক বিশুদ্ধতা আর একটুখানি প্রশান্তি।
          </p>

          <p>
            আমাদের লক্ষ্য শুধু লাভ নয়, বরং আপনার আস্থা অর্জনের মাধ্যমে আল্লাহর সন্তুষ্টি অর্জন করা। তাই প্রতিটি বোতলে, প্রতিটি প্যাকেটে, প্রতিটি ডেলিভারিতে আমরা রাখি আন্তরিকতা, দোয়া ও নিখাদ মানের নিশ্চয়তা।
          </p>

          <blockquote className="border-l-2 border-forest-green/30 pl-4 italic text-gray-600">
            “আমরা ব্যবসা করি না, বরং আমানতের দায়িত্ব পালন করি — আল্লাহর সন্তুষ্টির আশায়।”
          </blockquote>

          <p>
            <span className="font-semibold text-forest-green">খিদমা অর্গানিক</span> — হালাল রিজিকের পথে একটি বিশ্বস্ত নাম।
          </p>

          <p>
            আপনার ভালোবাসা ও আস্থা আমাদের চালিকাশক্তি। আল্লাহ আপনাদের ও আমাদের সকল প্রচেষ্টা কবুল করুন। আমিন।
          </p>

          <div className="w-full h-px bg-gray-100 my-6"></div>
        </div>

        <br />
        <div className="text-sm text-gray-500 bg-white p-5 border border-gray-100 space-y-2.5">
          <p className="flex items-center gap-2">
            <span className="font-semibold text-midnight-navy">Mob:</span>
            <a
              href="tel:+8801787878743"
              className="text-forest-green hover:text-deepGreen transition-colors duration-300"
            >
              +8801787878743
            </a>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-midnight-navy">Address:</span>
            <span className=" text-gray-500">শুভাঢ্যা পশ্চিম পাড়া, কেরানীগঞ্জ, ঢাকা - ১৩১০</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-midnight-navy">Email:</span>
            <a
              href="mailto:khidma.info.test@gmail.com"
              className="text-forest-green hover:text-deepGreen transition-colors duration-300"
            >
              khidma.info.test@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
