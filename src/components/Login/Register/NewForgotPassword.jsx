import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import Joi from "joi";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../../services/mainService";
import otpImage from "../../../assets/images/otp-image1.png";
import officeImg from "../../../../src/assets/Login/office.png";
import logolg from "../../../../src/assets/Login/logo-lg.png";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { InputEmail, InputPassword } from "../../common/ALLINPUTS/AllInputs";
import { toastOptions } from "./../../../Utils/FakeRoutes";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { MdOutlineKey } from "react-icons/md";
const NewForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [otpData, setOtpData] = useState({
    employee_email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [btndisabled, setBtndisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtpFields, setShowOtpFields] = useState(false); // Toggle OTP and password fields
  // const [showOldPassword, setShowOldPassword] = useState(false);
  // const [ConfirmaPassword, SetConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { applicationColor } = useThemeContext();

  // Joi Schemas for validation
  // Joi Schema for Email
  const ResetPasswordSchema = {
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org", "io"] } })
      .max(50)
      .required()
      .messages({
        "string.email": "Please enter a valid email address.",
        "string.max": "Email must be less than 50 characters.",
        "any.required": "Email is required.",
      }),
  };

  // Joi Schema for OTP and Password Validation
  const otpSchema = {
    employee_email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org", "io"] } })
      .max(50)
      .required()
      .messages({
        "string.email": "Please enter a valid employee email address.",
        "string.max": "Employee email must be less than 50 characters.",
        "any.required": "Employee email is required.",
      }),
    newPassword: Joi.string()
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

    confirmPassword: Joi.string()
      // .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "string.pattern.base":
          "Confirm password doesn't match the new password.",
        "any.required": "Confirm password is required.",
      }),
  };
  const { checkErrors } = useFunctionContext();
  // Function to handle form validation

  const validateField = (name, value) => {
    const schema = Joi.object(otpSchema, ResetPasswordSchema);
    const { error } = schema.extract(name).validate(value);
    return !error;
  };

  // const handleEmailSubmit = async (e) => {
  //   e.preventDefault();
  //   setBtndisabled(true);

  //   try {
  //     await checkErrors(ResetPasswordSchema, formData);

  //     const response = await backEndCallObjNothing("/emp/forgot_password", {
  //       email: formData.email,
  //     });

  //     if (response?.data) {
  //       toastOptions.error(response.data.error); // Show error message if error exists
  //     } else {
  //       toastOptions.success("OTP sent to your email!");
  //       setShowOtpFields(true);
  //     }
  //   } finally {
  //     setBtndisabled(false);
  //   }
  // };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setBtndisabled(true);

    try {
      await checkErrors(ResetPasswordSchema, formData);

      const response = await backEndCallObjNothing("/emp/forgot_password", {
        email: formData.email,
      });

      if (response?.error) {
        toastOptions.error(response.error);
      } else {
        toastOptions.success(response?.success);
        setShowOtpFields(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toastOptions.error(error.response.data);
      } else {
        toastOptions.error("Validation error. Please check your email.");
      }
    } finally {
      setBtndisabled(false);
    }
  };

  // const handleOtpSubmit = async (e) => {
  //   e.preventDefault();
  //   setBtndisabled(true);

  //   try {
  //     if (otpData.newPassword !== otpData.confirmPassword) {
  //       toastOptions.error("Password should match with ConfirmPassword ");
  //     } else {
  //       await checkErrors(otpSchema, otpData);

  //       const response = await backEndCallObjNothing(
  //         "/emp/reset_forgot_password",
  //         {
  //           employee_email: otpData.employee_email,
  //           new_password: otpData.newPassword,
  //         }
  //       );
  //       {
  //         console.log(response, "success");
  //       }
  //       if (response?.success) {
  //         toastOptions.success("Password reset successful!");

  //         navigate("/login");
  //       } else {
  //         toastOptions.error(response?.error || "Password reset failed.");
  //       }
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       toastOptions.error(error.response.data); // Show the backend error message
  //     } else {
  //       toastOptions.error("Something Went wrong."); // Default error message
  //     }
  //   } finally {
  //     setBtndisabled(false);
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   const schema = showOtpFields ? otpSchema : ResetPasswordSchema;

  //   const { error } = schema.validate({ [name]: value }, { abortEarly: false });
  //   {
  //     console.log(error, "erroror");
  //   }
  //   if (error) {
  //     const errorMessages = error.details.map((detail) => detail.message);
  //     setErrors((prev) => ({ ...prev, [name]: errorMessages }));
  //   } else {
  //     setErrors((prev) => ({ ...prev, [name]: null }));
  //   }

  //   if (showOtpFields) {
  //     setOtpData((prev) => ({ ...prev, [name]: value }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setBtndisabled(true);

    try {
      if (otpData.newPassword !== otpData.confirmPassword) {
        toastOptions.error("Password should match with ConfirmPassword ");
      } else {
        await checkErrors(otpSchema, otpData);

        const response = await backEndCallObjNothing(
          "/emp/reset_forgot_password",
          {
            employee_email: otpData.employee_email,
            new_password: otpData.newPassword,
          }
        );

        if (response?.success) {
          toastOptions.success("Password reset successful!");
          {
            console.log("success");
          }

          navigate("/login");
        } else {
          toastOptions.error(response?.error || "Password reset failed.");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toastOptions.error(error.response.data);
      } else {
        toastOptions.error("Something went wrong.");
      }
    } finally {
      setBtndisabled(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Dynamically choose schema based on whether OTP fields are shown
    const schema = showOtpFields ? otpSchema : ResetPasswordSchema;

    // Validate the current field
    const { error } = schema.extract(name).validate(value);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error.details[0].message,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    // Update the form data based on the current field being changed
    if (showOtpFields) {
      setOtpData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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
                      style={{
                        position: "absolute",
                        bottom: "280px",
                        left: "300px",
                      }}
                    />
                  </div>
                  <h3 className="welcome mb-5 ">Forgot Password</h3>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    Please Enter your Email Address to create password
                  </p>
                  <InputEmail
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    setForm={setFormData}
                    required
                    maxLength={50}
                    icon={<MdEmail />}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <small className="form-text text-danger">
                      {errors.email}
                    </small>
                  )}
                  <div>
                    <div
                      className="employee-button"
                      style={{ marginTop: "25px" }}
                    >
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
                </div>
              </>
            ) : (
              <>
                <div className="greetings mb-3" style={{ maxWidth: "400px" }}>
                  <div className="logo-wrapper mb-4">
                    <img src={logolg} alt="company-logo" width="100" />
                  </div>
                  {/* <h1 className="welcome mb-1">OTP Verification</h1> */}
                  <p className="text-primary mb-4">{formData.email}</p>
                  <label htmlFor="Email">Email</label>
                  <InputEmail
                    type="email"
                    placeholder="Employee Email"
                    name="employee_email"
                    value={otpData.employee_email}
                    setForm={setOtpData}
                    validateField={validateField}
                    schema={otpSchema.employee_email}
                    required
                    maxLength={50}
                    icon={<MdEmail />}
                    onChange={handleInputChange}
                  />
                  {errors.employee_email && (
                    <small className="form-text text-danger">
                      {errors.employee_email}
                    </small>
                  )}

                  <div className="form-group mb-3">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="password-wrapper">
                      <InputPassword
                        type="password"
                        // id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={otpData.newPassword}
                        onChange={handleInputChange}
                        setForm={setOtpData}
                        validateField={validateField}
                        schema={otpSchema.newPassword}
                        required
                        maxLength={10}
                        className="form-control"
                        icon={<MdOutlineKey />}
                      />

                      {/* <span
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </span> */}
                    </div>
                    {errors.newPassword && (
                      <small className="form-text text-danger">
                        {errors.newPassword}
                      </small>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-wrapper">
                      <InputPassword
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={otpData.confirmPassword}
                        schema={otpSchema.confirmPassword}
                        onChange={handleInputChange}
                        setForm={setOtpData}
                        className="form-control"
                        icon={<MdOutlineKey />}
                        validateField={validateField}
                      />
                      {/* <span
                        onClick={() => SetConfirmPassword(!ConfirmaPassword)}
                      >
                        {ConfirmaPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </span> */}
                    </div>
                    {errors.confirmPassword && (
                      <small className="form-text text-danger">
                        {errors.confirmPassword}
                      </small>
                    )}
                  </div>

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
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewForgotPassword;
