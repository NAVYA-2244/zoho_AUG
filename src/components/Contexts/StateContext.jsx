import { createContext, useContext, useEffect, useRef, useState } from "react";
import { settingTokens } from "../../HttpServices/HttpService";
import { jwtDecode } from "jwt-decode";
import { makeNetworkCall } from "../../HttpServices/HttpService";
const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const refs = useRef({});
  const [errors, setErrors] = useState({}); // For error Messages
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [employeeDetails, setEmployeeDetails] = useState(
    localStorage.getItem("zohoEmployeeToken")
      ? jwtDecode(settingTokens.gettingEmployeeToken())
      : {}
  );
  // console.log("employeedetails", employeeDetails);

  const [isAdmin, setIsAdmin] = useState(
    employeeDetails.collection === "USER" ? false : true
  );

  const [profilePhoto, setProfilePhoto] = useState("");

  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [checkin, setCheckIn] = useState(true);
  const [attendanceData, setAttandanceData] = useState([]);
  const [adminData2, setAdminData2] = useState({});
  const [adminData1, setAdminData1] = useState({});
  const [employeesList, setEmployeesList] = useState([]);
  // const [orgData1, setOrgData1] = useState({});
  const [modalData, setModalData] = useState([]); //for modal .js
  const [showModal, setshowModal] = useState(false); //This state is only for modal.js not for modal.jsx or any thing else
  const [locations, setLocations] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [managers, setManagers] = useState([]);
  const [employeeLeaveApplications, setEmployeeLeaveApplications] = useState(
    []
  );
  const [adminGettingLeaveApplications, setAdminGettingLeaveApplications] =
    useState([]);

  const [loadingTerm, setLoadingTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [currentPageName, setCurrentPageName] = useState("Dashboard");
  const limit = 10;
  const [projects, setProjects] = useState([]);
  const [singleEmployeeProfile, setSingleEmployeeProfile] = useState({});

  const [todayAttendance, setTodayAttendance] = useState([]);
  const [todayAttendanceAdmin,setTodayAttendanceAdmin] = useState([]);

  // State to manage the latitude and longitude
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [orgLogo, setOrgLogo] = useState({});
  const [orgDetails, setOrgDetails] = useState({});
  const [recentHire, setrecentHire] = useState([]);
  const [Birthdays, setBirthdays] = useState({});

  // All States for modals
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [attendanceModalData, setAttendanceModalData] = useState({
    heading: "Edit Attendance",
    types: ["time", "text", "time", "text"],
    fields: [],
    onClose: () => {},
    editingItem: {},
    placeholders: [],
    handleSubmit: () => {},
    schema: {},
    edit: false,
  });
  const [fileModal, setFileModal] = useState(false);
  const [fileModalData, setFileModalData] = useState({
    heading: "",
    types: [],
    fields: [],
    onClose: () => {},
    editingItem: {},
    placeholders: [],
    handleSubmit: () => {},
    schema: {},
    fileId: "",
  });
  const [checkInModal, setCheckInModal] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState({});
  const [employeedata, setEmployeedata] = useState(null);

  return (
    <StateContext.Provider
      value={{
        refs,
        errors,
        setErrors,
        loading,
        setLoading,
        employeeDetails,
        setEmployeeDetails,
        employeeData,
        setEmployeeData,
        recentHire,
        setrecentHire,
        checkInTime,
        setCheckInTime,
        checkOutTime,
        setCheckOutTime,
        checkin,
        setCheckIn,
        attendanceData,
        setAttandanceData,
        isAdmin,
        setIsAdmin,
        modalData,
        showModal,
        setModalData,
        setshowModal,
        locations,
        setLocations,
        leaveTypes,
        setLeaveTypes,
        employeeLeaveApplications,
        setEmployeeLeaveApplications,
        loadingTerm,
        setLoadingTerm,
        isOpen,
        setIsOpen,
        openSubmenu,
        setOpenSubmenu,
        currentPageName,
        setCurrentPageName,
        singleEmployeeProfile,
        setSingleEmployeeProfile,
        adminGettingLeaveApplications,
        setAdminGettingLeaveApplications,
        projects,
        setProjects,
        limit,
        attendanceModal,
        setAttendanceModal,
        attendanceModalData,
        setAttendanceModalData,
        todayAttendance,
        setTodayAttendance,
        Birthdays,
        setBirthdays,
        location,
        setLocation,
        checkInModal,
        setCheckInModal,
        eventData,
        setEventData,
        orgLogo,
        setOrgLogo,
        imageModal,
        setImageModal,
        imageData,
        setImageData,
        setAdminData1,
        setAdminData2,
        adminData2,
        managers,
        setManagers,
        employeesList,
        setEmployeesList,
        fileModal,
        setFileModal,
        fileModalData,
        setFileModalData,
        files,
        setFiles,
        editingFile,
        setEditingFile,
        orgDetails,
        setOrgDetails,
        profilePhoto,
        setProfilePhoto,
        employeedata,
        setEmployeedata,
        todayAttendanceAdmin,
        setTodayAttendanceAdmin
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};
