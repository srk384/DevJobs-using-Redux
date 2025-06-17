import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { setAllJobs } from "../Redux/Slices/JobsDataSlice";
import { useSelector, useDispatch } from "react-redux";

const FeaturedJobs = () => {
  const [moveX, setMoveX] = useState(0);
  const overflowRef = useRef();

  const {  jobsList } = useSelector((state) => state.JobsData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jobsList.length) {
      fetch("/data/developer_job_data_with_ids.json")
        .then((res) => res.json())
        .then((data) => {
          dispatch(setAllJobs(data));
        });
    }
  }, []);

  useEffect(() => {
    overflowRef.current.style.transform = `translateX(${moveX}px)`;
  }, [moveX]);

  const bgArray = ["blue.webp", "pink.webp", "yellow.webp", "voilet.webp"];

  return (
    <div className="py-10 max-w-[1215px] mx-auto relative">
      <h1 className="text-center py-8 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 max-w-sm mx-auto bg-clip-text text-transparent">
        Featured Jobs
      </h1>

      <div className="overflow-auto md:overflow-hidden py-5 ">
        <motion.div
          className="flex flex-nowrap gap-4 transition-transform 0.5 ease-in pl-2"
          ref={overflowRef}
        >
          {jobsList.length &&
            jobsList.slice(0, 10).map((job, index) => (
              <div
                className="w-52 md:w-72 border border-gray-300 dark:border-gray-700 rounded-xl shrink-0 group hover:shadow-lg active:shadow-xl transition bg-white dark:bg-slate-900"
                key={index}
              >
                <div className="relative">
                  <img
                    className="object-cover rounded-t-xl"
                    src={`/images/bgs/${bgArray[index < 3 ? index : index % 4]}`}
                    alt="bg"
                  />
                  <img
                    className="size-16 md:size-20 absolute -bottom-5 right-5 border-5 md:border-8 border-white shadow-md"
                    src={job.company_logo}
                    alt="logo"
                  />
                </div>
                <div className="p-2 md:p-4 relative">
                  <h1 className="font-semibold text-lg md:text-xl pt-3 truncate dark:text-white">
                    {job.title}
                  </h1>
                  <p className="text-gray-600 truncate text-sm md:text-md dark:text-gray-300">
                    {job.company}
                  </p>
                  <img
                    className="inline-block dark:invert-100"
                    src="/images/bgs/register_count.svg"
                    alt=""
                  />
                  <p className="inline-block pl-1 text-xs md:text-sm pt-5 dark:text-white">
                    {job.applicants}{" "}
                    <span className="text-gray-800 dark:text-gray-300">
                      Applied
                    </span>
                  </p>
                  <p className=" text-xs md:text-sm dark:text-white">
                    {job.salary}
                  </p>
                  <Link to={`/apply/${job._id}`} state={job}>
                    <button className="absolute bottom-4 right-4 p-2 rounded-full group-hover:invert-100 group-hover:bg-amber-600 group-active:bg-amber-600 group-active:invert-100 cursor-pointer">
                      <img
                        className="size-4.5 dark:invert-100"
                        src="/images/arrow-up-right.png"
                        alt=""
                      />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </motion.div>
      </div>

      {/* {--arrow right--} */}
      <div
        className=" absolute -right-15  top-1/2 translate-1/2 bg-gray-200/60 cursor-pointer text-3xl rounded-lg hover:bg-blue-600 hover:text-white p-2 px-4 hidden md:block"
        onClick={() => {
          moveX > -1824 && setMoveX((prev) => prev - 304);
        }}
      >
        ›
      </div>

      {/* {--left right--} */}
      <div
        className=" absolute -left-25  top-1/2 translate-1/2 bg-gray-200/60 cursor-pointer text-3xl rounded-lg hover:bg-blue-600 hover:text-white p-2 px-4 hidden md:block"
        onClick={() => {
          moveX < 0 && setMoveX((prev) => prev + 304);
        }}
      >
        ‹
      </div>
    </div>
  );
};

export default FeaturedJobs;
