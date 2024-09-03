
// import React from "react";
// import TableHead from "../../../Table/TableHead";
// import { useThemeContext } from "../../../Contexts/ThemesContext";

// const EmployeeLeaveApplicationsTable = ({ leaveApplications }) => {
//   const { applicationColor } = useThemeContext();
//   let tableHeadProperties = [
//     { name: "Employee Id", property: "employee_id", type: "string" },
//     { name: "Employee Name", property: "employee_name" },
//     { name: "Leave Type", property: "leave_type", type: "string" },
//     { name: "From Date", property: "from_date", type: "string" },
//     { name: "To Date", property: "to_date", type: "string" },
//     { name: "Reason", property: "reason", type: "string" },
//     // { name: "Remaining Leaves", property: "remaining_leaves", type: "string" },
//     { name: "Days Taken", property: "days_taken" },
//     {
//       name: "Leave Status",
//       property: "leave_status",
//       type: "string",
//       style1: { background: "#FD9B63" },
//       style2: { background: "#F15A59" },
//       style3: { background: "#03C988" },
//       class: "table-span",
//     },
//   ];

//   return (
//     <>
//       <h5
//         className="leave-application-heading"
//         style={{ color: applicationColor.readColor1 }}
//       >
//         Leave Applications
//       </h5>
//       <section
//         className="tables table-wrapper py-2 px-3"
//         style={{ background: applicationColor.cardBg1, color: applicationColor.readColor1 }}
//       >
//         <table className="main-table table-bordered table-responsive">
//           <TableHead
//             tableHeadProperties={tableHeadProperties}
//             data={leaveApplications}
//             component="LeaveUpdationActions"
//           />
//         </table>
//       </section>
//     </>
//   );
// };

// export default EmployeeLeaveApplicationsTable;
import React from "react";
import { useThemeContext } from "../../../Contexts/ThemesContext";

const EmployeeLeaveApplicationsTable = ({ leaveApplications }) => {
  const { applicationColor } = useThemeContext();

  // Define table header properties
  const tableHeadProperties = [
    { name: "Employee Id", property: "employee_id" },
    { name: "Employee Name", property: "employee_name" },
    { name: "Leave Type", property: "leave_type" },
    { name: "From Date", property: "from_date" },
    { name: "To Date", property: "to_date" },
    { name: "Reason", property: "reason" },
    { name: "Days Taken", property: "days_taken" },
    { name: "Leave Status", property: "leave_status" },
    { name: "Manager Status", property: "approved_by.manager.leave_status" },
    { name: "Team Incharge Status", property: "approved_by.team_incharge.leave_status" },
    { name: "HR Status", property: "approved_by.hr.leave_status" },
  ];

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
        style={{ background: applicationColor.cardBg1, color: applicationColor.readColor1 }}
      >
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              {tableHeadProperties.map((head, index) => (
                <th key={index}>{head.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaveApplications.map((application, index) => (
              <tr key={index}>
                {tableHeadProperties.map((head, i) => (
                  <td key={i}>
                    {head.property.split('.').reduce((obj, key) => obj && obj[key], application) || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default EmployeeLeaveApplicationsTable;
