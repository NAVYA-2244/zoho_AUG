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
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [currentTab, setCurrentTab] = useState("calendar-view");
  const [employeesList, setEmployeesList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: "Pending",
    from_date: "",
    to_date: "",
    employee_id: "",
  });
  const navigate = useNavigate();
  const observer = useRef();

  const fetchLeaveApplications = useCallback(async () => {
    setLoading(true);
    try {
      console.log("formData.status", formData.status);
      const response = await backEndCallObjNothing(
        "/emp_get/leave_applications",
        {
          skip: 0, // Adjust skip to match API expectations (if needed)
          // status: formData.status,
          // from_date: formData.from_date,
          // to_date: formData.to_date,
          // employee_id: formData.employee_id, // Pass employee_id filter if needed
        }
      );
      if (response.data.length < limit) {
        setHasMore(false);
      }

      setAdminGettingLeaveApplications((prev) => [...response.data]);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    } finally {
      setLoading(false);
    }
  }, [skip, limit, formData, setAdminGettingLeaveApplications]);

  useEffect(() => {
    fetchLeaveApplications();
  }, [skip, fetchLeaveApplications]);

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

  let tableHeadProperties = [
    {
      name: "Employee ID",
      property: "employee_id",
      type: "string",
      onClick: (item) => {
        navigate(`/admin/employee/${item?.employee_id}`);
      },
      style: {
        color: "#6c63fc",
        cursor: "pointer",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
    },
    { name: "Employee Name", property: "employee_name" },
    { name: "Leave Type", property: "leave_type", type: "string" },
    { name: "From Date", property: "from_date", type: "string" },
    { name: "To Date", property: "to_date", type: "string" },
    { name: "Days Taken", property: "days_taken" },
    { name: "Reason", property: "reason" },
    { name: "Leave Status", property: "leave_status", type: "string" },
    { name: "Actions", property: "actions" },
  ];

  const tabs = [
    { name: "calendar-view", label: <FaCalendarCheck /> },
    { name: "table-view", label: <FaTableCells /> },
  ];

  const onLeaveAccept = async (leave_application_id) => {
    try {
      const data = { leave_application_id, leave_status: "Approved" };
      const response = await backEndCallObjNothing("/user/update_leave", data);
      const updatedApplication = response.data;
      // setAdminGettingLeaveApplications((prev) =>
      //   prev.map((app) =>
      //     app.leave_application_id === leave_application_id
      //       ? updatedApplication
      //       : app
      //   )
      // );
      setAdminGettingLeaveApplications(response);
      toastOptions.success("Success");
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
      const response = await backEndCallObjNothing("/user/update_leave", data);
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
      setAdminGettingLeaveApplications(response);
      toastOptions.error("Rejected");
    } catch (error) {
      toastOptions.error(
        error?.response?.data?.detail ||
          "Error While Rejecting Leave Application"
      );
    }
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);

        let employees = await backEndCallObjNothing(
          "/user_get/get_employee_list",
          { skip: 0 }
        );
        setEmployeesList(employees);
      } catch (error) {
        toastOptions.error(error?.response?.data || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, []);

  console.log(adminGettingLeaveApplications, "Admin");

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
              {employeesList.map((employee) => (
                <option key={employee.employee_id} value={employee.employee_id}>
                  {employee.employee_id} - {employee.basic_info.first_name}
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
          <div className="col-lg-3 col-md-3 col-sm-6 admin-leave-filters">
            <label>From Date</label>
            <input
              type="date"
              name="from_date"
              value={formData.from_date}
              className="form-control"
              // max={moment().format("YYYY-MM-DD")}
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
              // max={moment().format("YYYY-MM-DD")}
              onChange={handleFormChange}
            />
          </div>

          <div className="leave-applications-btn">
            <button type="submit">Submit</button>
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
                      <section className="status g-2">
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
                {adminGettingLeaveApplications.map((application) => (
                  <tr key={application.id}>
                    {/* {tableHeadProperties.map((head, index) => (
                        <td
                          key={index}
                          onClick={() => head.onClick && head.onClick(application)}
                          style={head.style}
                        >
                          {application[head.property]}
                        </td>
                      ))} */}

                    <td>{application.employee_id}</td>
                    <td>{application.employee_name}</td>
                    <td>{application.leave_type}</td>
                    <td>{application.from_date}</td>
                    <td>{application.to_date}</td>
                    <td>{application.days_taken}</td>
                    <td>{application.reason}</td>
                    <td>{application.leave_status}</td>

                    <td className="leave-actions">
                      {application.leave_status === "Pending" && (
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
                        <button className="actions-btn approve">
                          <AiOutlineLike />
                        </button>
                      )}
                      {application.leave_status === "Rejected" && (
                        <button className="actions-btn reject">
                          <AiOutlineDislike />
                        </button>
                      )}
                    </td>
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
