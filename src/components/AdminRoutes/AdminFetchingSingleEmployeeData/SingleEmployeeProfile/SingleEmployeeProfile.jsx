import React, { useState } from "react";
import "./SingelEmployeeProfile.scss";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import TableHead from "../../../Table/TableHead";
import { useStateContext } from "../../../Contexts/StateContext";
import { useNavigate } from "react-router";
import Selectinputimg from "../../../EmployeeRoutes/EmployeeAttendance/Selectinputimg";
import ProfilePhoto from "../../EmployeeForm/ProfilePhoto";
import { AiOutlineEdit } from "react-icons/ai";
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
    name: "Date Of Completion",
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
    name: "Dependent_Date_Of_Birth",
    property: "dependent_date_of_birth",
    type: "string",
  },
  {
    name: "Relationship",
    property: "relation",
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
    loading,
  } = useStateContext();
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
    console.log("hi");
    navigate("/profile_Edit", { state: { employeeProfileData } });
  };
  const {
    basic_info,
    contact_details,
    identity_info,
    work_info,
    personal_details,
  } = employeeProfileData?.profile;

  console.log(basic_info?.first_name, "name");

  //Thi`s function updates the employee Status like pending , active ,terminated etc
  // const handleStatusSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     setLoadingTerm("updatingStatus");
  //     let data = {
  //       // employeeId: id,
  //       status: status,
  //     };

  //     // const { detail } = await makeNetworkCall(
  //     //   data,
  //     //   "updateEmployeeStatus",
  //     //   "headers"
  //     // );
  //     // toastOptions.success(detail || "employee Status Updated Successfully");

  // setLoading(false);
  // setLoadingTerm("");
  // } catch (error) {
  //   setLoading(false);
  //   setLoadingTerm("");
  // toastOptions.error(
  //   error?.error?.response?.data?.detail ||
  //     "Error Occured while Updating Status"
  // );
  // } finally {
  //   setLoading(false);
  //   setLoadingTerm("");
  // }
  // };`
  const workExperiences = employeeProfileData.profile.work_experience;
  const educational_details = employeeProfileData.profile.educational_details;
  const dependent_details = employeeProfileData.profile.dependent_details;

  console.log(employeeProfileData, "profile");
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
          {/* <div className="user-header-section">
            <div className="header-bg-image">
              <img
                src={
                  basic_info?.banner ||
                  "https://img.freepik.com/premium-vector/abstract-dark-blue-modern-futuristic-science-technology-hi-tech-digital-abstract-dark-blue-colorful-design-banner-background-vector-abstract-graphic-design-banner-pattern-background-web-template_181182-33425.jpg"
                }
                alt="header-bg-image"
              />
            </div>
            <div className="user-image-wrapper">
              <div className="user-img-container">
                <img
                  src={
                    basic_info?.profilePhoto ||
                    "https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145"
                  }
                  alt="User-Image"
                  width="100"
                />
              </div>

              <div className="user-basic-info">
                <p>{basic_info.first_name || "no data"}</p>
                <p>{`${basic_info?.first_name} ${basic_info?.last_name}`}</p>

              </div>
            </div>
          </div> */}
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

                  <div className="col-lg-12">
                    <br />
                    <h5 className="profile-heading">My Profile</h5>
                    <button className="btn btn-primary" onClick={handleEdit}>
                      Edit
                    </button>
                    <section className="info-wrapper user-info-wrapper">
                      <div className="head-wrapper">
                        <h5>Basic Information</h5>
                        <div className="info-details d-flex">
                          <div className="info-div-right">
                            <div className="detail">
                              <p>First Name</p>
                              <p>{basic_info.first_name || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: "red",
                                color: applicationColor.readColor2,
                              }}
                            >
                              <p>Nick Name</p>
                              {basic_info.nick_name || "no data"}
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: "red",
                                color: applicationColor.readColor2,
                              }}
                            >
                              <p>Employee Id</p>
                              {employeeProfileData.profile.employee_id}
                              <p>Last_ip</p>
                              {employeeProfileData.profile.last_ip}
                              <p>Device_id</p>
                              {employeeProfileData.profile.device_id}
                            </div>
                          </div>

                          <div className="info-div-left">
                            <div className="detail">
                              <p>Last Name</p>

                              {basic_info.last_name || "no data"}
                            </div>

                            <div
                              className="detail"
                              style={{
                                color: "red",
                                color: applicationColor.readColor2,
                              }}
                            >
                              <p>Email</p>

                              {basic_info.email || "no data"}
                            </div>

                            <div
                              className="detail"
                              style={{
                                color: "red",
                                color: applicationColor.readColor2,
                              }}
                            >
                              <p>Contact</p>
                              <p>personal_mobile_number</p>
                              <p>
                                {contact_details.personal_mobile_number ||
                                  "no data"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  {/*Work Information */}

                  <div className="col-lg-6 col-md-12">
                    <div
                      className="info-wrapper user-info-wrapper"
                      style={{
                        border: `1px solid ${applicationColor.borderLine}`,
                      }}
                    >
                      <h5>Personal_details</h5>
                      <div className="head-wrapper">
                        <div
                          className="card-1"
                          style={{
                            background: applicationColor.cardBg1,
                            color: applicationColor.readColor1,
                          }}
                        >
                          <div className="info-card">
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>about_me:</p>
                              <p>{personal_details.about_me || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>date_of_birth:</p>
                              <p>
                                {personal_details.date_of_birth || "no data"}
                              </p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>expertise:</p>
                              <p>{personal_details.expertise || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>gender:</p>
                              <p>{personal_details.gender || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>marital_status:</p>
                              <p>
                                {/* {employeeProfileData.profile.personal_details
                                  .marital_status
                                  ? employeeProfileData.profile.personal_details
                                      .marital_status
                                  : "no data"} */}
                                {personal_details.martial_status || "no data"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Identity Info */}

                  {/* Personal_details*/}
                  <div className="col-lg-6 col-md-12">
                    <div
                      className="info-wrapper user-info-wrapper"
                      style={{
                        border: `1px solid ${applicationColor.borderLine}`,
                      }}
                    >
                      <h5>Identity Info</h5>
                      <div
                        className="card-1"
                        style={{
                          background: applicationColor.cardBg1,
                          color: applicationColor.readColor1,
                        }}
                      >
                        <div className="info-card identity-info">
                          <div
                            className="detail"
                            style={{
                              color: applicationColor.readColor2,
                              borderBottom: `1px solid ${applicationColor.borderLine}`,
                            }}
                          >
                            <p>aadhaar:</p>
                            <p>{identity_info.aadhaar || "no data"}</p>
                          </div>
                        </div>
                        <div className="info-card identity-info">
                          <div
                            className="detail"
                            style={{
                              color: applicationColor.readColor2,
                              borderBottom: `1px solid ${applicationColor.borderLine}`,
                            }}
                          >
                            <p>pan:</p>
                            <p>{identity_info.pan || "no data"}</p>
                          </div>
                        </div>
                        <div className="info-card identity-info">
                          <div
                            className="detail"
                            style={{
                              color: applicationColor.readColor2,
                              borderBottom: `1px solid ${applicationColor.borderLine}`,
                            }}
                          >
                            <p>passport:</p>
                            <p>{identity_info.passport || "no data"}</p>
                          </div>
                        </div>
                        <div className="info-card identity-info">
                          <div
                            className="detail"
                            style={{
                              color: applicationColor.readColor2,
                              borderBottom: `1px solid ${applicationColor.borderLine}`,
                            }}
                          >
                            <p>uan:</p>
                            <p>{identity_info.uan || "no data"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div
                      className="info-wrapper user-info-wrapper"
                      style={{
                        border: `1px solid ${applicationColor.borderLine}`,
                      }}
                    >
                      <h5>contact_details</h5>
                      <div className="head-wrapper">
                        <div
                          className="card-1"
                          style={{
                            background: applicationColor.cardBg1,
                            color: applicationColor.readColor1,
                          }}
                        >
                          <div className="info-card">
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p> permanent_address:</p>
                              <p>
                                {contact_details.permanent_address || "no data"}
                              </p>
                            </div>

                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>personal_email_address:</p>
                              <p>
                                {contact_details.personal_email_address ||
                                  "no data"}
                              </p>
                            </div>

                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>present_address:</p>
                              <p>
                                {contact_details.present_address || "no data"}
                              </p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>seating_location:</p>
                              <p>
                                {contact_details.seating_location || "no data"}
                              </p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>tags:</p>
                              <p>{contact_details.tags || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>work_phone_number:</p>
                              <p>
                                {contact_details.work_phone_number || "no data"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div
                      className="info-wrapper user-info-wrapper"
                      style={{
                        border: `1px solid ${applicationColor.borderLine}`,
                      }}
                    >
                      <h5>Work Information</h5>
                      <div className="head-wrapper">
                        <div
                          className="card-1"
                          style={{
                            background: applicationColor.cardBg1,
                            color: applicationColor.readColor1,
                          }}
                        >
                          <div className="info-card">
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>Date_of_join:</p>
                              <p>{work_info.date_of_join || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>designation_name:</p>
                              <p>{work_info.designation_name || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>employee_status:</p>
                              <p>{work_info.employee_status || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>employment_type:</p>
                              <p>{work_info.employment_type || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>location_name:</p>
                              <p>{work_info.location_name || "no data"}</p>
                            </div>
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>shift_name:</p>
                              <p>{work_info.shift_name || "no data"}</p>
                            </div>{" "}
                            <div
                              className="detail"
                              style={{
                                color: applicationColor.readColor2,
                                borderBottom: `1px solid ${applicationColor.borderLine}`,
                              }}
                            >
                              <p>source_of_hire:</p>
                              <p>{work_info.source_of_hire || "no data"}</p>
                            </div>
                          </div>
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
                      <h4>Education Details</h4>
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
                      <h4>Work Experience</h4>
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
                      <h4>Dependent Details</h4>

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
