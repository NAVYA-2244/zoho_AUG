import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { FcLeave } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import CircularLoader from "../../SVGCircler/Circular";
import Loader from "../../Loader/Loader";
import { backEndCallObjNothing } from "../../../services/mainService";
import { useStateContext } from "../../Contexts/StateContext";
import { Navigate } from "react-router-dom";

function Piachart() {
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [Employeedata] = useState([]);
  const {
    setLoading,
    loading,
    employeeDetails,
    setEmployeedata,
    setEmployeeLeaveApplications,
    employeeLeaveApplications,
  } = useStateContext();

  console.log(setEmployeedata, "setEmployeedata");

  useEffect(() => {
    const gettingEmployeeById = async () => {
      try {
        const response = await backEndCallObjNothing("/emp_get/get_profile", {
          employee_id: employeeDetails?.employee_id || "",
        });
        console.log("response", response);
        setEmployeedata(response.profile.leaves);
        setSelectedEmployeeData(response.profile.leaves);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    gettingEmployeeById();
  }, [employeeDetails]);

  const { applicationColor } = useThemeContext();

  return (
    <div>
      <section className="leave-types">
        {selectedEmployeeData && selectedEmployeeData.length > 0 ? (
          selectedEmployeeData.map((item) => (
            <section
              className="type"
              key={item.leave_name}
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
            >
              {/* {console.log("items", leave_name)} */}
              <div className="leave-img d-flex flex-column">
                <i className={`${item.type}`} alt={item.type}>
                  {item.leave_name === "casual leave" ? (
                    <FcLeave />
                  ) : (
                    <FaUserDoctor />
                  )}
                </i>
                <h5 className={`leave-type-${item.type}`}>{item.type}</h5>
              </div>
              <div className="leave-availability">
                <div className="available">
                  <span className="leaves-available">
                    Available : &nbsp;{" "}
                    <b>
                      {item.default_leaves == "" ? "0" : item.default_leaves}
                    </b>
                  </span>
                  <br />
                  <span className="leave-used">
                    Used : &nbsp;
                    <b>{item.used_leaves == "" ? "0" : item.used_leaves}</b>
                  </span>
                </div>
              </div>
              <CircularLoader
                max={item?.default_leaves}
                min={item.used_leaves}
              />
            </section>
          ))
        ) : (
          <div className="row">
            <section>
              <div className="text-center">
                <Loader />
              </div>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}

export default Piachart;
