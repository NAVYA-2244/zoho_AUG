import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Joi from "joi";
import { backEndCallObjNothing } from "../../services/mainService";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../Utils/FakeRoutes";
import { useThemeContext } from "../Contexts/ThemesContext";
import EmployeChange from "./FilesModal/Employee";
import { InputPassword } from "../common/ALLINPUTS/AllInputs";
import { useFunctionContext } from "../Contexts/FunctionContext";
import { MdOutlineKey } from "react-icons/md";
const Modal = ({ onLogout }) => (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Password Changed Successfully!</h5>
        </div>
        <div className="modal-body">
          <p>
            Your password has been updated. Please log in again for security
            purposes.
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={onLogout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ChangePassword = () => {
  const { applicationColor } = useThemeContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { checkErrors } = useFunctionContext();
  const [errors, setErrors] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [btndisabled, setBtndisabled] = useState(false);
  // Define Joi schemas
  const schema = {
    oldPassword: Joi.string()
      .min(6)
      .max(10)
      .required()
      .label("Old Password")
      .messages({
        "string.min": "Old Password must be at least 6 characters long",
        "string.max": "Old Password must be less than 11 characters long",
        "any.required": "Old Password is required",
      }),
    newPassword: Joi.string()
      .min(8)
      .max(10)
      .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
      .required()
      .label("New Password")
      .messages({
        "string.min": "New Password must be at least 8 characters long",
        "string.max": "New Password must be less than 11 characters long",
        "string.pattern.base":
          "New Password must contain at least one capital letter and one special character",
        "any.required": "New Password is required",
      }),
    confirmPassword: Joi.string()
      // .valid(Joi.ref("newPassword"))
      .required()
      .label("Confirm Password")
      .messages({
        "any.only": "Confirm Password must match New Password",
        "any.required": "Confirm Password is required",
      }),
  };

  const validateField = (name, value) => {
    const schema = Joi.object(schema);
    const { error } = schema.extract(name).validate(value);
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await checkErrors(schema, formData);
      if (formData.newPassword !== formData.confirmPassword) {
        toastOptions.error("Password should match with ConfirmPassword ");
      } else {
        await checkErrors(schema, formData);
        setBtndisabled(true);
        const payload = {
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
        };

        const res = await backEndCallObjNothing("/emp/reset_password", payload);
        toastOptions.success(res.success || "Password changed successfully");
        setBtndisabled(false);
        setShowModal(true);
        localStorage.removeItem("zohoEmployeeToken");
      }
    } catch (error) {
      setBtndisabled(false);
      console.log(error, "error");
      if (error?.response?.data) {
        toastOptions.error(error?.response?.data || "Error changing password");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("zohoEmployeeToken");
    navigate("/login");
  };

  return (
    <>
      <div className="row d-flex">
        <div className="col-lg-4">
          <div
            className="d_card m-2 p-3"
            style={{ background: applicationColor.cardItem, height: "460px" }}
          >
            <h5 className="text-center mb-4">Change Password</h5>

            <InputPassword
              type={"password"}
              name={"oldPassword"}
              placeholder="Old Password"
              value={formData.oldPassword}
              validateField={validateField}
              schema={schema.oldPassword}
              setForm={setFormData}
              maxLength={10}
              icon={<MdOutlineKey />}
            />

            <InputPassword
              type={"password"}
              name={"newPassword"}
              placeholder="New Password"
              value={formData.newPassword}
              schema={schema.newPassword}
              setForm={setFormData}
              validateField={validateField}
              maxLength={10}
              autoCapitalize="none"
              icon={<MdOutlineKey />}
            />

            {/* <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      style={{
                        borderRadius: "10px",
                        width: "450px",
                        height: "50px",
                      }}
                      onChange={handleInputChange}
                      maxLength={10}
                    /> */}
            <InputPassword
              type={"password"}
              name={"confirmPassword"}
              placeholder={"Confirm Password"}
              value={formData.confirmPassword}
              // style={{
              //   borderRadius: "10px",
              //   width: "450px",
              //   height: "50px",
              // }}
              schema={schema.confirmPassword}
              setForm={setFormData}
              validateField={validateField}
              maxLength={10}
              // autoCapitalize="none"
              icon={<MdOutlineKey />}
            />

            <button
              className="btn btn-primary w-100"
              disabled={btndisabled}
              onClick={handleSubmit}
            >
              Submit
            </button>

            {showModal && <Modal onLogout={handleLogout} />}
          </div>
        </div>
        <div className="col-lg-4">
          <EmployeChange />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
