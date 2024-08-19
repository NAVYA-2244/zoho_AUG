import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useFunctionContext } from "../Contexts/FunctionContext";
import { useThemeContext } from "../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Date_Input, Input_area, Input_text, Select_inputs } from "../common/ALLINPUTS/AllInputs";

const ProjectEditPage = ({ project, setIsFormVisible, fetchProjects }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: '',
    project_status: "active",
    project_id: "",
  });
  const [errors, setErrors] = useState({});
  const { checkErrors } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const navigate = useNavigate();

  const projectschema = {
    project_name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.min': 'Project name must be at least 3 characters long.',
        'string.max': 'Project name must be at most 50 characters long.',
      }),
    description: Joi.string()
      .min(10)
      .max(200)
      .pattern(/^[A-Za-z0-9\s.,-]+$/, 'valid characters')
      .required()
      .messages({
        'string.min': 'Description must be at least 10 characters long.',
        'string.max': 'Description must be at most 200 characters long.',
        'string.pattern.base': 'Description can only contain letters, numbers, spaces, periods, commas, and hyphens.',
      }),
    start_date: Joi.date().required()
      .messages({
        'date.base': 'Start date is required and must be a valid date.',
      }),
    end_date: Joi.date().required().greater(Joi.ref('start_date'))
      .messages({
        'date.base': 'End date is required and must be a valid date.',
        'date.greater': 'End date must be later than start date.',
      }),
    status: Joi.string().valid("new", "in_progress", "under_review", "completed").required()
      .messages({
        'any.only': 'Status must be one of the following: new, in_progress, under_review, completed.',
      }),
    project_status: Joi.string().valid("active", "in_active", "completed").required()
      .messages({
        'any.only': 'Project status must be one of the following: active, inactive, completed.',
      }),
    project_id: Joi.string().optional().allow(""),
  };

  useEffect(() => {
    if (project) {
      setFormData({
        project_name: project.project_name || "",
        description: project.description || "",
        status: project.status || '',
        project_status: project.project_status || "active",
        project_id: project.project_id || "",
        start_date: project.start_date ? new Date(project.start_date).toISOString().split("T")[0] : "",
        end_date: project.end_date ? new Date(project.end_date).toISOString().split("T")[0] : "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await checkErrors(projectschema, formData);
      await backEndCallObjNothing("/admin/add_update_project", formData);
      fetchProjects();
      setIsFormVisible(false);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setIsFormVisible(false);
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: applicationColor.pageBg, color: applicationColor.textColor }}
    >
      <div className="fs-3 mb-3">
        <button
          onClick={handleGoBack}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <IoArrowBackSharp />
        </button>
      </div>
      {/* <div
        className="admin-controls-card col-lg-6 col-md-8 mx-auto"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          borderRadius: "10px",
        }}
      > */}
        {/* <h6 className="mb-4">
          {formData.project_id ? "Edit Project" : "Add New Project"}
        </h6> */}
        {/* {loading ? <Loader /> : ( */}
          <form className="project-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-3 col-lg-6 col-md-6 ">
                <Input_text
                  name="project_name"
                  value={formData.project_name}
                  placeholder="Project Name"
                  onChange={handleChange}
                  setForm={setFormData}
                  maxLength={50}
                  error={errors.project_name}
                />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 ">
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
                <div className="mb-3 col-lg-6 col-md-6 ">
                <Date_Input
                  type="date"
                  value={formData.start_date}
                  name="start_date"
                  placeholder="Start Date"
                  setForm={setFormData}
                  onChange={handleChange}
                  error={errors.start_date}
                />
                </div>
                <div className=" mb-3 col-lg-6 col-md-6 ">
                <Date_Input
                  type="date"
                  value={formData.end_date}
                  name="end_date"
                  placeholder="End Date"
                  setForm={setFormData}
                  onChange={handleChange}
                  error={errors.end_date}
                />
              </div>
              <div className=" mb-3 col-lg-6 col-md-6">
                <Select_inputs
                  name="status"
                  placeholder="Status"
                  options={["new", "in_progress", "under_review", "completed"]}
                  value={formData.status}
                  setForm={setFormData}
                  onChange={handleChange}
                  error={errors.status}
                />
                </div>
                <div className=" mb-3 col-lg-6 col-md-6">
                <Select_inputs
                  name="project_status"
                  placeholder="Project Status"
                  options={["active", "in_active", "completed"]}
                  value={formData.project_status}
                  setForm={setFormData}
                  onChange={handleChange}
                  error={errors.project_status}
                />
              </div>
            </div>
            {loading && <Loader />}
            <section className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary mt-2 px-2"
              >
                {formData.project_id ? "Update Project" : "Add Project"}
              </button>
            </section>
          </form>
        {/* )} */}
      </div>
    // </div>
  );
};

export default ProjectEditPage;
