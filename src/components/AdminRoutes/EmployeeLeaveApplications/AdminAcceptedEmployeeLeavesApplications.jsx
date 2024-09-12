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
import Selectinputimg from "../../EmployeeRoutes/EmployeeAttendance/Selectinputimg";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

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
  const [currentTab, setCurrentTab] = useState("table-view");
  // const [employeesList, setEmployeesList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [leavescount, setLeavescount] = useState([]);
  const [RefreshDisable, setRefreshDisable] = useState(false);

  const [btndisabled, setBtndisabled] = useState(false);

  const [year, setYear] = useState("");
  const [showModal1, setShowModal] = useState(false);
  const [RejectModel, setRejectModel] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
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
    console.log(
      "admingadminGettingLeaveApplicationset",
      adminGettingLeaveApplications
    );
    setLoading(true);

    try {
      console.log("formData.status", formData.status);
      console.log(
        "admingadminGettingLeaveApplicationset",
        adminGettingLeaveApplications
      );
      if (!adminGettingLeaveApplications) {
        console.log(
          "admingadminGettingLeaveApplicationset",
          adminGettingLeaveApplications
        );
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
  const handleThumbsUpClick = (item) => {
    setSelectedLeave(item);
    setShowModal(true);
  };
  const handleThubsDownClick = (item) => {
    setSelectedLeave(item);
    setRejectModel(true);
  };
  useEffect(() => {
    if (selectedLeave) {
      console.log(
        "Selected Leave Application:",
        selectedLeave.leave_application_id
      );
    }
  }, [selectedLeave]);
  const handleLeaveAccept = async () => {
    setBtndisabled(true);
    if (selectedLeave && selectedLeave.leave_application_id) {
      onLeaveAccept(selectedLeave.leave_application_id);
      await fetchLeaveApplications();
      closeModal();
      setBtndisabled(false);
    } else {
      console.error("Leave application ID is missing or undefined.");
    }
  };
  const handleLeaveReject = async () => {
    setBtndisabled(true);
    if (selectedLeave && selectedLeave.leave_application_id) {
      onLeaveReject(selectedLeave.leave_application_id);
      closeModal();
      setBtndisabled(false);
    } else {
      console.error("Leave application ID is missing or undefined.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // First, update formData immediately
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Then perform the asynchronous operation if needed
    setAdminGettingLeaveApplications(null);
  };

  const handleYearChange = async (e) => {
    await setAdminGettingLeaveApplications(null);
    const selectedYear = new Date(e.target.value).getFullYear().toString();
    setFormData((prev) => ({
      ...prev,
      year: selectedYear, // Update year in formData
    }));
  };
  const handleSubmit = async (e) => {
    console.log("enter");
    await setAdminGettingLeaveApplications(null);
    console.log("enter", adminGettingLeaveApplications);
    // if (moment(formData.end_date).isBefore(formData.start_date)) {
    //   toastOptions.error("End Date cannot be less than Start Date");
    //   return;
    // }
    e.preventDefault();
    setSkip(0);
    setHasMore(true);

    fetchLeaveApplications(); // fetch with updated filters
  };

  const tabs = [
    { name: "table-view", label: <FaTableCells /> },
    { name: "calendar-view", label: <FaCalendarCheck /> },
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
      toastOptions.success(response || "rejected");
      setBtndisabled(false);
    } catch (error) {
      setBtndisabled(false);
      toastOptions.error(
        error?.response?.data?.detail ||
          "Error While Rejecting Leave Application"
      );
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setRejectModel(false);
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
  useEffect(() => {
    console.log("Selected employee_id:", formData.employee_id);
  }, [formData.employee_id]);
  return (
    <section
      className="admin-accepted-leave-applications"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div
          className="employee-leaves-heading d-flex
        "
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="mb-0">Employee Leave Applications</span>
            {console.log(loading, "ji")}
            <span
              onClick={loading ? null : handleRefresh}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              {loading ? (
                <span
                  className="spinner-border text-primary"
                  role="status"
                  style={{ height: "20px", width: "20px" }}
                ></span>
              ) : (
                <i className="ri-loop-right-line text-primary fs-5 cursor-pointer "></i>
              )}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row row-gap-4">
          <div className="col-lg-3 col-md-3 col-sm-6 admin-leave-filters">
            <label>Employee </label>
            <select
              name="employee_id"
              value={formData.employee_id}
              className="form-control form-select"
              onChange={handleFormChange}
            >
              <option value="">--select--</option>
              {TeamTask?.map((member) => (
                <option key={member.employee_id} value={member.employee_id}>
                  {`${member.basic_info.first_name} ${member.basic_info.last_name}`}
                </option>
              ))}
            </select>

            {/* <Selectinputimg/> */}
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 admin-leave-filters">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              className="form-control form-select"
              onChange={loading ? null : handleFormChange}
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
              type="year"
              name="year"
              onChange={handleYearChange}
              className="form-control"
              placeholder="Select Year"
            />
          </div>
          <div className="leave-applications-btn">
            {/* <button type="submit">Submit</button> */}

            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={handleReset}
            >
              Reset
            </button> */}
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
            ? leavescount?.map((item) => {
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
            {tabs?.map((tab) => (
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
                          {/* <p>From: {item.from_date}</p>
                      <p>From: {item.}</p> */}
                          <p>
                            Form:{" "}
                            {format(
                              new Date(item.from_date),
                              "EEE, dd-MM-yyyy "
                            )}
                          </p>
                          <p>
                            To:{" "}
                            {format(new Date(item.to_date), "EEE, dd-MM-yyyy ")}
                          </p>
                          {/* <p>To : {item.to_date}</p> */}
                        </div>
                        <div className="leave-card-data">
                          <p>Days Taken: {item.days_taken}</p>
                        </div>
                        {/* <div className="leave-card-data">
                      <p>Reason: {item.reason}</p>
                    </div> */}
                        <div className="leave-card-data">
                          <p>Applied on:</p>
                          <p>
                            {format(
                              new Date(item.createdAt),
                              "EEE, dd-MM-yyyy hh:mm a"
                            )}
                          </p>
                        </div>
                        <div class="text-wrap p-3 border rounded mb-2">
                          <p>Reason: {item.reason}</p>
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
          <section className="tables">
            <table className="main-table table-bordered table-responsive admin-employee-leaves-table">
              <thead
                className="admin-leaves-table-head"
                style={{
                  background: applicationColor.tableHeadBg,
                  color: applicationColor.readColor1,
                }}
              >
                <th>Approve</th>
                <th>Reject</th>
                <th>Applied On</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                {/* <th>Days Taken</th> */}
                <th>Reason</th>
                <th>Leave Status</th>
              </thead>
              <tbody className="admin-leaves-table-body">
                {adminGettingLeaveApplications?.length > 0 &&
                  adminGettingLeaveApplications?.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        {item.approved ? (
                          <FaThumbsUp className="text-success" />
                        ) : (
                          <div
                            className="actions-btn accept"
                            disabled={btndisabled}
                            // onClick={() =>
                            //   onLeaveAccept(item.leave_application_id)
                            // }
                          >
                            <FaThumbsUp
                              className="text-success"
                              onClick={() => handleThumbsUpClick(item)}
                            />
                          </div>
                        )}
                      </td>
                      <td className="text-center">
                        {item.rejected ? (
                          <FaThumbsDown className="text-danger " />
                        ) : (
                          <div
                            className="actions-btn reject"
                            disabled={btndisabled}
                            // onClick={() =>
                            //   onLeaveReject(item.leave_application_id)
                            // }
                          >
                            <FaThumbsDown
                              className="text-danger"
                              onClick={() => handleThubsDownClick(item)}
                            />
                          </div>
                        )}
                      </td>

                      <td>
                        {format(
                          new Date(item.createdAt),
                          "EEE, dd-MM-yyyy hh:mm a"
                        )}
                      </td>
                      <td>
                        {item.employee_name}
                        <br />
                        <small style={{ color: "#888" }}>
                          {item.employee_id}
                        </small>
                      </td>
                      <td>
                        {item.leave_type} - {item.days_taken}
                      </td>
                      <td>
                        {format(new Date(item.from_date), " dd-MM-yyyy ")}
                      </td>
                      <td>{format(new Date(item.to_date), " dd-MM-yyyy ")}</td>
                      {/* <td>{item.days_taken}</td> */}
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
                    </tr>
                  ))}

                {!loading && adminGettingLeaveApplications?.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center">
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

            {showModal1 && selectedLeave && (
              <div
                className="modal show d-flex justify-content-center align-items-center"
                tabIndex="-1"
                role="dialog"
                style={{ display: "block" }}
              >
                <div className="modal-dialog  " role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h6 className="modal-title">
                        Confirm Employee Leave Request{" "}
                      </h6>
                      {/* <button
                        type="button"
                        className="close"
                        onClick={closeModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button> */}
                    </div>
                    <div className="modal-body">
                      <p>
                        Are you sure want to approve the leave of{" "}
                        {selectedLeave.employee_name}?
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        disabled={btndisabled}
                        className="btn btn-primary"
                        onClick={handleLeaveAccept}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {RejectModel && selectedLeave && (
              <div
                className="modal show"
                tabIndex="-1"
                role="dialog"
                style={{ display: "block" }}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h6 className="modal-title">
                        Confirm Employee Leave Request
                      </h6>
                      {/* <button
                        type="button"
                        className="close"
                        onClick={closeModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button> */}
                    </div>
                    <div className="modal-body">
                      <p>
                        Are you sure want to Reject the leave of{" "}
                        {selectedLeave.employee_name}?
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleLeaveReject}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </section>
  );
};

export default AdminAcceptedEmployeeLeavesApplications;
