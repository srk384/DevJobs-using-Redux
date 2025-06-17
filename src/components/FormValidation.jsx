// import { object, string } from "yup";

//  export const FormValidation = async (data, step) => {
//     let schema;

//     if (step === 1) {
//       schema = object({
//         name: string().required("Name is required"),
//         email: string().email("Invalid email").required("Email is required"),
//         phone: string()
//           .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
//           .required("Phone is required"),
//       });
//     } else if (step === 2) {
//       schema = object({
//         experience: string().required("Experience is required"),
//       });
//     }

//     try {
//       await schema.validate(data, { abortEarly: false });
//       setValidationError({});
//       setIsStepValid(true);
//       return true;
//     } catch (error) {
//       const errors = {};
//       error.inner?.forEach((err) => {
//         errors[err.path] = err.message;
//       });
//       setValidationError(errors);
//       setIsStepValid(false);
//       return false;
//     }
//   };

//   export default FormValidation;