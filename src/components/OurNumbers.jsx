const OurNumbers = () => {
  return (
    <div className="py-10 pb-20">
      <h1 className="text-center py-8 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 max-w-sm mx-auto bg-clip-text text-transparent">
        Our Numbers
      </h1>
      <div className="flex gap-4 mx-auto max-w-7xl justify-center items-center overflow-auto">
        <div className="p-4 bg-gray-200 dark:bg-slate-900 dark:text-white rounded-lg text-center">
            <div className="text-2xl font-bold">2 <span className="text-green-600 font-black">M+</span></div>
            <div className="text-lg text-gray-700 dark:text-gray-300">Active Users</div>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-slate-900 dark:text-white rounded-lg text-center">
            <div className="text-2xl font-bold">35 <span className="text-green-600 font-black">k+</span></div>
            <div className="text-lg text-gray-700 dark:text-gray-300">Opportunities</div>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-slate-900 dark:text-white rounded-lg text-center">
            <div className="text-2xl font-bold">513 <span className="text-green-600 font-black">+</span></div>
            <div className="text-lg text-gray-700 dark:text-gray-300">Companies</div>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-slate-900 dark:text-white rounded-lg text-center">
            <div className="text-2xl font-bold">75 <span className="text-green-600 font-black">K+</span></div>
            <div className="text-lg text-gray-700 dark:text-gray-300">Jobs_Offered</div>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-slate-900 dark:text-white rounded-lg text-center">
            <div className="text-2xl font-bold">27 <span className="text-green-600 font-black">+</span></div>
            <div className="text-lg text-gray-700 dark:text-gray-300">Countries</div>
        </div>
      </div>
    </div>
  );
};

export default OurNumbers;
