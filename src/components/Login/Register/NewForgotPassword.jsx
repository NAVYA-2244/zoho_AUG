// import React, { useState, useEffect } from "react";
// import { MdEmail } from "react-icons/md";
// import { InputEmail, InputPassword } from "../../common/ALLINPUTS/AllInputs";
// import Joi from "joi";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { fullBrowserVersion } from "react-device-detect";
// import { backEndCallObjNothing } from "../../../services/mainService";
// import otpImage from "../../../assets/images/otp-image1.png";
// import officeImg from "../../../../src/assets/Login/office.png";
// import logolg from "../../../../src/assets/Login/logo-lg.png";
// import { useNavigate } from "react-router-dom";
// import { useFunctionContext } from "../../Contexts/FunctionContext";

// const NewForgotPassword = () => {
//   const [formData, setFormData] = useState({ email: "" });
//   const [otpData, setOtpData] = useState({
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(120);
//   const [showOtpFields, setShowOtpFields] = useState(false);
//   const [btndisabled, setBtndisabled] = useState(false);
//   const [errors, setErrors] = useState({});
//   const { applicationColor } = useThemeContext();
//   const navigate = useNavigate();
//   const { checkErrors } = useFunctionContext();
//   const ResetPasswordSchema = {
//     email: Joi.string()
//       .email({ tlds: { allow: ["com", "net", "org"] } })
//       .max(50)
//       .required()
//       .messages({
//         "string.email": "Please enter a valid email address.",
//         "string.max": "Email must be less than 50 characters.",
//         "any.required": "Email is required.",
//       }),
//   };

//   const PasswordSchema = Joi.object({
//     otp: Joi.string().min(6).max(6).required().messages({
//       "string.min": "OTP must be 6 characters long.",
//       "string.max": "OTP must be 6 characters long.",
//       "any.required": "OTP is required.",
//     }),
//     newPassword: Joi.string()
//       .min(8)
//       .max(10)
//       .required()
//       .pattern(/(?=.*[A-Z])/, "uppercase")
//       .pattern(/(?=.*[@$!%*?&])/, "special")
//       .messages({
//         "string.min": "New password must be at least 8 characters long.",
//         "string.max": "New password must be less than 10 characters long.",
//         "string.pattern.uppercase":
//           "New password must contain at least one uppercase letter.",
//         "string.pattern.special":
//           "New password must contain at least one special character.",
//         "any.required": "New password is required.",
//       }),
//     confirmPassword: Joi.string()
//       .valid(Joi.ref("newPassword"))
//       .required()
//       .messages({
//         "any.only": "Confirm password doesn't match the new password.",
//         "any.required": "Confirm password is required.",
//       }),
//   });

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setBtndisabled(true);

//     try {
//       await checkErrors(ResetPasswordSchema, formData);
//       const obj = { email: formData.email };

//       const response = await backEndCallObjNothing("/emp/forgot_password", obj);

//       if (response?.success) {
//         toastOptions.success("OTP sent to your email!");
//         setShowOtpFields(true);
//         setTimeLeft(120);
//       } else {
//         toastOptions.error(response?.error || "Failed to send OTP");
//       }
//     } catch (e) {
//       toastOptions.error("Something went wrong");
//     } finally {
//       setBtndisabled(false);
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setBtndisabled(true);

//     try {
//       const { error } = PasswordSchema.validate(otpData, {
//         abortEarly: false,
//       });

//       if (error) {
//         const errorMessages = error.details.reduce((acc, { path, message }) => {
//           acc[path[0]] = message;
//           return acc;
//         }, {});

//         if (!errorMessages.confirmPassword && !otpData.confirmPassword) {
//           errorMessages.confirmPassword = `"ConfirmPassword" is not allowed to be empty`;
//         }

//         setErrors(errorMessages);
//         setBtndisabled(false);
//         return;
//       }

//       const obj = {
//         email: formData.email,
//         otp: otpData.otp,
//         new_password: otpData.newPassword,
//       };

//       const response = await backEndCallObjNothing(
//         "/emp/reset_forgot_password",
//         obj
//       );

//       if (response?.success) {
//         toastOptions.success("Password reset successful!");
//         navigate("/login");
//       } else {
//         toastOptions.error(response?.error || "Password reset failed");
//       }
//     } catch (e) {
//       toastOptions.error("Something went wrong");
//     } finally {
//       setBtndisabled(false);
//     }
//   };
//   // const formatTime = (seconds) => {
//   //   const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
//   //   const remainingSeconds = String(seconds % 60).padStart(2, "0");
//   //   return `${minutes}:${remainingSeconds}`;
//   // };
//   const formatTime = (seconds) => {
//     return `${seconds}s`; // Return the time in seconds with an 's' suffix
//   };
//   const handleResendOtp = async () => {
//     try {
//       setResendDisabled(true);
//       setOtpData("");
//       const response = await backEndCallObjNothing("/emp/resend_otp", {
//         email: formData.email,
//       });
//       toastOptions.success(response?.success || "OTP Resent");
//       setTimeLeft(120);
//       setTimeout(() => setResendDisabled(false), 60000);
//     } catch (error) {
//       toastOptions.error(error?.response?.data || "Something went wrong");
//       setResendDisabled(false);
//     }
//   };

//   useEffect(() => {
//     if (timeLeft === 0) return;
//     const timerId = setInterval(() => {
//       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
//     }, 1000);
//     return () => clearInterval(timerId);
//   }, [timeLeft]);
//   const handleOtpChange = (e) => {
//     const newValue = e.target.value;
//     if (/^\d*$/.test(newValue) && newValue.length <= 6) {
//       setOtpData((prev) => ({
//         ...prev,
//         otp: newValue,
//       }));
//     }
//     setErrors("");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setOtpData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const errorStyle = { color: "red", fontSize: "14px", marginTop: "5px" };
//   return (
//     <div className="sign-wrapper">
//       <section className="NewLogin-section">
//         <div className="login-left-wrapper p-4">
//           <img
//             src={showOtpFields ? otpImage : officeImg}
//             alt="auth-img"
//             width="100%"
//           />
//         </div>
//         <div className="line-wrapper">
//           <hr className="vertical-line" />
//         </div>
//         <div className="login-right-wrapper">
//           <form
//             className="employee-login-form"
//             onSubmit={showOtpFields ? handleOtpSubmit : handleEmailSubmit}
//           >
//             {!showOtpFields ? (
//               <>
//                 <div className="greetings">
//                   <div className="logo-wrapper mb-4">
//                     <img
//                       src={logolg}
//                       alt="company-logo"
//                       width="100"
//                       style={{ position: "relative", top: "-30px" }}
//                     />
//                   </div>
//                   <h3
//                     className="welcome mb-1"
//                     style={{
//                       textAlign: "center",
//                       // position: "relative",
//                       // top: "1px",
//                     }}
//                   >
//                     Forgot Password
//                   </h3>
//                   <br />
//                   <p className="mb-8">
//                     lost your password? please enter your email address . then
//                     you can create a new password
//                   </p>
//                   <InputEmail
//                     type="email"
//                     placeholder="Email Address"
//                     name="email"
//                     value={formData.email}
//                     setForm={setFormData}
//                     schema={ResetPasswordSchema.email}
//                     required
//                     autoComplete="email"
//                     maxLength={50}
//                     icon={<MdEmail />}
//                     className="position-absolute"
//                     style={{ top: "250px", left: "5px" }}
//                     // className="mb-18"
//                   />
//                   {errors.email && (
//                     <p className="error-message">{errors.email}</p>
//                   )}
//                   <div className="employee-button">
//                     <button
//                       className="employee-form-button sign-in"
//                       disabled={btndisabled}
//                       style={{
//                         background: applicationColor.buttonColor,
//                       }}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="greetings mb-3">
//                   <div className="logo-wrapper mb-4">
//                     <img
//                       src={logolg}
//                       alt="company-logo"
//                       width="100"
//                       style={{ position: "relative", top: "-10px" }}
//                     />
//                   </div>
//                   <h1 className="welcome mb-1">OTP Verification</h1>
//                   <h4 className="details mb-2 fw-semibold">
//                     Please enter the OTP sent to your registered email
//                   </h4>
//                   <p className="text-primary mb-4">{formData.email}</p>
//                   <div className="main-input" style={{ marginBottom: "10px" }}>
//                     <label htmlFor="otp">OTP</label>
//                     <input
//                       className="form-control"
//                       type="tel"
//                       id="otp"
//                       name="otp"
//                       maxLength={6}
//                       placeholder="Enter your OTP"
//                       value={otpData.otp}
//                       onChange={handleOtpChange}
//                     />
//                     {errors.otp && <p style={errorStyle}>{errors.otp}</p>}
//                   </div>
//                   {timeLeft ? (
//                     <div className="fs-14" style={{ marginBottom: "10px" }}>
//                       <div className="d-flex align-items-center">
//                         <span className="flex-shrink-0">
//                           Resend otp in
//                           {/* <br /> */}
//                           <span
//                             style={{
//                               fontWeight: "bold",
//                               marginLeft: "3px", // Makes the text bold
//                             }}
//                           >
//                             {formatTime(timeLeft)}
//                           </span>
//                         </span>
//                         <div
//                           className=""
//                           // style={{
//                           //   background: `conic-gradient(rgb(75, 73, 172) ${
//                           //     timeLeft * (360 / 120)
//                           //   }deg, #d0d0d2 0deg)`,
//                           // }}
//                         >
//                           {/* <div
//                             className="semi-circle"
//                             // style={{ width: "50px" }}
//                           ></div> */}
//                           <p>{/* {formatTime(timeLeft)} */}</p>
//                         </div>
//                         {/* <span>Seconds</span> */}
//                       </div>
//                     </div>
//                   ) : (
//                     <div>
//                       <p className="mb-0 mt-3">Didn't receive OTP code?</p>

//                       <button
//                         className="btn text-primary p-0 lh-0 mb-1em"
//                         type="button"
//                         onClick={handleResendOtp}
//                         disabled={resendDisabled}
//                         style={{ marginBottom: "10px" }}
//                       >
//                         Resend Code
//                       </button>
//                     </div>
//                   )}
//                   <div className="main-input" style={{ marginBottom: "5px" }}>
//                     <label htmlFor="newPassword">New Password</label>
//                     <InputPassword
//                       id="newPassword"
//                       name="newPassword"
//                       placeholder="New Password"
//                       value={otpData.newPassword}
//                       setForm={setOtpData}
//                       schema={PasswordSchema.newPassword}
//                       imp
//                       readOnly={false}
//                     />
//                     {errors.newPassword && (
//                       <div style={errorStyle}>{errors.newPassword}</div>
//                     )}
//                   </div>
//                   <div className="main-input" style={{ marginBottom: "2px" }}>
//                     {/* <br /> */}
//                     <label htmlFor="confirmPassword">Confirm Password</label>
//                     <InputPassword
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       placeholder="Confirm Password"
//                       value={otpData.confirmPassword}
//                       setForm={setOtpData}
//                       schema={PasswordSchema.confirmPassword}
//                       imp
//                       readOnly={false}
//                     />
//                     {errors.confirmPassword && (
//                       <div style={errorStyle}>{errors.confirmPassword}</div>
//                     )}
//                     {otpData.confirmPassword &&
//                       otpData.newPassword !== otpData.confirmPassword && (
//                         <div style={errorStyle}>
//                           Confirm Password does not match New Password
//                         </div>
//                       )}
//                   </div>
//                   <div className="employee-button">
//                     <button
//                       className="employee-form-button"
//                       disabled={btndisabled}
//                       style={{
//                         background: applicationColor.buttonColor,
//                       }}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default NewForgotPassword;

import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { InputEmail, InputPassword } from "../../common/ALLINPUTS/AllInputs";
import Joi from "joi";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { fullBrowserVersion } from "react-device-detect";
import { backEndCallObjNothing } from "../../../services/mainService";
import otpImage from "../../../assets/images/otp-image1.png";
import officeImg from "../../../../src/assets/Login/office.png";
import logolg from "../../../../src/assets/Login/logo-lg.png";
import { useNavigate } from "react-router-dom";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { MdOutlineKey } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const NewForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [otpData, setOtpData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [btndisabled, setBtndisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const { applicationColor } = useThemeContext();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const navigate = useNavigate();
  const { checkErrors } = useFunctionContext();
  const [otp, setOtp] = useState("");
  const ResetPasswordSchema = {
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org","io"] } })
      .max(50)
      .required()
      .messages({
        "string.email": "Please enter a valid email address.",
        "string.max": "Email must be less than 50 characters.",
        "any.required": "Email is required.",
      }),
  };
  const otpSchema = Joi.object({
    otp: Joi.string()
      .length(6) // Assuming OTP is a 6-digit code
      .pattern(/^[0-9]+$/) // Ensure OTP contains only digits
      .required()
      .messages({
        "string.length": "OTP must be 6 digits long",
        "string.pattern.base": "OTP must contain only digits",
        "any.required": "OTP is required",
      }),
  });

  const newPasswordSchema = Joi.object({
    newPassword: Joi.string()
      .min(8)
      .max(10)
      .pattern(/^[a-zA-Z0-9!@#$%^&*()_+]*$/, "password")
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base":
          "Password must contain at least one capital letter and one special character",
        "any.required": "New password is required",
      }),
  });

  const confirmPasswordSchema = Joi.object({
    confirmPassword: Joi.string()
      .min(8)
      .max(10)
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long",
        "any.only": "confirm password is not allowed to be empty",
        "any.required": "Confirm password is required",
      }),
  });

  const validateField = (field, value) => {
    let schema;
    switch (field) {
      case "email":
        schema = ResetPasswordSchema;
        break;
      case "newPassword":
        schema = newPasswordSchema;
        break;
      case "confirmPassword":
        schema = confirmPasswordSchema;
        break;
      case "otp":
        schema = otpSchema;
        break;
      default:
        return null;
    }

    const { error } = schema.validate({ [field]: value });
    return error ? error.details[0].message : null;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each field in otpData
    Object.keys(otpData).forEach((key) => {
      const errorMessage = validateField(key, otpData[key]);
      if (errorMessage) {
        newErrors[key] = errorMessage;
        isValid = false;
      }
    });

    // Additional validation for confirmPassword
    if (otpData.confirmPassword !== otpData.newPassword) {
      newErrors.confirmPassword = "Confirm Password must match New Password";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleOtpChange = (e) => {
    const newValue = e.target.value;
    // Ensure only digits and length up to 6 characters
    if (/^\d*$/.test(newValue) && newValue.length <= 6) {
      setOtpData((prev) => ({
        ...prev,
        otp: newValue,
      }));
    }
    // Clear OTP error when user is typing
    setErrors((prev) => ({ ...prev, otp: "" }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setBtndisabled(true);

    try {
      await checkErrors(ResetPasswordSchema, formData);
      const obj = { email: formData.email };

      const response = await backEndCallObjNothing("/emp/forgot_password", obj);

      if (response?.success) {
        toastOptions.success("OTP sent to your email!");
        setShowOtpFields(true);
        setTimeLeft(120);
      } else {
        toastOptions.error(response?.error || "Failed to send OTP");
      }
    } catch (e) {
      toastOptions.error("Something went wrong");
    } finally {
      setBtndisabled(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await checkErrors(
        newPasswordSchema,
        confirmPasswordSchema,
        otpSchema,
        otpData
      );
      const obj = {
        email: formData.email,
        otp: otpData.otp,
        new_password: otpData.newPassword,
      };

      const response = await backEndCallObjNothing(
        "/emp/reset_forgot_password",
        obj
      );

      if (response?.success) {
        toastOptions.success("Password reset successful!");
        navigate("/login");
      } else {
        toastOptions.error(response?.error || "Password reset failed");
      }
    } catch (e) {
      toastOptions.error("something is went wrong");
    } finally {
      setBtndisabled(false);
    }
  };

  const formatTime = (seconds) => {
    return `${seconds} seconds`;
  };
  const handleResendOtp = async () => {
    try {
      setResendDisabled(true);
      setOtpData("");
      const response = await backEndCallObjNothing("/emp/resend_otp", {
        email: formData.email,
      });
      toastOptions.success(response?.success || "OTP Resent");
      setTimeLeft(120);
      setTimeout(() => setResendDisabled(false), 60000);
    } catch (error) {
      toastOptions.error(error?.response?.data || "Something went wrong");
      setResendDisabled(false);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prev) => ({ ...prev, [name]: value }));

    // Validate the field
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));

    // Special validation for confirmPassword
    if (name === "confirmPassword") {
      if (value !== otpData.newPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Confirm Password must match New Password",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const errorStyle = { color: "red", fontSize: "14px", marginTop: "5px" };
  return (
    <div className="sign-wrapper">
      <section className="NewLogin-section">
        <div className="login-left-wrapper p-4">
          <img
            src={showOtpFields ? otpImage : officeImg}
            alt="auth-img"
            width="100%"
          />
        </div>
        <div className="line-wrapper">
          <hr className="vertical-line" />
        </div>
        <div className="login-right-wrapper">
          <form
            className="employee-login-form"
            onSubmit={showOtpFields ? handleOtpSubmit : handleEmailSubmit}
          >
            {!showOtpFields ? (
              <>
                <div className="greetings">
                  <div className="logo-wrapper mb-4">
                    <img
                      src={logolg}
                      alt="company-logo"
                      width="100"
                      style={{ position: "relative", top: "-30px" }}
                    />
                  </div>
                  <h3
                    className="welcome mb-1"
                    style={{
                      textAlign: "center",
                      // position: "relative",
                      // top: "1px",
                    }}
                  >
                    Forgot Password
                  </h3>
                  <br />
                  <p className="mb-8">
                    lost your password? please enter your email address . then
                    you can create a new password
                  </p>
                  <InputEmail
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    setForm={setFormData}
                    schema={ResetPasswordSchema.email}
                    required
                    autoComplete="email"
                    maxLength={50}
                    icon={<MdEmail />}
                    className="position-absolute"
                    style={{ top: "250px", left: "5px" }}
                    // className="mb-18"
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                  <div className="employee-button">
                    <button
                      className="employee-form-button sign-in"
                      disabled={btndisabled}
                      style={{
                        background: applicationColor.buttonColor,
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="greetings mb-3"
                  style={{ maxWidth: "400px", margin: "0 auto" }}
                >
                  {/* Logo and Heading */}
                  <div
                    className="logo-wrapper mb-4"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src={logolg}
                      alt="company-logo"
                      width="100"
                      style={{
                        position: "relative",
                        top: "-10px",
                        left: "160px",
                      }}
                    />
                  </div>
                  <h1 className="welcome mb-1" style={{ textAlign: "center" }}>
                    OTP Verification
                  </h1>
                  <h4 className="details mb-2 " style={{ textAlign: "center" }}>
                    Please enter the OTP sent to your registered email
                  </h4>
                  <p
                    className="text-primary mb-4"
                    style={{ textAlign: "center" }}
                  >
                    {formData.email}
                  </p>

                  {/* OTP Input Field */}
                  <div className="main-input mb-3">
                    <label
                      htmlFor="otp"
                      style={{
                        display: "block",
                        marginBottom: "0",
                        marginRight: "5px",
                        padding: "4px",
                      }}
                    >
                      OTP
                    </label>
                    <div className="input">
                      <input
                        // style={{
                        //   borderRadius: "10px",
                        //   width: "330px",
                        //   height: "40px",
                        // }}
                        className="form-control"
                        type="tel"
                        maxLength={6}
                        placeholder="Enter your OTP"
                        value={otp}
                        autoFocus // This will focus the input when the component loads
                        onChange={(e) => {
                          // Only set the OTP value if the new value contains only numbers
                          const newValue = e.target.value;
                          if (/^\d*$/.test(newValue)) {
                            setOtp(newValue);
                          }
                        }}
                        
                      />
                      <div style={{ padding: "5px" }}>
                        {errors.otp && (
                          <small className="form-text text-danger">
                            {errors.otp}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* New Password Input Field */}
                  <div className="form-group mb-3">
                    <label htmlFor="newPassword">New Password</label>
                    <div
                      className="input-group"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={showOldPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        setForm={setFormData}
                        maxLength={10}
                        onChange={handleInputChange}
                        autoFocus
                        // style={{
                        //   borderRadius: "10px",
                        //   width: "330px",
                        //   height: "40px",
                        // }}
                        className="form-control"
                        imp
                        readOnly={false}
                      />
                      <span
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "310px",
                        }}
                      >
                        {showOldPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </span>
                    </div>
                    <div style={{ padding: "5px" }}>
                      {errors.newPassword && (
                        <small className="form-text text-danger">
                          {errors.newPassword}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password Input Field */}
                  <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div
                      className="input-group"
                      style={{ position: "relative" }}
                    >
                      <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        setForm={setFormData}
                        onChange={handleInputChange}
                        autoFocus
                        maxLength={10}
                        // style={{
                        //   borderRadius: "10px",
                        //   width: "330px",
                        //   height: "40px",
                        // }}
                        className="form-control"
                        imp
                        icon={<MdOutlineKey />}
                        readOnly={false}
                      />
                      <span
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "310px",
                        }}
                      >
                        {showOldPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </span>
                    </div>
                    <div style={{ padding: "5px" }}>
                      {errors.confirmPassword && (
                        <small className="form-text text-danger">
                          {errors.confirmPassword}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Resend OTP Section */}
                  {timeLeft ? (
                    <div className="fs-14 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="flex-shrink-0">
                          Resend OTP in
                          <span
                            style={{
                              fontWeight: "bold",
                              marginLeft: "3px",
                            }}
                          >
                            {formatTime(timeLeft)}
                          </span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <p className="mb-0 mt-3">Didn't receive OTP code?</p>
                      <button
                        className="btn text-primary p-0 lh-0"
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendDisabled}
                        style={{ margin: "10px auto" }}
                      >
                        Resend Code
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div
                    className="employee-button"
                    style={{ textAlign: "center" }}
                  >
                    <button
                      className="employee-form-button"
                      disabled={btndisabled}
                      style={{
                        background: applicationColor.buttonColor,
                        marginTop: "10px",
                        width: "100%", // Optional: Ensure button width is also equal to inputs
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewForgotPassword;
