import { data, useLocation, useParams } from "react-router-dom";
import JobDisplay from "../components/JobDisplay";
import JobsNavbar from "../components/JobsNavbar";
import ApplyForm from "../components/ApplyForm";
import { useEffect, useState } from "react";

const ApplyJob = () => {
  const [job, setJob] = useState("");
  let { state } = useLocation();
  const params = useParams();

  if (state) state = { ...state, hideApplyBtn: true };

  console.log(state);

  useEffect(() => {
    if (!state) {
      fetchJobsData();
    }
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

  //   console.log(state)
  console.log(job);

  return (
    <>
      <JobsNavbar />
      <div className="max-w-7xl mx-auto bg-gray-50 p-2 flex">
        <JobDisplay job={state ?? job} />
        <ApplyForm />
      </div>
      ;
    </>
  );
};

export default ApplyJob;
