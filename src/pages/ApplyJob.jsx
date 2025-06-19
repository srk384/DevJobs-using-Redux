import { useLocation, useParams } from "react-router-dom";
import JobDisplay from "../components/JobDisplay";
import JobsNavbar from "../components/JobsNavbar";
import ApplyForm from "../components/ApplyForm";
import { useEffect, useState } from "react";

const ApplyJob = () => {
  const [job, setJob] = useState("");
  let { state } = useLocation();
  const params = useParams();

  if (state) state = { ...state, hideApplyBtn: true };

  useEffect(() => {
    if (!state) {
      fetchJobsData();
    }
    window.scrollTo({ top: 0});
  }, []);

  async function fetchJobsData() {
    const res = await fetch("/data/developer_job_data_with_ids.json");
    const data = await res.json();
    setData(data);
  }

  const setData = (jobs) => {
    const jobById = jobs.find((job) => job._id == params.id);
    setJob({ ...jobById, hideApplyBtn: true });
  };

  return (
    <>
      <JobsNavbar />
      <div className="max-w-7xl mx-auto bg-gray-50 dark:bg-slate-900 p-2 lg:p-4 flex flex-col-reverse lg:flex-row lg:h-[92.5vh]">
        <JobDisplay job={state ?? job} />
        <ApplyForm job={state ?? job} />
      </div>
    </>
  );
};

export default ApplyJob;
