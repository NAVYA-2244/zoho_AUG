import React, { useEffect, useState, useRef, useCallback } from "react";
import { useStateContext } from "../../Contexts/StateContext";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import Loader from "../../Loader/Loader";
import TableHead from "../../Table/TableHead";
import Modal from "../../Modals/Modal";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaTableCells, FaUserDoctor } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Date_Input } from "../../common/ALLINPUTS/AllInputs";
import moment from "moment-timezone";
import { FcLeave } from "react-icons/fc";
import CircularLoader from "../../SVGCircler/Circular";
import { format } from "date-fns";

const AdminAcceptedEmployeeLeavesApplications = () => {
  const {
    showModal,
    adminGettingLeaveApplications,
    setAdminGettingLeaveApplications,
    employeeDetails,

    TeamTask,
    setTeamTask,
  } = useStateContext();

  const { applicationColor } = useThemeContext();
  // const [teamMembers, setTeamMembers] = useState([]);
  const [currentTab, setCurrentTab] = useState("calendar-view");
  // const [employeesList, setEmployeesList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [leavescount, setLeavescount] = useState([]);
  const [btndisabled, setBtndisabled] = useState(false);
  const [year, setYear] = useState("");
  const [formData, setFormData] = useState({
    leave_status: "Pending",
    year: year || "",
    employee_id: "",
  });

  const navigate = useNavigate();
  console.log(adminGettingLeaveApplications, "adminGettingLeaveApplications");
  const observer = useRef();
  console.log(adminGettingLeaveApplications, "response");
  const fetchLeaveApplications = useCallback(async () => {
    setLoading(true);
    try {
      console.log("formData.status", formData.status);

      if (!adminGettingLeaveApplications) {
        const response = await backEndCallObjNothing(
          "/admin_get/all_leave_applications",
          {
            skip: 0, // Adjust skip to match API expectations (if needed)
            leave_status: formData.status,
            year: formData.year,
            employee_id: formData.employee_id, // Pass employee_id filter if needed
          }
        );
        setAdminGettingLeaveApplications(response.leaveApplications);
        setLeavescount(response.leaves);
      }

      // console.log(response,"response")
      // if (response.data.length < limit) {
      //   setHasMore(false);
      // }
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    } finally {
      setLoading(false);
    }
  }, [skip, limit, formData, setAdminGettingLeaveApplications]);

  useEffect(() => {
    fetchLeaveApplications();
  }, [skip, fetchLeaveApplications]);
  // console.log(adminGettingLeaveApplications,"adminGettingLeaveApplications")

  const handleFormChange = (e) => {
    console.log(e, "e");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleYearChange = (e) => {
    const selectedYear = new Date(e.target.value).getFullYear().toString();
    setFormData((prev) => ({
      ...prev,
      year: selectedYear, // Update year in formData
    }));
  };
  const handleSubmit = (e) => {
    if (moment(formData.end_date).isBefore(formData.start_date)) {
      toastOptions.error("End Date cannot be less than Start Date");
      return;
    }
    e.preventDefault();
    setSkip(0);
    setHasMore(true);
    fetchLeaveApplications(); // fetch with updated filters
  };

  const tabs = [
    { name: "calendar-view", label: <FaCalendarCheck /> },
    { name: "table-view", label: <FaTableCells /> },
  ];

  const onLeaveAccept = async (leave_application_id) => {
    try {
      setBtndisabled(true);
      const data = { leave_application_id, leave_status: "Approved" };
      let response;

      if (employeeDetails.admin_type === "1") {
        response = await backEndCallObjNothing(
          "/admin/update_leave_status",
          data
        );
      } else {
        response = await backEndCallObjNothing(
          "/admin/update_leave_application",
          data
        );
      }

      setAdminGettingLeaveApplications(adminGettingLeaveApplications);

      toastOptions.success(response || "Success");
      fetchLeaveApplications();
      setBtndisabled(false);
    } catch (error) {
      setBtndisabled(false);
      toastOptions.error(
        error?.response?.data?.detail ||
          "Error while Accepting Leave Application"
      );
    }
  };

  const onLeaveReject = async (leave_application_id) => {
    try {
      setBtndisabled(true);
      const data = { leave_application_id, leave_status: "Rejected" };
      let response;
      {
        employeeDetails.admin_type === "1"
          ? (response = await backEndCallObjNothing(
              "/admin/update_leave_status",
              data
            ))
          : (response = await backEndCallObjNothing(
              "/admin/update_leave_application",
              data
            ));
      }

      // const updatedApplication = response.data;
      setAdminGettingLeaveApplications(adminGettingLeaveApplications);

      fetchLeaveApplications();
      toastOptions.error(response || "rejected");
      setBtndisabled(false);
    } catch (error) {
      setBtndisabled(false);
      toastOptions.error(
        error?.response?.data?.detail ||
          "Error While Rejecting Leave Application"
      );
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      {
        console.log(TeamTask, "task");
      }
      try {
        if (!TeamTask) {
          const response = await backEndCallObjNothing(
            "/org/get_team_for_task"
          );
          console.log(response, "jdjjdjjdj");
          setTeamTask(response); // Assuming response contains the employee list
        }
      } catch (error) {
        console.error("Error fetching employees list:", error);
      }
    };

    fetchEmployees();
  }, []);

  const renderLeaveStatusButtons = useCallback(
    (application) => {
      console.log(application, "application");
      const { hr, manager, team_incharge } = application.approved_by;
      const employeeRole = employeeDetails?.admin_type || "";

      let roleStatus = null;
      if (employeeDetails?.admin_type === "1") {
        roleStatus = application.leave_status;
      }

      // if (employeeRole?.toLowerCase() === "2"||employeeDetails?.designation_name  === "hr manager") roleStatus = hr.leave_status;
      else if (employeeRole?.toLowerCase() === "2" && manager)
        roleStatus = manager.leave_status;
      else if (employeeRole?.toLowerCase() === "3" && team_incharge)
        roleStatus = team_incharge.leave_status;

      if (!roleStatus) return "";

      return (
        <section className="status g-2">
          {roleStatus === "Pending" ? (
            <>
              <button
                className="actions-btn accept"
                disabled={btndisabled}
                onClick={() => onLeaveAccept(application.leave_application_id)}
              >
                Approve
              </button>
              <button
                className="actions-btn reject"
                disabled={btndisabled}
                onClick={() => onLeaveReject(application.leave_application_id)}
              >
                Reject
              </button>
            </>
          ) : roleStatus === "Approved" ? (
            <button className="actions-btn accept">Approved</button>
          ) : (
            <button className="actions-btn reject">Rejected</button>
          )}
        </section>
      );
    },
    [employeeDetails]
  );
  console.log(adminGettingLeaveApplications, "Admin");

  // const handleYearChange = (e) => {
  //   const selectedYear = new Date(e.target.value).getFullYear().toString(); // Convert to string
  //   setYear(selectedYear);
  // };

  const handleReset = () => {
    setFormData({
      leave_status: "Pending",
      year: "",
      employee_id: "",
    });
    setSkip(0);
    setHasMore(true);
    fetchLeaveApplications();
  };
  const handleRefresh = () => {
    fetchLeaveApplications();
  };

  return (
    <section
      className="admin-accepted-leave-applications"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="employee-leaves-heading">
          <p className="mb-0">Employee Leave Applications</p>
        </div>

        <div
          onClick={handleRefresh}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          {loading ? (
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ height: "20px", width: "20px" }}
            ></div>
          ) : (
            <i className="ri-loop-right-line text-primary fs-5 cursor-pointer"></i>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row row-gap-4">
          <div className="col-lg-3 col-md-3 col-sm-6 admin-leave-filters">
            <label>Employee ID</label>

            <select
              name="employee_id"
              value={formData.employee_id}
              className="form-control"
              onChange={handleFormChange}
            >
              <option value="">--select--</option>
              {TeamTask?.map((member) => (
                <option key={member.employee_id} value={member.employee_id}>
                  {`${member.basic_info.first_name} ${member.basic_info.last_name}`}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 admin-leave-filters">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              className="form-control"
              onChange={handleFormChange}
            >
              {/* <option value="">All</option> */}
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="col-md-4">
            <label>Year</label>
            <input
              type="date"
              onChange={handleYearChange}
              className="form-control"
              placeholder="Select Year"
            />
          </div>
          <div className="leave-applications-btn">
            <button type="submit">Submit</button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      <div
        className="table-wrapper py-2 px-3"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <div className="row">
          {leavescount?.length > 0
            ? leavescount.map((item) => {
                console.log("Rendering leave item:", item); // Log each item being rendered

                return (
                  <div
                    key={item.leave_id}
                    className="col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <div className="card leave-card">
                      <div className="card-body d-flex flex-column align-items-center">
                        <i
                          className={`leave-icon ${item.leave_name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          alt={item.leave_name}
                        >
                          {item.leave_name.toLowerCase() === "sick leave" ? (
                            <FaUserDoctor />
                          ) : (
                            <FcLeave />
                          )}
                        </i>
                        <h5 className="leave-type">{item.leave_name}</h5>

                        <div className="available">
                          <span className="leaves-available">
                            Total Leaves <b>{item.total_leaves || "0"}</b>
                          </span>
                          <br />
                          <span className="leave-used">
                            Remaining: <b>{item.remaining_leaves || "0"}</b>
                            {console.log(item.remaining_leaves)}
                          </span>
                        </div>

                        <CircularLoader
                          max={item?.total_leaves}
                          min={item.remaining_leaves}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : // <div className="text-center">No leave data available</div>
              ""}
        </div>

        <section className="d-flex fs-5 my-3">
          <div className="d-flex align-items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setCurrentTab(tab.name)}
                className={`nav-link ${
                  currentTab === tab.name ? "active" : ""
                }`}
                data-toggle="tooltip"
                data-placement="top"
                title={tab.name}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {currentTab === "calendar-view" ? (
          <div className="row">
            {adminGettingLeaveApplications?.length > 0 &&
              adminGettingLeaveApplications?.map((item) => (
                <div
                  key={item.leave_application_id}
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
                          {item.employee_name}
                        </p>

                        <div className="leave-card-data">
                          <p>Type: {item.leave_type}</p>
                          <p>
                            <span className="me-2">Status : </span>
                            <span
                              className={`leave-status ${item.leave_status.toLowerCase()}`}
                            >
                              {item.leave_status === "Pending" && (
                                <span className="status-pending me-1">
                                  Pending
                                </span>
                              )}
                              {item.leave_status === "Approved" && (
                                <span className="status-approved me-1">
                                  Approved
                                </span>
                              )}
                              {item.leave_status === "Rejected" && (
                                <span className="status-rejected me-1">
                                  Rejected
                                </span>
                              )}
                            </span>
                          </p>
                        </div>

                        <div className="leave-card-data">
                          <p>From: {item.from_date}</p>
                          <p>To : {item.to_date}</p>
                        </div>
                        <div className="leave-card-data">
                          <p>Days Taken: {item.days_taken}</p>
                        </div>
                        <div className="leave-card-data">
                          <p>Reason: {item.reason}</p>
                        </div>
                        <div className="leave-card-data">
                          <p>Applieded At:</p>
                          <p>{item.createdAt}</p>
                        </div>

                        <section className="status g-2">
                          {renderLeaveStatusButtons(item)}
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            <div className="d-flex justify-content-center mt-3">
              {loading && <Loader />}
              {!loading &&
                adminGettingLeaveApplications?.length === 0 &&
                "No Leaves"}
            </div>
          </div>
        ) : (
          // <section className="tables">
          //   <table className="main-table table-bordered table-responsive admin-employee-leaves-table">
          //     <thead
          //       className="admin-leaves-table-head"
          //       style={{
          //         background: applicationColor.tableHeadBg,
          //         color: applicationColor.readColor1,
          //       }}
          //     >
          //       <th>Employee IDf</th>
          //       <th>Applyed At </th>
          //       <th>Employee Name</th>
          //       <th>Leave Type</th>
          //       <th>From Date</th>
          //       <th>To Date</th>
          //       <th>Days Taken</th>
          //       <th>Reason</th>
          //       <th>Leave Status</th>

          //       <th>Action</th>
          //     </thead>
          //     <tbody className="admin-leaves-table-body">
          //       {adminGettingLeaveApplications.length > 0 &&
          //         adminGettingLeaveApplications?.map((item) => (
          //           <tr key={item.id}>
          //             <td>{item.employee_id}</td>
          //             <td>{item.createdAt}</td>
          //             <td>{item.employee_name}</td>
          //             <td>{item.leave_type}</td>
          //             <td>{item.from_date}</td>
          //             <td>{item.to_date}</td>
          //             <td>{item.days_taken}</td>
          //             <td
          //               style={{
          //                 maxWidth: "200px",
          //                 wordWrap: "break-word",
          //                 whiteSpace: "normal",
          //               }}
          //             >
          //               {item.reason}
          //             </td>

          //             <td>
          //               <span
          //                 className={`leave-status ${item.leave_status.toLowerCase()}`}
          //               >
          //                 {item.leave_status === "Pending" && (
          //                   <span className="status-pending">Pending</span>
          //                 )}
          //                 {item.leave_status === "Approved" && (
          //                   <span className="status-approved">Approved</span>
          //                 )}
          //                 {item.leave_status === "Rejected" && (
          //                   <span className="status-rejected">Rejected</span>
          //                 )}
          //               </span>
          //             </td>

          //             <td>{renderLeaveStatusButtons(item)}</td>
          //           </tr>
          //         ))}
          //       {!loading && adminGettingLeaveApplications.length === 0 && (
          //         <tr>
          //           <td colSpan={9} className="text-center">
          //             No Pending leaves
          //           </td>
          //         </tr>
          //       )}
          //     </tbody>
          //   </table>

          //   {loading && (
          //     <div className="d-flex justify-content-center mt-3">
          //       <Loader />
          //     </div>
          //   )}
          // </section>
          <section className="tables">
            <table className="main-table table-bordered table-responsive admin-employee-leaves-table">
              <thead
                className="admin-leaves-table-head"
                style={{
                  background: applicationColor.tableHeadBg,
                  color: applicationColor.readColor1,
                }}
              >
                {/* Removed Employee ID column */}
                <th>Action</th>
                <th>Applyed At</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Days Taken</th>
                <th>Reason</th>
                <th>Leave Status</th>
              </thead>
              <tbody className="admin-leaves-table-body">
                {adminGettingLeaveApplications.length > 0 &&
                  adminGettingLeaveApplications?.map((item) => (
                    <tr key={item.id}>
                      {console.log(adminGettingLeaveApplications, "leave")}
                      <td>{renderLeaveStatusButtons(item)}</td>
                      {/* <td>{item.createdAt}</td> */}
                      {/* <td>{format(new Date(item.createdAt), "dd-MM-yyyy")}</td> */}
                      <td>
                        {format(new Date(item.createdAt), "EEE, dd-MM-yyyy")}
                      </td>

                      {console.log(item.createdAt, "at")}
                      <td>
                        {item.employee_name}
                        <br />
                        <small style={{ color: "#888" }}>
                          {item.employee_id}
                        </small>
                      </td>
                      <td>{item.leave_type}</td>
                      <td>{item.from_date}</td>
                      <td>{item.to_date}</td>
                      <td>{item.days_taken}</td>
                      <td
                        style={{
                          maxWidth: "200px",
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {item.reason}
                      </td>

                      <td>
                        <span
                          className={`leave-status ${item.leave_status.toLowerCase()}`}
                        >
                          {item.leave_status === "Pending" && (
                            <span className="status-pending">Pending</span>
                          )}
                          {item.leave_status === "Approved" && (
                            <span className="status-approved">Approved</span>
                          )}
                          {item.leave_status === "Rejected" && (
                            <span className="status-rejected">Rejected</span>
                          )}
                        </span>
                      </td>
                      {/* 
                      <td>{renderLeaveStatusButtons(item)}</td> */}
                    </tr>
                  ))}
                {!loading && adminGettingLeaveApplications.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Pending leaves
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {loading && (
              <div className="d-flex justify-content-center mt-3">
                <Loader />
              </div>
            )}
          </section>
        )}
      </div>
    </section>
  );
};

export default AdminAcceptedEmployeeLeavesApplications;
