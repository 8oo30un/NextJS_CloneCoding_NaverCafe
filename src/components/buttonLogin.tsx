const buttonLogin = () => {
  return (
    <div className="flex items-center justify-center w-[100%] h-[108px] border border-gray-300 rounded-sm">
      <div className="flex flex-col items-center justify-center  w-full">
        <button className="bg-green-400 hover:bg-green-500 font-black text-white py-2 px-4 rounded w-[90%] mb-3 ">
          NAVER 로그인
        </button>
        <div className="text-[11px] font-bold text-gray-400">
          아이디 찾기 | 비밀번호 찾기 | 회원가입
        </div>
      </div>
    </div>
  );
};

export default buttonLogin;
