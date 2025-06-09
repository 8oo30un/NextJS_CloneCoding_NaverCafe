import Image from "next/image";

const buttonCafe = () => {
  return (
    <div className="w-[100%] h-[40px] mt-[38px] rounded-sm flex bg-[#f7f8f9]">
      <Image
        src="/images/cafe.png"
        alt="cafe"
        width={40}
        height={40}
        className="ml-[4px]"
      />
      <div className="pl-[12px] flex items-center text-[12px] font-bold text-black">
        카페팀 공식 카페 바로가기
      </div>
    </div>
  );
};

export default buttonCafe;
