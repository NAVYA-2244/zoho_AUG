import React, { useEffect, useState, useRef, useCallback } from "react";
import { useStateContext } from "../../Contexts/StateContext";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import Loader from "../../Loader/Loader";
import TableHead from "../../Table/TableHead";
import Modal from "../../Modals/Modal";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaTableCells } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Date_Input } from "../../common/ALLINPUTS/AllInputs";
import moment from "moment-timezone";

const AdminAcceptedEmployeeLeavesApplications = () => {
  const {
    showModal,
    adminGettingLeaveApplications,
    setAdminGettingLeaveApplications,
    employeeDetails
  } = useStateContext();
  

  const { applicationColor } = useThemeContext();
  // const [teamMembers, setTeamMembers] = useState([]);
  const [currentTab, setCurrentTab] = useState("calendar-view");
  const [employeesList, setEmployeesList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    leave_status: "Pending",
    from_date: "",
    to_date: "",
    employee_id: "",
  });
  const navigate = useNavigate();
  console.log(adminGettingLeaveApplications,"adminGettingLeaveApplications")
  const observer = useRef();

  const fetchLeaveApplications = useCallback(async () => {
    setLoading(true);
    try {
      console.log("formData.status", formData.status);
      const response = await backEndCallObjNothing(
        "/admin_get/all_leave_applications",
        {
          skip: 0, // Adjust skip to match API expectations (if needed)
          leave_status: formData.status,
          from_date: formData.from_date,
          to_date: formData.to_date,
          employee_id: formData.employee_id, // Pass employee_id filter if needed
        }
       
      );
      console.log(response,"response")
      // if (response.data.length < limit) {
      //   setHasMore(false);
      // }

      setAdminGettingLeaveApplications(response);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    } finally {
      setLoading(false);
    }
  }, [skip, limit, formData, setAdminGettingLeaveApplications]);

  useEffect(() => {
    fetchLeaveApplications();
  }, [skip, fetchLeaveApplications]);
console.log(adminGettingLeaveApplications,"adminGettingLeaveApplications")
  // const gettingMoreDataRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setSkip((prevSkip) => prevSkip + 1); // Increment skip by 1 to load more data
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, hasMore]
  // );

  const handleFormChange = (e) => {
    console.log(e, "e");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const data = { leave_application_id, leave_status: "Approved" };
      const response = await backEndCallObjNothing("/admin/update_leave_application", data);
      const updatedApplication = response.data;
      // setAdminGettingLeaveApplications((prev) =>
      //   prev.map((app) =>
      //     app.leave_application_id === leave_application_id
      //       ? updatedApplication
      //       : app
      //   )
      // );
      // setAdminGettingLeaveApplications(response); 
      toastOptions.success(response||"Success");
    } catch (error) {
      toastOptions.error(
        error?.response?.data?.detail ||
          "Error while Accepting Leave Application"
      );
    }
  };

  const onLeaveReject = async (leave_application_id) => {
    try {
      const data = { leave_application_id, leave_status: "Rejected" };
      const response = await backEndCallObjNothing("/admin/update_leave_application", data);
      const updatedApplication = response.data;
      console.log(
        adminGettingLeaveApplications,
        "setAdminGettingLeaveApplications"
      );
      // setAdminGettingLeaveApplications((prev) =>
      //   prev.map((app) =>
      //     app.leave_application_id === leave_application_id
      //       ? updatedApplication
      //       : app
      //   )
      // );
      // setAdminGettingLeaveApplications(response);
      toastOptions.error(response||"rejected");
    } catch (error) {
      toastOptions.error(
        error?.response?.data?.detail ||
          "Error While Rejecting Leave Application"
      );
    }
  };
  const getTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing("/admin_get/get_employee_list",{skip:0});
      setEmployeesList(response);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toastOptions.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  
const renderLeaveStatusButtons = useCallback((application) => {
  const { hr, manager, team_incharge } = application.approved_by;
  const employeeRole = employeeDetails?.role_name;

  let roleStatus = null;
  if (employeeRole === "hr" && hr) roleStatus = hr.leave_status;

  else if (employeeRole === "Manager" && manager) roleStatus = manager.leave_status;
  else if (employeeRole === "Team Incharge" && team_incharge) roleStatus = team_incharge.leave_status;

  if (!roleStatus) return <p>Role mismatch or no action available for this role.</p>;

  return (
    <section className="status g-2">
      {roleStatus === "Pending" ? (
        <>
          <button className="actions-btn accept" onClick={() => onLeaveAccept(application.leave_application_id)}>
            Approve
          </button>
          <button className="actions-btn reject" onClick={() => onLeaveReject(application.leave_application_id)}>
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
}, [employeeDetails]);
  console.log(adminGettingLeaveApplications, "Admin");
  
  const handleReset = () => {
    setFormData("");
    setSkip(0);
    setHasMore(true);
   
    fetchLeaveApplications(); // refetch with reset filters
  };

  return (
    <section
      className="admin-accepted-leave-applications"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
      }}
    >
      <div className="employee-leaves-heading">
        <p>Employee Leave Applications</p>
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
              {employeesList?.map((member) => (
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
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 admin-leave-filters">
            <label>From Date</label>
            <input
              type="date"
              name="from_date"
              value={formData.from_date}
              className="form-control"
              max={moment().format("YYYY-MM-DD")}
              onChange={handleFormChange}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 admin-leave-filters">
            <label>To Date</label>
            <input
              type="date"
              name="to_date"
              value={formData.to_date}
              className="form-control"
              max={moment().format("YYYY-MM-DD")}
              onChange={handleFormChange}
            />
          </div>

          {/* <div className="leave-applications-btn"> */}
            {/* <button type="submit">Submit</button>
          </div> */}
          <div className="leave-applications-btn">
            <button type="submit">Submit</button>
            <button type="button"className="btn btn-primary" onClick={handleReset}>Reset</button>
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
            {adminGettingLeaveApplications.map((item) => (
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
                        <p>Status: {item.leave_status}</p>
                      </div>
                      <div className="leave-card-data">
                        <p>From: {item.from_date}</p>
                        <p>To : {item.to_date}</p>
                      </div>
                      <div className="leave-card-data">
                        <p>Reason: {item.reason}</p>
                        <p>Days Taken: {item.days_taken}</p>
                      </div>
                      <div className="leave-card-data">
                        <p>Remaining Leaves:</p>
                        <p>{item.remaining_leaves}</p>
                      </div>
                      {/* <section className="status g-2">
                        {item.leave_status === "Pending" && (
                          <>
                            <button
                              className="accept py-2 px-3"
                              onClick={() =>
                                onLeaveAccept(item.leave_application_id)
                              }
                            >
                              Approve
                            </button>
                            <button
                              className="reject py-2 px-3"
                              onClick={() =>
                                onLeaveReject(item.leave_application_id)
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {item.leave_status === "Approved" && (
                          <button className="accept py-2 px-3">Approved</button>
                        )}
                        {item.leave_status === "Rejected" && (
                          <button className="reject py-2 px-3 ms-auto">
                            Rejected
                          </button>
                        )}
                      </section> */}
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
                adminGettingLeaveApplications.length === 0 &&
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
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Days Taken</th>
                <th>Reason</th>
                <th>Leave Status</th>
                <th>Actions</th>
              </thead>
              <tbody className="admin-leaves-table-body">
                {adminGettingLeaveApplications.map((item) => (
                  <tr key={item.id}>
                    {/* {tableHeadProperties.map((head, index) => (
                        <td
                          key={index}
                          onClick={() => head.onClick && head.onClick(application)}
                          style={head.style}
                        >
                          {application[head.property]}
                        </td>
                      ))} */}

                    <td>{item.employee_id}</td>
                    <td>{item.employee_name}</td>
                    <td>{item.leave_type}</td>
                    <td>{item.from_date}</td>
                    <td>{item.to_date}</td>
                    <td>{item.days_taken}</td>
                   <td style={{ maxWidth: '200px', wordWrap: 'break-word', whiteSpace: 'normal' }}>
        {item.reason}
      </td>
                    <td>{item.leave_status}</td>
                    <td>{renderLeaveStatusButtons(item)}</td>
                    {/* <td className="leave-actions"> */}
                      {/* {application.leave_status === "Pending" && (
                        <>
                          <button
                            className="actions-btn approve"
                            onClick={() =>
                              onLeaveAccept(application.leave_application_id)
                            }
                          >
                            <AiOutlineLike />
                          </button>

                          <button
                            className="actions-btn reject"
                            onClick={() =>
                              onLeaveReject(application.leave_application_id)
                            }
                          >
                            <AiOutlineDislike />
                          </button>
                        </>
                      )}
                      {application.leave_status === "Approved" && (
                        <button className="actions-btn approved">
                          <AiOutlineLike />
                        </button>
                      )}
                      {application.leave_status === "Rejected" && (
                        <button className="actions-btn reject">
                          <AiOutlineDislike />
                        </button>
                      )} */}

                    {/* </td> */}
                  </tr>
                ))}
                {!loading && adminGettingLeaveApplications.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center">
                      No Pending leaves
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* {hasMore && !loading && (
                // <div ref={gettingMoreDataRef} className="d-flex justify-content-center mt-3">
                //   <button className="load-more" onClick={() => setSkip((prevSkip) => prevSkip + limit)}>
                //     Load More
                //   </button>
                // </div>
              )} */}
            {loading && (
              <div className="d-flex justify-content-center mt-3">
                <Loader />
              </div>
            )}
          </section>
        )}
      </div>
      {/* <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      /> */}
    </section>
  );
};

export default AdminAcceptedEmployeeLeavesApplications;
