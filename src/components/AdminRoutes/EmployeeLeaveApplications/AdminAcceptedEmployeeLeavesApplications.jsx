// // import React, { useEffect, useState } from "react";
// // import { useStateContext } from "../../Contexts/StateContext";
// // import { backEndCallObjNothing } from "../../../services/mainService";
// // import { toastOptions } from "../../../Utils/FakeRoutes";
// // import Loader from "../../Loader/Loader";
// // import TableHead from "../../Table/TableHead";
// // import Modal from "../../Modals/Modal";
// // import { useThemeContext } from "../../Contexts/ThemesContext";
// // import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
// // import { FaTableCells } from "react-icons/fa6";
// // import { FaCalendarCheck } from "react-icons/fa";
// // import { Navigate } from "react-router-dom";

// // const AdminAcceptedEmployeeLeavesApplications = () => {
// //   const {
// //     showModal,
// //     adminGettingLeaveApplications,
// //     setAdminGettingLeaveApplications,
// //   } = useStateContext();
// //   const { applicationColor } = useThemeContext();
// //   const [currentTab, setCurrentTab] = useState("calendar-view");
// //   console.log(adminGettingLeaveApplications, " adminGettingLeaveApplications");

// //   useEffect(() => {
// //     const fetchLeaveApplications = async () => {
// //       try {
// //         const response = await backEndCallObjNothing(
// //           "/user_get/leave_applications_list",
// //           {
// //             skip: 0,
// //             limit: 2,
// //           }
// //         );
// //         setAdminGettingLeaveApplications(response.data);
// //       } catch (error) {
// //         console.error("Error fetching leave applications:", error);
// //       }
// //     };
// //     fetchLeaveApplications();
// //   }, [setAdminGettingLeaveApplications]);

// //   let tableHeadProperties = [
// //     {
// //       name: "Employee ID",
// //       property: "employee_id",
// //       type: "string",
// //       onClick: (item) => {
// //         Navigate(`/admin/employee/${item?.employee_id}`);
// //       },
// //       style: { color: "#6c63fc", cursor: "pointer", fontWeight: "bold" },
// //     },
// //     { name: "Employee Name", property: "employee_name" },
// //     { name: "Leave Type ", property: "leave_type", type: "string" },
// //     { name: "From Date", property: "from_date", type: "string" },
// //     { name: "To Date", property: "to_date", type: "string" },
// //     // { name: "Remaining Leaves", property: "remaining_leaves", type: "string" },
// //     { name: "Days Taken", property: "days_taken" },
// //     { name: "Reason", property: "reason" },
// //     { name: "Leave Status", property: "leave_status", type: "string" },
// //     { name: "Actions", property: "actions" },
// //   ];
// //   const tabs = [
// //     { name: "calendar-view", label: <FaCalendarCheck /> },
// //     { name: "table-view", label: <FaTableCells /> },
// //   ];

// //   const onLeaveAccept = async (leave_application_id) => {
// //     try {
// //       const data = { leave_application_id, leave_status: "Approved" };
// //       const response = await backEndCallObjNothing("/user/update_leave", data);
// //       console.log(response, "rected");
// //       setAdminGettingLeaveApplications((prev) =>
// //         prev.map((app) =>
// //           app.leave_application_id === leave_application_id ? response : app
// //         )
// //       );
// //       toastOptions.success(
// //         `Leave Approved for ${response.employeeName}, for ${response.daysTaken} days from ${response.fromDate} to ${response.toDate}`
// //       );
// //     } catch (error) {
// //       toastOptions.error(
// //         error?.response?.data?.detail ||
// //           "Error while Accepting Leave Application"
// //       );
// //     }
// //   };

// //   const onLeaveReject = async (leave_application_id) => {
// //     try {
// //       const data = { leave_application_id, leave_status: "Rejected" };
// //       const response = await backEndCallObjNothing("/user/update_leave", data);
// //       setAdminGettingLeaveApplications((prev) =>
// //         prev.map((app) =>
// //           app.leave_application_id === leave_application_id ? response : app
// //         )
// //       );
// //       toastOptions.success(
// //         `Leave Rejected for ${response.employeeName}, for ${response.daysTaken} days from ${response.fromDate} to ${response.toDate}`
// //       );
// //     } catch (error) {
// //       toastOptions.error(
// //         error?.response?.data?.detail ||
// //           "Error While Rejecting Leave Application"
// //       );
// //     }
// //   };

// //   useEffect(() => {
// //     // adminGettingLeaveApplications();
// //     console.log(adminGettingLeaveApplications);
// //   }, [adminGettingLeaveApplications]);

// //   return (
// //     <section className="admin-accepted-leave-applications">
// //       <div
// //         className="table-wrapper py-2 px-3"
// //         style={{
// //           background: applicationColor.cardBg1,
// //           color: applicationColor.readColor1,
// //         }}
// //       >
// //         <section className="d-flex justify-content-between align-items-center mt-2">
// //           <div className="d-flex align-items-center gap-2">
// //             {tabs.map((tab) => (
// //               <button
// //                 key={tab.name}
// //                 onClick={() => setCurrentTab(tab.name)}
// //                 className={`nav-link ${
// //                   currentTab === tab.name ? "active" : ""
// //                 }`}
// //               >
// //                 {tab.label}
// //               </button>
// //             ))}
// //           </div>
// //         </section>
// //         <br />
// //         {currentTab === "calendar-view" ? (
// //           <div className="row">
// //             {adminGettingLeaveApplications.map((item) => (
// //               <div
// //                 key={item.leave_application_id}
// //                 className="col-sm-6 col-md-6 col-lg-6 col-xl-4 g-3"
// //               >
// //                 <div
// //                   style={{
// //                     background: applicationColor.cardBg1,
// //                     color: applicationColor.readColor1,
// //                   }}
// //                   className="rounded-3"
// //                 >
// //                   <div className="card">
// //                     <div className="card-body employee-leave-cards">
// //                       <p
// //                         style={{
// //                           textTransform: "capitalize",
// //                           fontWeight: "bold",
// //                         }}
// //                       >
// //                         {item.employee_name}
// //                       </p>

// //                       <div className="leave-card-data">
// //                         <p>Type: {item.leave_type}</p>
// //                         <p>Status: {item.leave_status}</p>
// //                       </div>
// //                       <div className="leave-card-data">
// //                         <p>From: {item.from_date}</p>
// //                         <p>To : {item.to_date}</p>
// //                       </div>

// //                       <div className="leave-card-data">
// //                         <p>Reason: {item.reason}</p>
// //                         <p>Days Taken: {item.days_taken}</p>
// //                       </div>

// //                       <div className="leave-card-data">
// //                         <p>Remaining Leaves:</p>
// //                         <p>{item.remaining_leaves}</p>
// //                       </div>

// //                       <section className="status g-2">
// //                         {item.leave_status === "Pending" ? (
// //                           <>
// //                             <button
// //                               className="accept py-2 px-3"
// //                               onClick={() =>
// //                                 onLeaveAccept(item.leave_application_id)
// //                               }
// //                             >
// //                               Approve
// //                               {/* <AiOutlineLike /> */}
// //                             </button>
// //                             <button
// //                               className="reject py-2 px-3"
// //                               onClick={() =>
// //                                 onLeaveReject(item.leave_application_id)
// //                               }
// //                             >
// //                               Reject
// //                               {/* <AiOutlineDislike /> */}
// //                             </button>
// //                           </>
// //                         ) : (
// //                           <button className="reject py-2 px-3 ms-auto">
// //                             Reject
// //                             {/* <AiOutlineDislike /> */}
// //                           </button>
// //                         )}
// //                       </section>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : currentTab === "table-view" ? (
// //           <>
// //             {/* <section className="d-flex justify-content-between align-items-center">
// //               <div className="d-flex align-items-center gap-2">
// //                 {tabs.map((tab) => (
// //                   <button
// //                     key={tab.name}
// //                     onClick={() => setCurrentTab(tab.name)}
// //                     className={`nav-link ${
// //                       currentTab === tab.name ? "active" : ""
// //                     }`}
// //                   >
// //                     {tab.label}
// //                   </button>
// //                 ))}
// //               </div>
// //             </section> */}
// //             <section className="tables">
// //               <table className="main-table table-bordered table-responsive">
// //                 <TableHead tableHeadProperties={tableHeadProperties} />
// //                 <tbody>
// //                   {adminGettingLeaveApplications.map((application) => (
// //                     <tr key={application.id}>
// //                       {tableHeadProperties.map((head) => (
// //                         <td key={head.name}>
// //                           {head.name === "Actions" &&
// //                           application[head.property] === undefined ? (
// //                             <UpdateEmployeeLeaveStatus
// //                               leave_application_id={
// //                                 application.leave_application_id
// //                               }
// //                               leave_status={application.leave_status}
// //                             />
// //                           ) : (
// //                             application[head.property]
// //                           )}
// //                         </td>
// //                       ))}
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //                 {showModal && <Modal />}
// //               </table>
// //             </section>
// //           </>
// //         ) : (
// //           ""
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default AdminAcceptedEmployeeLeavesApplications;

// // export const UpdateEmployeeLeaveStatus = ({
// //   leave_application_id,
// //   leave_status,
// // }) => {
// //   const { setAdminGettingLeaveApplications } = useStateContext();

// //   const [localLoading, setLocalLoading] = useState(false);

// //   const onLeaveAccept = async () => {
// //     setLocalLoading(true);
// //     try {
// //       const data = { leave_application_id, leave_status: "Approved" };
// //       const response = await backEndCallObjNothing("/user/update_leave", data);
// //       setAdminGettingLeaveApplications((prev) =>
// //         prev.map((app) =>
// //           app.leave_application_id === leave_application_id ? response : app
// //         )
// //       );

// //       toastOptions.success(
// //         `Leave Approved for ${response.employeeName}, for ${response.daysTaken} days from ${response.fromDate} to ${response.toDate}`
// //       );
// //     } catch (error) {
// //       toastOptions.error(
// //         error?.response?.data?.detail ||
// //           "Error while Accepting Leave Application"
// //       );
// //     } finally {
// //       setLocalLoading(false);
// //     }
// //   };

// //   const onLeaveReject = async () => {
// //     setLocalLoading(true);
// //     try {
// //       const data = { leave_application_id, leave_status: "Rejected" };
// //       const response = await backEndCallObjNothing("/user/update_leave", data);
// //       // setAdminGettingLeaveApplications((prev) =>
// //       //   prev.map((app) =>
// //       //     app.leave_application_id === leave_application_id ? response : app
// //       //   )
// //       // );
// //       setAdminGettingLeaveApplications(response)
// //       toastOptions.success(
// //         `Leave Rejected for ${response.employeeName}, for ${response.daysTaken} days from ${response.fromDate} to ${response.toDate}`
// //       );
// //     } catch (error) {
// //       toastOptions.error(
// //         error?.response?.data?.detail ||
// //           "Error While Rejecting Leave Application"
// //       );
// //     } finally {
// //       setLocalLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="status g-2">
// //       {leave_status === "Pending" ? (
// //         <>
// //           <button
// //             className="accept"
// //             onClick={onLeaveAccept}
// //             disabled={localLoading}
// //           >
// //             {localLoading ? <Loader /> : <AiOutlineLike />}
// //           </button>
// //           <button
// //             className="reject"
// //             onClick={onLeaveReject}
// //             disabled={localLoading}
// //           >
// //             {localLoading ? <Loader /> : <AiOutlineDislike />}
// //           </button>
// //         </>
// //       ) : (
// //         <button className="reject" disabled>
// //           {localLoading ? <Loader /> : <AiOutlineDislike />}
// //         </button>
// //       )}
// //     </section>
// //   );
// // };
// import React, { useEffect, useState } from "react";
// import { useStateContext } from "../../Contexts/StateContext";
// import { backEndCallObjNothing } from "../../../services/mainService";
// import { toastOptions } from "../../../Utils/FakeRoutes";
// import Loader from "../../Loader/Loader";
// import TableHead from "../../Table/TableHead";
// import Modal from "../../Modals/Modal";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
// import { FaTableCells } from "react-icons/fa6";
// import { FaCalendarCheck } from "react-icons/fa";
// import { Navigate } from "react-router-dom";

// const AdminAcceptedEmployeeLeavesApplications = () => {
//   const {
//     showModal,
//     adminGettingLeaveApplications,
//     setAdminGettingLeaveApplications,
//   } = useStateContext();
//   const { applicationColor } = useThemeContext();
//   const [currentTab, setCurrentTab] = useState("calendar-view");
//   const [skip, setSkip] = useState(0);
//   const [limit] = useState(2);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchLeaveApplications = async () => {
//       setLoading(true);
//       try {
//         const response = await backEndCallObjNothing(
//           "/user_get/leave_applications_list",
//           {
//             skip,
//             limit,
//           }
//         );
//         if (response.data.length < limit) {
//           setHasMore(false);
//         }
//         setAdminGettingLeaveApplications((prev) => [
//           ...prev,
//           ...response.data,
//         ]);
//       } catch (error) {
//         console.error("Error fetching leave applications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLeaveApplications();
//   }, [skip, limit, setAdminGettingLeaveApplications]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setSkip((prevSkip) => prevSkip + limit);
//     }
//   };

//   let tableHeadProperties = [
//     {
//       name: "Employee ID",
//       property: "employee_id",
//       type: "string",
//       onClick: (item) => {
//         Navigate(`/admin/employee/${item?.employee_id}`);
//       },
//       style: { color: "#6c63fc", cursor: "pointer", fontWeight: "bold" },
//     },
//     { name: "Employee Name", property: "employee_name" },
//     { name: "Leave Type ", property: "leave_type", type: "string" },
//     { name: "From Date", property: "from_date", type: "string" },
//     { name: "To Date", property: "to_date", type: "string" },
//     { name: "Days Taken", property: "days_taken" },
//     { name: "Reason", property: "reason" },
//     { name: "Leave Status", property: "leave_status", type: "string" },
//     { name: "Actions", property: "actions" },
//   ];

//   const tabs = [
//     { name: "calendar-view", label: <FaCalendarCheck /> },
//     { name: "table-view", label: <FaTableCells /> },
//   ];

//   const onLeaveAccept = async (leave_application_id) => {
//     try {
//       const data = { leave_application_id, leave_status: "Approved" };
//       const response = await backEndCallObjNothing("/user/update_leave", data);
//       setAdminGettingLeaveApplications((prev) =>
//         prev.map((app) =>
//           app.leave_application_id === leave_application_id ? response : app
//         )
//       );
//       toastOptions.success(
//         `Leave Approved for ${response.employeeName}, for ${response.daysTaken} days from ${response.fromDate} to ${response.toDate}`
//       );
//     } catch (error) {
//       toastOptions.error(
//         error?.response?.data?.detail ||
//           "Error while Accepting Leave Application"
//       );
//     }
//   };

//   const onLeaveReject = async (leave_application_id) => {
//     try {
//       const data = { leave_application_id, leave_status: "Rejected" };
//       const response = await backEndCallObjNothing("/user/update_leave", data);
//       setAdminGettingLeaveApplications((prev) =>
//         prev.map((app) =>
//           app.leave_application_id === leave_application_id ? response : app
//         )
//       );
//       toastOptions.success(
//         `Leave Rejected for ${response.employeeName}, for ${response.daysTaken} days from ${response.fromDate} to ${response.toDate}`
//       );
//     } catch (error) {
//       toastOptions.error(
//         error?.response?.data?.detail ||
//           "Error While Rejecting Leave Application"
//       );
//     }
//   };

//   useEffect(() => {
//     console.log(adminGettingLeaveApplications);
//   }, [adminGettingLeaveApplications]);

//   return (
//     <section className="admin-accepted-leave-applications">
//       <div
//         className="table-wrapper py-2 px-3"
//         style={{
//           background: applicationColor.cardBg1,
//           color: applicationColor.readColor1,
//         }}
//       >
//         <section className="d-flex justify-content-between align-items-center mt-2">
//           <div className="d-flex align-items-center gap-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.name}
//                 onClick={() => setCurrentTab(tab.name)}
//                 className={`nav-link ${
//                   currentTab === tab.name ? "active" : ""
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </section>
//         <br />
//         {currentTab === "calendar-view" ? (
//           <div className="row">
//             {adminGettingLeaveApplications.map((item) => (
//               <div
//                 key={item.leave_application_id}
//                 className="col-sm-6 col-md-6 col-lg-6 col-xl-4 g-3"
//               >
//                 <div
//                   style={{
//                     background: applicationColor.cardBg1,
//                     color: applicationColor.readColor1,
//                   }}
//                   className="rounded-3"
//                 >
//                   <div className="card">
//                     <div className="card-body employee-leave-cards">
//                       <p
//                         style={{
//                           textTransform: "capitalize",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         {item.employee_name}
//                       </p>

//                       <div className="leave-card-data">
//                         <p>Type: {item.leave_type}</p>
//                         <p>Status: {item.leave_status}</p>
//                       </div>
//                       <div className="leave-card-data">
//                         <p>From: {item.from_date}</p>
//                         <p>To : {item.to_date}</p>
//                       </div>

//                       <div className="leave-card-data">
//                         <p>Reason: {item.reason}</p>
//                         <p>Days Taken: {item.days_taken}</p>
//                       </div>

//                       <div className="leave-card-data">
//                         <p>Remaining Leaves:</p>
//                         <p>{item.remaining_leaves}</p>
//                       </div>

//                       <section className="status g-2">
//                         {item.leave_status === "Pending" ? (
//                           <>
//                             <button
//                               className="accept py-2 px-3"
//                               onClick={() =>
//                                 onLeaveAccept(item.leave_application_id)
//                               }
//                             >
//                               Approve
//                             </button>
//                             <button
//                               className="reject py-2 px-3"
//                               onClick={() =>
//                                 onLeaveReject(item.leave_application_id)
//                               }
//                             >
//                               Reject
//                             </button>
//                           </>
//                         ) : (
//                           <button className="reject py-2 px-3 ms-auto">
//                             Reject
//                           </button>
//                         )}
//                       </section>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {hasMore && !loading && (
//               <div className="d-flex justify-content-center mt-3">
//                 <button className="load-more" onClick={loadMore}>
//                   Load More
//                 </button>
//               </div>
//             )}
//             {loading && (
//               <div className="d-flex justify-content-center mt-3">
//                 <Loader />
//               </div>
//             )}
//           </div>
//         ) : currentTab === "table-view" ? (
//           <>
//             <section className="tables">
//               <table className="main-table table-bordered table-responsive">
//                 <TableHead tableHeadProperties={tableHeadProperties} />
//                 <tbody>
//                   {adminGettingLeaveApplications.map((application) => (
//                     <tr key={application.id}>
//                       {tableHeadProperties.map((head) => (
//                         <td key={head.name}>
//                           {head.name === "Actions" &&
//                           application[head.property] === undefined ? (
//                             <UpdateEmployeeLeaveStatus
//                               leave_application_id={
//                                 application.leave_application_id
//                               }
//                               leave_status={application.leave_status}
//                             />
//                           ) : (
//                             application[head.property]
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {hasMore && !loading && (
//                 <div className="d-flex justify-content-center mt-3">
//                   <button className="load-more" onClick={loadMore}>
//                     Load More
//                   </button>
//                 </div>
//               )}
//               {loading && (
//                 <div className="d-flex justify-content-center mt-3">
//                   <Loader />
//                 </div>
//               )}
//             </section>
//           </>
//         ) : (
//           ""
//         )}
//       </div>
//       {showModal && <Modal />}
//     </section>
//   );
// };

// export default AdminAcceptedEmployeeLeavesApplications;

// export const UpdateEmployeeLeaveStatus = ({
//   leave_application_id,
//   leave_status,
// }) => {
//   const { setAdminGettingLeaveApplications } = useStateContext();
//   const [localLoading, setLocalLoading] = useState(false);

//   const onLeaveAccept = async () => {
//     setLocalLoading(true);
//     try {
//       const data = { leave_application_id, leave_status: "Approved" };
//       const response = await backEndCallObjNothing("/user/update_leave", data);
//       setAdminGettingLeaveApplications((prev) =>
//         prev.map((app) =>
//           app.leave_application_id === leave_application_id ? response : app
//         )
//       );

//       toastOptions.success(
//         `Leave Approved for ${response.employeeName}, for ${response.daysTaken} days from ${response.fromDate} to ${response.toDate}`
//       );
//     } catch (error) {
//       toastOptions.error(
//         error?.response?.data?.detail ||
//           "Error while Accepting Leave Application"
//       );
//     } finally {
//       setLocalLoading(false);
//     }
//   };

//   const onLeaveReject = async () => {
//     setLocalLoading(true);
//     try {
//       const data = { leave_application_id, leave_status: "Rejected" };
//       const response = await backEndCallObjNothing("/user/update_leave", data);
//       // setAdminGettingLeaveApplications((prev) =>
//       //   prev.map((app) =>
//       //     app.leave_application_id === leave_application_id ? response : app
//       //   )
//       // );
//       setAdminGettingLeaveApplications(response)
//       toastOptions.success(
//         `Leave Rejected for ${response.employeeName}, for ${response.daysTaken} days from ${response.fromDate} to ${response.toDate}`
//       );
//     } catch (error) {
//       toastOptions.error(
//         error?.response?.data?.detail ||
//           "Error While Rejecting Leave Application"
//       );
//     } finally {
//       setLocalLoading(false);
//     }
//   };

//   return (
//     <section className="status g-2">
//       {leave_status === "Pending" ? (
//         <>
//           <button
//             className="accept"
//             onClick={onLeaveAccept}
//             disabled={localLoading}
//           >
//             {localLoading ? <Loader /> : <AiOutlineLike />}
//           </button>
//           <button
//             className="reject"
//             onClick={onLeaveReject}
//             disabled={localLoading}
//           >
//             {localLoading ? <Loader /> : <AiOutlineDislike />}
//           </button>
//         </>
//       ) : (
//         <button className="reject" disabled>
//           {localLoading ? <Loader /> : <AiOutlineDislike />}
//         </button>
//       )}
//     </section>
//   );
// };
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useStateContext } from "../../Contexts/StateContext";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import Loader from "../../Loader/Loader";
import TableHead from "../../Table/TableHead";
import Modal from "../../Modals/Modal";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaTableCells } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminAcceptedEmployeeLeavesApplications = () => {
  const {
    showModal,
    adminGettingLeaveApplications,
    setAdminGettingLeaveApplications,
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [currentTab, setCurrentTab] = useState("calendar-view");
  const [skip, setSkip] = useState(0);
  const [limit] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const observer = useRef();

  const fetchLeaveApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await backEndCallObjNothing(
        "/user_get/leave_applications_list",
        {
          skip,
          limit,
        }
      );
      if (response.data.length < limit) {
        setHasMore(false);
      }
      setAdminGettingLeaveApplications((prev) => [
        ...prev,
        ...response.data,
      ]);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    } finally {
      setLoading(false);
    }
  }, [skip, limit, setAdminGettingLeaveApplications]);

  useEffect(() => {
    fetchLeaveApplications();
  }, [skip, fetchLeaveApplications]);

  const gettingMoreDataRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((prevSkip) => prevSkip + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, limit]
  );

  let tableHeadProperties = [
    {
      name: "Employee ID",
      property: "employee_id",
      type: "string",
      onClick: (item) => {
        navigate(`/admin/employee/${item?.employee_id}`);
      },
      style: {
        color: "#6c63fc",
        cursor: "pointer",
        textTransform: "uppercase",
        fontWeight: "bold",
      }
    },
    { name: "Employee Name", property: "employee_name" },
    { name: "Leave Type ", property: "leave_type", type: "string" },
    { name: "From Date", property: "from_date", type: "string" },
    { name: "To Date", property: "to_date", type: "string" },
    { name: "Days Taken", property: "days_taken" },
    { name: "Reason", property: "reason" },
    { name: "Leave Status", property: "leave_status", type: "string" },
    { name: "Actions", property: "actions" },
  ];

  const tabs = [
    { name: "calendar-view", label: <FaCalendarCheck /> },
    { name: "table-view", label: <FaTableCells /> },
  ];

  
  const onLeaveAccept = async (leave_application_id) => {
    try {
      const data = { leave_application_id, leave_status: "Approved" };
      const response = await backEndCallObjNothing("/user/update_leave", data);
      const updatedApplication = response.data; // Assume response.data contains the updated leave application
      setAdminGettingLeaveApplications((prev) =>
        prev.map((app) =>
          app.leave_application_id === leave_application_id ? updatedApplication : app
        )
      );
      toastOptions.success(
        `Leave Approved for ${updatedApplication.employee_name}, for ${updatedApplication.days_taken} days from ${updatedApplication.from_date} to ${updatedApplication.to_date}`
      );
    } catch (error) {
      toastOptions.error(
        error?.response?.data?.detail ||
        "Error while Accepting Leave Application"
      );
    }
  };
  
  const onLeaveReject = async (leave_application_id) => {
    try {
      const data = { leave_application_id, leave_status: "Rejected" };
      const response = await backEndCallObjNothing("/user/update_leave", data);
      const updatedApplication = response.data; // Assume response.data contains the updated leave application
      setAdminGettingLeaveApplications((prev) =>
        prev.map((app) =>
          app.leave_application_id === leave_application_id ? updatedApplication : app
        )
      );
      toastOptions.success(
        `Leave Rejected for ${updatedApplication.employee_name}, for ${updatedApplication.days_taken} days from ${updatedApplication.from_date} to ${updatedApplication.to_date}`
      );
    } catch (error) {
      toastOptions.error(
        error?.response?.data?.detail ||
        "Error While Rejecting Leave Application"
      );
    }
  };
  
  useEffect(() => {
    console.log(adminGettingLeaveApplications);
  }, [adminGettingLeaveApplications]);

  return (
    <section className="admin-accepted-leave-applications">
      <div
        className="table-wrapper py-2 px-3"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <section className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex align-items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setCurrentTab(tab.name)}
                className={`nav-link ${
                  currentTab === tab.name ? "active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>
        <br />
        {currentTab === "calendar-view" ? (
          <div className="row">
            {adminGettingLeaveApplications.map((item) => (
              <div
                key={item.leave_application_id}
                className="col-sm-6 col-md-6 col-lg-6 col-xl-4 g-3"
              >
                <div
                  style={{
                    background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                  }}
                  className="rounded-3"
                >
                  <div className="card">
                    <div className="card-body employee-leave-cards">
                      <p
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        {item.employee_name}
                      </p>

                      <div className="leave-card-data">
                        <p>Type: {item.leave_type}</p>
                        <p>Status: {item.leave_status}</p>
                      </div>
                      <div className="leave-card-data">
                        <p>From: {item.from_date}</p>
                        <p>To : {item.to_date}</p>
                      </div>

                      <div className="leave-card-data">
                        <p>Reason: {item.reason}</p>
                        <p>Days Taken: {item.days_taken}</p>
                      </div>

                      <div className="leave-card-data">
                        <p>Remaining Leaves:</p>
                        <p>{item.remaining_leaves}</p>
                      </div>

                      <section className="status g-2">
                        {item.leave_status === "Pending" ? (
                          <>
                            <button
                              className="accept py-2 px-3"
                              onClick={() =>
                                onLeaveAccept(item.leave_application_id)
                              }
                            >
                              Approve
                            </button>
                            <button
                              className="reject py-2 px-3"
                              onClick={() =>
                                onLeaveReject(item.leave_application_id)
                              }
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button className="reject py-2 px-3 ms-auto">
                            Reject
                          </button>
                        )}
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {hasMore && !loading && (
              <div ref={gettingMoreDataRef} className="d-flex justify-content-center mt-3">
                <button className="load-more" onClick={() => setSkip((prevSkip) => prevSkip + limit)}>
                  Load More
                </button>
              </div>
            )}
            {loading && (
              <div className="d-flex justify-content-center mt-3">
                <Loader />
              </div>
            )}
          </div>
        ) : currentTab === "table-view" ? (
          <>
            <section className="tables">
              <table className="main-table table-bordered table-responsive">
                <TableHead tableHeadProperties={tableHeadProperties} />
                <tbody>
                  {adminGettingLeaveApplications.map((application) => (
                    <tr key={application.id}>
                      {tableHeadProperties.map((head, index) => (
                        <td
                          key={index}
                          onClick={() => head.onClick && head.onClick(application)}
                          style={head.style}
                        >
                          {application[head.property]}
                        </td>
                      ))}
                      <td>
                        {application.leave_status === "Pending" ? (
                          <>
                            <AiOutlineLike
                              onClick={() =>
                                onLeaveAccept(application.leave_application_id)
                              }
                            />
                            <AiOutlineDislike
                              onClick={() =>
                                onLeaveReject(application.leave_application_id)
                              }
                            />
                          </>
                        ) : (
                          <AiOutlineDislike
                            onClick={() =>
                              onLeaveReject(application.leave_application_id)
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {hasMore && !loading && (
                <div ref={gettingMoreDataRef} className="d-flex justify-content-center mt-3">
                  <button className="load-more" onClick={() => setSkip((prevSkip) => prevSkip + limit)}>
                    Load More
                  </button>
                </div>
              )}
              {loading && (
                <div className="d-flex justify-content-center mt-3">
                  <Loader />
                </div>
              )}
            </section>
          </>
        ) : (
          ""
        )}
      </div>
      {showModal && <Modal />}
    </section>
  );
};

export default AdminAcceptedEmployeeLeavesApplications;
