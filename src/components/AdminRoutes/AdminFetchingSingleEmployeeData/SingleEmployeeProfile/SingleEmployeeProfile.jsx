import React, { useState } from "react";
import "./SingelEmployeeProfile.scss";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import TableHead from "../../../Table/TableHead";
import { useStateContext } from "../../../Contexts/StateContext";
import { useNavigate } from "react-router";
import Selectinputimg from "../../../EmployeeRoutes/EmployeeAttendance/Selectinputimg";
import ProfilePhoto from "../../EmployeeForm/ProfilePhoto";
import { MdPermIdentity } from "react-icons/md";

import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { PiIdentificationBadgeBold } from "react-icons/pi";

let educationDetailsProperties = [
  {
    name: "Institute Name",
    property: "institute_name",
    type: "string",
  },
  {
    name: "Degree",
    property: "degree",
    type: "string",
  },
  {
    name: "Specialization",
    property: "specialization",
    type: "string",
  },
  {
    name: "Year Of Completion",
    property: "year_of_completion",
    type: "string",
  },
];

let workExperienceProperties = [
  {
    name: "Company Name",
    property: "company_name",
    type: "string",
  },
  {
    name: "Job Title",
    property: "job_title",
    type: "string",
  },
  {
    name: "Start Date",
    property: "from_date",
    type: "string",
  },
  {
    name: "End Date",
    property: "to_date",
    type: "string",
  },
  {
    name: "Job Description",
    property: "job_description",
    type: "string",
  },
  {
    name: "Experience",
    property: "experience",
    type: "string",
  },
];

let dependentdetails = [
  {
    name: "Name",
    property: "name",
    type: "string",
  },
  {
    name: "Dependent DOB",
    property: "dependent_date_of_birth",
    type: "string",
  },
  {
    name: "Relationship",
    property: "relation",
    type: "string",
  },
];

let workInformationProperties = [
  {
    name: "Date of Joining",
    property: "date_of_join",
    type: "string",
  },
  {
    name: "Designation Name",
    property: "designation_name",
    type: "string",
  },
  {
    name: "Employee Status",
    property: "employee_status",
    type: "string",
  },
  // {
  //   name: "Location",
  //   property: "location_name",
  //   type: "string",
  // },
  // {
  //   name: "Shift",
  //   property: "shift_name",
  //   type: "string",
  // },
  {
    name: "Source of Hire",
    property: "source_of_hire",
    type: "string",
  },
];

let contactDetailsProperties = [
  {
    name: "Permanent Address",
    property: "permanent_address",
    type: "string",
  },
  {
    name: "Personal Email",
    property: "personal_email_address",
    type: "string",
  },
  {
    name: "Present Address",
    property: "present_address",
    type: "string",
  },
  {
    name: "Seating Location",
    property: "seating_location",
    type: "string",
  },
  // {
  //   name: "Tags",
  //   property: "tags",
  //   type: "string",
  // },
  {
    name: "Work Phone Number",
    property: "work_phone_number",
    type: "string",
  },
];

let identityInfoProperties = [
  {
    name: "Aadhaar",
    property: "aadhaar",
    type: "string",
  },
  {
    name: "PAN",
    property: "pan",
    type: "string",
  },
  {
    name: "Passport",
    property: "passport",
    type: "string",
  },
  {
    name: "UAN",
    property: "uan",
    type: "string",
  },
];

let personalDetailsProperties = [
  {
    name: "About Me",
    property: "about_me",
    type: "string",
  },
  {
    name: "DOB",
    property: "date_of_birth",
    type: "string",
  },
  {
    name: "Expertise",
    property: "expertise",
    type: "string",
  },
  {
    name: "Gender",
    property: "gender",
    type: "string",
  },
  {
    name: "Marital Status",
    property: "marital_status",
    type: "string",
  },
];

//   return (
//     <>
//       {Object.keys(data).map((key, index) => (
//         <div
//           key={index}
//           className="detail"
//           style={{
//             color: applicationColor.readColor2,
//             borderBottom: `1px solid ${applicationColor.borderLine}`,
//           }}
//         >
//           <p>{formatCamelCaseString(key)}</p>
//           <p>
//             {typeof data[key] === "object" && data[key] !== null ? (
//               <RenderNestedProperties data={data[key]} />
//             ) : data[key] !== null &&
//               data[key] !== undefined &&
//               data[key] !== "" ? (
//               data[key]
//             ) : (
//               "--"
//             )}
//           </p>
//         </div>
//       ))}
//     </>
//   );
// };

const SingleEmployeeProfile = ({ employeeProfileData, employeesLists }) => {
  console.log(employeesLists, "employeesListss");
  console.log(employeeProfileData, "employeeProfileData");
  const [status, setStatus] = useState("");
  const [newClass, setNewClass] = useState("");
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");
  const { applicationColor } = useThemeContext();
  const navigate = useNavigate();

  const {
    setLoading,
    setLoadingTerm,
    setOrgData2,
    isAdmin,
    loadingTerm,
    employeedata,
    loading,
    
  } = useStateContext();
  console.log(employeedata,"navya")
  // profile tabs stored in array of objects and rendering dynamically in tab section views
  const tabs = [{ name: "profile", label: "Profile" }];

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

  const handleChangeStatus = (event) => {
    const selectedStatus =
      event.target.options[event.target.selectedIndex].text;
    getBadgeClass(selectedStatus);
    setStatus(event.target.value);
    setIsStatusChanged(true);
  };

  const handleEdit = () => {
    navigate("/profile_Edit", { state: { employeeProfileData } });
  };
  const {
    basic_info,
    contact_details,
    identity_info,
    work_info,
    personal_details,
  } = employeeProfileData?.profile;

   const workExperiences = employeeProfileData.profile.work_experience;
  const educational_details = employeeProfileData.profile.educational_details;
  const dependent_details = employeeProfileData.profile.dependent_details;
  const workInfoArray = [work_info];
  const contactDetailsArray = [contact_details];
  const identityInfoArray =
  // [{uan:employeeProfileData.profile.uan,aadhaar:employeeProfileData.profile.aadhaar}]
  [identity_info]
  const personalDetailsArray = [personal_details];

  console.log(workInfoArray,"work_info");

  return (
    <div className="row">
      {/* <h1>hello</h1> */}
      <main className="single_employee_whole_data">
        {/* <Selectinputimg Allemployelist={employeesLists} /> */}
        <div
          className="single-employee-header"
          style={{
            background: applicationColor.cardBg1,
            color: applicationColor.readColor1,
          }}
        >
                 <ProfilePhoto />
          {/* tabs section */}
          <section
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
          </section>
        </div>
        <section
          className="my-profile admin-myProfile"
          style={{
            background: applicationColor.cardBg1,
            color: applicationColor.readColor1,
          }}
        >
          <div
            className="single-employee-body"
            style={{
              color: applicationColor.readColor1,
            }}
          >
            <div className="user-details-section">
              {currentTab === "attendance" ? (
                <>
                  <h1>attendance</h1>
                </>
              ) : currentTab === "leaves" ? (
                <h1>leaves</h1>
              ) : currentTab === "profile" ? (
                <div className="row">
                  {/*Basic Information */}
                  <div className="basic-info-wrapper">
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="profile-heading">Profile</h4>
                      {/* {employeeDetails.role_name === "Director"?"": */}
                      <button className="btn btn-primary" onClick={handleEdit}>
                        Edit
                      </button> 

                      {/* } */}
                    </div>
                    <div className="basic-information">
                      <div className="basic-info-left">
                        <div className="info">
                          <p>
                            <MdPermIdentity />
                          </p>
                          <p>
                            {basic_info.first_name || "no data"}&nbsp;
                            {basic_info.last_name || "no data"}
                          </p>
                        </div>
                        <div className="info detail">
                          <MdOutlineMail />
                          {/* <p>{basic_info.email.toLowerCase()  || "no data"}</p> */}
                          <p>{basic_info.email ? basic_info.email.toLowerCase() : "no data"}</p>
                        </div>
                      </div>
                      <div className="basic-info-right">
                        <div className="info">
                          <PiIdentificationBadgeBold />
                          <p>{employeeProfileData.profile.employee_id}</p>
                        </div>
                        <div className="info detail">
                          <FaPhone />
                          <p>
                            {contact_details.personal_mobile_number ||
                              "no data"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Work Information */}
                  <div className="col-lg-12 col-md-12">
                    <div
                      className="tables table-wrapper py-2 px-3"
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        marginTop: "20px",
                      }}
                    >
                      <h5>Personal Details</h5>
                      <div className="info-wrapper user-info-wrapper">
                        <div className="tables">
                          <table className="main-table table-bordered table-responsive rounded-1">
                            <TableHead
                              tableHeadProperties={personalDetailsProperties}
                              data={personalDetailsArray || []}
                            />
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Identity Info */}
                  <div className="col-lg-12 col-md-12">
                    <div
                      className="tables table-wrapper py-2 px-3"
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        marginTop: "20px",
                      }}
                    >
                      <h5>Identity Info</h5>
                      <div className="info-wrapper user-info-wrapper">
                        <div className="tables">
                          <table className="main-table table-bordered table-responsive rounded-1">
                            <TableHead
                              tableHeadProperties={identityInfoProperties}
                              data={identityInfoArray || []}
                            />
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div
                      className="tables table-wrapper py-2 px-3"
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        marginTop: "20px",
                      }}
                    >
                      <h5>Contact Details</h5>
                      <div className="info-wrapper user-info-wrapper">
                        <div className="tables">
                          <table className="main-table table-bordered table-responsive rounded-1">
                            <TableHead
                              tableHeadProperties={contactDetailsProperties}
                              data={contactDetailsArray || []}
                            />
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div
                      className="tables table-wrapper py-2 px-3"
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        marginTop: "20px",
                      }}
                    >
                      <h5>Work Information</h5>
                      <div className="info-wrapper user-info-wrapper">
                        <div className="tables">
                          <table className="main-table table-bordered table-responsive rounded-1">
                            <TableHead
                              tableHeadProperties={workInformationProperties}
                              data={workInfoArray || []}
                            />
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div
                      className="tables table-wrapper py-2 px-3"
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        marginTop: "20px",
                      }}
                    >
                      <h5>Education Details</h5>
                      <div className="info-wrapper user-info-wrapper">
                        <div className="tables">
                          <table className="main-table table-bordered table-responsive rounded-1">
                            <TableHead
                              tableHeadProperties={educationDetailsProperties}
                              data={educational_details || []}
                            />
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div
                      className="tables table-wrapper py-2 px-3"
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        marginTop: "20px",
                      }}
                    >
                      <h5>Work Experience</h5>
                      <div className="info-wrapper user-info-wrapper">
                        <div className="tables">
                          <table className="main-table table-bordered table-responsive rounded-1">
                            <TableHead
                              tableHeadProperties={workExperienceProperties}
                              data={workExperiences || []}
                            />
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div
                      className="tables table-wrapper py-2 px-3"
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                        marginTop: "20px",
                      }}
                    >
                      <h5>Dependent Details</h5>

                      <div className="info-wrapper user-info-wrapper">
                        <div className="tables">
                          <table className="main-table table-bordered table-responsive rounded-1">
                            <TableHead
                              tableHeadProperties={dependentdetails}
                              data={dependent_details || []}
                            />
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentTab === "edit" ? (
                <h1>1</h1>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SingleEmployeeProfile;
