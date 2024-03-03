import Image from "next/image";
import dynamic from "next/dynamic";
const logo = dynamic(() => import("./Assets/whisper.svg"));
const page = () => {
  return (
    <div className="h-screen w-screen text-center flex items-center justify-center">
      <div className="logo">
        <Image priority src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default page;
