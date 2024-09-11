import React, { useState } from "react";
import { MdOutlineKey } from "react-icons/md";
import Joi from "joi";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { InputEmail, InputPassword } from "../../common/ALLINPUTS/AllInputs";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";

const EmployeChange = () => {
  const { applicationColor } = useThemeContext();
  const [formData, setFormData] = useState({
    email: "",
    new_password: "",
  });
  const { checkErrors } = useFunctionContext();
  const [btndisabled, setBtndisabled] = useState(false);

  const Schemas = {
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org", "io"] } })
      .max(50)
      .required()
      .messages({
        "string.email": "Please enter a valid employee email address.",
        "string.max": "Employee email must be less than 50 characters.",
        "any.required": "Employee email is required.",
      }),
    new_password: Joi.string()
      .min(8)
      .max(15)
      .required()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=])/
      )
      .messages({
        "string.pattern.base":
          "Password needs 1 uppercase, and 1 special character",
        "any.required": "Password is required",
      })
      .label("Password"),
  };

  const validateField = (name, value) => {
    const schema = Joi.object(Schemas);
    const { error } = schema.extract(name).validate(value);
    return !error;
  };

  const handlingSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkErrors(Schemas, formData);
      setBtndisabled(true);
      const payload = {
        email: formData.email,
        new_password: formData.new_password,
      };

      const res = await backEndCallObjNothing(
        "/admin/emp_reset_password",
        payload
      );
      toastOptions.success(res.success || "Password changed successfully");
      setFormData({
        email: "",
        new_password: "",
      });
      setBtndisabled(false);
    } catch (error) {
      setBtndisabled(false);
      console.log(error, "error");
      if (error.response?.data) {
        toastOptions.error(error.response?.data || "Error changing password");
      }
    }
  };
  return (
    <>
      <div></div>
      <div
        className="d_card m-2 p-3"
        style={{ background: applicationColor.cardItem, height: "450px" }}
      >
        <h5 className="text-center mb-4">Employee Reset Password</h5>
        <div className="form-group p-3">
          <InputEmail
            type={"email"}
            placeholder={"Email Address"}
            name={"email"}
            value={formData.email}
            schema={Schemas.email}
            setForm={setFormData}
            validateField={validateField}
          />
          <InputPassword
            type={"password"}
            placeholder={"Password"}
            name={"new_password"}
            setForm={setFormData}
            value={formData.new_password}
            schema={Schemas.newPassword}
            validateField={validateField}
            icon={<MdOutlineKey />}
          />
          <button
            className="btn btn-primary w-100"
            onClick={handlingSubmit}
            disabled={btndisabled}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeChange;
