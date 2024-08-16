import React, { useState, useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useStateContext } from "../../../../Contexts/StateContext";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
import {
  Input_text,
} from "../../../../common/ALLINPUTS/AllInputs";
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
  const { loading, setErrors, setLoading, orgDetails, setOrgDetails } =
    useStateContext();
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
      // Editing mode
      setFormData({
        ...editingItem,
        organisation_id: orgDetails?.organisation_id || "",
      });
    } else {
      // Adding mode
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
      const dataToSubmit = {
        ...formData,
      };

      const response = await backEndCallObjNothing(
        "/org/add_update_role",
        dataToSubmit
      );

      setOrgDetails(response.data);
      toastOptions.success(response.success || "Operation Successful");

      setFormData({
        role_name: "",
        organisation_id: orgDetails?.organisation_id || "",
        role_id: "",
      });
      setEdit(false);
      setShowModal(false);
    } catch (error) {
      console.log(error,"error")
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
            <section className="row">
              <div className="mb-4 text-end">
              {/* <button
                className="btn btn-primary d-flex align-items-center justify-content-end"
                type="button"
                onClick={handleAddItems}
              >
                <span className="me-1">Add </span>
                <RiAddCircleFill />
              </button> */}
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
                  <div className="col-xl-4 mb-3" key={index}>
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
            </section>
          </div>

          <div className={`role-form ${showModal ? "d-block" : "d-none"}`}>
            {showModal && (
              <>
                <div className="fs-3">
                  <IoArrowBackSharp
                    onClick={handleGoBack}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row justify-content-between">
                    <div className="form-button mb-4">
                      <button
                        className="py-2 px-3"
                        type="submit"
                        disabled={loading}
                        style={{
                          background: applicationColor.buttonColor,
                          color: "white",
                        }}
                      >
                        {loading ? (
                          <Loader />
                        ) : edit ? (
                          "Update Role"
                        ) : (
                          "Add Role"
                        )}
                      </button>
                    </div>

                    <div className="col-lg-9">
                      <div className="row">
                        {fields.map((field, index) => (
                          <div className="form-group col-lg-6" key={field}>
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
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default RolesAdd;
