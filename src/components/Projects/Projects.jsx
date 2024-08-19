
// import React, { useState, useEffect, useRef } from "react";
// import "./Projects.scss";
// import { CgSearch } from "react-icons/cg";
// import { TiUserAdd } from "react-icons/ti";
// import { TbUserCircle } from "react-icons/tb";
// import { MdOutlineAdd } from "react-icons/md";
// import { BiDotsVertical } from "react-icons/bi";
// import { RiEdit2Fill } from "react-icons/ri";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import ProjectEditModal from "./ProjectEditModal";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useFunctionContext } from "../Contexts/FunctionContext";

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null); // Added state for current project

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
//     <>
//       <div
//         style={{
//           background: applicationColor.cardBg1,
//           color: applicationColor.readColor1,
//         }}
//         className="outlet-pages projects-page p-3"
//       >
//         <h4 className="fw-semibold">Projects</h4>
//         <div className="d-flex justify-content-between align-items-center">
//           <div className="d-flex align-items-center">
//             <div className="projects-search my-4">
//               <CgSearch />
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search here..."
//                 style={{
//                   background: applicationColor.cardBg2,
//                   color: applicationColor.readColor1,
//                 }}
//               />
//             </div>
//             <div className="avatar-list d-flex align-items-center ms-3">
//               <span
//                 data-toggle="tooltip"
//                 data-placement="bottom"
//                 title="Pavan Rebba"
//                 className="task-user default-task-users avatar z-3"
//               >
//                 PR
//               </span>
//               <span
//                 style={{
//                   background: applicationColor.cardBg2,
//                   color: applicationColor.readColor1,
//                 }}
//                 data-toggle="tooltip"
//                 data-placement="bottom"
//                 title="Unassigned"
//                 className="unassigned-tasks default-task-users avatar"
//               >
//                 <TbUserCircle />
//               </span>
//             </div>
//             <span
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Add people"
//               className="add-task-user default-task-users avatar ms-4"
//             >
//               <TiUserAdd />
//             </span>
//           </div>
//           <div>
//             <span className="me-2">SORT BY: </span>
//             <div className="btn-group">
//               <button
//                 style={{
//                   background: applicationColor.mainBg,
//                   color: applicationColor.readColor1,
//                 }}
//                 type="button"
//                 className="btn dropdown-toggle"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 Assignee
//               </button>
//               <ul className="dropdown-menu dropdown-menu-end">
//                 <li>
//                   <button className="dropdown-item" type="button">
//                     Assignee
//                   </button>
//                 </li>
//                 <li>
//                   <button className="dropdown-item" type="button">
//                     None
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="row mt-4">
//           <div className="col-12">
//             <div className="projects">
//               <div className="projects-list">
//                 {projects.length > 0 ? (
//                   projects.map((project) => (
//                     <div key={project.project_id} className="card mt-3">
//                       <div className="card-body">
//                         <h5 className="card-title">{project.project_name}</h5>
//                         <p className="card-text">{project.description}</p>
//                         <p className="card-text">
//                           {new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}
//                         </p>
//                         <p className="card-text">
//                           {project.status} - {project.project_status}
//                           <RiEdit2Fill className="ms-2 edit-icon" onClick={() => handleEdit(project)} />
//                           <BiDotsVertical className="ms-2 options-icon" />
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No projects found.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           className="btn btn-primary mt-4"
//           onClick={() => {
//             setCurrentProject({
//               project_name: "",
//               description: "",
//               start_date: "",
//               end_date: "",
//               status: "",
//               project_status: "active",
//               project_id: "",
//             });
//             setIsFormVisible(true);
//           }}
//         >
//           <MdOutlineAdd /> Add New Project
//         </button>

//         {isFormVisible && (
//           <ProjectEditModal
//             project={currentProject}
//             setIsFormVisible={setIsFormVisible}
//             fetchProjects={fetchProjects}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Projects;
// // import React, { useState, useEffect } from "react";
// // import { CgSearch } from "react-icons/cg";
// // import ProjectEditModal from "./ProjectEditModal";
// // import { useThemeContext } from "../Contexts/ThemesContext";
// // import { backEndCallObjNothing } from "../../services/mainService";
// // import Loader from "../Loader/Loader";

// // const Projects = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [isFormVisible, setIsFormVisible] = useState(false);
// //   const [currentProject, setCurrentProject] = useState(null);
// //   const [loading, setLoading] = useState(false);
  
// //   const { applicationColor } = useThemeContext();

// //   const fetchProjects = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await backEndCallObjNothing("/admin_get/get_projects");
// //       setProjects(response || []);
// //     } catch (error) {
// //       console.error("Error fetching projects:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProjects();
// //   }, []);

// //   const handleEdit = (project) => {
// //     setCurrentProject(project);
// //     setIsFormVisible(true);
// //   };

// //   return (
// //     <div
// //       style={{
// //         background: applicationColor.cardBg1,
// //         color: applicationColor.readColor1,
// //       }}
// //       className="outlet-pages projects-page p-3"
// //     >
// //       <h4 className="fw-semibold">Projects</h4>
// //       <div className="d-flex justify-content-between align-items-center">
// //         <div className="d-flex align-items-center">
// //           <div className="projects-search my-4">
// //             <CgSearch />
// //             <input
// //               type="text"
// //               className="form-control"
// //               placeholder="Search here..."
// //               style={{
// //                 background: applicationColor.cardBg2,
// //                 color: applicationColor.readColor2,
// //               }}
// //             />
// //           </div>
// //           <button
// //             className="btn btn-primary"
// //             onClick={() => handleEdit({})}
// //             style={{ background: applicationColor.primary }}
// //           >
// //             Add New Project
// //           </button>
// //         </div>
// //       </div>
// //       {loading ? (
// //         <div className="text-center my-4">
// //           <Loader />
// //         </div>
// //       ) : (
// //         <table className="table table-bordered" style={{ color: applicationColor.readColor1 }}>
// //           <thead>
// //             <tr>
// //               <th>Project Name</th>
// //               <th>Description</th>
// //               <th>Start Date</th>
// //               <th>End Date</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {projects.map((project) => (
// //               <tr key={project.project_id}>
// //                 <td>{project.project_name}</td>
// //                 <td>{project.description}</td>
// //                 <td>{new Date(project.start_date).toLocaleDateString()}</td>
// //                 <td>{new Date(project.end_date).toLocaleDateString()}</td>
// //                 <td>{project.status}</td>
// //                 <td>
// //                   <button
// //                     className="btn btn-warning"
// //                     onClick={() => handleEdit(project)}
// //                   >
// //                     Edit
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //       {isFormVisible && (
// //         <ProjectEditModal
// //           project={currentProject}
// //           setIsFormVisible={setIsFormVisible}
// //           fetchProjects={fetchProjects}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Projects;
import React, { useState, useEffect } from "react";
import "./Projects.scss";
import { CgSearch } from "react-icons/cg";
import { TiUserAdd } from "react-icons/ti";
import { TbUserCircle } from "react-icons/tb";
import { MdOutlineAdd } from "react-icons/md";
import { BiDotsVertical } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { useThemeContext } from "../Contexts/ThemesContext";
import ProjectEditModal from "./ProjectEditModal";
import { backEndCallObjNothing } from "../../services/mainService";
import { useFunctionContext } from "../Contexts/FunctionContext";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const { checkErrors } = useFunctionContext();
  const { applicationColor } = useThemeContext();

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing("/admin_get/get_projects");
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

  // Handle add/remove team member
  const handleAddRemoveTeam = async (projectId, employeeId, action) => {
    try {
      setLoading(true);
      await backEndCallObjNothing("/admin/add_remove_team", {
        status: action,
        employee_id: employeeId,
        project_id: projectId
      });
      fetchProjects();
    } catch (error) {
      console.error("Error adding/removing team member:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
        className="outlet-pages projects-page p-3"
      >
        <h4 className="fw-semibold">Projects</h4>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="projects-search my-4">
              <CgSearch />
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                style={{
                  background: applicationColor.cardBg2,
                  color: applicationColor.readColor1,
                }}
              />
            </div>
            <div className="avatar-list d-flex align-items-center ms-3">
              <span
                data-toggle="tooltip"
                data-placement="bottom"
                title="Pavan Rebba"
                className="task-user default-task-users avatar z-3"
              >
                PR
              </span>
              <span
                style={{
                  background: applicationColor.cardBg2,
                  color: applicationColor.readColor1,
                }}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Unassigned"
                className="unassigned-tasks default-task-users avatar"
              >
                <TbUserCircle />
              </span>
            </div>
            <span
              data-toggle="tooltip"
              data-placement="bottom"
              title="Add people"
              className="add-task-user default-task-users avatar ms-4"
            >
              <TiUserAdd />
            </span>
          </div>
          <div>
            <span className="me-2">SORT BY: </span>
            <div className="btn-group">
              <button
                style={{
                  background: applicationColor.mainBg,
                  color: applicationColor.readColor1,
                }}
                type="button"
                className="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Assignee
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" type="button">
                    Assignee
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    None
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="projects">
              <div className="projects-list">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <div key={project.project_id} className="card mt-3">
                      <div className="card-body">
                        <h5 className="card-title">{project.project_name}</h5>
                        <p className="card-text">{project.description}</p>
                        <p className="card-text">
                          {new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}
                        </p>
                        <p className="card-text">
                          {project.status} - {project.project_status}
                          <RiEdit2Fill className="ms-2 edit-icon" onClick={() => handleEdit(project)} />
                          <BiDotsVertical className="ms-2 options-icon" />
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No projects found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary mt-4"
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
          <MdOutlineAdd /> Add New Project
        </button>

        {isFormVisible && (
          <ProjectEditModal
            project={currentProject}
            setIsFormVisible={setIsFormVisible}
            fetchProjects={fetchProjects}
          />
        )}
      </div>
    </>
  );
};

export default Projects;
