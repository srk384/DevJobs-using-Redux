import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Navbar = () => {
  const [isHamOpen, setIsHamOpen] = useState(false);

  return (
    <div className="h-16 lg:h-20 flex justify-between lg:justify-around items-center px-4">
      <div>
        <img className="w-42 lg:w-full" src="/images/logo2.png" alt="" />
      </div>
      <ul className="gap-8 font-semibold dark:text-gray-100 hidden lg:flex">
        <Link to={"/jobs"}>
          <li className="cursor-pointer hover:underline underline-offset-4 transition flex gap-2 items-center">
            <img
              className="dark:invert-100 w-6"
              src="/images/suitcase.png"
              alt=""
            />
            Jobs
          </li>
        </Link>
        <Link to={"/applied-jobs"}>
          <li className="cursor-pointer hover:underline underline-offset-4 transition flex gap-2 items-center">
            <img
              className="dark:invert-100 w-6"
              src="/images/appliedjobs.png"
              alt=""
            />
            Applied Jobs
          </li>
        </Link>
        <a href="https://shahrukh-khan.netlify.app/" target="blank">
          <li className="cursor-pointer hover:underline underline-offset-4 transition flex gap-2 items-center">
            <img
              className="dark:invert-100 w-6"
              src="/images/about.png"
              alt=""
            />
            About Me
          </li>
        </a>
      </ul>
      <div
        className="block lg:hidden relative"
        onClick={() => setIsHamOpen(!isHamOpen)}
      >
        {isHamOpen ? (
          <img className="dark:invert-100" src="/images/close.png" alt="" />
        ) : (
          <img className="dark:invert-100" src="/images/hamburger.png" alt="" />
        )}

        {isHamOpen && (
          <div className="absolute right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg w-62 rounded-lg shadow-lg">
            <LazyLoadImage
              alt="Popup Banner"
              effect="blur"
              src="/images/hambanner.webp"
              className="w-full h-auto object-cover rounded-t-lg"
            />
            <ul className="gap-8 font-semibold dark:text-gray-100 p-2 py-4">
              <Link to={"/jobs"}>
                <li className="cursor-pointer underline-offset-4 transition p-2 active:bg-gray-700 flex gap-2 items-center">
                  <img
                    className="dark:invert-100 w-6"
                    src="/images/suitcase.png"
                    alt=""
                  />
                  Jobs
                </li>
              </Link>
              <Link to={"/applied-jobs"}>
                <li className="cursor-pointer underline-offset-4 transition p-2 active:bg-gray-700 flex gap-2 items-center">
                  <img
                    className="dark:invert-100 w-6"
                    src="/images/appliedjobs.png"
                    alt=""
                  />
                  Applied Jobs
                </li>
              </Link>
              <li className="cursor-pointer underline-offset-4 transition p-2 active:bg-gray-700 flex gap-2 items-center">
                <img
                  className="dark:invert-100 w-6"
                  src="/images/about.png"
                  alt=""
                />
                About Us
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
