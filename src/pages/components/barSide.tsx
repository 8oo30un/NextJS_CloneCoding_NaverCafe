import React, { useState } from "react";

const BarSide = () => {
  const menuItems = ["카페 홈", "이웃", "구독", "인기글", "내 소식", "채팅"];
  const [selected, setSelected] = useState("카페 홈");

  return (
    <div className="fixed top-[77px] left-0 h-[calc(100vh-77px)] w-[313px] border-r border-r-gray-300 bg-white">
      <div className="h-full ml-[113px] ">
        <div className="flex w-[142px] h-[306px]border-b border-b-gray-300">
          <div className="flex flex-col h-full w-[150px] pr-[12px] pt-[33px]  pb-[33px] space-y-[26px] border-b border-b-gray-300">
            {menuItems.map((item) => (
              <div
                key={item}
                onClick={() => setSelected(item)}
                className={`w-[150px] h-[29px] flex items-center px-2 rounded-[4px] cursor-pointer flex-shrink-0
            ${
              selected === item
                ? "bg-[#EBF8EC] text-[#469D51] font-extrabold"
                : "text-black font-extrabold"
            }`}
              >
                <h1 className="text-[14px]">{item}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[115px] h-[240px]">
          <div className="flex flex-col h-full justify-between w-[150px] pr-[12px] pt-[32px] pb-[33px]">
            <h1 className="text-[14px] ">주제별 카페 </h1>
            <h1 className="text-[14px] ">지역별 카페</h1>
            <h1 className="text-[14px] ">인기 팬카페</h1>
            <h1 className="text-[14px] ">대표 카페</h1>
            <h1 className="text-[14px] ">카페 랭킹</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarSide;
