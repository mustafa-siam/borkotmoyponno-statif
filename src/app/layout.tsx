import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxWrapper from "@/redux/ReduxWrapper";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "@/components/GTMPageViewTracker";
import FloatingPublicButtons from "@/components/FloatingPublicButtons";

const anek_bangla = Anek_Bangla({
  variable: "--font-anek_bangla",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Khidmah Organic",
  description:
    "Khidmah Organic is an e-commerce platform that specializes in selling organic and natural products, including food items, cosmetics, and household goods. The platform aims to provide customers with high-quality, eco-friendly products sourced from trusted suppliers.",
    icons: {
    icon: [
      {
        url: "/logo.svg?v=1", // Added versioning to break cache
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/logo.svg?v=1"],
    apple: [
      {
        url: "/logo.svg?v=1",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "Khidmah Organic",
    description:
      "Khidmah Organic is an e-commerce platform that specializes in selling organic and natural products, including food items, cosmetics, and household goods. The platform aims to provide customers with high-quality, eco-friendly products sourced from trusted suppliers.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://borkotmoyponno.com",
    siteName: "Borkotmoy Ponno",
    images: [
      {
        url: "https://borkotmoyponno.com/web.png",
        width: 1200,
        height: 630,
        alt: "Khidmah Organic",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khidmah Organic",
    description:
      "Khidmah Organic is an e-commerce platform that specializes in selling organic and natural products, including food items, cosmetics, and household goods. The platform aims to provide customers with high-quality, eco-friendly products sourced from trusted suppliers.",
    images: ["https://borkotmoyponno.com/web.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      <ReduxWrapper>
        <body
          className={`${anek_bangla.className} ${anek_bangla.variable} antialiased`}
        >
          <GTMPageViewTracker />
          {/* <RightClickDisable /> */}
          <main>{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
          <FloatingPublicButtons />
        </body>
      </ReduxWrapper>
    </html>
  );
}

// cartcard
// carttable
