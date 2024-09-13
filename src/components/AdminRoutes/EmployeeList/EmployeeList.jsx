import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStateContext } from "../../Contexts/StateContext";
import { useNavigate } from "react-router";
import { toastOptions } from "../../../Utils/FakeRoutes";
import Loader from "../../Loader/Loader";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { AiOutlineEdit } from "react-icons/ai";
import { backEndCallObjNothing } from "../../../services/mainService";
import { debounce } from "lodash";

const EmployeeList = () => {
  const { loading, setLoading, employeesList, setEmployeesList } =
    useStateContext();
  const { applicationColor } = useThemeContext();
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [bkcoll, setbkcall] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  // Initialize skip to 0
  const observer = useRef();

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      setbkcall(false);
      const obj = { skip: employeesList.length };
      let { employees } = await backEndCallObjNothing(
        "/admin_get/get_employee_list",
        obj
      );
      if (employees?.length === 0) {
        setLoadMore(true);
        toastOptions.info("No more users to fetch.");
      } else {
        setEmployeesList((prevemployees) => [...prevemployees, ...employees]);
      }
    } catch (ex) {
      if (ex.response && ex.response?.status === 400) {
        toastOptions.error(ex.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!employeesList || employeesList?.length == 0) {
      fetchData();
    }
  }, []);
  const handleRef = useCallback((node) => {
    if (loadMore) return;
    if (loading) return;
    if (bkcoll) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (employeesList?.length >= 50) {
          fetchData();
        }
      }
    });

    if (node) observer.current.observe(node);
  });
  const debouncedSearchHandler = useCallback(
    debounce((term) => {
      if (term.length > 0) {
        const lowerCaseSearchTerm = term.toLowerCase();
        const filteredItems = employeesList?.filter((item) => {
          const {
            employee_id,
            basic_info: { first_name, last_name, email },
            work_info: {
              department_name,
              designation_name,
              location_name,
              date_of_join,
              shift_name,
            },
            contact_details: { seating_location },
          } = item;

          return (
            employee_id.toLowerCase().includes(lowerCaseSearchTerm) ||
            first_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            last_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            email?.toLowerCase().includes(lowerCaseSearchTerm) ||
            department_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            designation_name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            seating_location?.toLowerCase().includes(lowerCaseSearchTerm) ||
            date_of_join?.toLowerCase().includes(lowerCaseSearchTerm) ||
            shift_name?.toLowerCase().includes(lowerCaseSearchTerm)
          );
        });

        setFilteredEmployees(filteredItems);
      } else {
        setFilteredEmployees(null);
      }
    }, 300),
    [filteredEmployees]
  );

  useEffect(() => {
    debouncedSearchHandler(searchTerm);
    return debouncedSearchHandler.cancel;
  }, [searchTerm, debouncedSearchHandler]);

  const handleRefresh = async () => {
    if (isFetching) return;

    setIsFetching(true);
    try {
      await fetchData();
    } finally {
      setIsFetching(false);
    }
  };

  const kk = filteredEmployees ? filteredEmployees : employeesList;

  return (
    <section className="table-query new-query">
      <div
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
        className="table-wrapper py-2 px-3"
      >
        <div className="search-bar sticky-top mb-2">
          <div
            className="searchbar-loading"
            style={{
              color: applicationColor.readColor1,
              background: applicationColor.cardBg2,
            }}
          >
            <input
              className="employee-search"
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name={"searchTerm"}
              id="employee-search"
              style={{
                color: applicationColor.readColor1,
              }}
            />
          </div>
          <div
            onClick={isFetching ? null : handleRefresh}
            disabled={isFetching}
          >
            {isFetching ? (
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ height: "20px", width: "20px" }}
              ></div>
            ) : (
              <i
                className="ri-loop-right-line text-primary fs-5 cursor-pointer "
                style={{ cursor: "pointer" }}
              ></i>
            )}
          </div>
        </div>
        <div className="tables text-center">
          <table className="table table-bordered table-responsive rounded-1">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Date of Join</th>
                <th>Employee Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesList?.length > 0 ? (
                kk.map((employee, index) => {
                  if (index === employeesList?.length - 1) {
                    return (
                      <tr key={employee.employee_id} ref={handleRef}>
                        <td
                          style={{
                            color: "#6c63fc",
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            navigate(`/admin/employee/${employee?.employee_id}`)
                          }
                        >
                          {employee?.employee_id}
                        </td>
                        <td>
                          {employee?.basic_info?.first_name}
                          {employee?.basic_info?.last_name}
                        </td>
                        <td style={{ textTransform: "lowercase" }}>
                          {employee?.basic_info?.email
                            ? employee?.basic_info?.email.toLowerCase()
                            : ""}
                        </td>

                        <td>{employee?.work_info?.department_name}</td>
                        <td>{employee?.work_info?.designation_name}</td>

                        <td>
                          {employee?.work_info?.date_of_join
                            ? new Date(
                                employee?.work_info?.date_of_join
                              )?.toLocaleDateString("en-GB")
                            : "N/A"}
                        </td>

                        {/* <td>{employee.work_info.employee_status}</td> */}
                        <td>
                          <span
                            className={`badge ${
                              employee?.work_info?.employee_status === "active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {employee?.work_info?.employee_status}
                          </span>
                        </td>

                        <td>
                          <UpdateEmployeeAction id={employee.employee_id} />
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={employee.employee_id}>
                        <td
                          style={{
                            color: "#6c63fc",
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            navigate(`/admin/employee/${employee.employee_id}`)
                          }
                        >
                          {employee.employee_id}
                        </td>
                        <td>
                          {employee?.basic_info?.first_name}{" "}
                          {employee?.basic_info?.last_name}
                        </td>

                        <td style={{ textTransform: "lowercase" }}>
                          {employee?.basic_info?.email
                            ? employee?.basic_info?.email?.toLowerCase()
                            : ""}
                        </td>

                        <td>{employee?.work_info?.department_name}</td>
                        <td>{employee?.work_info?.designation_name}</td>
                        <td>
                          {employee?.work_info?.date_of_join
                            ? new Date(
                                employee?.work_info?.date_of_join
                              )?.toLocaleDateString("en-GB")
                            : "N/A"}
                        </td>

                        {/* <td>{employee.work_info.employee_status}</td> */}
                        <td>
                          <span
                            className={`badge ${
                              employee?.work_info?.employee_status === "active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {employee?.work_info?.employee_status}
                          </span>
                        </td>

                        <td>
                          <UpdateEmployeeAction id={employee?.employee_id} />
                        </td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    {loading ? <Loader /> : "No employees found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading && <Loader />}
        </div>
      </div>
    </section>
  );
};

export const UpdateEmployeeAction = ({ id }) => {
  const navigate = useNavigate();
  const { applicationColor } = useThemeContext();
  return (
    <section
      className="actions"
      style={{
        color: applicationColor.readColor1,
      }}
    >
      <button
        className="btn btn-primary rounded-circle p-2 d-flex justify-content-center align-items-center"
        onClick={() => navigate(`/admin/update_employee/${id}`)}
      >
        <AiOutlineEdit className="fs-5" />
      </button>
    </section>
  );
};

export default EmployeeList;
