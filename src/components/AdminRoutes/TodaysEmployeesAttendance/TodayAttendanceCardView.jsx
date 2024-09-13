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
