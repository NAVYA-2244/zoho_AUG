
// import React, { useState, useEffect, useRef } from "react";
// import Joi from "joi";
// import { backEndCallObjNothing } from "../../services/mainService";
// import { useThemeContext } from "../Contexts/ThemesContext";
// import { useFunctionContext } from "../Contexts/FunctionContext";
// import { Select_inputs } from "../common/ALLINPUTS/AllInputs";
// import Loader from "../Loader/Loader";
// import { toastOptions } from "../../Utils/FakeRoutes";
// import { IoArrowBackSharp } from "react-icons/io5";

// const TeamAssignmentModal = ({ projectId, setIsTeamModalVisible, fetchProjects }) => {
//   const [loading, setLoading] = useState(false);
//   // const [formData, setFormData] = useState({
//   //   employee_id: "",
//   //   action: "",
//   // });
//   const [formData, setFormData] = useState({
//     employee_id: [],
//     action: "",
//   });
  
//   const [errors, setErrors] = useState({});
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [btndisabled, setBtndisabled] = useState(false);
  
//   const { checkErrors } = useFunctionContext();
//   const { applicationColor } = useThemeContext();
  
//   const refs = useRef({});

//   // const schema = {
//   //   action: Joi.string().valid("remove", "add").required(),
//   //   employee_id: Joi.string().min(5).max(12).required(),
//   //   project_id: Joi.string().min(5).max(12).required(),
//   // };
//   const schema = {
//     action: Joi.string().valid("remove", "add").required(),
//     employee_id: Joi.array().items(Joi.string().min(5).max(12)).required(),
//     project_id: Joi.string().min(5).max(12).required(),
//   };
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const payload = {
//       action: formData.action,
//       employee_id: formData.employee_id, // Now an array of IDs
//       project_id: projectId,
//     };
//     try {
//       setBtndisabled(true);
//       await checkErrors(schema, payload);
      
//       const res = await backEndCallObjNothing("/admin/add_remove_team", payload);
//       toastOptions.success(res);
//       fetchProjects();
//       setIsTeamModalVisible(false);
//     } catch (error) {
//       console.error(error);
//       toastOptions.error(error?.response?.data || "An error occurred");
//     } finally {
//       setBtndisabled(false);
//     }
//   };

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]: value,
//   //   }));
//   // };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // If employee_id, handle it as an array
//     setFormData((prev) => ({
//       ...prev,
//       [name]: Array.isArray(value) ? value.map(item => item.value) : value,
//     }));
//   };
  
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
//   }, [projectId, fetchProjects]);

//   const handleGoBack = () => {
//     setIsTeamModalVisible(false);
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
//           <h5 style={{ textAlign: 'center', width: '100%' }}>
//             Assign or Remove Team Member
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             aria-label="Close"
//             onClick={handleGoBack}
//             style={{ position: 'absolute', top: '10px', right: '10px' }}
//           ></button>
//         </div>

//         <div className="card-body">
//           <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
//             <div className="mb-3">
//               {/* <Select_inputs
//                 name="employee_id"
//                 placeholder="Select Team Incharge"
//                 value={formData.employee_id}
//                 setForm={setFormData}
//                 options={filteredEmployees.map((employee) => ({
//                   ...employee,
//                   displayName: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`,
//                 }))}
//                 property="displayName"
//                 valueProperty="employee_id"
//                 error={errors.employee_id}
//                 inputRef={(el) => (refs.current.employee_id = el)}
//               /> */}
//               <Select_inputs
//   name="employee_id"
//   placeholder="Select Team Incharge"
//   value={formData.employee_id}
//   setForm={setFormData}
//   options={filteredEmployees.map((employee) => ({
//     ...employee,
//     displayName: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`,
//     value: employee.employee_id, // Adjust to ensure value is correctly mapped
//   }))}
//   property="displayName"
//   valueProperty="value"
//   error={errors.employee_id}
//   inputRef={(el) => (refs.current.employee_id = el)}
//   isMulti={true} // Enable multi-select
// />

//             </div>
//             <div className="mb-3">
//               <Select_inputs
//                 name="action"
//                 placeholder="Select Action"
//                 value={formData.action}
//                 options={[
//                   { label: "Add", value: "add" },
//                   { label: "Remove", value: "remove" },
//                 ]}
//                 setForm={setFormData}
//                 onChange={handleChange}
//                 property="label"
//                 valueProperty="value"
//                 error={errors.action}
//               />
//             </div>
//             <div className="form-button">
//               <button
//                 className="py-2 px-3 w-100"
//                 type="submit"
//                 disabled={btndisabled}
//                 style={{
//                   background: applicationColor.buttonColor,
//                   color: "white",
//                 }}
//               >
//                 {loading ? <Loader /> : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamAssignmentModal;
import React, { useState, useEffect, useRef } from "react";
import Joi from "joi";
import { backEndCallObjNothing } from "../../services/mainService";
import { useThemeContext } from "../Contexts/ThemesContext";
import { useFunctionContext } from "../Contexts/FunctionContext";
import Select from "react-select";  // Import react-select
import Loader from "../Loader/Loader";
import { toastOptions } from "../../Utils/FakeRoutes";
import { IoArrowBackSharp } from "react-icons/io5";
import { Select_inputs } from "../common/ALLINPUTS/AllInputs";

const TeamAssignmentModal = ({ projectId, setIsTeamModalVisible, fetchProjects }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: [],  // Initialize as an array
    action: "",
  });
  
  const [errors, setErrors] = useState({});
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [btndisabled, setBtndisabled] = useState(false);
  
  const { checkErrors } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  
  const refs = useRef({});

  const schema = {
    action: Joi.string().valid("remove", "add").required(),
    employee_id: Joi.array().items(Joi.string().min(5).max(12)).required(),
    project_id: Joi.string().min(5).max(12).required(),
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      action: formData.action,
      employee_id: formData.employee_id,  // Now an array of IDs
      project_id: projectId,
    };
    try {
      setBtndisabled(true);
      await checkErrors(schema, payload);
      
      const res = await backEndCallObjNothing("/admin/add_remove_team", payload);
      toastOptions.success(res);
      fetchProjects();
      setIsTeamModalVisible(false);
    } catch (error) {
      console.error(error);
      toastOptions.error(error?.response?.data || "An error occurred");
    } finally {
      setBtndisabled(false);
    }
  };

  const handleChange = (selectedOptions, name) => {
    const value = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);
        const employees = await backEndCallObjNothing("/admin_get/get_employee_list", { skip: 0 });
        if (employees?.employees?.length) {
          const managers = employees.employees.filter(employee => {
            const roleName = employee?.work_info?.role_name?.toLowerCase();
            return roleName === "team incharge";
          });
          setFilteredEmployees(managers);
        }
      } catch (error) {
        toastOptions.error(error?.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, [projectId, fetchProjects]);

  const handleGoBack = () => {
    setIsTeamModalVisible(false);
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
        <div className="card-header" style={{ position: 'relative' }}>
          <h5 style={{ textAlign: 'center', width: '100%' }}>
            Assign or Remove Team Member
          </h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleGoBack}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          ></button>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
          <div>Select Team Incharge</div>
            <div className="mb-3">
              
              <Select
                name="employee_id"
                placeholder="Select Team Incharge"
                options={filteredEmployees.map((employee) => ({
                  label: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`, 
                  value: employee.employee_id,
                }))}
                isMulti
                onChange={(selectedOptions) => handleChange(selectedOptions, 'employee_id')}
                className={errors.employee_id ? 'is-invalid' : ''}
              />
              {errors.employee_id && <div className="invalid-feedback">{errors.employee_id}</div>}
            </div>

            <div className="mb-3">
               <Select_inputs
                name="action"
                placeholder="Select Action"
                value={formData.action}
                options={[
                  { label: "Add", value: "add" },
                  { label: "Remove", value: "remove" },
                ]}
                setForm={setFormData}
                onChange={handleChange}
                property="label"
                valueProperty="value"
                error={errors.action}
              />
            </div>

            <div className="form-button">
              <button
                className="py-2 px-3 w-100"
                type="submit"
                disabled={btndisabled}
                style={{
                  background: applicationColor.buttonColor,
                  color: "white",
                }}
              >
                {loading ? <Loader /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamAssignmentModal;
