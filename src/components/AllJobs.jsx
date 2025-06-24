import { useEffect, useState } from "react";
import JobDisplay from "./JobDisplay";
import { useSelector, useDispatch } from "react-redux";
import { setAllJobs } from "../Redux/Slices/JobsDataSlice";
import { useIsMobile } from "../hooks/useIsMobile";
import { Link } from "react-router-dom";

const Alljobs = () => {
  const [job, setJob] = useState("");
  const [activeJobId, setActiveJobId] = useState(null);
  const { filteredJobs } = useSelector((state) => state.JobsData);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!filteredJobs.length) {
      fetch("/data/developer_job_data_with_ids.json")
        .then((res) => res.json())
        .then((data) => {
          dispatch(setAllJobs(data));
          setJob(data[0]);
        });
    }
  }, []);

  useEffect(() => {
    if (filteredJobs.length > 0) {
      setJob(filteredJobs[0]);
      setActiveJobId(filteredJobs[0]._id);
    }
  }, [filteredJobs]);

  return (
    <>
      {filteredJobs.length == 0 && (
        <div className="flex justify-center items-center min-h-[70vh] text-2xl font-semibold dark:text-gray-300">
          No Result Found
        </div>
      )}
      <div className="md:flex max-w-7xl mx-auto">
        {filteredJobs.length > 0 && (
          <>
            <div className="left w-full lg:w-1/3 h-full lg:h-[86.5vh] bg-gray-50 dark:bg-slate-900 p-4 lg:overflow-auto custom-scrollbar mx-auto">
              {filteredJobs &&
                filteredJobs.map((job, index) => {
                  const CardContent = (
                    <div
                      className={`flex gap-3 p-2 md:p-4 md:pl-2.5 shadow-sm mb-3 rounded-lg bg-white cursor-pointer dark:bg-slate-800 border-l-5 ${job._id === activeJobId ? "border-l-[rgb(144,190,109)]" : "border-l-transparent"}`}
                    >
                      <div>
                        <img
                          className="w-16 h-14 object-cover border-4 border-gray-200 rounded-lg dark:border-slate-700"
                          src={job.company_logo}
                          alt={job.company}
                        />
                      </div>
                      <div className="w-full">
                        <div className="text-gray-800 bg-gray-200 inline-block rounded px-2 py-0.5 text-xs mb-2 dark:bg-slate-700 dark:text-gray-300">
                          Job
                        </div>
                        <h1 className="text-lg font-semibold hover:text-blue-500 dark:text-white">
                          {job.title}
                        </h1>
                        <p className="text-gray-800 text-sm dark:text-gray-300">
                          {job.company}
                        </p>
                        <img
                          className="inline-block dark:invert-100"
                          src="/images/bgs/register_count.svg"
                          alt=""
                        />
                        <p className="inline-block pl-1 text-sm md:text-md pt-3 dark:text-white">
                          {job.applicants}{" "}
                          <span className="text-gray-800 dark:text-gray-300">
                            Applied
                          </span>
                        </p>
                        <p className="text-sm md:text-md dark:text-white">
                          {job.salary}
                        </p>
                        <div className="flex gap-2 pt-3 items-center">
                          {job.skills.slice(0, 3).map((skill, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-1 inline-block text-xs bg-gray-200 text-gray-600 rounded dark:bg-slate-700 dark:text-gray-300"
                            >
                              {skill}
                            </div>
                          ))}
                          {job.skills.length > 3 && (
                            <div className="text-gray-600 text-sm dark:text-gray-300">
                              +{job.skills.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );

                  return isMobile ? (
                    <Link to={`/apply/${job._id}`} state={job} key={index}>
                      {CardContent}
                    </Link>
                  ) : (
                    <div
                      key={index}
                      onClick={() => {
                        setJob(job);
                        setActiveJobId(job._id);
                      }}
                    >
                      {CardContent}
                    </div>
                  );
                })}
            </div>
            <div className="right w-2/3 h-[86.5vh] bg-gray-50 p-4 overflow-auto dark:bg-slate-900 custom-scrollbar hidden lg:block">
              {job && <JobDisplay job={job} />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Alljobs;
