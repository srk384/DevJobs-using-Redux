import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setJobsData, setFilters } from "../Redux/Slices/JobsDataSlice";

const LocationFilter = () => {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const { jobsList, jobFilters } = useSelector((state) => state.JobsData);
  const dispatch = useDispatch();

  const filterByLocation = () => {
    const uniqueLocation = [];
    jobs.forEach((job) => {
      if (!uniqueLocation.includes(job.location)) {
        uniqueLocation.push(job.location);
      }
    });
    setLocation(uniqueLocation);
  };

  const resultsByLocation = () => {

    const filtered = jobs.filter((job) => jobFilters.includes(job.location && job.title));
    // filtered.length > 0
    //   ? dispatch(setJobsData(filtered))
    //   : dispatch(setJobsData(jobs));
    dispatch(setJobsData(filtered));
    console.log(filtered)
  };

  useEffect(() => {
    fetch("/data/developer_job_data_with_ids.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [filterByLocation]);

  return (
    <div
      className={`relative flex items-center gap-1 p-2  pr-1 border rounded-lg cursor-pointer hover:bg-gray-50 mr-4 text-sm text-gray-700 ${selectedLocation.length > 0 ? "border-[rgb(144,190,109)] border-2" : "border-gray-300 "}`}
      onClick={() => {
        filterByLocation();
        setIsLocationOpen(!isLocationOpen);
        // resultsByLocation();
      }}
    >
      <div className=" ">
        Location{" "}
        {selectedLocation.length > 0 && (
          <span className="text-xs bg-[rgb(144,190,109)] inline-block size-4 rounded-full text-center text-white">
            {selectedLocation.length}
          </span>
        )}{" "}
      </div>
      <img className="w-5" src="/images/icon_down-filled.png" alt="" />
      {location && isLocationOpen && (
        <div className="absolute bg-white/50 backdrop-blur-lg top-10 left-0 w-52 shadow-lg rounded-lg flex flex-col ">
          <div className="max-h-54 overflow-y-auto custom-scrollbar">
            {location.map((item, index) => {
              const isSelected = jobFilters.includes(item);

              return (
                <div
                  key={index}
                  className="flex justify-between p-2 hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (jobFilters.includes(item)) {
                      dispatch(setFilters(jobFilters.filter((location) => location !== item)))
                    } else {
                      dispatch(setFilters([...jobFilters, item]))
                    }
                  }}
                >
                  <span>{item}</span>
                  <input type="checkbox" checked={isSelected} readOnly />
                </div>
              );
            })}
          </div>
          <button
            className="bg-[rgb(144,190,109)] px-4 py-1.5 rounded-b-lg text-white cursor-pointer hover:bg-[rgb(115,155,85)] mt-1"
            onClick={(e) => {
              resultsByLocation();
              setIsLocationOpen(!isLocationOpen);
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationFilter;
