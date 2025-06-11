import BannerRight from "@/components/bannerRight";
import BannerLeft from "@/components/bannerLeft";

export default function CafeHomePage() {
  return (
    <div className="pt-[77px] ml-[313px] min-h-screen ">
      <div className="flex w-full ">
        <div className="w-[70%]  h-screen">
          <BannerLeft />
        </div>
        <div className="w-[30%] border-l border-l-[#d7d8d9] h-screen">
          <BannerRight />
        </div>
      </div>
    </div>
  );
}
