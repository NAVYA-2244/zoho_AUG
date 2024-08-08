import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";



import { MdEmail, MdOutlineKey } from "react-icons/md";

import officeImg from "../../../../src/assets/Login/office.png";
import logolg from "../../../../src/assets/Login/logo-lg.png";
import { InputEmail, InputOtp, InputPassword } from "../../common/ALLINPUTS/AllInputs";
import { toastOptions } from "../../../Utils/FakeRoutes";
import Loader from "../../Loader/Loader";
import { useStateContext } from "../../Contexts/StateContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../../services/mainService";

function NewForgotPassword() {
  const { applicationColor } = useThemeContext();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState("email"); // Step can be "email", "otp", or "password"
  const [isValid, setIsValid] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [loadingTerm, setLoadingTerm] = useState("");

  const navigate = useNavigate();
  const { setLoading: setLoadingContext } = useStateContext();
  const { checkErrors } = useFunctionContext();

  const emailSchema = {
    email: Joi.string()
      .min(10)
      .max(25)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .label("Email"),
  };

  const otpSchema = Joi.object({
    otp: Joi.string().length(6).required().label("OTP"), // Assuming OTP is 6 digits
  });

  const passwordSchema = {
    newPassword: Joi.string()
      .min(8)
      .max(20)
      .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
      .required()
      .label("New Password")
      .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must contain at least one capital letter and one special character",
      }),
    confirmPassword: Joi.string()
      
      .required()
      .label("Confirm Password")
      .messages({ "any.only": "Confirm Password must match New Password" }),
  };

  const validateField = (name, value) => {
    let schema;
    if (step === "email") schema = emailSchema;
    else if (step === "otp") schema = otpSchema;
    else schema = passwordSchema;

    const { error } = schema.extract(name).validate(value);
    return !error;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoadingTerm("email");
    setLoading(true);
    try {
      await checkErrors(emailSchema, { email: formData.email });
      const response = await backEndCallObjNothing({ email: formData.email }, "requestOtp");
      toastOptions.success(response.detail || "OTP sent successfully");
      setStep("otp");
    } catch (error) {
      toastOptions.error(error.message || "Error sending OTP");
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoadingTerm("otp");
    setLoading(true);
    try {
      await checkErrors(otpSchema, { otp: formData.otp });
      setStep("password");
    } catch (error) {
      toastOptions.error(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoadingTerm("password");
    setLoading(true);
    try {
      await checkErrors(passwordSchema, {
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
      const response = await backEndCallObjNothing(
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        },
        "resetPassword"
      );
      toastOptions.success(response.detail || "Password set successfully");
      navigate("/login");
    } catch (error) {
      toastOptions.error(error.message || "Error resetting password");
    } finally {
      setLoading(false);
      setLoadingTerm("");
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

          <form
            className="employee-login-form mt-3"
            onSubmit={
              step === "email"
                ? handleEmailSubmit
                : step === "otp"
                ? handleOtpSubmit
                : handlePasswordSubmit
            }
          >
            <div className="greetings mb-1">
              <h2 className="welcome mb-2">
                {step === "email" && "Request Password Reset"}
                {step === "otp" && "Enter OTP"}
                {step === "password" && "Set New Password"}
              </h2>
            </div>

            {step === "email" && (
              <>
                <InputEmail
                  type={"email"}
                  placeholder={"Email Address"}
                  name={"email"}
                  value={formData.email}
                  setForm={setFormData}
                  schema={emailSchema.email}
                  imp
                  icon={<MdEmail />}
                />
                <div className="employee-button">
                  <button
                    className="employee-form-button"
                    disabled={!isValid.email || loading}
                    style={{ background: applicationColor.buttonColor }}
                  >
                    {loading && loadingTerm === "email" ? <Loader /> : "Request OTP"}
                  </button>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <InputOtp
                  type={"text"}
                  placeholder={"Enter OTP"}
                  name={"otp"}
                  value={formData.otp}
                  setForm={setFormData}
                  schema={otpSchema.otp}
                  imp
                />
                <div className="employee-button">
                  <button
                    className="employee-form-button"
                    disabled={!isValid.otp || loading}
                    style={{ background: applicationColor.buttonColor }}
                  >
                    {loading && loadingTerm === "otp" ? <Loader /> : "Verify OTP"}
                  </button>
                </div>
              </>
            )}

            {step === "password" && (
              <>
                <InputPassword
                  type={"password"}
                  placeholder={"New Password"}
                  name={"newPassword"}
                  value={formData.newPassword}
                  setForm={setFormData}
                  schema={passwordSchema.newPassword}
                  imp
                  icon={<MdOutlineKey />}
                />
                <InputPassword
                  type={"password"}
                  placeholder={"Confirm Password"}
                  name={"confirmPassword"}
                  value={formData.confirmPassword}
                  setForm={setFormData}
                  schema={passwordSchema.confirmPassword}
                  imp
                  icon={<MdOutlineKey />}
                />
                <div className="employee-button">
                  <button
                    className="employee-form-button"
                    disabled={
                      !isValid.newPassword ||
                      !isValid.confirmPassword ||
                      loading
                    }
                    style={{ background: applicationColor.buttonColor }}
                  >
                    {loading && loadingTerm === "password" ? <Loader /> : "Set Password"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewForgotPassword;
