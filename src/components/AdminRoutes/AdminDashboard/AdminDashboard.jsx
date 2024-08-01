import React, { useState } from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useNavigate } from "react-router-dom";
 const GetAllEmployeeData = () => {
  const [adminEmployeeData] = useState([]);
  const { applicationColor } = useThemeContext();
  const navigate = useNavigate();

  return (
    <>
      {adminEmployeeData.map((item, index) => {
        const { departmentName } = item.workInfo.department;
        const { designationName } = item.workInfo.designation;

        return (
          <div className="employee-data" key={index}>
            <div className="employee-profile">
              <img
                src="https://storage.prompt-hunt.workers.dev/clgrget5r004kl50858dxk39x_1"
                width="50px"
                height="50px"
                alt="emp-image"
              />
              <div className="employee-info">
                <p
                  className="emp-name"
                  style={{
                    color: applicationColor.readColor1,
                  }}
                >
                  {item.firstName}
                </p>
                <p className="emp-role">
                  <span className="emp-designation">{departmentName} </span>-{" "}
                  {designationName}
                </p>
              </div>
            </div>
            <div className="emp-action">
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

                <ul
                  className="dropdown-menu"
                  style={{
                    background: applicationColor.cardBg2,
                    color: applicationColor.readColor1,
                  }}
                >
                  {["Profile"].map((item) => {
                    return (
                      <li
                        key={item}
                        onClick={() =>
                          navigate(`/admin/employee/${item.employeeId}`)
                        }
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};


export default GetAllEmployeeData; 