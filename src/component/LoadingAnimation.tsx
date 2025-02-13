const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-24 h-24">
        {/* Outer rotating circle */}
        <div className="absolute inset-0 border-4 border-t-[#6f5cc4] border-r-[#8872d9] border-b-[#6f5cc4] border-l-[#8872d9] 
          rounded-full animate-spin duration-1000">
        </div>
        {/* Inner static circle */}
        <div className="absolute inset-2 bg-[#141121] rounded-full flex items-center justify-center">
          <div className="w-12 h-12 text-3xl">✨</div>
        </div>
      </div>
      <div className="mt-6 text-[#6f5cc4] font-medium animate-pulse">
        Rewriting your email...
      </div>
    </div>
  );
};

export default LoadingAnimation;