import React from "react";
import ForgotPassword from "../../Logins/ForgotPassword/ForgotPassword";
// import "./NewForgotPassword.scss";
import "./NewLoginStyles.scss";
import resetPassImg from "../../../../src/assets/Login/setpassword.png";
import officeImg from "../../../../src/assets/Login/office.png";
import logolg from "../../../../src/assets/Login/logo-lg.png";
import logosm from "../../../../src/assets/Login/logo-sm.png";

function NewForgotPassword() {
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
          <ForgotPassword />
        </div>
      </section>
    </div>
  );
}

export default NewForgotPassword;
