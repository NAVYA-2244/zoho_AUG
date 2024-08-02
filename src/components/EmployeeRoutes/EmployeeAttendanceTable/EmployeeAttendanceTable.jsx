// // // import React, { useEffect, useState } from "react";
// // // // import "./EmployeeAttendanceTable.scss";
// // // import TableHead from "../../Table/TableHead";
// // // import { useStateContext } from "../../Contexts/StateContext";
// // // import { getDaysInMonth } from "date-fns";
// // // import { Select_inputs } from "../../common/ALLINPUTS/AllInputs";
// // // // import "./EmployeeAttendanceTable.scss";
// // // import { useThemeContext } from "../../Contexts/ThemesContext";
// // // import { makeNetworkCall } from "../../../HttpServices/HttpService";
// // // import Loader from "../../Loader/Loader";
// // // import { backEndCallObjNothing } from "../../../services/mainService";

// // // const EmployeeAttendanceTable = () => {
// // //   const {
// // //     attendanceData,
// // //     setLoading,
// // //     setLoadingTerm,
// // //     loadingTerm,
// // //     loading,
// // //     setAttandanceData,
// // //   } = useStateContext();
// // //   const [employeeAttendance, setEmployeeAttendance] = useState([]);
// // //   const [skip, setSkip] = useState(0);
// // //   const [limit, setLimit] = useState(7);

// // //   console.log({ attendanceData }, "navyaaaaaaaa");

// // //   const { applicationColor } = useThemeContext();
// // //   const [dateState, setDateState] = useState({
// // //     selectedYear: "",
// // //     selectedMonth: "",
// // //   });
// // //   useEffect(() => {
// // //     const fetchingData = async () => {
// // //       try {
// // //         let response = await backEndCallObjNothing("/emp_get/get_attendance", {
// // //           skip,
// // //           limit,
// // //         });
// // //         setEmployeeAttendance(response.attendance);

// // //         console.log(response, "responsennn");

// // //         console.log(employeeAttendance[0].checkin, "checkin");
// // //         // if (employeeAttendance[0]) {
// // //         //   const checkIn = (employeeAttendance[0].checkin, "checkin");
// // //         //   setcheckinTime(checkIn);
// // //         // }
// // //       } catch (error) {
// // //         // toast.error(
// // //         //   error?.response?.data || "Something went wrong",
// // //         //   toastOptions
// // //         // );
// // //       }
// // //     };
// // //     fetchingData();
// // //   }, [skip, limit]);

// // //   const years = Array.from(
// // //     { length: 10 },
// // //     (_, i) => new Date().getFullYear() - i
// // //   );
// // //   const months = Array.from({ length: 12 }, (_, i) => i + 1);

// // //   let tableHeadProperties = [
// // //     { name: "Employee Id", property: "employeeId", type: "string" },
// // //     { name: "Name", property: "employeeName", type: "string" },
// // //     { name: "Date", property: "dateTime", type: "string" },
// // //     { name: "Status", property: "status", type: "string" },
// // //     { name: "checkIn", property: "checkIn.time", type: "string" },
// // //     { name: "checkOut", property: "checkOut.time", type: "string" },
// // //     {
// // //       name: "Total Hours",
// // //       property: "workedHours",
// // //       type: "string",
// // //       style: { textAlign: "center", paddingLeft: "50px" },
// // //     },
// // //   ];

// // //   const getSpecificData = async (e) => {
// // //     try {
// // //       e.preventDefault();
// // //       setLoading(true);
// // //       setLoadingTerm("attendanceFromTo");

// // //       const { detail } = await makeNetworkCall(
// // //         {
// // //           totalAttendanceFilters: {
// // //             year: Number(dateState.selectedYear),
// // //             month: Number(dateState.selectedMonth),
// // //             fromDate: "",
// // //             toDate: "",
// // //           },
// // //         },
// // //         "getEmployeeData",
// // //         "headers"
// // //       );
// // //       setAttandanceData(detail.totalAttendance);
// // //     } catch (error) {
// // //       setLoading(false);
// // //       setLoadingTerm("");
// // //     } finally {
// // //       setLoading(false);
// // //       setLoadingTerm("");
// // //     }
// // //   };

// // //   return (
// // //     <main
// // //       className="employee_attendace_table"
// // //       style={{
// // //         color: applicationColor.readColor1,
// // //       }}
// // //     >
// // //       <form className="year-month-day-selects" onSubmit={getSpecificData}>
// // //         <Select_inputs
// // //           name={"selectedYear"}
// // //           placeholder={"Select year"}
// // //           value={dateState.selectedYear}
// // //           setForm={setDateState}
// // //           options={[...years]}
// // //         />
// // //         <Select_inputs
// // //           name={"selectedMonth"}
// // //           placeholder={"Select Month"}
// // //           value={dateState.selectedMonth}
// // //           setForm={setDateState}
// // //           options={[...months]}
// // //         />
// // //         <Select_inputs
// // //           name={"EmployeeId"}
// // //           placeholder={"EmployeeId"}
// // //           value={dateState.EmployeeId}
// // //           setForm={setDateState}
// // //         // options={[...EmployeeId]}
// // //         />

// // //         {dateState.selectedMonth && dateState.selectedYear ? (
// // //           <button
// // //             style={{ background: applicationColor.tabColor }}
// // //             disabled={loadingTerm === "attendanceFromTo"}
// // //           >
// // //             {loading && loadingTerm === "attendanceFromTo" ? (
// // //               <Loader />
// // //             ) : (
// // //               "Submit"
// // //             )}
// // //           </button>
// // //         ) : (
// // //           ""
// // //         )}
// // //       </form>
// // //       {/* <h2 className="leave-application-heading">Attendance Tabular View</h2> */}

// // //       <section className="tables">
// // //         <table className="main-table">
// // //           <TableHead
// // //             tableHeadProperties={tableHeadProperties}
// // //             data={attendanceData || []}
// // //           />
// // //         </table>

// // //         <Loader></Loader>
// // //       </section>
// // //     </main>
// // //   );
// // // };

// // // export default EmployeeAttendanceTable;

// // import React, { useEffect, useState } from "react";
// // import TableHead from "../../Table/TableHead";
// // import { useStateContext } from "../../Contexts/StateContext";
// // import { Select_inputs } from "../../common/ALLINPUTS/AllInputs";
// // import { useThemeContext } from "../../Contexts/ThemesContext";
// // import { makeNetworkCall } from "../../../HttpServices/HttpService";
// // import Loader from "../../Loader/Loader";
// // import { backEndCallObjNothing } from "../../../services/mainService";

// // const EmployeeAttendanceTable = () => {
// //   const {
// //     attendanceData,
// //     setLoading,
// //     setLoadingTerm,
// //     loadingTerm,
// //     loading,
// //     setAttandanceData,
// //   } = useStateContext();
// //   // const [employeeAttendance, setEmployeeAttendance] = useState([]);
// //   const [skip, setSkip] = useState(0);
// //   const [limit, setLimit] = useState(7);
// //   const { applicationColor } = useThemeContext();
// //   const [dateState, setDateState] = useState({
// //     selectedYear: "",
// //     selectedMonth: "",
// //   });
// //   console.log({ attendanceData }, "navyaaaaaaaa");

// //   useEffect(() => {
// //     const fetchingData = async () => {
// //       try {
// //         setLoading(true);
// //         let response = await backEndCallObjNothing("/emp_get/get_attendance", {
// //           skip,
// //           limit,
// //         });
// //         setAttandanceData(response.attendance);
// //         setLoading(false);
// //         console.log(response, "response");
// //       } catch (error) {
// //         setLoading(false);
// //         console.error("Error fetching attendance data", error);
// //       }
// //     };
// //     fetchingData();
// //   }, [skip, limit]);

// //   const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
// //   const months = Array.from({ length: 12 }, (_, i) => i + 1);
// //   useEffect(() => {
// //     if (attendanceData) {
// //       attendanceData.forEach((entry) => {
// //         const checkinTimes = entry.checkin.map(e => e.in_time);
// //         const checkoutTimes = entry.checkout.map(e => e.out_time);
// //         console.log(checkinTimes, "checkin times");
// //         console.log(checkoutTimes, "checkout");

// //       });
// //     }
// //   }, [attendanceData,]);

// //   const tableHeadProperties = [
// //     { name: "Employee Id", property: "employee_id", type: "string" },
// //     { name: "Date", property: "createdAt", type: "string" },
// //     { name: "Status", property: "status", type: "string" },
// //     { name: "Check In", property: "checkinTimes", type: "string" },
// //     { name: "Check Out", property: "checkoutTimes", type: "string" },
// //     {
// //       name: "Total Hours",
// //       property: "total_working_minutes",
// //       type: "string",
// //       style: { textAlign: "center", paddingLeft: "50px" },
// //     },
// //   ]

// //   const getSpecificData = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setLoadingTerm("attendanceFromTo");

// //     try {
// //       const { detail } = await makeNetworkCall(
// //         {
// //           totalAttendanceFilters: {
// //             year: Number(dateState.selectedYear),
// //             month: Number(dateState.selectedMonth),
// //             fromDate: "",
// //             toDate: "",
// //           },
// //         },
// //         "getEmployeeData",
// //         "headers"
// //       );
// //       setAttandanceData(detail.totalAttendance);
// //     } catch (error) {
// //       console.error("Error fetching specific data", error);
// //     } finally {
// //       setLoading(false);
// //       setLoadingTerm("");
// //     }
// //   };
// //   // Function to format check-in and check-out times
// //   const formatTimes = (timesArray, timeType) => {
// //     if (timesArray && timesArray.length > 0) {
// //       return timesArray.map(entry => entry[timeType]).join(', ');
// //     }
// //     return 'N/A';
// //   };
// //   return (
// //     <main
// //       className="employee_attendance_table"
// //       style={{
// //         color: applicationColor.readColor1,
// //       }}
// //     >
// //       <form className="year-month-day-selects" onSubmit={getSpecificData}>
// //         <Select_inputs
// //           name={"selectedYear"}
// //           placeholder={"Select year"}
// //           value={dateState.selectedYear}
// //           setForm={setDateState}
// //           options={[...years]}
// //         />
// //         <Select_inputs
// //           name={"selectedMonth"}
// //           placeholder={"Select Month"}
// //           value={dateState.selectedMonth}
// //           setForm={setDateState}
// //           options={[...months]}
// //         />
// //         <Select_inputs
// //           name={"EmployeeId"}
// //           placeholder={"EmployeeId"}
// //           value={dateState.EmployeeId}
// //           setForm={setDateState}
// //         // options={[...EmployeeId]}
// //         />

// //         {dateState.selectedMonth && dateState.selectedYear ? (
// //           <button
// //             style={{ background: applicationColor.tabColor }}
// //             disabled={loadingTerm === "attendanceFromTo"}
// //           >
// //             {loading && loadingTerm === "attendanceFromTo" ? (
// //               <Loader />
// //             ) : (
// //               "Submit"
// //             )}
// //           </button>
// //         ) : (
// //           ""
// //         )}
// //       </form>
// //       <section className="tables">
// //         <table className="main-table">

// //           <TableHead tableHeadProperties={tableHeadProperties} />
// //           {/* <TableHead tableHeadProperties={tableHeadProperties}
// //             data={attendanceData || []}
// //           /> */}
// //           <tbody>
// //             {attendanceData?.map((attendance) => (
// //               <tr key={attendance.employee_id}>
// //                 <td>{attendance.employee_id}</td>
// //                 <td>{new Date(attendance.createdAt).toLocaleDateString()}</td>
// //                 <td>{attendance.status}</td>
// //                 <td>{formatTimes(attendance.checkin, 'in_time')}</td>
// //                 <td>{formatTimes(attendance.checkout, 'out_time')}</td>
// //                 <td style={{ textAlign: "center", paddingLeft: "50px" }}>
// //                   {attendance.total_working_minutes || 0}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //       </section>
// //     </main>
// //   );
// // };

// // export default EmployeeAttendanceTable;
// import React, { useEffect, useState } from "react";
// import TableHead from "../../Table/TableHead";
// import { useStateContext } from "../../Contexts/StateContext";
// import { Select_inputs } from "../../common/ALLINPUTS/AllInputs";
// import { useThemeContext } from "../../Contexts/ThemesContext";
// import { makeNetworkCall } from "../../../HttpServices/HttpService";
// import Loader from "../../Loader/Loader";
// import { backEndCallObjNothing } from "../../../services/mainService";
// const EmployeeAttendanceTable = () => {
//   const {
//     attendanceData,
//     setLoading,
//     setLoadingTerm,
//     loadingTerm,
//     loading,
//     setAttandanceData,
//   } = useStateContext();
//   // const [employeeAttendance, setEmployeeAttendance] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const [limit, setLimit] = useState(7);
//   const { applicationColor } = useThemeContext();
//   const [dateState, setDateState] = useState({
//     selectedYear: "",
//     selectedMonth: "",
//   });
//   console.log("navyaaaaaaaa", attendanceData);

//   useEffect(() => {
//     const fetchingData = async () => {
//       try {
//         setLoading(true);
//         let response = await backEndCallObjNothing("/emp_get/get_attendance", {
//           skip,
//           limit,
//         });
//         setAttandanceData(response.attendance);
//         setLoading(false);
//         console.log(response, "response");
//       } catch (error) {
//         setLoading(false);
//         console.error("Error fetching attendance data", error);
//       }
//     };
//     fetchingData();
//   }, [skip, limit]);
//   const years = Array.from(
//     { length: 10 },
//     (_, i) => new Date().getFullYear() - i
//   );
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);
//   useEffect(() => {
//     if (attendanceData) {
//       attendanceData.forEach((entry) => {
//         const checkinTimes = entry.checkin.map((e) => e.in_time);
//         const checkoutTimes = entry.checkout.map((e) => e.out_time);
//         console.log(checkinTimes, "checkin times");
//         console.log(checkoutTimes, "checkout");
//       });
//     }
//   }, [attendanceData]);
//   const tableHeadProperties = [
//     { name: "Employee Id", property: "employee_id", type: "string" },
//     { name: "Date", property: "createdAt", type: "string" },
//     { name: "Status", property: "status", type: "string" },
//     { name: "Check In", property: "checkinTimes", type: "string" },
//     { name: "Check Out", property: "checkoutTimes", type: "string" },
//     {
//       name: "Total Hours",
//       property: "total_working_minutes",
//       type: "string",
//       style: { textAlign: "center", paddingLeft: "50px" },
//     },
//   ];
//   const getSpecificData = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setLoadingTerm("attendanceFromTo");
//     try {
//       const { detail } = await makeNetworkCall(
//         {
//           totalAttendanceFilters: {
//             year: Number(dateState.selectedYear),
//             month: Number(dateState.selectedMonth),
//             fromDate: "",
//             toDate: "",
//           },
//         },
//         "getEmployeeData",
//         "headers"
//       );
//       setAttandanceData(detail.totalAttendance);
//     } catch (error) {
//       console.error("Error fetching specific data", error);
//     } finally {
//       setLoading(false);
//       setLoadingTerm("");
//     }
//   };
//   // Function to format check-in and check-out times
//   const formatTimes = (timesArray, timeType) => {
//     if (timesArray && timesArray.length > 0) {
//       return timesArray.map((entry) => entry[timeType]).join(", ");
//     }
//     return "N/A";
//   };
//   return (
//     <main
//       className="employee_attendance_table"
//       style={{
//         color: applicationColor.readColor1,
//       }}
//     >
//       <form className="year-month-day-selects" onSubmit={getSpecificData}>
//         <div className="row">
//           <div className="col-lg-4">
//             <Select_inputs
//               name={"selectedYear"}
//               placeholder={"Select year"}
//               value={dateState.selectedYear}
//               setForm={setDateState}
//               options={[...years]}
//             />
//           </div>
//           <div className="col-lg-4">
//             <Select_inputs
//               name={"selectedMonth"}
//               placeholder={"Select Month"}
//               value={dateState.selectedMonth}
//               setForm={setDateState}
//               options={[...months]}
//             />
//           </div>
//           <div className="col-lg-4">
//             <Select_inputs
//               name={"EmployeeId"}
//               placeholder={"EmployeeId"}
//               value={dateState.EmployeeId}
//               setForm={setDateState}
//               // options={[...EmployeeId]}
//             />
//           </div>
//         </div>

//         {dateState.selectedMonth && dateState.selectedYear ? (
//           <button
//             style={{ background: applicationColor.tabColor }}
//             disabled={loadingTerm === "attendanceFromTo"}
//           >
//             {loading && loadingTerm === "attendanceFromTo" ? (
//               <Loader />
//             ) : (
//               "Submit"
//             )}
//           </button>
//         ) : (
//           ""
//         )}
//       </form>
//       <section className="tables">
//         <table className="main-table">
//           <TableHead tableHeadProperties={tableHeadProperties} />
//           {/* <TableHead tableHeadProperties={tableHeadProperties}
//             data={attendanceData || []}
//           /> */}
//           <tbody>
//             {attendanceData?.map((attendance) => (
//               <tr key={attendance.employee_id}>
//                 <td>{attendance.employee_id}</td>
//                 <td>{new Date(attendance.createdAt).toLocaleDateString()}</td>
//                 <td>{attendance.status}</td>
//                 <td>{formatTimes(attendance.checkin, "in_time")}</td>
//                 <td>{formatTimes(attendance.checkout, "out_time")}</td>
//                 <td style={{ textAlign: "center", paddingLeft: "50px" }}>
//                   {attendance.total_working_minutes || 0}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {loading && <Loader />}
//       </section>
//     </main>
//   );
// };
// export default EmployeeAttendanceTable;
import React, { useEffect, useState, useRef, useCallback } from "react";
import TableHead from "../../Table/TableHead";
import { useStateContext } from "../../Contexts/StateContext";
import { Select_inputs } from "../../common/ALLINPUTS/AllInputs";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import Loader from "../../Loader/Loader";
import { backEndCallObjNothing } from "../../../services/mainService";
import { weekdays } from "moment-timezone";

const EmployeeAttendanceTable = () => {
  const {
    attendanceData,
    setLoading,
    setLoadingTerm,
    loadingTerm,
    loading,
    setAttandanceData,
  } = useStateContext();
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [hasMoreData, setHasMoreData] = useState(true);
  const { applicationColor } = useThemeContext();
  const [dateState, setDateState] = useState({
    year: "",
    month_date: "",
    week_date: "",
  });

  const observer = useRef();

  const fetchAttendanceData = async (reset = false) => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing("/emp_get/get_attendance", {
        skip,
        limit,
      });

      // if (response.attendance.length < limit) {
      //   setHasMoreData(false);
      // }

      setAttandanceData((prev) =>
        reset ? response.attendance : [...prev, ...response.attendance]
      );
    } catch (error) {
      console.error("Error fetching attendance data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (hasMoreData) {
    fetchAttendanceData();
    // }
  }, [skip]);

  // const loadMoreRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMoreData) {
  //         setSkip((prevSkip) => prevSkip + limit);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, limit, hasMoreData]
  // );

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentDate = new Date();
  const firstDayOfWeek =
    currentDate.getDate() - ((currentDate.getDay() + 6) % 7); // Monday as the first day of the week

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(firstDayOfWeek + i);
    return date.toLocaleDateString("en-US"); // You can format the date as needed
  });

  console.log(weekDates); // ["Monday's date", "Tuesday's date", "Wednesday's date", ...]

  useEffect(() => {
    if (attendanceData) {
      attendanceData.forEach((entry) => {
        const checkinTimes = entry.checkin.map((e) => e.in_time);
        const checkoutTimes = entry.checkout.map((e) => e.out_time);
        // console.log(checkinTimes, "checkin times");
        // console.log(checkoutTimes, "checkout");
      });
    }
  }, [attendanceData]);

  const tableHeadProperties = [
    { name: "Employee Id", property: "employee_id", type: "string" },
    { name: "Date", property: "createdAt", type: "string" },
    { name: "Status", property: "status", type: "string" },
    { name: "Check In", property: "checkinTimes", type: "string" },
    { name: "Check Out", property: "checkoutTimes", type: "string" },
    {
      name: "Total Hours",
      property: "total_working_minutes",
      type: "string",
      style: { textAlign: "center", paddingLeft: "50px" },
    },
  ];

  const getSpecificData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingTerm("attendanceFromTo");
    try {
      const { detail } = await backEndCallObjNothing(
        {
          totalAttendanceFilters: {
            year: Number(dateState.selectedYear),
            month: Number(dateState.selectedMonth),
            fromDate: "",
            toDate: "",
          },
        },
        "/emp_get/get_attendance_by_filter"
      );
      setAttandanceData(detail.totalAttendance);
      // setHasMoreData(false); // Ensure no more data is fetched after specific search
    } catch (error) {
      console.error("Error fetching specific data", error);
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  // Function to format check-in and check-out times
  const formatTimes = (timesArray, timeType) => {
    if (timesArray && timesArray.length > 0) {
      // return timesArray.map((entry) => entry[timeType]).join(", ");
      if (timeType === "in_time") {
        return extractTime(timesArray[0][timeType]);
      } else {
        return extractTime(timesArray[timesArray.length - 1][timeType]);
      }
    }
    return "-";
  };

  const extractTime = (datetime) => {
    let parts = datetime.split(" ");
    return parts[1];
  };

  let calculateHours = (minutes) => {
    let hours = (minutes / 60).toFixed(2);
    return hours !== "NaN" ? `${hours} hrs` : "-";
  };

  const findCheckin = (time) => {
    if (time.checkin.length > 0 && time.checkout.length > 0) {
      return "Present";
    } else if (time.checkin.length > 0 && time.checkout.length === 0) {
      return "Checkin";
    } else if (time.status === "leave") return "Absent";
  };

  return (
    <main
      className="employee_attendance_table"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <form className="year-month-day-selects" onSubmit={getSpecificData}>
        <div className="row">
          <div className="col-lg-4 col-md-6 ps-0">
            <Select_inputs
              name={"year"}
              placeholder={"Select year"}
              value={dateState.year}
              setForm={setDateState}
              options={years}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <Select_inputs
              name={"selectedMonth"}
              placeholder={"Select Month"}
              value={dateState.month_date}
              setForm={setDateState}
              options={months}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <Select_inputs
              name={"week_date"}
              placeholder={"Select week"}
              value={dateState.week_date}
              setForm={setDateState}
              options={weekDates}
            />
          </div>
          {/* <div className="col-lg-4 col-md-6 pe-0">
            <Select_inputs
              name={"EmployeeId"}
              placeholder={"EmployeeId"}
              value={dateState.EmployeeId}
              setForm={setDateState}
              // options={[...EmployeeId]}
            />
          </div> */}
        </div>

        {dateState.selectedMonth && dateState.selectedYear ? (
          <button
            style={{ background: applicationColor.tabColor }}
            disabled={loadingTerm === "attendanceFromTo"}
          >
            {loading && loadingTerm === "attendanceFromTo" ? (
              <Loader />
            ) : (
              "Submit"
            )}
          </button>
        ) : (
          ""
        )}
      </form>
      <section className="tables">
        <table className="main-table">
          <TableHead tableHeadProperties={tableHeadProperties} />
          <tbody>
            {console.log(attendanceData, "attendance data in table")}
            {attendanceData.length > 0 &&
              attendanceData.map((attendance, index) => (
                <tr key={index}>
                  <td>{attendance.employee_id}</td>
                  <td>{new Date(attendance.createdAt).toLocaleDateString()}</td>
                  <td>{findCheckin(attendance)}</td>
                  <td>{formatTimes(attendance.checkin, "in_time")}</td>
                  <td>{formatTimes(attendance.checkout, "out_time")}</td>
                  <td
                    style={{
                      textAlign: "center",
                      textTransform: "lowercase",
                    }}
                  >
                    {calculateHours(attendance.total_working_minutes)}
                    {/* {attendance.total_working_minutes} */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <div ref={loadMoreRef} style={{ height: "20px" }} /> */}
        {loading && <Loader />}
      </section>
    </main>
  );
};

export default EmployeeAttendanceTable;
