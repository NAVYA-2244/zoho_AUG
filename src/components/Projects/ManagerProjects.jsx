// import React, { useState, useEffect } from "react";
// import "./Projects.scss";
// import { RiEdit2Fill, RiTeamFill } from "react-icons/ri";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import ProjectEditModal from "./ProjectEditModal";
// import TeamAssignmentModal from "./TeamAssignmentModal";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useFunctionContext } from "../Contexts/FunctionContext";
// import Loader from "../Loader/Loader";
// import ManagerProjectModel from "./ManagerprojectModel";
// import TeaminchargeTaskDetailsModal from "./TeaminchargeTaskDetailsModal";

// const ManagerProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
//   const [showStatusEditModal, setShowStatusEditModal] = useState(false); // State for status edit modal
//   const [modalMode, setModalMode] = useState(null);
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const { applicationColor } = useThemeContext();

//   // Fetch all projects
//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       const response = await backEndCallObjNothing("/admin_get/get_projects");

//       console.log("projects",response,)

//       setProjects(response || []);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

// //   useEffect(() => {
// //     fetchProjects();
// //   }, []);
// console.log(projects,"projects")
//   // Handle project edit
//   const handleEdit = (project) => {
//     setCurrentProject(project);
//     setIsFormVisible(true);
//   };

//   // Handle team assignment
//   const handleAssignTeam = (projectId) => {
//     setCurrentProject({ project_id: projectId });
//     setIsTeamModalVisible(true);
//   };
//   const handleEditTaskClick = (task) => {
//     setModalMode("edit_task");
//     setTaskToEdit(task);
//     setShowTaskDetailsModal(true);
//   };
//   const handleAddTaskClick = (projectId) => {
//     setModalMode("add_task");
//     setTaskToEdit({ projectId });
//     setShowTaskDetailsModal(true);
//   };
//   const handleModalSubmit = async () => {
//     await fetchTasks(); // Refresh the tasks after form submission
//     setShowTaskDetailsModal(false); // Close the task modal
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
//   useEffect(() => {
//     fetchProjects();
//     fetchTasks();
//   }, []);
//   const getTasksByProjectId = (projectId) => {
//     return tasks.filter(task => task.project_id === projectId);
//   };

//   return (
//     <section
//       className="company-details"
//       style={{ background: applicationColor.cardBg1 }}
//     >
//       {isFormVisible ? (
//         <ManagerProjectModel
//           project={currentProject}
//           setIsFormVisible={setIsFormVisible}
//           fetchProjects={fetchProjects}
//         />
//       ) : isTeamModalVisible ? (
//         <TeamAssignmentModal
//           projectId={currentProject?.project_id}

//           setIsTeamModalVisible={setIsTeamModalVisible}
//           fetchProjects={fetchProjects}
//         />
//       ) : (
//         <>
//           <div className="row">
//             <div className="mb-4 text-end mt-3">
//               <button
//                 className="btn btn-primary"
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
//                 Add Projects
//               </button>
//             </div>
//                {loading ? (
//               <Loader />
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
//                     <h5>
//                       Project Name:&nbsp;
//                       <span className="text-primary fw-semi-bold">
//                         {project.project_name}
//                         {console.log(project,"projects")}
//                       </span>
//                     </h5>

//                     <button
//                       className="btn btn-primary mt-2 "
//                       onClick={() => handleAddTaskClick(project.project_id)}
//                       style={{ backgroundColor: applicationColor.primaryColor }}
//                     >
//                       Add Task
//                     </button>
//                     {/* <p className="description-box">{project.description}</p>
//                     <p>
//                       {new Date(project.start_date).toLocaleDateString()} -{" "}
//                       {new Date(project.end_date).toLocaleDateString()}
//                     </p> */}
//                     {/* <p className="card-text mb-2">
//                       Status: <span className="fw-bold">{project.status}</span>
//                     </p> */}
//                     {/* <p className="card-text mb-2">
//                       Project Status:{" "}
//                       <span className="fw-bold">{project.project_status}</span>
//                     </p> */}
//                     {/* {project.assign_track && project.assign_track.length > 0 && (
//                       <div className="assign-track mt-3">
//                         <h6>Assigned Team:</h6>
//                         <ul>
//                           {project.assign_track.map((assignment, index) => (
//                             <li key={index}>
//                               <p>
//                                 Assigned by:{" "}
//                                 <strong>
//                                   {assignment.assigned_by?.employee_email || "Unknown"}
//                                 </strong>
//                               </p>
//                               <p>
//                                 Assigned to:{" "}
//                                 <strong>
//                                   {assignment.assigned_to?.employee_name || "Unknown"}
//                                 </strong>
//                               </p>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )} */}
//                     <div className="mt-auto d-flex justify-content-between align-items-center">
//                       <button
//                         className="btn btn-outline-primary btn-sm"
//                         onClick={() => handleEdit(project)}
//                       >
//                         <RiEdit2Fill className="me-1" />
//                         Edit Project
//                       </button>
//                       <button
//                         className="btn btn-outline-success btn-sm"
//                         onClick={() => handleAssignTeam(project.project_id)}
//                       >
//                         <RiTeamFill className="me-1" />
//                         Assign Team
//                       </button>
//                       <div className="row mt-3">
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
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12 text-center">No projects found.</div>
//             )}
//           </div>
//         </>
//       )}
//       {showTaskDetailsModal && (
//         <TeaminchargeTaskDetailsModal
//           onClose={() => setShowTaskDetailsModal(false)}
//           mode={modalMode}
//           task={taskToEdit}
//           onSubmit={handleModalSubmit}
//         />
//       )}
//     </section>
//   );
// };

// export default ManagerProjects;
import React, { useState, useEffect } from "react";
import "./ProjectCord.scss";
import { RiEdit2Fill, RiTeamFill, RiAddFill } from "react-icons/ri";
import { useThemeContext } from "../Contexts/ThemesContext";
import ProjectEditModal from "./ProjectEditModal";
import TeamAssignmentModal from "./TeamAssignmentModal";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";
import TeaminchargeTaskDetailsModal from "./TeaminchargeTaskDetailsModal";
import ManagerEditModel from "./ManagerEditModel";
import Draggable from "react-draggable";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import TeamAssignmentModalteamincharge from "./TeamAssignmentModalteamincharge";
const ManagerProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { applicationColor } = useThemeContext();
  const [formData, setFormData] = useState({ action: "", employee_id: [] });
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
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

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const handleEdit = (project) => {
    setCurrentProject(project);
    setIsFormVisible(true);
  };

  const handleAssignTeam = (projectId) => {
    setCurrentProject({ project_id: projectId });
    setFormData({ action: "add", employee_id: [] }); // Set default action to add
    setIsTeamModalVisible(true);
  };

  const handleRemoveTeam = (project) => {
    // Extract employee IDs from the team array
    const employeeIds = project.team.map((member) =>
      typeof member === "object" ? member.employee_id : member
    );

    setCurrentProject({ project_id: project.project_id });
    setFormData({ action: "remove", employee_id: employeeIds }); // Pass the filtered employee IDs
    setIsTeamModalVisible(true);
  };
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    const newProjects = [...projects];

    const temp = newProjects[index];
    newProjects[index] = newProjects[draggedIndex];
    newProjects[draggedIndex] = temp;

    setProjects(newProjects);

    setDraggedIndex(null);
  };
  const handleEditTaskClick = (task) => {
    setModalMode("edit_task");
    setTaskToEdit(task);
    setShowTaskDetailsModal(true);
  };

  const handleAddTaskClick = (projectId) => {
    setModalMode("add_task");
    setTaskToEdit({ projectId });
    setShowTaskDetailsModal(true);
  };

  const handleModalSubmit = async () => {
    await fetchTasks(); // Refresh the tasks after form submission
    setShowTaskDetailsModal(false); // Close the task modal
  };

  const getTasksByProjectId = (projectId) => {
    return tasks.filter((task) => task.project_id === projectId);
  };
  const handleRefresh = () => {
    fetchProjects();
    fetchTasks();
  };

  const handleAssignTaskTeam = (projectId, taskId) => {
    setCurrentProject({ project_id: projectId, task_id: taskId });
    setFormData({ action: "add", employee_id: [] });
    setShowTeamModal(true);
    setIsTeamModalVisible(true);
  };
  const handleRemoveTaskTeam = (project, task) => {
    const employeeIds = task.team.map((member) =>
      typeof member === "object" ? member.employee_id : member
    );
    setCurrentProject({
      project_id: project.project_id,
      task_id: task.task_id,
    });
    setFormData({ action: "remove", employee_id: employeeIds });
    setShowTeamModal(true);
    setIsTeamModalVisible(true);
  };
  return (
    <section
      className="company-details p-3"
      style={{ background: applicationColor.cardBg1 }}
    >
      {isFormVisible ? (
        <ManagerEditModel
          project={currentProject}
          setIsFormVisible={setIsFormVisible}
          fetchProjects={fetchProjects}
        />
      ) : isTeamModalVisible ? (
        <TeamAssignmentModal
          projectId={currentProject?.project_id}
          assignedEmployees={formData.employee_id} // Pass filtered employee IDs
          setIsTeamModalVisible={setIsTeamModalVisible}
          fetchProjects={fetchProjects}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <>
          <div className="row">
            <div className="d-flex justify-content-between align-items-center w-100 gap-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <h4 className="mb-0">Project Details</h4>
                <div
                  onClick={handleRefresh}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                      style={{ height: "20px", width: "20px" }}
                    ></div>
                  ) : (
                    <i className="ri-loop-right-line text-primary fs-5 cursor-pointer"></i>
                  )}
                </div>
              </div>
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
                Add Project
              </button>
            </div>

            {loading ? (
              <Loader />
            ) : projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  className="col-xl-4 col-md-6 mb-3
                
                
                "
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                >
                  <div
                    className="admin-controls-card"
                    style={{
                      background: applicationColor.cardBg1,
                      color: applicationColor.readColor1,
                    }}
                  >
                    <div className="btn-container mt-3">
                      <h5>
                        Project Name :&nbsp;
                        <span className="text-primary fw-semi-bold">
                          {project.project_name}
                        </span>
                      </h5>
                      <hr />
                    </div>

                    {/* <div className="btn-container mt-3">
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
                      <button
                        className="btn btn-primary btn-sm mt-2"
                        onClick={() => handleAddTaskClick(project.project_id)}
                        style={{
                          backgroundColor: applicationColor.primaryColor,
                        }}
                      >
                        Add Task
                      </button>
                    </div> */}

                    <div className="btn-container d-flex justify-content-end">
                      <button
                        data-tooltip-id={`tooltip-edit-${index}`}
                        data-tooltip-content="Edit Project"
                        className="btn-icon "
                        onClick={() => handleEdit(project)}
                      >
                        <RiEdit2Fill className="fs-5" />
                      </button>
                      {/* 
                      <button
                        data-tooltip-id={`tooltip-assign-${index}`}
                        data-tooltip-content="Assign Team"
                        className="btn-icon"
                        onClick={() => handleAssignTeam(project.project_id)}
                      >
                        <RiTeamFill className="fs-5" />
                      </button> */}
                      <button
                        data-tooltip-id={`tooltip-assign-${index}`}
                        data-tooltip-content="Assign Team"
                        className="btn-icon"
                        onClick={() => handleAssignTeam(project.project_id)}
                      >
                        <RiTeamFill className="fs-5" />
                      </button>

                      <button
                        data-tooltip-id={`tooltip-remove-${index}`}
                        data-tooltip-content="Remove Team Members"
                        className="btn-icon"
                        onClick={() => handleRemoveTeam(project)}
                      >
                        <RiTeamFill className="fs-5" />
                      </button>

                      <button
                        data-tooltip-id={`tooltip-add-${index}`}
                        data-tooltip-content="Add Task"
                        className="btn-icon"
                        onClick={() => handleAddTaskClick(project.project_id)}
                      >
                        <RiAddFill className="fs-5" />
                      </button>
                    </div>
                    <Tooltip id={`tooltip-edit-${index}`} place="top" />
                    <Tooltip id={`tooltip-assign-${index}`} place="top" />
                    <Tooltip id={`tooltip-add-${index}`} place="top" />

                    <div
                      className="task-list-container mt-2"
                      style={{
                        overflowY: "auto",
                        maxHeight: "150px", // Set a fixed height for the scrollable area
                        flex: "1 1 auto",
                      }}
                    >
                      {getTasksByProjectId(project.project_id).map(
                        (task, index) => (
                          <div
                            className="task-card card mb-3 rounded-2 card-shadow"
                            key={index}
                            onClick={() => handleEditTaskClick(task)}
                            style={{
                              color: applicationColor.readColor2,
                            }}
                          >
                            <div className="d-flex">
                              <button
                                id={`tooltip-assign-${index}`}
                                className="btn-icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAssignTaskTeam(
                                    project.project_id,
                                    task.task_id
                                  );
                                }}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                }}
                              >
                                <RiTeamFill
                                  className="fs-5"
                                  style={{
                                    color: "#007bff",
                                    transition: "color 0.3s",
                                  }}
                                />
                                <Tooltip
                                  anchorId={`tooltip-assign-${index}`}
                                  content="Assign Team"
                                  place="top"
                                />
                              </button>

                              <div className="team-meta">
                                <button
                                  id={`tooltip-remove-${index}`}
                                  className="btn-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveTaskTeam(project, task);
                                  }}
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                  }}
                                >
                                  <RiTeamFill
                                    className="fs-5"
                                    style={{
                                      color: "#28a745",
                                      transition: "color 0.3s",
                                    }}
                                  />
                                  <Tooltip
                                    anchorId={`tooltip-remove-${index}`}
                                    content="Remove Team"
                                    place="top"
                                  />
                                </button>
                              </div>

                              {/* Add hover effect using inline style */}
                              <style jsx>{`
                                .btn-icon:hover .fs-5 {
                                  color: #ff6347; /* Change icon color on hover */
                                }
                              `}</style>
                            </div>

                            <div className="d-flex justify-content-between">
                              <span
                                className={`priority-badge priority-${task.priority}`}
                              >
                                {task.priority.charAt(0).toUpperCase() +
                                  task.priority.slice(1)}
                              </span>
                              <span className="due-date text-muted">
                                Due Date:{" "}
                                {new Date(task.due_date).toLocaleDateString()}
                              </span>
                            </div>
                            <h6 className="mt-2">
                              <strong className="text-secondary">Task:</strong>{" "}
                              {task.task_name}
                            </h6>
                            <div className="d-flex justify-content-between">
                              <div>
                                {task?.team?.map((member) => (
                                  <div
                                    key={member.employee_id}
                                    className="d-flex align-items-center me-3 mb-2"
                                  >
                                    <div className="profile-img-container me-2">
                                      {member.profile_image_url ? (
                                        <img
                                          src={member.profile_image_url}
                                          alt={member.employee_name}
                                          className="rounded-circle"
                                        />
                                      ) : (
                                        <span className="profile-icon">
                                          {member.employee_name.charAt(0)}
                                        </span>
                                      )}
                                    </div>
                                    <span>{member.employee_name}</span>
                                  </div>
                                ))}
                                {/* <div className="text-secondary" style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            <p><strong>Assigned at: </strong>{new Date(task?.assign_track[0]?.assigned_to?.date_time).toLocaleString()}</p>
            {task?.modified_by?.length > 0 && (
              <span> <strong>Updated at: </strong> {new Date(task?.updatedAt).toLocaleString()}</span>
            )}
          </div> */}
                                <div
                                  className="text-secondary"
                                  style={{
                                    fontSize: "0.8rem",
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  {task?.assign_track &&
                                  task.assign_track.length > 0 &&
                                  task?.assign_track[0]?.assigned_to
                                    ?.date_time ? (
                                    <p>
                                      <strong>Assigned at: </strong>
                                      {new Date(
                                        task.assign_track[0].assigned_to.date_time
                                      ).toLocaleString()}
                                    </p>
                                  ) : (
                                    <p>
                                      <strong>
                                        This task is not assigned to anyone.
                                      </strong>
                                    </p>
                                  )}

                                  {task?.modified_by?.length > 0 && (
                                    <span>
                                      <strong>Updated at: </strong>{" "}
                                      {new Date(
                                        task?.updatedAt
                                      ).toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <span
                                className={`status-badge priority-${task.status}`}
                              >
                                Status:{" "}
                                {task.status.charAt(0).toUpperCase() +
                                  task.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        )
                      )}
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
      {showTaskDetailsModal && (
        <TeaminchargeTaskDetailsModal
          onClose={() => setShowTaskDetailsModal(false)}
          mode={modalMode}
          task={taskToEdit}
          onSubmit={handleModalSubmit}
        />
      )}
      {isTeamModalVisible && (
        // <TeamAssignmentModalteamincharge
        //   isOpen={showTeamModal}
        //   onClose={handleCloseTeamModal}
        //   formData={formData}
        //   currentProject={currentProject}
        // />
        <TeamAssignmentModalteamincharge
          // projectId={projectId}
          setIsTeamModalVisible={setIsTeamModalVisible}
          fetchProjects={fetchTasks}
          isOpen={showTeamModal}
          formData={formData}
          setFormData={setFormData}
          currentProject={currentProject}
        />
      )}
    </section>
  );
};

export default ManagerProjects;
