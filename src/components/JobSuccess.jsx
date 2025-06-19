import { Link, useParams } from "react-router";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useIsMobile } from "../hooks/useIsMobile";
import JobsNavbar from "./JobsNavbar";

const JobSuccess = ({ jobId }) => {
  const {id} = useParams();
  const isMobile = useIsMobile();

  console.log(id)

  const [isLoading, setisLoading] = useState(true);

  setTimeout(() => {
    setisLoading(false);
  }, 5000);

  return (
    <div>
      {isMobile && id && <JobsNavbar />}
      {isLoading && (
        <div className="flex h-[70vh] flex-col items-center justify-center bg-bg-gray-50 text-center">
          <FaSpinner className="mb-4 animate-spin text-5xl text-[#fe5156]" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Processing your request...
          </h2>
          <p className="text-gray-500 mt-2 dark:text-gray-300">
            Please wait while we confirm your application.
          </p>
        </div>
      )}
      {!isLoading && (
        <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
            <div className="mx-auto mb-6 h-28 w-28">
              <img src="/images/check.jpg" alt="" />
            </div>
            <h2 className="mb-2 text-2xl font-extrabold text-gray-800">
              🎉 Application Submitted!
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Application ID: <span className="font-semibold">{jobId ?? id}</span>
            </p>
            <p className="text-gray-700 mb-6">
              Thank you for applying. Your application has been received
              successfully.
            </p>
            <Link
              to="/jobs"
              className="inline-block rounded-lg border-2  px-4 py-2 font-semibold transition bg-[rgb(144,190,109)] text-white"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSuccess;
