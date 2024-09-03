import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useFunctionContext } from "../Contexts/FunctionContext";
import { useThemeContext } from "../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Date_Input, Input_area, Input_text, Select_inputs } from "../common/ALLINPUTS/AllInputs";
import { toastOptions } from "../../Utils/FakeRoutes";

const ManagerEditModel = ({ project, setIsFormVisible, fetchProjects }) => {
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
console.log(project,"project")
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
      const response = await backEndCallObjNothing("/admin/add_update_project", formData);
      toastOptions.success(response);
      fetchProjects();
      setIsFormVisible(false);
    } catch (error) {
      console.error("API error:", error);
      toastOptions.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setIsFormVisible(false);
  };

  return (
    // <div
    //   className="modal d-flex justify-content-center align-items-center show"
    //   style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
    // >
    //   <div
    //     className="card w-100 shadow"
    //     style={{
    //       maxWidth: "900px",
    //       borderRadius: "0.5rem",
    //       maxHeight: "90vh",
    //       overflowY: "auto",
    //     }}
    //   >
    //     <div className="card-header" style={{ position: 'relative' }}>
    //       <h5 style={{ textAlign: 'center', width: '100%' }}>
    //         {formData.project_id ? "Edit Project" : "Add New Project"}
    //       </h5>
    //       <button
    //         type="button"
    //         className="btn-close"
    //         aria-label="Close"
    //         onClick={handleGoBack}
    //         style={{ position: 'absolute', top: '10px', left: '10px' }}
    //       ></button>
    //     </div>

    //     <div className="card-body">
    //       <form className="project-form" onSubmit={handleSubmit}>
    //         <div className="row">
    //           <div className="mb-3 col-lg-6 col-md-6">
    //             <Input_text
    //               name="project_name"
    //               value={formData.project_name}
    //               placeholder="Project Name"
    //               onChange={handleChange}
    //               setForm={setFormData}
    //               maxLength={50}
    //               error={errors.project_name}
    //             />
    //           </div>
    //           <div className="mb-3 col-lg-6 col-md-6">
    //             <Input_area
    //               value={formData.description}
    //               name="description"
    //               placeholder="Description"
    //               setForm={setFormData}
    //               onChange={handleChange}
    //               length={200}
    //               error={errors.description}
    //             />
    //           </div>
    //           <div className="mb-3 col-lg-6 col-md-6">
    //             <Date_Input
    //               type="date"
    //               value={formData.start_date}
    //               name="start_date"
    //               placeholder="Start Date"
    //               setForm={setFormData}
    //               onChange={handleChange}
    //               error={errors.start_date}
    //             />
    //           </div>
    //           <div className="mb-3 col-lg-6 col-md-6">
    //             <Date_Input
    //               type="date"
    //               value={formData.end_date}
    //               name="end_date"
    //               placeholder="End Date"
    //               setForm={setFormData}
    //               onChange={handleChange}
    //               error={errors.end_date}
    //             />
    //           </div>
    //           <div className="mb-3 col-lg-6 col-md-6">
    //             <Select_inputs
    //               name="status"
    //               placeholder="Status"
    //               options={["new", "in_progress", "under_review", "completed"]}
    //               value={formData.status}
    //               setForm={setFormData}
    //               onChange={handleChange}
    //               error={errors.status}
    //             />
    //           </div>
    //           <div className="mb-3 col-lg-6 col-md-6">
    //             <Select_inputs
    //               name="project_status"
    //               placeholder="Project Status"
    //               options={["active", "in_active", "completed"]}
    //               value={formData.project_status}
    //               setForm={setFormData}
    //               onChange={handleChange}
    //               error={errors.project_status}
    //             />
    //           </div>
              
    //         </div>
            
    //         {loading && <Loader />}
            
    //         <section className="text-center">
    //           <button
    //             type="submit"
    //             disabled={loading}
    //             className="btn btn-primary mt-2 px-2"
    //           >
    //             {formData.project_id ? "Update Project" : "Add Project"}
    //           </button>
    //         </section>
    //       </form>
    //     </div>
    //   </div>
    // </div>
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
          {formData.project_id ? "Edit Project" : "Add New Project"}
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleGoBack}
          style={{ position: 'absolute', top: '10px', left: '10px' }}
        ></button>
      </div>

      <div className="card-body">
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6">
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
                value={formData.start_date}
                name="start_date"
                placeholder="Start Date"
                setForm={setFormData}
                onChange={handleChange}
                error={errors.start_date}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6">
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
            <div className="mb-3 col-lg-6 col-md-6">
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
            <div className="mb-3 col-lg-6 col-md-6">
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
            <div className="mb-3 col-lg-6 col-md-6">
            {project.assign_track && project.assign_track.length > 0 && (
                    <div className="assign-track mt-3">
                      <h6>Assigned Team:</h6>
                      <ul>
                        {project.assign_track.map((assignment, index) => (
                          <li key={index}>
                         
                            {/* <p>
                              Assigned by:{" "}
                              <strong>
                                {assignment.assigned_by?.employee_email || "Unknown"}
                              </strong>
                            </p> */}
                            <p>
                              Assigned to:{" "}
                              <strong>
                                {assignment.assigned_to?.employee_name || "Unknown"}
                              </strong>
                            </p>
                          </li>
                        ))}
                      </ul>
                    
                    </div>
                  )}
          </div>
          {/* <div className="mb-3 col-lg-6 col-md-6 mt-4">
           
            <h6 className="mb-3" style={{ fontWeight: "600" }}>
              Task Dates
            </h6>
            <div className="row">
                             <div className="col-md-6 mb-3">
              
                <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                  Created At:
                </strong>
                <span>
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="col-md-6 mb-3">
                <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                  Updated At:
                </strong>
                <span>
                  {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
        
          </div> */}
          {project.createdAt || project.updatedAt ? (
<div className="mb-3 col-lg-6 col-md-6 mt-4">
  <h6 className="mb-3" style={{ fontWeight: "600" }}>
    Task Dates
  </h6>
  <div className="row">
    {project.createdAt && (
      <div className="col-md-6 mb-3">
        <strong style={{ display: "block", marginBottom: "0.5rem" }}>
          Created At:
        </strong>
        <span>{new Date(project.createdAt).toLocaleString()}</span>
      </div>
    )}
    {project.updatedAt && (
      <div className="col-md-6 mb-3">
        <strong style={{ display: "block", marginBottom: "0.5rem" }}>
          Updated At:
        </strong>
        <span>{new Date(project.updatedAt).toLocaleString()}</span>
      </div>
    )}
  </div>
</div>
) : null}

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
      </div>
    </div>
  </div>
  );
};

export default ManagerEditModel;
// import React, { useState, useEffect } from "react";
// import Joi from "joi";
// import { useFunctionContext } from "../Contexts/FunctionContext";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../services/mainService";
// import Loader from "../Loader/Loader";
// import { IoArrowBackSharp } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { Date_Input, Input_area, Input_text, Select_inputs } from "../common/ALLINPUTS/AllInputs";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import Projects from './Projects';

// const ManagerEditModel = ({ project, setIsFormVisible, fetchProjects }) => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     status: '',
//     project_status: "active",
//     project_id: "",
//     assign_track: [],
//     modified_by: [],
//     team: [],
//     created_by: {},
//     due_date: "",
//     completed_date: "",
//     createdAt: "",
//     updatedAt: "",
//   });
//   const [errors, setErrors] = useState({});
//   const { checkErrors } = useFunctionContext();
//   const { applicationColor } = useThemeContext();
//   const navigate = useNavigate();

//   const projectschema = {
//     project_name: Joi.string()
//       .min(3)
//       .max(50)
//       .required(),
//     description: Joi.string()
//       .min(10)
//       .max(200)
//       .pattern(/^[A-Za-z0-9\s.,-]+$/, 'valid characters')
//       .required(),
//     start_date: Joi.date().required(),
//     end_date: Joi.date().required().greater(Joi.ref('start_date')),
//     status: Joi.string().valid("new", "in_progress", "under_review", "completed").required(),
//     project_status: Joi.string().valid("active", "in_active", "completed").required(),
//     project_id: Joi.string().optional().allow(""),
//   };

//   useEffect(() => {
//     if (project) {
//       setFormData({
//         project_name: project.project_name || "",
//         description: project.description || "",
//         status: project.status || '',
//         project_status: project.project_status || "active",
//         project_id: project.project_id || "",
//         start_date: project.start_date ? new Date(project.start_date).toISOString().split("T")[0] : "",
//         end_date: project.end_date ? new Date(project.end_date).toISOString().split("T")[0] : "",
//         assign_track: project.assign_track || [],
//         modified_by: project.modified_by || [],
//         team: project.team || [],
//         created_by: project.created_by || {},
//         due_date: project.due_date || "",
//         completed_date: project.completed_date || "",
//         createdAt: project.createdAt || "",
//         updatedAt: project.updatedAt || "",
//       });
//     }
//   }, [project]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       await checkErrors(projectschema, formData);
      
//       const payload = {
//         project_name: formData.project_name,
//         description: formData.description,
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         status: formData.status,
//         project_status: formData.project_status,
//         project_id: formData.project_id,
//               };
    
//       const response = await backEndCallObjNothing("/admin/add_update_project", payload);
//       toastOptions.success(response);
//       fetchProjects();
//       setIsFormVisible(false);
//     } catch (error) {
//       console.error("API error:", error);
//       toastOptions.error(error?.response?.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoBack = () => {
//     setIsFormVisible(false);
//   };

//   return (
//     <div
//       className="modal d-flex justify-content-center align-items-center show"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
//     >
//       <div
//         className="card w-100 shadow"
//         style={{
//           maxWidth: "900px",
//           borderRadius: "0.5rem",
//           maxHeight: "90vh",
//           overflowY: "auto",
//         }}
//       >
//         <div className="card-header" style={{ position: 'relative' }}>
//           <h5 style={{ textAlign: 'center', width: '100%' }}>
//             {formData.project_id ? "Edit Project" : "Add New Project"}
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             aria-label="Close"
//             onClick={handleGoBack}
//             style={{ position: 'absolute', top: '10px', left: '10px' }}
//           ></button>
//         </div>

//         <div className="card-body">
//           <form className="project-form" onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Input_text
//                   name="project_name"
//                   value={formData.project_name}
//                   placeholder="Project Name"
//                   onChange={handleChange}
//                   setForm={setFormData}
//                   maxLength={50}
//                   error={errors.project_name}
//                 />
//               </div>
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Input_area
//                   value={formData.description}
//                   name="description"
//                   placeholder="Description"
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   length={200}
//                   error={errors.description}
//                 />
//               </div>
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Date_Input
//                   type="date"
//                   value={formData.start_date}
//                   name="start_date"
//                   placeholder="Start Date"
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.start_date}
//                 />
//               </div>
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Date_Input
//                   type="date"
//                   value={formData.end_date}
//                   name="end_date"
//                   placeholder="End Date"
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.end_date}
//                 />
//               </div>
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Select_inputs
//                   name="status"
//                   placeholder="Status"
//                   options={["new", "in_progress", "under_review", "completed"]}
//                   value={formData.status}
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.status}
//                 />
//               </div>
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Select_inputs
//                   name="project_status"
//                   placeholder="Project Status"
//                   options={["active", "in_active", "completed"]}
//                   value={formData.project_status}
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.project_status}
//                 />
//               </div>
//             </div>

//             {/* Additional Information Section */}
//             <div className="row mt-4">
//               {/* Team Information Section */}
//               <div className="col-md-6 mb-3">
//                 <h6 className="mb-3" style={{ fontWeight: "600" }}>
//                   Team Information
//                 </h6>
//                 <div className="mb-3">
//                   <strong>Created By:</strong>
//                   <ul className="pl-3 mt-2">
//                     <li>
//                       {formData.created_by.email} (ID:{" "}
//                       {formData.created_by.employee_id})
//                     </li>
//                   </ul>
//                 </div>
//                 <div>
//                   <strong>Assigned To:</strong>
//                   <ul className="pl-3 mt-2">
//                     {formData.team.map((member) => (
//                       <li key={member.employee_id} className="mb-2">
//                         {member.employee_name} (ID: {member.employee_id})
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Dates Section */}
//               <div className="col-md-6 mb-3">
//                 <h6 className="mb-3" style={{ fontWeight: "600" }}>
//                   Task Dates
//                 </h6>
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <strong style={{ display: "block", marginBottom: "0.5rem" }}>
//                       Due Date:
//                     </strong>
//                     <span>
//                       {formData.due_date
//                         ? new Date(formData.due_date).toLocaleDateString()
//                         : "Not specified"}
//                     </span>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <strong style={{ display: "block", marginBottom: "0.5rem" }}>
//                       Completed Date:
//                     </strong>
//                     <span>
//                       {formData.completed_date
//                         ? new Date(formData.completed_date).toLocaleDateString()
//                         : "Not completed"}
//                     </span>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <strong style={{ display: "block", marginBottom: "0.5rem" }}>
//                       Created At:
//                     </strong>
//                     <span>
//                       {new Date(formData.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <strong style={{ display: "block", marginBottom: "0.5rem" }}>
//                       Updated At:
//                     </strong>
//                     <span>
//                       {new Date(formData.updatedAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="d-flex justify-content-center">
//               <button
//                 type="submit"
//                 className={`btn btn-${applicationColor} px-5`}
//               >
//                 {loading ? <Loader /> : "Save"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerEditModel;
