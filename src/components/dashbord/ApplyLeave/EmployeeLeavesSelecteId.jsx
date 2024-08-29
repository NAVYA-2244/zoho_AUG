import React, { useState, useEffect } from "react";
import { FcLeave } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import CircularLoader from "../../SVGCircler/Circular";
import Loader from "../../Loader/Loader";
import EmployeeLeaveApplicationsTable from "./EmployeeLeavesApplicationsTable/EmployeeLeaveApplicationTable";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useNavigate } from "react-router";
import { backEndCallObjNothing } from "../../../services/mainService";
import Piachart from "./Piachart";

function EmployeeLeavesSelecteId() {
  const navigate = useNavigate();
  const {
    setLoading,
    loading,
    employeeDetails,
    setEmployeedata,
    setEmployeeLeaveApplications,
    employeeLeaveApplications,
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [allEmployeeIds, setAllEmployeeIds] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [status, setStatus] = useState("");

  // useEffect(() => {
  //   const gettingEmployeeById = async () => {
  //     try {
  //       const response = await backEndCallObjNothing("/emp_get/get_profile", {
  //         employee_id: employeeDetails?.employee_id || "",
  //       });
  //       console.log("profile", response);
  //       setEmployeedata(response.profile.leaves);
  //       setSelectedEmployeeData(response.profile.leaves);
  //     } catch (error) {
  //       console.error("Error fetching employee data:", error);
  //     }
  //   };
  //   gettingEmployeeById();
  // }, [employeeDetails]);
// console.log(selectedEmployeeData,"selectedEmployeeData")
  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const payload = {
          skip: 0,
          // limit: 50,
        };
        if (status) {
          payload.status = status;
        }
        const response = await backEndCallObjNothing(
          "/emp_get/leave_applications",
          payload
        );  

        console.log(response,"leaves")
        setLeaveApplications(response);
        setEmployeeLeaveApplications(response.data);
        console.log("response", response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
        setLoading(false);
      }
    };
    fetchLeaveApplications();
  }, [status]);

  const ApplyLeave = () => {
    navigate("/applyleavefrom");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  console.log("selectedEmployeeData", selectedEmployeeData);

  return (
    <section className="leave-report">
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            value={status}
            onChange={handleStatusChange}
            className="form-control"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="d-flex align-items-end justify-content-end">
          {/* {selectedEmployeeData && ( */}
            <button onClick={ApplyLeave} className="btn btn-primary">
              Apply Leave
            </button>
          {/* )} */}
        </div>
      </div>

      {/* <section className="leave-types">
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
              <div className="leave-img d-flex flex-column">
                <i className={`${item.type}`} alt={item.type}>
                  {item.leave_name === "casual leave" ? <FcLeave /> : <FaUserDoctor />}
                </i>
                <h5 className={`leave-type-${item.type}`}>{item.type}</h5>
              </div>
              <div className="leave-availability">
                <div className="available">
                  <span className="leaves-available">
                    Available : &nbsp;
                    <b>{item.default_leaves === "" ? "0" : item.default_leaves}</b>
                  </span>
                  <br />
                  <span className="leave-used">
                    Used : &nbsp;
                    <b>{item.used_leaves === "" ? "0" : item.used_leaves}</b>
                  </span>
                </div>
              </div>
              <CircularLoader max={item?.default_leaves} min={item.used_leaves} />
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
      </section> */}
      <Piachart />

      <br />

      {!loading ? (
        <EmployeeLeaveApplicationsTable leaveApplications={leaveApplications} />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default EmployeeLeavesSelecteId;
