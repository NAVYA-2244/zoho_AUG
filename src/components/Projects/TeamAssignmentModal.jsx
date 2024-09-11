
// // import React, { useState, useEffect, useRef } from "react";
// // import Joi from "joi";
// // import { backEndCallObjNothing } from "../../services/mainService";
// // import { useThemeContext } from "../Contexts/ThemesContext";
// // import { useFunctionContext } from "../Contexts/FunctionContext";
// // import { Select_inputs } from "../common/ALLINPUTS/AllInputs";
// // import Loader from "../Loader/Loader";
// // import { toastOptions } from "../../Utils/FakeRoutes";
// // import { IoArrowBackSharp } from "react-icons/io5";

// // const TeamAssignmentModal = ({ projectId, setIsTeamModalVisible, fetchProjects }) => {
// //   const [loading, setLoading] = useState(false);
// //   // const [formData, setFormData] = useState({
// //   //   employee_id: "",
// //   //   action: "",
// //   // });
// //   const [formData, setFormData] = useState({
// //     employee_id: [],
// //     action: "",
// //   });
  
// //   const [errors, setErrors] = useState({});
// //   const [filteredEmployees, setFilteredEmployees] = useState([]);
// //   const [btndisabled, setBtndisabled] = useState(false);
  
// //   const { checkErrors } = useFunctionContext();
// //   const { applicationColor } = useThemeContext();
  
// //   const refs = useRef({});

// //   // const schema = {
// //   //   action: Joi.string().valid("remove", "add").required(),
// //   //   employee_id: Joi.string().min(5).max(12).required(),
// //   //   project_id: Joi.string().min(5).max(12).required(),
// //   // };
// //   const schema = {
// //     action: Joi.string().valid("remove", "add").required(),
// //     employee_id: Joi.array().items(Joi.string().min(5).max(12)).required(),
// //     project_id: Joi.string().min(5).max(12).required(),
// //   };
  
// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     const payload = {
// //       action: formData.action,
// //       employee_id: formData.employee_id, // Now an array of IDs
// //       project_id: projectId,
// //     };
// //     try {
// //       setBtndisabled(true);
// //       await checkErrors(schema, payload);
      
// //       const res = await backEndCallObjNothing("/admin/add_remove_team", payload);
// //       toastOptions.success(res);
// //       fetchProjects();
// //       setIsTeamModalVisible(false);
// //     } catch (error) {
// //       console.error(error);
// //       toastOptions.error(error?.response?.data || "An error occurred");
// //     } finally {
// //       setBtndisabled(false);
// //     }
// //   };

// //   // const handleChange = (e) => {
// //   //   const { name, value } = e.target;
// //   //   setFormData((prev) => ({
// //   //     ...prev,
// //   //     [name]: value,
// //   //   }));
// //   // };
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
    
// //     // If employee_id, handle it as an array
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: Array.isArray(value) ? value.map(item => item.value) : value,
// //     }));
// //   };
  
// //   useEffect(() => {
// //     const fetchingData = async () => {
// //       try {
// //         setLoading(true);
// //         const employees = await backEndCallObjNothing("/admin_get/get_employee_list", { skip: 0 });
// //         if (employees?.employees?.length) {
// //           const managers = employees.employees.filter(employee => {
// //             const roleName = employee?.work_info?.role_name?.toLowerCase();
// //             return roleName === "team incharge";
// //           });
// //           setFilteredEmployees(managers);
// //         }
// //       } catch (error) {
// //         toastOptions.error(error?.response?.data || "Something went wrong");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchingData();
// //   }, [projectId, fetchProjects]);

// //   const handleGoBack = () => {
// //     setIsTeamModalVisible(false);
// //   };

// //   return (
// //     <div
// //       className="modal d-flex justify-content-center align-items-center show"
// //       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
// //     >
// //       <div
// //         className="card w-100 shadow"
// //         style={{
// //           maxWidth: "600px",
// //           borderRadius: "0.5rem",
// //           maxHeight: "90vh",
// //           overflowY: "auto",
// //         }}
// //       >
// //         <div className="card-header" style={{ position: 'relative' }}>
// //           <h5 style={{ textAlign: 'center', width: '100%' }}>
// //             Assign or Remove Team Member
// //           </h5>
// //           <button
// //             type="button"
// //             className="btn-close"
// //             aria-label="Close"
// //             onClick={handleGoBack}
// //             style={{ position: 'absolute', top: '10px', right: '10px' }}
// //           ></button>
// //         </div>

// //         <div className="card-body">
// //           <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
// //             <div className="mb-3">
// //               {/* <Select_inputs
// //                 name="employee_id"
// //                 placeholder="Select Team Incharge"
// //                 value={formData.employee_id}
// //                 setForm={setFormData}
// //                 options={filteredEmployees.map((employee) => ({
// //                   ...employee,
// //                   displayName: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`,
// //                 }))}
// //                 property="displayName"
// //                 valueProperty="employee_id"
// //                 error={errors.employee_id}
// //                 inputRef={(el) => (refs.current.employee_id = el)}
// //               /> */}
// //               <Select_inputs
// //   name="employee_id"
// //   placeholder="Select Team Incharge"
// //   value={formData.employee_id}
// //   setForm={setFormData}
// //   options={filteredEmployees.map((employee) => ({
// //     ...employee,
// //     displayName: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`,
// //     value: employee.employee_id, // Adjust to ensure value is correctly mapped
// //   }))}
// //   property="displayName"
// //   valueProperty="value"
// //   error={errors.employee_id}
// //   inputRef={(el) => (refs.current.employee_id = el)}
// //   isMulti={true} // Enable multi-select
// // />

// //             </div>
// //             <div className="mb-3">
// //               <Select_inputs
// //                 name="action"
// //                 placeholder="Select Action"
// //                 value={formData.action}
// //                 options={[
// //                   { label: "Add", value: "add" },
// //                   { label: "Remove", value: "remove" },
// //                 ]}
// //                 setForm={setFormData}
// //                 onChange={handleChange}
// //                 property="label"
// //                 valueProperty="value"
// //                 error={errors.action}
// //               />
// //             </div>
// //             <div className="form-button">
// //               <button
// //                 className="py-2 px-3 w-100"
// //                 type="submit"
// //                 disabled={btndisabled}
// //                 style={{
// //                   background: applicationColor.buttonColor,
// //                   color: "white",
// //                 }}
// //               >
// //                 {loading ? <Loader /> : "Submit"}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeamAssignmentModal;
// // import React, { useState, useEffect, useRef } from "react";
// // import Joi from "joi";
// // import { backEndCallObjNothing } from "../../services/mainService";
// // import { useThemeContext } from "../Contexts/ThemesContext";
// // import { useFunctionContext } from "../Contexts/FunctionContext";
// // import Select from "react-select";  // Import react-select
// // import Loader from "../Loader/Loader";
// // import { toastOptions } from "../../Utils/FakeRoutes";
// // import { IoArrowBackSharp } from "react-icons/io5";
// // import { Select_inputs } from "../common/ALLINPUTS/AllInputs";

// // const TeamAssignmentModal = ({ projectId, setIsTeamModalVisible, fetchProjects }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [formData, setFormData] = useState({
// //     employee_id: [],  // Initialize as an array
// //     action: "",
// //   });
  
// //   const [errors, setErrors] = useState({});
// //   const [filteredEmployees, setFilteredEmployees] = useState([]);
// //   const [btndisabled, setBtndisabled] = useState(false);
  
// //   const { checkErrors } = useFunctionContext();
// //   const { applicationColor } = useThemeContext();
  
// //   const refs = useRef({});

// //   const schema = {
// //     action: Joi.string().valid("remove", "add").required(),
// //     employee_id: Joi.array().items(Joi.string().min(5).max(12)).required(),
// //     project_id: Joi.string().min(5).max(12).required(),
// //   };
  
// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     const payload = {
// //       action: formData.action,
// //       employee_id: formData.employee_id,  // Now an array of IDs
// //       project_id: projectId,
// //     };
// //     try {
// //       setBtndisabled(true);
// //       await checkErrors(schema, payload);
      
// //       const res = await backEndCallObjNothing("/admin/add_remove_team", payload);
// //       toastOptions.success(res);
// //       fetchProjects();
// //       setIsTeamModalVisible(false);
// //     } catch (error) {
// //       console.error(error);
// //       toastOptions.error(error?.response?.data || "An error occurred");
// //     } finally {
// //       setBtndisabled(false);
// //     }
// //   };

// //   const handleChange = (selectedOptions, name) => {
// //     const value = selectedOptions ? selectedOptions.map(option => option.value) : [];
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   useEffect(() => {
// //     const fetchingData = async () => {
// //       try {
// //         setLoading(true);
// //         const employees = await backEndCallObjNothing("/admin_get/get_employee_list", { skip: 0 });
// //         if (employees?.employees?.length) {
// //           const managers = employees.employees.filter(employee => {
// //             const roleName = employee?.work_info?.role_name?.toLowerCase();
// //             return roleName === "team incharge";
// //           });
// //           setFilteredEmployees(managers);
// //         }
// //       } catch (error) {
// //         toastOptions.error(error?.response?.data || "Something went wrong");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchingData();
// //   }, [projectId, fetchProjects]);

// //   const handleGoBack = () => {
// //     setIsTeamModalVisible(false);
// //   };

// //   return (
// //     <div
// //       className="modal d-flex justify-content-center align-items-center show"
// //       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
// //     >
// //       <div
// //         className="card w-100 shadow"
// //         style={{
// //           maxWidth: "600px",
// //           borderRadius: "0.5rem",
// //           maxHeight: "90vh",
// //           overflowY: "auto",
// //         }}
// //       >
// //         <div className="card-header" style={{ position: 'relative' }}>
// //           <h5 style={{ textAlign: 'center', width: '100%' }}>
// //             Assign or Remove Team Member
// //           </h5>
// //           <button
// //             type="button"
// //             className="btn-close"
// //             aria-label="Close"
// //             onClick={handleGoBack}
// //             style={{ position: 'absolute', top: '10px', right: '10px' }}
// //           ></button>
// //         </div>

// //         <div className="card-body">
// //           <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
// //           <div className="text-right mb-2">Select Team Incharge</div>
// //             <div className="mb-3">
              
// //               <Select
// //                 name="employee_id"
// //                 placeholder="Select Team Incharge"
// //                 options={filteredEmployees.map((employee) => ({
// //                   label: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`, 
// //                   value: employee.employee_id,
// //                 }))}
// //                 isMulti
// //                 onChange={(selectedOptions) => handleChange(selectedOptions, 'employee_id')}
// //                 className={errors.employee_id ? 'is-invalid' : ''}
// //               />
// //               {errors.employee_id && <div className="invalid-feedback">{errors.employee_id}</div>}
// //             </div>

// //             <div className="mb-3">
// //                <Select_inputs
// //                 name="action"
// //                 placeholder="Select Action"
// //                 value={formData.action}
// //                 options={[
// //                   { label: "Add", value: "add" },
// //                   { label: "Remove", value: "remove" },
// //                 ]}
// //                 setForm={setFormData}
// //                 onChange={handleChange}
// //                 property="label"
// //                 valueProperty="value"
// //                 error={errors.action}
// //               />
// //             </div>

// //             <div className="form-button">
// //               <button
// //                 className="py-2 px-3 w-100"
// //                 type="submit"
// //                 disabled={btndisabled}
// //                 style={{
// //                   background: applicationColor.buttonColor,
// //                   color: "white",
// //                 }}
// //               >
// //                 {loading ? <Loader /> : "Submit"}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeamAssignmentModal;


// // import React, { useState, useEffect } from 'react';
// // import Select from 'react-select';
// // import Loader from '../Loader/Loader';
// // import { backEndCallObjNothing } from '../../services/mainService';
// // import { toastOptions } from '../../Utils/FakeRoutes';

// // const TeamAssignmentModal = ({ projectId, setIsTeamModalVisible, fetchProjects, formData, setFormData }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [filteredEmployees, setFilteredEmployees] = useState([]);
  
// //   useEffect(() => {
// //     const fetchingData = async () => {
// //       try {
// //         setLoading(true);
// //         const employees = await backEndCallObjNothing("/admin_get/get_employee_list", { skip: 0 });
// //         if (employees?.employees?.length) {
// //           const managers = employees.employees.filter(employee => {
// //             const roleName = employee?.work_info?.role_name?.toLowerCase();
// //             return roleName === "team incharge";
// //           });
// //           setFilteredEmployees(managers);
// //         }
// //       } catch (error) {
// //         toastOptions.error(error?.response?.data || "Something went wrong");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchingData();
// //   }, [projectId]);





// //   const handleChange = (selectedOptions) => {
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       employee_id: selectedOptions ? selectedOptions.map(option => option.value) : [],
// //     }));
// //   };
// // console.log(projectId,"projectid")
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const payload = {
// //        project_id: projectId,
// //         action: formData.action,
// //         employee_id: formData.employee_id,
// //       };

// //       const response = await backEndCallObjNothing("/admin/add_remove_team", payload);
// //       fetchProjects(); // Refresh projects list
// //       setIsTeamModalVisible(false);
// // toastOptions.success(response)

// //     } catch (error) {
// //       toastOptions.error(error.response.data)
// //       console.error('Error submitting form:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const options = filteredEmployees.map((employee) => ({
// //     label: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`, 
// //     value: employee.employee_id,
// //   }));

// //   return (
// //     <div
// //       className="modal d-flex justify-content-center align-items-center show"
// //       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
// //     >
// //       <div
// //         className="card w-100 shadow"
// //         style={{
// //           maxWidth: '600px',
// //           borderRadius: '0.5rem',
// //           maxHeight: '90vh',
// //           overflowY: 'auto',
// //         }}
// //       >
// //         <div className="card-header" style={{ position: 'relative', textAlign: 'center' }}>
// //           <h5>{formData.action === 'add' ? 'Assign Team Members' : 'Remove Team Members'}</h5>
// //           <button
// //             type="button"
// //             className="btn-close"
// //             aria-label="Close"
// //             onClick={() => setIsTeamModalVisible(false)}
// //             style={{ position: 'absolute', top: '10px', right: '10px' }}
// //           ></button>
// //         </div>

// //         <div className="card-body">
// //           <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
// //             <div className="mb-3">
// //               <Select
// //                 name="employee_id"
// //                 placeholder="Select Team Incharge"
// //                 options={options}
// //                 isMulti
// //                 onChange={handleChange}
// //                 value={options.filter(option => formData.employee_id.includes(option.value))}
// //               />
// //             </div>

// //             <div className="form-button">
// //               <button
// //                 className="py-2 px-3 w-100"
// //                 type="submit"
// //                 disabled={loading}
// //                 style={{
// //                   background: '#007bff', // Change to your theme color
// //                   color: 'white',
// //                 }}
// //               >
// //                 {loading ? <Loader /> : formData.action === 'add' ? 'Assign' : 'Remove'}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
       
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeamAssignmentModal;

// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import Loader from '../Loader/Loader';
// import { backEndCallObjNothing } from '../../services/mainService';
// import { toastOptions } from '../../Utils/FakeRoutes';

// const TeamAssignmentModal = ({ projectId, setIsTeamModalVisible, fetchProjects, formData, setFormData }) => {
//   const [loading, setLoading] = useState(false);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);

//   useEffect(() => {
//     const fetchingData = async () => {
//       try {
//         setLoading(true);
//         const employees = await backEndCallObjNothing("/admin_get/get_employee_list", { skip: 0 });
//         if (employees?.employees?.length) {
//           const managers = employees.employees.filter(employee => {
//             const roleName = employee?.work_info?.role_name?.toLowerCase();
//             return roleName === "team incharge";
//           });
//           setFilteredEmployees(managers);
//         }
//       } catch (error) {
//         toastOptions.error(error?.response?.data || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchingData();
//   }, [projectId]);

//   const handleChange = (selectedOptions) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       employee_id: selectedOptions ? selectedOptions.map(option => option.value) : [],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = {
//         project_id: projectId,
//         action: formData.action,
//         employee_id: formData.employee_id,
//       };

//       const response = await backEndCallObjNothing("/admin/add_remove_team", payload);
//       fetchProjects(); // Refresh projects list
//       setIsTeamModalVisible(false);
//       toastOptions.success(response);
//     } catch (error) {
//       toastOptions.error(error.response.data);
//       console.error('Error submitting form:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create options for the dropdown menu
//   const options = filteredEmployees.map((employee) => ({
//     label: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`, 
//     value: employee.employee_id,
//   }));

//   // Define custom styles for the react-select component
//   const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       backgroundColor: '#f8f9fa', // Light background for a clean look
//       border: state.isFocused ? '1px solid #007bff' : '1px solid #ced4da', // Border changes on focus
//       boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : 'none',
//       borderRadius: '0.375rem', // Rounded corners
//       padding: '0.5rem', // Slight padding for better spacing
//     }),
//     menu: (provided) => ({
//       ...provided,
//       maxHeight: '200px', // Limit the dropdown height
//       overflowY: 'auto', // Enable scrolling if there are too many options
//       zIndex: 10, // Ensure the dropdown is above other elements
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected ? '#007bff' : '#fff', // Highlight the selected option
//       color: state.isSelected ? '#fff' : '#333', // Change text color on selection
//       '&:hover': {
//         backgroundColor: '#f1f1f1', // Light gray hover effect
//       },
//       padding: '10px 15px', // Better spacing inside each option
//     }),
//     multiValue: (provided) => ({
//       ...provided,
//       backgroundColor: '#007bff', // Background color for selected options
//       color: 'white',
//       borderRadius: '0.25rem', // Rounded corners
//     }),
//     multiValueLabel: (provided) => ({
//       ...provided,
//       color: 'white', // Text color for selected options
//     }),
//     multiValueRemove: (provided) => ({
//       ...provided,
//       color: 'white',
//       '&:hover': {
//         backgroundColor: '#0056b3', // Darker color on hover
//         color: 'white',
//       },
//     }),
//   };

//   return (
//     <div
//       className="modal d-flex justify-content-center align-items-center show"
//       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
//     >
//       <div
//         className="card w-100 shadow"
//         style={{
//           maxWidth: '600px',
//           borderRadius: '0.5rem',
//           maxHeight: '90vh',
//           overflowY: 'auto',
//         }}
//       >
//         <div className="card-header" style={{ position: 'relative', textAlign: 'center' }}>
//           <h5>{formData.action === 'add' ? 'Assign Team Members' : 'Remove Team Members'}</h5>
//           <button
//             type="button"
//             className="btn-close"
//             aria-label="Close"
//             onClick={() => setIsTeamModalVisible(false)}
//             style={{ position: 'absolute', top: '10px', right: '10px' }}
//           ></button>
//         </div>

//         <div className="card-body">
//           <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
//             <div className="mb-3">
//               <Select
//                 name="employee_id"
//                 placeholder="Select Team Incharge"
//                 options={options}
//                 isMulti
//                 onChange={handleChange}
//                 value={options.filter(option => formData.employee_id.includes(option.value))}
//                 styles={customStyles} // Apply custom styles
//               />
//             </div>

//             <div className="form-button">
//               <button
//                 className="py-2 px-3 w-100"
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   background: '#007bff', // Your theme color
//                   color: 'white',
//                   borderRadius: '0.375rem',
//                   fontSize: '1rem',
//                   fontWeight: 'bold',
//                   cursor: loading ? 'not-allowed' : 'pointer',
//                   transition: 'background-color 0.3s ease',
//                 }}
//               >
//                 {loading ? <Loader /> : formData.action === 'add' ? 'Assign' : 'Remove'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamAssignmentModal;

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Loader from '../Loader/Loader';
import { backEndCallObjNothing } from '../../services/mainService';
import { toastOptions } from '../../Utils/FakeRoutes';

const TeamAssignmentModal = ({ projectId, setIsTeamModalVisible, fetchProjects, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);
       const managers = await backEndCallObjNothing("/org/get_team_for_project")
       
          setFilteredEmployees(managers);
        // }
      } catch (error) {
        toastOptions.error(error?.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, [projectId]);

  const handleChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      employee_id: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        project_id: projectId,
        action: formData.action,
        employee_id: formData.employee_id,
      };

      const response = await backEndCallObjNothing("/admin/add_remove_team", payload);
      fetchProjects(); // Refresh projects list
      setIsTeamModalVisible(false);
      toastOptions.success(response);
    } catch (error) {
      toastOptions.error(error.response.data);
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const options = filteredEmployees.map((employee) => {
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
                className="btn btn-primary w-100"
                type="submit"
                disabled={loading}
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

export default TeamAssignmentModal;
