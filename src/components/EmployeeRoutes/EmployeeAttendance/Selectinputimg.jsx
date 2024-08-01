import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dummyUser from "../../../assets/Header/dummy-user.jpg";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../services/mainService";

const fakeData = [
  { label: "sudheer@gmail.com", value: "CG1234" },
  { label: "stany@gmail.com", value: "CG1235" },
  { label: "harish@gmail.com", value: "CG1236" },
  { label: "suresh@gmail.com", value: "CG123457" },
  { label: "kinder@gmail.com", value: "Cg123458" },
];

function Selectinputimg() {
  const [allEmployeeIds, setAllEmployeeIds] = useState([]);
  const [filteredEmployeeIds, setFilteredEmployeeIds] = useState([]);
  const { employeeDetails, adminData2 } = useStateContext();
  const [employeesList, setEmployeesList] = useState([]);
  const navigate = useNavigate();

  console.log(employeesList, "image");

  const [selectedEmployee, setSelectedEmployee] = useState({
    email: employeeDetails.email,
    id: employeeDetails.userid,
  });

  console.log("employeeDetails", "eee");

  useEffect(() => {
    const fetchingData = async () => {
      try {
        let { all_emps } = await backEndCallObjNothing(
          "/user_get/get_emp_list"
        );
        console.log(all_emps, "data");
        setEmployeesList(all_emps);
      } catch (error) {
        toastOptions.error(error?.response?.data || "something went wrong");
      }
    };
    fetchingData();
  }, []);

  const { applicationColor } = useThemeContext();
  const { mainAdmin } = useFunctionContext();
  const [options, setOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState(employeesList);
  useEffect(() => {
    if (mainAdmin) {
      setOptions(employeesList);
    } else {
      setOptions([
        { label: employeeDetails.email, value: employeeDetails.userid },
      ]);
    }
  }, []);
  useEffect(() => {
    if (
      employeeDetails.adminType === "1" &&
      Object.keys(adminData2).length > 0
    ) {
      const formattedEmployeeData = adminData2.employeeData.map((emp) => ({
        value: emp.employee_id,
        label: emp.first_name,
      }));

      setAllEmployeeIds(formattedEmployeeData);
      setFilteredEmployeeIds(formattedEmployeeData);
      // console.log("Formatted Employee Data:", formattedEmployeeData);
    }
  }, [adminData2, employeeDetails]);

  const handleChange = (event) => {
    if (mainAdmin) {
      const searchQuery = event.target.value.toLowerCase();
      const filtered = employeesList.filter((employee) =>
        employee.label.toLowerCase().includes(searchQuery)
      );
      setOptions(filtered);
    } else return;
  };

  const handleSelect = (employee) => {
    setSelectedEmployee({
      id: employee.employee_id,
      email: employee.first_name,
    });
    console.log(employee, "employee");
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
          className="user-image dropdown-toggle employye-image"
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
              <span className="email">{`${selectedEmployee.email}`}</span>
              <span className="id">{selectedEmployee.id}</span>
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
            {employeesList?.map((i, index) => {
              return (
                <div
                  key={i.value}
                  className="dropdown-item"
                  onClick={() => handleSelect(i)}
                >
                  <img
                    src={dummyUser}
                    alt="item2image"
                    width="40px"
                    height="40px"
                    className="dropdown-item-image rounded-circle"
                  />
                  <div>
                    <h5
                      onClick={() =>
                        navigate(`/admin/employee/${i?.employee_id}`)
                      }
                    >
                      {i.employee_id}
                    </h5>

                    {/* <h5>{i.first_name}</h5> */}
                  </div>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
export default Selectinputimg;
