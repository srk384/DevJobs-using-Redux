import { useEffect } from "react";

const useSyncCartToLocalStorage = (appliedJobs) => {

  useEffect(() => {
  if (appliedJobs && appliedJobs.length > 0) {
    localStorage.setItem("application", JSON.stringify(appliedJobs));
  } else {
    localStorage.removeItem("application");
  }
}, [appliedJobs]);

};

export default useSyncCartToLocalStorage;
