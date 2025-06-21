import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const JobDisplay = ({ job }) => {
  const containerRef = useRef(null);
  const skipRender = useRef(true);
  useEffect(() => {
    if (job) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [job]);

  return (
    <>
      {job && (
        <div
          className="lg:max-h-full lg:overflow-auto custom-scrollbar lg:pr-3"
          ref={containerRef}
        >
          {/* section 1 */}
          <div className="w-full bg-white p-3 md:p-5 shadow-sm mb-4 rounded-lg dark:bg-slate-800">
            <div className="flex gap-5 items-center">
              <div>
                <img
                  className="border-4 size-24 object-cover border-gray-200 rounded-lg dark:border-slate-700"
                  src={job.company_logo}
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-white">
                  {job.title}
                </h1>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {job.company}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-300">
                  <span className="text-2xl">
                    <IoLocationOutline />
                  </span>
                  <span>{job.location}</span>
                </div>
                <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-300">
                  <span className="text-xl">
                    <SlCalender />
                  </span>
                  <span>
                    <span className="font-bold">Updated On:</span> Jun 11, 2025
                  </span>
                </div>
              </div>

              {job.hideApplyBtn ? (
                ""
              ) : (
                <Link to={`/apply/${job._id}`} state={job}>
                  <button
                    className={`border-2 px-10 py-2 rounded-lg cursor-pointer transition font-bold border-[rgb(144,190,109)] bg-[rgb(144,190,109)] text-white `}
                  >
                    Apply
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* section 2 */}

          <div className=" bg-white p-3 md:p-5 mb-4 shadow-sm rounded-lg dark:bg-slate-800">
            <h1 className="font-semibold dark:text-white text-2xl text-gray-900 mb-6">
              Skills
            </h1>
            {job.skills &&
              job.skills.map((skill, index) => (
                <div
                  key={index}
                  className="inline-block px-4 py-1 m-1 lg:m-2 text-md bg-gray-200 text-gray-600 rounded-lg dark:bg-slate-700 dark:text-gray-300"
                >
                  {skill}
                </div>
              ))}
          </div>

          {/* section 3 */}
          {job.description && (
            <div className=" bg-white px-3 md:px-5 pt-3 md:pt-5 mb-4 shadow-sm rounded-lg dark:bg-slate-800">
              <h1 className="font-semibold dark:text-white text-2xl text-gray-900">
                Job Description
              </h1>

              {job.description.split("\n").map((line, index) => {
                const matched = line.match(/\*\*(.+?)\*\*/);

                if (index === 1 && line)
                  return (
                    <h1
                      key={index}
                      className="font-semibold dark:text-white text-gray-800"
                    >
                      {line}
                    </h1>
                  );

                if (line === "") return <br key={index} />;

                if (matched) {
                  const { input } = matched;
                  return (
                    <h1 key={index}>
                      {" "}
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">
                        {matched[1]}
                      </span>{" "}
                      <span className="text-md text-gray-800 dark:text-gray-200">
                        {input.split("** ")[1]}
                      </span>
                    </h1>
                  );
                } else
                  return (
                    <p key={index} className="text-gray-800 dark:text-gray-200">
                      {line}
                    </p>
                  );
              })}
            </div>
          )}

          {/* section 4 */}
          <div className="bg-white p-3 md:p-5 shadow-sm mb-4 rounded-lg dark:bg-slate-800">
            <h1 className="font-semibold dark:text-white text-2xl text-gray-900">
              Additional Information
            </h1>

            <div className="mt-6 my-4 h-32  border border-gray-300 dark:border-gray-700 rounded-lg flex justify-between">
              <div className="flex flex-col gap-2 justify-center pl-5">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Job Location
                </h1>
                <p className=" text-gray-600 dark:text-gray-200">
                  {job.location}
                </p>
              </div>
              <img
                className="object-contain rounded-r-lg"
                src="/images/job_location.webp"
                alt=""
              />
            </div>
            <div className="mt-6 my-4 h-32  border border-gray-300 dark:border-gray-700 rounded-lg flex justify-between">
              <div className="flex flex-col gap-2 justify-center pl-5">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Salary
                </h1>
                <p className=" text-gray-600 dark:text-gray-200">
                  {job.salary}
                </p>
              </div>
              <img
                className="object-contain rounded-r-lg"
                src="/images/salary.webp"
                alt=""
              />
            </div>
            <div className="mt-6 my-4 h-32  border border-gray-300 dark:border-gray-700 rounded-lg flex justify-between">
              <div className="flex flex-col gap-2 justify-center pl-5">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Job Type / Timing
                </h1>
                <p className=" text-gray-600 dark:text-gray-200">
                  In Office / Full Time
                </p>
              </div>
              <img
                className="object-contain rounded-r-lg"
                src="/images/job_typetiming.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDisplay;
