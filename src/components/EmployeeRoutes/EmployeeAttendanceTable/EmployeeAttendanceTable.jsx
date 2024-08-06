import React, { useEffect, useState } from "react";
import TableHead from "../../Table/TableHead";
import { useStateContext } from "../../Contexts/StateContext";
import { Select_inputs } from "../../common/ALLINPUTS/AllInputs";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../../services/mainService";
import Loader from "../../Loader/Loader";

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
  const { applicationColor } = useThemeContext();
  const [dateState, setDateState] = useState({
    year: "",
    month_date: "",
    week_date: "",
  });
  const [dates, setDates] = useState([]);

  const fetchAttendanceData = async (reset = false) => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing("/emp_get/get_attendance", {
        skip,
        limit,
      });
      console.log("attendance total", response);
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
    fetchAttendanceData();
  }, [skip]);

  const getDatesInMonth = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const dates = [];
    while (date.getMonth() === month - 1) {
      dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    if (dateState.month_date && dateState.year) {
      const datesInMonth = getDatesInMonth(
        dateState.year,
        dateState.month_date
      );
      setDates(datesInMonth);
    }
  }, [dateState.month_date, dateState.year]);

  const getSpecificData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingTerm("attendanceFromTo");
    try {
      console.log("hiiii");
      const data = {
        year: dateState.year,
        month_date: dateState.month_date,
        week_date: dateState.week_date,
      };
      console.log("data", data);
      const response = await backEndCallObjNothing(
        "/emp_get/get_attendance_by_filter",
        data
      );
      console.log("response", response);
      setAttandanceData(response.employee_total_attendance);
    } catch (error) {
      console.error("Error fetching specific data", error);
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  const formatTimes = (timesArray, timeType) => {
    if (timesArray && timesArray.length > 0) {
      if (timeType === "in_time") {
        return extractTime(timesArray[0][timeType]);
      } else {
        return extractTime(timesArray[timesArray.length - 1][timeType]);
      }
    }
    return "-";
  };

  const extractTime = (datetime) => {
    if (typeof datetime === "string" && datetime.includes(" ")) {
      let parts = datetime.split(" ");
      return parts[1];
    }
    return "-";
  };

  const calculateHours = (minutes) => {
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
              options={Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() - i
              )}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <Select_inputs
              name={"month_date"}
              placeholder={"Select Month"}
              value={dateState.month_date}
              setForm={setDateState}
              options={Array.from({ length: 12 }, (_, i) => i + 1)}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <Select_inputs
              name={"week_date"}
              placeholder={"Select Date"}
              value={dateState.week_date}
              setForm={setDateState}
              options={dates}
            />
          </div>
        </div>

        {dateState.month_date && dateState.year ? (
          <button
            className="filter-btn"
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <Loader />}
      </section>
    </main>
  );
};

export default EmployeeAttendanceTable;
