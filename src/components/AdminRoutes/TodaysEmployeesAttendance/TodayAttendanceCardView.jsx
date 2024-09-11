// // // import React, { useEffect, useState } from "react";
// // // import { useThemeContext } from "../../Contexts/ThemesContext";
// // // import { backEndCallObjNothing } from "../../../services/mainService";
// // // import { useStateContext } from "../../Contexts/StateContext";

// // // function TodayAttendanceCardView() {
// // //   const { applicationColor } = useThemeContext();
// // // const{todayAttendance,  setTodayAttendance}=useStateContext()
// // //   const cardViewHeadings = ["Late Checkin", "On Leave", "All Checkin's"];
// // //   const arrToDisplyDummyData = [1, 2, 3, 4];
// // // const attandencedata = async () => {
// // //     try {
// // //      const response = await backEndCallObjNothing('user_get/today_attendance'
// // //       )
// // //       setTodayAttendance(response)
// // //     } catch (error) {

// // //     } finally {

// // //     }
// // //   };
// // // useEffect(()=>(
// // //   attandencedata()
// // // ),[])
// // //   return (
// // //     <>
// // //       {cardViewHeadings.map((item) =>
// // //         item === "Late Checkin" ? (
// // //           <div className="late-checkin-data">
// // //             <div className="late-checkin-heading">
// // //               <p>{item}</p>
// // //               <p className="count late-count">04</p>
// // //             </div>
// // //             <div className="late-checkin-info">
// // //               {arrToDisplyDummyData.map((arr) => (
// // //                 <div
// // //                   className="late-checkin-individual"
// // //                   style={{
// // //                     background: applicationColor.cardBg1,
// // //                     color: applicationColor.readColor1,
// // //                   }}
// // //                 >
// // //                   <div className="individual-names">
// // //                     <img
// // //                       src="https://cdnb.artstation.com/p/assets/images/images/034/457/411/large/shin-min-jeong-.jpg?1612345193"
// // //                       alt="profile-img"
// // //                     />
// // //                     <div className="d-flex justify-content-between">
// // //                       <div>
// // //                         <p className="individual-name">Akash</p>
// // //                         <p className="individual-id text-muted mb-2">
// // //                           CG708116
// // //                         </p>
// // //                         <p className="individual-id">stany@gmail.com</p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="status late-status">
// // //                       <span className="fw-semibold">Late</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         ) : item === "On Leave" ? (
// // //           <div className="late-checkin-data">
// // //             <div className="late-checkin-heading">
// // //               <p>{item}</p>
// // //               <p className="count leave-count">03</p>
// // //             </div>
// // //             <div className="late-checkin-info">
// // //               {arrToDisplyDummyData.map((arr) => (
// // //                 <div
// // //                   className="late-checkin-individual"
// // //                   style={{
// // //                     background: applicationColor.cardBg1,
// // //                     color: applicationColor.readColor1,
// // //                   }}
// // //                 >
// // //                   <div className="individual-names">
// // //                     <img
// // //                       src="https://cdna.artstation.com/p/assets/images/images/034/457/398/large/shin-min-jeong-.jpg?1612345160"
// // //                       alt="profile-img"
// // //                     />
// // //                     <div className="d-flex justify-content-between">
// // //                       <div>
// // //                         <p className="individual-name">Stany</p>
// // //                         <p className="individual-id text-muted mb-2">
// // //                           CG708116
// // //                         </p>
// // //                         <p className="individual-id">stany@gmail.com</p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="status out-status">
// // //                       <span className="fw-semibold">Out</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="late-checkin-data">
// // //             <div className="late-checkin-heading">
// // //               <p>{item}</p>
// // //               <p className="count checkin-count">20</p>
// // //             </div>
// // //             {todayAttendance?.length > 0 ? (
// // //               <>
// // //                 {todayAttendance.map((employees) => (
// // //                   <div className="late-checkin-info">
// // //                     {employees.map((eachEmployee) => (
// // //                       <div
// // //                         key={eachEmployee.employee_id}
// // //                         className="late-checkin-individual"
// // //                         style={{
// // //                           background: applicationColor.cardBg1,
// // //                           color: applicationColor.readColor1,
// // //                         }}
// // //                       >
// // //                         {console.log(eachEmployee)}
// // //                         <div className="individual-names">
// // //                           <img
// // //                             src="https://cdnb.artstation.com/p/assets/images/images/034/457/373/large/shin-min-jeong-.jpg?1612345104"
// // //                             alt="profile-img"
// // //                           />
// // //                           <div className="d-flex justify-content-between">
// // //                             <div>
// // //                               <p className="individual-name">Navya</p>
// // //                               <p className="individual-id text-muted mb-2">
// // //                                 {eachEmployee.employee_id}
// // //                               </p>
// // //                               <p className="individual-id">demo@gmail.com</p>
// // //                             </div>
// // //                           </div>
// // //                           <div className="status in-status">
// // //                             {eachEmployee.checkin.length > 0 ? (
// // //                               <span className="fw-semibold">In</span>
// // //                             ) : (
// // //                               "Not In"
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ))}
// // //               </>
// // //             ) : (
// // //               "No-Data"
// // //             )}
// // //           </div>
// // //         )
// // //       )}
// // //     </>
// // //   );
// // // }

// // // export default TodayAttendanceCardView;

// // // import React, { useEffect, useState } from "react";
// // // import { useThemeContext } from "../../Contexts/ThemesContext";
// // // import { backEndCallObjNothing } from "../../../services/mainService";
// // // import { useStateContext } from "../../Contexts/StateContext";
// // // import { Date_Input } from "../../common/ALLINPUTS/AllInputs";
// // // import Loader from "../../Loader/Loader";

// // // function TodayAttendanceCardView() {
// // //   const { applicationColor } = useThemeContext();
// // //   const { todayAttendance, setTodayAttendance } = useStateContext();
// // //   const [loading, setLoading] = useState(false);
// // //   const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Initialize with today's date

// // //   const cardViewHeadings = ["Late Checkin", "On Leave", "All Checkin's"];

// // //   const fetchAttendanceData = async (selectedDate) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await backEndCallObjNothing("/user_get/today_attendance", {
// // //         skip: 0, // Example skip value, adjust as needed
// // //         date: selectedDate // Optional date filter
// // //       });
// // //       setTodayAttendance(response.today_attendance);
// // //     } catch (error) {
// // //       console.error("Error fetching attendance data:", error);
// // //     }
// // //     setLoading(false);
// // //   };

// // //   useEffect(() => {
// // //     fetchAttendanceData(date); // Fetch data for today's date on component mount
// // //   }, []);

// // //   const handleDateChange = (e) => {
// // //     setDate(e.target.value);
// // //   };

// // //   const handleDateSubmit = () => {
// // //     fetchAttendanceData(date);
// // //   };

// // //   const lateCheckins = todayAttendance?.filter(employee => employee.grace_time > 0) || [];
// // //   const onLeave = todayAttendance?.filter(employee => employee.status === 'leave') || [];
// // //   const allCheckins = todayAttendance || [];

// // //   return (
// // //     <>
// // //       <div className="today-attendance-wrapper">
// // //         <div className="date-input">
// // //           <Date_Input
// // //             name={"date"}
// // //             value={date}
// // //             onChange={handleDateChange}
// // //             min={
// // //               new Date(
// // //                 new Date().getFullYear() - 55,
// // //                 new Date().getMonth(),
// // //                 new Date().getDate()
// // //               ).toISOString().split("T")[0]
// // //             }
// // //             max={new Date().toISOString().split("T")[0]}
// // //           />
// // //           {date && (
// // //             <button
// // //               disabled={loading}
// // //               onClick={handleDateSubmit}
// // //             >
// // //               {loading ? <Loader/> : "Submit"}
// // //             </button>
// // //           )}
// // //         </div>
// // //         <div className="tabs">
// // //           {cardViewHeadings.map((tab) => (
// // //             <button key={tab} onClick={() => {}}>
// // //               {tab}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //       {cardViewHeadings.map((item) =>
// // //         item === "Late Checkin" ? (
// // //           <div className="late-checkin-data" key={item}>
// // //             <div className="late-checkin-heading">
// // //               <p>{item}</p>
// // //               <p className="count late-count">{lateCheckins.length}</p>
// // //             </div>
// // //             <div className="late-checkin-info">
// // //               {lateCheckins.length > 0 ? (
// // //                 lateCheckins.map((employee) => (
// // //                   <div
// // //                     key={employee.employee_id}
// // //                     className="late-checkin-individual"
// // //                     style={{
// // //                       background: applicationColor.cardBg1,
// // //                       color: applicationColor.readColor1,
// // //                     }}
// // //                   >
// // //                     <div className="individual-names">
// // //                       <img
// // //                         src="https://cdnb.artstation.com/p/assets/images/images/034/457/411/large/shin-min-jeong-.jpg?1612345193"
// // //                         alt="profile-img"
// // //                       />
// // //                       <div className="d-flex justify-content-between">
// // //                         <div>
// // //                           <p className="individual-name">Akash</p>
// // //                           <p className="individual-id text-muted mb-2">
// // //                             {employee.employee_id}
// // //                           </p>
// // //                           <p className="individual-id">stany@gmail.com</p>
// // //                         </div>
// // //                       </div>
// // //                       <div className="status late-status">
// // //                         <span className="fw-semibold">Late</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <p>No late check-ins</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ) : item === "On Leave" ? (
// // //           <div className="late-checkin-data" key={item}>
// // //             <div className="late-checkin-heading">
// // //               <p>{item}</p>
// // //               <p className="count leave-count">{onLeave.length}</p>
// // //             </div>
// // //             <div className="late-checkin-info">
// // //               {onLeave.length > 0 ? (
// // //                 onLeave.map((employee) => (
// // //                   <div
// // //                     key={employee.employee_id}
// // //                     className="late-checkin-individual"
// // //                     style={{
// // //                       background: applicationColor.cardBg1,
// // //                       color: applicationColor.readColor1,
// // //                     }}
// // //                   >
// // //                     <div className="individual-names">
// // //                       <img
// // //                         src="https://cdna.artstation.com/p/assets/images/images/034/457/398/large/shin-min-jeong-.jpg?1612345160"
// // //                         alt="profile-img"
// // //                       />
// // //                       <div className="d-flex justify-content-between">
// // //                         <div>
// // //                           <p className="individual-name">Stany</p>
// // //                           <p className="individual-id text-muted mb-2">
// // //                             {employee.employee_id}
// // //                           </p>
// // //                           <p className="individual-id">stany@gmail.com</p>
// // //                         </div>
// // //                       </div>
// // //                       <div className="status out-status">
// // //                         <span className="fw-semibold">Out</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <p>No employees on leave</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="late-checkin-data" key={item}>
// // //             <div className="late-checkin-heading">
// // //               <p>{item}</p>
// // //               <p className="count checkin-count">{allCheckins.length}</p>
// // //             </div>
// // //             {allCheckins.length > 0 ? (
// // //               allCheckins.map((employee) => (
// // //                 <div
// // //                   key={employee.employee_id}
// // //                   className="late-checkin-individual"
// // //                   style={{
// // //                     background: applicationColor.cardBg1,
// // //                     color: applicationColor.readColor1,
// // //                   }}
// // //                 >
// // //                   <div className="individual-names">
// // //                     <img
// // //                       src="https://cdnb.artstation.com/p/assets/images/images/034/457/373/large/shin-min-jeong-.jpg?1612345104"
// // //                       alt="profile-img"
// // //                     />
// // //                     <div className="d-flex justify-content-between">
// // //                       <div>
// // //                         <p className="individual-name">Navya</p>
// // //                         <p className="individual-id text-muted mb-2">
// // //                           {employee.employee_id}
// // //                         </p>
// // //                         <p className="individual-id">demo@gmail.com</p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="status in-status">
// // //                       {employee.checkin.length > 0 ? (
// // //                         <span className="fw-semibold">In</span>
// // //                       ) : (
// // //                         "Not In"
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))
// // //             ) : (
// // //               <p>No-Data</p>
// // //             )}
// // //           </div>
// // //         )
// // //       )}
// // //     </>
// // //   );
// // // }

// // // export default TodayAttendanceCardView;
// // import React, { useEffect, useState } from "react";
// // import { useThemeContext } from "../../Contexts/ThemesContext";
// // import { backEndCallObjNothing } from "../../../services/mainService";
// // import { useStateContext } from "../../Contexts/StateContext";
// // import { Date_Input } from "../../common/ALLINPUTS/AllInputs";

// // function TodayAttendanceCardView() {
// //   const { applicationColor } = useThemeContext();
// //   const { todayAttendance, setTodayAttendance } = useStateContext();
// //   const [form, setForm] = useState({
// //     dateTime: new Date().toISOString().split("T")[0],
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [loadingTerm, setLoadingTerm] = useState("");
// //   const cardViewHeadings = ["Late Checkin", "On Leave", "All Checkin's"];
// //   const arrToDisplyDummyData = [1, 2, 3, 4];

// //   const fetchAttendanceData = async (date) => {
// //     try {
// //       setLoading(true);
// //       const response = await backEndCallObjNothing("/user_get/today_attendance", {
// //         skip: 0, // Example skip value, adjust as needed
// //         date: date || form.dateTime,
// //       });
// //       setTodayAttendance(response.today_attendance);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching attendance data:", error);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAttendanceData();
// //   }, []);

// //   const handleDateChange = (event) => {
// //     setForm({ ...form, dateTime: event.target.value });
// //     fetchAttendanceData(event.target.value);
// //   };

// //   const lateCheckins = todayAttendance?.filter(employee => employee.grace_time > 0) || [];
// //   const onLeave = todayAttendance?.filter(employee => employee.status === 'leave') || [];
// //   const allCheckins = todayAttendance || [];

// //   return (
// //     <>
// //       <div className="today-attendance-wrapper">
// //       <div className="today-attendance-wrapper">

// //          <div className="date-input">
// //          <Date_Input
// //            name="dateTime"
// //            value={form.dateTime}
// //            onChange={handleDateChange}
// //            min={
// //              new Date(
// //                new Date().getFullYear() - 55,
// //                new Date().getMonth(),
// //                new Date().getDate()
// //              )
// //                .toISOString()
// //                .split("T")[0]
// //            }
// //            max={new Date().toISOString().split("T")[0]}
// //          />
// //          {form.dateTime && (
// //            <button
// //              disabled={loadingTerm === "gettingAttendanceByDate"}
// //              onClick={() => fetchAttendanceData(form.dateTime)}
// //            >
// //              {loading && loadingTerm === "gettingAttendanceByDate" ? "Loading..." : "Submit"}
// //            </button>
// //          )}
// //        </div>

// //          </div>
// //          {/* <div className="tabs">
// //            {tabs.map((tab) => (
// //              <button key={tab.name} onClick={() => handleTabChange(tab.name)}>
// //                {tab.label}
// //              </button>
// //            ))}

// //        </div> */}
// //         <div className="tabs">
// //            {cardViewHeadings.map((tab) => (
// //             <button key={tab} onClick={() => {}}>
// //               {tab}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //       {cardViewHeadings.map((item) => (
// //         <div className="late-checkin-data" key={item}>
// //           <div className="late-checkin-heading">
// //             <p>{item}</p>
// //             <p className={`count ${item.toLowerCase().replace(' ', '-')}-count`}>
// //               {item === "Late Checkin" ? lateCheckins.length : item === "On Leave" ? onLeave.length : allCheckins.length}
// //             </p>
// //           </div>
// //           <div className="late-checkin-info">
// //             {item === "Late Checkin" && lateCheckins.length > 0
// //               ? lateCheckins.map((employee) => (
// //                   <div
// //                     key={employee.employee_id}
// //                     className="late-checkin-individual"
// //                     style={{
// //                       background: applicationColor.cardBg1,
// //                       color: applicationColor.readColor1,
// //                     }}
// //                   >
// //                     <div className="individual-names">
// //                       <img
// //                         src="https://cdnb.artstation.com/p/assets/images/images/034/457/411/large/shin-min-jeong-.jpg?1612345193"
// //                         alt="profile-img"
// //                       />
// //                       <div className="d-flex justify-content-between">
// //                         <div>
// //                           <p className="individual-name">Akash</p>
// //                           <p className="individual-id text-muted mb-2">{employee.employee_id}</p>
// //                           <p className="individual-id">stany@gmail.com</p>
// //                           <p className="individual-id">{employee.checkin[0]?.in_time}</p>
// //                           <p className="individual-id">{employee.checkout[0]?.out_time}</p>
// //                         </div>
// //                       </div>
// //                       <div className="status late-status">
// //                         <span className="fw-semibold">Late</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))
// //               : item === "On Leave" && onLeave.length > 0
// //               ? onLeave.map((employee) => (
// //                   <div
// //                     key={employee.employee_id}
// //                     className="late-checkin-individual"
// //                     style={{
// //                       background: applicationColor.cardBg1,
// //                       color: applicationColor.readColor1,
// //                     }}
// //                   >
// //                     <div className="individual-names">
// //                       <img
// //                         src="https://cdna.artstation.com/p/assets/images/images/034/457/398/large/shin-min-jeong-.jpg?1612345160"
// //                         alt="profile-img"
// //                       />
// //                       <div className="d-flex justify-content-between">
// //                         <div>
// //                           <p className="individual-name">Stany</p>
// //                           <p className="individual-id text-muted mb-2">{employee.employee_id}</p>
// //                           <p className="individual-id">stany@gmail.com</p>
// //                         </div>
// //                       </div>
// //                       <div className="status out-status">
// //                         <span className="fw-semibold">Out</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))
// //               : item === "All Checkin's" && allCheckins.length > 0
// //               ? allCheckins.map((employee) => (
// //                   <div
// //                     key={employee.employee_id}
// //                     className="late-checkin-individual"
// //                     style={{
// //                       background: applicationColor.cardBg1,
// //                       color: applicationColor.readColor1,
// //                     }}
// //                   >
// //                     <div className="individual-names">
// //                       <img
// //                         src="https://cdnb.artstation.com/p/assets/images/images/034/457/373/large/shin-min-jeong-.jpg?1612345104"
// //                         alt="profile-img"
// //                       />
// //                       <div className="d-flex justify-content-between">
// //                         <div>
// //                           <p className="individual-name">Navya</p>
// //                           <p className="individual-id text-muted mb-2">{employee.employee_id}</p>
// //                           <p className="individual-id">demo@gmail.com</p>
// //                           <p className="individual-id">{employee.checkin[0]?.in_time}</p>
// //                           <p className="individual-id">{employee.checkout[0]?.out_time}</p>
// //                         </div>
// //                       </div>
// //                       <div className="status in-status">
// //                         {employee.checkin.length > 0 ? (
// //                           <span className="fw-semibold">In</span>
// //                         ) : (
// //                           "Not In"
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))
// //               : <p>No data available</p>}
// //           </div>
// //         </div>
// //       ))}
// //     </>
// //   );
// // }

// // export default TodayAttendanceCardView;
// import React, { useEffect, useState } from "react";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../../services/mainService";
// import { useStateContext } from "../../Contexts/StateContext";
// import { Date_Input } from "../../common/ALLINPUTS/AllInputs";

// function TodayAttendanceCardView() {
//   const { applicationColor } = useThemeContext();
//   const { todayAttendance, setTodayAttendance } = useStateContext();
//   const [form, setForm] = useState({
//     dateTime: new Date().toISOString().split("T")[0],
//   });
//   const [loading, setLoading] = useState(false);
//   const [loadingTerm, setLoadingTerm] = useState("");
//   const cardViewHeadings = ["Late Checkin", "On Leave", "All Checkin's"];
//   const arrToDisplyDummyData = [1, 2, 3, 4];

//   const fetchAttendanceData = async (date) => {
//     try {
//       setLoading(true);
//       const response = await backEndCallObjNothing("/user_get/today_attendance", {
//         skip: 0, // Example skip value, adjust as needed
//         date: date || form.dateTime,
//       });
//       console.log("response",response)
//       setTodayAttendance(response.today_attendance);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching attendance data:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAttendanceData();
//   }, []);

//   const handleDateChange = (event) => {
//     setForm({ ...form, dateTime: event.target.value });
//     fetchAttendanceData(event.target.value);
//   };

//   const lateCheckins = todayAttendance?.filter(employee => employee.grace_time > 0) || [];
//   const onLeave = todayAttendance?.filter(employee => employee.status === 'leave') || [];
//   const allCheckins = todayAttendance || [];

//   return (
//     <>
//       <div className="today-attendance-wrapper">
//         <div className="date-input">
//           <Date_Input
//             name="dateTime"
//             value={form.dateTime}
//             onChange={handleDateChange}
//             setForm={setForm}
//             min={
//               new Date(
//                 new Date().getFullYear() - 55,
//                 new Date().getMonth(),
//                 new Date().getDate()
//               )
//                 .toISOString()
//                 .split("T")[0]
//             }
//             max={new Date().toISOString().split("T")[0]}
//           />
//           {form.dateTime && (
//             <button
//               disabled={loadingTerm === "gettingAttendanceByDate"}
//               onClick={() => fetchAttendanceData(form.dateTime)}
//             >
//               {loading && loadingTerm === "gettingAttendanceByDate" ? "Loading..." : "Submit"}
//             </button>
//           )}
//         </div>
//         <div className="tabs">
//           {cardViewHeadings.map((tab) => (
//             <button key={tab} onClick={() => {}}>
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>
//       {cardViewHeadings.map((item) => (
//         <div className="late-checkin-data" key={item}>
//           <div className="late-checkin-heading">
//             <p>{item}</p>
//             <p className={`count ${item.toLowerCase().replace(' ', '-')}-count`}>

//               {item === "Late Checkin" ? lateCheckins.length : item === "On Leave" ? onLeave.length : allCheckins.length}

//             </p>
//           </div>
//           <div className="late-checkin-info">

//             {item === "Late Checkin" && lateCheckins.length > 0
//               ? lateCheckins.map((employee) => (
//                   <div
//                     key={employee.employee_id}
//                     className="late-checkin-individual"
//                     style={{
//                       background: applicationColor.cardBg1,
//                       color: applicationColor.readColor1,
//                     }}
//                   >
//                     <div className="individual-names">
//                       <img
//                         src="https://cdnb.artstation.com/p/assets/images/images/034/457/411/large/shin-min-jeong-.jpg?1612345193"
//                         alt="profile-img"
//                       />
//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <p className="individual-name">{employee.employee_name}</p>
//                           <p className="individual-id text-muted mb-2">{employee.employee_id}</p>
//                           <p className="individual-id">{employee.email}</p>
//                           <p className="individual-id">{employee.checkin[0]?.in_time}</p>
//                           <p className="individual-id">{employee.checkout[0]?.out_time}</p>
//                         </div>
//                       </div>
//                       <div className="status late-status">
//                         <span className="fw-semibold">Late</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))

//               : item === "On Leave" && onLeave.length > 0
//               ? onLeave.map((employee) => (
//                   <div
//                     key={employee.employee_id}
//                     className="late-checkin-individual"
//                     style={{
//                       background: applicationColor.cardBg1,
//                       color: applicationColor.readColor1,
//                     }}
//                   >
//                     <div className="individual-names">
//                       <img
//                         src="https://cdna.artstation.com/p/assets/images/images/034/457/398/large/shin-min-jeong-.jpg?1612345160"
//                         alt="profile-img"
//                       />
//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <p className="individual-name">Stany</p>
//                           <p className="individual-id text-muted mb-2">{employee.employee_id}</p>
//                           <p className="individual-id">stany@gmail.com</p>
//                         </div>
//                       </div>
//                       <div className="status out-status">
//                         <span className="fw-semibold">Out</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               : item === "All Checkin's" && allCheckins.length > 0
//               ? allCheckins.map((employee) => (
//                   <div
//                     key={employee.employee_id}
//                     className="late-checkin-individual"
//                     style={{
//                       background: applicationColor.cardBg1,
//                       color: applicationColor.readColor1,
//                     }}
//                   >
//                     <div className="individual-names">
//                       <img
//                         src="https://cdnb.artstation.com/p/assets/images/images/034/457/373/large/shin-min-jeong-.jpg?1612345104"
//                         alt="profile-img"
//                       />
//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <p className="individual-name">Navya</p>
//                           <p className="individual-id text-muted mb-2">{employee.employee_id}</p>
//                           <p className="individual-id">demo@gmail.com</p>
//                           <p className="individual-id">{employee.checkin[0]?.in_time}</p>
//                           <p className="individual-id">{employee.checkout[0]?.out_time}</p>
//                         </div>
//                       </div>
//                       <div className="status in-status">
//                         {employee.checkin.length > 0 ? (
//                           <span className="fw-semibold">In</span>
//                         ) : (
//                           "Not In"
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               : <p>No data available</p>}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export default TodayAttendanceCardView;

import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../../services/mainService";
import { useStateContext } from "../../Contexts/StateContext";
import { Date_Input } from "../../common/ALLINPUTS/AllInputs";

function TodayAttendanceCardView() {
  const { applicationColor } = useThemeContext();
  const { todayAttendanceAdmin, setTodayAttendanceAdmin } = useStateContext();
  const [form, setForm] = useState({
    dateTime: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [loadingTerm, setLoadingTerm] = useState("");
  let [currentTab, setCurrentTab] = useState("card-view");

  let tabs = [
    { name: "table-view", label: "Table View" },
    { name: "card-view", label: "Card View" },
  ];

  const handleTabChange = (tabname) => {
    setCurrentTab(tabname);
  };

  const fetchAttendanceData = async (date) => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing(
        "/user_get/today_attendance",
        {
          skip: 0,
          date: date || form.dateTime,
        }
      );
      console.log("response", response);
      setTodayAttendanceAdmin(response.today_attendance);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const handleDateChange = (event) => {
    setForm({ ...form, dateTime: event.target.value });
    fetchAttendanceData(event.target.value);
  };

  const lateCheckins = todayAttendanceAdmin?.filter(
    (employee) => employee.late_checkin === true
  );
  const allCheckins = todayAttendanceAdmin?.filter(
    (employee) => employee.late_checkin === false
  );
  const leaveApplications = todayAttendanceAdmin?.filter(
    (employee) => employee.status === "leave"
  );

  console.log("lateCheckins", lateCheckins);
  console.log("allCheckins", allCheckins);
  console.log("leaveApplications", leaveApplications);
  console.log(todayAttendanceAdmin, "todayAttendanceAdmin");
  return (
    <>
      {/* <div className="today-attendance-wrapper">
        <div className="tabs">
          {tabs.map((tab) => (
            <button key={tab.name} onClick={() => handleTabChange(tab.name)}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="date-input">
          <Date_Input
            name="dateTime"
            value={form.dateTime}
            onChange={handleDateChange}
            setForm={setForm}
            min={
              new Date(
                new Date().getFullYear() - 55,
                new Date().getMonth(),
                new Date().getDate()
              )
                .toISOString()
                .split("T")[0]
            }
            max={new Date().toISOString().split("T")[0]}
          />
          {form.dateTime && (
            <button
              disabled={loadingTerm === "gettingAttendanceByDate"}
              onClick={() => fetchAttendanceData(form.dateTime)}
            >
              {loading && loadingTerm === "gettingAttendanceByDate"
                ? "Loading..."
                : "Submit"}
            </button>
          )}
        </div>
      </div> */}

      <div className="late-checkin-data">
        {lateCheckins ? (
          <div className="late-checkin-heading">
            <p>{lateCheckins ? "Late Checkin" : ""}</p>
            <p className="count late-count">{lateCheckins.length}</p>{" "}
          </div>
        ) : null}

        <div className="late-checkin-info">
          {lateCheckins.length > 0 ? (
            lateCheckins.map((employee) => (
              <div
                key={employee.employee_id}
                className="late-checkin-individual"
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                <div className="individual-names">
                  <img
                    src="https://cdnb.artstation.com/p/assets/images/images/034/457/411/large/shin-min-jeong-.jpg?1612345193"
                    alt="profile-img"
                  />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="individual-name">
                        {employee.employee_name}
                      </p>
                      <p className="individual-id text-muted mb-2">
                        {employee.employee_id}
                      </p>
                      <p className="individual-id">{employee.email}</p>
                      {/* <p className="individual-id">
                          {employee.checkin[0]?.in_time}
                        </p>
                        <p className="individual-id">
                          {employee.checkout[0]?.out_time}
                        </p> */}
                    </div>
                  </div>
                  <div className="status late-status">
                    <span className="fw-semibold">Late</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center w-100">
              <p>No Data</p>
            </div>
          )}
        </div>
      </div>

      <div className="late-checkin-data">
        {leaveApplications ? (
          <div className="late-checkin-heading">
            <p>{leaveApplications ? "On Leave" : ""}</p>
            <p className="count leave-count">{leaveApplications.length}</p>{" "}
          </div>
        ) : null}

        <div className="late-checkin-info">
          {leaveApplications.length > 0 ? (
            leaveApplications.map((employee) => (
              <div
                key={employee.employee_id}
                className="late-checkin-individual"
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                <div className="individual-names">
                  <img
                    src="https://cdnb.artstation.com/p/assets/images/images/034/457/411/large/shin-min-jeong-.jpg?1612345193"
                    alt="profile-img"
                  />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="individual-name">
                        {employee.employee_name}
                      </p>
                      <p className="individual-id text-muted mb-2">
                        {employee.employee_id}
                      </p>
                      <p className="individual-id">{employee.email}</p>
                      {/* <p className="individual-id">
                          {employee.checkin[0]?.in_time}
                        </p>
                        <p className="individual-id">
                          {employee.checkout[0]?.out_time}
                        </p> */}
                    </div>
                  </div>
                  <div className="status out-status">
                    <span className="fw-semibold">Out</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="d-flex justify-content-center w-100 py-2"
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}
            >
              <p>No Leaves - Today</p>
            </div>
          )}
        </div>
      </div>

      <div className="late-checkin-data">
        {allCheckins ? (
          <div className="late-checkin-heading">
            <p>{allCheckins ? "All Checkin" : ""}</p>
            <p className="count checkin-count">{allCheckins.length}</p>{" "}
          </div>
        ) : null}

        <div className="late-checkin-info">
          {allCheckins.length > 0 ? (
            allCheckins.map((employee) => (
              <div
                key={employee.employee_id}
                className="late-checkin-individual"
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                <div className="individual-names">
                  <img
                    src="https://cdnb.artstation.com/p/assets/images/images/034/457/373/large/shin-min-jeong-.jpg?1612345104"
                    alt="profile-img"
                  />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="individual-name">
                        {employee.employee_name}
                      </p>
                      <p className="individual-id text-muted mb-2">
                        {employee.employee_id}
                      </p>
                      <p className="individual-id">{employee.email}</p>
                      {/* <p className="individual-id">
                          {employee.checkin[0]?.in_time}
                        </p>
                        <p className="individual-id">
                          {employee.checkout[0]?.out_time}
                        </p> */}
                    </div>
                  </div>
                  <div className="status in-status">
                    <span className="fw-semibold">In</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center w-100">
              <p>No Data</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TodayAttendanceCardView;
