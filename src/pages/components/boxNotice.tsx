const boxNotice = () => {
  return (
    <div className="w-full border border-gray-300 rounded-sm flex flex-col items-center justify-center h-[183px] mt-[38px]">
      <div className=" h-[80%]  w-[90%]">
        <div className="font-bold text-[14px]">공지사항</div>
        <div className="h-[85%]">
          <div className="flex items-center justify-center h-full">
            <div className="text-[12px] text-gray-400">
              현재 공지사항이 없습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default boxNotice;
