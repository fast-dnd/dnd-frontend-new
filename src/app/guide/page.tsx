import HowToPlay from "@/components/how-to-play";
import Navbar from "@/components/navbar";

const Guide = () => {
  return (
    <div className="flex flex-col items-center pb-12">
      <Navbar authed={false} />
      <HowToPlay />
    </div>
  );
};

export default Guide;
