import React, { Fragment, useEffect, useState } from "react";
import EmployeeAttendanceTable from "../EmployeeAttendanceTable/EmployeeAttendanceTable";
import EmployeeAttendanceCalendar from "../EmployeeAttendanceCalender/EmployeeAttendanceCalander";
import { FaTableCells } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { useThemeContext } from "../../Contexts/ThemesContext";
import "./EmployeeAttendance.scss";
import Selectinputimg from "./Selectinputimg";

function EmployeeAttendance() {
  const { applicationColor } = useThemeContext();
  const [currentTab, setCurrentTab] = useState("calendar-view");
  const tabs = [
    { name: "calendar-view", label: <FaCalendarCheck /> },
    { name: "table-view", label: <FaTableCells /> },
  ];

  return (
    <div
      className="calendar-container"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
      }}
    >
      {currentTab === "calendar-view" ? (
        <>
          <section className="calender-view">
            {/* <Selectinputimg /> */}
            <div
              className="d-flex justify-content-end g-3 fs-5"
              style={{ gap: "5px" }}
            >
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
          <EmployeeAttendanceCalendar />
        </>
      ) : currentTab === "table-view" ? (
        <>
          <section className="table-view">
            <div>{/* <Selectinputimg /> */}</div>
            <div
              className="d-flex justify-content-end g-3 fs-5"
              style={{ gap: "5px" }}
            >
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
          <EmployeeAttendanceTable />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default EmployeeAttendance;
