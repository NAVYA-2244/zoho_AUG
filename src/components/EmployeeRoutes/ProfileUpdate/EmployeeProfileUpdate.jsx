// // // import React, { useEffect, useState } from "react";
// // // import "./EmployeeProfileUpdate";

// // // import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
// // // import { useStateContext } from "../../Contexts/StateContext";
// // // import { flatternObject } from "../../../Utils/Helpers";

// // // import Loader from "../../Loader/Loader";
// // // import EmployeeDataSchema, { ExpirementSchema } from "../../AllSchema/EmployeeSchema";
// // // import { makeNetworkCall } from "../../../HttpServices/HttpService";
// // // import { useFunctionContext } from "../../Contexts/FunctionContext";
// // // import { toastOptions } from "../../../Utils/FakeRoutes";
// // // import { Navigate, useNavigate } from "react-router";

// // // const EmployeeProfileUpdate = () => {
// // //   const {
// // //     setLoadingTerm,
// // //     setLoading,
// // //     employeeData,
// // //     employeedata,
// // //     singleEmployeeProfile,
// // //     setSingleEmployeeProfile,
// // //   } = useStateContext();
// // //   const { checkErrors } = useFunctionContext();
// // //   const [formData, setFormData] = useState({});
// // //   const [redirect, setRedirect] = useState(false);
// // //   const navigate = useNavigate();

// // // console.log(employeedata.profile,"employeeDeta")

// // //   useEffect(() => {
// // //     if (Object.keys(employeedata?.profile).length > 0) {
// // //       const {
// // //         banner,
// // //         profilePhoto,
// // //         employeeId,
// // //         dependentDetails,
// // //         contactDetails,
// // //         gender,
// // //         identityInfo,
// // //         educationDetails,
// // //         email,
// // //         firstName,
// // //         lastName,
// // //         nickName,
// // //         personalDetails,
// // //         workExperience,
// // //         workInfo,
// // //         reportingManager,
// // //         dateOfExit,
// // //       } = employeeData;

// // //       const newObj = {
// // //         ...dependentDetails,
// // //         gender,
// // //         contactDetails,
// // //         identityInfo,
// // //         email,
// // //         firstName,
// // //         lastName,
// // //         nickName,
// // //         personalDetails,
// // //         dateOfExit,
// // //       };
// // //       newObj.dateOfJoining = workInfo.dateOfJoining;
// // //       newObj.employmentType = workInfo.employmentType;
// // //       newObj.location = workInfo.location.locationId;
// // //       newObj.shift = workInfo.shift.shiftId;
// // //       newObj.department = workInfo.department.departmentId;
// // //       newObj.designation = workInfo.designation.designationId;
// // //       newObj.role = workInfo.role.roleId;
// // //       newObj.reportingManager = reportingManager.employeeId;
// // //       newObj.sourceOfHire = workInfo.sourceOfHire;

// // //       let form = flatternObject(newObj);
// // //       form.educationDetails = educationDetails;
// // //       form.workExperience = workExperience;
// // //       form.banner = banner;
// // //       form.profilePhoto = profilePhoto;
// // //       form.employeeId = employeeId;

// // //       setFormData(form);
// // //     }
// // //   }, [singleEmployeeProfile]);

// // //   const handleSubmit = async (userData) => {
// // //     try {
// // //       setLoading(true);
// // //       setLoadingTerm("Update Profile");
// // //       await checkErrors(ExpirementSchema, userData);

// // //       const data = {
// // //         profilePhoto: userData.profilePhoto,
// // //         banner: userData.banner,
// // //         nickName: userData.nickName,
// // //         personalDetails: {
// // //           dob: userData.dob,
// // //           maritalStatus: userData.maritalStatus,
// // //           aboutMe: userData.aboutMe,
// // //         },
// // //         identityInfo: {
// // //           uan: userData.uan,
// // //           pan: userData.pan,
// // //           aadhaar: userData.aadhaar,
// // //           passport: userData.passport,
// // //         },
// // //         educationDetails: userData.educationDetails,
// // //         dependentDetails: [
// // //           {
// // //             dependentName: userData.dependentName,
// // //             dependentRelation: userData.dependentRelation,
// // //             dependentDob: userData.dependentDob,
// // //           },
// // //         ],
// // //       };

// // //       data.employeeId = employeedata.employeeId;

// // //       const response = await makeNetworkCall(data, "updateEmployee", "headers");
// // //       const { detail } = await makeNetworkCall(
// // //         {
// // //           totalAttendanceFilters: {
// // //             year: "",
// // //             month: "",
// // //             fromDate: "",
// // //             toDate: "",
// // //           },
// // //         },
// // //         "getEmployeeData",
// // //         "headers"
// // //       );

// // //       setSingleEmployeeProfile(detail.profile);
// // //       setRedirect(true);
// // //       toastOptions.success(response.detail || "Profile Updated Successfully");
// // //     } catch (error) {
// // //       toastOptions.error(
// // //         error?.error?.response?.data?.detail || "Error Occured"
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //       setLoadingTerm("");
// // //     }
// // //   };

// // //   if (redirect) {
// // //     return <Navigate to="/profile" />;
// // //   }

// // //   return (
// // //     <>
// // //       {Object.keys(formData).length > 0 ? (
// // //         <ReusableProfileForm
// // //           form={formData}
// // //           type={"Update Profile"}
// // //           submit={handleSubmit}
// // //         />
// // //       ) : (
// // //         <Loader />
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default EmployeeProfileUpdate;
// // import React, { useEffect, useState } from "react";
// // import "./EmployeeProfileUpdate";

// // import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
// // import { useStateContext } from "../../Contexts/StateContext";
// // import { flatternObject } from "../../../Utils/Helpers";

// // import Loader from "../../Loader/Loader";
// // import EmployeeDataSchema, { ExpirementSchema } from "../../AllSchema/EmployeeSchema";
// // import { makeNetworkCall } from "../../../HttpServices/HttpService";
// // import { useFunctionContext } from "../../Contexts/FunctionContext";
// // import { toastOptions } from "../../../Utils/FakeRoutes";
// // import { Navigate, useNavigate } from "react-router";
// // import { backEndCallObjNothing } from "../../../services/mainService";

// // const EmployeeProfileUpdate = () => {
// //   const {
// //     setLoadingTerm,
// //     setLoading,
// //     employeedata,
// //     singleEmployeeProfile,
// //     setSingleEmployeeProfile,
// //   } = useStateContext();
// //   const { checkErrors } = useFunctionContext();
// //   const [formData, setFormData] = useState({});
// //   const [redirect, setRedirect] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (employeedata?.profile && Object.keys(employeedata.profile).length > 0) {
// //       setSingleEmployeeProfile(employeedata.profile);
// //     }
// //   }, [employeedata, setSingleEmployeeProfile]);

// //   useEffect(() => {
// //     if (Object.keys(singleEmployeeProfile).length > 0) {
// //       const {
// //         basic_info,
// //         contact_details,
// //         dependent_details,
// //         educational_details,
// //         employee_id,
// //         identity_info,
// //         personal_details,
// //         work_experience,
// //         work_info,
// //       } = singleEmployeeProfile;

// //       const newObj = {
// //         ...basic_info,
// //         ...contact_details,
// //         ...personal_details,
// //         ...identity_info,
// //         employeeId: employee_id,
// //         date_of_join: work_info.date_of_join,
        
// //         employment_type: work_info.employment_type
// // ,
// //         location: work_info.location_id,
// //         shift: work_info.shift_id,

// //         department_id: work_info.department_id,
// //         designation_id: work_info.designation_id,
// //         role_id: work_info.role_id,
// //         reportingManager: work_info.reporting_manager_id,
// //         sourceOfHire: work_info.source_of_hire,
// //       };

// //       let form = flatternObject(newObj);
// //       form.educationalDetails = educational_details;
// //       form.work_experience = work_experience;
// //       form.dependent_details = dependent_details;

// //       setFormData(form);
// //     }
// //   }, [singleEmployeeProfile]);

// //   const handleSubmit = async (userData) => {
// //     try {
// //       setLoading(true);
// //       setLoadingTerm("Update Profile");
// //       await checkErrors(ExpirementSchema, userData);

// //       const data = {
// //         ...userData,
// //         employeeId: userData.employeeId,
// //         personalDetails: {
// //           date_of_birth: userData.date_of_birth,
// //           marital_status: userData.marital_status,
// //           about_me: userData.about_me,
// //         },
// //         identityInfo: {
// //           uan: userData.uan,
// //           pan: userData.pan,
// //           aadhaar: userData.aadhaar,
// //           passport: userData.passport,
// //         },
// //         educationDetails: userData.educationalDetails,
// //         work_experience: userData.work_experience,
// //         dependentDetails: userData.dependentDetails,
// //       };

// //       const response = await backEndCallObjNothing(`/emp/edit_profile
// //         `, data);
// //       // const { detail } = await makeNetworkCall(
// //       //   {
// //       //     totalAttendanceFilters: {
// //       //       year: "",
// //       //       month: "",
// //       //       fromDate: "",
// //       //       toDate: "",
// //       //     },
// //       //   },
// //       //   "getEmployeeData",
// //       //   "headers"
// //       // );

// //       setSingleEmployeeProfile(response.profile);
// //       setRedirect(true);
// //       toastOptions.success(response.detail || "Profile Updated Successfully");
// //     } catch (error) {
// //       toastOptions.error(
// //         error?.error?.response?.data?.detail || "Error Occurred"
// //       );
// //     } finally {
// //       setLoading(false);
// //       setLoadingTerm("");
// //     }
// //   };

// //   if (redirect) {
// //     return <Navigate to="/profile" />;
// //   }

// //   return (
// //     <>
// //       {Object.keys(formData).length > 0 ? (
// //         <ReusableProfileForm
// //           form={formData}
// //           type={"Update Profile"}
// //           submit={handleSubmit}
// //         />
// //       ) : (
// //         <Loader />
// //       )}
// //     </>
// //   );
// // };

// // export default EmployeeProfileUpdate;

// import React, { useEffect, useState } from "react";
// import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
// import { useStateContext } from "../../Contexts/StateContext";
// import { flatternObject } from "../../../Utils/Helpers";
// import Loader from "../../Loader/Loader";
// import { ExpirementSchema } from "../../AllSchema/EmployeeSchema";
// import { useFunctionContext } from "../../Contexts/FunctionContext";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import { Navigate, useNavigate } from "react-router";
// import { backEndCallObjNothing } from "../../../services/mainService";
// import { format, parse } from "date-fns";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
// import { publicIpv4 } from "public-ip";
// import { fullBrowserVersion } from "react-device-detect";

// const EmployeeProfileUpdate = () => {
//   const {
//     setLoadingTerm,
//     setLoading,
//     employeedata,
//     singleEmployeeProfile,
//     setSingleEmployeeProfile,
//     orgDetails,
//   } = useStateContext();
//   const { checkErrors } = useFunctionContext();
//   const [formData, setFormData] = useState({});
//   const [redirect, setRedirect] = useState(false);
//   const [browserId, setBrowserId] = useState(""); // Assuming browserId is set elsewhere
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getBrowserId = async () => {
//       const fp = await FingerprintJS.load();
//       const result = await fp.get();
//       setBrowserId(result.visitorId.toString());
//     };
//     getBrowserId();
//   }, []);

//   useEffect(() => {
//     const fetchIpAndBrowserDetails = async () => {
//       try {
//         const ip = await publicIpv4();
//         setFormData(prevData => ({
//           ...prevData,
//           last_ip: ip,
//           device_id: fullBrowserVersion,
//           browserid: browserId,
//           fcm_token: "staging", // Replace with actual FCM token if available
//         }));
//       } catch (error) {
//         console.error("Error fetching IP or browser details:", error);
//       }
//     };

//     if (browserId) {
//       fetchIpAndBrowserDetails();
//     }
//   }, [browserId]);

//   useEffect(() => {
//     if (employeedata?.profile && Object.keys(employeedata.profile).length > 0) {
//       setSingleEmployeeProfile(employeedata.profile);
//     }
//   }, [employeedata, setSingleEmployeeProfile]);

//   const convertDate = (dateString) => {
//     const parsedDate = parse(dateString, "ddMMyyyy", new Date());
//     return format(parsedDate, "yyyy-MM-dd");
//   };

//   useEffect(() => {
//     if (Object.keys(singleEmployeeProfile).length > 0) {
//       const {
//         basic_info,
//         work_info,
//         personal_details,
//         identity_info,
//         contact_details,
//         work_experience,
//         educational_details,
//         dependent_details,
//         employee_id,
//       } = singleEmployeeProfile;

//       delete work_info.shift_name;
//       delete work_info?.designation_name;
//       delete work_info?.department_name;
//       delete work_info?.role_name;
//       delete work_info?.reporting_manager;

//       const newObj = {
//         basic_info,
//         work_info,
//         personal_details,
//         identity_info,
//         contact_details,
//         educational_details
//       };

//       const form = flatternObject(newObj);
//       form.date_of_birth = convertDate(personal_details?.date_of_birth);
//       form.reporting_manager = work_info.reporting_manager;
//       form.work_experience = work_experience;
//       form.educational_details = educational_details;
//       form.dependent_details = dependent_details;
//       form.employee_id = employee_id;

//       setFormData(form);
//     }
//   }, [singleEmployeeProfile]);

//   const handleSubmit = async (userData) => {
//     try {
//       setLoading(true);
//       setLoadingTerm("Update Profile");

//       // Ensure the essential fields are set
//       await checkErrors(ExpirementSchema, userData);

//       const data = {
//         organisation_id: orgDetails?.organisation_id,
//         employee_id: formData?.employee_id,
//         nick_name: formData?.nick_name || "",
//         expertise: formData?.expertise || "",
//         marital_status: formData?.marital_status,
//         about_me: formData?.about_me || "",
//         identity_info: {
//           uan: formData?.uan || "",
//           pan: formData?.pan || "",
//           aadhaar: formData?.aadhaar || "",
//           passport: formData?.passport || "",
//         },
//         work_phone_number: formData?.work_phone_number || "",
//         personal_mobile_number: formData?.personal_mobile_number,
//         personal_email_address: formData?.personal_email_address,
//         work_experience: formData?.work_experience || [],
//         educational_details: formData?.educational_details || [],
//         dependent_details: formData?.dependent_details || [],
//         educational_details: formData.institute_name ? [{
//           institute_name: formData.institute_name,
//           degree: formData.degree,
//           specialization: formData.specialization,
//           year_of_completion: formData.year_of_completion,
//         }] : [],
//         last_ip: formData?.last_ip || "",
//         browserid: formData?.browserid || "",
//         fcm_token: formData?.fcm_token || "",
//         device_id: formData?.device_id || "",
//       };

//       const response = await backEndCallObjNothing(`/emp/edit_profile`, data);

//       setSingleEmployeeProfile(response.profile);
//       setRedirect(true);
//       toastOptions.success(response.detail || "Profile Updated Successfully");
//     } catch (error) {
//       console.error("Error in profile update:", error);
//       toastOptions.error(error?.response?.data || "Error Occurred");
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/profile" />;
//   }
// console.log(formData,"formdata")
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
import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
import { useStateContext } from "../../Contexts/StateContext";
import { flatternObject } from "../../../Utils/Helpers";
import Loader from "../../Loader/Loader";
import { EditShema, identityInfoSchema } from "../../AllSchema/EmployeeSchema";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { Navigate } from "react-router";
import { backEndCallObjNothing } from "../../../services/mainService";
import { format, parse } from "date-fns";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { publicIpv4 } from "public-ip";
import { fullBrowserVersion } from "react-device-detect";
const EmployeeProfileUpdate = ({ form }) => {
  {
    console.log(form, "form");
  }
  const {
    setLoadingTerm,
    setLoading,
    employeedata,
    singleEmployeeProfile,
    setSingleEmployeeProfile,
    orgDetails,
  } = useStateContext();
 
  const { checkErrors } = useFunctionContext();

  const [formData, setFormData] = useState(form || {});
  const [redirect, setRedirect] = useState(false);
  const [browserId, setBrowserId] = useState("");
  const[btndisabled,setButtonDisabled]=useState(false)
  useEffect(() => {
    const getBrowserId = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setBrowserId(result.visitorId.toString());
    };
    getBrowserId();
  }, []);

  useEffect(() => {
    const fetchIpAndBrowserDetails = async () => {
      try {
        const ip = await publicIpv4();
        setFormData((prevData) => ({
          ...prevData,
          last_ip: ip,
          device_id: fullBrowserVersion,
          browserid: browserId,
          fcm_token: "staging",
        }));
      } catch (error) {
        console.error("Error fetching IP or browser details:", error);
      }
    };

    if (browserId) {
      fetchIpAndBrowserDetails();
    }
  }, [browserId]);

  useEffect(() => {
    if (employeedata?.profile && Object.keys(employeedata.profile).length > 0) {
      setSingleEmployeeProfile(employeedata.profile);
    }
  }, [employeedata, setSingleEmployeeProfile]);

  const convertDate = (dateString) => {
    const parsedDate = parse(dateString, "ddMMyyyy", new Date());
    return format(parsedDate, "yyyy-MM-dd");
  };

  useEffect(() => {
    if (Object.keys(singleEmployeeProfile).length > 0) {
      const {
        basic_info,
        work_info,
        personal_details,
        identity_info,
        contact_details,
        work_experience,
        educational_details,
        dependent_details,
        employee_id,
      } = singleEmployeeProfile;

      console.log(singleEmployeeProfile,"singleemploye profile")
     
      // delete work_info.shift_name;
      // delete work_info?.designation_name;
      // delete work_info?.department_name;
      // delete work_info?.role_name;
      // delete work_info?.reporting_manager;

      const newObj = {
        basic_info,
        work_info,
        personal_details,
        identity_info,
        contact_details,
        educational_details,
      };

      const form = flatternObject(newObj);
      form.date_of_birth = convertDate(personal_details?.date_of_birth);
      
      form.reporting_manager = work_info.reporting_manager;
      form.department_name = work_info.department_name;
      form.designation_name = work_info.designation_name;
      form.role_name = work_info.role_name;


      form.work_experience = work_experience;
      form.educational_details = educational_details || [];
      form.dependent_details = dependent_details;
      form.employee_id = employee_id;

      setFormData(form);
    }
  }, [singleEmployeeProfile]);

  {
    console.log(formData, "dating");
  }

  const handleSubmit = async (userData) => {
    console.log(userData, "data sent to backend successfully");

    try {
      setLoading(true);
      setButtonDisabled(true)
      setLoadingTerm("Update Profile");

      // Create a new object with only the required fields
      const filteredUserData = {
        organisation_id: orgDetails?.organisation_id,

        // reporting_manager: formData?.reporting_manager,

        employee_id: userData?.employee_id,
        educational_details: userData.educational_details,
        dependent_details: userData.dependent_details,
        work_experience: userData.work_experience,
        nick_name: userData.nick_name,
        expertise: userData.expertise,
        marital_status: userData.marital_status,
        about_me: userData.about_me,


        identity_info: {
          uan: formData?.uan,
          pan: formData?.pan ,
          aadhaar: formData?.aadhaar,
          passport: formData?.passport ,
        },
        //   identity_info: {
        //   uan: userData?.uan || "",
        //   pan: userData?.pan || "",
        //   aadhaar: userData?.aadhaar || "",
        //   passport: userData?.passport || "",
        // },
        
        work_phone_number: userData.work_phone_number,
        personal_mobile_number: userData.personal_mobile_number,
        personal_email_address: userData.personal_email_address,
        last_ip: formData.last_ip,
        browserid: formData.browserid,
        fcm_token: formData.fcm_token,
        device_id: formData.device_id,
      };
      console.log(formData,"formdata")
      {
        console.log(filteredUserData, "data");
      }
      // Validate against schema
      await EditShema.validateAsync(filteredUserData, { abortEarly: false });

      // Proceed with the API call if validation is successful
      const res = await backEndCallObjNothing(
        "/emp/edit_profile",
        filteredUserData
      );
      console.log(res, "API response");
      toastOptions.success(res.success);
      setRedirect(true); // This should display the message
      setButtonDisabled(false)
    } catch (error) {
      console.error("Error updating profile:", error);
      toastOptions.error(error?.response?.data)
      setButtonDisabled(false)
      // Handle validation errors
      if (error.isJoi) {
        error.details.forEach((err) => console.log(err.message));
      }
    } finally {
      setLoading(false);
      setButtonDisabled(false)
    }
  };

  if (redirect) {
    return <Navigate to="/profile" />;
  }
 
  // if (Object.keys(singleEmployeeProfile).length === 0 || singleEmployeeProfile === null) {
  //   return <Navigate to="/profile" />;
  // }

  return (
    <div>
      {Object.keys(formData).length > 0 ? (
        <ReusableProfileForm
          form={formData}

          type="Update Profile"
          submit={handleSubmit}
          disabled={btndisabled} 
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EmployeeProfileUpdate;
