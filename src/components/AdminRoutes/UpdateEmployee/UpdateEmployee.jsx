import React, { useEffect, useState } from "react";

import EmployeeDataSchema, {
  ExpirementSchema,
  addEmployeeForm,
} from "../../AllSchema/EmployeeSchema";
import { Navigate, useParams } from "react-router";
import { useStateContext } from "../../Contexts/StateContext";
import { flatternObject } from "../../../Utils/Helpers";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import Loader from "../../Loader/Loader";
import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../services/mainService";
import { format, parse } from "date-fns";

const convertDate = (dateString) => {
  const parsedDate = parse(dateString, "ddMMyyyy", new Date());
  const formattedDate = format(parsedDate, "yyyy-MM-dd");
  return formattedDate;
};

const UpdateEmployee = () => {
  const {
    setLoading,
    setLoadingTerm,
    setOrgData2,
    orgDetails,
    employeesList,
    setEmployeesList,
  } = useStateContext();

  const { employeId } = useParams();
  const [updateEmployeedata, setUpdateEmployeeData] = useState({});
  const { checkErrors } = useFunctionContext();
  const [redirect, setRedirect] = useState(false);
  const [btndisabled, setButtonDisabled] = useState(false);
  //This UseEffect Fetches the single user data based on employee id
  useEffect(() => {
    const singleEmployeeData = async () => {
      try {
        setLoading(true);
        const { employee } = await backEndCallObjNothing(
          `/admin_get/get_emp_by_id`,
          { employee_id: employeId }
        );

        const {
          basic_info,
          work_info,
          personal_details,
          identity_info,
          contact_details,
          work_experience,
          educational_details,
          dependent_details,
          password,
          employee_id,
        } = employee;

        delete work_info.shift_name;
        delete work_info?.designation_name;
        delete work_info?.department_name;
        delete work_info?.role_name;
        // delete work_info?.reporting_manager;
        // delete work_info.location_name;

        const newObj = {
          basic_info,
          work_info,
          personal_details,
          identity_info,
          contact_details,
        };

        const form = flatternObject(newObj);
        // form.date_of_birth = convertDate(personal_details?.date_of_birth);
        form.reporting_manager = work_info.reporting_manager;

        form.work_experience = work_experience;
        form.educational_details = educational_details;
        form.dependent_details = dependent_details;
        form.employee_id = employee_id;
        form.password = password;
        setUpdateEmployeeData(form);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    singleEmployeeData();
  }, [employeId]);

  const handleSubmit = async (formData) => {
    try {
      setButtonDisabled(true);
      setLoading(true);
      setLoadingTerm("Update Employee");
      setEmployeesList([]);
      // Remove the `admin_type` field from formData if it exists
      const { admin_type, ...filteredFormData } = formData;

      await checkErrors(ExpirementSchema, filteredFormData);

      const data = {
        employee_id: filteredFormData?.employee_id,
        password: formData?.password,
        first_name: filteredFormData?.first_name,
        last_name: filteredFormData?.last_name,
        nick_name: filteredFormData?.nick_name,
        email: filteredFormData?.email,
        gender: filteredFormData?.gender,
        expertise: filteredFormData?.expertise,
        department_id: filteredFormData?.department_id,
        designation_id: filteredFormData?.designation_id,
        role_id: filteredFormData?.role_id,
        employment_type: filteredFormData?.employment_type,
        source_of_hire: filteredFormData?.source_of_hire,
        date_of_join: filteredFormData?.date_of_join,
        reporting_manager: filteredFormData?.reporting_manager,
        employee_status: filteredFormData?.employee_status,
        date_of_birth: format(
          new Date(filteredFormData?.date_of_birth),
          "ddMMyyyy"
        ),
        marital_status: filteredFormData?.marital_status,
        about_me: filteredFormData?.about_me,
        identity_info: {
          uan: filteredFormData?.uan,
          pan: filteredFormData?.pan,
          aadhaar: filteredFormData?.aadhaar,
          passport_number: filteredFormData?.passport_number,
        },
        mobile_number: filteredFormData?.mobile_number,
        personal_mobile_number: filteredFormData?.personal_mobile_number,
        personal_email_address: filteredFormData?.personal_email_address,
        seating_location: filteredFormData?.seating_location,
        permanent_address: filteredFormData?.permanent_address,
        present_address: filteredFormData?.present_address,
        work_experience: filteredFormData?.work_experience,
        educational_details: filteredFormData?.educational_details,
        dependent_details: filteredFormData?.dependent_details,
      };

      data.organisation_id = orgDetails?.organisation_id;

      const response = await backEndCallObjNothing(
        "/admin/update_employee_profile",
        data
      );

      setRedirect(true);
      toastOptions.success("Employee Updated successfully");
      setLoadingTerm("");
      setLoading(false);
      setButtonDisabled(false);
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      setButtonDisabled(false);
      toastOptions.error(
        error?.response?.data || error[0].message || "Something went wrong"
      );
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };
  if (redirect) {
    return <Navigate to="/admin/employee_list" />;
  }

  return (
    <>
      {/* hello world */}
      {Object.keys(updateEmployeedata).length > 0 ? (
        <ReusableProfileForm
          form={updateEmployeedata}
          type={"Update Employee"}
          submit={handleSubmit}
          disabled={btndisabled}
          disableobj={{ password: false }}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};
export default UpdateEmployee;
