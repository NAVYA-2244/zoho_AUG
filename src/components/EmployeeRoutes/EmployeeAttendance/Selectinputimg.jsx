import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dummyUser from "../../../assets/Header/dummy-user.jpg";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../services/mainService";

function Selectinputimg({ setSelectedEmployeeId }) {
  const [employeesList, setEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const { employeeDetails } = useStateContext();
  const navigate = useNavigate();
  const { applicationColor } = useThemeContext();
  const { mainAdmin } = useFunctionContext();
  const [options, setOptions] = useState([]);

  // Fetching the list of employees
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const all_emps = await backEndCallObjNothing("/org/get_team_for_task");

        setEmployeesList(all_emps);
      } catch (error) {
        toastOptions.error(error?.response?.data || "Something went wrong");
      }
    };
    fetchingData();
  }, []);

  useEffect(() => {
    if (mainAdmin) {
      setOptions(employeesList);
    } else {
      setOptions([
        {
          label: employeeDetails?.basic_info?.email,
          value: employeeDetails?.employee_id,
        },
      ]);
    }
  }, [mainAdmin, employeesList, employeeDetails]);

  // Handle search input change
  const handleChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filtered = employeesList.filter(
      (employee) =>
        employee.basic_info?.first_name.toLowerCase().includes(searchQuery)
      // employee.basic_info?.email.toLowerCase().includes(searchQuery) ||
      // employee.work_info.role_name.toLowerCase().includes(searchQuery)
    );
    setOptions(filtered);
  };

  // Handle employee selection and pass the selected employee ID to the parent component
  const handleSelect = (employee) => {
    setSelectedEmployee({
      id: employee.employee_id,
      email: employee?.basic_info?.email,
      name: `${employee?.basic_info?.first_name} ${employee?.basic_info?.last_name}`,
    });

    // Pass the selected employee ID to the parent component
    setSelectedEmployeeId(employee.employee_id);
  };

  return (
    <Fragment>
      <div
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
        className="dropdown my-3"
      >
        <Link
          className="user-image dropdown-toggle employee-image"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="dropdown-header">
            <img
              src={dummyUser}
              alt="userImage"
              width="30px"
              height="30px"
              className="rounded-circle"
            />
            <div className="details">
              {/* <span className="email">{selectedEmployee.email || "Select Employee"}</span> */}
              <span className="name">{selectedEmployee.name || ""}</span>
            </div>
          </div>
        </Link>

        <ul className="dropdown-menu user-dropdown">
          <div className="dropdown-header">
            <input
              type="text"
              placeholder="Search..."
              className="dropdown-input"
              id="dropdown-input"
              onChange={handleChange}
            />
          </div>
          <li className="dropdown-content" id="dropdown-content">
            {options?.map((employee) => (
              <div
                key={employee.employee_id}
                className="dropdown-item"
                onClick={() => handleSelect(employee)}
              >
                <img
                  src={dummyUser}
                  alt="employeeImage"
                  width="40px"
                  height="40px"
                  className="dropdown-item-image rounded-circle"
                />
                <div>
                  {/* <h5 onClick={() => navigate(`/admin/employee/${employee?.employee_id}`)}> */}
                  {employee?.basic_info?.first_name}{" "}
                  {employee?.basic_info?.last_name}
                  {/* </h5> */}
                  <p>{employee?.basic_info?.email}</p>
                  {/* <span>{employee?.employee_id}</span> */}
                </div>
              </div>
            ))}
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default Selectinputimg;
