import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStateContext } from "../../Contexts/StateContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { useNavigate, useParams } from "react-router";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import Loader from "../../Loader/Loader";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { useThemeContext } from "../../Contexts/ThemesContext";
import TableHead from "../../Table/TableHead";

const AdminQueryData = () => {
  const {
    employeeDetails,
    loadingTerm,
    setLoadingTerm,
    loading,
    setLoading,
    setModalData,
    setshowModal,
  } = useStateContext();
  const { query } = useParams();
  const { applicationColor } = useThemeContext();
  const [adminDashboardData, setAdminDashboardData] = useState([]);
  const navigate = useNavigate();
  const dataObserver = useRef(null);
  const [skip, setSkip] = useState(0);
  const [adminDashboardDataExist, setAdminDashboardDataExist] = useState(false);
  const [dataTypeTable, setDataTypeTable] = useState(false);

  let tableHeadProperties = [
    {
      name: "Employee Id",
      property: "employeeId",
      type: "string",
      onClick: (item) => {
        setshowModal(true);
        setModalData(item);
      },
    },
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
    { name: "actions", property: "" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let data = {};
      try {
        setLoadingTerm("adminDashboardData");
        setLoading(true);
        setAdminDashboardDataExist(false);
        setDataTypeTable(false);

        toastOptions.success(query);
        if (
          ["present", "absent", "lateCheckin", "nonCheckin"].includes(query)
        ) {
          data.attendanceFilters = {
            filter: query,
            skip: 0,
            limit: 12,
          };

          let { detail } = await makeNetworkCall(
            data,
            "getDashboardData",
            "headers"
          );

          let keys = Object.keys(detail);
          setLoadingTerm("");
          setLoadingTerm(false);
          setAdminDashboardData(detail[keys[1]]);
        }

        if (["Male", "Female"].includes(query)) {
          data.employeesFilters = {
            gender: query,
            skip: 0,
            limit: 12,
          };

          let { detail } = await makeNetworkCall(
            data,
            "getDashboardData",
            "headers"
          );

          let keys = Object.keys(detail);
          setLoadingTerm("");
          setLoading(false);
          setAdminDashboardData(detail[keys[0]]);
        }

        if (["applied", "approved", "rejected", "pending"].includes(query)) {
          data.leavesFilters = {
            filter: query,
            skip: 0,
            limit: 12,
          };

          let { detail } = await makeNetworkCall(
            data,
            "getDashboardData",
            "headers"
          );

          let keys = Object.keys(detail);
          setLoadingTerm("");
          setLoading(false);
          setAdminDashboardData(detail[keys[2]]);
          setDataTypeTable(true);
        }
      } catch (error) {
        toastOptions.error("Error Occured");
        setLoadingTerm("");
        setLoading(false);
      } finally {
        setLoadingTerm("");
        setLoading(false);
      }
    };
    if (query && employeeDetails.adminType === "1") {
      fetchData();
    }
  }, [query, employeeDetails]);

  const fetechMoreData = async () => {
    try {
      setLoading(true);
      setLoadingTerm("getMoreAdminDashboardData");
      let data = {};

      if (["present", "absent", "lateCheckin", "nonCheckin"].includes(query)) {
        data.attendanceFilters = {
          filter: query,
          skip: skip * 12,
          limit: 12,
        };

        let { detail } = await makeNetworkCall(
          data,
          "getDashboardData",
          "headers"
        );

        let keys = Object.keys(detail);

        if (detail[keys[1]].length > 0) {
          setAdminDashboardData((prevList) => {
            return [...prevList, ...detail[keys[1]]];
          });
        } else {
          setAdminDashboardDataExist(true);
        }

        setLoadingTerm("");
        setLoading(false);
      }

      if (["Male", "Female"].includes(query)) {
        data.employeesFilters = {
          gender: query,
          skip: skip * 12,
          limit: 12,
        };

        let { detail } = await makeNetworkCall(
          data,
          "getDashboardData",
          "headers"
        );

        let keys = Object.keys(detail);

        if (detail[keys[0]].length > 0) {
          setAdminDashboardData((prevList) => {
            return [...prevList, ...detail[keys[0]]];
          });
        } else {
          setAdminDashboardDataExist(true);
        }

        setLoading(false);
        setLoadingTerm("");
      }

      if (["applied", "approved", "rejected", "pending"].includes(query)) {
        data.employeesFilters = {
          filter: query,
          skip: skip * 12,
          limit: 12,
        };

        let { detail } = await makeNetworkCall(
          data,
          "getDashboardData",
          "headers"
        );

        let keys = Object.keys(detail);

        if (detail[keys[2]].length > 0) {
          setAdminDashboardData((prevList) => {
            return [...prevList, ...detail[keys[2]]];
          });
        } else {
          setAdminDashboardDataExist(true);
        }

        setLoading(false);
        setLoadingTerm("");
      }
    } catch (error) {
      setLoading(false);
      toastOptions.error("error while fetching more data", error);
      setLoadingTerm("");
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  const getAdminDashboardRef = useCallback(
    (node) => {
      if (loading) return;
      if (dataObserver.current) dataObserver.current.disconnect();
      dataObserver.current = new IntersectionObserver(async (entries) => {
        if (
          entries[0].isIntersecting &&
          !adminDashboardDataExist &&
          adminDashboardData.length >= 12
        ) {
          setSkip((prevSkip) => prevSkip + 1);
          if (skip) {
            await fetechMoreData();
            // await fetchMoreData("getMoreBirthdayList",birthdaylistSkip,"birthdays",setTodayBirthdays,setBirthdayDataExist,5)
          }
          // toastOptions.success(birthdaylistSkip);
        }
      });

      if (node) dataObserver.current.observe(node);
    },
    [
      loading,
      adminDashboardData,
      setAdminDashboardData,
      query,
      adminDashboardDataExist,
      skip,
      setSkip,
    ]
  );

  if (loading && loadingTerm === "adminDashboardData") {
    return <Loader />;
  }

  if (adminDashboardData.length === 0) {
    return (
      <div className="no-dashboard-data">
        <h2 style={{ color: applicationColor.readColor2 }}>
          No data with -{" "}
          <span
            className="query-status"
            style={{ color: applicationColor.readColor1 }}
          >
            {query === "nonCheckin"
              ? "Absent"
              : query === "absent"
              ? "Leave"
              : query}
          </span>{" "}
        </h2>
      </div>
    );
  }

  if (dataTypeTable) {
    return (
      <section className="query_data">
        <div
          className="tables"
          style={
            {
              // boxShadow:`0 0 1px 1px ${.shade_5}  `
            }
          }
        >
          <table className="main-table">
            <TableHead
              tableHeadProperties={tableHeadProperties}
              data={adminDashboardData}
              component="LeaveUpdationActions"
              loadMoreRef={getAdminDashboardRef}
              getExtraDataType="getMoreAdminDashboardData"
              dataExist={adminDashboardDataExist}
            />
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="admin_all_employees query_data">
      {/* <div
        className="no-dashboard-data secondary_query"
        style={{
          display: "flex",
          justifyContent: "flexStart",
        }}
      >
        <h2 style={{ color: applicationColor.readColor1 }}>
          <span className="query-status">{query}</span>{" "}
          <span style={{ color: applicationColor.readColor2 }}>Employees</span>
        </h2>
      </div> */}

      {adminDashboardData?.map((employee, index) => {
        if (adminDashboardData?.length === index + 1) {
          return (
            <section
              className="employee-card"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
              ref={getAdminDashboardRef}
            >
              <div className="img-details">
                <div className="img-options">
                  <img
                    src="https://img.freepik.com/premium-photo/interior-designer-digital-avatar-generative-ai_934475-9141.jpg"
                    alt="Employee"
                  />

                  <div className="dropdown">
                    <a
                      className="dots"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      href="#"
                    >
                      ...
                    </a>

                    <ul className="dropdown-menu">
                      {["Profile"].map((item) => {
                        return (
                          <li
                            onClick={() =>
                              navigate(`/admin/employee/${employee.employeeId}`)
                            }
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <span className="name">{employee.employeeName}</span>
                <span className="designtion">
                  Frontend Developer {employee.designation}
                </span>
              </div>

              <div
                className="email-phone-number"
                style={{
                  background: applicationColor.cardBg2,
                  color: applicationColor.readColor2,
                }}
              >
                <h2 className="email" style={{ textTransform: "none" }}>
                  <span>
                    <MdOutlineMailOutline />
                  </span>
                  {employee.email}
                </h2>
                <h2>
                  <span>
                    <MdOutlinePhone />
                  </span>
                  {employee?.contactDetails?.phoneNumber_work || "9676234130"}
                </h2>
              </div>
            </section>
          );
        } else {
          return (
            <section
              className="employee-card"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}

              //   ref={ref}
            >
              <div className="img-details">
                <div className="img-options">
                  <img
                    src="https://img.freepik.com/premium-photo/interior-designer-digital-avatar-generative-ai_934475-9141.jpg"
                    alt="Employee"
                  />

                  <div className="dropdown">
                    <a
                      className="dots"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      href="#"
                    >
                      ...
                    </a>

                    <ul className="dropdown-menu">
                      {["Profile"].map((item) => {
                        return (
                          <li
                            onClick={() =>
                              navigate(`/admin/employee/${employee.employeeId}`)
                            }
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <span className="name">{employee.employeeName}</span>
                <span className="designtion">
                  Frontend Developer {employee.designation}
                </span>
              </div>

              <div
                className="email-phone-number"
                style={{
                  background: applicationColor.cardBg2,
                  color: applicationColor.readColor2,
                }}
              >
                <h2 className="email" style={{ textTransform: "none" }}>
                  <span>
                    <MdOutlineMailOutline />
                  </span>
                  {employee.email}
                </h2>
                <h2>
                  <span>
                    <MdOutlinePhone />
                  </span>
                  {employee?.contactDetails?.phoneNumber_work || "9676234130"}
                </h2>
              </div>
            </section>
          );
        }
      })}
      {loading && loadingTerm === "getMoreAdminDashboardData" && <Loader />}
    </section>
  );
};

export default AdminQueryData;
