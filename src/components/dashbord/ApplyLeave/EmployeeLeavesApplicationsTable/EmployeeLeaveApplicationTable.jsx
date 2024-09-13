import React from "react";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import { useStateContext } from "../../../Contexts/StateContext";

const EmployeeLeaveApplicationsTable = ({ leaveApplications, loading }) => {
  const { applicationColor } = useThemeContext();
  const { employeeDetails } = useStateContext();

  const getLeaveStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return { color: "green", fontWeight: "bold" };
      case "Pending":
        return { color: "orange", fontWeight: "bold" };
      case "Rejected":
        return { color: "red", fontWeight: "bold" };
      default:
        return { color: "gray" };
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <>
      <h5
        className="leave-application-heading"
        style={{ color: applicationColor.readColor1 }}
      >
        Leave Applications
      </h5>
      <section
        className="table-wrapper py-2 px-3 text-center"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        {/* Loader when loading state is true */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table ">
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Days Taken</th>
                <th>Reason</th>
                <th>Leave Status</th>
                {employeeDetails?.admin_type !== "2" && <th>Manager Status</th>}
                {employeeDetails?.admin_type === "4" && (
                  <th>Team Incharge Status</th>
                )}
              </tr>
            </thead>
            <tbody>
              {leaveApplications.length > 0 ? (
                leaveApplications.map((application, index) => (
                  <tr key={index}>
                    <td>{application.employee_id || "N/A"}</td>
                    <td>{application.employee_name || "N/A"}</td>
                    <td>{application.leave_type || "N/A"}</td>
                    <td>{formatDate(application.from_date)}</td>
                    <td>{formatDate(application.to_date)}</td>
                    <td>{application.days_taken || "N/A"}</td>
                    <td>{application.reason || "N/A"}</td>

                    <td style={getLeaveStatusStyle(application.leave_status)}>
                      {application.leave_status || "N/A"}
                    </td>

                    {employeeDetails?.admin_type !== "2" && (
                      <td>
                        {application.approved_by?.manager?.leave_status ||
                          "N/A"}
                      </td>
                    )}

                    {employeeDetails?.admin_type === "3" ||
                      (employeeDetails?.admin_type !== "2" && (
                        <td>
                          {application.approved_by?.team_incharge?.leave_status}
                        </td>
                      ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    There are no leave applications
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default EmployeeLeaveApplicationsTable;
