// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { MdOutlineKey, MdEmail } from "react-icons/md";
// // import cglogo from "../../../cg_logo_mini.png";
// // import logolg from "../../../../src/assets/Login/logo-lg.png";
// // import { InputEmail, InputPassword } from "../../common/ALLINPUTS/AllInputs";
// // import Loader from "../../Loader/Loader";
// // import { useStateContext } from "../../Contexts/StateContext";
// // import { useFunctionContext } from "../../Contexts/FunctionContext";
// // import Joi from "joi";
// // import { toastOptions } from "../../../Utils/FakeRoutes";
// // import { useThemeContext } from "../../Contexts/ThemesContext";
// // import { publicIpv4 } from "public-ip";
// // import { fullBrowserVersion } from "react-device-detect";
// // import {
// //   loginCall,
// //   backEndCallObjNothing,
// // } from "../../../services/mainService";

// // const EmployeeLoginForm = ({ nextSlide, prevSlide, setOtpType }) => {
// //   const [timeLeft, setTimeLeft] = useState(10);
// //   const [formData, setFormData] = useState({ email: "", password: "" });
// //   const { loadingTerm, setLoadingTerm, employeeDetails, loading, setLoading } =
// //     useStateContext();
// //   const { applicationColor } = useThemeContext();
// //   const [response, setResponse] = useState({ type: "" });
// //   const [otp, setOtp] = useState("");
// //   const [loader, setLoader] = useState(false);
// //   const [isValid, setIsValid] = useState({ email: false, password: false });
// //   const [resendDisabled, setResendDisabled] = useState(false);

// //   const employeeLoginSchema = {
// //     email: Joi.string()
// //       .min(10)
// //       .max(25)
// //       .email({ tlds: { allow: ["com", "net", "org"] } })
// //       .required()
// //       .label("Email"),
// //     password: Joi.string()
// //       .min(8)
// //       .max(20)
// //       .required()
// //       .pattern(
// //         /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=])/
// //       )
// //       .messages({
// //         "string.pattern.base":
// //           '"Password" Should Contain At Least 1 Capital Letter, 1 Small Letter, 1 Number And 1 Special Character',
// //         "any.required": '"Password" is required',
// //       })
// //       .label("Password"),
// //     last_ip: Joi.string(),
// //     device_id: Joi.string(),
// //     fcm_token: Joi.string(),
// //   };

// //   const { checkErrors } = useFunctionContext();
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoader(true);
// //     try {
// //       const obj = {
// //         otp,
// //         email: formData.email,
// //         code2fa: "",
// //         last_ip: await publicIpv4(),
// //       };

// //       const response = await loginCall("/user/login_verify", obj);
// //       console.log(response.success, "response");
// //       toastOptions.success("Success");
// //       setLoader(false);
// //       window.location = "/dashboard";
// //     } catch (e) {
// //       setLoader(false);
// //       toastOptions.error(e?.response?.data || "Something went wrong");
// //     }
// //   };

// //   const EmployeeLoginSubmit = async (e) => {
// //     try {
// //       e.preventDefault();
// //       setLoadingTerm("login");
// //       setLoading(true);
// //       await checkErrors(employeeLoginSchema, formData);

// //       formData.last_ip = await publicIpv4();
// //       formData.device_id = fullBrowserVersion;
// //       formData.fcm_token = "staging";

// //       const response = await backEndCallObjNothing(
// //         "/user/login",
// //         formData,
// //         "loginEmployee"
// //       );
// //       console.log(response, "loginresponse");
// //       setResponse(response);
// //       setOtpType(response.type);
// //       toastOptions.success(response?.success || "");
// //     } catch (error) {
// //       setLoading(false);
// //       toastOptions.error(error?.response?.data || "Something went wrong");
// //       setLoadingTerm("");
// //     } finally {
// //       setLoading(false);
// //       setLoadingTerm("");
// //     }
// //   };

// //   const validateField = (name, value) => {
// //     const schema = Joi.object(employeeLoginSchema);
// //     const { error } = schema.extract(name).validate(value);
// //     return !error;
// //   };

// //   useEffect(() => {
// //     const emailValid = validateField("email", formData.email);
// //     const passwordValid = validateField("password", formData.password);
// //     setTimeout(() => {
// //       setIsValid({ email: emailValid, password: passwordValid });
// //     }, 0);
// //   }, [formData]);

// //   useEffect(() => {
// //     if (timeLeft === 0) return;

// //     const timerId = setInterval(() => {
// //       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
// //     }, 1000);

// //     return () => clearInterval(timerId);
// //   }, [timeLeft]);

// //   const formatTime = (seconds) => {
// //     const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
// //     const remainingSeconds = String(seconds % 60).padStart(2, "0");
// //     return `${minutes}:${remainingSeconds}`;
// //   };

// //   const employeeLogin = () => {
// //     localStorage.removeItem("zohoEmployeeToken");
// //     navigate("/loginForm");
// //   };

// //   const handleResendOtp = async () => {
// //     try {
// //       setResendDisabled(true);
// //       setTimeLeft(60);
// //       const response = await backEndCallObjNothing("/user/resend_otp", {
// //         email: formData.email,
// //       });
// //       toastOptions.success(response?.success || "OTP Resent");
// //       setTimeout(() => setResendDisabled(false), 60000);
// //     } catch (error) {
// //       toastOptions.error(error?.response?.data || "Something went wrong");
// //       setResendDisabled(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <form className="employee-login-form" onSubmit={EmployeeLoginSubmit}>
// //         {response?.type === "OTP" ? (
// //           <>
// //             <div className="greetings mb-3">
// //               <h1 className="welcome mb-1">OTP Verification</h1>
// //               <h4 className="details mb-2 fw-semibold">
// //                 Please enter OTP sent to your registered email
// //               </h4>
// //               <p className="text-primary mb-4">{formData.email}</p>
// //               <div className="main-input">
// //                 <div className="icon-prefix">
// //                   <label htmlFor="otp">OTP</label>
// //                 </div>
// //                 <div className="input">
// //                   <input
// //                     className="form-control"
// //                     type="tel"
// //                     maxLength={6}
// //                     placeholder="Enter your OTP"
// //                     value={otp}
// //                     onChange={(e) => setOtp(e.target.value)}
// //                   />
// //                 </div>

// //                 {timeLeft > 0 ? (
// //                   <p className="my-4">
// //                     OTP Expires in:{" "}
// //                     <span id="timer">{formatTime(timeLeft)}</span>
// //                   </p>
// //                 ) : (
// //                   <div>
// //                     <p className="mb-0 mt-4">Didn't receive OTP code?</p>

// //                     <button
// //                       className="btn text-primary p-0 lh-0"
// //                       type="button"
// //                       onClick={handleResendOtp}
// //                       disabled={resendDisabled}
// //                     >
// //                       Resend Code
// //                     </button>
// //                   </div>
// //                 )}
// //                 <div className="employee-button">
// //                   <button
// //                     onClick={(e) => handleLogin(e)}
// //                     type="submit"
// //                     className="employee-form-button"
// //                   >
// //                     Verify & Proceed
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         ) : (
// //           <>
// //             <div className="greetings mb-1">
// //               <div className="logo-wrapper mb-4 text-right">
// //                 <img src={logolg} alt="company-logo" width="100" />
// //               </div>
// //               <h2 className="welcome mb-2">Welcome to Admin Login</h2>
// //               <h4 className="details mb-2">
// //                 Please enter your account details
// //               </h4>
// //             </div>
// //             <InputEmail
// //               type={"email"}
// //               placeholder={"Email Address"}
// //               name={"email"}
// //               value={formData["email"]}
// //               setForm={setFormData}
// //               schema={employeeLoginSchema.email}
// //               imp
// //               icon={<MdEmail />}
// //             />
// //             <InputPassword
// //               type={"password"}
// //               placeholder={"Password"}
// //               name={"password"}
// //               value={formData["password"]}
// //               setForm={setFormData}
// //               id={"password"}
// //               schema={employeeLoginSchema.password}
// //               imp
// //               icon={<MdOutlineKey />}
// //             />
// //             <div className="setPassword-wrapper">
// //               <span>Don't have password?</span>
// //               <h5
// //                 className="forgot-password fw-semibold"
// //                 onClick={() => navigate("/resetpassword")}
// //               >
// //                 Set Password
// //               </h5>
// //             </div>
// //             <button
// //               className="employee-form-button"
// //               type="submit"
// //               disabled={!(isValid.email && isValid.password)}
// //             >
// //               {loading && loadingTerm === "login" ? <Loader /> : "Login"}
// //             </button>
// //           </>
// //         )}
// //       </form>
// //     </>
// //   );
// // };

// // export default EmployeeLoginForm;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineKey } from "react-icons/md";
// import { MdEmail } from "react-icons/md";
// import cglogo from "../../../cg_logo_mini.png";
// import logolg from "../../../../src/assets/Login/logo-lg.png";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
// import {
//   InputEmail,
//   InputPassword,
//   Input_email,
//   Input_password,
//   Input_text,
// } from "../../common/ALLINPUTS/AllInputs";
// import Loader from "../../Loader/Loader";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useFunctionContext } from "../../Contexts/FunctionContext";
// import {
//   makeNetworkCall,
//   makeNetworkCall1,
//   settingTokens,
// } from "../../../HttpServices/HttpService";
// import Joi from "joi";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { publicIpv4 } from "public-ip";
// import { fullBrowserVersion } from "react-device-detect";

// import {
 
//   backEndCallObjNothing,
//   loginCall,
  
// } from "../../../services/mainService";
// import { FaBullseye } from "react-icons/fa";
// const EmployeeLoginForm = ({ nextSlide, prevSlide, setOtpType }) => {
//   const [timeLeft, setTimeLeft] = useState(120);

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const { loadingTerm, setLoadingTerm, employeeDetails, loading, setLoading } =
//     useStateContext();
//   const { applicationColor } = useThemeContext();
//   const [response, setResponse] = useState({ type: "" });
//   const [otp, setOtp] = useState("");
//   const [loader, setLoader] = useState(false);
//   const [isValid, setIsValid] = useState({ email: false, password: false });
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [browserId, setBrowserId] = useState("");
//   const employeeLoginSchema = {
//     email: Joi.string()
//       .min(10)
//       .max(25)
//       .email({ tlds: { allow: ["com", "net", "org"] } })
//       .required()
//       .label("Email"),
//     password: Joi.string()
//       .min(8)
//       .max(20)
//       .required()
//       .pattern(
//         /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=])/
//       )
//       .messages({
//         "string.pattern.base":
//           '"Password" Should Contain At Least 1 Capital Letter, 1 Small Letter, 1 Number And 1 Special Character',
//         "any.required": '"Password" is required',
//       })
//       .label("Password"),
//     last_ip: Joi.string().required(),
//     device_id: Joi.string().required(),
//     fcm_token: Joi.string().required(),
//     browserid: Joi.string().required(),
//   };
//   const { checkErrors } = useFunctionContext();
//   // navigation hook
//   const navigate = useNavigate();



//   const EmployeeLoginSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       setLoadingTerm("login");
//       setLoading(true);
//       formData.last_ip = await publicIpv4();
//       formData.device_id = fullBrowserVersion;
//       formData.browserid = browserId;
//       formData.fcm_token = "staging";
//       await checkErrors(employeeLoginSchema, formData);
     
     
//       const response = await backEndCallObjNothing(
//         "/emp/login",
//         formData,
        
//       );
//       console.log(response, "loginresponse");
//       setResponse(response);
//       setOtpType(response.type);
//       setTimeLeft(120);
//       // settingTokens.settingEmployeeToken(response.detail);
//       // setLoadingTerm('');
//       // if (
//       //   Object.keys(employeeDetails).length > 0 ||
//       //   localStorage.getItem('zohoEmployeeToken')
//       // ) {
//       //   setTimeout(() => {
//       //     window.location.href = '/';
//       //   }, 0);
//       // }
//       // toastOptions.success(response?.success || "");
//     } catch (error) {
//       setLoading(false);
//       toastOptions.error(error?.response?.data || "SomeThing Got Wrong");
//       setLoadingTerm("");
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };



//   const handleLogin = async (e) => {
//     if (!otp) {
//       toastOptions.error("OTP is required");
//       return;
//     }

//     e.preventDefault();
//     // setLoader(true);
//     try {
//       // setResendDisabled(false)
//       // setLoading(true);
//       const obj = {
//         otp,
//         email: formData.email,
//         code2fa: "",
//         last_ip: await publicIpv4(),
//         device_id: fullBrowserVersion,
//         browserid: browserId,
//       };
//       const response = await loginCall("/emp/login_verify", obj);
//       console.log(response.success, "response");
//       // toastOptions.success(response?.success||"");
//       // toastOptions.success("Success");
//       // setLoader(false);
//       // window.location = "/dashboard";
//       window.location = "/dashboard";
//     } catch (error) {
//       // setLoader(false);
//       // setResendDisabled(false)
//       toastOptions.error(error?.response?.data || "SomeThing Got Wrong");
//     }
//   };
//   useEffect(() => {
//     const getBrowserId = async () => {
//       const fp = await FingerprintJS.load();
//       const result = await fp.get();
//       setBrowserId(result.visitorId.toString());
//     };
//     getBrowserId();
//   }, []);
 
  
//   const handleResendOtp = async () => {
//     try {
     
//       setResendDisabled(true);
//       setOtp("");
//       const response = await backEndCallObjNothing("/emp/resend_otp", {
//         email: formData.email,
//       });
//       toastOptions.success(response?.success || "OTP Resent");
//       setTimeLeft(120); // Resetting the countdown timer
//       setTimeout(() => setResendDisabled(false), 60000);
//     } catch (error) {
//       toastOptions.error(error?.response?.data || "Something went wrong");
//       setResendDisabled(false);
//     }
//   };

//   const formatTime = (seconds) => {
//     const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
//     const remainingSeconds = String(seconds % 60).padStart(2, "0");
//     return `${minutes}:${remainingSeconds}`;
//   };
//   const validateField = (name, value) => {
//     const schema = Joi.object(employeeLoginSchema);
//     const { error } = schema.extract(name).validate(value);
//     return !error;
//   };
  
//   useEffect(() => {
//     if (timeLeft === 0) return;
//     const timerId = setInterval(() => {
//       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
//     }, 1000);
//     return () => clearInterval(timerId);
//   }, [timeLeft]);
  
//   const employeeLogin = () => {
//     localStorage.removeItem("zohoEmployeeToken");
//     navigate("/loginForm");
//     // window.location.reload("/loginForm");
//   };
//   return (
//     <>
//       {/* <h1>Admin  login Form</h1> */}
//       <form className="employee-login-form" >
//         {/* <div className="comapany-logo">
//           <img src={cglogo} alt="logo" />
//         </div> */}
//         {response?.success === "OTP Sent Successfully" ? (
//           <>
//             <div className="greetings mb-3">
//               <h1 className="welcome mb-1">OTP Verification</h1>
//               <h4 className="details mb-2 fw-semibold">
//                 Please enter OTP Send to Your Registered Email
//               </h4>
//               <p className="text-primary mb-4">{formData.email}</p>
//               <div className="main-input">
//                 <div className="icon-prefix">
//                   <label htmlFor="otp">OTP</label>
//                 </div>
//                 <div className="input mb-3">
//                   <input
//                     className="form-control"
//                     type="tel"
//                     maxLength={6}
//                     placeholder="Enter your otp"
//                     value={otp}
//                     onChange={(e) => {
//                       const newValue = e.target.value;
//                       if (/^\d*$/.test(newValue)) {
//                         setOtp(newValue);
//                       }
//                     }}
//                   />
//                 </div>

//                 {timeLeft ? (
//                   <div className="fs-14">
//                     <div className="d-flex align-items-center">
//                       <span className="flex-shrink-0">OTP Expires in</span>
//                       <div
//                         className="circular-progress mx-2 flex-shrink-0"
//                         style={{
//                           background: `conic-gradient(rgb(75, 73, 172) ${timeLeft * (360 / 120)}deg, #d0d0d2 0deg)`,
//                         }}
//                       >
//                         <div className="inner-circle"></div>
//                         <p className="percentage mb-0 fw-semibold">{formatTime(timeLeft)}</p>
//                       </div>
//                       <span>Seconds</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <p className="mb-0 mt-4">Didn't receive OTP code?</p>
//                     <button
//                       className="btn text-primary p-0 lh-0"
//                       type="button"
//                       onClick={handleResendOtp}
//                       disabled={resendDisabled}
//                     >
//                       Resend Code
//                     </button>
//                   </div>
//                 )}

//                 <div className="employee-button">
//                   {/* <button
//                     onClick={(e) => handleLogin(e)}
//                     disabled={resendDisabled}
//                     type="submit"
//                     className="employee-form-button"
//                   >
//                     Verify & Proceed
//                   </button> */}
//                    <button
//                 className="employee-form-button "
//                 style={{
//                   background: applicationColor.buttonColor,
//                   // color: applicationColor.readColor1,
//                 }}
//                 onClick={ handleLogin}
//                 // disabled={resendDisabled}
//                 type="submit"
//               >
//                 {/* {" "}
//                 {loading ? (
//                   <Loader />
//                 ):"Verify & Proceed"} */}
//                 Verify & Proceed
//               </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="greetings mb-1">
//               <div className="logo-wrapper mb-4 text-right">
//                 <img src={logolg} alt="company-logo" width="100" />
//               </div>
//               <h2 className="welcome mb-2">Welcome to Admin Login</h2>
//               <h4 className="details mb-2">
//                 Please enter your account details
//               </h4>
//             </div>
//             <InputEmail
//               type={"email"}
//               placeholder={"Email Address"}
//               name={"email"}
//               value={formData["email"]}
//               setForm={setFormData}
//               schema={employeeLoginSchema.email}
//               imp
//               icon={<MdEmail />}
//             />
//             <InputPassword
//               type={"password"}
//               placeholder={"Password"}
//               name={"password"}
//               value={formData["password"]}
//               setForm={setFormData}
//               id={"password"}
//               schema={employeeLoginSchema.password}
//               imp
//               icon={<MdOutlineKey />}
//             />
//             <div className="setPassword-wrapper">
//               <span>Don't have password?</span>
//               <h5
//                 className="forgot-password fw-semibold"
//                 onClick={() => navigate("/resetpassword")}
//               >
//                 Set Password
//               </h5>
//             </div>
//             <div className="employee-button">
//               <button
//                 className="employee-form-button sign-in"
//                 style={{
//                   background: applicationColor.buttonColor,
//                   // color: applicationColor.readColor1,
//                 }}
//                 onClick={EmployeeLoginSubmit}
//                 // disabled={!isValid.email || !isValid.password || loading}
//               >
//                 {" "}
//                 {loading && loadingTerm === "login" ? (
//                   <Loader />
//                 ) : (
//                   "Sign in"
//                 )}{" "}
//               </button>
//             </div>
//             {/* <div className="employee-login mt-3">
//               <span>for Employee access?</span>{" "}
//               <Link className="fw-semibold" onClick={() => employeeLogin()}>
//                 Sign in
//               </Link>
//             </div> */}
//           </>
//         )}
//       </form>
//     </>
//   );
// };
// export default EmployeeLoginForm;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKey, MdEmail } from "react-icons/md";
import logolg from "../../../../src/assets/Login/logo-lg.png";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Joi from "joi";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { useStateContext } from "../../Contexts/StateContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { backEndCallObjNothing, loginCall } from "../../../services/mainService";
import { publicIpv4 } from "public-ip";
import { fullBrowserVersion } from "react-device-detect";
import { Input_password, InputEmail, InputPassword } from "../../common/ALLINPUTS/AllInputs";
import { useThemeContext } from "../../Contexts/ThemesContext";

const EmployeeLoginForm = ({ setOtpType }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loadingTerm, setLoadingTerm, setLoading } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [response, setResponse] = useState({ type: "" });
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const [resendDisabled, setResendDisabled] = useState(false);
  const[btndisabled,setBtndisabled]=useState(false)
  const [browserId, setBrowserId] = useState("");
  
  const employeeLoginSchema = {
    email: Joi.string()
      .min(10)
      .max(25)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=])/)
      .messages({
        "string.pattern.base": '"Password" Should Contain At Least 1 Capital Letter, 1 Small Letter, 1 Number And 1 Special Character',
        "any.required": '"Password" is required',
      })
      .label("Password"),
    last_ip: Joi.string().required(),
    device_id: Joi.string().required(),
    fcm_token: Joi.string().required(),
    browserid: Joi.string().required(),
  };

  const { checkErrors } = useFunctionContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getBrowserId = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setBrowserId(result.visitorId.toString());
    };
    getBrowserId();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const remainingSeconds = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const validateField = (name, value) => {
    const schema = Joi.object(employeeLoginSchema);
    const { error } = schema.extract(name).validate(value);
    return !error;
  };

  const EmployeeLoginSubmit = async (e) => {
    e.preventDefault();
    setLoadingTerm("login");
    setLoading(true);
    try {
      setBtndisabled(true)
      formData.email = formData.email.toLowerCase();
    formData.last_ip = await publicIpv4();
    formData.device_id = fullBrowserVersion;
    formData.browserid = browserId;
    formData.fcm_token = "staging";

      // formData.last_ip = await publicIpv4();
      // formData.device_id = fullBrowserVersion;
      // formData.browserid = browserId;
      // formData.fcm_token = "staging";
      await checkErrors(employeeLoginSchema, formData);
      
      const response = await backEndCallObjNothing("/emp/login", formData);
      setResponse(response);
      setOtpType(response.type);
      setTimeLeft(120);
      setBtndisabled(false)
    } catch (error) {
      setBtndisabled(false)
      toastOptions.error(error?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
      setLoadingTerm("");
      setBtndisabled(false)
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!otp) {
      toastOptions.error("OTP is required");
      return;
    }
    try {
      setBtndisabled(true)
      const obj = {
        otp,
        email: formData.email,
        code2fa: "",
        last_ip: await publicIpv4(),
        device_id: fullBrowserVersion,
        browserid: browserId,
      };
      const response = await loginCall("/emp/login_verify", obj);
      window.location = "/dashboard";
      setBtndisabled(false)
    } catch (error) {
      setBtndisabled(false)
      toastOptions.error(error?.response?.data || "Something went wrong");
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendDisabled(true);
      setOtp("");
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

  return (
    <form className="employee-login-form" onSubmit={EmployeeLoginSubmit}>
      {response?.success === "OTP Sent Successfully" ? (
        <>
          <div className="greetings mb-3">
            <h1 className="welcome mb-1">OTP Verification</h1>
            <h4 className="details mb-2 fw-semibold">
              Please enter OTP sent to your registered email
            </h4>
            <p className="text-primary mb-4">{formData.email}</p>
            <div className="main-input">
              <div className="icon-prefix">
                <label htmlFor="otp">OTP</label>
              </div>
              <div className="input mb-3">
              <input
                    className="form-control"
                    type="tel"
                    maxLength={6}
                    placeholder="Enter your otp"
                    value={otp}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (/^\d*$/.test(newValue)) {
                        setOtp(newValue);
                      }
                    }}
                  />
              </div>
              {timeLeft ? (
                  <div className="fs-14">
                    <div className="d-flex align-items-center">
                      <span className="flex-shrink-0">OTP Expires in</span>
                      <div
                        className="circular-progress mx-2 flex-shrink-0"
                        style={{
                          background: `conic-gradient(rgb(75, 73, 172) ${timeLeft * (360 / 120)}deg, #d0d0d2 0deg)`,
                        }}
                      >
                        <div className="inner-circle"></div>
                        <p className="percentage mb-0 fw-semibold">{formatTime(timeLeft)}</p>
                      </div>
                      <span>Seconds</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="mb-0 mt-4">Didn't receive OTP code?</p>
                    <button
                      className="btn text-primary p-0 lh-0"
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendDisabled}
                    >
                      Resend Code
                    </button>
                  </div>
                )}
              <div className="employee-button">
                <button
                  type="submit"
                  disabled={btndisabled}
                  className="employee-form-button"
                  onClick={handleLogin}
                >
                  Verify & Proceed
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="greetings mb-1">
            <div className="logo-wrapper mb-4 text-right">
              <img src={logolg} alt="company-logo" width="100" />
            </div>
            <h2 className="welcome mb-2">Welcome to Admin Login</h2>
            <h4 className="details mb-2">
              Please enter your account details
            </h4>
          </div>
          <InputEmail
            type={"email"}
            placeholder={"Email Address"}
            name={"email"}
            value={formData.email}
            setForm={setFormData}
            validateField={validateField}
            error={formData.email && !isValid.email}
          />
          {/* <InputPassword
            placeholder={"Password"}
            name={"password"}
            value={formData.password}
            setForm={setFormData}
            validateField={validateField}
            error={formData.password && !isValid.password}
          /> */}
           {/* <InputPassword
              type={"password"}
              placeholder={"Password"}
              name={"password"}
              value={formData["password"]}
              setForm={setFormData}
              id={"password"}
              schema={employeeLoginSchema.password}
              imp
              icon={<MdOutlineKey />}
            /> */}
              <InputPassword
              type={"password"}
              placeholder={"Password"}
              name={"password"}
              value={formData["password"]}
              setForm={setFormData}
              id={"password"}
              schema={employeeLoginSchema.password}
              imp
              icon={<MdOutlineKey />}
            />
          <div className="setPassword-wrapper">
             <span>Don't have password?</span>
              <h5
                className="forgot-password fw-semibold"
                onClick={() => navigate("/resetpassword")}
              >
                Set Password
              </h5>
            </div>
          <div className="employee-button mt-3">
            <button
              type="submit"
              disabled={btndisabled}
              className="employee-form-button"
              onClick={EmployeeLoginSubmit}
            >
              Log In
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default EmployeeLoginForm;
