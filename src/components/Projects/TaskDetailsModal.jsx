// import React, { useState, useEffect } from "react";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { Select_inputs } from "../common/ALLINPUTS/AllInputs";

// const TaskDetailsModal = ({ task, onUpdate, onClose }) => {
//   const { applicationColor } = useThemeContext();
//   const [formData, setFormData] = useState(task);

//   useEffect(() => {
//     setFormData(task);
//   }, [task]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(formData);
//   };

//   return (
//     <div
//       className="modal"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         zIndex: 1050,
//       }}
//     >
//       <div
//         className="card"
//         style={{
//           width: "90%",
//           maxWidth: "800px",
//           backgroundColor: "#fff",
//           borderRadius: "0.5rem",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           overflowY: "auto",
//           position: "relative",
//           padding: "1.5rem",
//           maxHeight: "90%",
//         }}
//       >
//         <button
//           type="button"
//           className="close"
//           aria-label="Close"
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: "10px",
//             right: "10px",
//             fontSize: "1.5rem",
//             color: "#000",
//             border: "none",
//             background: "transparent",
//             cursor: "pointer",
//           }}
//         >
//           <span aria-hidden="true">&times;</span>
//         </button>
//         <h5 className="card-title" style={{ marginBottom: "1rem" }}>
//           Task Details - {formData.task_name}
//         </h5>
//         <form className="task-form" onSubmit={handleSubmit}>
//           {/* General Details */}
//           <section style={{ marginBottom: "1.5rem" }}>
//             <h6 style={{ marginBottom: "0.75rem", color: "#333" }}>General Details</h6>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem 1rem" }}>
//               <strong>Task Name:</strong>
//               <div>{formData.task_name}</div>
//               <strong>Description:</strong>
//               <div>{formData.description}</div>
//               <strong>Priority:</strong>
//               <div>{formData.priority}</div>
//               <strong>Status:</strong>
//               <Select_inputs
//                 name="status"
//                 options={["new", "in_progress", "under_review", "completed"]}
//                 value={formData.status}
//                 setForm={setFormData}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   borderColor: applicationColor.primaryBtnBorder,
//                 }}
//               />
//               <strong>Due Date:</strong>
//               <div>{new Date(formData.due_date).toLocaleDateString()}</div>
//             </div>
//           </section>

//           {/* Creator & Team Info */}
//           <section style={{ marginBottom: "1.5rem" }}>
//             <h6 style={{ marginBottom: "0.75rem", color: "#333" }}>Team Information</h6>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem 1rem" }}>
//               <strong>Created By:</strong>
//               <div>
//                 {formData.created_by.email} (ID: {formData.created_by.employee_id})
//               </div>
//               <strong>Assigned To:</strong>
//               <div>
//                 {formData.team.map((member) => (
//                   <div key={member.employee_id}>
//                     {member.employee_name} (ID: {member.employee_id})
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Task Tracking */}
//           <section>
//             <h6 style={{ marginBottom: "0.75rem", color: "#333" }}>Task Tracking</h6>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem 1rem" }}>
//               <strong>Completed Date:</strong>
//               <div>
//                 {formData.completed_date
//                   ? new Date(formData.completed_date).toLocaleDateString()
//                   : "Not completed"}
//               </div>
//               <strong>Created At:</strong>
//               <div>{new Date(formData.createdAt).toLocaleDateString()}</div>
//               <strong>Updated At:</strong>
//               <div>{new Date(formData.updatedAt).toLocaleDateString()}</div>
//             </div>
//           </section>

//           {/* Action Buttons */}
//           <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               style={{
//                 backgroundColor: applicationColor.primaryBtnBg,
//                 borderColor: applicationColor.primaryBtnBorder,
//               }}
//             >
//               Update Task
//             </button>
           
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskDetailsModal;
// import React, { useState, useEffect } from "react";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { Select_inputs } from "../common/ALLINPUTS/AllInputs";

// const TaskDetailsModal = ({ task, onUpdate, onClose }) => {
//   const { applicationColor } = useThemeContext();
//   const [formData, setFormData] = useState(task);
// const[btndisabled,setBtndisabled]=useState(false)
//   useEffect(() => {
//     setFormData(task);
//   }, [task]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     setBtndisabled(true)
//     e.preventDefault();

//     onUpdate(formData);
//     setBtndisabled(false)
//   };

//   return (
//     <div
//   className="modal d-flex justify-content-center align-items-center show"
//   style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
// >
//   <div
//     className="card w-100 shadow"
//     style={{
//       maxWidth: "900px",
//       borderRadius: "0.5rem",
//       maxHeight: "90%",
//       overflowY: "auto",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//     }}
//   >
//     {/* Close Button */}
//     <button
//       type="button"
//       className="btn-close position-absolute top-0 end-0 m-3"
//       aria-label="Close"
//       onClick={onClose}
//     ></button>

//     {/* Header Section */}
//     <div
//       className="card-body p-4"
//       style={{
//         backgroundColor: applicationColor.headerBg,
//         borderTopLeftRadius: "0.5rem",
//         borderTopRightRadius: "0.5rem",
//         color: applicationColor.headerText,
//       }}
//     >
//       <h4 className="mb-4" style={{ fontWeight: "bold" }}>
//         Task Details
//       </h4>

//       {/* Task Name and Description */}
//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <strong>Task Name:</strong>
//           <h5 className="card-title mt-2">
//             {formData.task_name}
//           </h5>
//         </div>
//         <div className="col-md-12 mb-3">
//           <strong>Description:</strong>
//           <div
//             className="p-3 mt-2"
//             style={{
//               border: "1px solid #ced4da",
//               borderRadius: "0.25rem",
//               backgroundColor: "#f8f9fa",
//               minHeight: "100px", // Adjust height here
//             }}
//           >
//             <p className="text-muted mb-0">{formData.description}</p>
//           </div>
//         </div>
//       </div>

//       {/* Status and Priority Section */}
//       <div className="row">
//         <div className="col-md-6">
//           <strong>Status:</strong>
//           <Select_inputs
//             name="status"
//             options={["new", "in_progress", "under_review", "completed"]}
//             value={formData.status}
//             setForm={setFormData}
//             onChange={handleChange}
//             className="form-control mt-2"
//           />
//         </div>
//         <div className="col-md-6 mt-3">
//           <strong>Priority:</strong>
//           <div className="mt-2 p-2 bg-light border rounded text-center">
//             {formData.priority}
//           </div>
//         </div>
//       </div>

//       {/* Team Information and Dates Section */}
//       <div className="row mt-4">
//         {/* Team Information Section */}
//         <div className="col-md-6 mb-3">
//           <h6 className="mb-3" style={{ fontWeight: "600" }}>
//             Team Information
//           </h6>
//           <div className="mb-3">
//             <strong>Created By:</strong>
//             <ul className="pl-3 mt-2">
//               <li>
//                 {formData.created_by.email} (ID: {formData.created_by.employee_id})
//               </li>
//             </ul>
//           </div>
//           <div>
//             <strong>Assigned To:</strong>
//             <ul className="pl-3 mt-2">
//               {formData.team.map((member) => (
//                 <li key={member.employee_id} className="mb-2">
//                   {member.employee_name} (ID: {member.employee_id})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Dates Section */}
//         <div className="col-md-6 mb-3">
//           <h6 className="mb-3" style={{ fontWeight: "600" }}>
//             Task Dates
//           </h6>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Due Date:</strong>
//               <span>{new Date(formData.due_date).toLocaleDateString()}</span>
//             </div>
//             <div className="col-md-6 mb-3">
//               <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Completed Date:</strong>
//               <span>
//                 {formData.completed_date
//                   ? new Date(formData.completed_date).toLocaleDateString()
//                   : "Not completed"}
//               </span>
//             </div>
//             <div className="col-md-6 mb-3">
//               <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Created At:</strong>
//               <span>{new Date(formData.createdAt).toLocaleDateString()}</span>
//             </div>
//             <div className="col-md-6 mb-3">
//               <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Updated At:</strong>
//               <span>{new Date(formData.updatedAt).toLocaleDateString()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="d-flex justify-content-end mt-4">
//         <button
//           type="submit"
//           className="btn btn-primary"
//           style={{
//             backgroundColor: applicationColor.primaryBtnBg,
//             borderColor: applicationColor.primaryBtnBorder,
//             transition: "background-color 0.3s ease",
//           }}
//           onClick={handleSubmit}
//         disabled={btndisabled}
//         >
//           Update Task
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

  
//   );
// };

// export default TaskDetailsModal;
import React, { useState, useEffect } from "react";
import { useThemeContext } from "../Contexts/ThemesContext";
import { Select_inputs } from "../common/ALLINPUTS/AllInputs";

const TaskDetailsModal = ({ task, onUpdate, onClose }) => {
  const { applicationColor } = useThemeContext();
  const [formData, setFormData] = useState(task);
  const [btndisabled, setBtndisabled] = useState(false);

  useEffect(() => {
    setFormData(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (btndisabled) return; // Prevent further submission if already disabled

    setBtndisabled(true);
    onUpdate(formData).finally(() => {
      setBtndisabled(false); // Re-enable the button after the update completes
    });
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
        {/* Close Button */}
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={onClose}
        ></button>

        {/* Header Section */}
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
            Task Details
          </h4>

          {/* Task Name and Description */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <strong>Task Name:</strong>
              <h5 className="card-title mt-2">{formData.task_name}</h5>
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
                <p className="text-muted mb-0">{formData.description}</p>
              </div>
            </div>
          </div>

          {/* Status and Priority Section */}
          <div className="row">
            <div className="col-md-6">
              <strong>Status:</strong>
              <Select_inputs
                name="status"
                options={["new", "in_progress", "under_review", "completed"]}
                value={formData.status}
                setForm={setFormData}
                onChange={handleChange}
                className="form-control mt-2"
              />
            </div>
            <div className="col-md-6 mt-3">
              <strong>Priority:</strong>
              <div className="mt-2 p-2 bg-light border rounded text-center">
                {formData.priority}
              </div>
            </div>
          </div>

          {/* Team Information and Dates Section */}
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
                    {formData.created_by.email} (ID:{" "}
                    {formData.created_by.employee_id})
                  </li>
                </ul>
              </div>
              <div>
                <strong>Assigned To:</strong>
                <ul className="pl-3 mt-2">
                  {formData.team.map((member) => (
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
                    {new Date(formData.due_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                    Completed Date:
                  </strong>
                  <span>
                    {formData.completed_date
                      ? new Date(formData.completed_date).toLocaleDateString()
                      : "Not completed"}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                    Created At:
                  </strong>
                  <span>
                    {new Date(formData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                    Updated At:
                  </strong>
                  <span>
                    {new Date(formData.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: applicationColor.primaryBtnBg,
                borderColor: applicationColor.primaryBtnBorder,
                transition: "background-color 0.3s ease",
              }}
              onClick={handleSubmit}
              disabled={btndisabled}
            >
              {btndisabled ? "Updating..." : "Update Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
