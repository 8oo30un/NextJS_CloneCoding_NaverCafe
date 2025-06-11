import Image from "next/image";

const boxAdvertise = () => {
  return (
    <div className="relative mt-[38px] w-full h-[30%] rounded-sm bg-gray-300">
      <Image
        src="/images/advertise.png"
        alt="advertise"
        fill
        className=" object-cover rounded-sm"
      />
    </div>
  );
};

export default boxAdvertise;
