import React, { useEffect, useState } from "react";
import { MdOutlineKey, MdEmail } from "react-icons/md";
import { InputEmail } from "../../common/ALLINPUTS/AllInputs";
import Loader from "../../Loader/Loader";
import { useStateContext } from "../../Contexts/StateContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import Joi from "joi";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { publicIpv4 } from "public-ip";
import { fullBrowserVersion } from "react-device-detect";
import {
  backEndCallObjNothing,
  loginCall,
} from "../../../services/mainService";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import officeImg from "../../../../src/assets/Login/office.png";
import otpImage from "../../../assets/images/otp-image1.png";
import logolg from "../../../../src/assets/Login/logo-lg.png";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";
import { FaApple, FaLinkedin, FaMicrosoft } from "react-icons/fa";

const LoginForm = () => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [formData, setFormData] = useState({ email: "" });
  const { loadingTerm, setLoadingTerm, loading, setLoading } =
    useStateContext();
  const { applicationColor } = useThemeContext();
  const [response, setResponse] = useState({ type: "" });
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  // const [isValid, setIsValid] = useState({ email: false });
  const [btndisabled, setBtndisabled] = useState(false);
  const { checkErrors } = useFunctionContext();
  const [browserId, setBrowserId] = useState("");
  const [isValid, setIsValid] = useState({ email: false, otp: false });
  const LoginSchema = {
    // email: Joi.string()
    //   .min(10)
    //   .max(25)
    //   .email({ tlds: { allow: ["com", "net", "org"] } })
    //   .required()
    //   .messages({
    //     "string.pattern.base": '"Email" should not include special characters',
    //     "any.required": '"Email" is required',
    //   })
    //   .label("Email"),
    email: Joi.string()
      // .min(10)
      .max(25)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .label("Email"),

    last_ip: Joi.string().ip().required(),
    device_id: Joi.string().required(),
    fcm_token: Joi.string().required(),
    browserid: Joi.string().required(),
  };

  const navigate = useNavigate();

  const ResendOTPSchema = {
    email: Joi.string()
      .pattern(/^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,}$/)
      .trim()
      .min(10)
      .max(55)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .label("Email"),
  };

  useEffect(() => {
    const getBrowserId = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setBrowserId(result.visitorId.toString());
    };
    getBrowserId();
  }, []);

  // useEffect(() => {
  //     const emailValid = validateField("email", formData.email);
  //     setIsValid({ email: emailValid });
  // }, [formData]);
  useEffect(() => {
    const emailValid = validateField("email", formData.email);
    setIsValid((prev) => ({ ...prev, email: emailValid }));
  }, [formData]);

  useEffect(() => {
    const otpValid = validateField("otp", otp); // Validate OTP field
    setIsValid((prev) => ({ ...prev, otp: otpValid }));
  }, [otp]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!otp) {
      toastOptions.error("OTP is required"); // Display an error if OTP is empty
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
      console.log(response.success, "response");
      window.location = "/dashboard"; // Redirect on success
      setBtndisabled(false)
    } catch (error) {
      toastOptions.error(error?.response?.data || "Something went wrong");
      setBtndisabled(false)
    } finally {
     
    }
  };
  // const handleLogin = async (e) => {
  //   if (!otp) {
  //     toastOptions.error("OTP is required");
  //     return;
  //   }
  //   e.preventDefault();
  //   setLoader(true);
   
  //   try {
  //     setBtndisabled(true);
  //     const obj = {
  //       otp,
  //       email: formData.email,
  //       code2fa: "",
  //       last_ip: await publicIpv4(),
  //       device_id: fullBrowserVersion,
  //       browserid: browserId,
  //     };
  //     const response = await loginCall("/emp/login_verify", obj);
  //     console.log(response, "login");
  //     toastOptions.success("Success");
  //     setLoader(false);
  //     window.localStorage.getItem("zohoEmployeeToken")
  //       ? (window.location = "/dashboard")
  //       : (window.location = "/loginForm");
  //       setBtndisabled(false)
  //   } catch (e) {
  //     setLoader(false);
  //     setBtndisabled(false)
  //     toastOptions.error(e?.response?.data || "Something went wrong otp");
  //   } finally {
  //     setBtndisabled(false);
  //   }
  // };

  const handleResendOTP = async () => {
    // setLoader(true);
    try {
      const obj = {
        email: formData.email,
      };
      await checkErrors(ResendOTPSchema, obj);
      setOtp("");

      const response = await backEndCallObjNothing("/emp/resend_otp", obj);
      // toastOptions.success(response.success||"OTP Resent Successfully");
      // setLoader(false);
      // Reset timer
      setTimeLeft(120); // Reset timer to 120 seconds after successful resend
    } catch (error) {
      // setLoader(false);
      toastOptions.error(
        error?.response?.data || "Something went wrong resending OTP"
      );
    }
  };

  const EmployeeLoginSubmit = async (e) => {
    e.preventDefault();
    // setLoadingTerm("login");
    // setLoading(true);
    // setBtndisabled(true);
    try {
      formData.last_ip = await publicIpv4();
      formData.device_id = fullBrowserVersion;
      formData.browserid = browserId;
      formData.fcm_token = "staging";
      await checkErrors(LoginSchema, formData);
      const response = await backEndCallObjNothing("/emp/login", formData);
      // console.log(response.success);
      setResponse(response);
      setTimeLeft(120);
      // toastOptions.success(response?.success || "");
    } catch (error) {
      // setLoading(false);
      toastOptions.error(error?.response?.data || "Something went wrong login");
    } finally {
      // setLoading(false);
      // setLoadingTerm("");
      // setBtndisabled(false);
    }
  };

  // const validateField = (name, value) => {
  //     const schema = Joi.object(LoginSchema);
  //     const { error } = schema.extract(name).validate(value);
  //     return !error;
  // };
  const validateField = (name, value) => {
    if (name === "otp") {
      const otpSchema = Joi.string().min(6).max(6).required().label("OTP");
      const { error } = otpSchema.validate(value);
      return !error;
    } else {
      const schema = Joi.object(LoginSchema);
      const { error } = schema.extract(name).validate(value);
      return !error;
    }
  };

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

  const adminLogin = () => {
    localStorage.removeItem("zohoEmployeeToken");
    navigate("/login");
    // window.location.reload("/login");
  };

  return (
    <>
      {/* <h5>Employee Login</h5> */}
      <div className="sign-wrapper">
        <section className="NewLogin-section">
          {response.success ? (
            <div className="login-left-wrapper p-4">
              <img src={otpImage} alt="otp-img" height="100%" width="100%" />
            </div>
          ) : (
            <div className="login-left-wrapper p-4">
              <img src={officeImg} alt="office-img" width="100" />
            </div>
          )}
          <div className="line-wrapper">
            <hr className="vertical-line" />
          </div>
          <div className="login-right-wrapper">
            <form
              className="employee-login-form"
              // onSubmit={EmployeeLoginSubmit}
            >
              {response.success ? (
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
                    <div className="input">
                      <input
                        className="form-control"
                        type="tel"
                        maxLength={6}
                        placeholder="Enter your otp"
                        value={otp}
                        // onChange={(e) => setOtp(e.target.value)}
                        onChange={(e) => {
                          // Only set the OTP value if the new value contains only numbers
                          const newValue = e.target.value;
                          if (/^\d*$/.test(newValue)) {
                            setOtp(newValue);
                          }
                        }}
                      />
                    </div>
                    {timeLeft ? (
                      <div className="d-flex align-items-center gap-2">
                        <p className="my-4">OTP Expires in: </p>
                        <div className="timer-container d-flex align-items-center gap-2">
                          <span id="timer">{formatTime(timeLeft)}</span>
                          <div class="loader">
                            <span class="hour"></span>
                            <span class="min"></span>
                            <span class="circel"></span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-0 mt-4">Didn't receive OTP code?</p>
                        <button
                          className="btn text-primary p-0 lh-0"
                          onClick={handleResendOTP}
                        >
                          Resend Code
                        </button>
                      </div>
                    )}

<div className="employee-button">
  <button
    type="button" // Change to "button" to prevent form submission
    onClick={handleLogin}
    className="employee-form-button"
    disabled={btndisabled}
    style={{ background: applicationColor.tabColor }}
  >
    Verify & Proceed
  </button>
{/* </div> */}

                    </div>
                  </div>
                </div>
              ) : (
                <div className="greetings">
                  <div className="logo-wrapper mb-4">
                    <img src={logolg} alt="company-logo" width="100" />
                  </div>
                  <h2 className="welcome mb-2">Sign in</h2>
                  <h4 className="details mt-2 mb-3">
                    To Access Employee Dashboard
                  </h4>
                  <InputEmail
                    type={"email"}
                    placeholder={"Email Address"}
                    name={"email"}
                    value={formData["email"]}
                    setForm={setFormData}
                    schema={LoginSchema.email}
                    required
                    autoComplete="email"
                    maxLength={50}
                    icon={<MdEmail />}
                  />

                  <div className="social-logins my-4">
                    <h5>Sign in using</h5>
                    <div className="socialIcons-wrapper">
                      <span className="google">
                        <FcGoogle />
                      </span>
                      <span className="github">
                        <IoLogoGithub />
                      </span>
                      {/* <span className="linkedIn">
                        <FaLinkedin />
                      </span>
                      <span className="apple">
                        <FaApple />
                      </span>
                      <span className="microsoft">
                        <FaMicrosoft />
                      </span> */}
                    </div>
                  </div>

                  <div className="employee-button">
                    <button
                      className="employee-form-button sign-in"
                      disabled={btndisabled}
                      onClick={EmployeeLoginSubmit}
                      style={{
                        background: applicationColor.buttonColor,
                        // color: applicationColor.readColor1,
                      }}
                    >
                      Submit
                      {/* {loading && loadingTerm === "login" ? <Loader /> : "Sign in"} */}
                    </button>
                  </div>

                  <div className="isAdminLogin my-4">
                    <span>for Admin access?</span>{" "}
                    {/* <a className="fw-semibold" onClick={() => adminLogin()}>
                      Sign in
                    </a> */}
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* <div className="copyright">
          <p>© 2024, Codegene Pvt. Ltd. All Rights Reserved.</p>
        </div> */}
      </div>
    </>
  );
};

export default LoginForm;
