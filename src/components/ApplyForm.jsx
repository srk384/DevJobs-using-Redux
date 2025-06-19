import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setAppliedJobs } from "../Redux/Slices/JobsDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import JobSuccess from "./JobSuccess";
import { useIsMobile } from "../hooks/useIsMobile";
import useSyncCartToLocalStorage from "../hooks/useSyncCartToLocalStorage";

const ApplyForm = ({ job }) => {
  const [step, setStep] = useState(1);
  const [openSelectSkills, setOpenSelectSkills] = useState(false);
  const [SelectedSkills, setSelectedSkills] = useState([]);
  const [validationError, setValidationError] = useState("");
  const [isStepValid, setIsStepValid] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [JobId, setJobId] = useState("");
  const skipFirstRender = useRef(true);
  const navigate = useNavigate();

  const skills = [
    "Python",
    "C++",
    "CSS",
    "TypeScript",
    "Java",
    "SQL",
    "HTML",
    "JavaScript",
    "Django",
    "MongoDB",
    "Git",
    "React",
    "AWS",
    "Docker",
    "Kubernetes",
    "Flask",
    "Node.js",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: [],
    coverletter: "",
    startdate: "",
    referral: "",
  });

  const dispatch = useDispatch();
  const { appliedJobs } = useSelector((state) => state.JobsData);
  const isMobile = useIsMobile();

  useEffect(() => {
    setFormData({ ...formData, skills: SelectedSkills });
  }, [SelectedSkills]);

  const FormValidation = async (data, step) => {
    let schema;

    if (step === 1) {
      schema = object({
        name: string().required("Name is required"),
        email: string().email("Invalid email").required("Email is required"),
        phone: string()
          .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
          .required("Phone is required"),
      });
    } else if (step === 2) {
      schema = object({
        experience: string().required("Experience is required"),
      });
    }

    try {
      await schema.validate(data, { abortEarly: false });
      setValidationError({});
      setIsStepValid(true);
      return true;
    } catch (error) {
      const errors = {};
      error.inner?.forEach((err) => {
        errors[err.path] = err.message;
      });
      setValidationError(errors);
      setIsStepValid(false);
      return false;
    }
  };

  const next = () => setStep((prev) => prev + 1);

  const back = () => setStep((prev) => prev - 1);

  const handleForm = async (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
    await FormValidation(updatedFormData, step);
  };
  function generateRandomId() {
    let id = "JOB-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setJobId(id);
  }

  const submitForm = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      createdAt: new Date().toLocaleString(),
      jobId: JobId,
      title: job.title,
      company: job.company,
      location: job.location,
    };
    dispatch(setAppliedJobs([...appliedJobs, updatedFormData]));
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      skills: [],
      coverletter: "",
      startdate: "",
      referral: "",
    });
    setSelectedSkills([]);
    setOpenSelectSkills(false);
    setIsApplied(true);

    if (isMobile) {
      navigate(`/confirmation/${JobId}`);
    }
  };

  useEffect(() => {
    if (skipFirstRender.current) {
      skipFirstRender.current = false;
      return;
    }
    FormValidation(formData, step);
  }, [step]);

  useSyncCartToLocalStorage(appliedJobs);

  return (
    <>
      {/* {isMobile && isApplied && <JobSuccess jobId={JobId} />} */}

      <div className="px-2 md:px-4 mt-2 mb-4 lg:my-0 bg-white lg:w-2/4 lg:ml-3 rounded-lg h-fit shadow-sm dark:bg-slate-800 dark:text-gray-200">
        {isApplied && !isMobile && <JobSuccess jobId={JobId} />}

        {!isApplied && (
          <div>
            <h1 className="text-xl font-semibold text-center my-5 dark:text-white">
              Applicaton Form
            </h1>
            <form action="" onSubmit={(e) => submitForm(e)}>
              {step === 1 && (
                <div className="text-center">
                  <h2 className="block w-full rounded-lg my-6 text-left">
                    Personal Information:
                  </h2>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => handleForm(e)}
                    value={formData.name}
                    className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg my-4 dark:placeholder-bg-amber-500"
                  />
                  {validationError && validationError.name && (
                    <span className="text-sm text-red-500">
                      {validationError.name}
                    </span>
                  )}

                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email ID"
                    onChange={(e) => handleForm(e)}
                    value={formData.email}
                    className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg my-4"
                  />
                  {validationError && validationError.email && (
                    <span className="text-sm text-red-500">
                      {validationError.email}
                    </span>
                  )}
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Contact Number"
                    onChange={(e) => handleForm(e)}
                    value={formData.phone}
                    className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg my-4"
                  />
                  {validationError && validationError.phone && (
                    <span className="text-sm text-red-500 block">
                      {validationError.phone}
                    </span>
                  )}

                  <button
                    className={`px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg my-6 text-white font-semibold ${
                      isStepValid
                        ? "bg-[rgb(144,190,109)] cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      next(e);
                    }}
                    disabled={!isStepValid}
                  >
                    Next
                  </button>
                </div>
              )}

              {step == 2 && (
                <div className="text-center">
                  <h2 className="block w-full rounded-lg my-6 text-left">
                    Experience:
                  </h2>
                  <input
                    className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg my-4"
                    type="number"
                    id="experience"
                    name="experience"
                    min={0}
                    max={20}
                    placeholder="Years of Experience"
                    onChange={(e) => handleForm(e)}
                    value={formData.experience}
                  />
                  {validationError && validationError.experience && (
                    <span className="text-sm text-red-500">
                      {validationError.experience}
                    </span>
                  )}
                  <div
                    className={`flex justify-between items-center w-full px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-lg my-4 text-gray-500 text-md font-light cursor-pointer ${openSelectSkills && "border-b-0 rounded-b-none mb-0"}`}
                    onClick={() => setOpenSelectSkills(!openSelectSkills)}
                  >
                    Select Skills{" "}
                    <img
                      className="invert-50"
                      src="/images/icon_down-filled.png"
                    />
                  </div>
                  {openSelectSkills && (
                    <div className="block w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg border-t-0 rounded-t-none max-h-54 overflow-auto custom-scrollbar mb-4">
                      {skills.map((item, index) => {
                        const isSelected = SelectedSkills.includes(item);

                        return (
                          <div
                            key={index}
                            name="skills"
                            className="p-2 px-3 text-gray-700 text-sm flex gap-2 items-center hover:bg-gray-200 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-900"
                            onClick={(e) => {
                              // e.preventDefault();
                              // e.stopPropagation();

                              if (SelectedSkills.includes(item)) {
                                setSelectedSkills(
                                  SelectedSkills.filter(
                                    (skill) => skill !== item
                                  )
                                );
                              } else {
                                setSelectedSkills([...SelectedSkills, item]);
                              }
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                            />
                            <span>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="text-left">
                    {SelectedSkills &&
                      SelectedSkills.map((skill, index) => (
                        <div
                          key={index}
                          className="inline-block px-4 py-1 m-1 text-md bg-gray-200 dark:hover:bg-gray-800 text-gray-600 rounded-lg dark:bg-slate-700 dark:text-gray-300"
                        >
                          {skill}
                        </div>
                      ))}
                  </div>
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg my-6 mr-2 cursor-pointer bg-[rgb(144,190,109)] font-semibold dark:border-gray-700 text-white"
                    onClick={() => back()}
                  >
                    Back
                  </button>
                  <button
                    className={`px-4 py-2 border border-gray-300 rounded-lg my-6 font-semibold text-white dark:border-gray-700 ${
                      isStepValid
                        ? "bg-[rgb(144,190,109)] cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      next(e);
                      generateRandomId();
                    }}
                    disabled={!isStepValid}
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <h2 className="block w-full rounded-lg my-6 text-left">
                    Additional Information:
                  </h2>
                  <input
                    type="text"
                    id="coverletter"
                    name="coverletter"
                    placeholder="Cover Letter Link (if any)"
                    onChange={(e) => handleForm(e)}
                    value={formData.coverletter}
                    className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg my-4"
                  />
                  <label
                    htmlFor="startdate"
                    className="block text-sm text-gray-500 text-left mb-1"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startdate"
                    name="startdate"
                    placeholder="Start Date"
                    onChange={(e) => handleForm(e)}
                    value={formData.startdate}
                    className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4"
                  />

                  <input
                    type="text"
                    id="referral"
                    name="referral"
                    placeholder="Referral Code (if any)"
                    onChange={(e) => handleForm(e)}
                    value={formData.referral}
                    className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg my-4"
                  />
                  <button
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg my-6 mr-2 cursor-pointer bg-[rgb(144,190,109)] font-semibold text-white"
                    onClick={() => back()}
                  >
                    Back
                  </button>
                  <input
                    type="submit"
                    value="Submit"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg my-6 cursor-pointer bg-[rgb(144,190,109)] font-semibold text-white"
                  />
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplyForm;
