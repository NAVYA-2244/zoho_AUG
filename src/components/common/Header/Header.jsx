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
  } = useStateContext();
  const { checkingDataThere } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const [pageTerm, setPageTerm] = useState("");
  const [newss, setNews] = useState(false);

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

    window.localStorage.getItem("zohoEmployeeToken")
      ? (window.location = "/dashboard")
      : (window.location = "/login");
  };

  // const checkingDataThere = async (data) => {
  //   debugger
  //   console.log(data,"data");

  //   if (!data?.images?.logo) {
  //     setTimeout(() => {
  //       navigate("/admin/company");
  //     }, 0);
  //   }

  // };

  // const fetchData = async () => {
  //   try {

  //     { employeeDetails?.employee_id ? const res = await backEndCallObjNothing("/emp_get/universal"); : const res = await backEndCallObjNothing("/user_get/universal"); }

  //     // console.log(res, "universal");

  //     setOrgDetails(res?.dashborad?.organisation_details);
  //     setOrgLogo(res?.dashborad?.organisation_details.images?.logo);
  //     setLocations(res.dashborad.organisation_details?.locations);
  //     setTodayAttendance(res.dashborad.today_attendance)

  //     let todayAttendance = res.dashborad.today_attendance;

  //     console.log({ todayAttendance: todayAttendance }, "navyyuuuuuuuuuuuuuu");
  //     let checkInTime = formatTime(todayAttendance.checkin[0].in_time) || "";
  //     console.log(checkInTime, "checkinTime");
  //     let checkOutTime = "";
  //     if (todayAttendance?.checkout && todayAttendance.checkout.length > 0) {
  //       checkOutTime = formatTime(
  //         todayAttendance.checkout[todayAttendance.checkout.length - 1].out_time
  //       );
  //     }

  //     setCheckOutTime(checkOutTime);
  //     setCheckInTime(checkInTime);

  //     setCheckIn(
  //       todayAttendance?.checkin?.length > todayAttendance?.checkout?.length
  //         ? false
  //         : true
  //     );
  //   } catch (error) {
  //     console.log(error, "eroor");
  //   }
  // };
  const fetchData = async () => {
    try {
      let res;
      // if (employeeDetails?.employee_id) {
      res = await backEndCallObjNothing("/emp_get/universal");
      console.log("res", res);
      //   console.log("res", res?.dashborad?.recent_hires);
      // } else {
      //   res = await backEndCallObjNothing("/user_get/universal");
      //   console.log(res, "response");
      // }
      // setOrgDetails(res?.organisation_details);
      // setOrgLogo(res?.organisation_details.images?.logo);
      // setLocations(res.organisation_details?.locations);
      // setTodayAttendance(res?.organisation_details?.today_attendance);

      console.log(res, "eeee");
      setOrgDetails(res?.dashborad?.organisation_details);
      setOrgLogo(res?.dashborad?.organisation_details.images?.logo);
      setLocations(res.dashborad?.organisation_details?.locations);
      setTodayAttendance(res.dashborad.today_attendance);
      setrecentHire(res?.dashborad?.recent_hires);
      setBirthdays(res?.dashborad.birthdays);
      {
        console.log(res.dashborad.birthdays, "iuytfgh");
      }
      console.log("res?.dashborad?.recent_hires", res?.dashborad?.recent_hires);
      {
        console.log(res.dashboard.birthdays, "poiuy");
      }

      let checkInTime = "";
      if (
        todayAttendance.checkin &&
        todayAttendance.checkin[0] &&
        todayAttendance.checkin[0].in_time
      ) {
        checkInTime = formatTime(todayAttendance.checkin[0].in_time);
      }

      let checkOutTime = "";
      if (todayAttendance?.checkout && todayAttendance.checkout.length > 0) {
        checkOutTime = formatTime(
          todayAttendance.checkout[todayAttendance.checkout.length - 1].out_time
        );
      }

      setCheckOutTime(checkOutTime);
      setCheckInTime(checkInTime);

      setCheckIn(
        todayAttendance?.checkin?.length > todayAttendance?.checkout?.length
          ? false
          : true
      );
    } catch (error) {
      console.log(error, "eroor");
    }
  };

  useEffect(() => {
    // IsAdmin()
    fetchData();
  }, []);

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
          </div>

          <div className="dropdown">
            <Link
              className="user-image dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={dummyUser} alt="userimage" />
            </Link>

            <ul className="dropdown-menu user-dropdown">
              {employeeDetails.collection === "USER" ? (
                ""
              ) : (
                <Link to={"/admin/profile"} className="dropdown-item">
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
