import React, { useState, useEffect } from "react";
import "./Projects.scss";
import { RiEdit2Fill, RiTeamFill } from "react-icons/ri";
import { useThemeContext } from "../Contexts/ThemesContext";
import ProjectEditModal from "./ProjectEditModal";
import TeamAssignmentModal from "./TeamAssignmentModal";
import { backEndCallObjNothing } from "../../services/mainService";
import { useFunctionContext } from "../Contexts/FunctionContext";
import Loader from "../Loader/Loader";

const EmployeProjects = () => {
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
            { projects.length > 0 &&
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
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      {/* <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEdit(project)}
                      >
                        <RiEdit2Fill className="me-1" />
                        Edit Project
                      </button> */}
                      {/* <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleAssignTeam(project.project_id)}
                      >
                        <RiTeamFill className="me-1" />
                        Assign Team
                      </button> */}
                    </div>
                  </div>
                </div>
              ))
}
          
          {loading && projects.length > 0 && (<Loader/>)}
          {!loading && projects.length === 0 && (
              <div className="col-12 text-center">No projects found.</div>
            )}
          </div>
           
           
          
        </>
      )}
    </section>
  );
};

export default EmployeProjects;
