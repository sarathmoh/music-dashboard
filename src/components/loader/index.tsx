import { BounceLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-[#F5F5F5]">
      <BounceLoader color="#FDC0CC" />
    </div>
  );
};

export default Loader;
