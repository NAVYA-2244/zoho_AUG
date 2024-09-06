

import React, { useState, useEffect } from "react";
import { useThemeContext } from "../Contexts/ThemesContext";
import { Date_Input, Input_area, Input_text, Select_inputs } from "../common/ALLINPUTS/AllInputs";
import Joi from "joi";
import Loader from "../Loader/Loader";
import { backEndCallObjNothing } from "../../services/mainService";
import { toastOptions } from "../../Utils/FakeRoutes";
import { useFunctionContext } from "../Contexts/FunctionContext";
import TeamAssignmentModalteamincharge from "./TeamAssignmentModalteamincharge";

const TeaminchargeTaskDetailsModal = ({ onClose, mode, task, onSubmit }) => {
  const { applicationColor } = useThemeContext();
  const isEditMode = mode === "edit_task";
  const [formData, setFormData] = useState({
    project_id: "",
    task_name: "",
    description: "",
    status: "new",
    due_date: "",
    priority: "medium",
    task_status: "active",
    task_id: "",
    completed_date: "",
  });
;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const { checkErrors } = useFunctionContext();

  const schema = {
    project_id: Joi.string().min(5).max(12).required(),
    task_name: Joi.string().min(3).max(50).required(),
    description: Joi.string()
      .min(10)
      .max(200)
      .pattern(/^[A-Za-z0-9\s.,-]+$/, "valid characters")
      .required()
      .messages({
        "string.pattern.base":
          "can only contain letters, numbers, spaces, periods, commas, and hyphens.",
      }),
    status: Joi.string()
      .valid("new", "in_progress", "under_review", "completed","manager")
      .required(),
    due_date: Joi.date().required(),
    priority: Joi.string().valid("high", "medium", "low").required(),
    task_status: Joi.string()
      .valid("active", "in_active", "completed")
      .required(),
    task_id: Joi.string().optional().allow(""),
    completed_date: Joi.date().optional().allow(""),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validate the form data
      await checkErrors(schema, formData);

      // Construct payload for API
      const payload = {
        ...formData,
        project_id: task?.projectId || formData.project_id, // Ensure project_id is set correctly
      };

      const response = await backEndCallObjNothing("/admin/add_update_task", payload);
      toastOptions.success(response);

      onClose();
      onSubmit();
    } catch (error) {
      console.error("API error:", error);
      toastOptions.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAssignTeamClick = () => {
    setShowTeamModal(true);
  };

  useEffect(() => {
    if (mode === "edit_task" && task) {
      setFormData({
        project_id: task.project_id || "",
        task_name: task.task_name || "",
        description: task.description || "",
        status: task.status || "new",
        due_date: task.due_date || "",
        priority: task.priority || "medium",
        task_status: task.task_status || "active",
        task_id: task.task_id || "",
        completed_date: task.completed_date || "",
      });
    } else if (mode === "add_task") {
      // Reset form data for adding a new task
      setFormData({
        project_id: task.projectId,
        task_name: "",
        description: "",
        status: "new",
        due_date: "",
        priority: "medium",
        task_status: "active",
        task_id: "",
        completed_date: "",
      });
    }
  }, [task, mode]);
console.log(task.project_id,"task")
  return (
    <>
      <div
        className="modal d-flex justify-content-center align-items-center show"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
      >
        <div
          className="card w-100 shadow"
          style={{
            maxWidth: "900px",
            borderRadius: "0.5rem",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
      <div className="card-header" style={{ position: 'relative' }}>
      <h5 style={{ textAlign: 'center', width: '100%' }}>
    {isEditMode ? "Edit Task" : "Add Task"}
  </h5>
  <button
    type="button"
    className="btn-close"
    aria-label="Close"
    onClick={onClose}
    style={{ position: 'absolute', top: '10px', left: '10px' }}
  ></button>
 
</div>


          <div className="card-body">
            <form className="project-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-lg-6 col-md-6">
                  <Input_text
                    name="task_name"
                    value={formData.task_name}
                    placeholder="Task Name"
                    onChange={handleChange}
                    setForm={setFormData}
                    maxLength={50}
                    error={errors.task_name}
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6">
                  <Input_area
                    value={formData.description}
                    name="description"
                    placeholder="Description"
                    setForm={setFormData}
                    onChange={handleChange}
                    length={200}
                    error={errors.description}
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6">
                  <Date_Input
                    type="date"
                    value={formData.due_date}
                    name="due_date"
                    placeholder="Due Date"
                    setForm={setFormData}
                    onChange={handleChange}
                    error={errors.due_date}
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6">
                  <Select_inputs
                    name="priority"
                    placeholder="Priority"
                    options={["high", "medium", "low"]}
                    value={formData.priority}
                    setForm={setFormData}
                    onChange={handleChange}
                    error={errors.priority}
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6">
                  <Select_inputs
                    name="status"
                    placeholder="Task Status"
                    options={["new", "in_progress", "under_review", "completed","manager"]}
                    value={formData.status}
                    setForm={setFormData}
                    onChange={handleChange}
                    error={errors.status}
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6">
                  <Select_inputs
                    name="task_status"
                    placeholder="Status"
                    options={["active", "in_active", "completed"]}
                    value={formData.task_status}
                    setForm={setFormData}
                    onChange={handleChange}
                    error={errors.task_status}
                  />
                </div>
              </div>
              {/* <div className="row mt-4">
         
            <div className="col-md-6 mb-3">
              <h6 className="mb-3" style={{ fontWeight: "600" }}>
                Team Information
              </h6>
              <div className="mb-3">
                <strong>Created By:</strong>
                <ul className="pl-3 mt-2">
                  <li>
                    {task?.created_by?.email} (ID:{" "}
                    {task?.created_by?.employee_id})
                  </li>
                </ul>
              </div>
              <div>
                <strong>Assigned To:</strong>
                <ul className="pl-3 mt-2">
                  {task?.team?.map((member) => (
                    <li key={member.employee_id} className="mb-2">
                      {member.employee_name} (ID: {member.employee_id})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            
            <div className="col-md-6 mb-3">
              <h6 className="mb-3" style={{ fontWeight: "600" }}>
                Task Dates
              </h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                    Due Date:
                  </strong>
                  <span>
                    {new Date(task?.due_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                    Completed Date:
                  </strong>
                  <span>
                    {task.completed_date
                      ? new Date(task?.completed_date).toLocaleDateString()
                      : "Not completed"}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                    Created At:
                  </strong>
                  <span>
                    {new Date(task?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                    Updated At:
                  </strong>
                  <span>
                    {new Date(task?.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div> */}
<div className="row">
  {/* Team Information Section */}
  {task?.created_by || task?.team?.length > 0 ? (
    <div className="col-md-6 mb-3">
      <h6 className="mb-3" style={{ fontWeight: "600" }}>
        Team Information
      </h6>
      {task?.created_by && (
        <div className="mb-3">
          <strong>Created By:</strong>
          <ul className="pl-3 mt-2">
            <li>
              {task.created_by.email} (ID: {task.created_by.employee_id})
            </li>
          </ul>
        </div>
      )}
      {task?.team?.length > 0 && (
        <div>
          <strong>Assigned To:</strong>
          <ul className="pl-3 mt-2">
            {task.team.map((member) => (
              <li key={member.employee_id} className="mb-2">
                {member.employee_name} (ID: {member.employee_id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : null}

  {/* Dates Section */}
  {(task?.due_date || task?.completed_date || task?.createdAt || task?.updatedAt) && (
    <div className="col-md-6 mb-3">
      <h6 className="mb-3" style={{ fontWeight: "600" }}>
        Task Dates
      </h6>
      <div className="row">
        {task?.due_date && (
          <div className="col-md-6 mb-3">
            <strong style={{ display: "block", marginBottom: "0.5rem" }}>
              Due Date:
            </strong>
            <span>{new Date(task.due_date).toLocaleDateString()}</span>
          </div>
        )}
        {task?.completed_date && (
          <div className="col-md-6 mb-3">
            <strong style={{ display: "block", marginBottom: "0.5rem" }}>
              Completed Date:
            </strong>
            <span>
              {task.completed_date
                ? new Date(task.completed_date).toLocaleDateString()
                : "Not completed"}
            </span>
          </div>
        )}
        {task?.createdAt && (
          <div className="col-md-6 mb-3">
            <strong style={{ display: "block", marginBottom: "0.5rem" }}>
              Created At:
            </strong>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        )}
        {task?.updatedAt && (
          <div className="col-md-6 mb-3">
            <strong style={{ display: "block", marginBottom: "0.5rem" }}>
              Updated At:
            </strong>
            <span>{new Date(task.updatedAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  )}
</div>

              
              <section className="text-center">
                {/* <button
                  type="button"
                  className="btn btn-secondary mt-2 px-2"
                  onClick={handleAssignTeamClick}
                >
                  Assign Team
                </button> */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary mt-2 px-2"
                >
                  {loading && <Loader />}
                  {isEditMode ? "Update Task" : "Add Task"}
                </button>
              </section>
            </form>
          </div>
        </div>
      </div>

      {/* Team Assignment Modal */}
      {showTeamModal && (
        <TeamAssignmentModalteamincharge
          projectId={task}  // Pass projectId to TeamAssignmentModalteamincharge
          setIsTeamModalVisible={setShowTeamModal}
          fetchProjects={() => {
            // Callback to refresh task details or projects if needed
            onSubmit();
          }} // Add a function to handle fetchProjects if needed
        />
      )}
    </>
  );
};

export default TeaminchargeTaskDetailsModal;


