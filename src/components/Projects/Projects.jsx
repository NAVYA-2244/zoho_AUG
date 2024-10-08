
import React, { useState, useEffect } from "react";
import "./Projects.scss";
import { RiEdit2Fill, RiTeamFill } from "react-icons/ri";
import { useThemeContext } from "../Contexts/ThemesContext";
import ProjectEditModal from "./ProjectEditModal";
import TeamAssignmentModal from "./TeamAssignmentModal";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useStateContext } from "../Contexts/StateContext";
import { toastOptions } from "../../Utils/FakeRoutes";

const Projects = () => {
  // const [projects, setProjects] = useState([]);
  const { EmployProject, setEmployeProject } = useStateContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [formData, setFormData] = useState({ action: "", employee_id: [] });

  const { applicationColor } = useThemeContext();

  // Fetch all projects
  const fetchProjects = async () => {
   
    try {
      // if (!EmployProject) {
        setLoading(true);
        const response = await backEndCallObjNothing("/admin_get/get_projects");
        setEmployeProject(response || []);
      }
    // } catch (error) {
    //   // console.error("Error fetching projects:", error);
    //   toastOptions.error(error?.response?.data)
    //   toastOptions.error()
    // } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!EmployProject) {
    fetchProjects();
    }
  }, []);

  // Handle project edit
  const handleEdit = (project) => {
    setCurrentProject(project);
    setIsFormVisible(true);
  };

  // Handle team assignment
  const handleAssignTeam = (projectId) => {
    setCurrentProject({ project_id: projectId });
    setFormData({ action: "add", employee_id: [] }); // Set default action to add
    setIsTeamModalVisible(true);
  };

  // Handle team removal
  const handleRemoveTeam = (project) => {
    // Extract employee IDs from the team array
    const employeeIds = project?.team?.map((member) =>
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
    const newProjects = [...EmployProject];
    const temp = newProjects[index];
    newProjects[index] = newProjects[draggedIndex];
    newProjects[draggedIndex] = temp;
    setEmployeProject(newProjects);
    setDraggedIndex(null);
  };
  const handleRefresh =async () => {
    await setEmployeProject(null)
    fetchProjects();
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
          assignedEmployees={formData.employee_id} // Pass filtered employee IDs
          setIsTeamModalVisible={setIsTeamModalVisible}
          fetchProjects={fetchProjects}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <>
          <div className="row">
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
            ) : EmployProject?.length > 0 ? (
              EmployProject?.map((project, index) => (
                <div
                  className="col-xl-4 col-md-6 mb-3"
                  key={project.project_id}
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
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h5>
                      Project Name :&nbsp;
                      <span className="text-primary fw-semi-bold">
                        {project.project_name}
                      </span>
                    </h5>
                    <hr />
                    <div className="btn-container d-flex justify-content-end">
                      <button
                        data-tooltip-id={`tooltip-edit-${index}`}
                        data-tooltip-content="Edit Project"
                        className="btn-icon"
                        onClick={() => handleEdit(project)}
                      >
                        <RiEdit2Fill className="fs-5" />
                      </button>

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
                    </div>
                    <Tooltip id={`tooltip-edit-${index}`} place="top" />
                    <Tooltip id={`tooltip-assign-${index}`} place="top" />
                    <Tooltip id={`tooltip-remove-${index}`} place="top" />
                    <p className="description-box mt-1">
                      {project.description}
                    </p>
                    <p>
                      {new Date(project?.start_date)?.toLocaleDateString('en-GB')} -{" "}
                      {new Date(project?.end_date)?.toLocaleDateString('en-GB')}
                    </p>
                    <p className="card-text mb-2">
                      Status: <span className="fw-bold">{project.status}</span>
                    </p>
                    <p className="card-text mb-2">
                      Project Status:{" "}
                      <span className="fw-bold">{project.project_status}</span>
                    </p>
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
