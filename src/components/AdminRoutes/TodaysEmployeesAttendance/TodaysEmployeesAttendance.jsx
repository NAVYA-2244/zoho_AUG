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
    todayAttendanceAdmin,
    setTodayAttendanceAdmin,
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
    { name: "Employee Name", property: "createdAt", type: "string" },
    // { name: "Email", property: "createdAt", type: "string" },

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
  const handleTabChange = (tabname) => {
    setCurrentTab(tabname);
  };

  const fetchAttendanceData = async (date) => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing(
        "/user_get/today_attendance",
        {
          skip: 0, // Example skip value, adjust as needed
          date: date || form.dateTime,
        }
      );
      console.log("todayAttendance", response);
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

  const lateCheckins =
    todayAttendanceAdmin?.filter((employee) => employee.grace_time > 0) || [];
  const onLeave =
    todayAttendanceAdmin?.filter((employee) => employee.status === "leave") ||
    [];
  const allCheckins = todayAttendanceAdmin || [];

  let calculateHours = (minutes) => {
    let hours = (minutes / 60).toFixed(2);
    return `${hours} hrs`;
  };

  const extractTime = (datetime) => {
    let parts = datetime?.split(" ");
    return parts[1];
  };

  const findCheckin = (time) => {
    if (time.checkin.length > 0 && time.checkout.length > 0) {
      return "Present";
    } else if (time.checkin.length > 0 && time.checkout.length === 0) {
      return "Checkin";
    } else if (time.status === "leave") return "Absent";
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
          <div className="tabs">
            {tabs.map((tab) => (
              <button key={tab.name} onClick={() => handleTabChange(tab.name)}>
                {tab.label}
              </button>
            ))}
          </div>

          {currentTab === "table-view" ? (
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
          ) : (
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
          )}
        </div>

        {currentTab === "table-view" ? (
          <>
            <div className="tables">
              <table className="main-table table-bordered table-responsive">
                <TableHead
                  tableHeadProperties={employeeeAttedanceTableProperties}
                  // data={todayAttendance}
                  // component="UpdateTodayAttendance"
                  // loadMoreRef={gettingMoreTodayAttendanceRef}
                  // getExtraDataType="getMoreTodayAttendance"
                />
                {/* <tbody>
                {todayAttendance?.length !== 0 ? (
                  todayAttendance.map((attendance) => (
                    <tr key={attendance.employee_id}>
                      <td>{attendance.employee_id}</td>
                      <td>{attendance.createdAt}</td>
                      <td>{attendance.status}</td>
                      <td>{attendance.checkin[0]?.in_time}</td>
                      <td>{attendance.checkout[attendance.checkout.length - 1]?.out_time}</td>
                      <td>{attendance.total_working_minutes === undefined ? "-" : (attendance.total_working_minutes / 60).toFixed(2) + " hrs"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={todayAttendance.length}>No Data</td>
                  </tr>
                )}
              </tbody> */}
                <tbody>
                  {todayAttendanceAdmin?.length !== 0 ? (
                    todayAttendanceAdmin.map((attendance) => {
                      const checkInAvailable = attendance.checkin.length > 0;
                      const checkOutAvailable = attendance.checkout.length > 0;
                      const status =
                        checkInAvailable && checkOutAvailable
                          ? "Present"
                          : "Absent";

                      return (
                        <tr key={attendance.employee_id}>
                          <td>{attendance.employee_id}</td>
                          <td>{attendance.createdAt}</td>
                          <td>{attendance.employee_name}</td>
                          {/* <td style={{ textTransform: "lowercase" }}>
                            {attendance.email}
                          </td> */}

                          <td>{findCheckin(attendance)}</td>
                          <td>
                            {checkInAvailable
                              ? extractTime(attendance.checkin[0].in_time)
                              : "-"}
                          </td>
                          <td>
                            {checkOutAvailable
                              ? extractTime(
                                  attendance.checkout[
                                    attendance.checkout.length - 1
                                  ].out_time
                                )
                              : "-"}
                          </td>
                          {/* <td>{attendance.total_working_minutes}</td> */}
                          <td
                            style={{
                              textAlign: "center",
                              textTransform: "lowercase",
                            }}
                          >
                            {attendance.total_working_minutes !== undefined
                              ? calculateHours(attendance.total_working_minutes)
                              : "-"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="text-center" colSpan={9}>
                        No Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
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

            <TodayAttendanceCardView
              todayAttendanceAdmin={todayAttendanceAdmin}
            />
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
    todayAttendanceAdmin,
    setTodayAttendanceAdmin,
  } = useStateContext();
  console.log(todayAttendanceAdmin, " todayAttendance");
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
      setTodayAttendanceAdmin(response.detail.totalAttendance);
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
