// import React, { useState, useEffect } from "react";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { Date_Input, Input_area, Input_text, Select_inputs } from "../common/ALLINPUTS/AllInputs";
// import Joi from "joi";
// import Loader from "../Loader/Loader";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import { useFunctionContext } from "../Contexts/FunctionContext";


// const TeaminchargeTaskDetailsModal = ({ onClose, mode, task, onSubmit }) => {
//   const { applicationColor } = useThemeContext();

//   const isEditMode = mode === "edit_task";

//   const [formData, setFormData] = useState({
//     project_id: task?.projectId || "",
//     task_name: task?.task_name || "",
//     description: task?.description || "",
//     status: task?.status || "new",
//     due_date: task?.due_date || "",
//     priority: task?.priority || "medium",
//     task_status: task?.task_status || "active",
//     task_id: task?.task_id || "",
//     completed_date: task?.completed_date || "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { checkErrors } = useFunctionContext();

//   const schema = {
//     project_id: Joi.string().min(5).max(12).required(),
//     task_name: Joi.string().min(3).max(50).required(),
//     description: Joi.string()
//       .min(10)
//       .max(200)
//       .pattern(/^[A-Za-z0-9\s.,-]+$/, "valid characters")
//       .required()
//       .messages({
//         "string.pattern.base":
//           "can only contain letters, numbers, spaces, periods, commas, and hyphens.",
//       }),
//     status: Joi.string()
//       .valid("new", "in_progress", "under_review", "completed")
//       .required(),
//     due_date: Joi.date().required(),
//     priority: Joi.string().valid("high", "medium", "low").required(),
//     task_status: Joi.string()
//       .valid("active", "in_active", "completed")
//       .required(),
//     task_id: Joi.string().optional().allow(""),
//     completed_date: Joi.date().optional().allow(""),
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       await checkErrors(schema, formData);
//      const response= await backEndCallObjNothing("/admin/add_update_task", formData);
//     toastOptions.success(response)
     
//       // setIsFormVisible(false);
//     } catch (error) {
//       console.error("API error:", error);
//       toastOptions.error(error?.response?.data)
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

 
//   useEffect(() => {
//     setFormData({
//       project_id: task?.projectId || "",
//       task_name: task?.task_name || "",
//       description: task?.description || "",
//       status: task?.status || "new",
//       due_date: task?.due_date || "",
//       priority: task?.priority || "medium",
//       task_status: task?.task_status || "active",
//       task_id: task?.task_id || "",
//       completed_date: task?.completed_date || "",
//     });
//   }, [task]);

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
//         <div
//           className="card-header"
//           style={{ backgroundColor: applicationColor.primaryColor, color: "#fff" }}
//         >
//           <h5 className="modal-title">{isEditMode ? "Edit Task" : "Add Task"}</h5>
//           <button
//             type="button"
//             className="btn-close"
//             aria-label="Close"
//             onClick={onClose}
//           ></button>
//         </div>
//         <div className="card-body">
//           <form className="project-form" onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Input_text
//                   name="task_name"
//                   value={formData.task_name}
//                   placeholder="Task Name"
//                   onChange={handleChange}
//                   setForm={setFormData}
//                   maxLength={50}
//                   error={errors.task_name}
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
//                   value={formData.due_date}
//                   name="due_date"
//                   placeholder="Due Date"
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.due_date}
//                 />
//               </div>
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Select_inputs
//                   name="priority"
//                   placeholder="Priority"
//                   options={["high", "medium", "low"]}
//                   value={formData.priority}
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.priority}
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
//                   name="task_status"
//                   placeholder="Task Status"
//                   options={["active", "in_active", "completed"]}
//                   value={formData.task_status}
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.task_status}
//                 />
//               </div>
//             </div>
//             {loading && <Loader />}
//             <section className="text-center">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn btn-primary mt-2 px-2"
//               >
//                 {isEditMode ? "Update Task" : "Add Task"}
//               </button>
//             </section>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeaminchargeTaskDetailsModal;


// import React, { useState, useEffect } from "react";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { Date_Input, Input_area, Input_text, Select_inputs } from "../common/ALLINPUTS/AllInputs";
// import Joi from "joi";
// import Loader from "../Loader/Loader";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import { useFunctionContext } from "../Contexts/FunctionContext";
// import TeamAssignmentModal from "./TeamAssignmentModal"; // Import your team assignment modal
// import TeamAssignmentModalteamincharge from "./TeamAssignmentModalteamincharge";

// const TeaminchargeTaskDetailsModal = ({ onClose, mode, task, onSubmit }) => {
//   const { applicationColor } = useThemeContext();

//   const isEditMode = mode === "edit_task";
//   const [formData, setFormData] = useState({
//     project_id: task?.projectId || "",
//     task_name: task?.task_name || "",
//     description: task?.description || "",
//     status: task?.status || "new",
//     due_date: task?.due_date || "",
//     priority: task?.priority || "medium",
//     task_status: task?.task_status || "active",
//     task_id: task?.task_id || "",
//     completed_date: task?.completed_date || "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showTeamModal, setShowTeamModal] = useState(false); // State for showing team modal
//   const { checkErrors } = useFunctionContext();
// const[employee,setEmployees]=useState([])
//   const schema = {
//     project_id: Joi.string().min(5).max(12).required(),
//     task_name: Joi.string().min(3).max(50).required(),
//     description: Joi.string()
//       .min(10)
//       .max(200)
//       .pattern(/^[A-Za-z0-9\s.,-]+$/, "valid characters")
//       .required()
//       .messages({
//         "string.pattern.base":
//           "can only contain letters, numbers, spaces, periods, commas, and hyphens.",
//       }),
//     status: Joi.string()
//       .valid("new", "in_progress", "under_review", "completed")
//       .required(),
//     due_date: Joi.date().required(),
//     priority: Joi.string().valid("high", "medium", "low").required(),
//     task_status: Joi.string()
//       .valid("active", "in_active", "completed")
//       .required(),
//     task_id: Joi.string().optional().allow(""),
//     completed_date: Joi.date().optional().allow(""),
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       await checkErrors(schema, formData);
//       const response = await backEndCallObjNothing("/admin/add_update_task", formData);
//       toastOptions.success(response);

//       // Close the modal and call the onSubmit function
//       onClose();
//       onSubmit();
//     } catch (error) {
//       console.error("API error:", error);
//       toastOptions.error(error?.response?.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAssignTeamClick = () => {
//     setShowTeamModal(true);
//   };

//   useEffect(() => {
//     setFormData({
//       project_id: task?.projectId || "",
//       task_name: task?.task_name || "",
//       description: task?.description || "",
//       status: task?.status || "new",
//       due_date: task?.due_date || "",
//       priority: task?.priority || "medium",
//       task_status: task?.task_status || "active",
//       task_id: task?.task_id || "",
//       completed_date: task?.completed_date || "",
//     });
//   }, [task]);
//   const getEmployees = async () => {
//     try {
//       setLoading(true);
//       const response = await backEndCallObjNothing(
//         "/org/get_employees_by_department"
//       );
//       if (response?.length) {
//         setEmployees(response);
//       }
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(()=>{
//     getEmployees()
//   },[])
//   return (
//     <>
//       <div
//         className="modal d-flex justify-content-center align-items-center show"
//         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
//       >
//         <div
//           className="card w-100 shadow"
//           style={{
//             maxWidth: "900px",
//             borderRadius: "0.5rem",
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <div
//             className="card-header"
//             style={{ backgroundColor: applicationColor.primaryColor, color: "#fff" }}
//           >
//             <h5 className="modal-title">{isEditMode ? "Edit Task" : "Add Task"}</h5>
//             <button
//               type="button"
//               className="btn-close"
//               aria-label="Close"
//               onClick={onClose}
//             ></button>
//           </div>
//           <div className="card-body">
//             <form className="project-form" onSubmit={handleSubmit}>
//               <div className="row">
//                 <div className="mb-3 col-lg-6 col-md-6">
//                   <Input_text
//                     name="task_name"
//                     value={formData.task_name}
//                     placeholder="Task Name"
//                     onChange={handleChange}
//                     setForm={setFormData}
//                     maxLength={50}
//                     error={errors.task_name}
//                   />
//                 </div>
//                 <div className="mb-3 col-lg-6 col-md-6">
//                   <Input_area
//                     value={formData.description}
//                     name="description"
//                     placeholder="Description"
//                     setForm={setFormData}
//                     onChange={handleChange}
//                     length={200}
//                     error={errors.description}
//                   />
//                 </div>
//                 <div className="mb-3 col-lg-6 col-md-6">
//                   <Date_Input
//                     type="date"
//                     value={formData.due_date}
//                     name="due_date"
//                     placeholder="Due Date"
//                     setForm={setFormData}
//                     onChange={handleChange}
//                     error={errors.due_date}
//                   />
//                 </div>
//                 <div className="mb-3 col-lg-6 col-md-6">
//                   <Select_inputs
//                     name="priority"
//                     placeholder="Priority"
//                     options={["high", "medium", "low"]}
//                     value={formData.priority}
//                     setForm={setFormData}
//                     onChange={handleChange}
//                     error={errors.priority}
//                   />
//                 </div>
//                 <div className="mb-3 col-lg-6 col-md-6">
//                   <Select_inputs
//                     name="status"
//                     placeholder="Status"
//                     options={["new", "in_progress", "under_review", "completed"]}
//                     value={formData.status}
//                     setForm={setFormData}
//                     onChange={handleChange}
//                     error={errors.status}
//                   />
//                 </div>
//                 <div className="mb-3 col-lg-6 col-md-6">
//                   <Select_inputs
//                     name="task_status"
//                     placeholder="Task Status"
//                     options={["active", "in_active", "completed"]}
//                     value={formData.task_status}
//                     setForm={setFormData}
//                     onChange={handleChange}
//                     error={errors.task_status}
//                   />
//                 </div>
//               </div>
//               {loading && <Loader />}
//               <section className="text-center">
//                 <button
//                   type="button"
//                   className="btn btn-secondary mt-2 px-2"
//                   onClick={handleAssignTeamClick}
//                 >
//                   Assign Team
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="btn btn-primary mt-2 px-2"
//                 >
//                   {isEditMode ? "Update Task" : "Add Task"}
//                 </button>
//               </section>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Team Assignment Modal */}
//       {showTeamModal && (
//         <TeamAssignmentModalteamincharge
//           onClose={() => setShowTeamModal(false)}
//           taskId={formData.task_id}
//         />
//       )}
//     </>
//   );
// };

// export default TeaminchargeTaskDetailsModal;



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
      .valid("new", "in_progress", "under_review", "completed")
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
                    name="task_status"
                    placeholder="Task Status"
                    options={["active", "in_active", "completed"]}
                    value={formData.task_status}
                    setForm={setFormData}
                    onChange={handleChange}
                    error={errors.task_status}
                  />
                </div>
              </div>
              <div className="row mt-4">
            {/* Team Information Section */}
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

            {/* Dates Section */}
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
          </div>

              {loading && <Loader />}
              <section className="text-center">
                <button
                  type="button"
                  className="btn btn-secondary mt-2 px-2"
                  onClick={handleAssignTeamClick}
                >
                  Assign Team
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary mt-2 px-2"
                >
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


// import React, { useEffect, useState } from 'react';
// import Joi from 'joi';
// import { useFunctionContext } from '../Contexts/FunctionContext';
// import { backEndCallObjNothing } from '../../services/mainService';
// import { toastOptions } from '../../Utils/FakeRoutes';
// import { Date_Input, Input_area, Input_text, Select_inputs } from '../common/ALLINPUTS/AllInputs';

// const taskSchema ={
//   task_name: Joi.string().required(),
//   description: Joi.string().optional(),
//   due_date: Joi.date().optional(),
//   priority: Joi.string().valid('high', 'medium', 'low').optional(),
//   status: Joi.string().valid('new', 'in_progress', 'under_review', 'completed').optional(),
//   task_status: Joi.string().valid('active', 'inactive').optional(),
// };

// const TeaminchargeTaskDetailsModal = ({ onClose, mode, task, onSubmit }) => {
//   console.log(task.project_id,"task")
//   const [formData, setFormData] = useState({
//     project_id: task?.project_id || "",
//     task_name: task?.task_name || "",
//     description: task?.description || "",
//     status: task?.status || "new",
//     due_date: task?.due_date || "",
//     priority: task?.priority || "medium",
//     task_status: task?.task_status || "active",
//     task_id: task?.task_id || "",
//     completed_date: task?.completed_date || "",
//     action: "add",
//     employee_id: "",
//   },[task]);

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [employees, setEmployees] = useState([]);
//   const [showAssignTeam, setShowAssignTeam] = useState(false);
//   const { checkErrors } = useFunctionContext();

//   useEffect(() => {
//     getEmployees();
//   }, []);

//   const getEmployees = async () => {
//     try {
//       setLoading(true);
//       const response = await backEndCallObjNothing("/org/get_employees_by_department");
//       if (response?.length) {
//         setEmployees(response);
//       }
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAssign = async () => {
//     setLoading(true);
//     try {
//       await backEndCallObjNothing("/admin/add_remove_team", {
//         action: formData.action,
//         employee_id: formData.employee_id,
//         project_id: formData.project_id,
//         task_id: formData.task_id || "",
//       });
//       toastOptions.success("Team assigned successfully!");
//       setShowAssignTeam(false);
//     } catch (error) {
//       console.error("Error assigning team:", error);
//       toastOptions.error(error?.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (event) => {
//     console.log("hello")
//     event.preventDefault();
//     setLoading(true);
//     console.log("hello")
//     try {
//       // const { error } = taskSchema.validate(formData, { abortEarly: false });
//       // if (error) {
//       //   const errorMessages = error.details.reduce((acc, detail) => {
//       //     acc[detail.path[0]] = detail.message;
//       //     return acc;
//       //   }, {});
//       //   setErrors(errorMessages);
//       //   return;
//       // }

//       const taskResponse = await backEndCallObjNothing("/admin/add_update_task", formData);
//       toastOptions.success(taskResponse);
//       onSubmit();
//       onClose();
//     } catch (error) {
//       console.error("API error:", error);
//       toastOptions.error(error?.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
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
//         <div
//           className="card-header"
//           style={{ backgroundColor: '#007bff', color: "#fff" }}
//         >
//           <h5 className="modal-title">{mode === "edit_task" ? "Edit Task" : "Add Task"}</h5>
//           <button
//             type="button"
//             className="btn-close"
//             aria-label="Close"
//             onClick={onClose}
//           ></button>
//         </div>
//         <div className="card-body">
//           <form className="project-form" onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Input_text
//                   name="task_name"
//                   value={formData.task_name}
//                   placeholder="Task Name"
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   maxLength={50}
//                   error={errors.task_name}
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
//                   value={formData.due_date}
//                   name="due_date"
//                   placeholder="Due Date"
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.due_date}
//                 />
//               </div>
//               <div className="mb-3 col-lg-6 col-md-6">
//                 <Select_inputs
//                   name="priority"
//                   placeholder="Priority"
//                   options={["high", "medium", "low"]}
//                   value={formData.priority}
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.priority}
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
//                   name="task_status"
//                   placeholder="Task Status"
//                   options={["active", "inactive"]}
//                   value={formData.task_status}
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   error={errors.task_status}
//                 />
//               </div>
//             </div>
//             <div className="mb-3">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setShowAssignTeam(!showAssignTeam)}
//               >
//                 {showAssignTeam ? "Hide Assign Team" : "Assign Team"}
//               </button>
//             </div>
//             {showAssignTeam && (
//               <div className="mb-3">
//                  <Select_inputs
//                       name="employee_id"
//                       placeholder="Select Team Incharge"
//                       value={formData.employee_id}
//                       setForm={setFormData}
//                       options={employees.map((employee) => ({
//                         employee_id: employee.employee_id,
//                         displayName: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`,
//                       }))}
//                       property="displayName"
//                       valueProperty="employee_id"
//                       error={errors.employee_id}
//                     />
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={handleAssign}
//                   disabled={loading}
//                 >
//                   {loading ? "Assigning..." : "Assign"}
//                 </button>
//               </div>
//             )}
//             <div className="mb-3 text-center">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : mode === "edit_task" ? "Save Changes" : "Add Task"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeaminchargeTaskDetailsModal;
