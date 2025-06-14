import JobFilters from "./JobFilters";
import { Link } from "react-router-dom";

const JobsNavbar = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-2 flex justify-between items-center border-b border-gray-300">
        <div className="flex gap-4 items-center">
          <Link to={"/"}>
          <img className="w-46" src="/images/logo2.png" alt="" />
          </Link>
          <div className="search border border-gray-300 rounded w-96">
            <input
              className="p-2 px-4 outline-none"
              type="text"
              placeholder="Search Jobs"
            />
          </div>
        </div>
        <div className="flex flex-col items-center pr-2">
          <img src="/images/profile.svg" alt="" />
          <div className="text-sm font-semibold">Profile</div>
        </div>
      </div>
      <JobFilters/>
    </div>
  );
};

export default JobsNavbar;
