import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setJobsData } from "../Redux/Slices/JobsDataSlice";

const SkillsFilter = () => {
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState(null);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const { jobsList } = useSelector((state) => state.JobsData);
  const dispatch = useDispatch();

  const filterBySkills = () => {
    const uniqueSkills = [];
    jobs.forEach((job) => {
      job.skills.forEach((skill) => {
        if (!uniqueSkills.includes(skill)) {
          uniqueSkills.push(skill);
        }
      });
    });
    setSkills(uniqueSkills);
  };

  const resultsBySkills = () => {
    const filtered = [];

    jobsList.forEach((job) => {
      job.skills.forEach((skill) => {
        if (selectedSkills.includesAll) {
          if (filtered.includes(job)) {
            return;
          } else {
            filtered.push(job);
          }
        }
      });
    });

    console.log(filtered);
    dispatch(setJobsData(filtered))
  };

  useEffect(() => {
    fetch("/data/developer_job_data_with_ids.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [filterBySkills]);

  return (
    <div
      className={`relative flex items-center gap-1 p-2  pr-1 border rounded-lg cursor-pointer hover:bg-gray-50 mr-4 text-sm text-gray-700 ${selectedSkills.length > 0 ? "border-[rgb(144,190,109)] border-2" : "border-gray-300 "}`}
      onClick={() => {
        filterBySkills();
        setIsSkillsOpen(!isSkillsOpen);
        //resultsByTitle();
      }}
    >
      <div className=" ">
        Skills{" "}
        {selectedSkills.length > 0 && (
          <span className="text-xs bg-[rgb(144,190,109)] inline-block size-4 rounded-full text-center text-white">
            {selectedSkills.length}
          </span>
        )}{" "}
      </div>
      <img className="w-5" src="/images/icon_down-filled.png" alt="" />
      {skills && isSkillsOpen && (
        <div className="absolute bg-white/50 backdrop-blur-lg top-10 left-0 w-52 shadow-lg rounded-lg flex flex-col ">
          <div className="h-54 overflow-y-auto custom-scrollbar">
            {skills.map((item, index) => {
              const isSelected = selectedSkills.includes(item);

              return (
                <div
                  key={index}
                  className="flex justify-between p-2 hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (selectedSkills.includes(item)) {
                      setSelectedSkills(
                        selectedSkills.filter((skill) => skill !== item)
                      );
                    } else {
                      setSelectedSkills([...selectedSkills, item]);
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
              resultsBySkills();
              setIsSkillsOpen(!isSkillsOpen);
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsFilter;
