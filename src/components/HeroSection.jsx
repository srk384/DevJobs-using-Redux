import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useJobSearch } from "../hooks/useJobSearch";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { searchJobs } = useJobSearch();
  const searchRef = useRef(null);
  const searchRef2 = useRef(null);

  const heading = "Are you a Passionate Developer?";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
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
    <div className="flex flex-col-reverse md:flex-row justify-center items-center px-4 lg:px-12 lg:py-10 border-b border-gray-100 dark:border-gray-800 pb-10">
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
            className="relative z-1 mt-6 cursor-pointer font-semibold bg-slate-700 text-white px-4 py-3 rounded-full dark:bg-neutral-200 dark:text-slate-800 shadow-md hidden md:block"
            onClick={() => {
              setIsSearchClicked(!isSearchClicked);
              setSearchResults([]);
              searchRef2.current.value = "";
            }}
          >
            Search Jobs
          </motion.button>

          <AnimatePresence>
            {isSearchClicked && (
              <motion.span
                initial={{
                  opacity: 0,
                  translateX: "-40%",
                }}
                animate={{
                  opacity: 1,
                  translateX: 0,
                  transition: {
                    opacity: { delay: 0.1, duration: 0.3 },
                    translateX: { duration: 0.3 },
                  },
                }}
                exit={{
                  opacity: 0,
                  translateX: "-40%",
                  transition: { duration: 0.3 },
                }}
                className="absolute left-20 bottom-0.5"
              >
                <input
                  ref={searchRef2}
                  className="pl-12 border-gray-300 bg-white border dark:bg-slate-800 dark:border-gray-500 p-2 px-6 lg:w-96 border-l-0 rounded-full shadow-md dark:text-gray-200"
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
          </AnimatePresence>

          {/* mobile search bar */}
          <div className="relative">
            <input
              ref={searchRef}
              className="border-gray-300 bg-white border dark:bg-slate-800 dark:border-gray-500 pl-12 p-2 px-8 w-full rounded-full shadow-md dark:text-gray-200 block md:hidden mx-auto mt-8"
              type="text"
              name=""
              id=""
              placeholder="Search for job titles"
              onChange={(e) => {
                handleSearch(e);
              }}
            />

            <img
              src="/images/search.png"
              alt=""
              className="dark:invert-75 w-8 absolute top-1 left-2 invert-50 block md:hidden"
            />
            {searchRef.current?.value && (
              <img
                src="/images/close.png"
                alt=""
                className="absolute right-2 top-1/2 -translate-y-1/2  w-6 dark:invert-80 cursor-pointer"
                onClick={() => {
                  setSearchResults([]);
                  searchRef.current.value = "";
                }}
              />
            )}
          </div>

          {/* display searchResults */}

          {searchResults.length > 0 && (
            <div className="absolute md:w-1/2 max-h-52 bg-white dark:bg-slate-900 ml-5 md:ml-24 mt-1 rounded-lg overflow-auto custom-scrollbar shadow-lg z-10 ">
              {searchResults.map((item, index) => (
                <Link to={`/apply/${item._id}`} state={item} key={index}>
                  <div className="flex justify-between p-2 hover:bg-gray-200 text-gray-700 cursor-pointer dark:hover:bg-gray-800 dark:text-gray-300">
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
