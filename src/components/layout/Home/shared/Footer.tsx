import Image from "next/image";
import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { CiInstagram, CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-forest-green text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand Section */}
          <div className="lg:col-span-2">
           <div className="flex items-center gap-4 mb-8">
  <Link 
    href="/" 
    className="bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center w-16 h-16"
  >
    <Image
      width={70}
      height={70}
      src="/logo.svg"
      className="object-contain"
      alt="Khidmah Organic Logo"
    />
  </Link>
  <div>
    <h2 className="text-3xl font-semibold tracking-tight">
      Khidmah Organic
    </h2>
    <p className="text-sm text-white/80 font-medium">Nature's Best Promise</p>
  </div>
</div>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
              বরকতময় পণ্য খাঁটি ও হালাল পণ্যের নিশ্চয়তা, বিশ্বস্ততার
              প্রতিশ্রুতি। আল্লাহর সন্তুষ্টি ও আপনাদের বিশ্বাস অর্জন করাই আমাদের
              প্রধান লক্ষ্য। ইনশাআল্লাহ, সুন্নাহর পথে বরকত লাভের জন্য
              প্রতিজ্ঞাবদ্ধ।
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1F6fx8poq6/"
                target="_blank"
                className="w-9 h-9 bg-white/10 hover:bg-forest-green flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-forest-green flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-forest-green flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <FaPinterestP size={14} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-forest-green flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <CiInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-300 hover:text-white transition-colors text-[15px]"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-[15px]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:text-white transition-colors text-[15px]"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors text-[15px]"
                >
                  Discount offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              যোগাযোগ
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <FiPhone size={14} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">ফোন</p>
                  <a
                    href="tel:+8801342106348"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    +880 1342-106348
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MdOutlineEmail size={14} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">ইমেইল</p>
                  <a
                    href="mailto:borkotmoyponno@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    borkotmoyponno@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CiLocationOn size={14} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">ঠিকানা</p>
                  <a
                    href="https://www.google.com/maps/search/শুভাঢ্যা+পশ্চিম+পাড়া,+কেরানীগঞ্জ,+ঢাকা+-+১৩১০"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-sm leading-relaxed"
                  >
                    শুভাঢ্যা পশ্চিম পাড়া
                    <br />
                    কেরানীগঞ্জ, ঢাকা - ১৩১০
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © ২০২৫ Borkotmoy Ponno. সর্বস্বত্ব সংরক্ষিত।
            </p>

            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
