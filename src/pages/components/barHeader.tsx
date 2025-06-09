import Image from "next/image";
import React from "react";

const BarHeader = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white text-black h-[77px] border-b border-b-gray-300">
      {" "}
      <div className="max-w-[1512px] mx-[97px] flex items-center justify-between pt-[20px] pb-[20px] pl-4">
        <div className="flex items-center space-x-[101px]">
          <div className="flex items-center justify-center">
            <h2 className="text-[18px] font-extrabold">NAVER</h2>
            <h1 className="text-[24px] font-bold"> 카페</h1>
          </div>
          <div className="relative w-[292px] h-[33px]">
            <input
              type="text"
              placeholder="원하는 카페, 글을 찾아보세요"
              className="w-full h-full bg-white border border-[#D9D9D9] rounded-[14px] px-4 pr-10 text-sm focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <Image
                src="/images/search.png"
                alt="검색"
                width={21}
                height={21}
              />
            </button>
          </div>
        </div>

        <div className="flex space-x-[19px]">
          <button className="max-w-[42px] max-h-[18px] text-[11px] bg-white  text-gray-600 border border-gray-300 px-[5px] py-[3px] flex items-center justify-center ">
            로그인
          </button>
          <button className="flex items-center justify-center ">
            <Image src="/images/menu.png" alt="menu" width={21} height={21} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarHeader;
