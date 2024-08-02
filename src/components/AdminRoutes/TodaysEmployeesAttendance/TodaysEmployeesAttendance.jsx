import React, { useCallback, useEffect, useRef } from "react";
import { useStateContext } from "../../Contexts/StateContext";
import { useState } from "react";
import TableHead from "../../Table/TableHead";
import "./TodaysAttendance.scss";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { FaUserEdit } from "react-icons/fa";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import { useNavigate } from "react-router";
import Selectinputimg from "../../EmployeeRoutes/EmployeeAttendance/Selectinputimg";
import { Date_Input } from "../../common/ALLINPUTS/AllInputs";
import { Form } from "react-router-dom";
import Loader from "../../Loader/Loader";
import AllEmployeeLists, {
  ReUsableEmployeeCard,
} from "../AdminDashboard/AllEmployeesLists/AllEmployeeLists";
import { backEndCallObjNothing } from "../../../services/mainService";
import TodayAttendanceCardView from "./TodayAttendanceCardView";

const TodaysEmployeesAttendance = () => {
  const { applicationColor } = useThemeContext();
  const {
    employeeDetails,
    setLoading,
    loading,
    setLoadingTerm,
    loadingTerm,
    todayAttendance,
    setTodayAttendance,
  } = useStateContext();
  const [skip, setSkip] = useState(0);
  const [form, setForm] = useState({ dateTime: "" });
  const todayAttendanceObserver = useRef();
  const [todayAttendanceExist, settodayAttendanceExist] = useState(false);
  // const[loader,setLoader]=useState(false)
  const navigate = useNavigate();

  let [currentTab, setCurrentTab] = useState("table-view");
  let tabs = [
    { name: "table-view", label: "Table View" },
    { name: "card-view", label: "Card View" },
  ];

  let employeeeAttedanceTableProperties = [
    {
      name: "Employee ID",
      property: "employee_id",
      type: "string",
      onClick: (item) => {
        navigate(`/admin/employee/${item?.employeeId}`);
      },
      style: { color: "#0099FF", cursor: "pointer" },
    },

    // { name: "Employee Name", property: "employeeName", type: "string" },
    { name: "Date", property: "createdAt", type: "string" },
    {
      name: "Status",
      property: "status",
      style1: {
        background: "#FD9B63",
      },
      style2: {
        background: "#F15A59",
      },
      style3: {
        background: "#03C988",
      },
      class: "table-span",
    },
    { name: "Check in", property: "check_in.in_time", type: "string" },
    // { name: "Check in notes", property: "checkIn.notes", type: "string" },
    { name: "Check out time", property: "check_out.out_time", type: "string" },
    // { name: "Check out notes", property: "checkOut.notes", type: "string" },

    // {
    //   // name: "Actions",
    //   property: "",
    //   type: "string",
    // },
    {
      name: "Total Hours",
      property: "total_working_minutes",
      type: "string",
      style: { textAlign: "center", paddingLeft: "50px" },
    },
  ];

  // const getAttendanceByDate = async () => {
  //   try {
  //     setLoading(true);
  //     setLoadingTerm("gettingAttendanceByDate");
  //     let { detail } = await makeNetworkCall(
  //       {
  //         totalAttendanceFilters: {
  //           dateTime: form.dateTime,
  //           skip: 0,
  //           limit: 10,
  //         },
  //       },

  //       "getAdminData1",
  //       "headers"
  //     );

  //     setTodayAttendance(detail.totalAttendance || []);
  //     if (detail.totalAttendance.length === 0) {
  //       toastOptions.error("No Attendance avilable with the date");
  //     }
  //     setLoading(false);
  //     setLoadingTerm("");
  //   } catch (error) {
  //     toastOptions.error("Some Thing went wrong");
  //     setLoading(false);
  //     setLoadingTerm("");
  //   } finally {
  //     setLoading(false);
  //     setLoadingTerm("");
  //   }
  // };

  // const fetchingMoreData = async () => {
  //   try {
  //     setLoading(true);
  //     setLoadingTerm("getMoreTodayAttendance");
  //     const response = await backEndCallObjNothing(
  //       {
  //         totalAttendanceFilters: {
  //           dateTime: "",
  //           skip: skip * 10,
  //           limit: 10,
  //         },
  //       },
  //       "getAdminData1",
  //       "headers"
  //     );
  //     if (response.detail.totalAttendance.length > 0) {
  //       setTodayAttendance((prevList) => {
  //         return [...prevList, ...response.detail.totalAttendance];
  //       });
  //     } else {
  //       settodayAttendanceExist(true);
  //     }
  //     setLoading(false);

  //     setLoadingTerm("");
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("error while fetching more data", error);
  //     setLoadingTerm("");
  //   } finally {
  //     setLoading(false);
  //     setLoadingTerm("");
  //   }
  // };

  // This callback is responseible to observe the last item in the employeelist and based omn some conditions will make some netwrok call
  // const gettingMoreTodayAttendanceRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (todayAttendanceObserver.current)
  //       todayAttendanceObserver.current.disconnect();
  //     todayAttendanceObserver.current = new IntersectionObserver(
  //       async (entries) => {
  //         if (
  //           entries[0].isIntersecting &&
  //           !todayAttendanceExist &&
  //           todayAttendance.length >= 10
  //         ) {
  //           setSkip((prevSkip) => prevSkip + 1); // Update skip directly without await
  //           if (skip) {
  //             fetchingMoreData();
  //           }
  //         }
  //       }
  //     );

  //     if (node) todayAttendanceObserver.current.observe(node);
  //   },
  //   [
  //     loading,
  //     todayAttendance,
  //     setTodayAttendance,
  //     todayAttendanceExist,
  //     skip,
  //     setSkip,
  //   ]
  // );

  const handleTabChange = (tabname) => {
    setCurrentTab(tabname);
  };

  // const formatTimes = (timesArray, timeType) => {
  //   if (timesArray && timesArray.length > 0) {
  //     return timesArray.map((entry) => entry[timeType]).join(", ");
  //   }
  //   return "N/A";
  // };

  let calculateHours = (minutes) => {
    let hours = (minutes / 60).toFixed(2);
    return `${hours} hrs`;
  };

  const extractTime = (datetime) => {
    let parts = datetime.split(" ");
    return parts[1];
  };

  return (
    <>
      <main
        className="today-attendance p-3"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <div className="today-attendance-wrapper">
          <div className="date-input">
            <Date_Input
              name={"dateTime"}
              value={form.dateTime}
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
            {/* {form.dateTime && (
              <button
                disabled={loadingTerm === "gettingAttendanceByDate"}
                onClick={getAttendanceByDate}
              >
                {" "}
                {loading && loadingTerm === "gettingAttendanceByDate" ? (
                  <Loader />
                ) : (
                  "Submit"
                )}{" "}
              </button>
            )} */}
          </div>
          <div className="tabs">
            {tabs.map((tab) => (
              <button key={tab.name} onClick={() => handleTabChange(tab.name)}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {currentTab === "table-view" ? (
          <div className="tables">
            <table className="main-table table-bordered table-responsive mt-4">
              <TableHead
                tableHeadProperties={employeeeAttedanceTableProperties}
                // data={todayAttendance}
                // component="UpdateTodayAttendance"
                // loadMoreRef={gettingMoreTodayAttendanceRef}
                // getExtraDataType="getMoreTodayAttendance"
              />
              <tbody>
                {todayAttendance?.length !== 0 ? (
                  todayAttendance?.map((attendance) =>
                    attendance.map((item) => (
                      <tr key={item.employee_id}>
                        <td>{item.employee_id}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.status}</td>
                        <td>{extractTime(item.checkin[0].in_time)}</td>
                        <td>
                          {extractTime(
                            item.checkout[item.checkout.length - 1].out_time
                          )}
                        </td>
                        <td
                          style={{
                            textTransform: "lowercase",
                          }}
                        >
                          {item.total_working_minutes === undefined
                            ? "-"
                            : calculateHours(item.total_working_minutes)}
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr>
                    <td>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="admin_all_employees-cardView"
            style={{
              background: applicationColor.cardBg1,
              color: applicationColor.readColor1,
            }}
          >
            {/* {todayAttendance?.length !== 0 ? (
              todayAttendance?.map((attendance) =>
                attendance.map((item) => (
                  <div
                    key={item.attendance_id}
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
                            {item.employee_id}
                          </p>
                          <div className="leave-card-data">
                            <p className="text-success">Check-in</p>
                            <p>{extractTime(item.checkin[0].in_time)}</p>
                          </div>
                          <div className="leave-card-data">
                            <p className="text-danger">Check-out</p>
                            <p>
                              {extractTime(
                                item.checkout[item.checkout.length - 1].out_time
                              )}
                            </p>
                          </div>
                          <div className="leave-card-data">
                            <p>Total Hours</p>
                            <p>
                              {item.total_working_minutes === undefined
                                ? "-"
                                : calculateHours(item.total_working_minutes)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  // return <ReUsableEmployeeCard employee={item} />;
                ))
              )
            ) : (
              <tr>
                <td>No Data</td>
              </tr>
            )} */}

            <TodayAttendanceCardView todayAttendance={todayAttendance} />
          </div>
        )}
      </main>
    </>
  );
};

export default TodaysEmployeesAttendance;

export const UpdateTodayAttendance = ({ attendanceItem }) => {
  const { applicationColor } = useThemeContext();
  const { setAdminData } = useStateContext();

  const {
    attendanceModal,
    attendanceModalData,
    setAttendanceModalData,
    setAttendanceModal,
    setLoading,
    setLoadingTerm,
    todayAttendance,
    setTodayAttendance,
  } = useStateContext();
  console.log(todayAttendance, " todayAttendance");
  const [editingItem, setEditingItem] = useState({});

  useEffect(() => {
    if (attendanceItem) {
      setEditingItem({
        attendanceId: attendanceItem?.attendanceId,
        checkInTime: attendanceItem?.checkIn.time,
        checkInNotes: attendanceItem?.checkIn.notes,
        checkOutTime: attendanceItem?.checkOut.time,
        checkOutNotes: attendanceItem?.checkOut.notes,
      });
    }
  }, [attendanceItem]);

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoadingTerm("updatingEmployeeAttendance");
      console.log(attendanceModalData);
      if (attendanceModalData.edit) {
        data.attendanceId = attendanceItem.attendanceId;
      }
      const { detail } = await makeNetworkCall(
        data,
        "updateAttendance",
        "headers"
      );

      const response = await makeNetworkCall({}, "getAdminData", "headers");
      console.log({ response });
      setTodayAttendance(response.detail.totalAttendance);
      toastOptions.success(
        typeof detail === "object" ? "Attendance Updated Successfully" : detail
      );
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      if (error) {
        toastOptions.error(
          error?.error?.response?.data?.detail || error[0].message
        );
      }
      return Promise.reject(error);
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  let attendanceDataUpdate = () => {
    try {
      setAttendanceModal(!attendanceModal);
      setAttendanceModalData({
        heading: "Attendance",
        fields: [
          "checkInTime",
          "checkInNotes",
          "checkOutTime",
          "checkOutNotes",
        ],
        onClose: () => {
          setAttendanceModal(false);
        },
        types: ["time", "text", "time", "text"],
        editingItem: editingItem,
        placeholders: [
          "Check in Time",
          "Check in notes",
          "Check out time",
          "Check out notes",
        ],
        handleSubmit: handleSubmit,
        schema: {},
        edit: true,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <section
        className="actions"
        style={{
          color: applicationColor.readColor1,
        }}
      >
        <button className="edit btn btn-sm" onClick={attendanceDataUpdate}>
          <FaUserEdit />
        </button>
      </section>
    </>
  );
};
