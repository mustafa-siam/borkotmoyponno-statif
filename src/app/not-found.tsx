"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pageColor flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-forest-green/20">404</h1>
        <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          Please check the URL or return to the homepage.
        </p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-forest-green text-white px-6 py-3 hover:bg-deepGreen transition-colors duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-400">
        If you believe this is an error, please contact our support team.
      </div>
    </div>
  );
}
