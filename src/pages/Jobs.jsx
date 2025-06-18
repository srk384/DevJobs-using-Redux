import JobsNavbar from "../components/JobsNavbar";
import { lazy, Suspense } from "react";
import LoadingFallback from "../components/LoadingFallback";
import JobFilters from "../components/JobFilters";

const AllJobs = lazy(() => import("../components/AllJobs"));

const Jobs = () => {
  return (
    <div className="h-screen">
      <JobsNavbar />
      <JobFilters/>
      <Suspense fallback={<LoadingFallback />}>
        <AllJobs />
      </Suspense>
    </div>
  );
};

export default Jobs;
