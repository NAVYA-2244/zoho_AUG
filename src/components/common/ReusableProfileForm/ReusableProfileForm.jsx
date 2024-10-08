import React, { useState, useEffect } from "react";
import BasicEmployeeData from "../../AdminRoutes/EmployeeForm/BasicEmployeeData";
import WorkInformationData from "../../AdminRoutes/EmployeeForm/WorkInformationData";
import HierarchyData from "../../AdminRoutes/EmployeeForm/HierarchyData";
import PersonalDetailsData from "../../AdminRoutes/EmployeeForm/PersonalDetailsData";
import Loader from "../../Loader/Loader";
import "./ReusableProfileForm.scss";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";

const ReusableProfileForm = ({ form, type, submit, disabled, disableobj }) => {
  const { loading, loadingTerm } = useStateContext();
  const [formData, setFormData] = useState(form);

  const [initialEmployeeId, setInitialEmployeeId] = useState(form.employee_id);
  const { applicationColor } = useThemeContext();

  // Effect to update initialEmployeeId if form changes
  useEffect(() => {
    setInitialEmployeeId(form.employee_id);
  }, [form]);

  // Check if employee_id is edited
  const isEmployeeIdEdited = formData.employee_id !== initialEmployeeId;

  // Check if any other field is edited
  const hasOtherFieldsChanged = Object.keys(formData).some(
    (key) => key !== "employee_id" && formData[key] !== form[key]
  );

  // Determine if the button should be disabled
  const isButtonDisabled = isEmployeeIdEdited && !hasOtherFieldsChanged;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(formData, setFormData);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <BasicEmployeeData
        formData={formData}
        setFormData={setFormData}
        type={type}
        disableobj={disableobj} // Passing disableobj to the child component
      />
      <WorkInformationData
        formData={formData}
        setFormData={setFormData}
        className={"workInformationData"}
      />

      <HierarchyData formData={formData} setFormData={setFormData} />
      <PersonalDetailsData formData={formData} setFormData={setFormData} />
      <div className="edit-details">
        <button
          style={{ background: applicationColor.buttonColor }}
          // disabled={isButtonDisabled}
          disabled={disabled}
          type="submit"
        >
          {loading && loadingTerm === type ? <Loader /> : type}
        </button>
      </div>
    </form>
  );
};

export default ReusableProfileForm;
