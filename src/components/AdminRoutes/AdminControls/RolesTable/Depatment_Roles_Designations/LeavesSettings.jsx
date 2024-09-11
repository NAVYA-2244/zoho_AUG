import React, { useState } from "react";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
import { useStateContext } from "../../../../Contexts/StateContext";
import { useFunctionContext } from "../../../../Contexts/FunctionContext";
import { backEndCallObjNothing } from "../../../../../services/mainService";
import { toastOptions } from "../../../../../Utils/FakeRoutes";
import Loader from "../../../../Loader/Loader";
import Joi from "joi";
import { RiEdit2Fill } from "react-icons/ri";
import Roles from './Roles';

const LeavesSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    leave_name: "",
    total_leaves: 0,
    leave_id: "",
    role_id: "", // This is hidden but used in payload
  });
  const [errors, setErrors] = useState({});
  const [btndisabled, setBtndisabled] = useState(false);

  const { applicationColor } = useThemeContext();
  const { loading, setLoading, orgDetails, setOrgDetails } = useStateContext();
  const { checkErrors } = useFunctionContext();

  // Joi schema for validation
  const schema = Joi.object({
    organisation_id: Joi.string().min(5).max(20).required(),
    role_id: Joi.string().min(5).max(12).required(),
    leave_name: Joi.string()
      .required()
      .min(4)
      .max(15)
      .regex(/^[a-zA-Z0-9\s]+$/)
      .messages({
        "string.pattern.base": "Leave name can only contain alphanumeric characters and spaces.",
      }),
    total_leaves: Joi.number()
      .required()
      .min(1)
      .max(100)
      .messages({
        "number.min": "Total leaves must be at least 1.",
        "number.max": "Total leaves cannot exceed 10.",
      }),
    leave_id: Joi.string().optional().allow(""),
  });

  const handleAddItems = (role_id) => {
    setFormData({
      leave_name: "",
      total_leaves: 0,
      leave_id: "",
      role_id: role_id,
    });
    setShowModal(true);
    setEdit(false);
  };

  const handleEditItems = (leave, role_id) => {
    setFormData({
      leave_name: leave.leave_name,
      total_leaves: leave.total_leaves,
      leave_id: leave.leave_id,
      role_id:role_id, // Pass designation_id directly
    });
    setShowModal(true);
    setEdit(true);
  };

  const handleCloseModal = () => {
    setErrors({});
    setShowModal(false);
    setLoading(false);
    setEdit(false);
  };

  const handleLeaveChange = (field, value) => {
    let sanitizedValue = value;

    if (field === "leave_name") {
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [field]: sanitizedValue,
    }));

    const { error } = schema.validate({ ...formData, [field]: sanitizedValue }, { abortEarly: false });
    if (error) {
      const errorsObj = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(errorsObj);
    } else {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform full form validation
    const { error } = schema.validate({
      ...formData,
      organisation_id: orgDetails?.organisation_id,
    }, { abortEarly: false });

    // if (error) {
    //   const errorsObj = error.details.reduce((acc, curr) => {
    //     acc[curr.path[0]] = curr.message;
    //     return acc;
    //   }, {});
    //   setErrors(errorsObj);
    //   return;
    // }

    try {
      setLoading(true);
      setBtndisabled(true);

      const dataToSubmit = {
        organisation_id: orgDetails?.organisation_id,
        role_id: formData.role_id.trim(), // Include designation_id in payload
        leave_name: formData.leave_name.trim(),
        total_leaves: formData.total_leaves,
        leave_id: formData.leave_id ? formData.leave_id.trim(): "",
      };
      // const dataToSubmit = {
      //   ...formData,
      //   designation_name: formData.designation_name.trim(),
      //   organisation_id: formData.organisation_id.trim(),
      //   designation_id: formData.designation_id ? formData.designation_id.trim() : "",
      // };

      const response = await backEndCallObjNothing("/org/add_update_leave", dataToSubmit);
      setOrgDetails(response.data);
      toastOptions.success(response.success || "Operation Successful");

      setFormData({
        leave_name: "",
        total_leaves: 0,
        leave_id: "",
        role_id: "", // Reset designation_id
      });
      setErrors({});
      setEdit(false);
      setShowModal(false);
      setBtndisabled(false);
    } catch (error) {
      setBtndisabled(false);
      toastOptions.error(error?.response?.data || error[0] || "An error occurred");
    } finally {
      setLoading(false);
      setBtndisabled(false);
    }
  };

  return (
    <div className="container">
      <section
        className="roles-table"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
   <section className="row">
  {orgDetails?.roles?.length > 0 ? (
    <div className="row">
      {orgDetails?.roles?.map((roles, index) => (
        <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
          <div
            className="admin-controls-card position-relative"
            style={{
              background: '#f8f9fa', // Clean background color
              color: '#343a40', // Dark text color for readability
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h5 className="mb-3 d-flex justify-content-between align-items-center" style={{ fontWeight: '600' }}>
                {roles.role_name}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleAddItems(roles.role_id)}
                >
                  Add Leaves
                </button>
              </h5>
              <div>
                {roles.leaves?.length > 0 ? (
                  roles.leaves.map((item, leaveIndex) => (
                    <div
                      className="leave-item d-flex justify-content-between align-items-center mb-2"
                      key={leaveIndex}
                      style={{
                        padding: '10px',
                        backgroundColor: '#ffffff', // White background for leave items
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                      }}
                      onClick={() => handleEditItems(item, roles.role_id)}
                    >
                      {/* <h6 className="mb-0" style={{ fontSize: '1rem', marginRight: 'auto' }}>
                        {item.leave_name}
                      </h6> */}
                      <h5 className="mb-0" style={{ fontSize: '1rem', marginRight: 'auto' }}>
  {item?.leave_name
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' ')}
</h5>

                      <span style={{ fontSize: '0.9rem' }}>{item.total_leaves}</span>
                      {/* <RiEdit2Fill
                     
                        
                      /> */}
                    </div>
                  ))
                ) : (
                  <p>No leaves data available for this designation</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="no-data">No Designations Available</div>
  )}
</section>


        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{edit ? "Edit Leave" : "Add Leave"}</h5>
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="leave_name">Leave Name:</label>
                      <input
                        type="text"
                        id="leave_name"
                        className="form-control"
                        value={formData.leave_name}
                        maxLength={30}
                        onChange={(e) => handleLeaveChange("leave_name", e.target.value)}
                      />
                      {errors.leave_name && <div className="text-danger">{errors.leave_name}</div>}
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="total_leaves">Total Leaves:</label>
                      <input
                        type="number"
                        id="total_leaves"
                        className="form-control"
                        value={formData.total_leaves}
                        min={1}
                        max={100}
                        onChange={(e) => handleLeaveChange("total_leaves", e.target.value)}
                      />
                      {errors.total_leaves && <div className="text-danger">{errors.total_leaves}</div>}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="hidden"
                        id="designation_id"
                        value={formData.designation_id} // Hidden field
                      />
                    </div>
                    {/* <div className="modal-footer"> */}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={btndisabled}
                      >
                        {edit ? "Update" : "Add"} Leave
                      </button>
                    {/* </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && <Loader />}
      </section>
    </div>
  );
};

export default LeavesSettings;
