
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import TableHead from "../../Table/TableHead";
// import _ from "lodash";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useNavigate } from "react-router";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import Loader from "../../Loader/Loader";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { AiOutlineEdit } from "react-icons/ai";
// import {
//   backEndCallNoEnc,
//   backEndCallObjNothing,
// } from "../../../services/mainService";
// import { debounce } from "lodash";

// const EmployeeList = () => {
//   const {
//     loading,
//     setLoading,
//     setLoadingTerm,
//     loadingTerm,
//     limit,
//     setImageModal,
//     setImageData,
//     employeesList, 
//     setEmployeesList
//   } = useStateContext();
//   const { applicationColor } = useThemeContext();
//   // const [employeesList, setEmployeesList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [skip, setSkip] = useState(0);
//   const observer = useRef();
//   const [dataExist, setDataExist] = useState(false);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [showButton, setShowButton] = useState(false);
//   const [resetButton, setResetButton] = useState(false);

//   let tableHeadProperties = [
//     {
//       name: "Employee ID",
//       property: "employee_id",
//       type: "string",
//       onClick: (item) => {
//         navigate(`/admin/employee/${item?.employee_id}`);
//       },
//       style: {
//         color: "#6c63fc",
//         cursor: "pointer",
//         textTransform: "uppercase",
//         fontWeight: "bold",
//       },
//     },
//     { name: "First Name", property: "basic_info.first_name" },
//     { name: "Last Name", property: "basic_info.last_name" },
//     { name: "Department", property: "work_info.department_name" },
//     { name: "Designation", property: "work_info.designation_name" },
//     // { name: "Location", property: "work_info.location_name" },
//     // { name: "Shift", property: "work_info.shift_name" },
//     { name: "Date of Join", property: "work_info.date_of_join" },
//     { name: "Action", property: "", type: "string" },
//   ];

//   const fetchingData = async () => {
//     try {
//       setLoading(true);
//       let employees = await backEndCallObjNothing(
//         "/admin_get/get_employee_list",
//         { skip: 0 }
//       );
//       setEmployeesList(employees.employees);
//       setFilteredEmployees(employees.employees);
//     } catch (error) {
//       toastOptions.error(error?.response?.data || "something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {

  
//   console.log(employeesList,'employeesList in employeesList compo')

//   console.log((employeesList.length >= 0),'employeesList.length >= ')

//   // debugger
//    if( !employeesList.length >= 0 ) { 
//     console.log('hittt')
//      fetchingData();
//    } 


//   }, []);

//   // useEffect(() => {
//   //   if (employeesList.length <= 0) {
//   //     setShowButton(true);
//   //   } else {
//   //     setShowButton(false);
//   //   }
//   // }, [employeesList.length]);

//   const makingNetworkCallWithQuery = async () => {
//     try {
//       setLoading(true);
//       setLoadingTerm("query");
//       // Perform the search query network call here

//       setLoading(false);
//       setLoadingTerm("");
//       setSkip(0);
//       setResetButton(true);
//     } catch (error) {
//       setLoading(false);
//       setLoadingTerm("");
//       setSkip(0);
//       setResetButton(true);
//       toastOptions.error("Error occurred");
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//       setSkip(0);
//     }
//   };

//   const resettingEmployees = async () => {
//     try {
//       setLoading(true);
//       setLoadingTerm("reset");
//       // Perform the reset network call here

//       setSearchTerm("");
//       setLoading(false);
//       setLoadingTerm("");
//       setSkip(0);
//       setResetButton(false);
//     } catch (error) {
//       setLoading(false);
//       toastOptions.error("Error occurred");
//       setLoadingTerm("");
//       setSkip(0);
//     } finally {
//       setLoadingTerm("");
//       setLoading(false);
//       setSkip(0);
//     }
//   };

//   // const fetchingMoreData = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setLoadingTerm("getExtraEmployees");

//   //     setLoading(false);
//   //     setLoadingTerm("");
//   //   } catch (error) {
//   //     setLoading(false);
//   //     console.log("error while fetching more data", error);
//   //     setLoadingTerm("");
//   //   } finally {
//   //     setLoading(false);
//   //     setLoadingTerm("");
//   //   }
//   // };

//   // const gettingMoreDataRef = useCallback(
//   //   (node) => {
//   //     if (loading) return;
//   //     if (observer.current) observer.current.disconnect();
//   //     observer.current = new IntersectionObserver(async (entries) => {
//   //       if (entries[0].isIntersecting && employeesList.length >= limit) {
//   //         setSkip((prevSkip) => prevSkip + 1); // Update skip directly without await
//   //         if (skip) {
//   //           fetchingMoreData();
//   //         }
//   //       }
//   //     });

//   //     if (node) observer.current.observe(node);
//   //   },
//   //   [loading, employeesList, limit, skip]
//   // );

//   // Debounced search handler
//   const debouncedSearchHandler = useCallback(
//     debounce((term) => {
//       if (term.length > 0) {
//         const lowerCaseSearchTerm = term.toLowerCase();
//         const filteredItems = filteredEmployees.filter((item) => {
//           const {
//             employee_id,
//             basic_info: { first_name, last_name, email },
//             work_info: {
//               department_name,
//               designation_name,
//               location_name,
//               date_of_join,
//               shift_name,
//             },
//             contact_details: { seating_location },
//           } = item;

//           return (
//             employee_id.toLowerCase().includes(lowerCaseSearchTerm) ||
//             first_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
//             last_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
//             email?.toLowerCase().includes(lowerCaseSearchTerm) ||
//             department_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
//             designation_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
//             seating_location?.toLowerCase().includes(lowerCaseSearchTerm) ||
//             date_of_join?.toLowerCase().includes(lowerCaseSearchTerm) ||
//             shift_name?.toLowerCase().includes(lowerCaseSearchTerm)
//           );
//         });

//         setEmployeesList(filteredItems);
//       } else {
//         setEmployeesList(filteredEmployees);
//       }
//     }, 300),
//     [filteredEmployees]
//   );

//   useEffect(() => {
//     debouncedSearchHandler(searchTerm);
//     return debouncedSearchHandler.cancel;
//   }, [searchTerm, debouncedSearchHandler]);

//   return (
//     <section className="table-query new-query">
//       <div
//         style={{
//           background: applicationColor.cardBg1,
//           color: applicationColor.readColor1,
//         }}
//         className="table-wrapper py-2 px-3"
//       >
//         <div className="search-bar sticky-top mb-2">
//           <div
//             className="searchbar-loading"
//             style={{
//               color: applicationColor.readColor1,
//               background: applicationColor.cardBg2,
//             }}
//           >
//             <input
//               className="employee-search"
//               type="text"
//               placeholder="Search here..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               name={"searchTerm"}
//               id="employee-search"
//               style={{
//                 color: applicationColor.readColor1,
//               }}
//             />
//             <div className="query-button">
//               {showButton && (
//                 <button
//                   style={{ background: applicationColor.buttonColor }}
//                   className="btn-custom btn-custom-reset"
//                   disabled={loadingTerm === "query"}
//                   onClick={makingNetworkCallWithQuery}
//                 >
//                   {loading && loadingTerm === "query" ? <Loader /> : "Submit"}
//                 </button>
//               )}
//             </div>
//           </div>

//           <div>
//             {resetButton && (
//               <button
//                 className="btn-custom btn-custom-reset"
//                 disabled={loadingTerm === "reset"}
//                 onClick={resettingEmployees}
//               >
//                 {loading && loadingTerm === "reset" ? <Loader /> : " Reset"}{" "}
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="tables">
//           <table className="main-table table-bordered table-responsive rounded-1">
//             <TableHead
//               tableHeadProperties={tableHeadProperties}
//               data={employeesList}
//               component="UpdateEmployeeAction"
//               // loadMoreRef={gettingMoreDataRef}
//               getExtraDataType="getExtraEmployees"
//               dataExist={dataExist}
//             />
//           </table>
//           {loading ? (
//             <div className="spinner">
//               <Loader />
//             </div>
//           ) : (
//             employeesList.length === 0 && "there is no data found"
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmployeeList;
// // This Below functions are respobseilble to update the employee details and  naviagate the admin to /admin/update_employee page to edit the psecific employee details
// export const UpdateEmployeeAction = ({ id }) => {
//   const navigate = useNavigate();
//   const { applicationColor } = useThemeContext();
//   return (
//     <section
//       className="actions"
//       style={{
//         color: applicationColor.readColor1,
//       }}
//     >
//       <button
//         className="edit btn btn-sm btn-success-light"
//         onClick={() => navigate(`/admin/update_employee/${id}`)}
//       >
//         <AiOutlineEdit />
//       </button>

//       {/* <button className="delete btn btn-sm">
//         <MdDeleteOutline />
//       </button> */}
//     </section>
//   );
// };
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import _ from "lodash";
// import { useStateContext } from "../../Contexts/StateContext";
// import { useNavigate } from "react-router";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import Loader from "../../Loader/Loader";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { AiOutlineEdit } from "react-icons/ai";
// import {
//   backEndCallNoEnc,
//   backEndCallObjNothing,
// } from "../../../services/mainService";
// import { debounce } from "lodash";
// // import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you import Bootstrap

// const EmployeeList = () => {
//   const {
//     loading,
//     setLoading,
//     setLoadingTerm,
//     loadingTerm,
//     limit,
//     setImageModal,
//     setImageData,
//     employeesList, 
//     setEmployeesList
//   } = useStateContext();
//   const { applicationColor } = useThemeContext();
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [skip, setSkip] = useState(0);
//   const observer = useRef();
//   const [dataExist, setDataExist] = useState(false);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [showButton, setShowButton] = useState(false);
//   const [resetButton, setResetButton] = useState(false);

//   const fetchingData = async () => {
//     try {
//       setLoading(true);
//       let employees = await backEndCallObjNothing(
//         "/admin_get/get_employee_list",
//         { skip: 0 }
//       );
//       setEmployeesList(employees.employees);
//       setFilteredEmployees(employees.employees);
//     } catch (error) {
//       toastOptions.error(error?.response?.data || "something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!employeesList.length >= 0) {
//       fetchingData();
//     }
//   }, []);

//   // const debouncedSearchHandler = useCallback(
//   //   debounce((term) => {
//   //     if (term.length > 0) {
//   //       const lowerCaseSearchTerm = term.toLowerCase();
//   //       const filteredItems = filteredEmployees.filter((item) => {
//   //         const {
//   //           employee_id,
//   //           basic_info: { first_name, last_name, email },
//   //           work_info: {
//   //             department_name,
//   //             designation_name,
//   //             location_name,
//   //             date_of_join,
//   //             shift_name,
//   //           },
//   //           contact_details: { seating_location },
//   //         } = item;

//   //         return (
//   //           employee_id.toLowerCase().includes(lowerCaseSearchTerm) ||
//   //           first_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
//   //           last_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
//   //           email?.toLowerCase().includes(lowerCaseSearchTerm) ||
//   //           department_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
//   //           designation_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
//   //           seating_location?.toLowerCase().includes(lowerCaseSearchTerm) ||
//   //           date_of_join?.toLowerCase().includes(lowerCaseSearchTerm) ||
//   //           shift_name?.toLowerCase().includes(lowerCaseSearchTerm)
//   //         );
//   //       });

//   //       setEmployeesList(filteredItems);
//   //     } else {
//   //       setEmployeesList(filteredEmployees);
//   //     }
//   //   }, 300),
//   //   [filteredEmployees]
//   // );

//   // useEffect(() => {
//   //   debouncedSearchHandler(searchTerm);
//   //   return debouncedSearchHandler.cancel;
//   // }, [searchTerm, debouncedSearchHandler]);

//   return (
//     <section className="table-query new-query">
//       <div
//         style={{
//           background: applicationColor.cardBg1,
//           color: applicationColor.readColor1,
//         }}
//         className="table-wrapper py-2 px-3"
//       >
//         {/* <div className="search-bar sticky-top mb-2">
//           <div
//             className="searchbar-loading"
//             style={{
//               color: applicationColor.readColor1,
//               background: applicationColor.cardBg2,
//             }}
//           >
//             <input
//               className="employee-search"
//               type="text"
//               placeholder="Search here..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               name={"searchTerm"}
//               id="employee-search"
//               style={{
//                 color: applicationColor.readColor1,
//               }}
//             />
//           </div>
//         </div> */}
//         <div className="tables">
//           <table className="table table-bordered table-responsive rounded-1">
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Department</th>
//                 <th>Designation</th>
//                 <th>Date of Join</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employeesList.length > 0 ? (
//                 employeesList.map((employee) => (
//                   <tr key={employee.employee_id}>
//                     <td
//                       style={{
//                         color: "#6c63fc",
//                         cursor: "pointer",
//                         textTransform: "uppercase",
//                         fontWeight: "bold",
//                       }}
//                       onClick={() =>
//                         navigate(`/admin/employee/${employee.employee_id}`)
//                       }
//                     >
//                       {employee.employee_id}
//                     </td>
//                     <td>{employee.basic_info.first_name}</td>
//                     <td>{employee.basic_info.last_name}</td>
//                     <td>{employee.work_info.department_name}</td>
//                     <td>{employee.work_info.designation_name}</td>
//                     <td>{employee.work_info.date_of_join}</td>
//                     <td>
//                       <UpdateEmployeeAction id={employee.employee_id} />
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center">
//                     {loading ? <Loader /> : "No employees found"}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export const UpdateEmployeeAction = ({ id }) => {
//   const navigate = useNavigate();
//   const { applicationColor } = useThemeContext();
//   return (
//     <section
//       className="actions"
//       style={{
//         color: applicationColor.readColor1,
//       }}
//     >
//       <button
//         className="edit btn btn-sm btn-success-light"
//         onClick={() => navigate(`/admin/update_employee/${id}`)}
//       >
//         <AiOutlineEdit />
//       </button>
//     </section>
//   );
// };

// export default EmployeeList;
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStateContext } from "../../Contexts/StateContext";
import { useNavigate } from "react-router";
import { toastOptions } from "../../../Utils/FakeRoutes";
import Loader from "../../Loader/Loader";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { AiOutlineEdit } from "react-icons/ai";
import { backEndCallObjNothing } from "../../../services/mainService";
import { debounce } from "lodash";

const EmployeeList = () => {
  const {
    loading,
    setLoading,
    employeesList,
    setEmployeesList,
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const[bkcoll,setbkcall]=useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const[loadMore,setLoadMore]=useState(false)
  // Initialize skip to 0
  const observer = useRef();
  
  const navigate = useNavigate();

  
  const fetchData = async () => {
   

    setLoading(true);
    try {
        setbkcall(false)
        const obj = { skip: employeesList.length, };
        let {employees} = await backEndCallObjNothing("/admin_get/get_employee_list",obj);
        if (employees?.length === 0) {
            setLoadMore(true)
            toastOptions.info("No more users to fetch.");
        } else {
            setEmployeesList(prevemployees => [...prevemployees, ...employees]);
        }
    } catch (ex) {
        if (ex.response && ex.response?.status === 400) {
            toastOptions.error(ex.response?.data);
        }
    } finally {
        setLoading(false);
    }
};

 
  useEffect(() => {


    if (employeesList.length == 0) {
        fetchData();

    }
}, []);
const handleRef = useCallback(
  (node) => {
      if (loadMore) return;
      if (loading) return;
      if (bkcoll) return


      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
if(employeesList.length >=50){
              fetchData()
            }
          }
      });

      if (node) observer.current.observe(node);
  },
);
const debouncedSearchHandler = useCallback(
      debounce((term) => {
        if (term.length > 0) {
          const lowerCaseSearchTerm = term.toLowerCase();
          const filteredItems = employeesList.filter((item) => {
            const {
              employee_id,
              basic_info: { first_name, last_name, email },
              work_info: {
                department_name,
                designation_name,
                location_name,
                date_of_join,
                shift_name,
              },
              contact_details: { seating_location },
            } = item;
  
            return (
              employee_id.toLowerCase().includes(lowerCaseSearchTerm) ||
              first_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
              last_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
              email?.toLowerCase().includes(lowerCaseSearchTerm) ||
              department_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
              designation_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
              seating_location?.toLowerCase().includes(lowerCaseSearchTerm) ||
              date_of_join?.toLowerCase().includes(lowerCaseSearchTerm) ||
              shift_name?.toLowerCase().includes(lowerCaseSearchTerm)
            );
          });
  
          setFilteredEmployees(filteredItems);
        } else {
          setFilteredEmployees(null);
        }
      }, 300),
      [filteredEmployees]
    );
  
    useEffect(() => {
      debouncedSearchHandler(searchTerm);
      return debouncedSearchHandler.cancel;
    }, [searchTerm, debouncedSearchHandler]);
  
    const handleRefresh = async () => {
      if (isFetching) return;

      setIsFetching(true);
      try {
          await fetchData();
      } finally {
          setIsFetching(false);
      }
  };

  const kk = filteredEmployees ?   filteredEmployees : employeesList

  return (
    <section className="table-query new-query">
      <div
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
        className="table-wrapper py-2 px-3"
      >
        <div className="search-bar sticky-top mb-2">
         <div
            className="searchbar-loading"
            style={{
              color: applicationColor.readColor1,
              background: applicationColor.cardBg2,
            }}
          >
            <input
              className="employee-search"
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name={"searchTerm"}
              id="employee-search"
              style={{
                color: applicationColor.readColor1,
              }}
            />
          </div>
          <div onClick={handleRefresh} disabled={isFetching}>
                                {isFetching ? (
                                    <div className="spinner-border text-primary" role="status" style={{ height: "20px", width: "20px" }}>

                                    </div>
                                ) : (
                                    <i className="ri-loop-right-line text-primary fs-22 cursor-pointer me-2"></i>
                                )}
                            </div>
        </div> 
        <div className="tables">
          <table className="table table-bordered table-responsive rounded-1">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
             
                <th>Department</th>
                <th>Designation</th>
                <th>Date of Join</th>
                <th>Employee Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesList.length > 0 ? (
                kk.map((employee, index) => {
                  if (index === employeesList.length - 1) {
                    // Attach ref to the last element for the observer
                    return (
                      <tr
                        key={employee.employee_id}
                        ref={handleRef} // Attach observer to last row
                      >
                        <td
                          style={{
                            color: "#6c63fc",
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            navigate(`/admin/employee/${employee.employee_id}`)
                          }
                        >
                          {employee.employee_id}
                        </td>
                        <td>{employee.basic_info.first_name}{employee.basic_info.last_name}</td>
                        
                        <td>{employee.work_info.department_name}</td>
                        <td>{employee.work_info.designation_name}</td>
                        <td>{employee.work_info.date_of_join}</td>
                        <td>{employee.work_info.employee_status}</td>
                        <td>
                          <UpdateEmployeeAction id={employee.employee_id} />
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={employee.employee_id}>
                        <td
                          style={{
                            color: "#6c63fc",
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            navigate(`/admin/employee/${employee.employee_id}`)
                          }
                        >
                          {employee.employee_id}
                        </td>
                        <td>{employee.basic_info.first_name}{" "}{employee.basic_info.last_name}</td>
                        {/* <td>{employee.basic_info.last_name}</td> */}
                        <td>{employee.work_info.department_name}</td>
                        <td>{employee.work_info.designation_name}</td>
                        <td>{employee.work_info.date_of_join}</td>
                        <td>{employee.work_info.employee_status}</td>
                        <td>
                          <UpdateEmployeeAction id={employee.employee_id} />
                        </td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    {loading ? <Loader /> : "No employees found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading && <Loader />} {/* Show loader when fetching more data */}
        </div>
      </div>
    </section>
  );
};

export const UpdateEmployeeAction = ({ id }) => {
  const navigate = useNavigate();
  const { applicationColor } = useThemeContext();
  return (
    <section
      className="actions"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <button
        className="edit btn btn-sm btn-success-light"
        onClick={() => navigate(`/admin/update_employee/${id}`)}
      >
        <AiOutlineEdit />
      </button>
    </section>
  );
};

export default EmployeeList;
