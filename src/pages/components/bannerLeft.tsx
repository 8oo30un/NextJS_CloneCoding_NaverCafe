import ButtonLogin from "../components/buttonLogin";
import BoxNotice from "../components/boxNotice";
import ButtonCafe from "../components/buttonCafe";
import BoXAdvertise from "../components/boxAdvertise";

const bannerLeft = () => {
  return (
    <div className="flex w-full">
      <div className="w-[70%] h-screen ml-[15%] mt-[38px]">
        <ButtonLogin />
        <BoxNotice />
        <ButtonCafe />
        <BoXAdvertise />
      </div>
      <div className="w-[30%] h-screenflex items-center justify-center"></div>
    </div>
  );
};

export default bannerLeft;
