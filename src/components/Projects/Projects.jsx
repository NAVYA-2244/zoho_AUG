
// import React, { useState, useEffect } from "react";
// import "./Projects.scss";
// import { CgSearch } from "react-icons/cg";
// import { TiUserAdd } from "react-icons/ti";
// import { TbUserCircle } from "react-icons/tb";
// import { MdOutlineAdd } from "react-icons/md";
// import { BiDotsVertical } from "react-icons/bi";
// import { RiDeleteBin5Line, RiEdit2Fill, RiTeamFill } from "react-icons/ri";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import ProjectEditModal from "./ProjectEditModal";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useFunctionContext } from "../Contexts/FunctionContext";

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);

//   const { checkErrors } = useFunctionContext();
//   const { applicationColor } = useThemeContext();

//   // Fetch all projects
//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       const response = await backEndCallObjNothing("/admin_get/get_projects");
//       setProjects(response || []);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Handle project edit
//   const handleEdit = (project) => {
//     setCurrentProject(project);
//     setIsFormVisible(true);
//   };

//   // Handle add/remove team member
//   const handleAddRemoveTeam = async (projectId, employeeId, action) => {
//     try {
//       setLoading(true);
//       await backEndCallObjNothing("/admin/add_remove_team", {
//         status: action,
//         employee_id: employeeId,
//         project_id: projectId
//       });
//       fetchProjects();
//     } catch (error) {
//       console.error("Error adding/removing team member:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section
//         className="company-details"
//         style={{ background: applicationColor.cardBg1 }}
//       >
   
//       {isFormVisible ? (
//         <ProjectEditModal
//           project={currentProject}
//           setIsFormVisible={setIsFormVisible}
//           fetchProjects={fetchProjects}
//           isFormVisible={true}
//         />
//       ) : (
//         <>
        
//           <section className="row">
//           {/* <h4 className="fw-semibold">Projects</h4> */}
//           {/* <div className="d-flex justify-content-between align-items-center">
//             <div className="d-flex align-items-center">
//               <div className="projects-search my-4">
//                 <CgSearch />
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search here..."
//                   style={{
//                     background: applicationColor.cardBg2,
//                     color: applicationColor.readColor1,
//                   }}
//                 />
//               </div>
//               <span
//                 data-toggle="tooltip"
//                 data-placement="bottom"
//                 title="Add people"
//                 className="add-task-user default-task-users avatar ms-4"
//               >
//                 <TiUserAdd />
//               </span>
//             </div>
//             <div>
//               <span className="me-2">SORT BY: </span>
//               <div className="btn-group">
//                 <button
//                   style={{
//                     background: applicationColor.mainBg,
//                     color: applicationColor.readColor1,
//                   }}
//                   type="button"
//                   className="btn dropdown-toggle"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Assignee
//                 </button>
//                 <ul className="dropdown-menu dropdown-menu-end">
//                   <li>
//                     <button className="dropdown-item" type="button">
//                       Assignee
//                     </button>
//                   </li>
//                   <li>
//                     <button className="dropdown-item" type="button">
//                       None
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div> */}

//             <div className="mb-4 text-end mt-3">
//               <button
//                 className="btn btn-primary d-flex align-items-center justify-content-end"
//                 type="button"
//                 onClick={() => {
//                   setCurrentProject({
//                     project_name: "",
//                     description: "",
//                     start_date: "",
//                     end_date: "",
//                     status: "",
//                     project_status: "active",
//                     project_id: "",
//                   });
//                   setIsFormVisible(true);
//                 }}
//               >
//                 <span className="me-1 ">Add Projects</span>
//                 <MdOutlineAdd />
//               </button>
//             </div>
//             {/* {loading ? (
//               <p>Loading...</p>
//             ) : projects.length > 0 ? (
//               projects.map((project, index) => (
//                 <div className="col-xl-4 col-md-6 mb-3" key={index}>
//                   <div
//                     className="admin-controls-card"
//                     style={{
//                       background: applicationColor.cardBg1,
//                       color: applicationColor.readColor1,
//                       padding: "20px",
//                       borderRadius: "10px",
//                     }}
//                   >
//                     <div 
                 
//                     >
//                       <h5 className="mt-1 mb-4">
//                         Project Name:&nbsp;
//                         <span className="text-primary fw-semi-bold">
//                           {project.project_name}
//                         </span>
//                       </h5>
//                       <p>{project.description}</p>
//                       <p>
//                         {new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}
//                       </p>
//                       <p className="card-text mb-2">
//             Status: <span className="fw-bold">{project.status}</span>
//           </p>
//           <p className="card-text mb-2">
//             Project Status: <span className="fw-bold">{project.project_status}</span>
//           </p>
                     
//                        <div className="mt-auto d-flex justify-content-between align-items-center">
//             <button
//               className="btn btn-outline-primary btn-sm"
//               onClick={() => handleEdit(project)}
//             >
//               <RiEdit2Fill className="me-1" />
//               Edit
//             </button>
//             <button
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => handleEdit(project)}
//             >
//               <BiDotsVertical />
//             </button>
//           </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12 text-center">
//                 No projects found.
//               </div>
//             )} */}
//  {loading ? (
//   <p>Loading...</p>
// ) : projects.length > 0 ? (
//   projects.map((project, index) => (
//     <div className="col-xl-4 col-md-6 mb-3" key={index}>
//       <div
//         className="admin-controls-card d-flex flex-column"
//         style={{
//           background: applicationColor.cardBg1,
//           color: applicationColor.readColor1,
//           padding: "20px",
//           borderRadius: "10px",
//           boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <h5 className="mt-1 mb-4">
//           Project Name:&nbsp;
//           <span className="text-primary fw-semi-bold">
//             {project.project_name}
//           </span>
//         </h5>

//         <p 
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             borderRadius: "5px",
//             backgroundColor: applicationColor.cardBg2,
//             color: applicationColor.readColor2,
//             maxHeight: "80px",
//             overflow: "auto"
//           }}
//         >
//           {project.description}
//         </p>

//         <p>
//           {new Date(project.start_date).toLocaleDateString()} -{" "}
//           {new Date(project.end_date).toLocaleDateString()}
//         </p>

//         <p className="card-text mb-2">
//           Status: <span className="fw-bold">{project.status}</span>
//         </p>

//         <p className="card-text mb-2">
//           Project Status: <span className="fw-bold">{project.project_status}</span>
//         </p>

//         <div className="mt-auto d-flex justify-content-between align-items-center">
//           <button
//             className="btn btn-outline-primary btn-sm"
//             onClick={() => handleEdit(project)}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "5px 10px",
//               fontSize: "14px"
//             }}
//           >
//             <RiEdit2Fill className="me-1" />
//             Edit Project
//           </button>

//           <button
//             className="btn btn-outline-success btn-sm"
//             // onClick={() => handleAssignTeam(project.project_id)}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "5px 10px",
//               fontSize: "14px"
//             }}
//           >
//             <RiTeamFill className="me-1" />
//             Assign Team
//           </button>
//         </div>
//       </div>
//     </div>
//   ))
// ) : (
//   <div className="col-12 text-center">
//     No projects found.
//   </div>
// )}

//           </section>
//         </>
//       )}
//       </section>
//   );
// };

// export default Projects;
import React, { useState, useEffect } from "react";
import "./Projects.scss";
import { RiEdit2Fill, RiTeamFill } from "react-icons/ri";
import { useThemeContext } from "../Contexts/ThemesContext";
import ProjectEditModal from "./ProjectEditModal";
import TeamAssignmentModal from "./TeamAssignmentModal";
import { backEndCallObjNothing } from "../../services/mainService";
import { useFunctionContext } from "../Contexts/FunctionContext";
import Loader from "../Loader/Loader";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const { applicationColor } = useThemeContext();

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing("/admin_get/get_projects");
      console.log(response,"projects")
      setProjects(response || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle project edit
  const handleEdit = (project) => {
    setCurrentProject(project);
    setIsFormVisible(true);
  };

  // Handle team assignment
  const handleAssignTeam = (projectId) => {
    setCurrentProject({ project_id: projectId });
    setIsTeamModalVisible(true);
  };

  return (
    <section
      className="company-details"
      style={{ background: applicationColor.cardBg1 }}
    >
      {isFormVisible ? (
        <ProjectEditModal
          project={currentProject}
          setIsFormVisible={setIsFormVisible}
          fetchProjects={fetchProjects}
        />
      ) : isTeamModalVisible ? (
        <TeamAssignmentModal
          projectId={currentProject?.project_id}

          setIsTeamModalVisible={setIsTeamModalVisible}
          fetchProjects={fetchProjects}
        />
      ) : (
        <>
          <div className="row">
            <div className="mb-4 text-end mt-3">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  setCurrentProject({
                    project_name: "",
                    description: "",
                    start_date: "",
                    end_date: "",
                    status: "",
                    project_status: "active",
                    project_id: "",
                  });
                  setIsFormVisible(true);
                }}
              >
                Add Projects
              </button>
            </div>
               {loading ? (
              <Loader />
            ) : projects.length > 0 ? (
              projects.map((project, index) => (
                <div className="col-xl-4 col-md-6 mb-3" key={index}>
                  <div
                    className="admin-controls-card"
                    style={{
                      background: applicationColor.cardBg1,
                      color: applicationColor.readColor1,
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h5>
                      Project Name:&nbsp;
                      <span className="text-primary fw-semi-bold">
                        {project.project_name}
                      </span>
                    </h5>
                    <p className="description-box">{project.description}</p>
                    <p>
                      {new Date(project.start_date).toLocaleDateString()} -{" "}
                      {new Date(project.end_date).toLocaleDateString()}
                    </p>
                    <p className="card-text mb-2">
                      Status: <span className="fw-bold">{project.status}</span>
                    </p>
                    <p className="card-text mb-2">
                      Project Status:{" "}
                      <span className="fw-bold">{project.project_status}</span>
                    </p>
                    {project.assign_track && project.assign_track.length > 0 && (
                      <div className="assign-track mt-3">
                        <h6>Assigned Team:</h6>
                        <ul>
                          {project.assign_track.map((assignment, index) => (
                            <li key={index}>
                              {/* <p>
                                Assigned by:{" "}
                                <strong>
                                  {assignment.assigned_by?.employee_email || "Unknown"}
                                </strong>
                              </p> */}
                              <p>
                                Assigned to:{" "}
                                <strong>
                                  {assignment.assigned_to?.employee_name || "Unknown"}
                                </strong>
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEdit(project)}
                      >
                        <RiEdit2Fill className="me-1" />
                        Edit Project
                      </button>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleAssignTeam(project.project_id)}
                      >
                        <RiTeamFill className="me-1" />
                        Assign Team
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">No projects found.</div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Projects;
