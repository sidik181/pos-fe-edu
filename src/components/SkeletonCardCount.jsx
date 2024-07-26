const SkeletonCardCount = () => {
  return (
    <div className="px-5 animate-pulse py-3 w-full lg:w-[375px] h-24 bg-slate-800 rounded-md shadow-sm relative">
      <div className="flex justify-between">
        <div className="w-60 h-8 rounded-full mt-1 bg-slate-700"></div>
        <div className="rounded-full bg-slate-700 h-16 w-16"></div>
      </div>
      <div className=" bg-slate-700 w-14 h-8 rounded-full absolute top-14"></div>
    </div>
  );
};

export default SkeletonCardCount;
