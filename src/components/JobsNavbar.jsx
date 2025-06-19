import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useJobSearch } from "../hooks/useJobSearch";

const JobsNavbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const { searchJobs } = useJobSearch();
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchResults(searchJobs(value));
  };

  return (
    <div className="sticky lg:static top-0 z-100">
      <div className="bg-white p-2 px-4 flex justify-between lg:justify-around items-center border-b border-gray-300 dark:border-gray-700 dark:text-gray-200 dark:bg-slate-900">
        <div className="flex md:gap-4 items-center">
          <Link to={"/"}>
            <img
              className={`w-32 md:w-40 lg:w-full ${openSearchBar ? "hidden md:block" : "block"}`}
              src="/images/logo2.png"
              alt=""
            />
          </Link>
          <div
            className={`search relative border border-gray-300 dark:border-gray-700 rounded-lg w-full md:w-96  ${openSearchBar ? "block" : "hidden md:block"}`}
          >
            {searchRef.current?.value && (
              <img
                src="/images/close.png"
                alt=""
                className="absolute right-1 top-1/2 -translate-y-1/2  w-6 dark:invert-80 cursor-pointer"
                onClick={() => {
                  setSearchResults([]);
                  searchRef.current.value = "";
                }}
              />
            )}
            <input
              ref={searchRef}
              className="p-2 px-4 outline-none w-full pr-8 md:pr-0"
              type="text"
              placeholder="Search Jobs"
              onChange={(e) => {
                handleSearch(e);
              }}
            />
            {searchResults.length > 0 && (
              <div className="absolute w-96 z-10 max-h-52 bg-white dark:bg-slate-900 mt-1 rounded-lg overflow-auto custom-scrollbar shadow-lg">
                {searchResults.map((item, index) => (
                  <Link to={`/apply/${item._id}`} state={item} key={index}>
                    <div
                      className="flex justify-between p-2 hover:bg-gray-200 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300 cursor-pointer"
                      onClick={() => setSearchResults([])}
                    >
                      {`${item.title} | ${item.company}`}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <div
            className="flex flex-col items-center md:hidden"
            onClick={() => setOpenSearchBar(!openSearchBar)}
          >
            <img
              className="w-6 md:w-8 dark:invert-75 "
              src="/images/search-bold.png"
              alt=""
            />
            <div className="text-sm lg:text-md font-semibold">Search</div>
          </div>
          <Link to={"/jobs"}>
            <div className="cursor-pointer hover:underline underline-offset-4 transition flex flex-col items-center group">
              <img
                className="w-6 md:w-8 dark:invert-75 dark:group-hover:invert-100"
                src="/images/suitcase.png"
                alt=""
              />
              <div className="text-sm lg:text-md font-semibold dark:hover:text-white">
                Jobs
              </div>
            </div>
          </Link>
          <div className="hidden flex-col items-center md:flex">
            <img
              className="w-6 md:w-8 dark:invert-75 "
              src="/images/profile.png"
              alt=""
            />
            <div className="text-sm lg:text-md font-semibold">Profile</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsNavbar;
