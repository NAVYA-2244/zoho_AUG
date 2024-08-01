import React from "react";
import TableHead from "../../Table/TableHead";
import { FcLeave } from "react-icons/fc";
import CircularLoader from "../../SVGCircler/Circular";
import { FaUserDoctor } from "react-icons/fa6";
import { useThemeContext } from "../../Contexts/ThemesContext";

const SingleEmployeeLeaves_report = ({
  levesApplicationsData,
  leaveReportData,
}) => {
  let leaveApplications = [
    { name: "Employee ID", property: "employeeId", type: "string" },
    { name: "Employee Name", property: "employeeName" },
    { name: "Leave Type ", property: "leaveType", type: "string" },
    { name: "From Date", property: "fromDate", type: "string" },
    { name: "To Date", property: "toDate", type: "string" },
    { name: "Remaining Leaves", property: "remainingLeaves", type: "string" },
    { name: "Days Taken", property: "daysTaken" },
    {
      name: "Leave Status",
      property: "leaveStatus",
      type: "string",
    },
    { name: "Actions", property: "" },
  ];

  const leavesReport = [
    { name: "Type", property: "type", type: "string" },
    { name: "Total", property: "total", type: "string" },
    { name: "Used", property: "used", type: "string" },
    { name: "Avilable", property: "available", type: "string" },
  ];

  const { applicationColor,  } = useThemeContext();

  return (
    <>
      <div className="leaves-wraper">
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="leaves-table-tab"
              data-bs-toggle="pill"
              data-bs-target="#leaves-table"
              type="button"
              role="tab"
              aria-controls="leaves-table"
              aria-selected="true"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
            >
              Leaves Table
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="total-leaves-tab"
              data-bs-toggle="pill"
              data-bs-target="#total-leaves"
              type="button"
              role="tab"
              aria-controls="total-leaves"
              aria-selected="false"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
            >
              Total Leaves
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="leaves-table"
            role="tabpanel"
            aria-labelledby="leaves-table-tab"
            tabIndex="0"
          >
            <section
              className="tables table-wrapper py-2 px-3"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
            >
              <table className="main-table table-bordered table-responsive">
                <TableHead
                  tableHeadProperties={leaveApplications}
                  data={levesApplicationsData || []}
                />
              </table>
            </section>
          </div>
          <div
            className="tab-pane fade"
            id="total-leaves"
            role="tabpanel"
            aria-labelledby="total-leaves-tab"
            tabIndex="0"
          >
            {" "}
            <section className="total-leaves-wrapper">
              <div className="sick-casual-leaves-wrapper">
                {leaveReportData.map((eachObj, index) => (
                  <div
                    className="sick-leaves"
                    key={index}
                    style={{
                      background: applicationColor.inputBg,
                      color: applicationColor.readColor1,
                    }}
                  >
                    <div className="sick-div1">
                      <div className="leave-icon">
                        {eachObj.type === "Casual" ? (
                          <FcLeave />
                        ) : (
                          <FaUserDoctor />
                        )}
                      </div>
                      <p>{eachObj.type}</p>
                    </div>
                    <div className="sick-div2">
                      <div className="available">
                        <p>Available</p>
                        <p className="leave-value">{eachObj.available}</p>
                      </div>
                      <div className="used">
                        <p>Used</p>
                        <p className="leave-value">{eachObj.used}</p>
                      </div>
                    </div>
                    <div className="sick-div3">
                      <div className="progress-circle">
                        <CircularLoader
                          max={eachObj.total}
                          min={eachObj.used}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEmployeeLeaves_report;
