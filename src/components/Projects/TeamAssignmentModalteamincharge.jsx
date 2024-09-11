
// import React, { useState, useEffect } from "react";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { backEndCallObjNothing } from "../../services/mainService";
// import Loader from "../Loader/Loader";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import { Select_inputs } from "../common/ALLINPUTS/AllInputs";
// import Joi from "joi";

// const TeamAssignmentModalteamincharge = ({ setIsTeamModalVisible, projectId, taskId = "", fetchProjects }) => {
//   const { applicationColor } = useThemeContext();
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     employee_id: "",
//     action: "add",
//   });
// console.log(projectId,"navya")
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

//     const memberData = {
//       employee_id: formData.employee_id,
//       action: formData.action,
//       project_id:projectId.project_id,
//       task_id: projectId.task_id,  // Provide task_id or leave empty if not provided
//     };

//     // Send the single member data object directly
//     handleSave(memberData);

//     // Reset the form fields after adding a member
//     setFormData({ employee_id: "", action: "add" });
//   };

//   const handleSave = async (payload) => {
//     try {
//       setLoading(true);
      
//       const schema = Joi.object({
//         action: Joi.string().valid("remove", "add").required(),
//         employee_id: Joi.string().min(5).max(12).required(),
//         project_id: Joi.string().min(5).max(12).required(),
//         task_id: Joi.string().optional().allow(""),
//       });

//       const { error } = schema.validate(payload);

//       if (error) {
//         toastOptions.error(`Validation error: ${error.message}`);
//         return;
//       }

//     const response= await backEndCallObjNothing("/admin/add_remove_team", payload);
//       fetchProjects();
//       toastOptions.success(response||"Team member assigned successfully");
//       setIsTeamModalVisible(false);
//       fetchProjects();
//     } catch (error) {
//       console.error("Error assigning team member:", error);
//       toastOptions.error(error?.response?.data||"Failed to assign team member");
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
       
//         <div className="card-header" style={{ position: 'relative' }}>
//   <button
//      type="button"
//      className="btn-close"
//      aria-label="Close"
//      onClick={() => setIsTeamModalVisible(false)}
//     style={{ position: 'absolute', top: '10px', left: '10px' }} // Adjust these values if necessary
//   ></button>
//   <h5 style={{ textAlign: 'center', margin: '0', paddingLeft: '40px' }}>
//   Update Team Member
//   </h5>
// </div>

//         <div className="card-body">
//           {/* {loading && <Loader />} */}
//           <div className="team-members-list">
//             <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
//               <div className="mb-3">
//                 <Select_inputs
//                   name="employee_id"
//                   placeholder="Select Team Member"
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
//         {/* <div className="card-footer text-center">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => setIsTeamModalVisible(false)}
//           >
//             Cancel
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default TeamAssignmentModalteamincharge;
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Loader from '../Loader/Loader';
import { backEndCallObjNothing } from '../../services/mainService';
import { toastOptions } from '../../Utils/FakeRoutes';
import { useStateContext } from '../Contexts/StateContext';

const TeamAssignmentModalteamincharge = ({ projectId, setIsTeamModalVisible, fetchProjects, formData, setFormData ,currentProject}) => {
  const [loading, setLoading] = useState(false);
  const {
   
    employeeDetails
  } = useStateContext();
  

  const [filteredEmployees, setFilteredEmployees] = useState([]);
console.log(currentProject.task_id,"current taskid")
console.log(currentProject.project_id,"current projectid")
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        let response
        // {employeeDetails.admin_type === "3"?
         response = await backEndCallObjNothing("/org/get_team_for_task")
// : 
// response = await backEndCallObjNothing("/org/get_team_for_project")
// }

        console.log(response,"response")
          setFilteredEmployees(response);
        
      } catch (error) {
        toastOptions.error(error?.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [projectId]);

  const handleChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      employee_id: selectedOptions ? selectedOptions?.map(option => option.value) : [],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        project_id:currentProject.project_id ,
        task_id:currentProject.task_id,
        action: formData.action,
        employee_id: formData.employee_id,
      };

     const response= await backEndCallObjNothing("/admin/add_remove_team", payload);
      fetchProjects(); // Refresh the projects list
      setIsTeamModalVisible(false)
toastOptions.success(response)
    } catch (error) {
      toastOptions.error(error?.response?.data)
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  // const options = filteredEmployees.map((employee) => ({
  //   label: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`, 
  //   value: employee.employee_id,
  // }));
  const options = filteredEmployees?.map((employee) => {
    const fullName = `${employee.basic_info.first_name} ${employee.basic_info.last_name}`;
    const initials = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
    return {
      label: (
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle text-white d-flex justify-content-center align-items-center me-2"
            style={{
              width: '15px',
              height: '15px',
              backgroundColor: '#007bff', // Theme color or adjust as needed
              fontSize: '8px',
              lineHeight: '1',
            }}
          >
            {employee.basic_info.profile_picture_url ? (
              <img
                src={employee.basic_info.profile_picture_url}
                alt={fullName}
                className="rounded-circle"
                style={{ width: '30px', height: '30px' }}
              />
            ) : (
              initials
            )}
          </div>
          {fullName}
        </div>
      ),
      value: employee.employee_id,
    };
  });

  return (
    <div
      className="modal d-flex justify-content-center align-items-center show"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
    >
      <div
        className="card w-100 shadow"
        style={{
          maxWidth: '600px',
          borderRadius: '0.5rem',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div className="card-header" style={{ position: 'relative', textAlign: 'center' }}>
          <h5>{formData.action === 'add' ? 'Assign Team Members' : 'Remove Team Members'}</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setIsTeamModalVisible(false)}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          ></button>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
            <div className="mb-3">
            <Select
                name="employee_id"
                placeholder="Select Team Incharge"
                options={options}
                isMulti
                // setFormData={formData}
                setForm={setFormData}
                onChange={handleChange}
                value={options?.filter(option => formData.employee_id.includes(option.value))}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: '200px', // Adjust the max height as needed
                    overflowY: 'auto', // Enable vertical scrolling
                  }),
                  option: (provided) => ({
                    ...provided,
                    padding: '10px', // Adjust padding for better spacing
                  }),
                }}
              
              />
            </div>

            <div className="form-button">
              <button
                className="py-2 px-3 w-100"
                type="submit"
                disabled={loading}
                style={{
                  background: '#007bff', // Change to your theme color
                  color: 'white',
                }}
              >
                {loading ? <Loader /> : formData.action === 'add' ? 'Assign' : 'Remove'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamAssignmentModalteamincharge;

