import React, { useState, useEffect } from "react";
import "./ProjectCord.scss";
import { useThemeContext } from "../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";
import TeaminchargeTaskDetailsModal from "./TeaminchargeTaskDetailsModal";
import ProjectStatusEditModal from "./ProjectStatusEditModal";
import TeamAssignmentModalteamincharge from "./TeamAssignmentModalteamincharge";
import { RiAddFill, RiEdit2Fill, RiTeamFill } from "react-icons/ri";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { toastOptions } from "../../Utils/FakeRoutes";

const TeaminchargeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [showStatusEditModal, setShowStatusEditModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const { applicationColor } = useThemeContext();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({ action: "add", employee_id: [] });
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [cardHeights, setCardHeights] = useState({});

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
      // toastOptions.success(response)
    } catch (error) {
      toastOptions.success(error.response?.data);
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
    setProjectToEdit(project);
    setShowStatusEditModal(true);
  };

  const handleModalSubmit = async () => {
    await fetchTasks();
    setShowTaskDetailsModal(false);
  };

  const handleStatusEditSubmit = async (updatedProject) => {
    await backEndCallObjNothing("/admin/update_project", updatedProject);
    await fetchProjects();
    setShowStatusEditModal(false);
  };

  const handleAssignTeam = (projectId, taskId) => {
    setCurrentProject({ project_id: projectId, task_id: taskId });
    setFormData({ action: "add", employee_id: [] });
    setShowTeamModal(true);
    setIsTeamModalVisible(true);
  };

  const handleRemoveTeam = (project, task) => {
    const employeeIds = project.team.map((member) =>
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

  const handleCloseTeamModal = () => {
    setShowTeamModal(false);
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const handleRefresh = () => {
    fetchProjects();
    fetchTasks();
  };

  const getTasksByProjectId = (projectId) => {
    return tasks.filter((task) => task.project_id === projectId);
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

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleResize = (index, newHeight) => {
    setCardHeights((prevHeights) => ({
      ...prevHeights,
      [index]: newHeight,
    }));
  };

  return (
    <section
      className="company-details p-3"
      style={{ background: applicationColor.cardBg1 }}
    >
      <div className="row">
        <div className="d-flex justify-content-start align-items-center w-100 gap-2">
          <h4>Project Details</h4>
          <div
            onClick={handleRefresh}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
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
        {projects.length > 0 ? (
          <div className="row">
            {projects.map((project, index) => (
              <div
                className="col-12 col-xl-4 col-lg-6 col-md-12 col-sm-12 mb-4 ps-0 pe-3"
                style={{ cursor: "pointer" }}
                draggable
              >
                <div
                  className="admin-controls-card"
                  style={{
                    background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s, height 0.3s",
                    height: cardHeights[index] || "400px",
                    display: "flex",
                    flexDirection: "column",
                    // overflow: "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div
                    className="project-header"
                    style={{
                      backgroundColor: applicationColor.primaryColor,
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="project-title m-0 p-0">
                        <strong className="text-primary">
                          {project.project_name}
                        </strong>
                      </h5>
                      <div className="btn-container d-flex">
                        <button
                          data-tooltip-id={`tooltip-add-${index}`}
                          data-tooltip-content="Add Task"
                          className="btn-icon"
                          onClick={() => handleAddTaskClick(project.project_id)}
                        >
                          <RiAddFill className="fs-5" />
                        </button>

                        <button
                          data-tooltip-id={`tooltip-edit-${index}`}
                          data-tooltip-content="Edit Status"
                          className="btn-icon"
                          onClick={() =>
                            handleUpdateProjectStatusClick(project)
                          }
                        >
                          <RiEdit2Fill className="fs-5" />
                        </button>
                      </div>
                    </div>
                    <Tooltip id={`tooltip-add-${index}`} place="top" />
                    <Tooltip id={`tooltip-edit-${index}`} place="top" />
                  </div>
                  <div
                    className="task-list-container"
                    style={{
                      overflowY: "auto",
                      flex: "1 1 auto",
                    }}
                  >
                    {getTasksByProjectId(project.project_id).map(
                      (task, index) => (
                        <div
                          className="task-card card mb-3 rounded-2 card-shadow mt-2"
                          key={index}
                          onClick={() => handleEditTaskClick(task)}
                          style={{
                            color: applicationColor.readColor2,
                          }}
                        >
                          <div className="d-flex justify-content-between gap-2 mb-1">
                            <div className="d-flex gap-1">
                              <span
                                className={`priority-badge priority-${task.priority} m-0`}
                              >
                                {task.priority?.charAt(0).toUpperCase() +
                                  task.priority.slice(1)}
                              </span>
                              <span
                                className={`status-badge priority-${task.status} `}
                              >
                                {task.status?.charAt(0).toUpperCase() +
                                  task.status.slice(1)}
                              </span>
                            </div>
                            <span className="due-date text-muted ms-auto">
                              Due:{" "}
                              {new Date(task.due_date).toLocaleDateString()}
                            </span>
                          </div>

                          <h6 className="m-0 mt-2">
                            <strong className="text-secondary">Task : </strong>
                            {task.task_name}
                          </h6>
                          <div className="d-flex justify-content-between mt-1">
                            <div>
                              {task?.team?.map((member) => (
                                <div
                                  key={member.employee_id}
                                  className="d-flex align-items-center me-3"
                                >
                                  <div className="profile-img-container me-1">
                                    {member.profile_image_url ? (
                                      <img
                                        src={member.profile_image_url}
                                        alt={member.employee_name}
                                        className="rounded-circle"
                                      />
                                    ) : (
                                      <span className="profile-icon">
                                        {member.employee_name?.charAt(0)}
                                      </span>
                                    )}
                                  </div>
                                  <span>{member.employee_name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* <div className="d-flex justify-content-between align-items-center mb-1 gap-2"> */}
                          {task?.assign_track &&
                          task.assign_track.length > 0 &&
                          task?.assign_track[0]?.assigned_to?.date_time ? (
                            <span className="due-date text-muted ms-auto">
                              Assigned on:{" "}
                              {new Date(
                                task.assign_track[0].assigned_to.date_time
                              ).toLocaleString()}
                            </span>
                          ) : (
                            <p className=" text-danger ms-auto">
                              This task is not assigned to anyone.
                            </p>
                          )}
                          {/* </div> */}

                          {/* <div className="text-secondary" style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            <p><strong>Assigned at: </strong>{new Date(task?.assign_track[0]?.assigned_to?.date_time).toLocaleString()}</p>
            {task?.modified_by?.length > 0 && (
              <span> <strong>Updated at: </strong> {new Date(task?.updatedAt).toLocaleString()}</span>
            )}
          </div> */}
                          {/* <div
                            className="text-secondary"
                            style={{
                              fontSize: "0.8rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {task?.modified_by?.length > 0 && (
                              <span>
                                <strong>Updated at: </strong>{" "}
                                {new Date(task?.updatedAt).toLocaleString()}
                              </span>
                            )}
                          </div> */}

                          <div className="d-flex justify-content-end mt-1">
                            <button
                              id={`tooltip-assign-${index}`}
                              className="btn-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAssignTeam(
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
                                  handleRemoveTeam(project, task);
                                }}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                }}
                              >
                                <RiTeamFill
                                  className="fs-5"
                                  style={{
                                    color: "rgb(220 60 69)",
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
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div
                  className="resize-handle"
                  style={{
                    height: "10px",
                    background: applicationColor.primaryColor,
                    // background: "red",
                    cursor: "ns-resize", // North-South resize cursor
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const startY = e.clientY;
                    const startHeight = parseInt(
                      document.defaultView.getComputedStyle(
                        e.currentTarget.parentElement
                      ).height,
                      10
                    );
                    const onMouseMove = (moveEvent) => {
                      const newHeight =
                        startHeight + (moveEvent.clientY - startY);
                      handleResize(index, `${newHeight}px`);
                    };
                    const onMouseUp = () => {
                      document.removeEventListener("mousemove", onMouseMove);
                      document.removeEventListener("mouseup", onMouseUp);
                    };
                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", onMouseUp);
                  }}
                />
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
        {loading && <Loader />}
      </div>{" "}
      */}
      {showTaskDetailsModal && (
        <TeaminchargeTaskDetailsModal
          isOpen={showTaskDetailsModal}
          onClose={() => setShowTaskDetailsModal(false)}
          onSubmit={handleModalSubmit}
          task={taskToEdit}
          mode={modalMode}
        />
      )}
      {showStatusEditModal && (
        <ProjectStatusEditModal
          isOpen={showStatusEditModal}
          onClose={() => setShowStatusEditModal(false)}
          onSubmit={handleStatusEditSubmit}
          project={projectToEdit}
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
          fetchProjects={fetchProjects}
          isOpen={showTeamModal}
          formData={formData}
          setFormData={setFormData}
          currentProject={currentProject}
        />
      )}
    </section>
  );
};

export default TeaminchargeProjects;
