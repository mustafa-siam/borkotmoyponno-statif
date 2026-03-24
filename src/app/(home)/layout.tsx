import Footer from "@/components/layout/Home/shared/Footer";
import Navbar from "@/components/layout/Home/shared/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-pageColor text-midnight-navy">
      <Navbar />
      <div className=" min-h-screen">{children}</div>
      <Footer/>
    </div>
  );
}
