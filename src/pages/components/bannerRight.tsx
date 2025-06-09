import ButtonLogin from "./buttonLogin";
import BoxNotice from "./boxNotice";
import ButtonCafe from "./buttonCafe";
import BoXAdvertise from "./boxAdvertise";

const bannerRight = () => {
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

export default bannerRight;
