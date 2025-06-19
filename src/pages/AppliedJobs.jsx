import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs } from "../Redux/Slices/JobsDataSlice";
import JobsNavbar from "../components/JobsNavbar";
import useSyncCartToLocalStorage from "../hooks/useSyncCartToLocalStorage";

const AppliedJobs = () => {
  const { appliedJobs } = useSelector((state) => state.JobsData);
  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const openEditModal = (job) => {
    setJobToEdit(job);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setJobToEdit(null);
  };

  const openWithdrawModal = (job) => {
    setJobToDelete(job);
    setShowConfirmModal(true);
  };

  const confirmWithdraw = () => {
    const updatedJobs = appliedJobs.filter(
      (job) => job.jobId !== jobToDelete.jobId
    );
    dispatch(setAppliedJobs(updatedJobs));
    setShowConfirmModal(false);
    setJobToDelete(null);
  };

  const cancelWithdraw = () => {
    setShowConfirmModal(false);
    setJobToDelete(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setJobToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const updatedJobs = appliedJobs.map((job) =>
      job.jobId === jobToEdit.jobId ? jobToEdit : job
    );
    dispatch(setAppliedJobs(updatedJobs));
    closeEditModal();
  };

  useSyncCartToLocalStorage(appliedJobs)

  return (
    <div >
      <JobsNavbar />
      <div className="p-6 mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold mb-6 dark:text-gray-200">Applied Jobs</h1>
        {appliedJobs.length === 0 ? (
          <p className="dark:text-gray-300">No jobs applied yet.</p>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <div
                key={job.jobId}
                className="border border-gray-300 bg-white shadow-lg rounded-lg p-4 flex justify-between dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700"
              >
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className="text-sm">Company: {job.company}</p>
                  <p className="text-sm">Location: {job.location}</p>
                  <p className="text-sm">Experience: {job.experience} years</p>
                  <p className="text-sm">Job Id: {job.jobId}</p>
                  <p className="text-sm">Applied On: {job.createdAt}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-200 rounded dark:text-gray-300 dark:bg-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => openEditModal(job)}
                    className="cursor-pointer dark:invert-75 dark:hover:invert-100"
                  >
                    <img src="/images/edit.png" />
                  </button>
                  <button
                    onClick={() => openWithdrawModal(job)}
                    className="cursor-pointer dark:invert-75 dark:hover:invert-100"
                  >
                    <img src="/images/delete.png" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/*  Edit Modal */}
        {showEditModal && jobToEdit && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg dark:text-gray-300 dark:bg-slate-800">
              <h2 className="text-xl font-bold mb-4">Edit Application</h2>
              <input
                name="title"
                value={jobToEdit.title}
                onChange={handleEditChange}
                placeholder="Job Title"
                className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-700 rounded"
              />
              <input
                name="location"
                value={jobToEdit.location}
                onChange={handleEditChange}
                placeholder="Location"
                className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-700 rounded"
              />
              <input
                name="experience"
                type="number"
                value={jobToEdit.experience}
                onChange={handleEditChange}
                placeholder="Experience"
                className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-700 rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 rounded text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Confirmation Modal */}
        {showConfirmModal && jobToDelete && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg dark:text-gray-300 dark:bg-slate-800">
              <h3 className="text-lg font-bold mb-4 text-center text-red-600">
                Withdraw Application?
              </h3>
              <p className="mb-6 text-center">
                Are you sure you want to withdraw your application for{" "}
                <span className="font-semibold">{jobToDelete.title}</span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={cancelWithdraw}
                  className="px-4 py-2 bg-gray-300 rounded text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmWithdraw}
                  className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
