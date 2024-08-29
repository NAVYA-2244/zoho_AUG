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
  const [selectedEmployeeDataleave, setEmployeedataleave] = useState(null);
  // const [Employeedata] = useState([]);
  const {
    setLoading,
    loading,
    employeeDetails,
    // setEmployeedata,
    setEmployeeLeaveApplications,
    employeeLeaveApplications,
  } = useStateContext();

  console.log(selectedEmployeeDataleave, "setEmployeedata");

  useEffect(() => {
    const gettingEmployeeById = async () => {
      try {
        const response = await backEndCallObjNothing("/emp_get/get_profile", {
          employee_id: employeeDetails?.employee_id || "",
        });
        console.log("response", response);
        // setEmployeedataleave(response.profile.leaves);
        setEmployeedataleave(response.profile.leaves);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    gettingEmployeeById();
  }, [selectedEmployeeDataleave]);

  const { applicationColor } = useThemeContext();

  return (
    <div>
      <section className="leave-types">
        {selectedEmployeeDataleave && selectedEmployeeDataleave.length > 0 ? (
          selectedEmployeeDataleave.map((item) => (
            <section
              className="type"
              key={item.leave_name}
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
              }}
            >
              {console.log(item, "item")}
              {/* {console.log("items", leave_name)} */}
              <div className="leave-img d-flex flex-column">
                <i className={`${item.leave_name}`} alt={item.leave_name}>
                  {item.leave_name === "sick" ? (
                    <FaUserDoctor />
                  ) : (

                    <FcLeave />
                  )}
                </i>
                <h5 className={`leave-type-${item.leave_name}`}>{item.leave_name}</h5>
              </div>
              <div className="leave-availability">
                <div className="available">

                  <span className="leaves-available">
                    Available : &nbsp;{" "}
                    <b>
                      {item.total_leaves == "" ? "0" : item.total_leaves}
                    </b>
                  </span>
                  <br />
                  <span className="leave-used">
                    Used : &nbsp;
                    <b>{item.used_leaves == "" ? "0" : item.used_leaves}</b>
                    {console.log(item.used_leaves)}
                  </span>
                </div>
              </div>
              <CircularLoader
                max={item?.total_leaves}
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
