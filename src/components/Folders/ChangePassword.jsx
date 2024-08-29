// // import React, { useState } from "react";

// // import Joi from "joi";
// // import { MdOutlineKey } from "react-icons/md";

// // import { useThemeContext } from "../Contexts/ThemesContext";
// // import { toastOptions } from "../../Utils/FakeRoutes";
// // import { InputPassword } from "../common/ALLINPUTS/AllInputs";
// // import { backEndCallObjNothing } from "../../services/mainService";
// // import { useFunctionContext } from "../Contexts/FunctionContext";

// // // Joi validation schema

// // const ChangePassword = () => {
// //   const { applicationColor } = useThemeContext();
// //   const { checkErrors } = useFunctionContext();
// //   const [formData, setFormData] = useState({
// //     oldPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   });
// //   const changePasswordSchema = {
// //     oldPassword: Joi.string().min(6).required().label("Old Password"),
// //     newPassword: Joi.string().min(6).required().label("New Password"),
// //     confirmPassword: Joi.any()
// //       .equal(Joi.ref("newPassword"))
// //       .required()
// //       .label("Confirm Password")
// //       .messages({ "any.only": "Confirm Password must match New Password" }),
// //   };
// //   const handleFormChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const { error } = changePasswordSchema.validate(formData, { abortEarly: false });

// //     if (error) {
// //       toastOptions.error(error.details.map((detail) => detail.message).join(", "));
// //       return;
// //     }

// //     try {
// //       // Send payload to backend for changing password
// //       await checkErrors(changePasswordSchema, formData);
// //       const payload = {
// //         oldPassword: formData.oldPassword,
// //         newPassword: formData.newPassword,
// //       };
// //       await backEndCallObjNothing("/user/change_password", payload); // Adjust API endpoint and function as needed
// //       toastOptions.success("Password changed successfully");
// //     } catch (error) {
// //       toastOptions.error("Error changing password");
// //     }
// //   };
// //   return (
// //     <main className="folders" style={{ background: applicationColor.cardItem }}>
// //       <h1>Change Password</h1>
// //       <form className="all-folders" onSubmit={handleSubmit}>
// //         <InputPassword
// //           type="password"
// //           placeholder="Old Password"
// //           name="oldPassword"
// //           value={formData.oldPassword}
// //           onChange={handleFormChange}
// //           schema={changePasswordSchema("oldPassword")}
// //           imp
// //           icon={<MdOutlineKey />}
// //         />
// //         <InputPassword
// //           type="password"
// //           placeholder="New Password"
// //           name="newPassword"
// //           value={formData.newPassword}
// //           onChange={handleFormChange}
// //           schema={changePasswordSchema.newPassword}
// //           imp
// //           icon={<MdOutlineKey />}
// //         />
// //         <InputPassword
// //           type="password"
// //           placeholder="Confirm Password"
// //           name="confirmPassword"
// //           value={formData.confirmPassword}
// //           onChange={handleFormChange}
// //           schema={changePasswordSchema.confirmPassword}
// //           imp
// //           icon={<MdOutlineKey />}
// //         />
// //         <button type="submit">Change Password</button>
// //       </form>
// //     </main>
// //   );
// // };

// // export default ChangePassword;
// // // import React, { useState } from "react";
// // // import Joi from "joi";
// // // import { MdOutlineKey } from "react-icons/md";
// // // import { useThemeContext } from "../Contexts/ThemesContext";
// // // import { toastOptions } from "../../Utils/FakeRoutes";
// // // import { InputPassword } from "../common/ALLINPUTS/AllInputs";
// // // import { backEndCallObjNothing } from "../../services/mainService";
// // // import { useFunctionContext } from "../Contexts/FunctionContext";

// // // // Joi validation schema
// // // const changePasswordSchema = {
// // //   oldPassword: Joi.string().min(6).required().label("Old Password"),
// // //   newPassword: Joi.string()
// // //     .min(8)
// // //     .max(10)
// // //     .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
// // //     .required()
// // //     .label("New Password")
// // //     .messages({
// // //       "string.min": "Password must be at least 8 characters long",
// // //       "string.pattern.base": "Password must contain at least one capital letter and one special character",
// // //     }),
// // //   confirmPassword: Joi.any()
// // //     .equal(Joi.ref("newPassword"))
// // //     .required()
// // //     .label("Confirm Password")
// // //     .messages({ "any.only": "Confirm Password must match New Password" }),
// // // };

// // // const ChangePassword = () => {
// // //   const { applicationColor } = useThemeContext();
// // //   const { checkErrors } = useFunctionContext();
// // //   const [formData, setFormData] = useState({
// // //     oldPassword: "",
// // //     newPassword: "",
// // //     confirmPassword: "",
// // //   });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       // Validate form data
// // //       await checkErrors(changePasswordSchema, formData);
// // //       const payload = {
// // //         old_password: formData.oldPassword,
// // //         new_password: formData.newPassword,
// // //       };

// // //       // Make backend call with token in headers
// // //       const token = "your_token_here"; // replace with the actual token retrieval logic
// // //       await backEndCallObjNothing("/user/change_password", payload, {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //       });

// // //       toastOptions.success("Password changed successfully");
// // //     } catch (error) {
// // //       toastOptions.error(error.message || "Error changing password");
// // //     }
// // //   };

// // //   return (
// // //     <main className="folders" style={{ background: applicationColor.cardItem }}>
// // //       <h1>Change Password</h1>
// // //       <form className="all-folders" onSubmit={handleSubmit}>
// // //         <InputPassword
// // //           id="oldPassword"
// // //           type="password"
// // //           placeholder="Old Password"
// // //           name="oldPassword"
// // //           value={formData.oldPassword}
// // //           setForm={setFormData}
// // //           schema={changePasswordSchema.oldPassword}
// // //           imp
// // //           icon={<MdOutlineKey />}
// // //         />
// // //         <InputPassword
// // //           id="newPassword"
// // //           type="password"
// // //           placeholder="New Password"
// // //           name="newPassword"
// // //           value={formData.newPassword}
// // //           setForm={setFormData}
// // //           schema={changePasswordSchema.newPassword}
// // //           imp
// // //           icon={<MdOutlineKey />}
// // //         />
// // //         <InputPassword
// // //           id="confirmPassword"
// // //           type="password"
// // //           placeholder="Confirm Password"
// // //           name="confirmPassword"
// // //           value={formData.confirmPassword}
// // //           setForm={setFormData}
// // //           schema={changePasswordSchema.confirmPassword}
// // //           imp
// // //           icon={<MdOutlineKey />}
// // //         />
// // //         <button type="submit">Change Password</button>
// // //       </form>
// // //     </main>
// // //   );
// // // };

// // // export default ChangePassword;
// // import React, { useState } from "react";
// // import { MdOutlineKey } from "react-icons/md";
// // import { useThemeContext } from "../Contexts/ThemesContext";
// // import { toastOptions } from "../../Utils/FakeRoutes";
// // import { InputPassword } from "../common/ALLINPUTS/AllInputs";
// // import { backEndCallObjNothing } from "../../services/mainService";
// // import { useNavigate } from "react-router-dom";
// // import Joi from "joi";

// // const ChangePassword = () => {
// //   const { applicationColor } = useThemeContext();
// //   const navigate = useNavigate()
// //   const [formData, setFormData] = useState({
// //     oldPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   });

// //   const [errors, setErrors] = useState({});
// // const changePasswordSchema = {
// //   oldPassword: Joi.string().min(6).required().label("Old Password"),
// //   newPassword: Joi.string()
// //     .min(8)
// //     .max(10)
// //     .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
// //     .required()
// //     .label("New Password")
// //     .messages({
// //       "string.min": "Password must be at least 8 characters long",
// //       "string.pattern.base": "Password must contain at least one capital letter and one special character",
// //     }),
// //   confirmPassword: Joi.string()
// //   .min(8)
// //   .max(10)
// //   // .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))

// //     .required()
// //     .label("Confirm Password")
// //     .messages({ "any.only": "Confirm Password must match New Password" }),
// // };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (formData.oldPassword.length < 6) {
// //       newErrors.oldPassword = "Old Password must be at least 6 characters long";
// //     }
// //     if (formData.newPassword.length < 8 || formData.newPassword.length > 10) {
// //       newErrors.newPassword = "New Password must be between 8 and 10 characters long";
// //     }
// //     if (!/[A-Z]/.test(formData.newPassword)) {
// //       newErrors.newPassword = "New Password must contain at least one capital letter";
// //     }
// //     if (!/[!@#$%^&*]/.test(formData.newPassword)) {
// //       newErrors.newPassword = "New Password must contain at least one special character";
// //     }
// //     if (formData.confirmPassword !== formData.newPassword) {
// //       newErrors.confirmPassword = "Confirm Password must match New Password";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!validateForm()) {
// //       return;
// //     }

// //     try {
// //       const payload = {
// //         old_password: formData.oldPassword,
// //         new_password: formData.newPassword,
// //       };

// //       // Make backend call with token in headers

// //      const res= await backEndCallObjNothing("/user/reset_password", payload);
// //      toastOptions.success(res.success||"Password changed successfully")

// //       handleLogout()
// //     } catch (error) {
// //       toastOptions.error(error.message || "Error changing password");
// //     }
// //   };
// //   const handleLogout = () => {
// //     localStorage.removeItem("zohoEmployeeToken");
// // setTimeout(() => {
// //   navigate("/login");
// // }, 6000);

// //     // window.location.reload("/login");
// //   };
// //   return (
// //     <main className="folders" style={{ background: applicationColor.cardItem }}>
// //       <h1>Change Password</h1>
// //       <form className="all-folders" onSubmit={handleSubmit}>
// //         <InputPassword
// //           id="oldPassword"
// //           name="oldPassword"
// //           placeholder="Old Password"
// //           value={formData.oldPassword}
// //           setForm={setFormData}
// //           schema={changePasswordSchema.oldPassword}
// //           imp
// //           icon={<MdOutlineKey />}
// //           readOnly={false}
// //         />
// //         {errors.oldPassword && <div className="error-message">{errors.oldPassword}</div>}

// //         <InputPassword
// //           id="newPassword"
// //           name="newPassword"
// //           placeholder="New Password"
// //           value={formData.newPassword}
// //           setForm={setFormData}
// //           schema={changePasswordSchema.newPassword}
// //           imp
// //           icon={<MdOutlineKey />}
// //           readOnly={false}
// //         />
// //         {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}

// //         <InputPassword
// //           id="confirmPassword"
// //           name="confirmPassword"
// //           placeholder="Confirm Password"
// //           value={formData.confirmPassword}
// //           schema={changePasswordSchema.confirmPassword}
// //           setForm={setFormData}
// //           imp
// //           icon={<MdOutlineKey />}
// //           readOnly={false}
// //         />
// //         {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

// //         <button type="submit">Change Password</button>
// //       </form>
// //     </main>
// //   );
// // };

// // export default ChangePassword;
// import React, { useState } from "react";
// import { MdOutlineKey } from "react-icons/md";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import { InputPassword } from "../common/ALLINPUTS/AllInputs";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useNavigate } from "react-router-dom";
// import Joi from "joi";

// // Modal component
// const Modal = ({ onClose, onLogout }) => (
//   <div className="modal">
//     <div className="modal-content">
//       <h2>Password Changed Successfully!</h2>
//       <button onClick={onLogout}>Logout</button>
//     </div>
//   </div>
// );

// const ChangePassword = () => {
//   const { applicationColor } = useThemeContext();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   const changePasswordSchema = {
//     oldPassword: Joi.string().min(6).max(10).required().label("Old Password"),
//     newPassword: Joi.string()
//       .min(8)
//       .max(10)
//       .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
//       .required()
//       .label("New Password")
//       .messages({
//         "string.min": "Password must be at least 8 characters long",
//         "string.pattern.base":
//           "Password must contain at least one capital letter and one special character",
//       }),
//     confirmPassword: Joi.string()
//       .min(8)
//       .max(10)
//       .required()
//       .label("Confirm Password")
//       .messages({ "any.only": "Confirm Password must match New Password" }),
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (formData.oldPassword.length < 6) {
//       newErrors.oldPassword = "Old Password must be at least 6 characters long";
//     }
//     if (formData.newPassword.length < 8 || formData.newPassword.length > 10) {
//       newErrors.newPassword =
//         "New Password must be between 8 and 10 characters long";
//     }
//     if (!/[A-Z]/.test(formData.newPassword)) {
//       newErrors.newPassword =
//         "New Password must contain at least one capital letter";
//     }
//     if (!/[!@#$%^&*]/.test(formData.newPassword)) {
//       newErrors.newPassword =
//         "New Password must contain at least one special character";
//     }
//     if (formData.confirmPassword !== formData.newPassword) {
//       newErrors.confirmPassword = "Confirm Password must match New Password";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const payload = {
//         old_password: formData.oldPassword,
//         new_password: formData.newPassword,
//       };

//       // Make backend call with token in headers
//       const res = await backEndCallObjNothing("/emp/reset_password", payload);
//       toastOptions.success(res.success || "Password changed successfully");

//       // Show the modal on success
//       setShowModal(true);
//     } catch (error) {
//       toastOptions.error(error.message || "Error changing password");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("zohoEmployeeToken");
//     navigate("/login");
//   };

//   return (
//     <main className="folders" style={{ background: applicationColor.cardItem }}>
//       <form className="all-folders" onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-xl-4 mx-auto">
//             <h5 className="text-center mb-4">Change Password</h5>
//             <InputPassword
//               id="oldPassword"
//               name="oldPassword"
//               placeholder="Old Password"
//               value={formData.oldPassword}
//               setForm={setFormData}
//               schema={changePasswordSchema.oldPassword}
//               imp
//               icon={<MdOutlineKey />}
//               readOnly={false}
//             />
//             {toastOptions.error.oldPassword && (
//               <div className="error-message">{errors.oldPassword}</div>
//             )}

//             <InputPassword
//               id="newPassword"
//               name="newPassword"
//               placeholder="New Password"
//               value={formData.newPassword}
//               setForm={setFormData}
//               schema={changePasswordSchema.newPassword}
//               imp
//               icon={<MdOutlineKey />}
//               readOnly={false}
//             />
//             {toastOptions.error.newPassword && (
//               <div className="error-message">{errors.newPassword}</div>
//             )}

//             <InputPassword
//               id="confirmPassword"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               schema={changePasswordSchema.confirmPassword}
//               setForm={setFormData}
//               imp
//               icon={<MdOutlineKey />}
//               readOnly={false}
//             />
//             {toastOptions.error.confirmPassword && (
//               <div className="error-message">
//                 {
//                 errors.confirmPassword}</div>
//             )}
//             <button type="submit">Change Password</button>
//           </div>
//         </div>
//       </form>

//       {/* Render modal if showModal is true */}
//       {showModal && <Modal onLogout={handleLogout} />}
//     </main>
//   );
// };

// export default ChangePassword;



// import React, { useState } from "react";
// import { MdOutlineKey } from "react-icons/md";
// import { useThemeContext } from "../Contexts/ThemesContext";
// // import { toast } from "react-toastify"; // Import toast from react-toastify
// import { InputPassword } from "../common/ALLINPUTS/AllInputs";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useNavigate } from "react-router-dom";
// import Joi from "joi";
// import { toastOptions } from "../../Utils/FakeRoutes";

// // Modal component
// const Modal = ({ onLogout }) => (
//   <div className="modal">
//     <div className="modal-content">
//       <h2>Password Changed Successfully!</h2>
//       <button onClick={onLogout}>Logout</button>
//     </div>
//   </div>
// );

// const ChangePassword = () => {
//   const { applicationColor } = useThemeContext();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [showModal, setShowModal] = useState(false);

//   // Define individual Joi schemas
//   const oldPasswordSchema = Joi.string().min(6).max(10).required().label("Old Password");
//   const newPasswordSchema = Joi.string()
//     .min(8)
//     .max(10)
//     .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
//     .required()
//     .label("New Password")
//     .messages({
//       "string.min": "Password must be at least 8 characters long",
//       "string.pattern.base":
//         "Password must contain at least one capital letter and one special character",
//     });
//   const confirmPasswordSchema = Joi.string().min(8).max(10).required().label("Confirm Password");

//   // Validate individual fields
//   const validateField = (field, value) => {
//     let schema;
//     switch (field) {
//       case "oldPassword":
//         schema = oldPasswordSchema;
//         break;
//       case "newPassword":
//         schema = newPasswordSchema;
//         break;
//       case "confirmPassword":
//         schema = confirmPasswordSchema;
//         break;
//       default:
//         return;
//     }

//     const { error } = schema.validate(value);
//     return error ? error.details[0].message : null;
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Validate all fields
//     Object.keys(formData).forEach((key) => {
//       const errorMessage = validateField(key, formData[key]);
//       if (errorMessage) {
//         newErrors[key] = errorMessage;
//         toastOptions.error(errorMessage); // Show error messages using toast
//       }
//     });

//     // Special validation for confirmPassword
//     if (formData.confirmPassword !== formData.newPassword) {
//       newErrors.confirmPassword = "Confirm Password must match New Password";
//       toastOptions.error(newErrors.confirmPassword);
//     }

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const payload = {
//         old_password: formData.oldPassword,
//         new_password: formData.newPassword,
//       };

//       // Make backend call with token in headers
//       const res = await backEndCallObjNothing("/emp/reset_password", payload);
//       toastOptions.success(res.success || "Password changed successfully");

//       // Show the modal on success
//       setShowModal(true);
//     } catch (error) {
//       console.log(error,"error")
//       toastOptions.error(error.response.data || "Error changing password");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("zohoEmployeeToken");
//     navigate("/login");
//   };

//   return (
//      <section
//     className="company-details"
//     style={{ background: applicationColor.cardBg1 }}
//   >
//       <form className="all-folders" onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-xl-4 mx-auto">
//             <h5 className="text-center mb-4">Change Password</h5>
//             <InputPassword
//               id="oldPassword"
//               type={"password"}
//               name="oldPassword"
//               placeholder="Old Password"
//               value={formData.oldPassword}
//               setForm={setFormData}
//               maxLength={10}
//               schema={oldPasswordSchema}
//               imp
//               icon={<MdOutlineKey />}
//               readOnly={false}
//             />

//             <InputPassword
//             type={"password"}
//               id="newPassword"
//               name="newPassword"
//               placeholder="New Password"
//               value={formData.newPassword}
//               setForm={setFormData}
//               maxLength={10}
//               schema={newPasswordSchema}
//               imp
//               icon={<MdOutlineKey />}
//               readOnly={false}
//             />

//             <InputPassword
//               id="confirmPassword"
//               type={"password"}
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               setForm={setFormData}
//               schema={confirmPasswordSchema}
//               maxLength={10}
//               imp
//               icon={<MdOutlineKey />}
//               readOnly={false}
//             />
//             <button type="submit">Change Password</button>
//           </div>
//         </div>
//       </form>

//       {/* Render modal if showModal is true */}
//       {showModal && <Modal onLogout={handleLogout} />}
//     </section>
//   );
// };

// export default ChangePassword;
// import React, { useState, useEffect } from "react";
// import { MdOutlineKey } from "react-icons/md";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { InputPassword } from "../common/ALLINPUTS/AllInputs";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useNavigate } from "react-router-dom";
// import Joi from "joi";
// import { toastOptions } from "../../Utils/FakeRoutes";

// // Modal component
// const Modal = ({ onLogout }) => (
//   <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//     <div className="modal-dialog modal-dialog-centered" role="document">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">Password Changed Successfully!</h5>
//         </div>
//         <div className="modal-body">
//           <p>Your password has been updated. Please log in again for security purposes.</p>
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
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);

//   // Define individual Joi schemas
//   const oldPasswordSchema = Joi.string().min(6).max(10).required().label("Old Password");
//   const newPasswordSchema = Joi.string()
//     .min(8)
//     .max(10)
//     .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
//     .required()
//     .label("New Password")
//     .messages({
//       "string.min": "Password must be at least 8 characters long",
//       "string.pattern.base":
//         "Password must contain at least one capital letter and one special character",
//     });
//   const confirmPasswordSchema = Joi.string().min(8).max(10).required().label("Confirm Password");

//   // Validate individual fields
//   const validateField = (field, value) => {
//     let schema;
//     switch (field) {
//       case "oldPassword":
//         schema = oldPasswordSchema;
//         break;
//       case "newPassword":
//         schema = newPasswordSchema;
//         break;
//       case "confirmPassword":
//         schema = confirmPasswordSchema;
//         break;
//       default:
//         return;
//     }

//     const { error } = schema.validate(value);
//     return error ? error.details[0].message : null;
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     // Validate all fields
//     Object.keys(formData).forEach((key) => {
//       const errorMessage = validateField(key, formData[key]);
//       if (errorMessage) {
//         newErrors[key] = errorMessage;
//         isValid = false;
//         // toastOptions.error(errorMessage); // Show error messages using toast
//       }
//     });

//     // Special validation for confirmPassword
//     if (formData.confirmPassword !== formData.newPassword) {
//       newErrors.confirmPassword = "Confirm Password must match New Password";
//       isValid = false;
//       // toastOptions.error(newErrors.confirmPassword);
//     }

//     setIsFormValid(isValid);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const payload = {
//         old_password: formData.oldPassword,
//         new_password: formData.newPassword,
//       };

//       // Make backend call with token in headers
//       const res = await backEndCallObjNothing("/emp/reset_password", payload);
//       toastOptions.success(res.success || "Password changed successfully");

//       // Show the modal on success
//       setShowModal(true);
//     } catch (error) {
//       console.log(error,"error")
//       toastOptions.error(error.response.data || "Error changing password");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("zohoEmployeeToken");
//     navigate("/login");
//   };

//   useEffect(() => {
//     validateForm(); // Validate form on every change
//   }, [formData]);

//   return (
//     <section
//       className="company-details p-3"
//       style={{ background: applicationColor.cardBg1 }}
//     >
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <div className="card p-4">
//               <h5 className="text-center mb-4">Change Password</h5>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group mb-3">
//                   <InputPassword
//                     id="oldPassword"
//                     name="oldPassword"
//                     placeholder="Old Password"
//                     value={formData.oldPassword}
//                     setForm={setFormData}
//                     maxLength={10}
//                     schema={oldPasswordSchema}
//                     imp
//                     icon={<MdOutlineKey />}
//                     readOnly={false}
//                   />
//                 </div>
//                 <div className="form-group mb-3">
//                   <InputPassword
//                     id="newPassword"
//                     name="newPassword"
//                     placeholder="New Password"
//                     value={formData.newPassword}
//                     setForm={setFormData}
//                     maxLength={10}
//                     schema={newPasswordSchema}
//                     imp
//                     icon={<MdOutlineKey />}
//                     readOnly={false}
//                   />
//                 </div>
//                 <div className="form-group mb-3">
//                   <InputPassword
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     value={formData.confirmPassword}
//                     setForm={setFormData}
//                     schema={confirmPasswordSchema}
//                     maxLength={10}
//                     imp
//                     icon={<MdOutlineKey />}
//                     readOnly={false}
//                   />
//                 </div>
//                 <div className="text-center">
//                   <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
//                     Change Password
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Render modal if showModal is true */}
//       {showModal && <Modal onLogout={handleLogout} />}
//     </section>
//   );
// };

// export default ChangePassword;
import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Joi from "joi";
import { backEndCallObjNothing } from "../../services/mainService";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../Utils/FakeRoutes";
import { useThemeContext } from "../Contexts/ThemesContext";

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
  const [isFormValid, setIsFormValid] = useState(false);

  // Define individual Joi schemas
  const oldPasswordSchema = Joi.string()
    .min(6)
    .max(10)
    .required()
    .label("Old Password")
    .messages({
      "string.min": "Old Password must be at least 6 characters long",
      "string.max": "Old Password must be less than 11 characters long",
      "any.required": "Old Password is required",
    });

  const newPasswordSchema = Joi.string()
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
    });

  const confirmPasswordSchema = Joi.string()
    // .valid(Joi.ref("newPassword"))
    .required()
    .label("Confirm Password")
    .messages({
      "any.only": "Confirm Password must match New Password",
      "any.required": "Confirm Password is required",
    });

  // Validate individual fields
  const validateField = (field, value) => {
    let schema;
    switch (field) {
      case "oldPassword":
        schema = oldPasswordSchema;
        break;
      case "newPassword":
        schema = newPasswordSchema;
        break;
      case "confirmPassword":
        schema = confirmPasswordSchema;
        break;
      default:
        return;
    }

    const { error } = schema.validate(value, { abortEarly: false });
    return error
      ? error.details.map((detail) => detail.message).join(", ")
      : null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: errorMessage,
    });

    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        newErrors[key] = errorMessage;
        isValid = false;
      }
    });

    // Special validation for confirmPassword
    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Confirm Password must match New Password";
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
      };

      const res = await backEndCallObjNothing("/emp/reset_password", payload);
      toastOptions.success(res.success || "Password changed successfully");

      setShowModal(true);
    } catch (error) {
      console.log(error, "error");
      toastOptions.error(error.response.data || "Error changing password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("zohoEmployeeToken");
    navigate("/login");
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <section
      className="company-details p-3"
      style={{ background: applicationColor.cardBg1 }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
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
                    <span
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      style={{
                        position: "absolute",
                        top: "40%",
                        left: "420px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                      }}
                    >
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
                      maxLength={8}
                    />
                    <span
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: "absolute",
                        top: "40%",
                        left: "420px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                      }}
                    >
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
                      maxLength={8}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        position: "absolute",
                        top: "40%",
                        left: "420px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                      }}
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isFormValid}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <Modal onLogout={handleLogout} />}
    </section>
  );
};

export default ChangePassword;