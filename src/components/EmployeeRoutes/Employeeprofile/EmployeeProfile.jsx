import React, { useEffect, useState } from "react";
import { backEndCallObjNothing } from "../../../services/mainService";
import SingleEmployeeProfile from "../../AdminRoutes/AdminFetchingSingleEmployeeData/SingleEmployeeProfile/SingleEmployeeProfile";
import AdminSingleEmployeeData from "../../AdminRoutes/AdminFetchingSingleEmployeeData/AdminSingleEmployeeData";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
// import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
function EmployeeProfile({ employeesList }) {
  // Getting the Employeedetails to render the routter
  const { setProfilePhoto } = useStateContext();
  // const [employeedata, setEmployeedata] = useState(null);

  const { employeeDetails, employeedata, setEmployeedata } = useStateContext();

  const gettingEmployeeById = async () => {
    try {
      const response = await backEndCallObjNothing("/user_get/get_emp_by_id", {
        employee_id: employeeDetails?.employee_id || "",
      });
      setEmployeedata(response); // Update state correctly
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const gettingEmployeeProfileId = async () => {
    try {
      // if (!employeedata) {
      const response = await backEndCallObjNothing("/emp_get/get_profile");

      setProfilePhoto(response?.profile?.images?.dp);
      setEmployeedata(response); // Update state correctly
      // }
      // Log the response
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    // if (employeeDetails.collection === "USER") {
    //   gettingEmployeeById();
    // } else {
    if (!employeedata) {
      gettingEmployeeProfileId();
    }
    // }
  }, []);

  return (
    <div className="single-employee-header">
      {employeedata ? (
        <SingleEmployeeProfile employeeProfileData={employeedata} />
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
}

export default EmployeeProfile;
