
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
      .email({ tlds: { allow: ["com", "net", "org","io"] } })
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
 
  

  const validateField = (name, value) => {
    const schema = Joi.object(employeeLoginSchema);
    const { error } = schema.extract(name).validate(value);
    return !error;
  };
  const tokenKey = "zohoEmployeeToken"; // Define your token key

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
    formData.fcm_token = "staging"; // Replace with actual FCM token if needed

    // Validate the form data
    await checkErrors(employeeLoginSchema, formData);

    // Call login API
    const response = await loginCall("/emp/login", formData);
    const token = response.token; // Assuming the token is returned in response.token

    // Store the token
    localStorage.setItem(tokenKey, token);

    // Redirect to dashboard
    window.location = "/dashboard";
  } catch (error) {
    setBtndisabled(false);
    toastOptions.error(error?.response?.data || "Something went wrong");
  } finally {
    setLoading(false);
    setLoadingTerm("");
    setBtndisabled(false);
  }
};


 
    
   
    
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
  //     window.location = "/dashboard";
  //     setBtndisabled(false);
  //   } catch (error) {
  //     setBtndisabled(false);
  //     toastOptions.error(error?.response?.data || "Something went wrong");
  //   }
  // };

 

  return (
    <form className="employee-login-form" onSubmit={EmployeeLoginSubmit}>
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
              <h5
                className="forgot-password fw-semibold"
                onClick={() => navigate("/resetpassword")}
              >
                Forgot Password
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
      {/* // )} */}
    </form>
  );
};

export default EmployeeLoginForm;
