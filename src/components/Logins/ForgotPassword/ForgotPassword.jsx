// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MdOutlineKey } from "react-icons/md";
// import { MdEmail } from "react-icons/md";
// import { Input_email, Input_password } from "../../common/ALLINPUTS/AllInputs";
// import Loader from "../../Loader/Loader";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useFunctionContext } from "../../Contexts/FunctionContext";
// import {
//   makeNetworkCall,
//   settingTokens,
// } from "../../../HttpServices/HttpService";
// import Joi from "joi";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import cglogo from "../../../cg_logo_mini.png";
// import { useThemeContext } from "../../Contexts/ThemesContext";

// const ForgotPassword = ({ prevSlide }) => {
//   const { applicationColor } = useThemeContext();
//   const [formData, setFormData] = useState({ existEmail: "" });
//   const forgotPasswordSchema = {
//     existEmail: Joi.string()
//       .min(10)
//       .max(25)
//       .email({ tlds: { allow: ["com", "net", "org"] } })
//       .required()
//       .label("Email"),
//     // newPassword: Joi.string()
//     //   .min(8)
//     //   .max(20)
//     //   .required()
//     //   .pattern(
//     //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=])/
//     //   )
//     //   .messages({
//     //     "string.pattern.base":
//     //       '"Password" Should Contain At Least 1 Capital Letter, 1 Small Letter, 1 Number And 1 Special Character',
//     //     "any.required": '"Password" is required',
//     //   })
//     //   .label("Password"),
//   };
//   const { loading, setLoading, loadingTerm, setLoadingTerm } =
//     useStateContext();
//   const { checkErrors } = useFunctionContext();
//   const [isValid, setIsValid] = useState({
//     existEmail: false,
//     // newPassword: false,
//   });
//   const validateField = (name, value) => {
//     const schema = Joi.object(forgotPasswordSchema);
//     const { error } = schema.extract(name).validate(value);
//     return !error;
//   };

//   useEffect(() => {
//     const existEmailValid = validateField("existEmail", formData.existEmail);
//     const newPasswordValid = validateField("newPassword", formData.newPassword);
//     setIsValid({
//       existEmail: existEmailValid,
//       newPassword: newPasswordValid,
//     });
//   }, [formData]);

//   const resettingPassword = async (e) => {
//     try {
//       e.preventDefault();
//       setLoadingTerm("set_password");
//       setLoading(true);
//       await checkErrors(forgotPasswordSchema, formData);
//       const response = await makeNetworkCall(
//         {
//           email: formData.existEmail,
//           password: formData.newPassword,
//         },
//         "resetPassword"
//       );
//       toastOptions.success(response.detail || "Passowrd set Successfully");
//       setLoadingTerm("");
//       prevSlide();
//     } catch (error) {
//       setLoading(false);
//       setLoadingTerm("");
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };

//   // useNavigate hook
//   const navigate = useNavigate();

//   return (
//     <form className="employee-login-form mt-3" onSubmit={resettingPassword}>
//       <div className="greetings mb-1">
//         <h2 className="welcome mb-2">Set Password</h2>
//         <h4 className="details mb-2">Please enter your account details</h4>

//         {/* <img src={cglogo} alt="" width="90px" /> */}

//         {/* <img src={cglogo} alt="" width="90px" /> */}
//       </div>

//       <Input_email
//         type={"email"}
//         placeholder={"Email Address"}
//         name={"existEmail"}
//         value={formData["existEmail"]}
//         setForm={setFormData}
//         schema={forgotPasswordSchema.existEmail}
//         imp
//         icon={<MdEmail />}
//       />
//       {/* <Input_password
//         type={"passsword"}
//         placeholder={"Set New Password"}
//         name={"newPassword"}
//         value={formData["newPassword"]}
//         setForm={setFormData}
//         id={"password"}
//         schema={forgotPasswordSchema.newPassword}
//         imp
//         icon={<MdOutlineKey />}
//       /> */}

//       {/* <h5 className="forgot-password" onClick={() => navigate("/login")}>
//         <span>Already have account sign in</span>
//       </h5> */}
//       {/* <div className="employee-login mt-3">
//         <span>Already have account?</span>{" "}
//         <a className="fw-semibold" onClick={() => navigate("/login")}>
//           Sign in
//         </a>
//       </div> */}

//       <div className="setPassword-wrapper mt-2">
//         <span>Already have account?</span>
//         <h5
//           className="forgot-password fw-semibold"
//           onClick={() => navigate("/login")}
//         >
//           Sign in
//         </h5>
//       </div>

//       <div className="employee-button">
//         <button
//           className="employee-form-button"
//           disabled={!isValid.existEmail  || loading}
//           style={{
//             background: applicationColor.buttonColor,
//           }}
//         >
//           {loading && loadingTerm === "set_password" ? (
//             <Loader />
//           ) : (
//             "Set Password"
//           )}{" "}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ForgotPassword;
