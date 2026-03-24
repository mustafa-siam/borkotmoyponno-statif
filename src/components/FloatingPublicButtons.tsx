"use client";

import { usePathname } from "next/navigation";
import WhatsAppButton from "@/components/layout/Home/shared/CallButton";
import FacebookMessengerButton from "@/components/layout/Home/shared/MessengerChat";
import TawkToChat from "@/components/TawkToChat";

export default function FloatingPublicButtons() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <div className="z-50">
      <FacebookMessengerButton />
      <WhatsAppButton />
      {/* <div className="mr-20"><TawkToChat /></div> */}
    </div>
  );
}
