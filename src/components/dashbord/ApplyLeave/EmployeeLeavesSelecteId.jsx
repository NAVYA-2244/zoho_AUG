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
    employeedataleaves,
    setEmployeedataleave
    
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [allEmployeeIds, setAllEmployeeIds] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");

  console.log(leaveApplications,"employeeDetails")
  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const payload = {
          skip: 0,
          leave_status: status || "", // Optional filter for leave_status
          year: year || "",           // Optional filter for year
        };
        console.log("Payload:", payload); // Log the payload to ensure the year is being sent correctly
        const response = await backEndCallObjNothing(
          "/emp_get/leave_applications",
          payload
        );
        setLeaveApplications(response);
        setEmployeeLeaveApplications(response.data);
        console.log("Response", response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
        setLoading(false);
      }
    };
    fetchLeaveApplications();
  }, [status, year]); // Include `year` as a dependency
  
 
  // useEffect(() => {
  //   const fetchLeaveApplications = async () => {
  //     try {
  //       const payload = {
  //         skip: 0,
  //         leave_status: status || "", // Optional filter for leave_status
  //         year: year || "",           // Optional filter for year
  //       };
  //       const response = await backEndCallObjNothing(
  //         "/emp_get/leave_applications",
  //         payload
  //       );  

  //       console.log(response,"leaves")
  //       setLeaveApplications(response);
  //       setEmployeeLeaveApplications(response.data);
  //       console.log("response", response);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching leave applications:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchLeaveApplications();
  // }, [status]);

  const ApplyLeave = () => {
    navigate("/applyleavefrom");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  // const handleYearChange = (e) => {
  //   setYear(e.target.value);
  // };
  const handleYearChange = (e) => {
    const selectedYear = new Date(e.target.value).getFullYear().toString(); // Convert to string
    setYear(selectedYear);
  };
  console.log("selectedEmployeeData", selectedEmployeeData);
  const resetFilters = () => {
    setStatus("");
    setYear("");
    
  };
  return (
    <section className="leave-report">
      <div className="row mb-3">
       
         <div className="col-md-4">
          <select
            value={status}
            onChange={handleStatusChange}
            className="form-control"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="col-md-4">
       
          <input
            type="date"
            onChange={handleYearChange}
            className="form-control"
            placeholder="Select Year"
          />
       
        </div>
        {/* <div className="d-flex align-items-end justify-content-end">
         
            <button onClick={ApplyLeave} className="btn btn-primary">
              Apply Leave
            </button>
         
        </div>
      </div> */}

<div className="col-md-4 d-flex align-items-end justify-content-end">
<button onClick={resetFilters} className="btn btn-secondary me-2">
            Reset
          </button>
          {employeedataleaves&&
          <button onClick={ApplyLeave} className="btn btn-primary">
            Apply Leave
          </button> 
          }
          
        </div>
      </div>
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
