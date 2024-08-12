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

// const LeavesSettings = ({ selectedLocation }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [edit, setEdit] = useState(false);
//   const { applicationColor } = useThemeContext();
//   const [editingItem, setEditingItem] = useState({});
//   const { loading, setErrors, setLoading, orgDetails, setOrgDetails } =
//     useStateContext();
//   const [mergedData, setMergedData] = useState([]);
//   const { checkErrors } = useFunctionContext();

//   const fields = ["leave_name", "total_leaves"];
//   const placeholders = ["Leave Name", "Total Leaves"];
//   const types = ["text", "number"];
//   const statusOptions = [
//     { value: true, label: "Active" },
//     { value: false, label: "Inactive" },
//   ];

//   const leavesSchema = {
//     organisation_id: Joi.string().min(10).max(18).required(),
//     designation_name: Joi.string().trim().strip().min(5).max(20).required(),
//     designation_id: Joi.string().allow(null, "").optional(),
//     leaves: Joi.array()
//       .items(
//         Joi.object({
//           leave_name: Joi.string().min(4).max(15).required(),
//           total_leaves: Joi.number().min(1).max(10).required(),
//         })
//       )
//       .required(),
//   };

//   const [formData, setFormData] = useState({
//     designation_name: "",
//     designation_id: null,
//     leaves: [],
//   });

//   useEffect(() => {
//     if (edit && editingItem) {
//       setFormData({
//         ...editingItem,
//         organisation_id: orgDetails?.organisation_id || "",
//         location_id: selectedLocation?.location_id || "",
//       });
//     } else {
//       setFormData({
//         designation_name: "",
//         designation_id: null,
//         leaves: [],
//       });
//     }
//   }, [edit, editingItem, orgDetails, selectedLocation]);

//   const handleAddItems = () => {
//     setShowModal(true);
//     setEdit(false);
//   };

//   const handleEditItems = (id, item) => {
//     setEditingItem(item);
//     setEdit(true);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setErrors({});
//     setShowModal(false);
//     setLoading(false);
//     setEdit(false);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleLeaveChange = (index, field, value) => {
//     setFormData((prev) => {
//       const updatedLeaves = [...prev.leaves];
//       updatedLeaves[index] = { ...updatedLeaves[index], [field]: value };
//       return { ...prev, leaves: updatedLeaves };
//     });
//   };

//   const handleAddLeave = () => {
//     setFormData((prev) => ({
//       ...prev,
//       leaves: [...prev.leaves, { leave_name: "", total_leaves: 0 }],
//     }));
//   };
//   const handledeletLeave = () => {
//     setFormData((prev) => ({
//       ...prev,
//       leaves: [...prev.leaves, { leave_name: "", total_leaves: 0 }],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await checkErrors(leavesSchema, formData);
//       const dataToSubmit = { ...formData };
//       const response = await backEndCallObjNothing(
//         "/user/add_update_designation",
//         dataToSubmit
//       );
//       setMergedData((prevMergedData) => [...prevMergedData, response]);
//       setOrgDetails(response.data);
//       toastOptions.success(response.success || "Operation Successful");

//       setFormData({
//         designation_name: "",
//         designation_id: null,
//         leaves: [],
//       });
//       setEdit(false);
//       setShowModal(false);
//     } catch (error) {
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
//     <div className="">
//       <section
//         className="roles-table"
//         style={{
//           background: applicationColor.cardBg1,
//           color: applicationColor.readColor1,
//         }}
//       >
//         <div className={`leave-cards ${showModal ? "d-none" : "d-block"}`}>
//           <section className="row">
//             <div className="mb-4 text-end">
//               <button
//                 className="dropdown-item d-flex align-items-center justify-content-end"
//                 type="button"
//                 onClick={handleAddItems}
//               >
//                 <span className="add-role me-1">Add</span>
//                 <RiAddCircleFill />
//               </button>
//             </div>

//             {orgDetails?.designations?.length > 0 ? (

//               orgDetails?.designations?.leaves?.map((item, index) => (
//                 <div className="col-xl-4 mb-3" key={index}>
//                   <div className="card">
//                     <div
//                       className="card-body"
//                       onClick={() => handleEditItems(item.leave_id, item)}
//                       style={{
//                         background: applicationColor.cardBg1,
//                         color: applicationColor.readColor1,
//                       }}
//                     >
//                       <h5 className="card-title text-primary fw-bold">
//                         {item.leave_name}
//                       </h5>
//                       <p>
//                         <strong>Total Leaves:</strong> {item.total_leaves}
//                       </p>
//                       <p>
//                         <strong>Status:</strong>{" "}
//                         {item.status ? "Active" : "Inactive"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12 text-center">
//                 There is no data in your location
//               </div>
//             )}
//           </section>
//         </div>

//         <div className={`leave-form ${showModal ? "d-block" : "d-none"}`}>
//           {showModal && (
//             <>
//               <div className="fs-3 mb-3">
//                 <IoArrowBackSharp
//                   onClick={handleGoBack}
//                   style={{ cursor: "pointer" }}
//                 />
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="row mb-2 justify-content-center">
//                   <div className="col-md-6">
//                     <div className="form-group mb-3">
//                       <Input_text
//                         type="text"
//                         name="designation_name"
//                         setForm={setFormData}
//                         value={formData.designation_name}
//                         placeholder="Designation Name"
//                         onChange={handleChange}
//                       />
//                     </div>

//                     {formData.leaves.map((leave, index) => (
//                       <div key={index}>
//                         <div className="form-group mb-3">
//                           <Input_text
//                             type="text"
//                             name="leave_name"
//                             placeholder="Leave Name"
//                             value={leave.leave_name}
//                             onChange={(e) =>
//                               handleLeaveChange(index, "leave_name", e.target.value)
//                             }
//                           />
//                         </div>
//                         <div className="form-group mb-3">
//                           <Input_text
//                             type="number"
//                             name="total_leaves"
//                             placeholder="Total Leaves"
//                             value={leave.total_leaves}
//                             onChange={(e) =>
//                               handleLeaveChange(index, "total_leaves", e.target.value)
//                             }
//                           />
//                         </div>
//                       </div>
//                     ))}

//                     <button
//                       type="button"
//                       className="btn btn-outline-primary mb-3"
//                       onClick={handleAddLeave}
//                     >
//                       Add Another Leave
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-outline-primary mb-3"
//                       onClick={handledeletLeave}
//                     >
//                       delete Another Leave
//                     </button>
                    
//                   </div>
//                 </div>
//                 <div className="form-button text-center">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="btn btn-primary"
//                     style={{
//                       background: applicationColor.buttonColor,
//                       color: "white",
//                     }}
//                   >
//                     {loading ? <Loader /> : edit ? "Update Designation" : "Add Designation"}
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LeavesSettings;
import React, { useState, useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useStateContext } from "../../../../Contexts/StateContext";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
import { Input_text } from "../../../../common/ALLINPUTS/AllInputs";
import Loader from "../../../../Loader/Loader";
import { useFunctionContext } from "../../../../Contexts/FunctionContext";
import { toastOptions } from "../../../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../../../services/mainService";
import Joi from "joi";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri"; // Import delete icon

const LeavesSettings = ({ selectedLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { applicationColor } = useThemeContext();
  const [editingItem, setEditingItem] = useState({});
  const { loading, setErrors, setLoading, orgDetails, setOrgDetails } =
    useStateContext();
  const [mergedData, setMergedData] = useState([]);
  const { checkErrors } = useFunctionContext();

  const fields = ["leave_name", "total_leaves"];
  const placeholders = ["Leave Name", "Total Leaves"];
  const types = ["text", "number"];
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];

  const leavesSchema = {
    organisation_id: Joi.string().min(10).max(18).required(),
    designation_name: Joi.string().trim().strip().min(5).max(20).required(),
    designation_id: Joi.string().allow(null, "").optional(),
    leaves: Joi.array()
      .items(
        Joi.object({
          leave_name: Joi.string().min(4).max(15).required(),
          total_leaves: Joi.number().min(1).max(10).required(),
        })
      )
      .required(),
  };

  const [formData, setFormData] = useState({
    designation_name: "",
    designation_id: null,
    leaves: [],
  });

  useEffect(() => {
    if (edit && editingItem) {
      setFormData({
        ...editingItem,
        organisation_id: orgDetails?.organisation_id || "",
      
      });
    } else {
      setFormData({
        designation_name: "",
        designation_id: null,
        leaves: [],
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
  };

  const handleCloseModal = () => {
    setErrors({});
    setShowModal(false);
    setLoading(false);
    setEdit(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLeaveChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedLeaves = [...prev.leaves];
      updatedLeaves[index] = { ...updatedLeaves[index], [field]: value };
      return { ...prev, leaves: updatedLeaves };
    });
  };

  const handleAddLeave = () => {
    setFormData((prev) => ({
      ...prev,
      leaves: [...prev.leaves, { leave_name: "", total_leaves: 0 }],
    }));
  };

  const handleDeleteLeave = (index) => {
    setFormData((prev) => {
      const updatedLeaves = prev.leaves.filter((_, i) => i !== index);
      return { ...prev, leaves: updatedLeaves };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await checkErrors(leavesSchema, formData);
      const dataToSubmit = { ...formData };
      const response = await backEndCallObjNothing(
        "/user/add_update_designation",
        dataToSubmit
      );
      setMergedData((prevMergedData) => [...prevMergedData, response]);
      setOrgDetails(response.data);
      toastOptions.success(response.success || "Operation Successful");

      setFormData({
        designation_name: "",
        designation_id: null,
        leaves: [],
      });
      setEdit(false);
      setShowModal(false);
    } catch (error) {
      toastOptions.error(
        error?.response?.data || error[0]?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setShowModal(false);
  };
console.log(orgDetails.designations,"orgdetails")
  return (
    <div className="">
      <section
        className="roles-table"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <div className={`leave-cards ${showModal ? "d-none" : "d-block"}`}>
          <section className="row">
            <div className="mb-4 text-end">
              <button
                className="dropdown-item d-flex align-items-center justify-content-end"
                type="button"
                onClick={handleAddItems}
              >
                <span className="add-role me-1">Add</span>
                <RiAddCircleFill />
              </button>
            </div>

            {/* {orgDetails?.designations?.length > 0 ? (
              orgDetails?.designations?.leaves?.map((item, index) => (
                <div className="col-xl-4 mb-3" key={index}>
                  <div className="card">
                    <div
                      className="card-body"
                      onClick={() => handleEditItems(item.leave_id, item)}
                      style={{
                        background: applicationColor.cardBg1,
                        color: applicationColor.readColor1,
                      }}
                    >
                      <h5 className="card-title text-primary fw-bold">
                        {item.leave_name}
                      </h5>
                      <p>
                        <strong>Total Leaves:</strong> {item.total_leaves}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {item.status ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                There is no data in your location
              </div>
            )} */}

{orgDetails?.designations?.length > 0 ? (
  orgDetails.designations.map((designation, index) => (
    <div className="col-12 mb-4" key={index}>
      <h4 className="text-primary fw-bold">{designation.designation_name}</h4>
      {designation.leaves?.length > 0 ? (
        designation.leaves.map((item, leaveIndex) => (
          <div className="col-xl-4 mb-3" key={leaveIndex}>
            <div className="card">
              <div
                className="card-body"
                onClick={() => handleEditItems(item.leave_id, item)}
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                <h5 className="card-title text-primary fw-bold">
                  {item.leave_name}
                </h5>
                <p>
                  <strong>Total Leaves:</strong> {item.max_leaves}
                </p>
               
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          No leaves data available for this designation
        </div>
      )}
    </div>
  ))
) : (
  <div className="col-12 text-center">
    There is no data in your location
  </div>
)}


          </section>
        </div>

        <div className={`leave-form ${showModal ? "d-block" : "d-none"}`}>
          {showModal && (
            <>
              <div className="fs-3 mb-3">
                <IoArrowBackSharp
                  onClick={handleGoBack}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row mb-2 justify-content-center">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <Input_text
                        type="text"
                        name="designation_name"
                        setForm={setFormData}
                        value={formData.designation_name}
                        placeholder="Designation Name"
                        onChange={handleChange}
                      />
                    </div>

                    {formData.leaves.map((leave, index) => (
                      <div key={index} className="leave-item">
                        <div className="d-flex align-items-center">
                          <div className="form-group mb-3 me-2 flex-grow-1">
                            <Input_text
                              type="text"
                              name="leave_name"
                              placeholder="Leave Name"
                              value={leave.leave_name}
                              onChange={(e) =>
                                handleLeaveChange(index, "leave_name", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-group mb-3 me-2 flex-grow-1">
                            <Input_text
                              type="number"
                              name="total_leaves"
                              placeholder="Total Leaves"
                              value={leave.total_leaves}
                              onChange={(e) =>
                                handleLeaveChange(index, "total_leaves", e.target.value)
                              }
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteLeave(index)}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn btn-outline-primary mb-3"
                      onClick={handleAddLeave}
                    >
                      Add Another Leave
                    </button>
                  </div>
                </div>
                <div className="form-button text-center">
                  <button
                    type="submit"
                    className="btn btn-outline-success btn-block me-2"
                  >
                    {edit ? "Update Designation" : "Save Designation"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default LeavesSettings;
