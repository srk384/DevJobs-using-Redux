import { useState } from "react";
import { motion } from "motion/react";
import { useJobSearch } from "../hooks/useJobSearch";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { searchJobs } = useJobSearch();

  const heading = "Are you a Passionate Developer?";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // delay between words
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchResults(searchJobs(value));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center  lg:px-12 lg:py-10 border-b border-gray-100 dark:border-gray-800">
      <div className="text-center md:text-left pb-6 md:pb-0">
        <motion.div
          className="text-4xl lg:text-5xl font-bold leading-tight text-gray-800 dark:text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {heading.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className={`inline-block mr-2 ${index === 3 ? "text-red-600 dark:text-red-500" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          className="mt-6 text-lg lg:text-xl text-gray-600 dark:text-gray-300 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          If{" "}
          <span className="text-green-600 dark:text-green-400 font-semibold not-italic">
            yes
          </span>
          , your job search ends here.
        </motion.p>

        <div className="relative">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="relative z-1 mt-6 cursor-pointer font-semibold bg-slate-700 text-white px-4 py-3 rounded-full dark:bg-neutral-200 dark:text-slate-800 shadow-md"
            onClick={() => {
              setIsSearchClicked(!isSearchClicked);
              setSearchResults([]);
            }}
          >
            Search Jobs
          </motion.button>
          {isSearchClicked && (
            <motion.span
              initial={{
                opacity: 0,
                translateX: "-40%",
              }}
              animate={{
                opacity: 1,
                translateX: 0,
                transition: { duration: 0.3 },
              }}
              className="absolute left-20 bottom-0.5"
            >
              <input
                className="pl-12 border-gray-300 bg-white border dark:bg-slate-800 dark:border-gray-500 p-2 px-6 w-96 border-l-0 rounded-full shadow-md dark:text-gray-200"
                type="text"
                name=""
                id=""
                placeholder="Search for job titles"
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
            </motion.span>
          )}
          {searchResults.length > 0 && (
            <div className="absolute w-1/2 max-h-52 bg-white ml-24 mt-1 rounded-lg overflow-auto custom-scrollbar">
              {searchResults.map((item, index) => (
                <Link to={`/apply/${item._id}`} state={item}>
                  <div
                    key={index}
                    className="flex justify-between p-2 hover:bg-gray-200 text-gray-700 cursor-pointer"
                    onClick={() => console.log("first")}
                  >
                    {`${item.title} | ${item.company}`}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-[300px] lg:h-[500px]">
        <img
          className="h-full mx-auto object-contain"
          src="/images/header_img.webp"
          alt="Job Portal Hero"
        />
      </div>
    </div>
  );
};
