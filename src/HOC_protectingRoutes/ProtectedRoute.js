import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../components/Contexts/StateContext";

const AuthenticatedRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  return employeeDetails?.role_name || employeeDetails?.role_name ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

// export const AdminRoute = ({ children }) => {
//   const { employeeDetails } = useStateContext();
//   console.log(employeeDetails, "employeedetails")

//   const isAdmin =
//     Object.keys(employeeDetails).length > 0
//       ? employeeDetails?.collection
//       : "USER";
//   return isAdmin === "USER" ? <>{children}</> : <Navigate to="/login" />;
// };
// import { Navigate } from "react-router-dom";
// import { useStateContext } from "../context/StateContext";

export const AdminRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  console.log(employeeDetails, "employeeDetails");

  // Check if the employee is an admin based on their role_name
  const isAdmin =
    employeeDetails && employeeDetails.role_name === "1"
      ? "ADMIN"
      : "EMPLOYEE";

  // If the user is an admin (Director), allow access to children components
  // Otherwise, redirect to the login page
  return isAdmin === "ADMIN" ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;

export const EmployeeRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  console.log(employeeDetails, "employeeDetails");
  let isNormalEmployee = true;
  if (
    // employeeDetails.isAdmin === false &&
    employeeDetails.adminType === '4'
    // employeeDetails.userid
  ) {
    isNormalEmployee = true;
  }
  return isNormalEmployee ? <>{children} </> : <Navigate to="/login" />;
};

export const IsSuperAdminRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  let isAdminType1 = true;

  if (
    // employeeDetails.isAdmin &&
    employeeDetails.admin_type === '1'
    // &&
    // employeeDetails.userid
  ) {
    isAdminType1 = true;
  }
  return isAdminType1 ? <>{children}</> : <Navigate to="/login" />;
};

export const IsManagerRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  let isAdminType2 = true;
  if (
    // employeeDetails.isAdmin &&
    employeeDetails.admin_type === "2"
    // employeeDetails.userid
  ) {
    isAdminType2 = true;
  }

  return isAdminType2 ? <>{children}</> : <Navigate to="/login" />;
};

export const IsTeamLeadRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  let isAdminType3 = true;
  if (
    // employeeDetails.isAdmin &&
    employeeDetails.admin_type === '3'
    // employeeDetails.userid
  ) {
    isAdminType3 = true;
  }
  return isAdminType3 ? <>{children}</> : <Navigate to="/login" />;
};

/*



  const isNotAdmin = Object.keys(employeeDetails).length > 0 && employeeDetails?.isAdmin === false;
  return isNotAdmin  ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

*/

// export const FakeEmployeeRoute = ({ children }) => {
//   const { employeeDetails } = useStateContext();
//   let isNormalEmployee;
//   const isAdmin = employeeDetails.isAdmin;
//   const id = employeeDetails.employeeId;
//   if (isAdmin === false && id) {
//     isNormalEmployee = true;
//   }
//   return isNormalEmployee ? <>{children} </> : <Navigate to="/loginForm" />;
// };
