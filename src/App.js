import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useStateContext } from "./components/Contexts/StateContext";

import {
  isEmployeeRouter,
  isSuperAdminRouter,
  // isManagerRouter,
  // isSuperAdminRouter,
  // isTeamLeadRouter,
} from "./Utils/Routers";
// import AdminProjects from "./components/AdminRoutes/Management/AdminProjects";

const App = () => {
  const { employeeDetails } = useStateContext(); // Getting the Employeedetails to render the routter

  //This function will create the router based on the employee type and admin status
  const mainRouter = () => {
    // if (employeeDetails && employeeDetails.collection === 'USER') {
    return isSuperAdminRouter;
    // } else if (
    //   employeeDetails.employeeId &&
    //   employeeDetails.adminType === '2'
    // ) {
    //   return isManagerRouter;
    // } else if (
    //   employeeDetails.employeeId &&
    //   employeeDetails.adminType === '3'
    // ) {
    //   return isTeamLeadRouter;
    // } else {
    //   return isEmployeeRouter;
    // }
  };

  const [actualRouter, setActualRouter] = useState(mainRouter());

  // ActualRouter is state is responsibel to render the state when the user employee opne the application

  // This useeffect will trigger when ever the employee details changes , to update the actual router based on user admin type and status and redner the router into the dom
  useEffect(() => {
    if (Object.keys(employeeDetails).length > 0) {
      setActualRouter(mainRouter());
    }
  }, [employeeDetails]);

  // The browser router function is responsible to create the router given but the react-router-dom
  const router = createBrowserRouter(actualRouter);
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
