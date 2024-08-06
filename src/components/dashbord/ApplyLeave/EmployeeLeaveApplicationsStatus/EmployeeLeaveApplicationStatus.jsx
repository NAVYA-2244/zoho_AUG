import React, { useEffect, useState } from "react";
import "./EmployeeLeaveApplicationsStatus.scss";
import { useStateContext } from "../../../Contexts/StateContext";
import { ImCross } from "react-icons/im";
import { FaClock } from "react-icons/fa";
import { RiStickyNoteFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { useThemeContext } from "../../../Contexts/ThemesContext";
const EmployeeLeaveApplicationStatus = () => {
  const { employeeData, adminGettingLeaveApplications } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [leaveStatus, setLeaveStatus] = useState([
    {
      icon: <RiStickyNoteFill />,
      length: 0,
      status: "Applications",
      color: "#c89aff",
    },
    {
      icon: <FaClock />,
      length: 0,
      status: "Pending",
      color: "#ee5a45", //#f8fc99
    },
    {
      icon: <FaCheck />,
      length: 0,
      status: "Approved",
      color: "#51a1ff",
    },
    {
      icon: <ImCross />,
      length: 0,
      status: "Rejected",
      color: "#a71815",
    },
  ]);

  let totalLeaveApplicationsLength;
  let totalApprovedLeaveApplications;
  let totalRejectedLeaveApplications;
  let totalPendingLeaveApplication;

  // console.log("adminGettingLeaveApplications", adminGettingLeaveApplications);

  useEffect(() => {
    if (Object.keys(employeeData).length > 0) {
      totalLeaveApplicationsLength =
        employeeData?.leaveApplications.length || 0;
      totalApprovedLeaveApplications = employeeData?.leaveApplications.filter(
        (item) => {
          return item.leaveStatus === "Approved";
        }
      ).length;
      totalRejectedLeaveApplications = employeeData?.leaveApplications.filter(
        (item) => {
          return item.leaveStatus === "rejected";
        }
      ).length;

      totalPendingLeaveApplication = employeeData?.leaveApplications.filter(
        (item) => {
          return item.leaveStatus === "pending";
        }
      ).length;

      setLeaveStatus([
        {
          icon: <RiStickyNoteFill />,
          length: totalLeaveApplicationsLength,
          color: "#c89aff",
          status: "Applications",
        },
        {
          icon: <FaClock />,
          length: totalPendingLeaveApplication,
          status: "Pending",
          color: "#ee5a45",
        },
        {
          icon: <FaCheck />,
          length: totalApprovedLeaveApplications,
          status: "Approved",
          color: "#51a1ff",
        },
        {
          icon: <ImCross />,
          length: totalRejectedLeaveApplications,
          status: "Rejected",
          color: "#a71815",
        },
      ]);
    }
  }, [employeeData]);

  return (
    <>
      <section
        className="leaves-dashboard-card"
        style={{
          // background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <h5 className="heading">Leave Applications</h5>
        <section className="leave-application-status employee-status">
          {leaveStatus.slice(0, 2).map((item, index) => {
            return (
              <div
                className="leave-card"
                key={index}
                style={{
                  background: item.color,

                  color: "white",
                }}
              >
                <div
                  className="icon"
                  style={{
                    // background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                  }}
                >
                  <span>{item.icon}</span>
                </div>
                <span className="status-heading">{item.status}</span>
                <span className="length">{item.length}</span>
              </div>
            );
          })}
        </section>
        <section className="leave-application-status employee-status">
          {leaveStatus.slice(2, 4).map((item, index) => {
            return (
              <div
                className="leave-card"
                key={index}
                style={{
                  background: item.color,

                  color: "white",
                }}
              >
                <div
                  className="icon"
                  style={{
                    // background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                  }}
                >
                  <span>{item.icon}</span>
                </div>
                <span className="status-heading">{item.status}</span>
                <span className="length">{item.length}</span>
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default EmployeeLeaveApplicationStatus;
