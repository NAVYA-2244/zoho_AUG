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

const AddEmployee = () => {
  const { setOrgData2, setLoadingTerm, setLoading, orgDetails } =
    useStateContext();
  console.log(orgDetails, "orgDetails");

  console.log(orgDetails, "orgdetails");
  const [redirect, setRedirect] = useState(false);
  const { checkErrors } = useFunctionContext();

  const handleSubmit = async (formData, setFormData) => {
    try {
      // console.log(formData, "formData");
      setLoading(true);
      setLoadingTerm("Add Employee");
      await checkErrors(ExpirementSchema, formData);

      const data = {
        // banner: formData?.banner,
        employee_id: formData?.employee_id,
        location_id: formData?.location_id,
        // profilePhoto: formData?.profilePhoto,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        nick_name: formData?.nick_name,
        email: formData?.email,
        gender: formData?.gender,
        expertise: formData.expertise,
        tags: formData?.tags,
        department_id: formData?.department_id,
        designation_id: formData?.designation_id,
        role_id: formData?.role_id,
        // location: formData?.location,
        employment_type: formData?.employment_type,
        source_of_hire: formData?.source_of_hire,
        date_of_join: formData?.date_of_join,
        shift_id: formData?.shift_id,
        reporting_manager: {},
        employee_status: formData.employee_status,
        // reportingManager: formData?.reportingManager,
        date_of_birth: format(new Date(formData?.date_of_birth), "ddMMyyyy"),
        marital_status: formData?.marital_status,
        about_me: formData?.about_me,
        identity_info: {
          uan: formData?.uan,
          pan: formData?.pan,
          aadhaar: formData?.aadhaar,
          passport: formData?.passport,
        },
        work_phone_number: formData?.work_phone_number,
        personal_mobile_number: formData?.personal_mobile_number,
        personal_email_address: formData?.personal_email_address,
        seating_location: formData?.seating_location,
        permanent_address: formData?.permanent_address,
        present_address: formData?.present_address,
        work_experience: Object.values(formData?.work_experience || {}).every(
          (item) => item.length > 0
        )
          ? formData.work_experience
          : [],

        educational_details: Object.values(
          formData?.educational_details || {}
        ).every((item) => item.length > 0)
          ? formData.educational_details
          : [],
        dependent_details: Object.values(
          formData?.dependent_details || {}
        ).every((item) => item.length > 0)
          ? formData.dependent_details
          : [],
      };

      data.organisation_id = orgDetails?.organisation_id;

      console.log(data, "datatas");
      const response = await backEndCallObjNothing("/user/add_employee", data);

      setRedirect(true);

      setFormData({});
      toastOptions.success("Employee Added successfully");

      setLoadingTerm("");
      setLoading(false);
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
      />
    </>
  );
};

export default AddEmployee;
