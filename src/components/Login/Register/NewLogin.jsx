import React, { useState } from "react";
import "./NewLoginStyles.scss";
import EmployeeLoginForm from "../../Logins/EmployeeLoginPage/EmployeeLoginForm";
import officeImg from "../../../../src/assets/Login/office.png";
import logolg from "../../../../src/assets/Login/logo-lg.png";
import otpImage from "../../../assets/images/otp-image1.png";
import LoginForm from "../../Logins/EmployeeLoginPage/LoginForm";

function NewLogin() {
  const [otpType, setOtpType] = useState("");
  console.log(otpType);

  return (
    <div className="sign-wrapper">
      <section className="NewLogin-section">
        <div className="login-left-wrapper p-4">
          {otpType === "OTP" ? (
            <img src={otpImage} alt="otp-img" />
          ) : (
            <img src={officeImg} alt="office-img" />
          )}
        </div>
        <div className="line-wrapper">
          <hr className="vertical-line" />
        </div>
        <div className="login-right-wrapper">
          <EmployeeLoginForm setOtpType={setOtpType} />
          {/* <LoginForm setOtpType={setOtpType}></LoginForm> */}
        </div>
      </section>
    </div>
  );
}

export default NewLogin;
