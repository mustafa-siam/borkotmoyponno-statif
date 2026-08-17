import Banner from "@/components/layout/Home/Home/Banner/Banner";
import Categories from "@/components/layout/Home/Home/Categories/Categories";
import FeaturedProduct from "@/components/layout/Home/Home/FeaturedProduct/FeaturedProduct";
import Reliable from "@/components/layout/Home/Home/Reliable/Reliable";
import Review from "@/components/layout/Home/Home/Review/Review";
import Stats from "@/components/layout/Home/Home/Stats/Stats";

export default function Page() {
  return (
    <div>
      <Banner />
      <div className="bg-white border-y border-gray-100/80">
        <Categories />
      </div>
      <div className="bg-pageColor">
        <FeaturedProduct />
      </div>
      <div className="bg-[#E4E9E6]">
        <Reliable />
      </div>
      {/* <div className="bg-white">
        <Stats />
      </div> */}
      <div className="bg-gray-50">
        <Review />
      </div>
    </div>
  );
}
