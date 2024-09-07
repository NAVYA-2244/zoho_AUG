
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
// import React from "react";
// import { useThemeContext } from "../../../Contexts/ThemesContext";

// const EmployeeLeaveApplicationsTable = ({ leaveApplications }) => {
//   const { applicationColor } = useThemeContext();

//   // Define table header properties
//   const tableHeadProperties = [
//     { name: "Employee Id", property: "employee_id" },
//     { name: "Employee Name", property: "employee_name" },
//     { name: "Leave Type", property: "leave_type" },
//     { name: "From Date", property: "from_date" },
//     { name: "To Date", property: "to_date" },
//     { name: "Reason", property: "reason" },
//     { name: "Days Taken", property: "days_taken" },

//     { name: "Leave Status", property: "leave_status" },

//     { name: "Manager Status", property: "approved_by.manager.leave_status" },
//     { name: "Team Incharge Status", property: "approved_by.team_incharge.leave_status" },
//     { name: "HR Status", property: "approved_by.hr.leave_status" },
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
//         <table className="table table-bordered table-responsive">
//           <thead>
//             <tr>
//               {tableHeadProperties.map((head, index) => (
//                 <th key={index}>{head.name}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {leaveApplications.map((application, index) => (
//               <tr key={index}>
//                 {tableHeadProperties.map((head, i) => (
//                   <td key={i}>
//                     {head.property.split('.').reduce((obj, key) => obj && obj[key], application) || 'N/A'}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </>
//   );
// };

// export default EmployeeLeaveApplicationsTable;
import React from "react";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import { useStateContext } from "../../../Contexts/StateContext";

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
    const { role_name } = employeeDetails;

    // If the employee's role matches one of the approval roles, exclude that status column
    if (role_name !== "Manager" && firstApplication.approved_by?.manager) {
      dynamicTableHeadProperties.push({ name: "Manager Status", property: "approved_by.manager.leave_status" });
    }
    if (role_name !== "Team Incharge" && firstApplication.approved_by?.team_incharge) {
      dynamicTableHeadProperties.push({ name: "Team Incharge Status", property: "approved_by.team_incharge.leave_status" });
    }
    if (role_name !== "HR" && firstApplication.approved_by?.hr) {
      dynamicTableHeadProperties.push({ name: "HR Status", property: "approved_by.hr.leave_status" });
    }
  }

  // Combine base properties with dynamic properties
  const tableHeadProperties = [...baseTableHeadProperties, ...dynamicTableHeadProperties];
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
           <tbody>
            {leaveApplications.map((application, index) => (
              <tr key={index}>
                {tableHeadProperties.map((head, i) => {
                  const value = head.property
                    .split('.')
                    .reduce((obj, key) => obj && obj[key], application) || 'N/A';
                  
                  // Apply special styling to the leave_status column
                  if (head.property.includes('leave_status')) {
                    return (
                      <td key={i} style={getLeaveStatusStyle(value)}>
                        {value}
                      </td>
                    );
                  }

                  return <td key={i}>{value}</td>;
                })}
              </tr>
            ))}
          </tbody>
          <div className=" m-2">
          {
            leaveApplications.length== 0 &&
            <p className="text-center">  there is no leave applications</p>
          }
          </div>
        </table>
      </section>
    </>
  );
};

export default EmployeeLeaveApplicationsTable;
