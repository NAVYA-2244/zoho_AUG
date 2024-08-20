import React, { useState, useEffect } from "react";
import "./Projects.scss";
import { useThemeContext } from "../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";

const EmployeeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { applicationColor } = useThemeContext();

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing("/admin_get/get_projects");
      console.log(response, "projects");
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

  return (
    <section
      className="company-details"
      style={{ background: applicationColor.cardBg1 }}
    >
      <div className="row">
        <h4 >Project details</h4>
     
      {projects.length > 0 ? (
        <div className="row">
          {projects.map((project, index) => (
            <div className="col-xl-4 col-md-6 mb-4 mt-3" key={index}>
              <div
               className="admin-controls-card"
               style={{
                 background: applicationColor.cardBg1,
                 color: applicationColor.readColor1,
               }}
              >
                <div
                  className="project-header p-3"
                  style={{ backgroundColor: applicationColor.primaryColor }}
                >
                  <h5 className="project-title m-0">
                  <strong className="text-primary">Project Name:</strong> {project.project_name}
                  </h5>
                </div>
                <div className="project-body p-3">
                  <p className="card-text">
                    <strong className="text-primary">Project Id:</strong> {project.project_id}
                  </p>
                  {/* <p className="card-text">
                    <strong className="text-primary">Last Updated:</strong>{" "}
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </p> */}
                  {/* <p className="card-text">
                    <strong className="text-primary">Status:</strong>{" "}
                    <span className="badge bg-success">
                      {project.status}
                    </span>
                  </p> */}
                  {/* <p className="card-text">
                    <strong className="text-primary">Task Name:</strong> {project.task_name}
                  </p> */}
                  {/* <p className="card-text">
                    <strong className="text-primary">Task Status:</strong>{" "}
                    <span className="badge bg-warning">
                      {project.task_status}
                    </span>
                  </p> */}
                  {/* <p className="card-text">
                    <strong className="text-primary ">Team Members:</strong>
                    <ul className="list-unstyled ms-3 mt-2">
                      {project.team.map((member, idx) => (
                        <li key={idx} className="text-muted">
                          {member.employee_name}
                        </li>
                      ))}
                    </ul>
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-12 text-center">
          <p className="text-muted">No projects found.</p>
        </div>
      )}
       {loading && (
        <Loader />
      )}
      </div>
    </section>
  );
};

export default EmployeeProjects;
