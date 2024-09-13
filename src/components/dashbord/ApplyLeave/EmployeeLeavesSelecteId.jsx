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
    setEmployeedataleave,
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [allEmployeeIds, setAllEmployeeIds] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");

  const fetchLeaveApplications = async () => {
    try {
      setLoading(true);
      const payload = {
        skip: 0,
        leave_status: status || "", // Optional filter for leave_status
        year: year || "", // Optional filter for year
      };
      // Log the payload to ensure the year is being sent correctly
      const response = await backEndCallObjNothing(
        "/emp_get/leave_applications",
        payload
      );
      setLeaveApplications(response);
      setEmployeeLeaveApplications(response.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLeaveApplications();
  }, [status, year]); // Include `year` as a dependency

  const ApplyLeave = () => {
    navigate("/applyleavefrom");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleYearChange = (e) => {
    const selectedYear = new Date(e.target.value).getFullYear().toString(); // Convert to string
    setYear(selectedYear);
  };

  const resetFilters = () => {
    setStatus("");
    setYear("");
  };
  return (
    <section className="leave-report">
      <div className="row mb-3">
        <div className="col-md-4">
          <label>status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="form-control form-select"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Year</label>
          <input
            type="date"
            // value={"02-12-2024"}
            onChange={handleYearChange}
            className="form-control"
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
          {employeedataleaves && (
            <button onClick={ApplyLeave} className="btn btn-primary">
              Apply Leave
            </button>
          )}
        </div>
      </div>
      <Piachart />

      <br />

      {!loading ? (
        <EmployeeLeaveApplicationsTable
          leaveApplications={leaveApplications}
          loading={loading}
        />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default EmployeeLeavesSelecteId;
