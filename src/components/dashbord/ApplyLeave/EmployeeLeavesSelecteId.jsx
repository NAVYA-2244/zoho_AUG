// import React, { useState, useEffect } from 'react';
// import { FcLeave } from 'react-icons/fc';
// import { FaUserDoctor } from 'react-icons/fa6';
// import CircularLoader from '../../SVGCircler/Circular';
// import Loader from '../../Loader/Loader';
// import EmployeeLeaveApplicationsTable from './EmployeeLeavesApplicationsTable/EmployeeLeaveApplicationTable';
// import { useStateContext } from '../../Contexts/StateContext';
// import { useFunctionContext } from '../../Contexts/FunctionContext';
// import { useThemeContext } from '../../Contexts/ThemesContext';
// import { isEmployeeRouter } from '../../../Utils/Routers';
// // import ApplyLeave from './ApplyLeave';
// import ApplyLeave from './ApplyLeave';
// import ApplyLeaveForm from './ApplyleaveForm';
// // import ApplyLeave from './ApplyLeave';
// // import ApplyLeave from './ApplyLeave';
// // import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router';
// import { backEndCallObjNothing } from '../../../services/mainService';
// function EmployeeLeavesSelecteId() {
//     const Navigate = useNavigate()
//     const {
//         loading,
//         setLoading,
//         employeeData,
//         setEmployeeLeaveApplications,
//         setLoadingTerm,
//         loadingTerm,
//         leaveTypes,
//         employeeDetails,
//         adminData2,
//         employeedata, setEmployeedata
//     } = useStateContext();
//     // const { checkErrors, employeeDetails } = useFunctionContext();
//     const { applicationColor, } = useThemeContext();

//     const [selectedOption, setSelectedOption] = useState(null);
//     const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
//     const [allEmployeeIds, setAllEmployeeIds] = useState([]);

//     useEffect(() => {
//         const gettingEmployeeById = async () => {
//             try {
//                 const response = await backEndCallObjNothing("/emp_get/get_profile", {
//                     employee_id: employeeDetails?.employee_id || "",
//                 });
//                 setEmployeedata(response.profile.leaves);
//                 setSelectedEmployeeData(response.profile.leaves);

//             } catch (error) {
//                 console.error("Error fetching employee data:", error);
//             }
//         };
//         gettingEmployeeById()
//     }, []);

//     console.log(employeedata, "selectedEmployeeData")

//     const ApplyLeave = () => {
//         Navigate('/applyleavefrom')
//     }
//     return (
//         <section className="leave-report">

//             <div className='row mb-3'>
//                 <div className='col-md-4'>

//                 </div>
//                 <div className=' d-flex align-items-end justify-content-end'>
//                     <button
//                         onClick={() => ApplyLeave()}
//                         className="btn btn-primary"
//                     >
//                         Apply Leave
//                     </button>
//                 </div>
//             </div>

//             <section className="leave-types">
//                 {selectedEmployeeData && selectedEmployeeData.length > 0 ? (
//                     selectedEmployeeData.map((item) => (
//                         <section
//                             className="type"
//                             key={item.type}
//                             style={{
//                                 background: applicationColor.cardBg1,
//                                 color: applicationColor.readColor1,
//                             }}
//                         >
//                             <div className="leave-img d-flex flex-column">
//                                 <i className={`${item.type}`} alt={item.type}>
//                                     {item.type === "Casual" ? <FcLeave /> : <FaUserDoctor />}
//                                 </i>
//                                 <h5 className={`leave-type-${item.type}`}>{item.type}</h5>
//                             </div>
//                             <div className="leave-availability">
//                                 <div className="available">
//                                     <span className="leaves-avialable">
//                                         Available : &nbsp; <b>{item.total}</b>
//                                     </span>
//                                     <br />
//                                     <span className="leave-used">
//                                         Used : &nbsp;<b>{item.used}</b>{" "}
//                                     </span>
//                                 </div>
//                             </div>
//                             <CircularLoader max={item?.total} min={item.used} />
//                         </section>
//                     ))
//                 ) : (
//                     <div className="row">
//                         <section>
//                             <div className="text-center">
//                                 <Loader />
//                             </div>
//                         </section>
//                     </div>
//                 )}
//             </section>
//             <br />

//             <EmployeeLeaveApplicationsTable />
//         </section>
//     )
// }
// export default EmployeeLeavesSelecteId;
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

function EmployeeLeavesSelecteId() {
  const Navigate = useNavigate();
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
  // const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const response = await backEndCallObjNothing("/emp_get/get_leaves", {
          skip: 0,
          limit: 10,
        });
        setLeaveApplications(response.data);
        setEmployeeLeaveApplications(response.data);
        console.log("response", response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
        setLoading(false);
      }
    };
    fetchLeaveApplications();
  }, []);

  const ApplyLeave = () => {
    Navigate("/applyleavefrom");
  };
  console.log("selectedEmployeeData", selectedEmployeeData);

  return (
    <section className="leave-report">
      <div className="row mb-3">
        <div className="col-md-4"></div>
        <div className="d-flex align-items-end justify-content-end">
{selectedEmployeeData && <button  disabled="" onClick={ApplyLeave} className="btn btn-primary">
            Apply Leave
          </button>}
          
        </div>
      </div>

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
      </section>
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
