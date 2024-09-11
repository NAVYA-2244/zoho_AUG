import React from "react";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import { useStateContext } from "../../../Contexts/StateContext";
import { formatDate } from "date-fns";

const EmployeeLeaveApplicationsTable = ({ leaveApplications }) => {
  const { applicationColor } = useThemeContext();
  const { employeeDetails } = useStateContext(); // Corrected typo from `employeedDetails` to `employeeDetails`

  // Define base table header properties
  const baseTableHeadProperties = [
    { name: "Employee Id", property: "employee_id" },
    { name: "Employee Name", property: "employee_name" },
    { name: "Leave Type", property: "leave_type" },
    { name: "From Date", property: "from_date" },
    { name: "To Date", property: "to_date" },
    { name: "Reason", property: "reason" },
    { name: "Days Taken", property: "days_taken" },
    { name: "Leave Status", property: "leave_status" },
  ];

  // Dynamically add status columns
  let dynamicTableHeadProperties = [];
  if (leaveApplications.length > 0) {
    const firstApplication = leaveApplications[0];
    const { admin_type } = employeeDetails;

    // If the employee's role matches one of the approval roles, exclude that status column
    if (admin_type !== "2" && firstApplication.approved_by?.manager) {
      dynamicTableHeadProperties.push({
        name: "Manager Status",
        property: "approved_by.manager.leave_status",
      });
    }
    if (admin_type !== "3" && firstApplication.approved_by?.team_incharge) {
      dynamicTableHeadProperties.push({
        name: "Team Incharge Status",
        property: "approved_by.team_incharge.leave_status",
      });
    }
    // if (role_name !== "HR" && firstApplication.approved_by?.hr) {
    //   dynamicTableHeadProperties.push({ name: "HR Status", property: "approved_by.hr.leave_status" });
    // }
  }

  // Combine base properties with dynamic properties
  const tableHeadProperties = [
    ...baseTableHeadProperties,
    ...dynamicTableHeadProperties,
  ];
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
  return (
    <>
      <h5
        className="leave-application-heading"
        style={{ color: applicationColor.readColor1 }}
      >
        Leave Applications
      </h5>
      <section
        className="tables table-wrapper py-2 px-3"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              {tableHeadProperties?.map((head, index) => (
                <th key={index}>{head.name}</th>
              ))}
            </tr>
          </thead>
          {/* <tbody>
            {leaveApplications.map((application, index) => (
              <tr key={index}>
                {tableHeadProperties.map((head, i) => (
                  <td key={i}>
                    {head.property.split('.').reduce((obj, key) => obj && obj[key], application) || 'N/A'}
                    
                  </td>
                ))}
              </tr>
            ))}
          </tbody> */}
          <tbody className="text-center">
            {leaveApplications?.map((application, index) => (
              <tr key={index}>
                {tableHeadProperties?.map((head, i) => {
                  const value =
                    head.property
                      .split(".")
                      .reduce((obj, key) => obj && obj[key], application) ||
                    "N/A";

                  // Apply special styling to the leave_status column
                  if (head.property.includes("leave_status")) {
                    return (
                      <td key={i} style={getLeaveStatusStyle(value)}>
                        {value}
                      </td>
                    );
                  }
                  {
                  }
                  return <td key={i}>{value}</td>;
                })}
              </tr>
            ))}

            {leaveApplications.length == 0 && (
              <p className=" d-flex justify-content-center align-items-center m-2">
                There is no leave applications
              </p>
            )}
          </tbody>
          {/* <div className="d-flex justify-content-center align-items-center m-2"> */}

          {/* </div> */}
        </table>
      </section>
    </>
  );
};

export default EmployeeLeaveApplicationsTable;
