import { useState } from "react";
import { Link } from "react-router-dom";
import { useJobSearch } from "../hooks/useJobSearch";

const JobsNavbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { searchJobs } = useJobSearch();

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchResults(searchJobs(value));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-2 flex justify-between items-center border-b border-gray-300">
        <div className="flex gap-4 items-center">
          <Link to={"/"}>
            <img className="w-46" src="/images/logo2.png" alt="" />
          </Link>
          <div className="search border border-gray-300 rounded-lg w-96">
            <input
              className="p-2 px-4 outline-none w-full"
              type="text"
              placeholder="Search Jobs"
              onChange={(e) => {
                handleSearch(e);
              }}
              onBlur={(e) => {
                setSearchResults([]);
                e.target.value = "";
              }}
            />
            {searchResults.length > 0 && (
              <div className="absolute w-96 z-10 max-h-52 bg-white mt-1 rounded-lg overflow-auto custom-scrollbar shadow-lg">
                {searchResults.map((item, index) => (
                  <Link to={`/apply/${item._id}`} state={item}>
                    <div
                      key={index}
                      className="flex justify-between p-2 hover:bg-gray-200 text-gray-700 cursor-pointer"
                      onClick={() => console.log("first")}
                    >
                      {`${item.title} | ${item.company}`}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center  gap-8">
          <Link to={"/jobs"}>
            <div className="cursor-pointer hover:underline underline-offset-4 transition flex flex-col items-center">
              <img src="/images/suitcase.png" alt="" />
              <div className="text-md font-semibold">Jobs</div>
            </div>
          </Link>
          <div className="flex flex-col items-center pr-2">
            <img src="/images/profile.png" alt="" />
            <div className="text-md font-semibold">Profile</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsNavbar;
