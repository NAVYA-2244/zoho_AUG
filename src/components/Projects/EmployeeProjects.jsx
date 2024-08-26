import React, { useState, useEffect } from "react";
import "./Projects.scss";
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
      console.log(response,"response")
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
    status: Joi.string().valid("new", "in_progress", "under_review", "completed").required(),
  });

  const handleTaskUpdate = async (updatedTask) => {
    try {
      setLoading(true);
      const { task_id, status } = updatedTask;
     const response= await backEndCallObjNothing("/emp/update_task", { task_id, status });
toastOptions.success(response)
      await fetchTasks();
       // Refetch tasks to update the list
    } catch (error) {
      console.error("Error updating task:", error);
      toastOptions.success(error?.response?.data)
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
                    </h5>
                  </div>
                  <div className="row mt-3">
                    {getTasksByProjectId(project.project_id).map((task, index) => (
                      <div
                        className="task-card card mb-3 p-3 rounded-2"
                        key={index}
                        onClick={() => handleTaskClick(task)}
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
