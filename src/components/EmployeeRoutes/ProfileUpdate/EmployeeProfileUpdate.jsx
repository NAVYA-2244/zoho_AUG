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
    employeeData,
    employeeDetails,
    singleEmployeeProfile,
    setSingleEmployeeProfile,
  } = useStateContext();
  const { checkErrors } = useFunctionContext();
  const [formData, setFormData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(employeeData).length > 0) {
      const {
        banner,
        profilePhoto,
        employeeId,
        dependentDetails,
        contactDetails,
        gender,
        identityInfo,
        educationDetails,
        email,
        firstName,
        lastName,
        nickName,
        personalDetails,
        workExperience,
        workInfo,
        reportingManager,
        dateOfExit,
      } = singleEmployeeProfile;

      const newObj = {
        ...dependentDetails,
        gender,
        contactDetails,
        identityInfo,
        email,
        firstName,
        lastName,
        nickName,
        personalDetails,
        dateOfExit,
      };
      newObj.dateOfJoining = workInfo.dateOfJoining;
      newObj.employmentType = workInfo.employmentType;
      newObj.location = workInfo.location.locationId;
      newObj.shift = workInfo.shift.shiftId;
      newObj.department = workInfo.department.departmentId;
      newObj.designation = workInfo.designation.designationId;
      newObj.role = workInfo.role.roleId;
      newObj.reportingManager = reportingManager.employeeId;
      newObj.sourceOfHire = workInfo.sourceOfHire;

      let form = flatternObject(newObj);
      form.educationDetails = educationDetails;
      form.workExperience = workExperience;
      form.banner = banner;
      form.profilePhoto = profilePhoto;
      form.employeeId = employeeId;

      setFormData(form);
    }
  }, [employeeData]);

  const handleSubmit = async (userData) => {
    try {
      setLoading(true);
      setLoadingTerm("Update Profile");
      await checkErrors(ExpirementSchema, userData);
      const data = {
        profilePhoto:userData.profilePhoto,
        banner:userData.banner,
        nickName: userData.nickName,
        personalDetails: {
          dob: userData.dob,
          maritalStatus: userData.maritalStatus,
          aboutMe: userData.aboutMe,
        },
        identityInfo: {
          uan: userData.uan,
          pan: userData.pan,
          aadhaar: userData.aadhaar,
          passport: userData.passport,
        },
        educationDetails: userData?.educationDetails,
        dependentDetails: [
          {
            dependentName: userData.dependentName,
            dependentRelation: userData.dependentRelation,
            dependentDob: userData.dependentDob,
          },
        ],
      };

      data.employeeId = employeeDetails.employeeId;
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
      setLoadingTerm("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setLoadingTerm("")
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured"
      );
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      {Object.keys({ ...formData }).length > 0 ? (
        <ReusableProfileForm
          form={formData}
          type={"Update Profile"}
          submit={handleSubmit}
        />
      ) : (
        // <h2>hello world</h2>
        <Loader />
      )}
    </>
  );
};

export default EmployeeProfileUpdate;
