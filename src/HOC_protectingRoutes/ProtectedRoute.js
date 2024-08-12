import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../components/Contexts/StateContext";

const AuthenticatedRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  console.log(employeeDetails, "employeeDetails")
  return employeeDetails?.role_name || employeeDetails?.role_name ? (
    <>{children}</>
  ) : (
    <Navigate to="/loginForm" />
  );
};

export const AdminRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  const isAdmin =
    Object.keys(employeeDetails).length > 0
      ? employeeDetails?.collection
      : "USER";
  return isAdmin === "USER" ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;

export const EmployeeRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  console.log(employeeDetails, "employeeDetails");
  let isNormalEmployee = true;
  // if (
  //   // employeeDetails.isAdmin === false &&
  //   // employeeDetails.adminType === '0' &&
  //   employeeDetails.userid
  // ) {
  //   isNormalEmployee = true;
  // }
  return isNormalEmployee ? <>{children} </> : <Navigate to="/login" />;
};

export const IsSuperAdminRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  let isAdminType1 = true;

  // if (
  // employeeDetails.isAdmin &&
  // employeeDetails.collection === 'USER' &&
  //   employeeDetails.userid
  // ) {
  //   isAdminType1 = true;
  // }
  return isAdminType1 ? <>{children}</> : <Navigate to="/login" />;
};

export const IsManagerRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  let isAdminType2 = true;
  // if (
  //   // employeeDetails.isAdmin &&
  //   // employeeDetails.adminType === '2' &&
  //   employeeDetails.userid
  // ) {
  //   isAdminType2 = true;
  // }

  return isAdminType2 ? <>{children}</> : <Navigate to="/login" />;
};

export const IsTeamLeadRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  let isAdminType3 = true;
  // if (
  //   // employeeDetails.isAdmin &&
  //   // employeeDetails.adminType === '3' &&
  //   employeeDetails.userid
  // ) {
  //   isAdminType3 = true;
  // }
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

export const FakeEmployeeRoute = ({ children }) => {
  const { employeeDetails } = useStateContext();
  let isNormalEmployee;
  const isAdmin = employeeDetails.isAdmin;
  const id = employeeDetails.employeeId;
  if (isAdmin === false && id) {
    isNormalEmployee = true;
  }
  return isNormalEmployee ? <>{children} </> : <Navigate to="/loginForm" />;
};
