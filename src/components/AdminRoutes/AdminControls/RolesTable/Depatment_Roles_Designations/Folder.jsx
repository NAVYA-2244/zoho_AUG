import React, { useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useStateContext } from "../../../../Contexts/StateContext";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
import {
  Input_text,
  SelectInputs,
} from "../../../../common/ALLINPUTS/AllInputs";
import "../../RolesTable/RolesTable.scss";
import Loader from "../../../../Loader/Loader";
import { useFunctionContext } from "../../../../Contexts/FunctionContext";
import { toastOptions } from "../../../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../../../services/mainService";
import Joi from "joi";
import { IoArrowBackSharp } from "react-icons/io5";
import Select from "react-select";
import { PiFoldersFill } from "react-icons/pi";
import "../../../../../components/Folders/Folders.scss";

const FileUploadForm = ({ selectedLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { applicationColor } = useThemeContext();
  const [editingItem, setEditingItem] = useState({});
  const [settingId, setSettingId] = useState("");
  const { loading, setErrors, setLoading, orgDetails, setOrgDetails, errors } =
    useStateContext();
  const [mergedData, setMergedData] = useState([]);
  const { checkErrors } = useFunctionContext();

  const fields = ["max_file_size"];
  const placeholders = ["max_file_size"];
  const types = ["number"];
  const fileFormatOptions = [
    { value: "pdf", label: "PDF" },
    { value: "doc", label: "DOC" },
    { value: "docx", label: "DOCX" },
    { value: "jpg", label: "JPG" },
    { value: "png", label: "PNG" },
    { value: "txt", label: "TXT" },
  ];
  const filesettingschema = {
    organisation_id: Joi.string().min(10).max(18).required(),
    // location_id: Joi.string().min(15).max(17).required(),
    file_settings_id: Joi.string().allow(null, "").optional(),
    file_upload_status: Joi.boolean().required(),
    max_file_size: Joi.number().positive().required(), // in KB format
    supported_file_formats: Joi.array().items(Joi.string()).min(1).required(),
  };

  const [formData, setFormData] = useState({
    organisation_id: orgDetails?.organisation_id || "",
    // location_id: selectedLocation?.location_id || "",
    file_upload_status: false,
    max_file_size: "",
    supported_file_formats: [], // Ensure it's initialized as an array
  });

  useEffect(() => {
    if (edit && editingItem) {
      setFormData({
        ...editingItem,
        organisation_id: orgDetails?.organisation_id || "",
        // location_id: selectedLocation?.location_id || "",
      });
    } else {
      setFormData({
        organisation_id: orgDetails?.organisation_id || "",
        // location_id: selectedLocation?.location_id || "",
        file_upload_status: false,
        max_file_size: "",
        supported_file_formats: [],
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
    setSettingId(id);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e);

    try {
      setLoading(true);
      const dataToSubmit = {
        ...formData,
        supported_file_formats: Array.isArray(formData.supported_file_formats)
          ? formData.supported_file_formats
          : [],
      };

      await checkErrors(filesettingschema, dataToSubmit);

      const response = await backEndCallObjNothing(
        "/user/add_file_settings",
        dataToSubmit
      );

      setMergedData((prevMergedData) => [...prevMergedData, response]);
      setOrgDetails(response.data);
      toastOptions.success(response.success || "Operation Successful");

      setFormData({
        organisation_id: orgDetails?.organisation_id || "",
        // location_id: selectedLocation?.location_id || "",
        file_upload_status: false,
        max_file_size: "",
        supported_file_formats: [],
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

  const handleSelectChange = (selectedOptions) => {
    // console.log(selectedOptions, "aa");
    setFormData({
      ...formData,
      supported_file_formats: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };
  return (
    <section
      className="roles-table"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
      }}
    >
      <div className={`leave-cards ${showModal ? "d-none" : "d-block"}`}>
        <div className="mb-4 text-end">
          <button
            className="dropdown-item d-flex align-items-center justify-content-end"
            type="button"
            onClick={handleAddItems}
          >
            <span className="add-role me-1">Add</span>
            <RiAddCircleFill />
          </button>{" "}
        </div>
        <div className="folders">
          <div className="all-folders row">
            {selectedLocation?.files?.length > 0 ? (
              selectedLocation.files.map((item, index) => (
                <div
                  key={index}
                  className="col-lg-3"
                  onClick={() => handleEditItems(item.file_settings_id, item)}
                >
                  <div className="folder">
                    <h2
                      className="folder-icon"
                      style={{ color: applicationColor.buttonColor }}
                    >
                      <PiFoldersFill />
                    </h2>
                    <h6
                      className="folder-name"
                      style={{ color: applicationColor.readColor1 }}
                    >
                      <p className="">
                        Supported_File_formats : {item.supported_file_formats}
                      </p>
                      <p>ID: {item.file_settings_id}</p>
                    </h6>
                  </div>

                  {/* <div className="p-3 rounded-3 default-border">
                    <p className="text-primary fw-semibold text-uppercase">
                      Supported_File_formats : {item.supported_file_formats}
                    </p>
                    <p>ID: {item.file_settings_id}</p>
                  </div> */}
                </div>
              ))
            ) : (
              <div className="text-center">
                There is no data in your location
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`leave-form ${showModal ? "d-block" : "d-none"}`}>
        {showModal && (
          <>
            <div className="fs-3">
              <IoArrowBackSharp
                onClick={handleGoBack}
                style={{ cursor: "pointer" }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-button">
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: applicationColor.buttonColor,
                    color: "white",
                  }}
                >
                  {loading ? <Loader /> : edit ? "Update Setting" : "Add Files"}
                </button>
              </div>

              <div className="row mb-2 justify-content-center">
                <div className="col-6">
                  <div className="org-heading">
                    <p>File_Upload_Status</p>
                  </div>
                  <div className="new-div">
                    <section
                      className="checkbox-card"
                      style={{ color: applicationColor.readColor1 }}
                    >
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          role="switch"
                          id="file_upload_status"
                          name="file_upload_status"
                          checked={formData.file_upload_status}
                          onChange={handleChange}
                        />
                        <span
                          className="form-check-label"
                          htmlFor="file_upload_status"
                        >
                          {formData.file_upload_status ? "true" : "false"}
                        </span>
                      </div>
                    </section>
                  </div>
                  {fields.map((field, index) => (
                    <div className="form-group" key={field}>
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
                  <div>
                    <label>
                      Supported File Formats:
                      <Select
                        isMulti
                        name="supported_file_formats"
                        options={fileFormatOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                        value={fileFormatOptions.filter((option) =>
                          formData.supported_file_formats.includes(option.value)
                        )}
                      />
                    </label>
                    {errors.supported_file_formats && (
                      <div>{errors.supported_file_formats}</div>
                    )}
                  </div>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <section
                    className="org_status"
                    style={{ color: applicationColor.readColor1 }}
                  ></section>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};
export default FileUploadForm;
