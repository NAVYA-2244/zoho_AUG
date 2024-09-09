import React, { useEffect, useState } from "react";
// import "./Header.scss";
import { settingTokens } from "../../../HttpServices/HttpService";
import { RiMenuFold3Line } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useStateContext } from "../../Contexts/StateContext";
import { RiMenuFold4Line } from "react-icons/ri";
import Themes from "../Themes/Themes";
import { useThemeContext } from "../../Contexts/ThemesContext";
import dummyUser from "../../../assets/Header/dummy-user.jpg";
import { CiSearch } from "react-icons/ci";
import { Navigate, useNavigate } from "react-router";
import { TbLogout2, TbRotateRectangle } from "react-icons/tb";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { Link, useFetcher } from "react-router-dom";
import { CgLogOut, CgProfile } from "react-icons/cg";
import {
  backEndCall,
  backEndCallObjNothing,
  IsAdmin,
} from "../../../services/mainService";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { format, parse } from "date-fns";
import { formatTime } from "../../../Utils/Helpers";
import { resetServerContext } from "react-beautiful-dnd";

const Headers = () => {
  const {
    isOpen,
    setIsOpen,
    employeeDetails,
    currentPageName,
    setOrgDetails,
    setOrgLogo,
    setLocations,
    orgDetails,
    locations,
    orgLogo,
    checkInTime,
    setCheckInTime,
    checkOutTime,
    setCheckOutTime,
    checkin,
    setCheckIn,
    todayAttendance,
    setTodayAttendance,
    setrecentHire,
    setBirthdays,
    stats,
    setStats,
    recentemployeeid,  
    Setrecentemployeeid,
    reportingmangers,
    setreportingmangers,
    setProfilePhoto, profilePhoto 
  } = useStateContext();
  const { checkingDataThere } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const [pageTerm, setPageTerm] = useState("");
  const [newss, setNews] = useState(false);
  
  // const [recentemployeeid,Setrecentemployeeid] = useState([]);
  const navigate = useNavigate();

  const searchMapping = {
    dashboard: "/dashboard",
    admindashboard: "/admin/dashboard",
    attendance: "admin/today_employees_attendance",
    profile: "/admin/profile",
    profileupdate: "/profile_update",
    applyleave: "/applyleave",
    attendanceCalendar: "/attendance/list-view",
    addemployee: "/admin/add_employee",
    employeelist: "/admin/employee_list",
    updateemployee: "/admin/update_employee/:employeId",
    roles: "/admin/admin-controls/roles",
    employeedata: "/admin/employee/:id",
    leaveapplications: "/admin/employee_leave-applications",
    tabularview: "/employee/attandance_table",
    calendarview: "attendance/list-view",
    controls: "/admin/admin-controls/roles",
    management: "/admin/management/addNewProject",
    projects: "/admin/projects",
    roles: "/admin/admin-controls/roles",
    location: "/location",
    companylogo: "/admin/company",
    floders: "/admin/folders",
    chat: "/admin/chat",
  };

  const goToThatPage = (e) => {
    if (pageTerm.length > 0 && e.key === "Enter") {
      let newPageTerm = pageTerm;
      if (newPageTerm.includes("")) {
        newPageTerm = newPageTerm.split(" ").join("");
        navigate(searchMapping[newPageTerm.toLocaleLowerCase()]);
      } else {
        navigate(searchMapping[newPageTerm.toLocaleLowerCase()]);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("zohoEmployeeToken");
    window.location = "/login";
    // window.localStorage.getItem("zohoEmployeeToken")
    //   ? (window.location = "/dashboard")
    //   : (window.location = "/login");
  };

  const fetchData = async () => {
    try {
      let res;
      if (
        employeeDetails.admin_type === "1" ||
        employeeDetails.admin_type === "2"
      ) {
        res = await backEndCallObjNothing("/org/universal");
      } else {
        res = await backEndCallObjNothing("/emp_get/universal");
      }
      console.log(res,"recent employe id")
      setStats(res?.stats);

      Setrecentemployeeid(res.employee_id);

      setOrgDetails(res?.organisation_details);
      setreportingmangers(res?.reporting_managers)
      setOrgLogo(res?.organisation_details.images?.logo);
      console.log(res?.organisation_details.images?.logo,"logooooooooooooooo")
      // setLocations(res.organisation_details?.locations);
      // setTodayAttendance(res?.organisation_details?.today_attendance);

      setOrgDetails(res?.organisation_details);
      setOrgLogo(res?.organisation_details?.images?.logo);
      setLocations(res.dashborad?.organisation_details?.locations);
      // setTodayAttendance(res.dashborad.today_attendance);
      setrecentHire(res?.recent_hires);

      setBirthdays(res?.birthdays);
    } catch (error) {
      console.log(error, "eroor");
    }
  };
  
  useEffect(() => {
    // IsAdmin()
    fetchData();
  }, []);
  console.log(recentemployeeid?.employee_id,"recentemployeeid")
  // if (locations.length === 0) {
  //   return <Navigate to="/location" />;
  // } else if (!Object.keys(orgLogo).length) {
  //   return <Navigate to="/admin/company" />;
  // }

  // useEffect(() => {
  // checkingDataThere();
  // }, []);

  // if (!newss) {
  //   return <Navigate to="/location" />;
  // }

  return (
    <>
      <header
        className="header"
        style={{
          background: applicationColor.cardItem,
          color: applicationColor.readColor1,
          // border:`0.3px solid ${applicationColor.readColor2} `
        }}
      >
        <div
          className="button-closesidebar
        "
        >
          <h4
            className="close d-block d-lg-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiOutlineMenuAlt2 /> : <HiOutlineMenuAlt2 />}
          </h4>

          {/* <div className="current-page">
            <h1
              className="current-page-name"

              // style={{color:applicationColor.readColor2}}
            >
              {currentPageName}
            </h1>
          </div> */}

          <div
            className="take-to-page"
            style={{
              background: applicationColor.cardBg2,
            }}
          >
            <label
              htmlFor="page_search"
              onClick={goToThatPage}
              style={{
                color: applicationColor.readColor1,
              }}
            >
              <CiSearch />
            </label>
            <input
              type="text"
              id="page_search"
              placeholder="Search..."
              maxLength={30}
              name="pageTerm"
              value={pageTerm}
              onChange={(e) => setPageTerm(e.target.value)}
              style={{
                color: applicationColor.readColor1,
              }}
              onKeyUpCapture={goToThatPage}
            />
          </div>
        </div>

        <div className="user-details">
          <Themes />

          {/* <div className="user-image">
            <img src={dummyUser} alt="userimage" />
          </div> */}
          <div className="details">
            <span className="email">{employeeDetails?.email || ""}</span>
            <span className="id">{employeeDetails?.employeeId || ""}</span>

           <span style={{ textTransform: 'capitalize' }}>
  {employeeDetails?.role_name}
</span>

            {console.log(employeeDetails.role_name, "nameee")}
          </div>

          <div className="dropdown">
            <Link
              className="user-image dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            
              {/* <img src={dummyUser} alt="userimage" />

              <img src={profilePhoto} alt="userimage" />
               */}
               <img 
  src={profilePhoto ? profilePhoto : dummyUser} 
  alt="userimage" 
/>

            </Link>

            <ul className="dropdown-menu user-dropdown">
              {employeeDetails.collection === "USER" ? (
                ""
              ) : (
                <Link to={"/profile"} className="dropdown-item">
                  <CgProfile />
                  Profile
                </Link>
              )}

              <Link className="dropdown-item" onClick={handleLogout}>
                <TbLogout2 />
                Logout
              </Link>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Headers;
