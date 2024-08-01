// import React, { useState, useEffect } from "react";
// import { RiAddCircleFill } from "react-icons/ri";
// import { useStateContext } from "../../../../Contexts/StateContext";
// import { useThemeContext } from "../../../../Contexts/ThemesContext";
// import { Input_checkBox, Input_text, Select_inputs } from "../../../../common/ALLINPUTS/AllInputs";
// import Loader from "../../../../Loader/Loader";
// import { useFunctionContext } from "../../../../Contexts/FunctionContext";
// import { toastOptions } from "../../../../../Utils/FakeRoutes";
// import { backEndCallObjNothing } from "../../../../../services/mainService";
// import Joi from "joi";
// import { IoArrowBackSharp } from "react-icons/io5";

// const LeavesSettings = ({ selectedLocation }) => {
//     const [showModal, setShowModal] = useState(false);
//     const [edit, setEdit] = useState(false);
//     const { applicationColor } = useThemeContext();
//     const [editingItem, setEditingItem] = useState({});
//     const { loading, setErrors, setLoading, orgDetails, setOrgDetails } = useStateContext();
//     const [mergedData, setMergedData] = useState([]);
//     const { checkErrors } = useFunctionContext();

//     const fields = ["leave_name", "default_leaves"];
//     const placeholders = ["Leave Name", "Default Leaves"];
//     const types = ["text", "number"];
//     const options = {};
//     const leavesSchema = {
//         leave_id: Joi.string().optional(),
//         leave_name: Joi.string().min(2).max(18).required(),
//         status: Joi.boolean().required(),
//         organisation_id: Joi.string().min(10).max(18).required(),
//         location_id: Joi.string().min(15).max(17).required(),
//         default_leaves: Joi.number().positive().required()
//     };

//     const [formData, setFormData] = useState({
//         leave_name: "",
//         status: false,
//         organisation_id: orgDetails?.organisation_id || '',
//         location_id: selectedLocation?.location_id || '',
//         default_leaves: 0
//     });

//     useEffect(() => {
//         if (edit && editingItem) {

//             setFormData({
//                 ...editingItem,
//                 organisation_id: orgDetails?.organisation_id || '',
//                 location_id: selectedLocation?.location_id || ''
//             });
//         } else {

//             setFormData({
//                 leave_name: "",
//                 status: false,
//                 organisation_id: orgDetails?.organisation_id || '',
//                 location_id: selectedLocation?.location_id || '',
//                 default_leaves: 0
//             });
//         }
//     }, [edit, editingItem, orgDetails, selectedLocation]);

//     // console.log(orgDetails, "orgdetaials");

//     const handleAddItems = () => {
//         setShowModal(true);
//         setEdit(false);
//     };

//     const handleEditItems = (id, item) => {
//         setEditingItem(item);
//         setEdit(true);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setErrors({});
//         setShowModal(false);
//         setLoading(false);
//         setEdit(false);
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: type === "checkbox" ? checked : value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("enter")
//         try {
//             setLoading(true);
//             await checkErrors(leavesSchema, formData);
//             console.log("enter2")
//             const dataToSubmit = { ...formData };
//             const response = await backEndCallObjNothing("/user/add_leaves", dataToSubmit);
//             setMergedData((prevMergedData) => [...prevMergedData, response]);
//             setOrgDetails(response.data);
//             toastOptions.success(response.success || "Operation Successful");

//             setFormData({
//                 leave_name: "",
//                 status: false,
//                 organisation_id: orgDetails?.organisation_id || '',
//                 location_id: selectedLocation?.location_id || '',
//                 default_leaves: 0
//             });
//             setEdit(false);
//             setShowModal(false);
//         } catch (error) {
//             toastOptions.error(error?.response?.data || error[0]?.message || "An error occurred");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleGoBack = () => {
//         setShowModal(false);
//     };

//     return (
//         <>
//             <div className="">
//                 <section className="roles-table"
//                     style={{
//                         background: applicationColor.cardBg1,
//                         color: applicationColor.readColor1,
//                     }}>
//                     <div className={`leave-cards ${showModal ? 'd-none' : 'd-block'}`}>
//                         <section className="row">
//                             <div className="mb-4 text-end">
//                                 <button className="dropdown-item d-flex align-items-center justify-content-end"
//                                     type="button"
//                                     onClick={handleAddItems}>
//                                     <span className="add-role me-1">Add</span>
//                                     <RiAddCircleFill />
//                                 </button>
//                             </div>

//                             {selectedLocation?.leaves?.length > 0 ? (
//                                 selectedLocation.leaves.map((item, index) => (
//                                     <div className="col-xl-4 mb-3" key={index}>
//                                         <div className="card">
//                                             <div className="card-body" onClick={() => handleEditItems(item.leave_id, item)}>
//                                                 <h5 className="card-title text-primary fw-bold">{item.leave_name}</h5>
//                                                 <p>
//                                                     <strong>Default Leaves:</strong> {item.default_leaves}
//                                                 </p>
//                                                 <p>
//                                                     <strong>Status:</strong> {item.status ? 'Active' : 'Inactive'}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="col-12 text-center">There is no data in your location</div>
//                             )}
//                         </section>
//                     </div>

//                     <div className={`leave-form ${showModal ? 'd-block' : 'd-none'}`}>
//                         {showModal && (
//                             <>
//                                 <div className="fs-3">
//                                     <IoArrowBackSharp onClick={handleGoBack} style={{ cursor: 'pointer' }} />
//                                 </div>
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="row mb-2 justify-content-center">
//                                         <div className="col-6">
//                                             {fields.map((field, index) => (
//                                                 <div className="form-group" key={field}>
//                                                     <Input_text
//                                                         type={types[index]}
//                                                         name={field}
//                                                         setForm={setFormData}
//                                                         value={formData[field]}
//                                                         placeholder={placeholders[index]}
//                                                         onChange={handleChange}
//                                                     />
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="col-6 d-flex justify-content-center">
//                                             <section className="org_status"
//                                                 style={{ color: applicationColor.readColor1 }}>
//                                                 <div className="org-heading">
//                                                     <h3>Status</h3>
//                                                 </div>
//                                                 <div className="new-div">
//                                                     <section className="checkbox-card"
//                                                         style={{ color: applicationColor.readColor1 }}>
//                                                         <div className="form-check form-switch">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input"
//                                                                 role="switch"
//                                                                 id="status"
//                                                                 name="status"
//                                                                 checked={formData.status}
//                                                                 onChange={handleChange}
//                                                             />
//                                                             <span className="form-check-label" htmlFor="status">
//                                                                 {formData.status ? 'Active' : 'Inactive'}
//                                                             </span>
//                                                         </div>
//                                                     </section>
//                                                 </div>
//                                             </section>
//                                         </div>
//                                     </div>
//                                     <div className="form-button">
//                                         <button
//                                             type="submit"
//                                             disabled={loading}
//                                             style={{ background: applicationColor.buttonColor, color: "white" }}>
//                                             {loading ? <Loader /> : (edit ? "Update Leave" : "Add Leave")}
//                                         </button>
//                                     </div>
//                                 </form>
//                             </>
//                         )}
//                     </div>
//                 </section>
//             </div>
//         </>
//     );
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

const LeavesSettings = ({ selectedLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { applicationColor } = useThemeContext();
  const [editingItem, setEditingItem] = useState({});
  const { loading, setErrors, setLoading, orgDetails, setOrgDetails } =
    useStateContext();
  const [mergedData, setMergedData] = useState([]);
  const { checkErrors } = useFunctionContext();

  const fields = ["leave_name", "default_leaves"];
  const placeholders = ["Leave Name", "Default Leaves"];
  const types = ["text", "number"];
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];
  const leavesSchema = {
    leave_id: Joi.string().optional(),
    leave_name: Joi.string().min(2).max(18).required(),
    status: Joi.boolean().required(),
    organisation_id: Joi.string().min(10).max(18).required(),
    location_id: Joi.string().min(15).max(17).required(),
    default_leaves: Joi.number().positive().required(),
  };

  const [formData, setFormData] = useState({
    leave_name: "",
    status: false,
    organisation_id: orgDetails?.organisation_id || "",
    location_id: selectedLocation?.location_id || "",
    default_leaves: 0,
  });

  useEffect(() => {
    if (edit && editingItem) {
      setFormData({
        ...editingItem,
        organisation_id: orgDetails?.organisation_id || "",
        location_id: selectedLocation?.location_id || "",
      });
    } else {
      setFormData({
        leave_name: "",
        status: false,
        organisation_id: orgDetails?.organisation_id || "",
        location_id: selectedLocation?.location_id || "",
        default_leaves: 0,
      });
    }
  }, [edit, editingItem, orgDetails, selectedLocation]);

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

  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value === "true",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await checkErrors(leavesSchema, formData);
      const dataToSubmit = { ...formData };
      const response = await backEndCallObjNothing(
        "/user/add_leaves",
        dataToSubmit
      );
      setMergedData((prevMergedData) => [...prevMergedData, response]);
      setOrgDetails(response.data);
      toastOptions.success(response.success || "Operation Successful");

      setFormData({
        leave_name: "",
        status: false,
        organisation_id: orgDetails?.organisation_id || "",
        location_id: selectedLocation?.location_id || "",
        default_leaves: 0,
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

            {selectedLocation?.leaves?.length > 0 ? (
              selectedLocation.leaves.map((item, index) => (
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
                        <strong>Default Leaves:</strong> {item.default_leaves}
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
                    {fields.map((field, index) => (
                      <div className="form-group mb-3" key={field}>
                        <Input_text
                          type={types[index]}
                          name={field}
                          setForm={setFormData}
                          value={formData[field]}
                          placeholder={placeholders[index]}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                    {/* </div> */}
                    {/* <div className="col-md-6"> */}
                    <div className="form-group mb-3">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleStatusChange}
                        className="form-select"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-button text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{
                      background: applicationColor.buttonColor,
                      color: "white",
                    }}
                  >
                    {loading ? <Loader /> : edit ? "Update Leave" : "Add Leave"}
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
