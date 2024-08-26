// // import React, { useState, useEffect } from "react";
// // import "./Projects.scss";
// // import { useThemeContext } from "../Contexts/ThemesContext";
// // import { backEndCallObjNothing } from "../../services/mainService";
// // import Loader from "../Loader/Loader";
// // import TeaminchargeTaskDetailsModal from "./TeaminchargeTaskDetailsModal";

// // const TeaminchargeProjects = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [tasks, setTasks] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
// //   const [modalMode, setModalMode] = useState(null); // To track whether we're adding or editing
// //   const [taskToEdit, setTaskToEdit] = useState(null);
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

// //   const fetchTasks = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await backEndCallObjNothing("/emp_get/get_tasks");
// //       setTasks(response || []);
// //     } catch (error) {
// //       console.error("Error fetching tasks:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddTaskClick = (projectId) => {
// //     setModalMode("add_task");
// //     setTaskToEdit({ projectId });
// //     setShowTaskDetailsModal(true);
// //   };

// //   const handleEditTaskClick = (task) => {
// //     setModalMode("edit_task");
// //     setTaskToEdit(task);
// //     setShowTaskDetailsModal(true);
// //   };

// //   useEffect(() => {
// //     fetchProjects();
// //     fetchTasks();
// //   }, []);

// //   const getTasksByProjectId = (projectId) => {
// //     return tasks.filter(task => task.project_id === projectId);
// //   };

// //   return (
// //     <section
// //       className="roles-table"
// //       style={{
// //         background: applicationColor.cardBg1,
// //         color: applicationColor.readColor1,
// //         padding: '2rem',
// //         borderRadius: '10px',
// //       }}
// //     >
// //       <div className="row">
// //         <h4>Project Details</h4>
// //         {loading && <Loader />}
// //         {projects.length > 0 ? (
// //           <div className="row">
// //             {projects.map((project, index) => (
// //               <div
// //                 className="col-lg-4 col-md-6 mb-4"
// //                 key={index}
// //                 style={{ cursor: 'pointer' }}
// //               >
// //                 <div
// //                   className="admin-controls-card"
// //                   style={{
// //                     background: applicationColor.cardBg1,
// //                     color: applicationColor.readColor1,
// //                     borderRadius: '12px',
// //                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// //                     transition: 'transform 0.3s',
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     e.currentTarget.style.transform = 'scale(1.02)';
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     e.currentTarget.style.transform = 'scale(1)';
// //                   }}
// //                 >
// //                   <div
// //                     className="project-header p-3"
// //                     style={{ backgroundColor: applicationColor.primaryColor, borderRadius: '12px 12px 0 0' }}
// //                   >
// //                     <h5 className="project-title m-0">
// //                       <strong className="text-primary">Project Name:</strong> {project.project_name}
// //                     </h5>
// //                     <button
// //                       className="btn btn-primary mt-2"
// //                       onClick={() => handleAddTaskClick(project.project_id)}
// //                       style={{ backgroundColor: applicationColor.primaryColor }}
// //                     >
// //                       Add Task
// //                     </button>
// //                   </div>
// //                   <div className="row mt-3">
// //                     {getTasksByProjectId(project.project_id).map((task, index) => (
// //                       <div
// //                         className="task-card card mb-3 p-3 rounded-2"
// //                         key={index}
// //                         onClick={() => handleEditTaskClick(task)}
// //                         style={{
// //                           background: applicationColor.cardBg2,
// //                           color: applicationColor.readColor2,
// //                         }}
// //                       >
// //                         <div className="d-flex justify-content-between">
// //                           <span className={`priority-badge priority-${task.priority}`}>
// //                             {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
// //                           </span>
// //                           <span className="due-date text-muted">
// //                             {new Date(task.due_date).toLocaleDateString()}
// //                           </span>
// //                         </div>
// //                         <h6 className="mt-2">
// //                           <strong className="text-secondary">Task:</strong> {task.task_name}
// //                         </h6>
// //                         <span className="task-status text-muted d-block text-end">
// //                           Status: {task.status}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           !loading && (
// //             <div className="col-12 text-center">
// //               <p className="text-muted">No projects found.</p>
// //             </div>
// //           )
// //         )}
// //       </div>
// //       {showTaskDetailsModal && (
// //         <TeaminchargeTaskDetailsModal
// //           onClose={() => setShowTaskDetailsModal(false)}
// //           mode={modalMode}
// //           task={taskToEdit}
// //         />
// //       )}
// //     </section>
// //   );
// // };

// // export default TeaminchargeProjects;


// import React, { useState, useEffect } from "react";
// import "./Projects.scss";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../services/mainService";
// import Loader from "../Loader/Loader";
// import TeaminchargeTaskDetailsModal from "./TeaminchargeTaskDetailsModal";

// const TeaminchargeProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
//   const [modalMode, setModalMode] = useState(null); // To track whether we're adding or editing
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const { applicationColor } = useThemeContext();

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

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await backEndCallObjNothing("/emp_get/get_tasks");
//       setTasks(response || []);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddTaskClick = (projectId) => {
//     console.log(projectId,"projectId")
//     setModalMode("add_task");
//     setTaskToEdit({ projectId }); // Ensure projectId is set in taskToEdit
//     setShowTaskDetailsModal(true);
//   };
//   const handleupdateproject = (projectId) => {
//     console.log(projectId,"projectId")
//     setModalMode("add_task");
//     setTaskToEdit({ projectId }); // Ensure projectId is set in taskToEdit
//     setShowTaskDetailsModal(true);
//   };
  

//   const handleEditTaskClick = (task) => {
//     console.log(tasks)
//     setModalMode("edit_task");
//     setTaskToEdit(task);
//     setShowTaskDetailsModal(true);
//   };

//   const handleModalSubmit = async () => {
//     await fetchTasks(); // Refresh the tasks after form submission
//     setShowTaskDetailsModal(false); // Close the modal
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchTasks();
//   }, []);

//   const getTasksByProjectId = (projectId) => {
//     return tasks.filter(task => task.project_id === projectId);
//   };

//   return (
//     <section
//       className="roles-table"
//       style={{
//         background: applicationColor.cardBg1,
//         color: applicationColor.readColor1,
//         padding: '2rem',
//         borderRadius: '10px',
//       }}
//     >
//       <div className="row">
//         <h4>Project Details</h4>
//         {loading && <Loader />}
//         {projects.length > 0 ? (
//           <div className="row">
//             {projects.map((project, index) => (
//               <div
//                 className="col-lg-4 col-md-6 mb-4"
//                 key={index}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <div
//                   className="admin-controls-card"
//                   style={{
//                     background: applicationColor.cardBg1,
//                     color: applicationColor.readColor1,
//                     borderRadius: '12px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     transition: 'transform 0.3s',
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'scale(1.02)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'scale(1)';
//                   }}
//                 >
//                   <div
//                     className="project-header p-3"
//                     style={{ backgroundColor: applicationColor.primaryColor, borderRadius: '12px 12px 0 0' }}
//                   >
//                     <h5 className="project-title m-0">
//                       <strong className="text-primary">Project Name:</strong> {project.project_name}
//                     </h5>
//                     <button
//                       className="btn btn-primary mt-2"
//                       onClick={() => handleAddTaskClick(project.project_id)}
//                       style={{ backgroundColor: applicationColor.primaryColor }}
//                     >
//                       Add Task
//                     </button>
//                     <button
//                       className="btn btn-primary mt-2"
//                       onClick={() => handleupdateproject(project.project_id)}
//                       style={{ backgroundColor: applicationColor.primaryColor }}
//                     >
//                       update project
//                     </button>
//                   </div>
//                   <div className="row mt-3">
//                     {getTasksByProjectId(project.project_id).map((task, index) => (
//                       <div
//                         className="task-card card mb-3 p-3 rounded-2"
//                         key={index}
//                         onClick={() => handleEditTaskClick(task)}
//                         style={{
//                           background: applicationColor.cardBg2,
//                           color: applicationColor.readColor2,
//                         }}
//                       >
//                         <div className="d-flex justify-content-between">
//                           <span className={`priority-badge priority-${task.priority}`}>
//                             {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
//                           </span>
//                           <span className="due-date text-muted">
//                             {new Date(task.due_date).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <h6 className="mt-2">
//                           <strong className="text-secondary">Task:</strong> {task.task_name}
//                         </h6>
//                         <span className="task-status text-muted d-block text-end">
//                           Status: {task.status}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           !loading && (
//             <div className="col-12 text-center">
//               <p className="text-muted">No projects found.</p>
//             </div>
//           )
//         )}
//       </div>
//       {showTaskDetailsModal && (
//         <TeaminchargeTaskDetailsModal
//           onClose={() => setShowTaskDetailsModal(false)}
//           mode={modalMode}
//           task={taskToEdit}
//           onSubmit={handleModalSubmit} // Pass the handleModalSubmit function to the modal
//         />
//       )}
//        {showStatusEditModal && (
//         <ProjectStatusEditModal
//           onClose={() => setShowStatusEditModal(false)}
//           project={projectToEdit}
//           onSubmit={handleStatusEditSubmit}
//         />
//       )}
//     </section>
//   );
// };

// export default TeaminchargeProjects;
import React, { useState, useEffect } from "react";
import "./Projects.scss";
import { useThemeContext } from "../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";
import TeaminchargeTaskDetailsModal from "./TeaminchargeTaskDetailsModal";
import ProjectStatusEditModal from "./ProjectStatusEditModal"; // Import the modal

const TeaminchargeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [showStatusEditModal, setShowStatusEditModal] = useState(false); // State for status edit modal
  const [modalMode, setModalMode] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null); // State to store the project to edit
  const { applicationColor } = useThemeContext();

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

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing("/emp_get/get_tasks");
      setTasks(response || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTaskClick = (projectId) => {
    setModalMode("add_task");
    setTaskToEdit({ projectId });
    setShowTaskDetailsModal(true);
  };

  const handleEditTaskClick = (task) => {
    setModalMode("edit_task");
    setTaskToEdit(task);
    setShowTaskDetailsModal(true);
  };

  const handleUpdateProjectStatusClick = (project) => {
    setProjectToEdit(project); // Set the selected project
    setShowStatusEditModal(true); // Show the status edit modal
  };

  const handleModalSubmit = async () => {
    await fetchTasks(); // Refresh the tasks after form submission
    setShowTaskDetailsModal(false); // Close the task modal
  };

  const handleStatusEditSubmit = async (updatedProject) => {
    // Make API call to update project status
    await backEndCallObjNothing("/admin/update_project", updatedProject);
    await fetchProjects(); // Refresh the projects after status update
    setShowStatusEditModal(false); // Close the status edit modal
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const getTasksByProjectId = (projectId) => {
    return tasks.filter(task => task.project_id === projectId);
  };

  return (
    <section
      className="roles-table"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
        padding: '2rem',
        borderRadius: '10px',
      }}
    >
      <div className="row">
        <h4>Project Details</h4>
        {loading && <Loader />}
        {projects.length > 0 ? (
          <div className="row">
            {projects.map((project, index) => (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={index}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="admin-controls-card"
                  style={{
                    background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div
                    className="project-header p-3"
                    style={{ backgroundColor: applicationColor.primaryColor, borderRadius: '12px 12px 0 0' }}
                  >
                    <h5 className="project-title m-0">
                      <strong className="text-primary">Project Name:</strong> {project.project_name}
                      <span className="task-status text-muted d-block text-end">{project.project_status}</span>
                    </h5>
                    <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-primary mt-2 "
                      onClick={() => handleAddTaskClick(project.project_id)}
                      style={{ backgroundColor: applicationColor.primaryColor }}
                    >
                      Add Task
                    </button>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleUpdateProjectStatusClick(project)}
                      style={{ backgroundColor: applicationColor.primaryColor }}
                    >
                      Edit Status
                    </button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    {getTasksByProjectId(project.project_id).map((task, index) => (
                      <div
                        className="task-card card mb-3 p-3 rounded-2"
                        key={index}
                        onClick={() => handleEditTaskClick(task)}
                        style={{
                          background: applicationColor.cardBg2,
                          color: applicationColor.readColor2,
                        }}
                      >
                        <div className="d-flex justify-content-between">
                          <span className={`priority-badge priority-${task.priority}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          <span className="due-date text-muted">
                            {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        </div>
                        <h6 className="mt-2">
                          <strong className="text-secondary">Task:</strong> {task.task_name}
                        </h6>
                        <span className="task-status text-muted d-block text-end">
                          Status: {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="col-12 text-center">
              <p className="text-muted">No projects found.</p>
            </div>
          )
        )}
      </div>
      {showTaskDetailsModal && (
        <TeaminchargeTaskDetailsModal
          onClose={() => setShowTaskDetailsModal(false)}
          mode={modalMode}
          task={taskToEdit}
          onSubmit={handleModalSubmit}
        />
      )}
      {showStatusEditModal && (
        <ProjectStatusEditModal
          onClose={() => setShowStatusEditModal(false)}
          project={projectToEdit}
          onSubmit={handleStatusEditSubmit}
        />
      )}
    </section>
  );
};

export default TeaminchargeProjects;
