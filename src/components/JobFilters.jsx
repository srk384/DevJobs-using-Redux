import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTitlesFilter, sortJobs } from "../Redux/Slices/JobsDataSlice";
import SkillsFilter from "./SkillsFilter";
import LocationFilter from "./LocationFilter";

const JobFilters = () => {
  const [category, setCategory] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [isSalarySortClicked, setIsSalarySortClicked] = useState(false);
  const [isApplicantSortClicked, setIsApplicantSortClicked] = useState(false);

  const { jobsList, filteredJobs, filters } = useSelector(
    (state) => state.JobsData
  );
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

  const filterCount = () => {
    let count = 0;
    for (const key in filters) {
      count += filters[key].length;
    }
    return count;
  };

  useEffect(() => {
    setIsSalarySortClicked(false);
    setIsApplicantSortClicked(false);
  }, [filters]);

  return (
    <div className="bg-white w-full p-2 flex flex-col gap-2 lg:gap-0 lg:flex-row lg:px-4 mx-auto max-w-7xl dark:border-gray-700 dark:text-gray-200 dark:bg-slate-900">
      {/* Sort */}

      <div className="sort flex items-center justify-start">
        <div className="bg-[rgb(144,190,109)] px-4 p-2 inline-block text-white rounded-lg text-sm">
          Sort
        </div>
        <div className="w-px h-10 bg-gray-300 dark:bg-gray-700 inline-block mx-2 lg:mx-4"></div>
        <div
          className={`text-xs md:text-sm text-gray-700 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 dark:text-gray-200 mr-2 lg:mr-4 ${isSalarySortClicked ? "border-[rgb(144,190,109)] border-2" : "border-gray-300 dark:border-gray-700"}`}
          onClick={() => {
            SalaryHightoLow();
            setIsSalarySortClicked(true);
            setIsApplicantSortClicked(false);
          }}
        >
          Salary (High to Low)
        </div>
        <div
          className={`text-xs md:text-sm text-gray-700 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 dark:text-gray-200 ${isApplicantSortClicked ? "border-[rgb(144,190,109)] border-2" : "border-gray-300 dark:border-gray-700"}`}
          onClick={() => {
            ApplicantsLowToHigh();
            setIsApplicantSortClicked(true);
            setIsSalarySortClicked(false);
          }}
        >
          Applicants (Low to High)
        </div>
      </div>

      {/* filters */}

      <div className="filter flex items-center justify-start">
        <div className="bg-[rgb(144,190,109)] px-4 p-2 inline-block text-white rounded-lg text-sm lg:ml-10">
          Filter{" "}
          {filterCount() > 0 && (
            <span className="text-xs bg-white inline-block size-4 rounded-full text-center text-[rgb(144,190,109)] ml-1">
              {filterCount()}
            </span>
          )}
        </div>

        <div className="w-px h-10 bg-gray-300 inline-block mx-2 lg:mx-4  dark:bg-gray-700"></div>

        {/* job titles */}

        <div
          className={`relative flex items-center gap-1 p-2  pr-1 border rounded-lg cursor-pointer hover:bg-gray-50 mr-2 lg:mr-4 text-sm text-gray-700 dark:hover:bg-slate-800 dark:text-gray-200 ${selectedTitles.length > 0 ? "border-[rgb(144,190,109)] border-2" : "border-gray-300 dark:border-gray-700"}`}
          onClick={() => {
            filterTitles();
            setIsCategoryOpen(!isCategoryOpen);
            //   resultsByTitle();
          }}
        >
          <div className="">
            Category{" "}
            {selectedTitles.length > 0 && (
              <span className="text-xs bg-[rgb(144,190,109)] inline-block size-4 rounded-full text-center text-white">
                {selectedTitles.length}
              </span>
            )}{" "}
          </div>
          <img
            className="w-5 dark:invert-100"
            src="/images/icon_down-filled.png"
            alt=""
          />
          {category && isCategoryOpen && (
            <div className="absolute bg-white/50 dark:bg-black/50 backdrop-blur-lg top-10 left-0 w-52 shadow-lg rounded-lg flex flex-col z-10">
              {category.map((item, index) => {
                const isSelected = selectedTitles.includes(item);

                return (
                  <div
                    key={index}
                    className="flex justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
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
    </div>
  );
};

export default JobFilters;
