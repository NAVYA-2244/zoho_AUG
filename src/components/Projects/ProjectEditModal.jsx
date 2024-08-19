// // // // import React, { useState } from "react";
// // // // import { RiAttachment2 } from "react-icons/ri";
// // // // import { HiUserCircle } from "react-icons/hi2";
// // // // import ReactQuill from "react-quill";
// // // // import "react-quill/dist/quill.snow.css";

// // // import { Date_Input, Input_area, Input_text } from "../common/ALLINPUTS/AllInputs";
// // // import Modal from "../Modals/Modal";

// // // // const ProjectEditModal = () => {
// // // //   const [description, setDescription] = useState("");
// // // //   const [assignees, setAssignees] = useState(["Sai ramakrishna", "Raghva"]);
// // // //   const [actions, setActions] = useState("");

// // // //   const handleDescriptionChange = (value) => {
// // // //     setDescription(value);
// // // //   };

// // // //   const handleSaveChanges = () => {
// // // //     console.log("Description:", description);
// // // //     console.log("Actions:", actions);
// // // //     console.log("Assignees:", assignees);
// // // //     // Add logic to save changes
// // // //   };

// // // //   return (
// // // //     <div
// // // //       className="modal edit-modal fade"
// // // //       id="exampleModal"
// // // //       tabIndex="-1"
// // // //       aria-labelledby="exampleModalLabel"
// // // //       aria-hidden="true"
// // // //     >
// // // //       <div className="modal-dialog modal-dialog-centered modal-xl">
// // // //         <div className="modal-content">
// // // //           <div className="modal-header border-bottom-0">
// // // //             <button
// // // //               type="button"
// // // //               className="btn-close"
// // // //               data-bs-dismiss="modal"
// // // //               aria-label="Close"
// // // //             ></button>
// // // //           </div>
// // // //           <div className="modal-body">
// // // //             <div className="row">
// // // //               <div className="col-xl-7">
// // // //                 <h4>Project Info Title Here...</h4>
// // // //                 <div className="d-flex align-items-center my-3">
// // // //                   <div className="bg-light p-2 rounded-0">
// // // //                     <RiAttachment2 />
// // // //                     <span>Attach</span>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="mt-5">
// // // //                   <h5 className="fw-semibold">Description</h5>
// // // //                   <ReactQuill
// // // //                     value={description}
// // // //                     onChange={handleDescriptionChange}
// // // //                     placeholder="Type here something.."
// // // //                   />
// // // //                 </div>
// // // //               </div>
// // // //               <div className="col-xl-5">
// // // //                 <div className="dropdown">
// // // //                   <button
// // // //                     className="btn btn-primary btn-sm dropdown-toggle"
// // // //                     type="button"
// // // //                     data-bs-toggle="dropdown"
// // // //                     aria-expanded="false"
// // // //                   >
// // // //                     Actions
// // // //                   </button>
// // // //                   <ul className="dropdown-menu">
// // // //                     <li>
// // // //                       <button
// // // //                         className="dropdown-item text-uppercase"
// // // //                         type="button"
// // // //                         onClick={() => setActions("Inprogress")}
// // // //                       >
// // // //                         Inprogress
// // // //                       </button>
// // // //                     </li>
// // // //                     <li>
// // // //                       <button
// // // //                         className="dropdown-item text-uppercase"
// // // //                         type="button"
// // // //                         onClick={() => setActions("Done")}
// // // //                       >
// // // //                         Done
// // // //                       </button>
// // // //                     </li>
// // // //                   </ul>
// // // //                 </div>
// // // //                 <div className="border mt-4">
// // // //                   <div className="row">
// // // //                     {assignees.map((assignee, index) => (
// // // //                       <React.Fragment key={index}>
// // // //                         <div className="col-5 p-3">
// // // //                           <p className="mb-0">Assignee</p>
// // // //                         </div>
// // // //                         <div className="col-7 p-3">
// // // //                           <div className="d-flex align-items-center">
// // // //                             <HiUserCircle />
// // // //                             <span className="ms-2">{assignee}</span>
// // // //                           </div>
// // // //                         </div>
// // // //                       </React.Fragment>
// // // //                     ))}
// // // //                     <div className="col-5 p-3">
// // // //                       <p className="mb-0">Label</p>
// // // //                     </div>
// // // //                     <div className="col-7 p-3">
// // // //                       <p className="text-muted mb-0">None</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //           <div className="modal-footer border-top-0">
// // // //             <button
// // // //               type="button"
// // // //               className="btn btn-primary"
// // // //               onClick={handleSaveChanges}
// // // //             >
// // // //               Save changes
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectEditModal;
// // // // import React from "react";
// // // // import Modal from "react-bootstrap/Modal";
// // // // import { MdOutlineDone } from "react-icons/md";
// // // // import { RiEdit2Fill } from "import React, { useState } from "react";
// // // import { RiCloseCircleFill } from "react-icons/ri"; // Adjust the import based on your project setup
// // // // import Modal from 'react-bootstrap/Modal'; // Make sure to install react-bootstrap if not already

// // // import React, { useRef } from "react";
// // import { Date_Input, Input_area, Input_text, Select_inputs } from './../common/ALLINPUTS/AllInputs';


// // // const ProjectEditModal = ({
// // //   formData,
// // //   setFormData,
// // //   schema,
// // //   refs,
// // //   handleSubmit,
// // //   setIsFormVisible,
// // //   loading,
// // // }) => {
// // //   return (
// // //     <div show={true} onHide={() => setIsFormVisible(false)}>
// // //       <div div closeButton>
// // //         <h1>Add / Edit Project</h1>
// // //       </div>
// // //       <div>
// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-3">
// // //             <label htmlFor="project_name" className="form-label">
// // //               Project Name
// // //             </label>
// // //             <Input_text
// // //               type={"text"}
// // //               name={"project_name"}
// // //               placeholder={"project Name"}
// // //               value={formData.project_name}
// // //               setForm={setFormData}
// // //               schema={schema.project_name}
// // //               imp={true}
// // //               inputRef={(el) => (refs.current.project_name = el)}
// // //             />
// // //           </div>
// // //           <div className="mb-3">
// // //             <label htmlFor="description" className="form-label">
// // //               Description
// // //             </label>
// // //             <Input_area
// // //               name={"description"}
// // //               placeholder={"description"}
// // //               value={formData.description}
// // //               setForm={setFormData}
// // //               schema={schema.description}
// // //               length={250}
// // //               maxLength={250}
// // //               inputRef={(el) => (refs.current.description = el)}
// // //             ></Input_area>
// // //           </div>
// // //           <div className="mb-3">
// // //             <label htmlFor="start_date" className="form-label">
// // //               Start Date
// // //             </label>
// // //             <Date_Input
// // //               type={"date"}
// // //               name={"start_date"}
// // //               placeholder={"start date"}
// // //               value={formData.start_date}
// // //               setForm={setFormData}
// // //               schema={schema.start_date}
// // //               inputRef={(el) => (refs.current.start_date = el)}
// // //               min={
// // //                 new Date(
// // //                   new Date().getFullYear() - 60,
// // //                   new Date().getMonth(),
// // //                   new Date().getDate()
// // //                 )
// // //                   .toISOString()
// // //                   .split("T")[0]
// // //               }
// // //               max={
// // //                 new Date(
// // //                   new Date().getFullYear() - 21,
// // //                   new Date().getMonth(),
// // //                   new Date().getDate()
// // //                 )
// // //                   .toISOString()
// // //                   .split("T")[0]
// // //               }
// // //               imp
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-3">
// // //             <label htmlFor="end_date" className="form-label">
// // //               End Date
// // //             </label>
// // //             <Date_Input
// // //               type={"date"}
// // //               name={"end_date"}
// // //               placeholder={"end date"}
// // //               value={formData.end_date}
// // //               setForm={setFormData}
// // //               schema={schema.end_date}
// // //               inputRef={(el) => (refs.current.end_date = el)}
// // //               min={
// // //                 new Date(
// // //                   new Date().getFullYear() - 60,
// // //                   new Date().getMonth(),
// // //                   new Date().getDate()
// // //                 )
// // //                   .toISOString()
// // //                   .split("T")[0]
// // //               }
// // //               max={
// // //                 new Date(
// // //                   new Date().getFullYear() - 21,
// // //                   new Date().getMonth(),
// // //                   new Date().getDate()
// // //                 )
// // //                   .toISOString()
// // //                   .split("T")[0]
// // //               }
// // //               imp
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-3">
// // //             <button
// // //               type="submit"
// // //               className="btn btn-primary"
// // //               disabled={loading}
// // //             >
// // //               {loading ? "Saving..." : "Save"}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //       <div>
// // //         <button className="btn btn-secondary" onClick={() => setIsFormVisible(false)}>
// // //           Close
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProjectEditModal;
// // // const ProjectEditModal = ({
// // //   formData,
// // //   setFormData,
// // //   schema,
// // //   refs,
// // //   handleSubmit,
// // //   setIsFormVisible,
// // //   loading,
// // // }) => {
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //   };

// // //   return (
// // //     <div className="modal" show={true} onHide={() => setIsFormVisible(false)}>
// // //       <div className="modal-dialog">
// // //         <div className="modal-content">
// // //           <div className="modal-header">
// // //             <h5 className="modal-title">Add / Edit Project</h5>
// // //             <button type="button" className="btn-close" onClick={() => setIsFormVisible(false)}></button>
// // //           </div>
// // //           <div className="modal-body">
// // //             <form onSubmit={handleSubmit}>
// // //               <div className="mb-3">
// // //                 <label htmlFor="project_name" className="form-label">Project Name</label>
// // //                 <Input_text
// // //                   type="text"
// // //                   name="project_name"
// // //                   placeholder="Project Name"
// // //                   value={formData.project_name}
// // //                   onChange={handleChange}
// // //                   className="form-control"
// // //                   ref={(el) => (refs.current.project_name = el)}
// // //                 />
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="description" className="form-label">Description</label>
// // //                 <Input_area
// // //                   name="description"
// // //                   placeholder="Description"
// // //                   value={formData.description}
// // //                   onChange={handleChange}
// // //                   className="form-control"
// // //                   ref={(el) => (refs.current.description = el)}
// // //                 ></Input_area>
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="start_date" className="form-label">Start Date</label>
// // //                 <Date_Input
// // //                   type="date"
// // //                   name="start_date"
// // //                   value={formData.start_date}
// // //                   onChange={handleChange}
// // //                   className="form-control"
// // //                   ref={(el) => (refs.current.start_date = el)}
// // //                 />
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="end_date" className="form-label">End Date</label>
// // //                 <Date_Input
// // //                   type="date"
// // //                   name="end_date"
// // //                   value={formData.end_date}
// // //                   onChange={handleChange}
// // //                   className="form-control"
// // //                   ref={(el) => (refs.current.end_date = el)}
// // //                 />
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="status" className="form-label">Status</label>
// // //                 <select_inputs
// // //                   name="status"
// // //                   value={formData.status}
// // //                   onChange={handleChange}
// // //                   className="form-control"
// // //                 >
// // //                   <option value="new">New</option>
// // //                   <option value="in_progress">In Progress</option>
// // //                   <option value="under_review">Under Review</option>
// // //                   <option value="completed">Completed</option>
// // //                 </select_inputs>
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="project_status" className="form-label">Project Status</label>
// // //                 <select_inputs
// // //                   name="project_status"
// // //                   value={formData.project_status}
// // //                   onChange={handleChange}
// // //                   className="form-control"
// // //                 >
// // //                   <option value="active">Active</option>
// // //                   <option value="in_active">Inactive</option>
// // //                   <option value="completed">Completed</option>
// // //                 </select_inputs>
// // //               </div>
// // //               <div className="mb-3">
// // //                 <button type="submit" className="btn btn-primary" disabled={loading}>
// // //                   {loading ? "Saving..." : "Save"}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // // export default ProjectEditModal; import React from "react";
// // // import Input_text from "../YourInputTextComponent"; // Replace with actual path
// // // import Input_area from "../YourInputAreaComponent"; // Replace with actual path
// // // import Date_Input from "../YourDateInputComponent"; // Replace with actual path
// // // import Select_inputs from "../YourSelectInputsComponent"; // Replace with actual path

// // // const ProjectEditModal = ({
// // //   formData,
// // //   setFormData,
// // //   schema,
// // //   refs,
// // //   handleSubmit,
// // //   setIsFormVisible,
// // //   loading,
// // // }) => {
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //   };

// // //   return (
// // //     <div className="modal" show={true} onHide={() => setIsFormVisible(false)}>
// // //       <div className="modal-dialog">
// // //         <div className="modal-content">
// // //           <div className="modal-header">
// // //             <h5 className="modal-title">Add / Edit Project</h5>
// // //             <button
// // //               type="button"
// // //               className="btn-close"
// // //               onClick={() => setIsFormVisible(false)}
// // //             ></button>
// // //           </div>
// // //           <div className="modal-body">
// // //             <form onSubmit={handleSubmit}>
// // //               <div className="mb-3">
// // //                 <label htmlFor="project_name" className="form-label">
// // //                   Project Name
// // //                 </label>
// // //                 <Input_text
// // //                   type="text"
// // //                   name="project_name"
// // //                   placeholder="Project Name"
// // //                   value={formData.project_name}
// // //                   setForm={setFormData}
// // //                   schema={schema}
// // //                   fieldName="project_name"
// // //                   inputRef={(el) => (refs.current.project_name = el)}
// // //                 />
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="description" className="form-label">
// // //                   Description
// // //                 </label>
// // //                 <Input_area
// // //                   name="description"
// // //                   placeholder="Description"
// // //                   value={formData.description}
// // //                   setForm={setFormData}
// // //                   schema={schema}
// // //                   fieldName="description"
// // //                   inputRef={(el) => (refs.current.description = el)}
// // //                 />
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="start_date" className="form-label">
// // //                   Start Date
// // //                 </label>
// // //                 {/* <Date_Input
// // //                   type="date"
// // //                   name="start_date"
// // //                   value={formData.start_date}
// // //                   setForm={setFormData}
// // //                   schema={schema}
// // //                   fieldName="start_date"
// // //                   inputRef={(el) => (refs.current.start_date = el)}
// // //                 /> */}
// // //                  <Date_Input
// // //             type={"date"}
// // //             name={"end_date"}
// // //             placeholder={"Date of Birth"}
// // //             value={formData.start_date}
// // //             setForm={setFormData}
// // //             schema={schema.start_date}
// // //             inputRef={(el) => (refs.current.start_date = el)}
// // //             min={
// // //               new Date(
// // //                 new Date().getFullYear() - 60,
// // //                 new Date().getMonth(),
// // //                 new Date().getDate()
// // //               )
// // //                 .toISOString()
// // //                 .split("T")[0]
// // //             }
// // //             max={
// // //               new Date(
// // //                 new Date().getFullYear() - 21,
// // //                 new Date().getMonth(),
// // //                 new Date().getDate()
// // //               )
// // //                 .toISOString()
// // //                 .split("T")[0]
// // //             }
// // //             imp
// // //             required
// // //           />
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="end_date" className="form-label">
// // //                   End Date
// // //                 </label>
// // //                 {/* <Date_Input
// // //                   type="date"
// // //                   name="end_date"
// // //                   value={formData.end_date}
// // //                   setForm={setFormData}
// // //                   schema={schema}
// // //                   fieldName="end_date"
// // //                   inputRef={(el) => (refs.current.end_date = el))}
// // //                 /> */}
// // //                 <Date_Input
// // //             type={"date"}
// // //             name={"end_date"}
// // //             placeholder={"Date of Birth"}
// // //             value={formData.end_date}
// // //             setForm={setFormData}
// // //             schema={schema.end_date}
// // //             inputRef={(el) => (refs.current.end_date = el)}
// // //             min={
// // //               new Date(
// // //                 new Date().getFullYear() - 60,
// // //                 new Date().getMonth(),
// // //                 new Date().getDate()
// // //               )
// // //                 .toISOString()
// // //                 .split("T")[0]
// // //             }
// // //             max={
// // //               new Date(
// // //                 new Date().getFullYear() - 21,
// // //                 new Date().getMonth(),
// // //                 new Date().getDate()
// // //               )
// // //                 .toISOString()
// // //                 .split("T")[0]
// // //             }
// // //             imp
// // //             required
// // //           />
// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="status" className="form-label">
// // //                   Status
// // //                 </label>
// // //                 <Select_inputs
// // //   name="status"
// // //   value={formData.status} // Ensure this is a string or number
// // //   setForm={setFormData}
// // //   schema={schema}
// // //   fieldName="status"
// // //   options={[
// // //     { value: "new", label: "New" },
// // //     { value: "in_progress", label: "In Progress" },
// // //     { value: "under_review", label: "Under Review" },
// // //     { value: "completed", label: "Completed" },
// // //   ]}
// // //   valueProperty="value" // Corresponds to the value to store in formData
// // //   property="label" // Corresponds to the display label in the dropdown
// // //   inputRef={(el) => (refs.current.status = el)}
// // // />

// // //               </div>
// // //               <div className="mb-3">
// // //                 <label htmlFor="project_status" className="form-label">
// // //                   Project Status
// // //                 </label>
// // //                 {/* <Select_inputs
// // //                   name="project_status"
// // //                   value={formData.project_status}
// // //                   setForm={setFormData}
// // //                   schema={schema}
// // //                   fieldName="project_status"
// // //                   options={[
// // //                     { value: "active", label: "Active" },
// // //                     { value: "in_active", label: "Inactive" },
// // //                     { value: "terminated", label: "Terminated" },
// // //                   ]}
// // //                   inputRef={(el) => (refs.current.project_status = el)}
// // //                 /> */}
// // //                 <Select_inputs
// // //   name="project_status"
// // //   value={formData.project_status} // Ensure this is a string or number
// // //   setForm={setFormData}
// // //   schema={schema}
// // //   fieldName="project_status"
// // //   options={[
// // //     { value: "active", label: "active" },
// // //     { value: "in_active", label: " in_active" },
// // //     { value: "terminated", label: "terminated" },
  
// // //   ]}
// // //   valueProperty="value" // Corresponds to the value to store in formData
// // //   property="label" // Corresponds to the display label in the dropdown
// // //   inputRef={(el) => (refs.current.project_status = el)}
// // // />

// // //               </div>
// // //               <div className="mb-3">
// // //                 <button type="submit" className="btn btn-primary" disabled={loading}>
// // //                   {loading ? "Saving..." : "Save"}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProjectEditModal;
// // import React, { useState, useEffect, useRef } from "react";
// // import { IoArrowBackSharp } from "react-icons/io5";
// // import Joi from "joi";
// // // import { Input_text, Input_area, Date_Input, Select_inputs } from "../../../../common/ALLINPUTS/AllInputs";
// // // import Loader from "../../../../Loader/Loader";

// // const ProjectEditModal = (
  
// //  ) => {
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const [projectForm, setProjectForm] = useState({
// //     project_name: "",
// //     description: "",
// //     start_date: "",
// //     end_date: "",
// //     status: "",
// //     project_status: "active",
// //     project_id: "",
// //   });

// //   const schema = {
// //     project_name: Joi.string().min(3).max(50).required(),
// //     description: Joi.string().min(10).max(200).pattern(/^[A-Za-z0-9\s.,-]+$/, 'valid characters').required().messages({
// //       'string.pattern.base': 'can only contain letters, numbers, spaces, periods, commas, and hyphens.',
// //     }),
// //     start_date: Joi.date().required(),
// //     end_date: Joi.date().required(),
// //     status: Joi.string().valid("new", "in_progress", "under_review", "completed").required(),
// //     project_status: Joi.string().valid("active", "in_active", "completed").required(),
// //     project_id: Joi.string().optional().allow(""),
// //   };

// //   const refs = useRef({});
// //   const { checkErrors } = useFunctionContext();
// //   const { applicationColor } = useThemeContext();
// //   const fetchProjectById = async (projectId) => {
// //     try {
// //       const response = await backEndCallObjNothing("/admin_get/get_project_by_id", { project_id: projectId });
// //       setProjectForm(response.project || {});
// //       setSelectedProject(response.project || {});
// //     } catch (error) {
// //       console.error("Error fetching project by ID:", error);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchProjects();
// //   }, []);
// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       setLoading(true);
// //       await checkErrors(projectForm, schema);
// //       const endpoint = projectForm.project_id ? "/admin/add_update_project" : "/admin/add_update_project";
// //       const response = await backEndCallObjNothing(endpoint, projectForm);
// //       setProjects((prevProjects) =>
// //         projectForm.project_id
// //           ? prevProjects.map((proj) => (proj.project_id === response.project_id ? response : proj))
// //           : [...prevProjects, response]
// //       );
// //       setIsFormVisible(false);
// //       setProjectForm({
// //         project_name: "",
// //         description: "",
// //         start_date: "",
// //         end_date: "",
// //         status: "",
// //         project_status: "active",
// //         project_id: "",
// //       });
// //     } catch (error) {
// //       console.error("Validation or API error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="modal" style={{ display: 'block' }}>
// //       <div className="modal-dialog">
// //         <div className="modal-content" style={{ background: 'white', color: 'black' }}>
// //           <div className="modal-header">
// //             <h5 className="modal-title">Add / Edit Project</h5>
// //             <button
// //               type="button"
// //               className="btn-close"
// //               onClick={() => setIsFormVisible(false)}
// //             ></button>
// //           </div>
// //           <div className="modal-body">
// //             <form onSubmit={handleSubmit}>
// //               <div className="mb-3">
// //                 <label htmlFor="project_name" className="form-label">Project Name</label>
// //                 <Input_text
// //                   type="text"
// //                   name="project_name"
// //                   placeholder="Project Name"
// //                   value={formData.project_name}
// //                   setForm={setFormData}
// //                   schema={schema}
// //                   fieldName="project_name"
// //                   inputRef={(el) => (refs.current.project_name = el)}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label htmlFor="description" className="form-label">Description</label>
// //                 <Input_area
// //                   name="description"
// //                   placeholder="Description"
// //                   value={formData.description}
// //                   setForm={setFormData}
// //                   schema={schema}
// //                   fieldName="description"
// //                   inputRef={(el) => (refs.current.description = el)}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label htmlFor="start_date" className="form-label">Start Date</label>
// //                 <Date_Input
// //                   type="date"
// //                   name="start_date"
// //                   value={formData.start_date}
// //                   setForm={setFormData}
// //                   schema={schema}
// //                   fieldName="start_date"
// //                   inputRef={(el) => (refs.current.start_date = el)}
// //                   min={
// //                     new Date(
// //                       new Date().getFullYear() - 60,
// //                       new Date().getMonth(),
// //                       new Date().getDate()
// //                     )
// //                       .toISOString()
// //                       .split("T")[0]
// //                   }
// //                   max={
// //                     new Date(
// //                       new Date().getFullYear() - 21,
// //                       new Date().getMonth(),
// //                       new Date().getDate()
// //                     )
// //                       .toISOString()
// //                       .split("T")[0]
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label htmlFor="end_date" className="form-label">End Date</label>
// //                 <Date_Input
// //                   type="date"
// //                   name="end_date"
// //                   value={formData.end_date}
// //                   setForm={setFormData}
// //                   schema={schema}
// //                   fieldName="end_date"
// //                   inputRef={(el) => (refs.current.end_date = el)}
// //                   min={
// //                     new Date(
// //                       new Date().getFullYear() - 60,
// //                       new Date().getMonth(),
// //                       new Date().getDate()
// //                     )
// //                       .toISOString()
// //                       .split("T")[0]
// //                   }
// //                   max={
// //                     new Date(
// //                       new Date().getFullYear() - 21,
// //                       new Date().getMonth(),
// //                       new Date().getDate()
// //                     )
// //                       .toISOString()
// //                       .split("T")[0]
// //                   }
// //                   required
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label htmlFor="status" className="form-label">Status</label>
// //                 <Select_inputs
// //                   name="status"
// //                   value={formData.status}
// //                   setForm={setFormData}
// //                   schema={schema}
// //                   fieldName="status"
// //                   options={[
// //                     { value: "new", label: "New" },
// //                     { value: "in_progress", label: "In Progress" },
// //                     { value: "under_review", label: "Under Review" },
// //                     { value: "completed", label: "Completed" },
// //                   ]}
// //                   valueProperty="value"
// //                   property="label"
// //                   inputRef={(el) => (refs.current.status = el)}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label htmlFor="project_status" className="form-label">Project Status</label>
// //                 <Select_inputs
// //                   name="project_status"
// //                   value={formData.project_status}
// //                   setForm={setFormData}
// //                   schema={schema}
// //                   fieldName="project_status"
// //                   options={[
// //                     { value: "active", label: "Active" },
// //                     { value: "in_active", label: "Inactive" },
// //                     { value: "terminated", label: "Terminated" },
// //                   ]}
// //                   valueProperty="value"
// //                   property="label"
// //                   inputRef={(el) => (refs.current.project_status = el)}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <button type="submit" className="btn btn-primary" disabled={loading}>
// //                   {loading ? <Loader/> : "Save"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectEditModal;
// import React, { useState, useEffect, useRef } from "react";
// import Joi from "joi";
// import { useFunctionContext } from "../Contexts/FunctionContext";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { Date_Input, Input_area, Input_text, Select_inputs } from "../common/ALLINPUTS/AllInputs";
// import Loader from "../Loader/Loader";

// const ProjectEditModal = ({ project, setIsFormVisible, fetchProjects }) => {
//   // const [formData, setFormData] = useState(project);
//   const [loading, setLoading] = useState(false);
  
//   const projectschema = {
//     project_name: Joi.string().min(3).max(50).required(),
//     description: Joi.string()
//       .min(10)
//       .max(200)
//       .pattern(/^[A-Za-z0-9\s.,-]+$/, 'valid characters')
//       .required()
//       .messages({
//         'string.pattern.base': 'Description can only contain letters, numbers, spaces, periods, commas, and hyphens.',
//       }),
//     start_date: Joi.date().required(),
//     end_date: Joi.date().required(),
//     status: Joi.string().valid("new", "in_progress", "under_review", "completed").required(),
//     project_status: Joi.string().valid("active", "inactive", "completed").required(),
//     project_id: Joi.string().optional().allow(""),
//   };

//   const refs = useRef({});
//   const { checkErrors } = useFunctionContext();
//   const { applicationColor } = useThemeContext();

//   // useEffect(() => {
//   //   setFormData(project);
//   // }, [project]);
//   const [formData, setFormData] = useState(() => ({
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     status: '',
//     project_status: "active",
//     project_id:"",
//   }));
//   useEffect(() => {
//     if (project) {
//       // Set formData based on the provided project prop
//       setFormData({
//         project_name: project.project_name || "",
//         description: project.description || "",
//         start_date: project.start_date || "",
//         end_date: project.end_date || "",
//         status: project.status || '',
//         project_status: project.project_status || "active",
//         project_id: project.project_id || "",
//       });
//     }
//   }, [project]);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       setLoading(true);
//       await checkErrors(formData, projectschema);
//       const endpoint = formData.project_id ? "/admin/update_project" : "/admin/add_project";
//       const response = await backEndCallObjNothing(endpoint, formData);
//       fetchProjects();
//       setIsFormVisible(false);
//     } catch (error) {
//       console.error("Validation or API error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal" style={{ display: 'block' }}>
//       <div className="modal-dialog">
//         <div className="modal-content" style={{ background: applicationColor.cardBg1, color: applicationColor.readColor1 }}>
//           <div className="modal-header">
//             <h5 className="modal-title">{formData.project_id ? "Edit Project" : "Add New Project"}</h5>
//             <button type="button" className="btn-close" onClick={() => setIsFormVisible(false)}></button>
//           </div>
//           <div className="modal-body">
//             {loading ? <Loader /> : (
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   {/* <label htmlFor="project_name" className="form-label">Project Name</label> */}
//                   <Input_text
//                     type="text"
//                     name="project_name"
//                     placeholder="Project Name"
//                     value={formData.project_name}
//                     setForm={setFormData}
//                     schema={projectschema.project_name}
//                     fieldName="project_name"
//                     inputRef={(el) => (refs.current.project_name = el)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   {/* <label htmlFor="description" className="form-label">Description</label> */}
//                   <Input_area
//                     name="description"
//                     placeholder="Description"
//                     value={formData.description}
//                     setForm={setFormData}
//                     schema={projectschema.description}
//                     fieldName="description"
//                     inputRef={(el) => (refs.current.description = el)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="start_date" className="form-label">Start Date</label>
//                   <Date_Input
//                     type="date"
//                     name="start_date"
//                     value={formData.start_date}
//                     setForm={setFormData}
//                     schema={projectschema.start_date}
//                     fieldName="start_date"
//                     inputRef={(el) => (refs.current.start_date = el)}
//                     min={
//                       new Date(
//                         new Date().getFullYear() - 60,
//                         new Date().getMonth(),
//                         new Date().getDate()
//                       ).toISOString().split("T")[0]
//                     }
//                     max={
//                       new Date(
//                         new Date().getFullYear() - 21,
//                         new Date().getMonth(),
//                         new Date().getDate()
//                       ).toISOString().split("T")[0]
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="end_date" className="form-label">End Date</label>
//                   <Date_Input
//                     type="date"
//                     name="end_date"
//                     value={formData.end_date}
//                     setForm={setFormData}
//                     schema={projectschema.end_date}
//                     fieldName="end_date"
//                     inputRef={(el) => (refs.current.end_date = el)}
//                     min={
//                       new Date(
//                         new Date().getFullYear() - 60,
//                         new Date().getMonth(),
//                         new Date().getDate()
//                       ).toISOString().split("T")[0]
//                     }
//                     max={
//                       new Date(
//                         new Date().getFullYear() - 21,
//                         new Date().getMonth(),
//                         new Date().getDate()
//                       ).toISOString().split("T")[0]
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="status" className="form-label">Status</label>
//                   <Select_inputs
//                     name="status"
//                     value={formData.status}
//                     setForm={setFormData}
//                     schema={projectschema.status}
//                     fieldName="status"
//                     options={[
//                       { value: "new", label: "New" },
//                       { value: "in_progress", label: "In Progress" },
//                       { value: "under_review", label: "Under Review" },
//                       { value: "completed", label: "Completed" },
//                     ]}
//                     valueProperty="value"
//                     property="label"
//                     inputRef={(el) => (refs.current.status = el)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="project_status" className="form-label">Project Status</label>
//                   <Select_inputs
//                     name="project_status"
//                     value={formData.project_status}
//                     setForm={setFormData}
//                     schema={projectschema.project_status}
//                     fieldName="project_status"
//                     options={[
//                       { value: "active", label: "Active" },
//                       { value: "inactive", label: "Inactive" },
//                       { value: "completed", label: "Completed" },
//                     ]}
//                     valueProperty="value"
//                     property="label"
//                     inputRef={(el) => (refs.current.project_status = el)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <button type="submit" className="btn btn-primary" disabled={loading}>
//                     {loading ? <Loader /> : "Save"}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectEditModal;
// import React, { useState, useEffect, useRef } from "react";
// import Joi from "joi";
// import { useFunctionContext } from "../Contexts/FunctionContext";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { Date_Input, Input_area, Input_text, Select_inputs } from "../common/ALLINPUTS/AllInputs";
// import Loader from "../Loader/Loader";

// const ProjectEditModal = ({ project, setIsFormVisible, fetchProjects }) => {
//   const [loading, setLoading] = useState(false);

//   const projectschema = Joi.object({
//     project_name: Joi.string().min(3).max(50).required(),
//     description: Joi.string()
//       .min(10)
//       .max(200)
//       .pattern(/^[A-Za-z0-9\s.,-]+$/, 'valid characters')
//       .required()
//       .messages({
//         'string.pattern.base': 'Description can only contain letters, numbers, spaces, periods, commas, and hyphens.',
//       }),
//     start_date: Joi.date().required(),
//     end_date: Joi.date().required(),
//     status: Joi.string().valid("new", "in_progress", "under_review", "completed").required(),
//     project_status: Joi.string().valid("active", "inactive", "completed").required(),
//     project_id: Joi.string().optional().allow(""),
//   });

//   const refs = useRef({});
//   const { checkErrors } = useFunctionContext();
//   const { applicationColor } = useThemeContext();

//   const [formData, setFormData] = useState(() => ({
//     project_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     status: '',
//     project_status: "active",
//     project_id:"",
//   }));

//   useEffect(() => {
//     if (project) {
//       setFormData({
//         ...project,
//         start_date: project.start_date ? new Date(project.start_date).toISOString().split("T")[0] : "",
//         end_date: project.end_date ? new Date(project.end_date).toISOString().split("T")[0] : "",
//       });
//     }
//   }, [project]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       setLoading(true);
//       await checkErrors(formData, projectschema);
//       const endpoint = formData.project_id ? "/admin/update_project" : "/admin/add_project";
//       const response = await backEndCallObjNothing(endpoint, formData);
//       fetchProjects();
//       setIsFormVisible(false);
//     } catch (error) {
//       console.error("Validation or API error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal" style={{ display: 'block' }}>
//       <div className="modal-dialog">
//         <div className="modal-content" style={{ background: applicationColor.cardBg1, color: applicationColor.readColor1 }}>
//           <div className="modal-header">
//             <h5 className="modal-title">{formData.project_id ? "Edit Project" : "Add New Project"}</h5>
//             <button type="button" className="btn-close" onClick={() => setIsFormVisible(false)}></button>
//           </div>
//           <div className="modal-body">
//             {loading ? <Loader /> : (
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <Input_text
//                     type="text"
//                     name="project_name"
//                     placeholder="Project Name"
//                     value={formData.project_name}
//                     setForm={setFormData}
//                     schema={projectschema.extract('project_name')}
//                     fieldName="project_name"
//                     inputRef={(el) => (refs.current.project_name = el)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <Input_area
//                     name="description"
//                     placeholder="Description"
//                     value={formData.description}
//                     setForm={setFormData}
//                     schema={projectschema.extract('description')}
//                     fieldName="description"
//                     inputRef={(el) => (refs.current.description = el)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="start_date" className="form-label">Start Date</label>
//                   <Date_Input
//                     type="date"
//                     name="start_date"
//                     value={formData.start_date}
//                     setForm={setFormData}
//                     schema={projectschema.extract('start_date')}
//                     fieldName="start_date"
//                     inputRef={(el) => (refs.current.start_date = el)}
//                     min={new Date(new Date().getFullYear() - 60, 0, 1).toISOString().split("T")[0]}
//                     max={new Date(new Date().getFullYear() - 21, 0, 1).toISOString().split("T")[0]}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="end_date" className="form-label">End Date</label>
//                   <Date_Input
//                     type="date"
//                     name="end_date"
//                     value={formData.end_date}
//                     setForm={setFormData}
//                     schema={projectschema.extract('end_date')}
//                     fieldName="end_date"
//                     inputRef={(el) => (refs.current.end_date = el)}
//                     min={new Date(new Date().getFullYear() - 60, 0, 1).toISOString().split("T")[0]}
//                     max={new Date(new Date().getFullYear() - 21, 0, 1).toISOString().split("T")[0]}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="status" className="form-label">Status</label>
//                   <Select_inputs
//                     name="status"
//                     value={formData.status}
//                     setForm={setFormData}
//                     schema={projectschema.extract('status')}
//                     fieldName="status"
//                     options={[
//                       { value: "new", label: "New" },
//                       { value: "in_progress", label: "In Progress" },
//                       { value: "under_review", label: "Under Review" },
//                       { value: "completed", label: "Completed" },
//                     ]}
//                     valueProperty="value"
//                     property="label"
//                     inputRef={(el) => (refs.current.status = el)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="project_status" className="form-label">Project Status</label>
//                   <Select_inputs
//                     name="project_status"
//                     value={formData.project_status}
//                     setForm={setFormData}
//                     schema={projectschema.extract('project_status')}
//                     fieldName="project_status"
//                     options={[
//                       { value: "active", label: "Active" },
//                       { value: "inactive", label: "Inactive" },
//                       { value: "completed", label: "Completed" },
//                     ]}
//                     valueProperty="value"
//                     property="label"
//                     inputRef={(el) => (refs.current.project_status = el)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <button type="submit" className="btn btn-primary" disabled={loading}>
//                     {loading ? <Loader /> : "Save"}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectEditModal;
import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useFunctionContext } from "../Contexts/FunctionContext";
import { useThemeContext } from "../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";

const ProjectEditModal = ({ project, setIsFormVisible, fetchProjects }) => {
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
 

  const projectschema = Joi.object({
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
  });
  
  useEffect(() => {
    if (project) {
      setFormData({
       
        project_name:project.project_name,
        description: project.description,
       
        status: project.status,
        project_status:project.project_status,
        project_id: project.project_id,
        start_date: project.start_date ? new Date(project.start_date).toISOString().split("T")[0] : "",
        end_date: project.end_date ? new Date(project.end_date).toISOString().split("T")[0] : "",
      });
    }
  }, [project]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" })); // Clear the error for the field being edited
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted"); // Check if the form submission is triggered
    setLoading(true);

    try {
      console.log("Form data before validation:", formData); // Log form data
      const validationResult = projectschema.validate(formData, { abortEarly: false });
      console.log("Validation result:", validationResult); // Log validation result
      
      // if (validationResult.error) {
      //   const errorDetails = validationResult.error.details.reduce((acc, curr) => {
      //     acc[curr.path[0]] = curr.message;
      //     return acc;
      //   }, {});
      //   setErrors(errorDetails);
      //   setLoading(false);
      //   return;
      // }

      setErrors({});
      console.log("Calling API..."); // Before API call

      // Perform the API call to add or update the project
      await backEndCallObjNothing("/admin/add_update_project", formData);
      console.log("API called successfully");

      // Fetch updated project list and close the modal
      fetchProjects();
      setIsFormVisible(false);

    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ background: applicationColor.cardBg1, color: applicationColor.readColor1 }}>
          <div className="modal-header">
            <h5 className="modal-title">{formData.project_id ? "Edit Project" : "Add New Project"}</h5>
            <button type="button" className="btn-close" onClick={() => setIsFormVisible(false)}></button>
          </div>
          <div className="modal-body">
            {loading ? <Loader /> : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="project_name" className="form-label">Project Name</label>
                  <input
                    type="text"
                    name="project_name"
                    id="project_name"
                    className={`form-control ${errors.project_name ? 'is-invalid' : ''}`}
                    placeholder="Project Name"
                    value={formData.project_name}
                    onChange={handleChange}
                    // minLength="3"
                    maxLength="55"
                  />
                  {errors.project_name && <div className="invalid-feedback">{errors.project_name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    // minLength="10"
                    maxLength="200"
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="start_date" className="form-label">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
                    value={formData.start_date}
                    onChange={handleChange}
                    min={new Date(new Date().getFullYear() - 60, 0, 1).toISOString().split("T")[0]}
                    max={new Date(new Date().getFullYear() - 21, 0, 1).toISOString().split("T")[0]}
                   
                  />
                  {errors.start_date && <div className="invalid-feedback">{errors.start_date}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="end_date" className="form-label">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
                    value={formData.end_date}
                    onChange={handleChange}
                    min={new Date(new Date().getFullYear() - 60, 0, 1).toISOString().split("T")[0]}
                    max={new Date(new Date().getFullYear() - 21, 0, 1).toISOString().split("T")[0]}
                  
                  />
                  {errors.end_date && <div className="invalid-feedback">{errors.end_date}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    name="status"
                    id="status"
                    className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="under_review">Under Review</option>
                    <option value="completed">Completed</option>
                  </select>
                  {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="project_status" className="form-label">Project Status</label>
                  <select
                    name="project_status"
                    id="project_status"
                    className={`form-select ${errors.project_status ? 'is-invalid' : ''}`}
                    value={formData.project_status}
                    onChange={handleChange}
                  >
                    <option value="">Select Project Status</option>
                    <option value="active">Active</option>
                    <option value="in_active">In Active</option>
                    <option value="terminated">Terminated</option>
                  </select>
                  {errors.project_status && <div className="invalid-feedback">{errors.project_status}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditModal;

