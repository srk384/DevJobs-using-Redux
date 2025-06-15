import { useEffect, useState, useRef } from "react";
import JobDisplay from "../components/JobDisplay";
import JobsNavbar from "../components/JobsNavbar";
import { useSelector, useDispatch } from "react-redux";
import { setAllJobs } from "../Redux/Slices/JobsDataSlice";
import LoadingFallback from "../components/LoadingFallback";

const Alljobs = () => {
  const [job, setJob] = useState([]);
  const skipFirstRender = useRef(true);

  const { filteredJobs } = useSelector((state) => state.JobsData);
  const dispatch = useDispatch();

  // console.log(filteredJobs);

  useEffect(() => {
    fetch("/data/developer_job_data_with_ids.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAllJobs(data));
        setJob(data[0]);
      });
  }, []);

  useEffect(() => {
    if (skipFirstRender.current) {
      skipFirstRender.current = false;
      return;
    }
    setJob(filteredJobs[0]);
  }, [filteredJobs]);

  return (
    <>
      <JobsNavbar />
      <div className="flex max-w-7xl mx-auto">
        {/* {filteredJobs.length == 0 && (
          <div className="mx-auto">No Result Found</div>
        )} */}

        {!filteredJobs && <LoadingFallback/>}

        {filteredJobs.length > 0 && (
          <>
            <div className="left w-1/3 h-screen bg-gray-50 dark:bg-slate-900 p-4 overflow-auto custom-scrollbar">
              {filteredJobs &&
                filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 shadow-sm mb-3 rounded-lg bg-white cursor-pointer dark:bg-slate-800"
                    onClick={() => setJob(job)}
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
                        className="inline-block dark:invert-100 "
                        src="/images/bgs/register_count.svg"
                        alt=""
                      />
                      <p className="inline-block pl-1 text-sm md:text-md pt-3 dark:text-white">
                        {job.applicants}{" "}
                        <span className="text-gray-800 dark:text-gray-300">
                          Applied
                        </span>
                      </p>
                      <p className=" text-sm md:text-md dark:text-white">
                        {job.salary}
                      </p>

                      <div className="flex gap-2 pt-3 items-center">
                        {job.skills &&
                          job.skills.slice(0, 3).map((skill, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 inline-block text-xs bg-gray-200 text-gray-600 rounded dark:bg-slate-700 dark:text-gray-300"
                            >
                              {skill}
                            </div>
                          ))}
                        <div className="text-gray-600 text-sm dark:text-gray-300">
                          +{job.skills.length - 3}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="right w-2/3 h-screen bg-gray-50 p-4 overflow-auto dark:bg-slate-900 custom-scrollbar">
              {job && <JobDisplay job={job} />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Alljobs;
