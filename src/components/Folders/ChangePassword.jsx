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



import React, { useState } from "react";
import { MdOutlineKey } from "react-icons/md";
import { useThemeContext } from "../Contexts/ThemesContext";
// import { toast } from "react-toastify"; // Import toast from react-toastify
import { InputPassword } from "../common/ALLINPUTS/AllInputs";
import { backEndCallObjNothing } from "../../services/mainService";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { toastOptions } from "../../Utils/FakeRoutes";

// Modal component
const Modal = ({ onLogout }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Password Changed Successfully!</h2>
      <button onClick={onLogout}>Logout</button>
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

  const [showModal, setShowModal] = useState(false);

  // Define individual Joi schemas
  const oldPasswordSchema = Joi.string().min(6).max(10).required().label("Old Password");
  const newPasswordSchema = Joi.string()
    .min(8)
    .max(10)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
    .required()
    .label("New Password")
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one capital letter and one special character",
    });
  const confirmPasswordSchema = Joi.string().min(8).max(10).required().label("Confirm Password");

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

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        newErrors[key] = errorMessage;
        toastOptions.error(errorMessage); // Show error messages using toast
      }
    });

    // Special validation for confirmPassword
    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Confirm Password must match New Password";
      toastOptions.error(newErrors.confirmPassword);
    }

    return Object.keys(newErrors).length === 0;
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

      // Make backend call with token in headers
      const res = await backEndCallObjNothing("/emp/reset_password", payload);
      toastOptions.success(res.success || "Password changed successfully");

      // Show the modal on success
      setShowModal(true);
    } catch (error) {
      console.log(error,"error")
      toastOptions.error(error.response.data || "Error changing password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("zohoEmployeeToken");
    navigate("/login");
  };

  return (
     <section
    className="company-details"
    style={{ background: applicationColor.cardBg1 }}
  >
      <form className="all-folders" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-4 mx-auto">
            <h5 className="text-center mb-4">Change Password</h5>
            <InputPassword
              id="oldPassword"
              type={"password"}
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              setForm={setFormData}
              maxLength={10}
              schema={oldPasswordSchema}
              imp
              icon={<MdOutlineKey />}
              readOnly={false}
            />

            <InputPassword
            type={"password"}
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              setForm={setFormData}
              maxLength={10}
              schema={newPasswordSchema}
              imp
              icon={<MdOutlineKey />}
              readOnly={false}
            />

            <InputPassword
              id="confirmPassword"
              type={"password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              setForm={setFormData}
              schema={confirmPasswordSchema}
              maxLength={10}
              imp
              icon={<MdOutlineKey />}
              readOnly={false}
            />
            <button type="submit">Change Password</button>
          </div>
        </div>
      </form>

      {/* Render modal if showModal is true */}
      {showModal && <Modal onLogout={handleLogout} />}
    </section>
  );
};

export default ChangePassword;
