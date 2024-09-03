import React, { useEffect, useState } from "react";
import { Select_inputs } from "../common/ALLINPUTS/AllInputs";
import { useThemeContext } from "../Contexts/ThemesContext";

const ProjectStatusEditModal = ({ onClose, project, onSubmit }) => {
  const [status, setStatus] = useState(project.status || "");
  const [formData, setFormData] = useState(project);
  const [loading, setLoading] = useState(false); // Loading state to handle button disable
  const { applicationColor } = useThemeContext();

  useEffect(() => {
    setFormData(project);
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    const payload = {
      project_id: project.project_id,
      status,
    };

    try {
      await onSubmit(payload); // Assuming this is the function making the backend calls
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setLoading(false); // Set loading back to false when submission ends
    }
  };

  return (
    <div
      className="modal d-flex justify-content-center align-items-center show"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
    >
      <div
        className="card w-100 shadow"
        style={{
          maxWidth: "900px",
          borderRadius: "0.5rem",
          maxHeight: "90%",
          overflowY: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={onClose}
        ></button>

        <div
          className="card-body p-4"
          style={{
            backgroundColor: applicationColor.headerBg,
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            color: applicationColor.headerText,
          }}
        >
          <h4 className="mb-4" style={{ fontWeight: "bold" }}>
            Project Details
          </h4>

          <div className="row">
            <div className="col-md-6 mb-4">
              <strong>Project Name:</strong>
              <h5 className="card-title mt-2">{project.project_name}</h5>
            </div>
            <div className="col-md-12 mb-3">
              <strong>Description:</strong>
              <div
                className="p-3 mt-2"
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: "0.25rem",
                  backgroundColor: "#f8f9fa",
                  minHeight: "100px",
                }}
              >
                <p className="text-muted mb-0">{project.description}</p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* <div className="col-md-6">
              <strong>Status:</strong>
              <Select_inputs
                name="status"
                options={["new", "in_progress", "under_review", "completed"]}
                value={status}
                setForm={setFormData}
                onChange={(e) => setStatus(e.target.value)}
                className="form-control mt-2"
              />
            </div> */}
            <div className="col-md-6">
              <strong>Status:</strong>
              <Select_inputs
                name="status"
                options={["new", "in_progress", "under_review", "completed"]}
                value={formData.status}
                setForm={setFormData}
                onChange={(e) => setStatus(e.target.value)}
                className="form-control mt-2"
              />
            </div>
            <div className="col-md-6 mt-3">
              {/* <strong>Priority:</strong>
              <div className="mt-2 p-2 bg-light border rounded text-center">
                {project.priority}
               { console.log(project.priority)}
              </div> */}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6 mb-3">
              <h6 className="mb-3" style={{ fontWeight: "600" }}>
                Team Information
              </h6>
              <div className="mb-3">
                <strong>Created By:</strong>
                <ul className="pl-3 mt-2">
                  <li>
                    {project.created_by.email} (ID:{" "}
                    {project.created_by.employee_id})
                  </li>
                </ul>
              </div>
              <div>
                <strong>Assigned To:</strong>
                <ul className="pl-3 mt-2">
                  {project.team.map((member) => (
                    <li key={member.employee_id} className="mb-2">
                      {member.employee_name} (ID: {member.employee_id})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <h6 className="mb-3" style={{ fontWeight: "600" }}>
                Task Dates
              </h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <strong>Due Date:</strong>
                  <span>
                    {new Date(project.due_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Completed Date:</strong>
                  <span>
                    {project.completed_date
                      ? new Date(project.completed_date).toLocaleDateString()
                      : "Not completed"}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Created At:</strong>
                  <span>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Updated At:</strong>
                  <span>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: applicationColor.primaryBtnBg,
                borderColor: applicationColor.primaryBtnBorder,
                transition: "background-color 0.3s ease",
              }}
              onClick={handleSubmit}
              disabled={loading} // Disable the button when loading is true
            >
              {loading ? "Updating..." : "Update "} {/* Show loading text */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusEditModal;
