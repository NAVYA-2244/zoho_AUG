// // import React, { useState } from "react";
// // import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// // import Joi from "joi";
// // import { backEndCallObjNothing } from "../../services/mainService";
// // import { useNavigate } from "react-router-dom";
// // import { toastOptions } from "../../Utils/FakeRoutes";
// // import { useThemeContext } from "../Contexts/ThemesContext";
// // import { MdOutlineKey } from "react-icons/md";

// // import {
// //   Input_password,
// //   InputEmail,
// //   InputPassword,
// // } from "../../components/common/ALLINPUTS/AllInputs";
// // import { useFunctionContext } from "../Contexts/FunctionContext";
// // const Modal = ({ onLogout }) => (
// //   <div className="modal fade show d-block" tabIndex="-1" role="dialog">
// //     <div className="modal-dialog modal-dialog-centered" role="document">
// //       <div className="modal-content">
// //         <div className="modal-header">
// //           <h5 className="modal-title">Password Changed Successfully!</h5>
// //         </div>
// //         <div className="modal-body">
// //           <p>
// //             Your password has been updated. Please log in again for security
// //             purposes.
// //           </p>
// //         </div>
// //         <div className="modal-footer">
// //           <button onClick={onLogout} className="btn btn-primary">
// //             Logout
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const ChangePassword = () => {
// //   const { applicationColor } = useThemeContext();
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     oldPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //     email: "",
// //     new_password: "",
// //   });
// //   // const [EmployeData, setEmployeData] = useState({
// //   //   email: "",
// //   //   new_password: "",
// //   // });
// //   const [errors, setErrors] = useState({});
// //   const [showOldPassword, setShowOldPassword] = useState(false);
// //   const [showNewPassword, setShowNewPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [isFormValid, setIsFormValid] = useState(true);
// //   const [btndisabled, setBtndisabled] = useState(false);
// //   // Define Joi schemas
// //   const schemas = {
// //     email: Joi.string()
// //       .email({ tlds: { allow: ["com", "net", "org", "io"] } })
// //       .max(50)
// //       .required()
// //       .messages({
// //         "string.email": "Please enter a valid employee email address.",
// //         "string.max": "Employee email must be less than 50 characters.",
// //         "any.required": "Employee email is required.",
// //       }),
// //     new_password: Joi.string()
// //       .min(8)
// //       .max(15)
// //       .required()
// //       .pattern(
// //         /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=])/
// //       )
// //       .messages({
// //         "string.pattern.base":
// //           '"Password" needs 1 uppercase, and 1 special character',
// //         "any.required": '"Password" is required',
// //       })
// //       .label("Password"),
// //     oldPassword: Joi.string()
// //       .min(6)
// //       .max(10)
// //       .required()
// //       .label("Old Password")
// //       .messages({
// //         "string.min": "Old Password must be at least 6 characters long",
// //         "string.max": "Old Password must be less than 11 characters long",
// //         "any.required": "Old Password is required",
// //       }),
// //     newPassword: Joi.string()
// //       .min(8)
// //       .max(10)
// //       .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
// //       .required()
// //       .label("New Password")
// //       .messages({
// //         "string.min": "New Password must be at least 8 characters long",
// //         "string.max": "New Password must be less than 11 characters long",
// //         "string.pattern.base":
// //           "New Password must contain at least one capital letter and one special character",
// //         "any.required": "New Password is required",
// //       }),
// //     confirmPassword: Joi.string()
// //       // .valid(Joi.ref("newPassword"))
// //       .required()
// //       .label("Confirm Password")
// //       .messages({
// //         "any.only": "Confirm Password must match New Password",
// //         "any.required": "Confirm Password is required",
// //       }),
// //   };
// //   const { checkErrors } = useFunctionContext();
// //   // const EmployeSchema = {
// //   //   email: Joi.string().required().email().max(55),
// //   //   new_password: Joi.string()
// //   //     .required()
// //   //     .min(8)
// //   //     .max(15)
// //   //     .pattern(/(?=.*[A-Z])/, "uppercase") // At least one uppercase letter
// //   //     .pattern(/(?=.*[@$!%*?&])/, "special"), //atleast one special character
// //   // };

// //   const validateField = (name, value) => {
// //     const schema = Joi.object(schemas);
// //     const { error } = schema.extract(name).validate(value);
// //     return !error;
// //   };
// //   // const validateField = (name, value) => {
// //   //   const schema = Joi.object(otpSchema, ResetPasswordSchema);
// //   //   const { error } = schema.extract(name).validate(value);
// //   //   return !error;
// //   // };

// //   const handlingSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       await checkErrors(schemas, formData);
// //       setBtndisabled(true);
// //       const payload = {
// //         email: formData.email,
// //         new_password: formData.new_password,
// //       };

// //       const res = await backEndCallObjNothing(
// //         "/admin/emp_reset_password",
// //         payload
// //       );
// //       toastOptions.success(res.success || "Password changed successfully");
// //       setBtndisabled(false);
// //     } catch (error) {
// //       setBtndisabled(false);
// //       console.log(error, "error");
// //       toastOptions.error(error.response.data || "Error changing password");
// //     }
// //   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       await checkErrors(schemas, formData);
// //       setBtndisabled(true);
// //       const payload = {
// //         old_password: formData.oldPassword,
// //         new_password: formData.newPassword,
// //       };

// //       const res = await backEndCallObjNothing("/emp/reset_password", payload);
// //       toastOptions.success(res.success || "Password changed successfully");
// //       setBtndisabled(false);
// //       setShowModal(true);
// //     } catch (error) {
// //       setBtndisabled(false);
// //       console.log(error, "error");
// //       toastOptions.error(error.response.data || "Error changing password");
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("zohoEmployeeToken");
// //     navigate("/login");
// //   };

// //   return (
// //     <>
// //       <div className="row">
// //         <div className="col-lg-4">
// //           <div
// //             className="d_card m-2 p-3"
// //             style={{ background: applicationColor.cardItem }}
// //           >
// //             <div>
// //               <h5 className="text-center mb-4">Change Password</h5>
// //               <form onSubmit={handleSubmit}>
// //                 <InputPassword
// //                   type={"password"}
// //                   id="oldPassword"
// //                   name="oldPassword"
// //                   placeholder="Old Password"
// //                   value={formData.oldPassword}
// //                   validateField={validateField}
// //                   maxLength={10}
// //                 />

// //                 {errors.oldPassword && (
// //                   <small className="form-text text-danger">
// //                     {errors.oldPassword}
// //                   </small>
// //                 )}

// //                 <InputPassword
// //                   type={"password"}
// //                   id="newPassword"
// //                   name="newPassword"
// //                   placeholder="New Password"
// //                   value={formData.newPassword}
// //                   validateField={validateField}
// //                   maxLength={10}
// //                   autoCapitalize="none"
// //                 />

// //                 {errors.newPassword && (
// //                   <small className="form-text text-danger">
// //                     {errors.newPassword}
// //                   </small>
// //                 )}

// //                 <InputPassword
// //                   type={"password"}
// //                   id="confirmPassword"
// //                   name="confirmPassword"
// //                   placeholder="Confirm Password"
// //                   value={formData.confirmPassword}
// //                   validateField={validateField}
// //                   maxLength={10}
// //                   autoCapitalize="none"
// //                 />

// //                 {errors.confirmPassword && (
// //                   <small className="form-text text-danger">
// //                     {errors.confirmPassword}
// //                   </small>
// //                 )}
// //               </form>
// //               <button
// //                 type="submit"
// //                 className="btn btn-primary w-100"
// //                 disabled={btndisabled}
// //               >
// //                 Submit
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-lg-4">
// //           <div
// //             className="d_card m-2 p-4"
// //             style={{ background: applicationColor.cardItem }}
// //           >
// //             <div>
// //               <h5 className="text-center mb-4">Employee Reset Password</h5>
// //               <div className="form-group p-3">
// //                 <InputEmail
// //                   type="email"
// //                   placeholder="Email Address"
// //                   name="email"
// //                   value={formData.email}
// //                   validateField={validateField}
// //                   // Add other props if needed
// //                 />
// //                 <InputPassword
// //                   type="password"
// //                   placeholder="Password"
// //                   name="password"
// //                   value={formData.new_password}
// //                   validateField={validateField}
// //                   // Add other props if needed
// //                   imp
// //                   icon={<MdOutlineKey />}
// //                 />
// //                 <button
// //                   type="submit"
// //                   className="btn btn-primary w-100"
// //                   onClick={handlingSubmit}
// //                 >
// //                   Submit
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ChangePassword;

// import React, { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import Joi from "joi";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useNavigate } from "react-router-dom";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { MdOutlineKey } from "react-icons/md";
// import {
//   Input_password,
//   InputEmail,
//   InputPassword,
// } from "../../components/common/ALLINPUTS/AllInputs";
// import { useFunctionContext } from "../Contexts/FunctionContext";

// const Modal = ({ onLogout }) => (
//   <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//     <div className="modal-dialog modal-dialog-centered" role="document">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">Password Changed Successfully!</h5>
//         </div>
//         <div className="modal-body">
//           <p>
//             Your password has been updated. Please log in again for security
//             purposes.
//           </p>
//         </div>
//         <div className="modal-footer">
//           <button onClick={onLogout} className="btn btn-primary">
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const ChangePassword = () => {
//   const { applicationColor } = useThemeContext();
//   const navigate = useNavigate();
//   const { checkErrors } = useFunctionContext();

//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//     email: "",
//     new_password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [btndisabled, setBtndisabled] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const schemas = Joi.object({
//     email: Joi.string()
//       .email({ tlds: { allow: ["com", "net", "org", "io"] } })
//       .max(50)
//       .required()
//       .messages({
//         "string.email": "Please enter a valid employee email address.",
//         "string.max": "Employee email must be less than 50 characters.",
//         "any.required": "Employee email is required.",
//       }),
//     new_password: Joi.string()
//       .min(8)
//       .max(15)
//       .required()
//       .pattern(
//         /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=])/
//       )
//       .messages({
//         "string.pattern.base":
//           "Password needs 1 uppercase, and 1 special character",
//         "any.required": "Password is required",
//       })
//       .label("Password"),
//     oldPassword: Joi.string()
//       .min(6)
//       .max(10)
//       .required()
//       .label("Old Password")
//       .messages({
//         "string.min": "Old Password must be at least 6 characters long",
//         "string.max": "Old Password must be less than 11 characters long",
//         "any.required": "Old Password is required",
//       }),
//     newPassword: Joi.string()
//       .min(8)
//       .max(10)
//       .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
//       .required()
//       .label("New Password")
//       .messages({
//         "string.min": "New Password must be at least 8 characters long",
//         "string.max": "New Password must be less than 11 characters long",
//         "string.pattern.base":
//           "New Password must contain at least one capital letter and one special character",
//         "any.required": "New Password is required",
//       }),
//     confirmPassword: Joi.string()
//       .required()
//       .label("Confirm Password")
//       .messages({
//         "any.required": "Confirm Password is required",
//       }),
//   });

//   const validateField = (name, value) => {
//     const schema = Joi.object(schemas);
//     const { error } = schema.extract(name).validate(value);
//     return !error;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await checkErrors(
//         schemas.newPassword,
//         schemas.confirmPassword,
//         schemas.oldPassword,
//         formData
//       );
//       setBtndisabled(true);
//       const payload = {
//         old_password: formData.oldPassword,
//         new_password: formData.newPassword,
//       };

//       const res = await backEndCallObjNothing("/emp/reset_password", payload);
//       toastOptions.success(res.success || "Password changed successfully");
//       setBtndisabled(false);
//       setShowModal(true);
//     } catch (error) {
//       setBtndisabled(false);
//       console.log(error, "error");
//       toastOptions.error(error.response?.data || "Error changing password");
//     }
//   };

//   const handlingSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await checkErrors(schemas.email, schemas.new_password, formData);
//       setBtndisabled(true);
//       const payload = {
//         email: formData.email,
//         new_password: formData.new_password,
//       };

//       const res = await backEndCallObjNothing(
//         "/admin/emp_reset_password",
//         payload
//       );
//       toastOptions.success(res.success || "Password changed successfully");
//       setBtndisabled(false);
//     } catch (error) {
//       setBtndisabled(false);
//       console.log(error, "error");
//       toastOptions.error(error.response?.data || "Error changing password");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("zohoEmployeeToken");
//     navigate("/login");
//   };

//   return (
//     <>
//       {showModal && <Modal onLogout={handleLogout} />}
//       <div className="row">
//         <div className="col-lg-4">
//           <div
//             className="d_card m-2 p-3"
//             style={{ background: applicationColor.cardItem }}
//           >
//             <div>
//               <h5 className="text-center mb-4">Change Password</h5>

//               <InputPassword
//                 type="password"
//                 id="oldPassword"
//                 name="oldPassword"
//                 placeholder="Old Password"
//                 value={formData.oldPassword}
//                 onChange={(e) =>
//                   setFormData({ ...formData, oldPassword: e.target.value })
//                 }
//                 validateField={validateField}
//                 maxLength={10}
//               />
//               {errors.oldPassword && (
//                 <small className="form-text text-danger">
//                   {errors.oldPassword}
//                 </small>
//               )}

//               <InputPassword
//                 type="password"
//                 id="newPassword"
//                 name="newPassword"
//                 placeholder="New Password"
//                 value={formData.newPassword}
//                 onChange={(e) =>
//                   setFormData({ ...formData, newPassword: e.target.value })
//                 }
//                 validateField={validateField}
//                 maxLength={10}
//                 autoCapitalize="none"
//               />
//               {errors.newPassword && (
//                 <small className="form-text text-danger">
//                   {errors.newPassword}
//                 </small>
//               )}

//               <InputPassword
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     confirmPassword: e.target.value,
//                   })
//                 }
//                 validateField={validateField}
//                 maxLength={10}
//                 autoCapitalize="none"
//               />
//               {errors.confirmPassword && (
//                 <small className="form-text text-danger">
//                   {errors.confirmPassword}
//                 </small>
//               )}

//               <button
//                 type="submit"
//                 className="btn btn-primary w-100"
//                 // disabled={btndisabled}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="col-lg-4">
//           <div
//             className="d_card m-2 p-4"
//             style={{ background: applicationColor.cardItem }}
//           >
//             <div>
//               <h5 className="text-center mb-4">Employee Reset Password</h5>
//               <div className="form-group p-3">
//                 <InputEmail
//                   type={"email"}
//                   placeholder={"Email Address"}
//                   name={"email"}
//                   value={formData.email}
//                   schema={schemas.email}
//                   setForm={setFormData}
//                   validateField={validateField}
//                 />
//                 <InputPassword
//                   type={"password"}
//                   placeholder={"Password"}
//                   name={"new_password"}
//                   setForm={setFormData}
//                   value={formData.new_password}
//                   schema={schemas.newPassword}
//                   validateField={validateField}
//                   icon={<MdOutlineKey />}
//                 />
//                 <button
//                   // type="submit"
//                   className="btn btn-primary w-100"
//                   onClick={handlingSubmit}
//                   disabled={btndisabled}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChangePassword;

import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Joi from "joi";
import { backEndCallObjNothing } from "../../services/mainService";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../Utils/FakeRoutes";
import { useThemeContext } from "../Contexts/ThemesContext";
import EmployeChange from "./FilesModal/Employee";

const Modal = ({ onLogout }) => (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Password Changed Successfully!</h5>
        </div>
        <div className="modal-body">
          <p>
            Your password has been updated. Please log in again for security
            purposes.
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={onLogout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ChangePassword = () => {
  const { applicationColor } = useThemeContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [btndisabled, setBtndisabled] = useState(false);
  // Define Joi schemas
  const schema = Joi.object({
    oldPassword: Joi.string()
      .min(6)
      .max(10)
      .required()
      .label("Old Password")
      .messages({
        "string.min": "Old Password must be at least 6 characters long",
        "string.max": "Old Password must be less than 11 characters long",
        "any.required": "Old Password is required",
      }),
    newPassword: Joi.string()
      .min(8)
      .max(10)
      .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
      .required()
      .label("New Password")
      .messages({
        "string.min": "New Password must be at least 8 characters long",
        "string.max": "New Password must be less than 11 characters long",
        "string.pattern.base":
          "New Password must contain at least one capital letter and one special character",
        "any.required": "New Password is required",
      }),
    confirmPassword: Joi.string()
      // .valid(Joi.ref("newPassword"))
      .required()
      .label("Confirm Password")
      .messages({
        "any.only": "Confirm Password must match New Password",
        "any.required": "Confirm Password is required",
      }),
  });

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    const newErrors = {};

    if (error) {
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset errors on input change
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setBtndisabled(true);
      const payload = {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
      };

      const res = await backEndCallObjNothing("/emp/reset_password", payload);
      toastOptions.success(res.success || "Password changed successfully");
      setBtndisabled(false);
      setShowModal(true);
    } catch (error) {
      setBtndisabled(false);
      console.log(error, "error");
      toastOptions.error(error?.response?.data || "Error changing password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("zohoEmployeeToken");
    navigate("/login");
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-4">
          <div
            className="d_card m-2 p-3"
            style={{ background: applicationColor.cardItem }}
          >
            <h5 className="text-center mb-4">Change Password</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="oldPassword">Old Password</label>
                <div className="input-group" style={{ position: "relative" }}>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    style={{
                      borderRadius: "10px",
                      width: "450px",
                      height: "50px",
                    }}
                    onChange={handleInputChange}
                    maxLength={10}
                  />
                  <span onClick={() => setShowOldPassword(!showOldPassword)}>
                    {showOldPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                  {errors.oldPassword && (
                    <small className="form-text text-danger">
                      {errors.oldPassword}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="newPassword">New Password</label>
                <div className="input-group" style={{ position: "relative" }}>
                  {/* <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                      value={formData.newPassword}
                      style={{
                        borderRadius: "10px",
                        width: "450px",
                        height: "50px",
                      }}
                      onChange={handleInputChange}
                      maxLength={10}
                    /> */}
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    style={{
                      borderRadius: "10px",
                      width: "450px",
                      height: "50px",
                    }}
                    onChange={handleInputChange}
                    maxLength={10}
                    autoCapitalize="none"
                  />
                  <span onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                  {errors.newPassword && (
                    <small className="form-text text-danger">
                      {errors.newPassword}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-group" style={{ position: "relative" }}>
                  {/* <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      style={{
                        borderRadius: "10px",
                        width: "450px",
                        height: "50px",
                      }}
                      onChange={handleInputChange}
                      maxLength={10}
                    /> */}
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    style={{
                      borderRadius: "10px",
                      width: "450px",
                      height: "50px",
                    }}
                    onChange={handleInputChange}
                    maxLength={10}
                    autoCapitalize="none"
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                  {errors.confirmPassword && (
                    <small className="form-text text-danger">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>
              </div>
              <button className="btn btn-primary w-100" disabled={btndisabled}>
                Submit
              </button>
            </form>

            {showModal && <Modal onLogout={handleLogout} />}
          </div>
        </div>
        <div className="col-lg-4">
          <EmployeChange />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
