import React, { useEffect, useState } from "react";
// import "./AdminSingleEmployeeData.scss";
import { useStateContext } from "../../Contexts/StateContext";
import { useNavigate, useParams } from "react-router";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import { convertTo12HourFormat, flatternObject } from "../../../Utils/Helpers";
import Calandar from "../../common/Calender/Calender";
import Loader from "../../Loader/Loader";
import SingleEmployeeAttendanceCalendar from "./SingleEmployeeAttendanceCalendar";
import SingleEmployeeLeaves_report from "./SingleEmployeeLeaves_report";
import SingleEmployeeProfile from "./SingleEmployeeProfile/SingleEmployeeProfile";
import ReusableProfileForm from "../../common/ReusableProfileForm/ReusableProfileForm";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import EmployeeDataSchema, {
  ExpirementSchema,
} from "../../AllSchema/EmployeeSchema";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { FcEditImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Select_inputs } from "../../common/ALLINPUTS/AllInputs";
import { backEndCallObjNothing } from "../../../services/mainService";

const AdminSingleEmployeeData = ({ employeeProfileData, employeesList }) => {
  const {
    setLoading,
    setLoadingTerm,
    setOrgData2,
    isAdmin,
    loadingTerm,
    loading,
  } = useStateContext();
  const { checkErrors } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const [singleEmployeData, setSingleEmployeeData] = useState({});
  const [updateEmployeedata, setUpdateEmployeeData] = useState({});
  const [singleEmployeeEvents, setSingleEmployeeAttendanceEvents] = useState(
    []
  );
  const [employeeProfile, setEmployeeProfile] = useState({});
  console.log(employeeProfile, "ewwe");
  const [status, setStatus] = useState("");
  const [newClass, setNewClass] = useState("");
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [viewsData, setViewsData] = useState({}); // to get views data

  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState("profile");

  const getBadgeClass = (status) => {
    if (status === "active" || status === "Active") {
      return setNewClass("text-success");
    }
    if (status === "resigned" || status === "Resigned") {
      return setNewClass("text-primary");
    }
    if (status === "terminated" || status === "Terminated") {
      return setNewClass("text-danger");
    }
    if (status === "deseased" || status === "Deseased") {
      return setNewClass("text-danger");
    }
    return "";
  };

  //function is responsibel to get the entire data of the specific employee based on his employeeId
  const fetchingSingleEmployeeData = async () => {
    try {
      setLoading(true);

      const { employee } = await backEndCallObjNothing(
        `/admin_get/get_emp_by_id`,
        { employee_id: id }
      );

      setSingleEmployeeData(employee);

      const {
        basic_info,
        work_info,
        dependent_details,
        identity_info,
        personal_details,
        contact_details,
        work_experience,
        educational_details,
        employee_id,
      } = employee;

      let profileObject = {
        basic_info,
        work_info,
        dependent_details,
        identity_info,
        personal_details,
        contact_details,
        work_experience,
        educational_details,
        employee_id,
      };

      setEmployeeProfile({ profile: profileObject });
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //Recalls the FetchSingelEmployeeData when ever the id changes , and fetches the entire data of the employee
  useEffect(() => {
    fetchingSingleEmployeeData();
  }, [id]);

  //For Calneder view and specific employee Attendance
  // useEffect(() => {
  //   if (Object.keys(singleEmployeData).length > 0) {
  //     const formattedEvents = singleEmployeData?.employeeAttendance.map(
  //       (item) => {
  //         const statusColor =
  //           item.status === "Present"
  //             ? "green"
  //             : item.status === "Absent"
  //             ? "red"
  //             : "transparent";

  //         const checkInTime = item.checkIn.time === "0" ? 0 : item.checkIn.time;
  //         const checkOutTime =
  //           item.checkOut.time === "err" ? 0 : item.checkOut.time;
  //         return {
  //           title: item.status, // String for tooltip
  //           customDisplay: (
  //             <div className="event">
  //               <div
  //                 style={{
  //                   background:
  //                     item.status === "Absent"
  //                       ? "#F15A59"
  //                       : item.status === "Present"
  //                       ? "#03C988"
  //                       : "#FD9B63",
  //                   width: "100%",
  //                 }}
  //               >
  //                 {item.status}
  //               </div>
  //               {/* <div>
  //                 <i className="bi bi-box-arrow-in-right"></i> {checkInTime}
  //               </div>
  //               <div>
  //                 <i className="bi bi-box-arrow-in-left"></i> {checkOutTime}
  //               </div> */}
  //             </div>
  //           ),
  //           checkin: item.checkIn.time,
  //           checkout: item.checkOut.time,
  //           start: new Date(item.dateTime),
  //           end: new Date(item.dateTime),
  //           allDay: true,
  //           resource: { statusColor },
  //         };
  //       }
  //     );
  //     setSingleEmployeeAttendanceEvents(formattedEvents || []);
  //   }
  // }, [singleEmployeData]);

  //To Update the Employee Data
  const handleSubmit = async (formData) => {
    try {
      console.log({ formData });
      setLoading(true);
      setLoadingTerm("Edit Details");
      console.log(formData, "fromData");
      await checkErrors(ExpirementSchema, formData);

      const data = {
        profilePhoto: formData.profilePhoto,
        employeeId: formData.employeeId,
        banner: formData.banner,
        firstName: formData.firstName,
        lastName: formData.lastName,
        nickName: formData.nickName,
        email: formData.email,
        gender: formData.gender,
        dateOfExit: formData.dateOfExit,
        workInfo: {
          department: formData.department,
          designation: formData.designation,
          role: formData.role,
          location: formData.location,
          employmentType: formData.employmentType,
          sourceOfHire: formData.sourceOfHire,
          dateOfJoining: formData.dateOfJoining,
          shift: formData.shift,
          location: formData.location,
        },
        reportingManager: formData.reportingManager,
        personalDetails: {
          dob: formData.dob,
          maritalStatus: formData.maritalStatus,
          aboutMe: formData.aboutMe,
        },
        identityInfo: {
          uan: formData.uan,
          pan: formData.pan,
          aadhaar: formData.aadhaar,
          passport: formData.passport,
        },
        contactDetails: {
          phoneNumber_work: formData.phoneNumber_work,
          phoneNumber_personal: formData.phoneNumber_personal,
          email_personal: formData.email_personal,
          seatingLocation: formData.seatingLocation,
          permanantAddress: formData.permanantAddress,
          presentAddress: formData.presentAddress,
        },
        workExperience: formData?.workExperience,

        educationDetails: formData.educationDetails,
        dependentDetails: [
          {
            dependentName: formData.dependentName,
            dependentRelation: formData.dependentRelation,
            dependentDob: formData.dependentDob,
          },
        ],
      };
      data.employeeId = id;
      const response = await makeNetworkCall(data, "updateEmployee", "headers");
      await fetchingSingleEmployeeData();
      setCurrentTab("profile");
      toastOptions.success(response.detail || "Employee Updated successfully");
      setLoadingTerm("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      toastOptions.error(
        error?.error?.response?.data?.detail || error[0].message
      );
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };

  // profile tabs stored in array of objects and rendering dynamically in tab section views
  const tabs = [
    { name: "profile", label: "Profile" },
    { name: "attendance", label: "Attendance" },
    { name: "leaves", label: "Leaves" },
    { name: "edit", label: "Edit" },
  ];

  const handleChangeStatus = (event) => {
    // const { name, value } = event.target;
    const selectedStatus =
      event.target.options[event.target.selectedIndex].text;
    getBadgeClass(selectedStatus);
    setStatus(event.target.value);
    setIsStatusChanged(true);
  };

  //This function updates the employee Status like pending , active ,terminated etc
  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoadingTerm("updatingStatus");
      let data = {
        employeeId: id,
        status: status,
      };

      const { detail } = await makeNetworkCall(
        data,
        "updateEmployeeStatus",
        "headers"
      );
      toastOptions.success(detail || "employee Status Updated Successfully");

      setLoading(false);
      setLoadingTerm("");
    } catch (error) {
      setLoading(false);
      setLoadingTerm("");
      toastOptions.error(
        error?.error?.response?.data?.detail ||
          "Error Occured while Updating Status"
      );
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };
  return (
    <main className="single_employee_whole_data">
      {Object.keys(singleEmployeData).length > 0 ? (
        <>
          {/* single -employee header section */}
          <div
          // className="single-employee-header"
          // style={{
          //   background: applicationColor.cardBg1,
          //   color: applicationColor.readColor1,
          // }}
          >
            {/* <div className="user-header-section">
              <div className="header-bg-image">
                <img
                  src={
                    viewsData?.banner ||
                    "https://img.freepik.com/premium-vector/abstract-dark-blue-modern-futuristic-science-technology-hi-tech-digital-abstract-dark-blue-colorful-design-banner-background-vector-abstract-graphic-design-banner-pattern-background-web-template_181182-33425.jpg"
                  }
                  alt="header-bg-image"
                />
              </div>
              <div className="user-image-wrapper">
                <div className="user-img-container">
                  <img
                    src={
                      viewsData?.profilePhoto ||
                      "https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145"
                    }
                    alt="User-Image"
                    width="100"
                  />
                </div>

                <div className="user-basic-info">
                  <p>{viewsData?.employeeId}</p>
                  <p>{`${viewsData?.firstName} ${viewsData?.lastName}`}</p>
                  <p>{viewsData?.designationName}</p>
                  <p className="employeee-email">{viewsData?.email}</p>

                  <form onSubmit={handleStatusSubmit}>
                    <select
                      aria-label="Default select example"
                      onChange={handleChangeStatus}
                      className={`profile-status-select ${newClass}`}
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                      }}
                    >
                      {["Active", "Terminated", "Resigned", "Deseased"].map(
                        (item, index) => {
                          return (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          );
                        }
                      )}
                    </select>

                    {isStatusChanged ? (
                      <button
                        className="status-button"
                        disabled={loadingTerm === "updatingStatus"}
                        style={{
                          background: applicationColor.buttonColor,
                          color: "white",
                        }}
                      >
                        {" "}
                        {loading && loadingTerm === "updatingStatus" ? (
                          <Loader />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    ) : null}
                  </form>
                </div>
              </div>
            </div> */}

            {/* tabs section */}
            {/* <section
              className="tab-buttons"
              style={{
                background: applicationColor.inputBg,
                color: applicationColor.readColor2,
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setCurrentTab(tab.name)}
                  className={
                    currentTab === tab.name ? "nav-link active" : "nav-link"
                  }
                  style={{
                    color: applicationColor.readColor1,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </section> */}
          </div>

          {/* single-employee body section */}
          <div
            className="single-employee-body"
            style={{
              // background: applicationColor.cardBg1,
              color: applicationColor.readColor1,
            }}
          >
            <div className="user-details-section">
              {currentTab === "attendance" ? (
                <>
                  <SingleEmployeeAttendanceCalendar
                    employeeAttendanceData={
                      singleEmployeData?.employeeAttendance || []
                    }
                    singleEmployeeEvents={singleEmployeeEvents}
                  />
                </>
              ) : currentTab === "leaves" ? (
                <SingleEmployeeLeaves_report
                  levesApplicationsData={singleEmployeData.employeeLeaves || []}
                  leaveReportData={singleEmployeData.employeeLeaveReport || []}
                />
              ) : currentTab === "profile" ? (
                <SingleEmployeeProfile employeeProfileData={employeeProfile} />
              ) : currentTab === "edit" ? (
                <ReusableProfileForm
                  form={updateEmployeedata}
                  type={"Edit Details"}
                  submit={handleSubmit}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default AdminSingleEmployeeData;
