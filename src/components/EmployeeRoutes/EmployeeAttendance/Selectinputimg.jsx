// import React, { Fragment, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import dummyUser from "../../../assets/Header/dummy-user.jpg";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { useFunctionContext } from "../../Contexts/FunctionContext";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import { backEndCallObjNothing } from "../../../services/mainService";

// const fakeData = [
//   { label: "sudheer@gmail.com", value: "CG1234" },
//   { label: "stany@gmail.com", value: "CG1235" },
//   { label: "harish@gmail.com", value: "CG1236" },
//   { label: "suresh@gmail.com", value: "CG123457" },
//   { label: "kinder@gmail.com", value: "Cg123458" },
// ];

// function Selectinputimg() {
//   const [allEmployeeIds, setAllEmployeeIds] = useState([]);
//   const [filteredEmployeeIds, setFilteredEmployeeIds] = useState([]);
//   const { employeeDetails, adminData2 } = useStateContext();
//   const [EmployeesListforleave, setEmployeesListforleave] = useState([]);
//   const navigate = useNavigate();

//   console.log(employeesList, "image");

//   const [selectedEmployee, setSelectedEmployee] = useState({
//     email: employeeDetails.email,
//     id: employeeDetails.userid,
//   });

//   console.log("employeeDetails", "eee");

//   useEffect(() => {
//     const fetchingData = async () => {
//       try {
//         let { all_emps } = await backEndCallObjNothing(
//           "/org/get_team_for_task"
//         );
//         console.log(all_emps, "data");
//         setEmployeesListforleave(all_emps);
//       } catch (error) {
//         toastOptions.error(error?.response?.data || "something went wrong");
//       }
//     };
//     fetchingData();
//   }, []);

//   const { applicationColor } = useThemeContext();
//   const { mainAdmin } = useFunctionContext();
//   const [options, setOptions] = useState([]);
//   const [filterOptions, setFilterOptions] = useState(employeesList);
//   useEffect(() => {
//     if (mainAdmin) {
//       setOptions(employeesList);
//     } else {
//       setOptions([
//         { label: employeeDetails.email, value: employeeDetails.userid },
//       ]);
//     }
//   }, []);
//   useEffect(() => {
//     if (
//       employeeDetails.adminType === "1" &&
//       Object.keys(adminData2).length > 0
//     ) {
//       const formattedEmployeeData = adminData2.employeeData.map((emp) => ({
//         value: emp.employee_id,
//         label: emp.first_name,
//       }));

//       setAllEmployeeIds(formattedEmployeeData);
//       setFilteredEmployeeIds(formattedEmployeeData);
//       // console.log("Formatted Employee Data:", formattedEmployeeData);
//     }
//   }, [adminData2, employeeDetails]);

//   const handleChange = (event) => {
//     if (mainAdmin) {
//       const searchQuery = event.target.value.toLowerCase();
//       const filtered = employeesList.filter((employee) =>
//         employee.label.toLowerCase().includes(searchQuery)
//       );
//       setOptions(filtered);
//     } else return;
//   };
//   const fetchLeaveApplications = useCallback(async () => {
//     console.log("admingadminGettingLeaveApplicationset",adminGettingLeaveApplications );
//     setLoading(true);

//     try {
//       setBtndisabled(true);
//       if (!adminGettingLeaveApplications) {
       
//         const response = await backEndCallObjNothing(
//           "/admin_get/all_leave_applications",
//           {
//             skip: 0, // Adjust skip to match API expectations (if needed)
//             leave_status: formData.status,
//             year: formData.year,
//             employee_id: formData.employee_id, // Pass employee_id filter if needed
//           }
//         );
//         setAdminGettingLeaveApplications(response.leaveApplications);
//         setLeavescount(response.leaves);
//       }

//       // console.log(response,"response")
//       // if (response.data.length < limit) {
//       //   setHasMore(false);
//       // }
//       setBtndisabled(false);
//     } catch (error) {
//       console.error("Error fetching leave applications:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [skip, limit, formData, setAdminGettingLeaveApplications]);

//   const handleSelect = (employee) => {
//     setSelectedEmployee({
//       id: employee.employee_id,
//       email: employee.first_name,
//     });
//     console.log(employee, "employee");
//   };

//   return (
//     <Fragment>
//       <div
//         style={{
//           background: applicationColor.cardBg1,
//           color: applicationColor.readColor1,
//         }}
//         className="dropdown my-3"
//       >
//         <Link
//           className="user-image dropdown-toggle employye-image"
//           role="button"
//           data-bs-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <div className="dropdown-header">
//             <img
//               src={dummyUser}
//               alt="userImage"
//               width="30px"
//               height="30px"
//               className="rounded-circle"
//             />
//             <div className="details">
//               <span className="email">{`${selectedEmployee.email}`}</span>
//               <span className="id">{selectedEmployee.id}</span>
//             </div>
//           </div>
//         </Link>

//         <ul className="dropdown-menu user-dropdown">
//           <div className="dropdown-header">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="dropdown-input"
//               id="dropdown-input"
//               onChange={handleChange}
//             />
//           </div>
//           <li className="dropdown-content" id="dropdown-content">
//             {employeesList?.map((i, index) => {
//               return (
//                 <div
//                   key={i.value}
//                   className="dropdown-item"
//                   onClick={() => handleSelect(i)}
//                 >
//                   <img
//                     src={dummyUser}
//                     alt="item2image"
//                     width="40px"
//                     height="40px"
//                     className="dropdown-item-image rounded-circle"
//                   />
//                   <div>
//                     <h5
//                       onClick={() =>
//                         navigate(`/admin/employee/${i?.employee_id}`)
//                       }
//                     >
//                       {i.employee_id}
//                     </h5>

//                     {/* <h5>{i.first_name}</h5> */}
//                   </div>
//                 </div>
//               );
//             })}
//           </li>
//         </ul>
//       </div>
//     </Fragment>
//   );
// }
// export default Selectinputimg;
// import React, { Fragment, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import dummyUser from "../../../assets/Header/dummy-user.jpg";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import { backEndCallObjNothing } from "../../../services/mainService";

// function Selectinputimg() {
//   const [employeesList, setEmployeesList] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState({
//     name: "",
//     employee_id: "",
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   const { applicationColor } = useThemeContext();
//   const navigate = useNavigate();

//   // Filter employees based on search input
//   const handleChange = (event) => {
//     const query = event.target.value?.toLowerCase();
//     setSearchQuery(query);

//     // Filter employees based on first or last name
//     if (Array.isArray(employeesList)) {
//       const filtered = employeesList.filter((employee) =>
//         `${employee.basic_info.first_name} ${employee.basic_info.last_name}`
//           .toLowerCase()
//           .includes(query)
//       );
//       setFilteredEmployees(filtered);
//     } else {
//       console.error("employeesList is undefined or not an array");
//     }
//   };

//   // Handle employee selection
//   const handleSelect = async (employee) => {
//     setSelectedEmployee({
//       name: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`,
//       employee_id: employee.employee_id,
//     });

//     try {
//       // Send selected employee ID to the backend
//       const response = await backEndCallObjNothing("/admin_get/all_leave_applications", {
//         method: "POST",
//         body: JSON.stringify({ employee_id: employee.employee_id }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.success) {
//         toastOptions.success("Employee selected successfully");
//       } else {
//         toastOptions.error("Failed to select employee");
//       }
//     } catch (error) {
//       toastOptions.error("Something went wrong");
//     }
//   };

//   // Fetch all employees when the component mounts
//   useEffect(() => {
//     const fetchEmployeesData = async () => {
//       try {
//         const all_employees = await backEndCallObjNothing("/org/get_team_for_task");
//         if (Array.isArray(all_employees)) {
//           setEmployeesList(all_employees);
//           setFilteredEmployees(all_employees); // Display all employees initially
//         } else {
//           console.error("all_employees is undefined or not an array");
//         }
//       } catch (error) {
//         toastOptions.error(error?.response?.data || "something went wrong");
//       }
//     };
//     fetchEmployeesData();
//   }, []);

//   return (
//     <Fragment>
//       <div
//         style={{
//           background: applicationColor.cardBg1,
//           color: applicationColor.readColor1,
//           width: "300px", // Adjust the width as needed
//         }}
//         className="dropdown my-3"
//       >
//         <div className="dropdown-header">
//           <img
//             src={dummyUser}
//             alt="userImage"
//             width="30px"
//             height="30px"
//             className="rounded-circle"
//           />
//           <div className="details">
//             <span className="email">
//               {selectedEmployee.name || "Select Employee"}
//             </span>
//             <span className="id">
//               {selectedEmployee.employee_id || ""}
//             </span>
//           </div>
//         </div>

//         {/* Search input always visible */}
//         <div className="dropdown-header" style={{ padding: "10px" }}>
//           <input
//             type="text"
//             placeholder="Search employees..."
//             className="dropdown-input"
//             id="dropdown-input"
//             value={searchQuery}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "5px" }}
//           />
//         </div>

//         {/* Display dropdown list */}
//         <ul className="dropdown-menu user-dropdown" style={{ maxHeight: "300px", overflowY: "auto" }}>
//           {filteredEmployees.length === 0 ? (
//             <div className="no-results" style={{ padding: "10px" }}>
//               No employees found
//             </div>
//           ) : (
//             filteredEmployees.map((employee) => (
//               <li
//                 key={employee.employee_id}
//                 className="dropdown-item"
//                 onClick={() => handleSelect(employee)}
//                 style={{ display: "flex", alignItems: "center", padding: "10px", cursor: "pointer" }}
//               >
//                 <img
//                   src={dummyUser}
//                   alt="employeeImage"
//                   width="40px"
//                   height="40px"
//                   className="rounded-circle"
//                 />
//                 <div style={{ marginLeft: "10px" }}>
//                   {/* Display first and last name */}
//                   <h5>{`${employee.basic_info.first_name} ${employee.basic_info.last_name}`}</h5>
//                   <span>{employee.employee_id}</span>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </Fragment>
//   );
// }

// export default Selectinputimg;
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dummyUser from "../../../assets/Header/dummy-user.jpg";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../services/mainService";

function Selectinputimg({ setSelectedEmployeeId }) {
  const [employeesList, setEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const { employeeDetails } = useStateContext();
  const navigate = useNavigate();
  const { applicationColor } = useThemeContext();
  const { mainAdmin } = useFunctionContext();
  const [options, setOptions] = useState([]);

  // Fetching the list of employees
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const all_emps = await backEndCallObjNothing("/org/get_team_for_task");
        console.log(all_emps, "data");
        setEmployeesList(all_emps);
      } catch (error) {
        toastOptions.error(error?.response?.data || "Something went wrong");
      }
    };
    fetchingData();
  }, []);

  useEffect(() => {
    if (mainAdmin) {
      setOptions(employeesList);
    } else {
      setOptions([
        { label: employeeDetails?.basic_info?.email, value: employeeDetails?.employee_id },
      ]);
    }
  }, [mainAdmin, employeesList, employeeDetails]);

  // Handle search input change
  const handleChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filtered = employeesList.filter((employee) =>
      employee.basic_info?.first_name.toLowerCase().includes(searchQuery) 
      // employee.basic_info?.email.toLowerCase().includes(searchQuery) ||
      // employee.work_info.role_name.toLowerCase().includes(searchQuery)
    );
    setOptions(filtered);
  };

  // Handle employee selection and pass the selected employee ID to the parent component
  const handleSelect = (employee) => {
    setSelectedEmployee({
      id: employee.employee_id,
      email: employee?.basic_info?.email,
      name: `${employee?.basic_info?.first_name} ${employee?.basic_info?.last_name}`,
    });
    console.log("Selected employee:", employee);

    // Pass the selected employee ID to the parent component
    setSelectedEmployeeId(employee.employee_id);
  };
console.log(setSelectedEmployee,"setselectedemployee id")
  return (
    <Fragment>
      <div
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
        className="dropdown my-3"
      >
        <Link
          className="user-image dropdown-toggle employee-image"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="dropdown-header">
            <img
              src={dummyUser}
              alt="userImage"
              width="30px"
              height="30px"
              className="rounded-circle"
            />
            <div className="details">
              {/* <span className="email">{selectedEmployee.email || "Select Employee"}</span> */}
              <span className="name">{selectedEmployee.name || ""}</span>
            </div>
          </div>
        </Link>

        <ul className="dropdown-menu user-dropdown">
          <div className="dropdown-header">
            <input
              type="text"
              placeholder="Search..."
              className="dropdown-input"
              id="dropdown-input"
              onChange={handleChange}
            />
          </div>
          <li className="dropdown-content" id="dropdown-content">
            {options?.map((employee) => (
              <div
                key={employee.employee_id}
                className="dropdown-item"
                onClick={() => handleSelect(employee)}
              >
                <img
                  src={dummyUser}
                  alt="employeeImage"
                  width="40px"
                  height="40px"
                  className="dropdown-item-image rounded-circle"
                />
                <div>
                  {/* <h5 onClick={() => navigate(`/admin/employee/${employee?.employee_id}`)}> */}
                    {employee?.basic_info?.first_name} {employee?.basic_info?.last_name} 
                {/* </h5> */}
                  <p>{employee?.basic_info?.email}</p>
                  {/* <span>{employee?.employee_id}</span> */}
                </div>
              </div>
            ))}
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default Selectinputimg;
