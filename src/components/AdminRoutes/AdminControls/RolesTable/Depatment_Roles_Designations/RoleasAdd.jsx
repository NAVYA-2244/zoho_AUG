// import React, { useState, useEffect } from "react";
// import { RiAddCircleFill } from "react-icons/ri";
// import { useStateContext } from "../../../../Contexts/StateContext";
// import { useThemeContext } from "../../../../Contexts/ThemesContext";
// import {
//   Input_text,
// } from "../../../../common/ALLINPUTS/AllInputs";
// import Loader from "../../../../Loader/Loader";
// import { useFunctionContext } from "../../../../Contexts/FunctionContext";
// import { toastOptions } from "../../../../../Utils/FakeRoutes";
// import { backEndCallObjNothing } from "../../../../../services/mainService";
// import Joi from "joi";
// import { IoArrowBackSharp } from "react-icons/io5";

// const RolesAdd = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [edit, setEdit] = useState(false);
//   const { applicationColor } = useThemeContext();
//   const [editingItem, setEditingItem] = useState({});
//   const [settingId, setSettingId] = useState("");
//   const { loading, setErrors, setLoading, orgDetails, setOrgDetails } =
//     useStateContext();
//   const { checkErrors } = useFunctionContext();

//   const fields = ["role_name"];
//   const placeholders = ["Role Name"];
//   const types = ["text"];

//   const roleSchema = {
//     organisation_id: Joi.string().min(10).max(18).required(),
//     role_name: Joi.string().trim().strip().min(5).max(20).required(),
//     role_id: Joi.string().allow(null, "").optional(),
//   };

//   const [formData, setFormData] = useState(() => ({
//     role_name: "",
//     organisation_id: orgDetails?.organisation_id || "",
//     role_id: "",
//   }));

//   useEffect(() => {
//     if (edit && editingItem) {
//       // Editing mode
//       setFormData({
//         ...editingItem,
//         organisation_id: orgDetails?.organisation_id || "",
//       });
//     } else {
//       // Adding mode
//       setFormData({
//         role_name: "",
//         organisation_id: orgDetails?.organisation_id || "",
//         role_id: "",
//       });
//     }
//   }, [edit, editingItem, orgDetails]);

//   const handleAddItems = () => {
//     setShowModal(true);
//     setEdit(false);
//   };

//   const handleEditItems = (id, item) => {
//     setEditingItem(item);
//     setEdit(true);
//     setShowModal(true);
//     setSettingId(id);
//   };

//   const handleCloseModal = () => {
//     setErrors({});
//     setShowModal(false);
//     setLoading(false);
//     setEdit(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await checkErrors(roleSchema, formData);
//       const dataToSubmit = {
//         ...formData,
//       };

//       const response = await backEndCallObjNothing(
//         "/org/add_update_role",
//         dataToSubmit
//       );

//       setOrgDetails(response.data);
//       toastOptions.success(response.success || "Operation Successful");

//       setFormData({
//         role_name: "",
//         organisation_id: orgDetails?.organisation_id || "",
//         role_id: "",
//       });
//       setEdit(false);
//       setShowModal(false);
//     } catch (error) {
//      
//       toastOptions.error(
//         error?.response?.data || error[0]?.message || "An error occurred"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoBack = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <div className="">
//         <section
//           className="roles-table"
//           style={{
//             background: applicationColor.cardBg1,
//             color: applicationColor.readColor1,
//           }}
//         >
//           <div className={`role-cards ${showModal ? "d-none" : "d-block"}`}>
//             <section className="row">
//               <div className="mb-4 ">
              
//               <button
//                 className="btn btn-primary d-flex align-items-center justify-content-end"
//                 type="button"
//                 onClick={handleAddItems}
//               >
//                 <span className="me-1">Add </span>
//                 <RiAddCircleFill />
//               </button>

//               </div>
//               {orgDetails?.roles?.length > 0 ? (
//                 orgDetails?.roles.map((item, index) => (
//                   <div className="col-xl-4 mb-3" key={index}>
//                     <div
//                       className="admin-controls-card"
//                       style={{
//                         background: applicationColor.cardBg1,
//                         color: applicationColor.readColor1,
//                       }}
//                     >
//                       <div
//                         onClick={() => handleEditItems(item.role_id, item)}
//                       >
//                         <h5 className="mt-1 mb-4">
//                           Role Name:&nbsp;
//                           <span className="text-primary fw-semi-bold">
//                             {item.role_name}
//                           </span>
//                         </h5>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="col-12 text-center">
//                   There is no data in your location
//                 </div>
//               )}
//             </section>
//           </div>

//           <div className={`role-form ${showModal ? "d-block" : "d-none"}`}>
//             {showModal && (
//               <>
//                 <div className="fs-3">
//                   <IoArrowBackSharp
//                     onClick={handleGoBack}
//                     style={{ cursor: "pointer" }}
//                   />
//                 </div>
//                 <div
//                       className="admin-controls-card col-lg-4 "
//                       style={{
//                         background: applicationColor.cardBg1,
//                         color: applicationColor.readColor1,
//                       }}
//                     >
//                 <form onSubmit={handleSubmit}>
//                   <div className="row ">
//                     <div className="form-button mb-4">
//                       <button
//                         className="py-2 px-3"
//                         type="submit"
//                         disabled={loading}
//                         style={{
//                           background: applicationColor.buttonColor,
//                           color: "white",
//                         }}
//                       >
//                         {loading ? (
//                           <Loader />
//                         ) : edit ? (
//                           "Update Role"
//                         ) : (
//                           "Add Role"
//                         )}
//                       </button>
//                     </div>

//                     <div className="col-lg-9">
//                       <div className="row">
//                         {fields.map((field, index) => (
//                           <div className="form-group col-lg-6" key={field}>
//                             <Input_text
//                               type={types[index]}
//                               name={field}
//                               setForm={setFormData}
//                               value={formData[field]}
//                               placeholder={placeholders[index]}
//                               onChange={handleChange}
//                               maxLength={25}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//                 </div>
//               </>
//             )}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default RolesAdd;


// import React, { useState, useEffect } from "react";
// import { RiAddCircleFill } from "react-icons/ri";
// import { useStateContext } from "../../../../Contexts/StateContext";
// import { useThemeContext } from "../../../../Contexts/ThemesContext";
// import { Input_text } from "../../../../common/ALLINPUTS/AllInputs";
// import Loader from "../../../../Loader/Loader";
// import { useFunctionContext } from "../../../../Contexts/FunctionContext";
// import { toastOptions } from "../../../../../Utils/FakeRoutes";
// import { backEndCallObjNothing } from "../../../../../services/mainService";
// import Joi from "joi";
// import { IoArrowBackSharp } from "react-icons/io5";

// const RolesAdd = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [edit, setEdit] = useState(false);
//   const { applicationColor } = useThemeContext();
//   const [editingItem, setEditingItem] = useState({});
//   const [settingId, setSettingId] = useState("");
//   const { loading, setErrors, setLoading, orgDetails, setOrgDetails } =
//     useStateContext();
//   const { checkErrors } = useFunctionContext();

//   const fields = ["role_name"];
//   const placeholders = ["Role Name"];
//   const types = ["text"];

//   const roleSchema = {
//     organisation_id: Joi.string().min(10).max(18).required(),
//     role_name: Joi.string().trim().strip().min(5).max(20).required(),
//     role_id: Joi.string().allow(null, "").optional(),
//   };

//   const [formData, setFormData] = useState(() => ({
//     role_name: "",
//     organisation_id: orgDetails?.organisation_id || "",
//     role_id: "",
//   }));

//   useEffect(() => {
//     if (edit && editingItem) {
//       // Editing mode
//       setFormData({
//         ...editingItem,
//         organisation_id: orgDetails?.organisation_id || "",
//       });
//     } else {
//       // Adding mode
//       setFormData({
//         role_name: "",
//         organisation_id: orgDetails?.organisation_id || "",
//         role_id: "",
//       });
//     }
//   }, [edit, editingItem, orgDetails]);

//   const handleAddItems = () => {
//     setShowModal(true);
//     setEdit(false);
//   };

//   const handleEditItems = (id, item) => {
//     setEditingItem(item);
//     setEdit(true);
//     setShowModal(true);
//     setSettingId(id);
//   };

//   const handleCloseModal = () => {
//     setErrors({});
//     setShowModal(false);
//     setLoading(false);
//     setEdit(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await checkErrors(roleSchema, formData);
//       const dataToSubmit = {
//         ...formData,
//       };

//       const response = await backEndCallObjNothing(
//         "/org/add_update_role",
//         dataToSubmit
//       );

//       setOrgDetails(response.data);
//       toastOptions.success(response.success || "Operation Successful");

//       setFormData({
//         role_name: "",
//         organisation_id: orgDetails?.organisation_id || "",
//         role_id: "",
//       });
//       setEdit(false);
//       setShowModal(false);
//     } catch (error) {
//       console.log(error, "error");
//       toastOptions.error(
//         error?.response?.data || error[0]?.message || "An error occurred"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoBack = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <div className="">
//       <section
//           className="roles-table"
//           style={{
//             background: applicationColor.cardBg1,
//             color: applicationColor.readColor1,
//           }}
//         >
//           <div className={`role-cards ${showModal ? "d-none" : "d-block"}`}>
//             <section className="row">
//               <div className="mb-4 ">
              
//               <button
//                 className="btn btn-primary d-flex align-items-center justify-content-end"
//                 type="button"
//                 onClick={handleAddItems}
//               >
//                 <span className="me-1">Add </span>
//                 <RiAddCircleFill />
//               </button>

//               </div>
//               {orgDetails?.roles?.length > 0 ? (
//                 orgDetails?.roles.map((item, index) => (
//                   <div className="col-xl-4 mb-3" key={index}>
//                     <div
//                       className="admin-controls-card"
//                       style={{
//                         background: applicationColor.cardBg1,
//                         color: applicationColor.readColor1,
//                       }}
//                     >
//                       <div
//                         onClick={() => handleEditItems(item.role_id, item)}
//                       >
//                         <h5 className="mt-1 mb-4">
//                           Role Name:&nbsp;
//                           <span className="text-primary fw-semi-bold">
//                             {item.role_name}
//                           </span>
//                         </h5>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="col-12 text-center">
//                   There is no data in your location
//                 </div>
//               )}
//             </section>
//           </div>

//           <div className={`role-form ${showModal ? "d-block" : "d-none"}`}>
//             {showModal && (
//               <>
//                 <div className="fs-3 mb-3">
//                   <IoArrowBackSharp
//                     onClick={handleGoBack}
//                     style={{ cursor: "pointer" }}
//                   />
//                 </div>
//                 <div
//                   className="admin-controls-card col-lg-6 mx-auto"
//                   style={{
//                     background: applicationColor.cardBg1,
//                     color: applicationColor.readColor1,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     padding: "20px",
//                     borderRadius: "10px",
//                   }}
//                 >
//                    <h3 className="mb-4">
//                     {edit ? "Edit Role Details" : "Add New Role"}
//                   </h3>
//                   <p className="text-muted mb-4">
//                     Please fill out the form below to{" "}
//                     {edit ? "update the role" : "add a new role"}.
//                   </p>
//                   <form
//                     onSubmit={handleSubmit}
//                     style={{ width: "100%", textAlign: "center" }}
//                   >
//                     <div className="row mb-4">
//                       <div className="col-12">
//                         {fields.map((field, index) => (
//                           <div className="form-group mb-3" key={field}>
//                             <Input_text
//                               type={types[index]}
//                               name={field}
//                               setForm={setFormData}
//                               value={formData[field]}
//                               placeholder={placeholders[index]}
//                               onChange={handleChange}
//                               maxLength={25}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="form-button">
//                       <button
//                         className="py-2 px-3 w-100"
//                         type="submit"
//                         disabled={loading}
//                         style={{
//                           background: applicationColor.buttonColor,
//                           color: "white",
//                         }}
//                       >
//                         {loading ? (
//                           <Loader />
//                         ) : edit ? (
//                           "Update Role"
//                         ) : (
//                           "Add Role"
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </>
//             )}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default RolesAdd;

import React, { useState, useEffect } from "react";
import { RiAddCircleFill, RiEdit2Line } from "react-icons/ri";
import { useStateContext } from "../../../../Contexts/StateContext";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
import { Input_text } from "../../../../common/ALLINPUTS/AllInputs";
import Loader from "../../../../Loader/Loader";
import { useFunctionContext } from "../../../../Contexts/FunctionContext";
import { toastOptions } from "../../../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../../../services/mainService";
import Joi from "joi";
import { IoArrowBackSharp } from "react-icons/io5";

const RolesAdd = () => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { applicationColor } = useThemeContext();
  const [editingItem, setEditingItem] = useState({});
  const [settingId, setSettingId] = useState("");
  const { loading, setErrors, setLoading, orgDetails, setOrgDetails } = useStateContext();
  const { checkErrors } = useFunctionContext();

  const fields = ["role_name"];
  const placeholders = ["Role Name"];    
  const types = ["text"];

  const roleSchema = {
    organisation_id: Joi.string().min(10).max(18).required(),
    role_name: Joi.string().trim().strip().min(5).max(20).required(),
    role_id: Joi.string().allow(null, "").optional(),
  };

  const [formData, setFormData] = useState(() => ({
    role_name: "",
    organisation_id: orgDetails?.organisation_id || "",
    role_id: "",
  }));

  useEffect(() => {
    if (edit && editingItem) {
      setFormData({
        ...editingItem,
        organisation_id: orgDetails?.organisation_id || "",
      });
    } else {
      setFormData({
        role_name: "",
        organisation_id: orgDetails?.organisation_id || "",
        role_id: "",
      });
    }
  }, [edit, editingItem, orgDetails]);

  const handleAddItems = () => {
    setShowModal(true);
    setEdit(false);
  };

  const handleEditItems = (id, item) => {
    setEditingItem(item);
    setEdit(true);
    setShowModal(true);
    setSettingId(id);
  };

  const handleCloseModal = () => {
    setErrors({});
    setShowModal(false);
    setLoading(false);
    setEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await checkErrors(roleSchema, formData);
      // const dataToSubmit = { ...formData };
      const dataToSubmit = {
        ...formData,
        role_name: formData.role_name.trim(),
        organisation_id: formData.organisation_id.trim(),
        role_id: formData.role_id ? formData.role_id.trim() : "",
      };
      const response = await backEndCallObjNothing("/org/add_update_role", dataToSubmit);
      setOrgDetails(response.data);
      toastOptions.success(response.success );

      setFormData({
        role_name: "",
        organisation_id: orgDetails?.organisation_id || "",
        role_id: "",
      });
      setEdit(false);
      setShowModal(false);
      
    } catch (error) {
     
      toastOptions.error(error?.response?.data || error[0]?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="">
        <section
          className="roles-table"
          style={{
            background: applicationColor.cardBg1,
            color: applicationColor.readColor1,
          }}
        >
          <div className={`role-cards ${showModal ? "d-none" : "d-block"}`}>
            {/* <section className="row">
              <div className="mb-4 ">
                <button
                  className="btn btn-primary d-flex align-items-center justify-content-end"
                  type="button"
                  onClick={handleAddItems}
                >
                  <span className="me-1">Add </span>
                  <RiAddCircleFill />
                </button>
              </div>
              {orgDetails?.roles?.length > 0 ? (
                orgDetails?.roles.map((item, index) => (
                  <div className="col-xl-4 col-md-6 mb-3" key={index}>
                    <div
                      className="admin-controls-card"
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                      }}
                    >
                      <div
                        onClick={() => handleEditItems(item.role_id, item)}
                      >
                        <h5 className="mt-1 mb-4">
                          Role Name:&nbsp;
                          <span className="text-primary fw-semi-bold">
                            {item.role_name}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  There is no data in your location
                </div>
              )}
            </section> */}
  <section className="row">
      {/* <div className="mb-4 d-flex justify-content-end">
        <button
          className="btn btn-primary d-flex align-items-center"
          type="button"
          onClick={handleAddItems}
        >
          <RiAddCircleFill size={24} className="me-2" />
          <span>Add Role</span>
        </button>
      </div> */}

      {orgDetails?.roles?.length > 0 ? (
        orgDetails.roles.map((item, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div
              className="card"
              style={{
                background: applicationColor.cardBg1,
                color: applicationColor.readColor1,
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              // onClick={() => handleEditItems(item.role_id, item)}
            >
              <div className="card-body d-flex flex-column p-4">
                {/* <h5 className="card-title mb-3" style={{ fontSize: '1.25rem' }}> */}
                  {/* {item.role_name} */}
                  {/* {item.role_name.charAt(0).toUpperCase() + item.role_name.slice(1).toLowerCase()} */}
                  <h5 className="card-title mb-3" style={{ fontSize: '1.25rem' }}>
  {item?.role_name .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' ')} 
</h5>

                {/* </h5> */}
                <p className="card-text text-muted mb-4">
                  Role ID: {item.role_id}
                </p>
                {/* <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the onClick of the card
                    handleEditItems(item.role_id, item);
                  }}
                >
                  Edit Role
                </button> */}
                {/* <button
                  className="btn btn-outline-primary mt-auto"
                  // onClick={(e) => {
                  //   e.stopPropagation(); // Prevents triggering the onClick of the card
                  //   handleEditItems(item.role_id, item);
                  // }}
                >
                configaration
                </button> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          No roles available.
        </div>
      )}
    </section>        
  {/* <section className="row">
      <div className="mb-4 d-flex justify-content-end">
        <button
          className="btn btn-primary d-flex align-items-center"
          type="button"
          onClick={handleAddItems}
          style={{
            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
            color: '#fff',
            borderRadius: '30px',
            padding: '0.5rem 1.5rem', // Adjusted padding for a smaller button
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background 0.3s, box-shadow 0.3s',
            fontSize: '1rem' // Adjusted font size for better fit
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
        >
          <RiAddCircleFill size={24} className="me-2" />
          <span>Add Role</span>
        </button>
      </div>

      {orgDetails?.roles?.length > 0 ? (
        orgDetails.roles.map((item, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div
              className="card"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
                color: '#333',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
            >
              <div className="card-body p-4 d-flex flex-column">
                <h5 className="card-title mb-3 text-primary" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {item.role_name}
                </h5>
                <p className="card-text text-muted mb-4" style={{ fontSize: '1rem' }}>
                  Role ID: {item.role_id}
                </p>
                
                <button
                  className="btn btn-outline-primary mt-auto"
                  style={{
                    borderColor: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                    color: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                    borderRadius: '20px',
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'background 0.3s, color 0.3s',
                    fontSize: '0.875rem' // Smaller font size for the button
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditItems(item.role_id, item);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)';
                  }}
                >
                  <RiEdit2Line size={20} className="me-2" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>No roles available.</p>
        </div>
      )}
    </section> */}
          </div>

          <div className={`role-form ${showModal ? "d-block" : "d-none"}`}>
            {showModal && (
           <div className="modal fade show" style={{ display: 'block' }}>
           <div className="modal-dialog modal-dialog-centered">
             <div
               className="modal-content"
               style={{
                 background: applicationColor.cardBg1,
                 color: applicationColor.readColor1,
                 borderRadius: '10px',
                 padding: '20px',
               }}
             >
               <div className="modal-header">
                 <h5 className="modal-title">{edit ? "Edit Role Details" : "Add New Role"}</h5>
                 <button
                   type="button"
                   className="btn-close"
                   aria-label="Close"
                   onClick={handleCloseModal}
                 >
                   <span>&times;</span>
                 </button>
               </div>
               <div className="modal-body">
                 <p className="text-muted mb-4">
                   Please fill out the form below to {edit ? "update the role" : "add a new role"}.
                 </p>
                 <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                   <div className="row mb-4">
                     <div className="col-12 "style={{ padding:'0'}}>
                       {fields?.map((field, index) => (
                         <div className="form-group mb-3" key={field}>
                           <Input_text
                             type={types[index]}
                             name={field}
                             setForm={setFormData}
                             value={formData[field]}
                             placeholder={placeholders[index]}
                             onChange={handleChange}
                             maxLength={25}
                           />
                         </div>
                       ))}
                     </div>
                   </div>
                   <div className="form-button">
                     <button
                       className="py-2 px-3 w-100"
                       type="submit"
                       disabled={loading}
                       style={{
                         background: applicationColor.buttonColor,
                         color: 'white',
                       }}
                     >
                       {loading ? <Loader /> : edit ? "Update Role" : "Add Role"}
                     </button>
                   </div>
                 </form>
               </div>
               {/* <div className="modal-footer">
                 <button
                   type="button"
                   className="btn btn-secondary"
                   onClick={handleCloseModal}
                 >
                   Close
                 </button>
               </div> */}
             </div>
           </div>
         </div>
         
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default RolesAdd;
