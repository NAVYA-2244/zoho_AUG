// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Joi from "joi";



// // import { MdEmail, MdOutlineKey } from "react-icons/md";

// // import officeImg from "../../../../src/assets/Login/office.png";
// // import logolg from "../../../../src/assets/Login/logo-lg.png";
// // import { InputEmail, InputOtp, InputPassword } from "../../common/ALLINPUTS/AllInputs";
// // import { toastOptions } from "../../../Utils/FakeRoutes";
// // import Loader from "../../Loader/Loader";
// // import { useStateContext } from "../../Contexts/StateContext";
// // import { useFunctionContext } from "../../Contexts/FunctionContext";
// // import { useThemeContext } from "../../Contexts/ThemesContext";
// // import { backEndCallObjNothing } from "../../../services/mainService";

// // function NewForgotPassword() {
// //   const { applicationColor } = useThemeContext();
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     otp: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   });
// //   const [step, setStep] = useState("email"); // Step can be "email", "otp", or "password"
// //   const [isValid, setIsValid] = useState({
// //     email: false,
// //     otp: false,
// //     newPassword: false,
// //     confirmPassword: false,
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [loadingTerm, setLoadingTerm] = useState("");

// //   const navigate = useNavigate();
// //   const { setLoading: setLoadingContext } = useStateContext();
// //   const { checkErrors } = useFunctionContext();

// //   const emailSchema = {
// //     email: Joi.string()
// //       .min(10)
// //       .max(25)
// //       .email({ tlds: { allow: ["com", "net", "org"] } })
// //       .required()
// //       .label("Email"),
// //   };

// //   const otpSchema = Joi.object({
// //     otp: Joi.string().length(6).required().label("OTP"), // Assuming OTP is 6 digits
// //   });

// //   const passwordSchema = {
// //     newPassword: Joi.string()
// //       .min(8)
// //       .max(20)
// //       .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
// //       .required()
// //       .label("New Password")
// //       .messages({
// //         "string.min": "Password must be at least 8 characters long",
// //         "string.pattern.base": "Password must contain at least one capital letter and one special character",
// //       }),
// //     confirmPassword: Joi.string()
      
// //       .required()
// //       .label("Confirm Password")
// //       .messages({ "any.only": "Confirm Password must match New Password" }),
// //   };

// //   const validateField = (name, value) => {
// //     let schema;
// //     if (step === "email") schema = emailSchema;
// //     else if (step === "otp") schema = otpSchema;
// //     else schema = passwordSchema;

// //     const { error } = schema.extract(name).validate(value);
// //     return !error;
// //   };

// //   const handleEmailSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoadingTerm("email");
// //     setLoading(true);
// //     try {
// //       await checkErrors(emailSchema, { email: formData.email });
// //       const response = await backEndCallObjNothing({ email: formData.email }, "requestOtp");
// //       toastOptions.success(response.detail || "OTP sent successfully");
// //       setStep("otp");
// //     } catch (error) {
// //       toastOptions.error(error.message || "Error sending OTP");
// //     } finally {
// //       setLoading(false);
// //       setLoadingTerm("");
// //     }
// //   };

// //   const handleOtpSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoadingTerm("otp");
// //     setLoading(true);
// //     try {
// //       await checkErrors(otpSchema, { otp: formData.otp });
// //       setStep("password");
// //     } catch (error) {
// //       toastOptions.error(error.message || "Invalid OTP");
// //     } finally {
// //       setLoading(false);
// //       setLoadingTerm("");
// //     }
// //   };

// //   const handlePasswordSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoadingTerm("password");
// //     setLoading(true);
// //     try {
// //       await checkErrors(passwordSchema, {
// //         newPassword: formData.newPassword,
// //         confirmPassword: formData.confirmPassword,
// //       });

// //       const response = await backEndCallObjNothing(
// //         {
// //           email: formData.email,
// //           otp: formData.otp,
// //           newPassword: formData.newPassword,
// //         },
// //         "resetPassword"
// //       );
// //       toastOptions.success(response.detail || "Password set successfully");
// //       navigate("/login");
// //     } catch (error) {
// //       toastOptions.error(error.message || "Error resetting password");
// //     } finally {
// //       setLoading(false);
// //       setLoadingTerm("");
// //     }
// //   };

// //   return (
// //     <div className="sign-wrapper">
// //       <section className="NewLogin-section">
// //         <div className="login-left-wrapper p-4">
// //           <img src={officeImg} alt="office-img" />
// //         </div>
// //         <div className="line-wrapper">
// //           <hr className="vertical-line" />
// //         </div>
// //         <div className="login-right-wrapper">
// //           <div className="logo-wrapper">
// //             <img src={logolg} alt="company-logo" width="100" />
// //           </div>

// //           <form
// //             className="employee-login-form mt-3"
// //             onSubmit={
// //               step === "email"
// //                 ? handleEmailSubmit
// //                 : step === "otp"
// //                 ? handleOtpSubmit
// //                 : handlePasswordSubmit
// //             }
// //           >
// //             <div className="greetings mb-1">
// //               <h2 className="welcome mb-2">
// //                 {step === "email" && "Request Password Reset"}
// //                 {step === "otp" && "Enter OTP"}
// //                 {step === "password" && "Set New Password"}
// //               </h2>
// //             </div>

// //             {step === "email" && (
// //               <>
// //                 <InputEmail
// //                   type={"email"}
// //                   placeholder={"Email Address"}
// //                   name={"email"}
// //                   value={formData.email}
// //                   setForm={setFormData}
// //                   schema={emailSchema.email}
// //                   imp
// //                   icon={<MdEmail />}
// //                 />
// //                 <div className="employee-button">
// //                   <button
// //                     className="employee-form-button"
// //                     disabled={!isValid.email || loading}
// //                     style={{ background: applicationColor.buttonColor }}
// //                   >
// //                     {loading && loadingTerm === "email" ? <Loader /> : "Request OTP"}
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {step === "otp" && (
// //               <>
// //                 <InputOtp
// //                   type={"text"}
// //                   placeholder={"Enter OTP"}
// //                   name={"otp"}
// //                   value={formData.otp}
// //                   setForm={setFormData}
// //                   schema={otpSchema.otp}
// //                   imp
// //                 />
// //                 <div className="employee-button">
// //                   <button
// //                     className="employee-form-button"
// //                     disabled={!isValid.otp || loading}
// //                     style={{ background: applicationColor.buttonColor }}
// //                   >
// //                     {loading && loadingTerm === "otp" ? <Loader /> : "Verify OTP"}
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {step === "password" && (
// //               <>
// //                 <InputPassword
// //                   type={"password"}
// //                   placeholder={"New Password"}
// //                   name={"newPassword"}
// //                   value={formData.newPassword}
// //                   setForm={setFormData}
// //                   schema={passwordSchema.newPassword}
// //                   imp
// //                   icon={<MdOutlineKey />}
// //                 />
// //                 <InputPassword
// //                   type={"password"}
// //                   placeholder={"Confirm Password"}
// //                   name={"confirmPassword"}
// //                   value={formData.confirmPassword}
// //                   setForm={setFormData}
// //                   schema={passwordSchema.confirmPassword}
// //                   imp
// //                   icon={<MdOutlineKey />}
// //                 />
// //                 <div className="employee-button">
// //                   <button
// //                     className="employee-form-button"
// //                     disabled={
// //                       !isValid.newPassword ||
// //                       !isValid.confirmPassword ||
// //                       loading
// //                     }
// //                     style={{ background: applicationColor.buttonColor }}
// //                   >
// //                     {loading && loadingTerm === "password" ? <Loader /> : "Set Password"}
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //           </form>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // export default NewForgotPassword;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Joi from "joi";
// import { MdEmail, MdOutlineKey } from "react-icons/md";

// import officeImg from "../../../../src/assets/Login/office.png";
// import logolg from "../../../../src/assets/Login/logo-lg.png";
// import { InputEmail, InputOtp, InputPassword } from "../../common/ALLINPUTS/AllInputs";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import Loader from "../../Loader/Loader";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useFunctionContext } from "../../Contexts/FunctionContext";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../../services/mainService";

// function NewForgotPassword() {
//   const { applicationColor } = useThemeContext();
//   const [formData, setFormData] = useState({
//     email: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [step, setStep] = useState("email"); // Step can be "email", "otp", or "password"
//   const [isValid, setIsValid] = useState({
//     email: false,
//     otp: false,
//     newPassword: false,
//     confirmPassword: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [loadingTerm, setLoadingTerm] = useState("");

//   const navigate = useNavigate();
//   const { setLoading: setLoadingContext } = useStateContext();
//   const { checkErrors } = useFunctionContext();

//   const emailSchema = {
//     email: Joi.string()
//       .min(10)
//       .max(25)
//       .email({ tlds: { allow: ["com", "net", "org"] } })
//       .required()
//       .label("Email"),
//   };

//   const otpSchema = {
//     otp: Joi.string().length(6).required().label("OTP"), // Assuming OTP is 6 digits
//   };

//   const passwordSchema ={
//     newPassword: Joi.string()
//       .min(8)
//       .max(20)
//       .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
//       .required()
//       .label("New Password")
//       .messages({
//         "string.min": "Password must be at least 8 characters long",
//         "string.pattern.base": "Password must contain at least one capital letter and one special character",
//       }),
//     confirmPassword: Joi.string()
//       .valid(Joi.ref('newPassword'))
//       .required()
//       .label("Confirm Password")
//       .messages({ "any.only": "Confirm Password must match New Password" }),
//   };

//   const validateField = (name, value) => {
//     let schema;
//     if (step === "email") schema = emailSchema;
//     else if (step === "otp") schema = otpSchema;
//     else schema = passwordSchema;

//     const { error } = schema.validate({ [name]: value });
//     setIsValid(prevState => ({
//       ...prevState,
//       [name]: !error
//     }));
//   };

//   useEffect(() => {
//     if (step === "email") {
//       validateField("email", formData.email);
//     } else if (step === "otp") {
//       validateField("otp", formData.otp);
//     } else if (step === "password") {
//       validateField("newPassword", formData.newPassword);
//       validateField("confirmPassword", formData.confirmPassword);
//     }
//   }, [formData, step]);

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingTerm("email");
//     setLoading(true);
//     try {
//       await checkErrors(emailSchema, { email: formData.email });
//       const response = await backEndCallObjNothing({ email: formData.email }, "user/forgot_password");
//       toastOptions.success(response.detail || "OTP sent successfully");
//       setStep("otp");
//     } catch (error) {
//       toastOptions.error(error.message || "Error sending OTP");
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingTerm("otp");
//     setLoading(true);
//     try {
//       await checkErrors(otpSchema, { otp: formData.otp });
//       setStep("password");
//     } catch (error) {
//       toastOptions.error(error.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingTerm("password");
//     setLoading(true);
//     try {
//       await checkErrors(passwordSchema, {
//         newPassword: formData.newPassword,
//         confirmPassword: formData.confirmPassword,
//       });
//       const response = await backEndCallObjNothing(
//         {
//           email: formData.email,
//           otp: formData.otp,
//           newPassword: formData.newPassword,
//         },
//         "resetPassword"
//       );
//       toastOptions.success(response.detail || "Password set successfully");
//       navigate("/login");
//     } catch (error) {
//       toastOptions.error(error.message || "Error resetting password");
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };

//   const getButtonText = () => {
//     if (step === "email") return "Request OTP";
//     if (step === "otp") return "Verify OTP";
//     return "Set Password";
//   };

//   return (
//     <div className="sign-wrapper">
//       <section className="NewLogin-section">
//         <div className="login-left-wrapper p-4">
//           <img src={officeImg} alt="office-img" />
//         </div>
//         <div className="line-wrapper">
//           <hr className="vertical-line" />
//         </div>
//         <div className="login-right-wrapper">
//           <div className="logo-wrapper">
//             <img src={logolg} alt="company-logo" width="100" />
//           </div>

//           <form
//             className="employee-login-form mt-3"
//             onSubmit={
//               step === "email"
//                 ? handleEmailSubmit
//                 : step === "otp"
//                 ? handleOtpSubmit
//                 : handlePasswordSubmit
//             }
//           >
//             <div className="greetings mb-1">
//               <h2 className="welcome mb-2">
//                 {step === "email" && "Request Password Reset"}
//                 {step === "otp" && "Enter OTP"}
//                 {step === "password" && "Set New Password"}
//               </h2>
//             </div>

//             {step === "email" && (
//               <>
//                 <InputEmail
//                   type={"email"}
//                   placeholder={"Email Address"}
//                   name={"email"}
//                   value={formData.email}
//                   setForm={setFormData}
//                   schema={emailSchema.email}
//                   imp
//                   icon={<MdEmail />}
//                 />
//                 <div className="employee-button">
//                   <button
//                     className="employee-form-button"
//                     disabled={!isValid.email || loading}
//                     style={{ background: applicationColor.buttonColor }}
//                   >
//                     {loading && loadingTerm === "email" ? <Loader /> : "Request OTP"}
//                   </button>
//                 </div>
//               </>
//             )}

//             {step === "otp" && (
//               <>
//                 <InputOtp
//                   type={"text"}
//                   placeholder={"Enter OTP"}
//                   name={"otp"}
//                   value={formData.otp}
//                   setForm={setFormData}
//                   schema={otpSchema.otp}
//                   imp
//                 />
//                 <div className="employee-button">
//                   <button
//                     className="employee-form-button"
//                     disabled={!isValid.otp || loading}
//                     style={{ background: applicationColor.buttonColor }}
//                   >
//                     {loading && loadingTerm === "otp" ? <Loader /> : "Verify OTP"}
//                   </button>
//                 </div>
//               </>
//             )}

//             {step === "password" && (
//               <>
//                 <InputPassword
//                   type={"password"}
//                   placeholder={"New Password"}
//                   name={"newPassword"}
//                   value={formData.newPassword}
//                   setForm={setFormData}
//                   schema={passwordSchema.newPassword}
//                   imp
//                   icon={<MdOutlineKey />}
//                 />
//                 <InputPassword
//                   type={"password"}
//                   placeholder={"Confirm Password"}
//                   name={"confirmPassword"}
//                   value={formData.confirmPassword}
//                   setForm={setFormData}
//                   schema={passwordSchema.confirmPassword}
//                   imp
//                   icon={<MdOutlineKey />}
//                 />
//                 <div className="employee-button">
//                   <button
//                     className="employee-form-button"
//                     disabled={
//                       !isValid.newPassword ||
//                       !isValid.confirmPassword ||
//                       loading
//                     }
//                     style={{ background: applicationColor.buttonColor }}
//                   >
//                     {loading && loadingTerm === "password" ? <Loader /> : "Set Password"}
//                   </button>
//                 </div>
//               </>
//             )}
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default NewForgotPassword;



import React, { useState } from 'react';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdOutlineKey } from 'react-icons/md';
import officeImg from '../../../../src/assets/Login/office.png';
import logolg from '../../../../src/assets/Login/logo-lg.png';
import { InputEmail, InputOtp, InputPassword } from '../../common/ALLINPUTS/AllInputs';
import Loader from '../../Loader/Loader';
import { backEndCallObjNothing } from '../../../services/mainService';
import { toastOptions } from '../../../Utils/FakeRoutes';
import { useThemeContext } from '../../Contexts/ThemesContext';
import { useFunctionContext } from '../../Contexts/FunctionContext';

function NewForgotPassword() {
  const { applicationColor } = useThemeContext();
  const [formData, setFormData] = useState({ email: '', otp: '', new_password: '' });
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);
  const [loadingTerm, setLoadingTerm] = useState('');
  const { checkErrors } = useFunctionContext();
  const navigate = useNavigate();

  // Define validation schemas
  const forgotPasswordSchema ={
    email: Joi.string()
      .max(55)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .label('Email')
  };

  const resetPasswordSchema = {
    email: Joi.string()
      .max(55)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .label('Email'),

    otp: Joi.string()
      .length(6)
      .required()
      .label('OTP'),

    new_password: Joi.string()
      .min(8)
      .max(10)
      .pattern(new RegExp("^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
      .required()
      .label('New Password'),

    last_ip: Joi.string().required().label('Last IP'),
    fcm_token: Joi.string().required().label('FCM Token'),
    device_id: Joi.string().required().label('Device ID')
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingTerm(step);
    setLoading(true);
console.log("hiiii")
    try {
      // Validate form data based on the step
      if (step === 'email') {
        // await forgotPasswordSchema.validateAsync({ email: formData.email }, { abortEarly: false });
console.log("helooo")

        // await checkErrors(forgotPasswordSchema, formData);

       const response= await backEndCallObjNothing('/emp/forgot_password', {email: formData.email});

       console.log(response)
        toastOptions.success('OTP sent to your email');
        setStep('otp');
      } else if (step === 'otp') {
        await resetPasswordSchema.validateAsync(formData, { abortEarly: false });
        await backEndCallObjNothing(formData, 'reset_forgot_password');
        toastOptions.success('Password reset successfully');
        navigate('/login');
      }
    } catch (error) {
      toastOptions.error(error.message || 'Error processing request');
    } finally {
      setLoading(false);
      setLoadingTerm('');
    }
  };

  return (
    <div className="sign-wrapper">
      <section className="NewLogin-section">
        <div className="login-left-wrapper p-4">
          <img src={officeImg} alt="office-img" />
        </div>
        <div className="line-wrapper">
          <hr className="vertical-line" />
        </div>
        <div className="login-right-wrapper">
          <div className="logo-wrapper">
            <img src={logolg} alt="company-logo" width="100" />
          </div>
          <form className="employee-login-form mt-3" onSubmit={handleSubmit}>
            {step === 'email' && (
              <>
                <InputEmail
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  setForm={setFormData}
                  required
                  icon={<MdEmail />}
                />
                <button
                  type="submit"
                  style={{ background: applicationColor.buttonColor }}
                >
                  {loading && loadingTerm === 'email' ? <Loader /> : 'Request OTP'}
                </button>
              </>
            )}

            {step === 'otp' && (
              <>
                <InputOtp
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  setForm={setFormData}
                  value={formData.otp}
                  required
                />
                <InputPassword
                  type="password"
                  placeholder="New Password"
                  name="new_password"
                  setForm={setFormData}
                  value={formData.new_password}
                  required
                  icon={<MdOutlineKey />}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: applicationColor.buttonColor }}
                >
                  {loading && loadingTerm === 'otp' ? <Loader /> : 'Verify OTP and Set Password'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewForgotPassword;


// import React, { useState } from 'react';
// import Joi from 'joi';
// import { useNavigate } from 'react-router-dom';
// import { MdEmail, MdOutlineKey } from 'react-icons/md';
// import officeImg from '../../../../src/assets/Login/office.png';
// import logolg from '../../../../src/assets/Login/logo-lg.png';
// import { InputEmail, InputOtp, InputPassword } from '../../common/ALLINPUTS/AllInputs';
// import Loader from '../../Loader/Loader';
// import { backEndCallObjNothing } from '../../../services/mainService';
// import { toastOptions } from '../../../Utils/FakeRoutes';
// import { useThemeContext } from '../../Contexts/ThemesContext';

// function NewForgotPassword() {
//   const { applicationColor } = useThemeContext();
//   const [formData, setFormData] = useState({
//     email: '',
//     otp: '',
//     new_password: '',
//     last_ip: 'user_ip_address_here',  // Replace with actual IP
//     fcm_token: 'fcm_token_here',      // Replace with actual FCM token
//     device_id: 'device_id_here'       // Replace with actual device ID
//   });
//   const [step, setStep] = useState('email');
//   const [isValid, setIsValid] = useState({ email: false, otp: false, new_password: false });
//   const [loading, setLoading] = useState(false);
//   const [loadingTerm, setLoadingTerm] = useState('');

//   const navigate = useNavigate();

//   // Define the validation schema
//   const schema = {
//     email: Joi.string()
//       .email({ tlds: { allow: ["com", "net", "org"] } })
//       .max(55)
//       .required()
//       .label('Email'),

//     otp: Joi.string()
//       .length(6)
//       .required()
//       .label('OTP'),

//     new_password: Joi.string()
//       .min(8)
//       .max(10)
//       .pattern(new RegExp("^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
//       .required()
//       .label('New Password'),

//     last_ip: Joi.string().required().label('Last IP'),
//     fcm_token: Joi.string().required().label('FCM Token'),
//     device_id: Joi.string().required().label('Device ID'),
//   };

//   // Validate fields
//   const validateField = (name, value) => {
//     const { error } = schema.validate({ [name]: value }, { abortEarly: false });
//     setIsValid(prevState => ({
//       ...prevState,
//       [name]: !error
//     }));
//   };

//   // Handle form submit for requesting OTP
//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingTerm('email');
//     setLoading(true);

//     try {
//       // Validate the email
//       await schema.extract('email').validateAsync(formData, { abortEarly: false });

//       // API call to request OTP
//       const response = await backEndCallObjNothing({ email: formData.email }, 'user/forgot_password');
//       toastOptions.success(response.detail || 'OTP sent to your email');
//       setStep('otp');
//     } catch (error) {
//       toastOptions.error(error.message || 'Error requesting OTP');
//     } finally {
//       setLoading(false);
//       setLoadingTerm('');
//     }
//   };

//   // Handle form submit for verifying OTP and setting new password
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingTerm('password');
//     setLoading(true);

//     try {
//       // Validate the entire form data
//       await schema.validateAsync(formData, { abortEarly: false });

//       // API call to reset the password
//       const response = await backEndCallObjNothing(formData, 'user/reset_forgot_password');
//       toastOptions.success(response.detail || 'Password reset successfully');
//       navigate('/login');
//     } catch (error) {
//       toastOptions.error(error.message || 'Error resetting password');
//     } finally {
//       setLoading(false);
//       setLoadingTerm('');
//     }
//   };

//   return (
//     <div className="sign-wrapper">
//       <section className="NewLogin-section">
//         <div className="login-left-wrapper p-4">
//           <img src={officeImg} alt="office-img" />
//         </div>
//         <div className="line-wrapper">
//           <hr className="vertical-line" />
//         </div>
//         <div className="login-right-wrapper">
//           <div className="logo-wrapper">
//             <img src={logolg} alt="company-logo" width="100" />
//           </div>

//           <form className="employee-login-form mt-3" onSubmit={step === 'email' ? handleEmailSubmit : handlePasswordSubmit}>
//             <div className="greetings mb-1">
//               <h2 className="welcome mb-2">
//                 {step === 'email' && 'Request Password Reset'}
//                 {step === 'otp' && 'Enter OTP'}
//                 {step === 'password' && 'Set New Password'}
//               </h2>
//             </div>

//             {step === 'email' && (
//               <>
//                 <InputEmail
//                   type="email"
//                   placeholder="Email Address"
//                   name="email"
//                   value={formData.email}
//                   setForm={setFormData}
//                   onChange={(e) => validateField(e.target.name, e.target.value)}
//                   required
//                   icon={<MdEmail />}
//                 />
//                 <button
//                   type="submit"
//                   disabled={ loading}
//                   style={{ background: applicationColor.buttonColor }}
//                 >
//                   {loading && loadingTerm === 'email' ? <Loader /> : 'Request OTP'}
//                 </button>
//               </>
//             )}

//             {step === 'otp' && (
//               <>
//                 <InputOtp
//                   type="text"
//                   placeholder="Enter OTP"
//                   name="otp"
//                   setForm={setFormData}
//                   value={formData.otp}
//                   onChange={(e) => validateField(e.target.name, e.target.value)}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   disabled={!isValid.otp || loading}
//                   style={{ background: applicationColor.buttonColor }}
//                 >
//                   {loading && loadingTerm === 'otp' ? <Loader /> : 'Verify OTP'}
//                 </button>
//               </>
//             )}

//             {step === 'password' && (
//               <>
//                 <InputPassword
//                   type="password"
//                   placeholder="New Password"
//                   name="new_password"
//                   setForm={setFormData}
//                   value={formData.new_password}
//                   onChange={(e) => validateField(e.target.name, e.target.value)}
//                   required
//                   icon={<MdOutlineKey />}
//                 />
//                 <button
//                   type="submit"
//                   disabled={!isValid.new_password || loading}
//                   style={{ background: applicationColor.buttonColor }}
//                 >
//                   {loading && loadingTerm === 'password' ? <Loader /> : 'Set Password'}
//                 </button>
//               </>
//             )}
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default NewForgotPassword;
