import React, { useState } from "react";
import {
  ExpirementSchema,
  addEmployeeForm,
} from "../../AllSchema/EmployeeSchema";
import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
import { useStateContext } from "../../Contexts/StateContext";
import { Navigate, useNavigate } from "react-router";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { backEndCallObjNothing } from "../../../services/mainService";
import { format } from "date-fns";
import EmployeeList from "../EmployeeList/EmployeeList";

const AddEmployee = () => {
  const {
    setOrgData2,
    setLoadingTerm,
    setLoading,
    orgDetails,
    employeesList,
    setEmployeesList,
  } = useStateContext();

  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);
  const { checkErrors } = useFunctionContext();
  const [btndisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (formData, setFormData) => {
    console.log(
      Array.isArray(formData?.dependent_details) &&
        formData.dependent_details.length > 0 &&
        formData.dependent_details.some((detail) =>
          Object.values(detail).some((value) => value && value.length > 0)
        )
        ? formData.dependent_details
        : [],
      "work"
    );

    try {
      setButtonDisabled(true);
      setLoading(true);
      setLoadingTerm("Add Employee");
      setEmployeesList([]);
      await checkErrors(ExpirementSchema, formData);

      const data = {
        organisation_id: orgDetails?.organisation_id,

        employee_id: formData?.employee_id,
        password: formData?.password,

        first_name: formData?.first_name,
        last_name: formData?.last_name,
        nick_name: formData?.nick_name,
        email: formData?.email,
        gender: formData?.gender,
        expertise: formData.expertise,

        department_id: formData?.department_id,
        designation_id: formData?.designation_id,
        role_id: formData?.role_id,

        employment_type: formData?.employment_type,
        source_of_hire: formData?.source_of_hire,
        date_of_join: formData?.date_of_join,

        reporting_manager: formData?.reporting_manager,
        employee_status: formData.employee_status,
        reportingManager: formData?.reportingManager,
        date_of_birth: format(new Date(formData?.date_of_birth), "ddMMyyyy"),
        marital_status: formData?.marital_status,
        about_me: formData?.about_me,
        identity_info: {
          uan: formData?.uan.toUpperCase(),
          pan: formData?.pan.toUpperCase(),
          aadhaar: formData?.aadhaar,
          passport_number: formData?.passport_number.toUpperCase(),
        },
        mobile_number: formData?.mobile_number,

        personal_email_address: formData?.personal_email_address,
        seating_location: formData?.seating_location,
        permanent_address: formData?.permanent_address,
        present_address: formData?.present_address,
        work_experience:
          Array.isArray(formData?.work_experience) &&
          formData.work_experience.length > 0 &&
          formData.work_experience.some((detail) =>
            Object.values(detail).some((value) => value && value.length > 0)
          )
            ? formData.work_experience
            : [],

        educational_details:
          Array.isArray(formData?.educational_details) &&
          formData.educational_details.length > 0 &&
          formData.educational_details.some((detail) =>
            Object.values(detail).some((value) => value && value.length > 0)
          )
            ? formData.educational_details
            : [],

        dependent_details:
          Array.isArray(formData?.dependent_details) &&
          formData.dependent_details.length > 0 &&
          formData.dependent_details.some((detail) =>
            Object.values(detail).some((value) => value && value.length > 0)
          )
            ? formData.dependent_details
            : [],
      };

      const response = await backEndCallObjNothing("/admin/add_employee", data);

      setRedirect(true);

      setFormData({});
      toastOptions.success("Employee Added successfully");

      setLoadingTerm("");
      setLoading(false);
      setButtonDisabled(false);

      navigate("/admin/employee_list");
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      toastOptions.error(
        error?.response?.data || error[0]?.message || "something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  if (redirect) {
    return <Navigate to="/admin/employee_list" />;
  }

  return (
    <>
      <ReusableProfileForm
        form={addEmployeeForm}
        type={"Add Employee"}
        submit={handleSubmit}
        btndisabled={btndisabled}
        disableobj={{ password: true }}
      />
    </>
  );
};

export default AddEmployee;
