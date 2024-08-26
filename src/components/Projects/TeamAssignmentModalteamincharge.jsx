// import React, { useState, useEffect, useRef } from "react";
// import Joi from "joi";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { useFunctionContext } from "../Contexts/FunctionContext";
// import { Select_inputs } from "../common/ALLINPUTS/AllInputs";
// import Loader from "../Loader/Loader";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import { IoArrowBackSharp } from "react-icons/io5";

// const TeamAssignmentModalteamincharge = ({ projectId, setIsTeamModalVisible, fetchProjects }) => {
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     employee_id: "",
//     action: "",
//   });
// const[btndisabled,setBtndisabled]=useState(false)
//   const [errors, setErrors] = useState({});
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const { checkErrors } = useFunctionContext();
//   const { applicationColor } = useThemeContext();
//   const[employees,setEmployees]=useState([])
//   const refs = useRef({});

//   const schema = {
//     action: Joi.string().valid("remove", "add").required(),
//     employee_id: Joi.string().min(5).max(12).required(),
//     project_id: Joi.string().min(5).max(12).required(),
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // setLoading(true);
//     const payload = {
//       action: formData.action,
//       employee_id: formData.employee_id,
//       project_id: projectId,
//     };
//     try {
//         setBtndisabled(true)
//       await checkErrors(schema, payload);
//     const res=  await backEndCallObjNothing("/admin/add_remove_team", payload);
//       toastOptions.success(res);
//       fetchProjects();
//       setIsTeamModalVisible(false);
//       setBtndisabled(false)
//     } catch (error) {
//       console.log(error);
//       setBtndisabled(false)
//       toastOptions.error(error?.response?.data);
//     } finally {
//     //   setLoading(false);
//     setBtndisabled(false)
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

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

//   useEffect(() => {
   
//     getEmployees();
//   }, []);
// const handleGoBack=()=>{
//     setIsTeamModalVisible(false)
// }
//   return (

// <div className="team-assignment-modal">

// <div className="fs-3 mb-3">
//     <IoArrowBackSharp
//       onClick={handleGoBack}
//       style={{ cursor: "pointer" }}
//     />
//   </div>
  
// <div
//   className="admin-controls-card col-lg-6 col-md-8 mx-auto mb-3"
//   style={{
//     background: applicationColor.cardBg1,
//     color: applicationColor.readColor1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     borderRadius: "10px",
//   }}
// >
// <h6 className="mb-2">Assign or Remove Team Member</h6>
//   <p className="text-muted mb-4">
//     Please select the team incharge and action you want to perform.
//   </p>
  
//   <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
//     <div className="mb-3">
//     <Select_inputs
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
//     </div>
//     <div className="mb-3">
//       <Select_inputs
//         name="action"
//         placeholder="Select Action"
//         value={formData.action}
//         options={[
//           { label: "Add", value: "add" },
//           { label: "Remove", value: "remove" },
//         ]}
//         setForm={setFormData}
//         onChange={handleChange}
//         property="label"
//         valueProperty="value"
//         error={errors.action}
//       />
//     </div>
//     <div className="form-button">
//       <button
//         className="py-2 px-3 w-100"
//         type="submit"
//         disabled={btndisabled}
//         style={{
//           background: applicationColor.buttonColor,
//           color: "white",
//         }}
//       >
//         {loading ? <Loader /> : "Submit"}
//       </button>
//     </div>
//   </form>
// </div>
// </div>
//   );
// };

// export default TeamAssignmentModalteamincharge;


// import React, { useState, useEffect } from "react";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../services/mainService";
// import Loader from "../Loader/Loader";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import { Select_inputs } from "../common/ALLINPUTS/AllInputs";

// const TeamAssignmentModalteamincharge = ({ setIsTeamModalVisible, projectId, taskId = "", fetchProjects }) => {
//   const { applicationColor } = useThemeContext();
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     employee_id: "",
//     action: "add",
//   });
//   const [selectedMembers, setSelectedMembers] = useState([]);

// console.log(projectId.task_id,"projectId")

//   const getTeamMembers = async () => {
//     try {
//       setLoading(true);
//       const response = await backEndCallObjNothing("/org/get_employees_by_department");
//       setTeamMembers(response);
//     } catch (error) {
//       console.error("Error fetching team members:", error);
//       toastOptions.error("Failed to fetch team members");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTeamMembers();
//   }, [projectId]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Add selected member to the list with action
//     setSelectedMembers((prevSelected) => [
//       ...prevSelected,
//       {
//         employee_id: formData.employee_id,
//         action: formData.action,
//         project_id:projectId.project_id,
//         task_id:projectId.task_id,  // Provide task_id or leave empty if not provided
//       },
//     ]);

//     // Reset the form fields after adding a member
//     setFormData({ employee_id: "", action: "add" });
//   };

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       // Send the selectedMembers to the backend to assign the team
//       const payload = selectedMembers;
//       await backEndCallObjNothing("/admin/add_remove_team", payload);
//       toastOptions.success("Team members assigned successfully");
//       setIsTeamModalVisible(false);
//       fetchProjects();
//     } catch (error) {
//       console.error("Error assigning team members:", error);
//       toastOptions.error("Failed to assign team members");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div
//       className="modal d-flex justify-content-center align-items-center show"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
//     >
//       <div
//         className="card w-100 shadow"
//         style={{
//           maxWidth: "600px",
//           borderRadius: "0.5rem",
//           maxHeight: "90vh",
//           overflowY: "auto",
//         }}
//       >
//         <div
//           className="card-header"
//           style={{ backgroundColor: applicationColor.primaryColor, color: "#fff" }}
//         >
//           <h5 className="modal-title">Assign Team Members</h5>
//           <button
//             type="button"
//             className="btn-close"
//             aria-label="Close"
//             onClick={() => setIsTeamModalVisible(false)}
//           ></button>
//         </div>
//         <div className="card-body">
//           {loading && <Loader />}
//           <div className="team-members-list">
//             <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
//               <div className="mb-3">
//                 <Select_inputs
//                   name="employee_id"
//                   placeholder="Select Team Incharge"
//                   value={formData.employee_id}
//                   setForm={setFormData}
//                   options={teamMembers.map((member) => ({
//                     value: member.employee_id,
//                     label: `${member.basic_info.first_name} ${member.basic_info.last_name}`,
//                   }))}
//                   property="label"
//                   valueProperty="value"
//                   error={formData.employee_id ? "" : "Please select a member"}
//                 />
//               </div>
//               <div className="mb-3">
//                 <Select_inputs
//                   name="action"
//                   placeholder="Select Action"
//                   value={formData.action}
//                   options={[
//                     { value: "add", label: "Add" },
//                     { value: "remove", label: "Remove" },
//                   ]}
//                   setForm={setFormData}
//                   onChange={handleChange}
//                   property="label"
//                   valueProperty="value"
//                 />
//               </div>
//               <div className="form-button">
//                 <button
//                   className="py-2 px-3 w-100"
//                   type="submit"
//                   disabled={!formData.employee_id}
//                   style={{
//                     background: applicationColor.buttonColor,
//                     color: "white",
//                   }}
//                 >
//                   {loading ? <Loader /> : "Add Member"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="card-footer text-center">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => setIsTeamModalVisible(false)}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={handleSave}
//             disabled={loading || selectedMembers.length === 0}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamAssignmentModalteamincharge;
import React, { useState, useEffect } from "react";
import { useThemeContext } from "../Contexts/ThemesContext";
import { backEndCallObjNothing } from "../../services/mainService";
import Loader from "../Loader/Loader";
import { toastOptions } from "../../Utils/FakeRoutes";
import { Select_inputs } from "../common/ALLINPUTS/AllInputs";
import Joi from "joi";

const TeamAssignmentModalteamincharge = ({ setIsTeamModalVisible, projectId, taskId = "", fetchProjects }) => {
  const { applicationColor } = useThemeContext();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    action: "add",
  });
console.log(projectId,"navya")
  const getTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await backEndCallObjNothing("/org/get_employees_by_department");
      setTeamMembers(response);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toastOptions.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, [projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const memberData = {
      employee_id: formData.employee_id,
      action: formData.action,
      project_id:projectId.project_id,
      task_id: projectId.task_id,  // Provide task_id or leave empty if not provided
    };

    // Send the single member data object directly
    handleSave(memberData);

    // Reset the form fields after adding a member
    setFormData({ employee_id: "", action: "add" });
  };

  const handleSave = async (payload) => {
    try {
      setLoading(true);
      
      const schema = Joi.object({
        action: Joi.string().valid("remove", "add").required(),
        employee_id: Joi.string().min(5).max(12).required(),
        project_id: Joi.string().min(5).max(12).required(),
        task_id: Joi.string().optional().allow(""),
      });

      const { error } = schema.validate(payload);

      if (error) {
        toastOptions.error(`Validation error: ${error.message}`);
        return;
      }

      await backEndCallObjNothing("/admin/add_remove_team", payload);
      fetchProjects();
      toastOptions.success("Team member assigned successfully");
      setIsTeamModalVisible(false);
      fetchProjects();
    } catch (error) {
      console.error("Error assigning team member:", error);
      toastOptions.error("Failed to assign team member");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="modal d-flex justify-content-center align-items-center show"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
    >
      <div
        className="card w-100 shadow"
        style={{
          maxWidth: "600px",
          borderRadius: "0.5rem",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* <div
          className="card-header"
          // style={{ backgroundColor: applicationColor.primaryColor, color: "#fff" }}
        >
          <h5 className="modal-title">Assign Team Member</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setIsTeamModalVisible(false)}
          ></button>
        </div> */}
        <div className="card-header" style={{ position: 'relative' }}>
  <button
     type="button"
     className="btn-close"
     aria-label="Close"
     onClick={() => setIsTeamModalVisible(false)}
    style={{ position: 'absolute', top: '10px', left: '10px' }} // Adjust these values if necessary
  ></button>
  <h5 style={{ textAlign: 'center', margin: '0', paddingLeft: '40px' }}>
  Update Team Member
  </h5>
</div>

        <div className="card-body">
          {/* {loading && <Loader />} */}
          <div className="team-members-list">
            <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
              <div className="mb-3">
                <Select_inputs
                  name="employee_id"
                  placeholder="Select Team Member"
                  value={formData.employee_id}
                  setForm={setFormData}
                  options={teamMembers.map((member) => ({
                    value: member.employee_id,
                    label: `${member.basic_info.first_name} ${member.basic_info.last_name}`,
                  }))}
                  property="label"
                  valueProperty="value"
                  error={formData.employee_id ? "" : "Please select a member"}
                />
              </div>
              <div className="mb-3">
                <Select_inputs
                  name="action"
                  placeholder="Select Action"
                  value={formData.action}
                  options={[
                    { value: "add", label: "Add" },
                    { value: "remove", label: "Remove" },
                  ]}
                  setForm={setFormData}
                  onChange={handleChange}
                  property="label"
                  valueProperty="value"
                />
              </div>
              <div className="form-button">
                <button
                  className="py-2 px-3 w-100"
                  type="submit"
                  disabled={!formData.employee_id}
                  style={{
                    background: applicationColor.buttonColor,
                    color: "white",
                  }}
                >
                  {loading ? <Loader /> : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="card-footer text-center">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsTeamModalVisible(false)}
          >
            Cancel
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TeamAssignmentModalteamincharge;
