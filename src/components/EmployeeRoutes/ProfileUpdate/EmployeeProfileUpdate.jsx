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
  const [btndisabled, setButtonDisabled] = useState(false);
  const [disableobj, setdisableobj] = useState(false);
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

  const handleSubmit = async (userData) => {
    console.log(userData, "data sent to backend successfully");

    try {
      setLoading(true);
      setButtonDisabled(true);

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
          pan: formData?.pan,
          aadhaar: formData?.aadhaar,
          passport_number: formData?.passport_number,
        },
        //   identity_info: {
        //   uan: userData?.uan || "",
        //   pan: userData?.pan || "",
        //   aadhaar: userData?.aadhaar || "",
        //   passport: userData?.passport || "",
        // },

        mobile_number: userData.mobile_number,
        personal_mobile_number: userData.personal_mobile_number,
        personal_email_address: userData.personal_email_address,
        last_ip: formData.last_ip,
        browserid: formData.browserid,
        fcm_token: formData.fcm_token,
        device_id: formData.device_id,
      };
      console.log(formData, "formdata");
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
      setButtonDisabled(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toastOptions.error(error?.response?.data);
      setButtonDisabled(false);
      // Handle validation errors
      if (error.isJoi) {
        error.details.forEach((err) => console.log(err.message));
      }
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  if (redirect) {
    return <Navigate to="/profile" />;
  }

  if (
    Object.keys(singleEmployeeProfile).length === 0 ||
    singleEmployeeProfile === null
  ) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      {Object.keys(formData).length > 0 ? (
        <ReusableProfileForm
          form={formData}
          type="Update Profile"
          submit={handleSubmit}
          disabled={btndisabled}
          disableobj={{ password: false }}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EmployeeProfileUpdate;
