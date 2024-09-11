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
  const { setLoading, setLoadingTerm, setOrgData2, orgDetails,employeesList, setEmployeesList  } =
    useStateContext();
   
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

        console.log(employee, "employeupdate");

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
        form.date_of_birth = convertDate(personal_details?.date_of_birth);
        form.reporting_manager = work_info.reporting_manager;

        form.work_experience = work_experience;
        form.educational_details = educational_details;
        form.dependent_details = dependent_details;
        form.employee_id = employee_id;
        form.password = password;
        setUpdateEmployeeData(form);

        console.log({ updateForm: form });
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    singleEmployeeData();
  }, [employeId]);

  // console.log(delete work_info?.reporting_manager,"dfshdfjsdfjkhsdkj")
  // const handleSubmit = async (formData) => {
  //   try {
  //     setButtonDisabled(true)
  //     setLoading(true);
  //     setLoadingTerm("Update Employee");
  //     console.log({ formData });
  //     await checkErrors(ExpirementSchema, formData);
  //     const data = {
  //       employee_id: formData?.employee_id,
  //       // password:formData?.password,
  //       // location_id: formData?.location_id,
  //       first_name: formData?.first_name,
  //       last_name: formData?.last_name,
  //       nick_name: formData?.nick_name,
  //       email: formData?.email,
  //       gender: formData?.gender,
  //       expertise: formData.expertise,
  //       // tags: formData?.tags,
  //       department_id: formData?.department_id,
  //       designation_id: formData?.designation_id,
  //       role_id: formData?.role_id,
  //       employment_type: formData?.employment_type,
  //       source_of_hire: formData?.source_of_hire,
  //       date_of_join: formData?.date_of_join,
  //       // shift_id: formData?.shift_id,

  //       reporting_manager: formData?.reporting_manager ,
  //       employee_status: formData.employee_status,
  //       date_of_birth: format(new Date(formData?.date_of_birth), "ddMMyyyy"),
  //       marital_status: formData?.marital_status,
  //       about_me: formData?.about_me,

  //       identity_info: {
  //         uan: formData?.uan,
  //         pan: formData?.pan,
  //         aadhaar: formData?.aadhaar,
  //         passport: formData?.passport,
  //       },

  //       mobile_number: formData?.mobile_number,
  //       personal_mobile_number: formData?.personal_mobile_number,
  //       personal_email_address: formData?.personal_email_address,
  //       reporting_manager: formData?.reporting_manager,
  //       seating_location: formData?.seating_location,
  //       permanent_address: formData?.permanent_address,
  //       present_address: formData?.present_address,

  //       work_experience: formData?.work_experience,
  //       educational_details: formData?.educational_details,
  //       dependent_details: formData.dependent_details,
  //     };

  //     data.organisation_id = orgDetails?.organisation_id;
  //     // data.last_ip = "0.0.0.0";

  //     // data.fcm_token = "1234";
  //     // data.device_id = "1234";
  //     console.log(formData?.reporting_manager, "paylod");
  //     const response = await backEndCallObjNothing(
  //       "/admin/update_employee_profile",
  //       data
  //     );
  //     console.log("response", response);

  //     setRedirect(true);
  //     toastOptions.success("Employee Updated successfully");
  //     setLoadingTerm("");
  //     setLoading(false);
  //     setButtonDisabled(false)
  //   } catch (error) {
  //     setLoading(false);
  //     setLoadingTerm("");
  //     setButtonDisabled(false)
  //     toastOptions.error(
  //       error?.response?.data || error[0].message || "Something went wrong"
  //     );
  //   } finally {
  //     setLoading(false);
  //     setButtonDisabled(false)
  //   }
  // };

  const handleSubmit = async (formData) => {
    try {
      setButtonDisabled(true);
      setLoading(true);
      setLoadingTerm("Update Employee");
      setEmployeesList([])
      // Remove the `admin_type` field from formData if it exists
      const { admin_type, ...filteredFormData } = formData;

      console.log({ filteredFormData }); // Debugging without `admin_type`

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
      {
        console.log(filteredFormData, "data");
      }

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
      console.log(error?.response?.error, "error");
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };
  if (redirect) {
    return <Navigate to="/admin/employee_list" />;
  }
  console.log(updateEmployeedata, "updateEmployeedata");
  return (
    <>
      {/* hello world */}
      {Object.keys(updateEmployeedata)?.length > 0 ? (
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
