import { useSelector } from "react-redux";

export const useJobSearch = () => {
  const { jobsList } = useSelector((state) => state.JobsData);

  const searchJobs = (value) => {
    return jobsList.filter((job) =>
      job.title.toLowerCase().includes(value.toLowerCase())
    );
  };

  return { searchJobs };
};
