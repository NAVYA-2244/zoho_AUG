// import React, { useEffect, useState } from "react";
// import "./EmployeeProfileUpdate";

// import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
// import { useStateContext } from "../../Contexts/StateContext";
// import { flatternObject } from "../../../Utils/Helpers";

// import Loader from "../../Loader/Loader";
// import EmployeeDataSchema, { ExpirementSchema } from "../../AllSchema/EmployeeSchema";
// import { makeNetworkCall } from "../../../HttpServices/HttpService";
// import { useFunctionContext } from "../../Contexts/FunctionContext";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import { Navigate, useNavigate } from "react-router";

// const EmployeeProfileUpdate = () => {
//   const {
//     setLoadingTerm,
//     setLoading,
//     employeeData,
//     employeedata,
//     singleEmployeeProfile,
//     setSingleEmployeeProfile,
//   } = useStateContext();
//   const { checkErrors } = useFunctionContext();
//   const [formData, setFormData] = useState({});
//   const [redirect, setRedirect] = useState(false);
//   const navigate = useNavigate();

// console.log(employeedata.profile,"employeeDeta")

//   useEffect(() => {
//     if (Object.keys(employeedata?.profile).length > 0) {
//       const {
//         banner,
//         profilePhoto,
//         employeeId,
//         dependentDetails,
//         contactDetails,
//         gender,
//         identityInfo,
//         educationDetails,
//         email,
//         firstName,
//         lastName,
//         nickName,
//         personalDetails,
//         workExperience,
//         workInfo,
//         reportingManager,
//         dateOfExit,
//       } = employeeData;

//       const newObj = {
//         ...dependentDetails,
//         gender,
//         contactDetails,
//         identityInfo,
//         email,
//         firstName,
//         lastName,
//         nickName,
//         personalDetails,
//         dateOfExit,
//       };
//       newObj.dateOfJoining = workInfo.dateOfJoining;
//       newObj.employmentType = workInfo.employmentType;
//       newObj.location = workInfo.location.locationId;
//       newObj.shift = workInfo.shift.shiftId;
//       newObj.department = workInfo.department.departmentId;
//       newObj.designation = workInfo.designation.designationId;
//       newObj.role = workInfo.role.roleId;
//       newObj.reportingManager = reportingManager.employeeId;
//       newObj.sourceOfHire = workInfo.sourceOfHire;

//       let form = flatternObject(newObj);
//       form.educationDetails = educationDetails;
//       form.workExperience = workExperience;
//       form.banner = banner;
//       form.profilePhoto = profilePhoto;
//       form.employeeId = employeeId;

//       setFormData(form);
//     }
//   }, [singleEmployeeProfile]);

//   const handleSubmit = async (userData) => {
//     try {
//       setLoading(true);
//       setLoadingTerm("Update Profile");
//       await checkErrors(ExpirementSchema, userData);

//       const data = {
//         profilePhoto: userData.profilePhoto,
//         banner: userData.banner,
//         nickName: userData.nickName,
//         personalDetails: {
//           dob: userData.dob,
//           maritalStatus: userData.maritalStatus,
//           aboutMe: userData.aboutMe,
//         },
//         identityInfo: {
//           uan: userData.uan,
//           pan: userData.pan,
//           aadhaar: userData.aadhaar,
//           passport: userData.passport,
//         },
//         educationDetails: userData.educationDetails,
//         dependentDetails: [
//           {
//             dependentName: userData.dependentName,
//             dependentRelation: userData.dependentRelation,
//             dependentDob: userData.dependentDob,
//           },
//         ],
//       };

//       data.employeeId = employeedata.employeeId;

//       const response = await makeNetworkCall(data, "updateEmployee", "headers");
//       const { detail } = await makeNetworkCall(
//         {
//           totalAttendanceFilters: {
//             year: "",
//             month: "",
//             fromDate: "",
//             toDate: "",
//           },
//         },
//         "getEmployeeData",
//         "headers"
//       );

//       setSingleEmployeeProfile(detail.profile);
//       setRedirect(true);
//       toastOptions.success(response.detail || "Profile Updated Successfully");
//     } catch (error) {
//       toastOptions.error(
//         error?.error?.response?.data?.detail || "Error Occured"
//       );
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/profile" />;
//   }

//   return (
//     <>
//       {Object.keys(formData).length > 0 ? (
//         <ReusableProfileForm
//           form={formData}
//           type={"Update Profile"}
//           submit={handleSubmit}
//         />
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// };

// export default EmployeeProfileUpdate;
import React, { useEffect, useState } from "react";
import "./EmployeeProfileUpdate";

import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
import { useStateContext } from "../../Contexts/StateContext";
import { flatternObject } from "../../../Utils/Helpers";

import Loader from "../../Loader/Loader";
import EmployeeDataSchema, { ExpirementSchema } from "../../AllSchema/EmployeeSchema";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { Navigate, useNavigate } from "react-router";

const EmployeeProfileUpdate = () => {
  const {
    setLoadingTerm,
    setLoading,
    employeedata,
    singleEmployeeProfile,
    setSingleEmployeeProfile,
  } = useStateContext();
  const { checkErrors } = useFunctionContext();
  const [formData, setFormData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (employeedata?.profile && Object.keys(employeedata.profile).length > 0) {
      setSingleEmployeeProfile(employeedata.profile);
    }
  }, [employeedata, setSingleEmployeeProfile]);

  useEffect(() => {
    if (Object.keys(singleEmployeeProfile).length > 0) {
      const {
        basic_info,
        contact_details,
        dependent_details,
        educational_details,
        employee_id,
        identity_info,
        personal_details,
        work_experience,
        work_info,
      } = singleEmployeeProfile;

      const newObj = {
        ...basic_info,
        ...contact_details,
        ...personal_details,
        ...identity_info,
        employeeId: employee_id,
        date_of_join: work_info.date_of_join,
        
        employment_type: work_info.employment_type
,
        location: work_info.location_id,
        shift: work_info.shift_id,

        department_id: work_info.department_id,
        designation_id: work_info.designation_id,
        role_id: work_info.role_id,
        reportingManager: work_info.reporting_manager_id,
        sourceOfHire: work_info.source_of_hire,
      };

      let form = flatternObject(newObj);
      form.educationalDetails = educational_details;
      form.work_experience = work_experience;
      form.dependent_details = dependent_details;

      setFormData(form);
    }
  }, [singleEmployeeProfile]);

  const handleSubmit = async (userData) => {
    try {
      setLoading(true);
      setLoadingTerm("Update Profile");
      await checkErrors(ExpirementSchema, userData);

      const data = {
        ...userData,
        employeeId: userData.employeeId,
        personalDetails: {
          date_of_birth: userData.date_of_birth,
          marital_status: userData.marital_status,
          about_me: userData.about_me,
        },
        identityInfo: {
          uan: userData.uan,
          pan: userData.pan,
          aadhaar: userData.aadhaar,
          passport: userData.passport,
        },
        educationDetails: userData.educationalDetails,
        work_experience: userData.work_experience,
        dependentDetails: userData.dependentDetails,
      };

      const response = await makeNetworkCall(data, "updateEmployee", "headers");
      const { detail } = await makeNetworkCall(
        {
          totalAttendanceFilters: {
            year: "",
            month: "",
            fromDate: "",
            toDate: "",
          },
        },
        "getEmployeeData",
        "headers"
      );

      setSingleEmployeeProfile(detail.profile);
      setRedirect(true);
      toastOptions.success(response.detail || "Profile Updated Successfully");
    } catch (error) {
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occurred"
      );
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  if (redirect) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      {Object.keys(formData).length > 0 ? (
        <ReusableProfileForm
          form={formData}
          type={"Update Profile"}
          submit={handleSubmit}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EmployeeProfileUpdate;
