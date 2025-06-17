import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs } from "../Redux/Slices/JobsDataSlice";

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
    const updatedJobs = appliedJobs.filter((job) => job._id !== jobToDelete._id);
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
      job._id === jobToEdit._id ? jobToEdit : job
    );
    dispatch(setAppliedJobs(updatedJobs));
    closeEditModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Applied Jobs</h1>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        <div className="space-y-4">
          {appliedJobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-300 rounded-lg p-4 flex justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm">Location: {job.location}</p>
                <p className="text-sm">Experience: {job.experience} years</p>
                <p className="text-sm">Applied On: {job.createdAt}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-gray-200 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openEditModal(job)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => openWithdrawModal(job)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔧 Edit Modal */}
      {showEditModal && jobToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Application</h2>
            <input
              name="title"
              value={jobToEdit.title}
              onChange={handleEditChange}
              placeholder="Job Title"
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              name="location"
              value={jobToEdit.location}
              onChange={handleEditChange}
              placeholder="Location"
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              name="experience"
              type="number"
              value={jobToEdit.experience}
              onChange={handleEditChange}
              placeholder="Experience"
              className="w-full p-2 mb-3 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ❗ Withdraw Confirmation Modal */}
      {showConfirmModal && jobToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
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
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmWithdraw}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
