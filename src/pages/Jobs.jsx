import JobsNavbar from "../components/JobsNavbar";
import { lazy, Suspense } from "react";
import LoadingFallback from "../components/LoadingFallback";
import JobFilters from "../components/JobFilters";

const AllJobs = lazy(() => import("../components/AllJobs"));

const Jobs = () => {
  return (
    <>
      <JobsNavbar />
      <JobFilters/>
      <Suspense fallback={<LoadingFallback />}>
        <AllJobs />
      </Suspense>
    </>
  );
};

export default Jobs;
