import { FaSpinner } from "react-icons/fa";


const LoadingFallback = () => {
  return (
    <div className="flex min-h-[calc(100vh-328px-80px)] items-center justify-center text-xl text-neutral-500">
      <div className="flex flex-col items-center gap-2">
        <FaSpinner className="mb-4 animate-spin text-5xl text-[#fe5156]" />
        <div>Loading product...</div>
      </div>
    </div>
  );
};

export default LoadingFallback;
