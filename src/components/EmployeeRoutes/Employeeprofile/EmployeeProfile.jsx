// import React, { useEffect, useState } from "react";
// import { useStateContext } from "../../Contexts/StateContext";
// import SingleEmployeeProfile from "../../AdminRoutes/AdminFetchingSingleEmployeeData/SingleEmployeeProfile/SingleEmployeeProfile";
// import Loader from "../../Loader/Loader";
// import { useNavigate } from "react-router";

// const EmployeeProfile = () => {
//   const { singleEmployeeProfile } = useStateContext();
//   const navigate = useNavigate();
//   console.log(singleEmployeeProfile, "simgleemployeeprodfile");

//   return (
//     <>
//       {Object.keys(singleEmployeeProfile).length > 0 ? (
//         <section className="employee_profile">
//           <div className="employee_profile_edit">
//             <br />
//             <button onClick={() => navigate("/profile_update")}>Edit</button>
//           </div>
//           <SingleEmployeeProfile employeeProfileData={singleEmployeeProfile} />
//         </section>
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// };

// export default EmployeeProfile;

import React, { useEffect, useState } from "react";
import { backEndCallObjNothing } from "../../../services/mainService";
import SingleEmployeeProfile from "../../AdminRoutes/AdminFetchingSingleEmployeeData/SingleEmployeeProfile/SingleEmployeeProfile";
import AdminSingleEmployeeData from "../../AdminRoutes/AdminFetchingSingleEmployeeData/AdminSingleEmployeeData";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import Loader from "../../Loader/Loader";

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
      console.log(response); // Log the response
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  const gettingEmployeeProfileId = async () => {
    try {
      const response = await backEndCallObjNothing("/emp_get/get_profile", 
       
      );
      console.log(response, "rrrrrr");
      setProfilePhoto(response?.profile?.images?.dp);
      setEmployeedata(response); // Update state correctly
      console.log("profile",response); // Log the response
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    // if (employeeDetails.collection === "USER") {
    //   gettingEmployeeById();
    // } else {
    gettingEmployeeProfileId();
    // }
  });
  console.log(employeedata, "eeemployee");
  return (
    <div className="single-employee-header">
      {employeedata ? (
        <SingleEmployeeProfile employeeProfileData={employeedata} />
      ):<Loader></Loader>}
    </div>
  );
}

export default EmployeeProfile;
