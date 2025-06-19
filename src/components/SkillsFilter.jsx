import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSkillsFilter } from "../Redux/Slices/JobsDataSlice";

const SkillsFilter = () => {
  const { jobsList, filters } = useSelector((state) => state.JobsData);
  const [skills, setSkills] = useState([]);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(() => filters.skills);
  const dispatch = useDispatch();

  useEffect(() => {
    const uniqueSkills = [];
    jobsList.forEach((job) => {
      job.skills.forEach((skill) => {
        if (!uniqueSkills.includes(skill)) {
          uniqueSkills.push(skill);
        }
      });
    });
    setSkills(uniqueSkills);
  }, [jobsList]);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const applyFilters = () => dispatch(setSkillsFilter(selectedSkills));

  return (
    <div
      className={`relative flex items-center gap-1 p-2 pr-1 border rounded-lg cursor-pointer hover:bg-gray-50 mr-2 lg:mr-4 text-sm text-gray-700 dark:hover:bg-slate-800 dark:text-gray-200 ${
        selectedSkills.length > 0
          ? "border-[rgb(144,190,109)] border-2"
          : "border-gray-300 dark:border-gray-700"
      }`}
      onClick={() => setIsSkillsOpen(!isSkillsOpen)}
    >
      <div>
        Skills{" "}
        {selectedSkills.length > 0 && (
          <span className="text-xs absolute md:static -top-0.5 -right-0.5 bg-[rgb(144,190,109)] inline-block size-4 rounded-full text-center text-white">
            {selectedSkills.length}
          </span>
        )}
      </div>
      <img
        className="w-5 dark:invert-100"
        src="/images/icon_down-filled.png"
        alt=""
      />

      {isSkillsOpen && (
        <div className="absolute bg-white/50 dark:bg-black/50 backdrop-blur-lg top-10 right-0 lg:left-0 w-52 shadow-lg rounded-lg flex flex-col z-10">
          <div className="h-54 overflow-y-auto custom-scrollbar">
            {skills.map((item, index) => {
              const isSelected = selectedSkills.includes(item);
              return (
                <div
                  key={index}
                  className="flex justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSkill(item);
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
              e.stopPropagation();
              applyFilters()
              setIsSkillsOpen(false);
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
