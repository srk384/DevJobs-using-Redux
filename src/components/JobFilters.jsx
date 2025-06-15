import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTitlesFilter, sortJobs } from "../Redux/Slices/JobsDataSlice";
import SkillsFilter from "./SkillsFilter";
import LocationFilter from "./LocationFilter";

const JobFilters = () => {
  const [category, setCategory] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedTitles, setSelectedTitles] = useState([]);

  const { jobsList, filteredJobs } = useSelector((state) => state.JobsData);
  const dispatch = useDispatch();

  const SalaryHightoLow = () => {
    let sortedSalary = [...filteredJobs].sort((a, b) => {
      const getMax = (str) =>
        parseInt(str.split("-")[1].replace(/[\$,]/g, "").trim());
      return getMax(b.salary) - getMax(a.salary);
    });
    dispatch(sortJobs(sortedSalary));
  };

  const ApplicantsLowToHigh = () => {
    let sortedApplicants = [...filteredJobs].sort((a, b) => {
      return a.applicants - b.applicants;
    });
    dispatch(sortJobs(sortedApplicants));
  };

  const filterTitles = () => {
    const uniqueTitles = [];
    jobsList.forEach((job) => {
      if (!uniqueTitles.includes(job.title)) {
        uniqueTitles.push(job.title);
      }
    });
    setCategory(uniqueTitles);
  };

  const resultsByTitle = () => {
    dispatch(setTitlesFilter(selectedTitles));
  };

  return (
    <div className="bg-white w-ful p-2 flex items-center px-4">
      <div className="bg-[rgb(144,190,109)] px-4 p-2 inline-block text-white rounded-lg text-sm">
        Sort
      </div>
      <div className="w-px h-10 bg-gray-300 inline-block mx-4"></div>
      <div
        className="text-sm text-gray-700 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 mr-4"
        onClick={() => SalaryHightoLow()}
      >
        Salary (High to Low)
      </div>
      <div
        className="text-sm text-gray-700 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
        onClick={() => ApplicantsLowToHigh()}
      >
        Applicants (Low to High)
      </div>

      <div className="bg-[rgb(144,190,109)] px-4 p-2 inline-block text-white rounded-lg text-sm ml-10">
        Filter
      </div>

      <div className="w-px h-10 bg-gray-300 inline-block mx-4"></div>

      {/* job titles */}

      <div
        className={`relative flex items-center gap-1 p-2  pr-1 border rounded-lg cursor-pointer hover:bg-gray-50 mr-4 text-sm text-gray-700 ${selectedTitles.length > 0 ? "border-[rgb(144,190,109)] border-2" : "border-gray-300 "}`}
        onClick={() => {
          filterTitles();
          setIsCategoryOpen(!isCategoryOpen);
          //   resultsByTitle();
        }}
      >
        <div className=" ">
          Category{" "}
          {selectedTitles.length > 0 && (
            <span className="text-xs bg-[rgb(144,190,109)] inline-block size-4 rounded-full text-center text-white">
              {selectedTitles.length}
            </span>
          )}{" "}
        </div>
        <img className="w-5" src="/images/icon_down-filled.png" alt="" />
        {category && isCategoryOpen && (
          <div className="absolute bg-white/50 backdrop-blur-lg top-10 left-0 w-52 shadow-lg rounded-lg flex flex-col">
            {category.map((item, index) => {
              const isSelected = selectedTitles.includes(item);

              return (
                <div
                  key={index}
                  className="flex justify-between p-2 hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (selectedTitles.includes(item)) {
                      setSelectedTitles(
                        selectedTitles.filter((title) => title !== item)
                      );
                    } else {
                      setSelectedTitles([...selectedTitles, item]);
                    }
                  }}
                >
                  <span>{item}</span>
                  <input type="checkbox" checked={isSelected} readOnly />
                </div>
              );
            })}
            <button
              className="bg-[rgb(144,190,109)] px-4 py-1.5 rounded-b-lg text-white cursor-pointer hover:bg-[rgb(115,155,85)] mt-1"
              onClick={() => {
                resultsByTitle();
                setIsCategoryOpen(!isCategoryOpen);
              }}
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* job skills */}

      <SkillsFilter />

      {/* job location */}

      <LocationFilter />
    </div>
  );
};

export default JobFilters;
