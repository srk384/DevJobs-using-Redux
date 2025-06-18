import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocationFilter } from "../Redux/Slices/JobsDataSlice";

const LocationFilter = () => {
  const [location, setLocation] = useState(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const { jobsList } = useSelector((state) => state.JobsData);
  const dispatch = useDispatch();

  const filterByLocation = () => {
    const uniqueLocation = [];
    jobsList.forEach((job) => {
      if (!uniqueLocation.includes(job.location)) {
        uniqueLocation.push(job.location);
      }
    });
    setLocation(uniqueLocation);
  };

  const resultsByLocation = () => {
    console.log(selectedLocation)
    dispatch(setLocationFilter(selectedLocation));
  };

  return (
    <div
      className={`relative flex items-center gap-1 p-2  pr-1 border rounded-lg cursor-pointer hover:bg-gray-50  text-sm text-gray-700 dark:hover:bg-slate-800 dark:text-gray-200 ${selectedLocation.length > 0 ? "border-[rgb(144,190,109)] border-2" : "border-gray-300 dark:border-gray-700"}`}
      onClick={() => {
        filterByLocation();
        setIsLocationOpen(!isLocationOpen);
        // resultsByLocation();
      }}
    >
      <div className=" ">
        Location{" "}
        {selectedLocation.length > 0 && (
          <span className="absolute md:static -top-0.5 -right-0.5 text-xs bg-[rgb(144,190,109)] inline-block size-4 rounded-full text-center text-white">
            {selectedLocation.length}
          </span>
        )}{" "}
      </div>
      <img className="w-5 dark:invert-100" src="/images/icon_down-filled.png" alt="" />
      {location && isLocationOpen && (
        <div className="absolute bg-white/50 dark:bg-black/50 backdrop-blur-lg top-10 right-0 lg:left-0 w-52 shadow-lg rounded-lg flex flex-col z-10">
          <div className="max-h-54 overflow-y-auto custom-scrollbar">
            {location.map((item, index) => {
              const isSelected = selectedLocation.includes(item);

              return (
                <div
                  key={index}
                  className="flex justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (selectedLocation.includes(item)) {
                      setSelectedLocation(selectedLocation.filter((location) => location !== item));
                    } else {
                      setSelectedLocation([...selectedLocation, item]);
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
