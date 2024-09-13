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


const Designations = () => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { applicationColor } = useThemeContext();
  const [editingItem, setEditingItem] = useState({});
  const [settingId, setSettingId] = useState("");
  const { loading, setErrors, setLoading, orgDetails, setOrgDetails } = useStateContext();
  const { checkErrors } = useFunctionContext();

  const fields = ["designation_name"];
  const placeholders = ["Designation Name"];
  const types = ["text"];

  const designationSchema = {
    _id: Joi.string().optional(),
    organisation_id: Joi.string().min(10).max(18).required(),
    designation_name: Joi.string().trim().strip().min(5).max(40).required(),
    designation_id: Joi.string().allow(null, "").optional(),
  };

  const [formData, setFormData] = useState(() => ({
    designation_name: "",
    organisation_id: orgDetails?.organisation_id || "",
    designation_id: "",
  }));
  useEffect(() => {
    if (edit && editingItem) {
      // Manually construct the formData object excluding `leaves`
      const formData = {
        designation_name: editingItem.designation_name || "",
        organisation_id: orgDetails?.organisation_id || "",
        designation_id: editingItem.designation_id || "",
        // Add other properties you need, excluding `leaves`
      };
  
      setFormData(formData);
    } else {
      // Adding mode
      setFormData({
        designation_name: "",
        organisation_id: orgDetails?.organisation_id || "",
        designation_id: "",
      });
    }
  }, [edit, editingItem, orgDetails]);
  
console.log("edtitem",editingItem)
  const handleAddItems = () => {
    setShowModal(true);
    setEdit(false);
  };

  const handleEditItems = (id, item) => {
    console.log(item,"item")
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
      
      await checkErrors(designationSchema, formData);
      
      // const dataToSubmit = {
      //   ...formData,
      // };
      const dataToSubmit = {
        ...formData,
        designation_name: formData.designation_name.trim(),
        organisation_id: formData.organisation_id.trim(),
        designation_id: formData.designation_id ? formData.designation_id.trim() : "",
      };
      const response = await backEndCallObjNothing(
        "/org/add_update_designation", // Updated route
        dataToSubmit
      );

      setOrgDetails(response.data);
      toastOptions.success(response.success || "Operation Successful");

      setFormData({
        designation_name: "",
        organisation_id: orgDetails?.organisation_id || "",
        designation_id: "",
      });
      setEdit(false);
      setShowModal(false);
    } catch (error) {
      if(error?.response?.data ){
        
      toastOptions.error(
        error?.response?.data 
      );
    }
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
          <div className={`department-cards ${showModal ? "d-none" : "d-block"}`}>

               <section className="row">
      <div className="mb-4 d-flex justify-content-end">
        <button
          className="btn btn-primary d-flex align-items-center"
          type="button"
          onClick={handleAddItems}
        >
          <RiAddCircleFill size={24} className="me-2" />
          <span>Add Designations</span>
        </button>
      </div>

      {orgDetails?.designations?.length > 0 ? (
        orgDetails?.designations?.map((item, index) => (
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
               {/* <h5 className="card-title mb-3" style={{ fontSize: '1.25rem' }}>
                  {item.designation_name}
                </h5> */}
                <h5 className="card-title mb-3" style={{ fontSize: '1.25rem' }}>
  {item?.designation_name
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' ')} 
</h5>
                <p className="card-text text-muted mb-4">
                  Desigantion ID: {item.designation_id}
                </p>
                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => handleEditItems(item.designation_id, item)}
                >
                  Edit Designation
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          No Designations available.
        </div>
      )}
    </section>
          </div>

          <div className={`role-form ${showModal ? "d-block" : "d-none"}`}>
            {showModal && (
              <>

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
                 <h5 className="modal-title">{edit ? "Edit designation" : "Add designation"}</h5>
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
                   Please fill out the form below to {edit ? "update the Designation" : "add a new Designation"}.
                 </p>
                 <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                   <div className="row mb-4">
                     <div className="col-12 "style={{ padding:'0'}}>
                       {fields?.map((field, index) => (
                         <div className="form-group mb-3" key={field}>
                           <Input_text
                             type={types[index]}
                             name="designation_name"
                             
                             setForm={setFormData}
                             value={formData[field]}
                             placeholder={placeholders[index]}
                             onChange={handleChange}
                             maxLength={40}
                             autofocus
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
                       {loading ? <Loader /> : edit ? "Update Designation" : "Add Designation"}
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
         
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Designations;
