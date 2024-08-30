import React, { useState, useEffect } from "react";
import "./Projects.scss";
import Draggable from "react-draggable";
import { useThemeContext } from "../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";
import TaskDetailsModal from "./TaskDetailsModal";
import Joi from "joi";
import { toastOptions } from "../../Utils/FakeRoutes";

const EmployeeProjects = () => {
  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { applicationColor } = useThemeContext();
  const [draggedIndex, setDraggedIndex] = useState(null);

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
      console.log(response, "response");
      console.log(response, "response");
      setTasks(response || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const schema = Joi.object({
    task_id: Joi.string().min(5).max(12).required(),
    status: Joi.string()
      .valid("new", "in_progress", "under_review", "completed")
      .required(),
  });

  const handleTaskUpdate = async (updatedTask) => {
    try {
      setLoading(true);
      const { task_id, status } = updatedTask;
      const response = await backEndCallObjNothing("/emp/update_task", {
        task_id,
        status,
      });
      toastOptions.success(response);
      // setTasks(response);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      toastOptions.success(error?.response?.data);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const getTasksByProjectId = (projectId) => {
    return tasks.filter((task) => task.project_id === projectId);
  };
  const handleRefresh = async () => {
    fetchProjects();
    fetchTasks();
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

  return (
    <section
      className="roles-table"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <div className="row mb-5">
        <div className="d-flex justify-content-between align-items-center w-100">
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
                className="col-lg-4 col-md-6 mb-4"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="admin-controls-card"
                  style={{
                    background: applicationColor.cardBg1,
                    color: applicationColor.readColor1,
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div
                    className="project-header p-3"
                    style={{
                      backgroundColor: applicationColor.primaryColor,
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    <h5 className="project-title m-0">
                      <strong className="text-primary">Project Name:</strong>{" "}
                      {project.project_name}
                    </h5>
                  </div>

                  <div
                    className="task-list-container"
                    style={{
                      overflowY: "auto",
                      maxHeight: "200px", // Set a fixed height for the scrollable area
                      // padding: '15px', // Optional padding
                    }}
                  >
                    {/* {getTasksByProjectId(project.project_id).length > 0 ? (
                getTasksByProjectId(project.project_id).map((task, index) => (
                  <div
                    className="task-card card mb-3 rounded-2 card-shadow"
                    key={index}
                    onClick={() => handleTaskClick(task)}
                    style={{
                      color: applicationColor.readColor2,
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <span className={`priority-badge priority-${task.priority}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      <span className="due-date text-muted">
                        Due Date: {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    </div>
                    <h6 className="mt-2">
                      <strong className="text-secondary">Task:</strong> {task.task_name}
                    </h6>
                    <div className="d-flex justify-content-between">
                      <div>
                        {task?.team?.map((member) => (
                          <div key={member.employee_id} className="d-flex align-items-center me-3 mb-2">
                            <div className="profile-img-container me-2">
                              {member.profile_image_url ? (
                                <img
                                  src={member.profile_image_url}
                                  alt={member.employee_name}
                                  className="rounded-circle"
                                />
                              ) : (
                                <span className="profile-icon">{member.employee_name.charAt(0)}</span>
                              )}
                            </div>
                            <span>{member.employee_name}</span>
                            
                          </div>
                          
                        ))}
                       
                      </div>
                    </div>
                    <div className="text-end">
                      <span className={`status-badge priority-${task.status}`}>
                        Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))
              ):( <div className="text-center text-muted">No tasks found.</div>)} */}
                    {getTasksByProjectId(project.project_id).length > 0 ? (
                      getTasksByProjectId(project.project_id).map(
                        (task, index) => (
                          <div
                            className="task-card card mb-3 rounded-2 card-shadow"
                            key={index}
                            onClick={() => handleTaskClick(task)}
                            style={{
                              color: applicationColor.readColor2,
                            }}
                          >
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
                                          style={{
                                            width: "24px",
                                            height: "24px",
                                          }}
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

                                <div
                                  className="text-secondary"
                                  style={{
                                    fontSize: "0.8rem",
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  <p>
                                    <strong>Assigned at: </strong>
                                    {new Date(
                                      task?.assign_track[0]?.assigned_to?.date_time
                                    ).toLocaleString()}
                                  </p>
                                  {task?.modified_by?.length > 0 && (
                                    <span>
                                      {" "}
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
                      )
                    ) : (
                      <div className="text-center text-muted">
                        No tasks found.
                      </div>
                    )}
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
      {showModal && (
        <TaskDetailsModal
          task={selectedTask}
          onUpdate={handleTaskUpdate}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default EmployeeProjects;
