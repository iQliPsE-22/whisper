import logo from "./Assets/whisper.svg";
import Image from "next/image";

const page = () => {
  return (
    <div className="h-screen w-screen text-center flex items-center justify-center">
      <div className="logo">
        <Image priority src={logo} alt = "logo"/>
      </div>
    </div>
  );
};

export default page;
