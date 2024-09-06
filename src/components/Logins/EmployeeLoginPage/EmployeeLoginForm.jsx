
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKey, MdEmail } from "react-icons/md";
import logolg from "../../../../src/assets/Login/logo-lg.png";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Joi from "joi";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { useStateContext } from "../../Contexts/StateContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import {
  backEndCallObjNothing,
  loginCall,
} from "../../../services/mainService";
import { publicIpv4 } from "public-ip";
import { fullBrowserVersion } from "react-device-detect";
import {
  Input_password,
  InputEmail,
  InputPassword,
} from "../../common/ALLINPUTS/AllInputs";
import { useThemeContext } from "../../Contexts/ThemesContext";
import ForgotPassword from "./../ForgotPassword/ForgotPassword";

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
  const [btndisabled, setBtndisabled] = useState(false);
  const [browserId, setBrowserId] = useState("");

  const employeeLoginSchema = {
    email: Joi.string()
      .min(10)
      .max(55)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .max(15)
      .required()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=])/
      )
      .messages({
        "string.pattern.base":
          '"Password" needs 1 uppercase, and 1 special character',
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
  const formatTime = (seconds) => {
    return `${seconds}s`; // Return the time in seconds with an 's' suffix
  };
  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // const formatTime = (seconds) => {
  //   const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  //   const remainingSeconds = String(seconds % 60).padStart(2, "0");
  //   return `${minutes}:${remainingSeconds}`;
  // };

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
      setBtndisabled(true);
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
      setBtndisabled(false);
    } catch (error) {
      setBtndisabled(false);
      toastOptions.error(error?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
      setLoadingTerm("");
      setBtndisabled(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!otp) {
      toastOptions.error("OTP is required");
      return;
    }
    
    
    else if (otp.length !== 6) {
      toastOptions.error("Please enter a 6-digit OTP");
      return;
    }
    
    try {
      setBtndisabled(true);
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
      setBtndisabled(false);
    } catch (error) {
      setBtndisabled(false);
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
            <div className="logo-wrapper mb-4 text-right">
              <img src={logolg} alt="company-logo" width="100" />
            </div>
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
                    <span className="flex-shrink-0">
                      Expire otp in{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          marginLeft: "3px", // Makes the text bold
                        }}
                      >
                        {formatTime(timeLeft)}
                      </span>
                    </span>
                    <div
                      style={{
                        background: `conic-gradient(rgb(75, 73, 172) ${
                          timeLeft * (360 / 120)
                        }deg, #d0d0d2 0deg)`,
                      }}
                    >
                      {/* <div className="inner-circle "></div>
                      <span className="percentage mb-0 fs-25 mx-5">
                        {" "}
                        {formatTime(timeLeft)}{" "}
                      </span> */}
                    </div>
                    {/* <span>Seconds</span> */}
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
            <h2 className="welcome mb-2">Welcome to Login</h2>
            <h4 className="details mb-2">Please enter your account details</h4>
          </div>
          <InputEmail
            type={"email"}
            placeholder={"Email Address"}
            name={"email"}
            value={formData.email}
            setForm={setFormData}
            validateField={validateField}
            schema={employeeLoginSchema.email}
            maxLength={50}
            // error={formData.email && !isValid.email}
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
            maxLength={15} 
            schema={employeeLoginSchema.password}
            imp
            icon={<MdOutlineKey />}
          />
          <div className="setPassword-wrapper text-end">
            {/* <span>Don't have password?</span> */}
            {/* <h5
              className="forgot-password fw-semibold "
              onClick={() => navigate("/resetpassword")}
            >
              Forgot Password ?
            </h5> */}
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
