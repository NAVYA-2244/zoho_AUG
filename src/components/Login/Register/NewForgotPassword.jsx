import React, { useState } from "react";
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

const NewForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [otpData, setOtpData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [btndisabled, setBtndisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const { applicationColor } = useThemeContext();
  const navigate = useNavigate();
  const { checkErrors } = useFunctionContext();
  const ResetPasswordSchema = {
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .max(50)
      .required()
      .messages({
        "string.email": "Please enter a valid email address.",
        "string.max": "Email must be less than 50 characters.",
        "any.required": "Email is required.",
      }),
  };

  const PasswordSchema = Joi.object({
    otp: Joi.string().min(6).max(6).required().messages({
      "string.min": "OTP must be 6 characters long.",
      "string.max": "OTP must be 6 characters long.",
      "any.required": "OTP is required.",
    }),
    newPassword: Joi.string()
      .min(8)
      .max(10)
      .required()
      .pattern(/(?=.*[A-Z])/, "uppercase")
      .pattern(/(?=.*[@$!%*?&])/, "special")
      .messages({
        "string.min": "New password must be at least 8 characters long.",
        "string.max": "New password must be less than 10 characters long.",
        "string.pattern.uppercase":
          "New password must contain at least one uppercase letter.",
        "string.pattern.special":
          "New password must contain at least one special character.",
        "any.required": "New password is required.",
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.only": "Confirm password doesn't match the new password.",
        "any.required": "Confirm password is required.",
      }),
  });

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
    setBtndisabled(true);

    try {
      const { error } = PasswordSchema.validate(otpData, {
        abortEarly: false,
      });

      if (error) {
        const errorMessages = error.details.reduce((acc, { path, message }) => {
          acc[path[0]] = message;
          return acc;
        }, {});

        if (!errorMessages.confirmPassword && !otpData.confirmPassword) {
          errorMessages.confirmPassword = `"ConfirmPassword" is not allowed to be empty`;
        }

        setErrors(errorMessages);
        setBtndisabled(false);
        return;
      }

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
      toastOptions.error("Something went wrong");
    } finally {
      setBtndisabled(false);
    }
  };

  const handleOtpChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue) && newValue.length <= 6) {
      setOtpData((prev) => ({
        ...prev,
        otp: newValue,
      }));
    }
    setErrors("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                    <img src={logolg} alt="company-logo" width="100" />
                  </div>
                  <h2 className="welcome mb-2">Sign in</h2>
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
                <div className="greetings mb-3">
                  <h1 className="welcome mb-1">OTP Verification</h1>
                  <h4 className="details mb-2 fw-semibold">
                    Please enter the OTP sent to your registered email
                  </h4>
                  <p className="text-primary mb-4">{formData.email}</p>
                  <div className="main-input">
                    <label htmlFor="otp">OTP</label>
                    <input
                      className="form-control"
                      type="tel"
                      id="otp"
                      name="otp"
                      maxLength={6}
                      placeholder="Enter your OTP"
                      value={otpData.otp}
                      onChange={handleOtpChange}
                    />
                    {errors.otp && <p style={errorStyle}>{errors.otp}</p>}
                  </div>
                  <div className="main-input">
                    <label htmlFor="newPassword">New Password</label>
                    <InputPassword
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                      value={otpData.newPassword}
                      setForm={setOtpData}
                      schema={PasswordSchema.newPassword}
                      imp
                      readOnly={false}
                    />
                    {errors.newPassword && (
                      <div style={errorStyle}>{errors.newPassword}</div>
                    )}
                  </div>
                  <div className="main-input">
                    <br />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <InputPassword
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={otpData.confirmPassword}
                      setForm={setOtpData}
                      schema={PasswordSchema.confirmPassword}
                      imp
                      readOnly={false}
                    />
                    {errors.confirmPassword && (
                      <div style={errorStyle}>{errors.confirmPassword}</div>
                    )}
                  </div>
                  <div className="employee-button">
                    <button
                      className="employee-form-button"
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
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewForgotPassword;