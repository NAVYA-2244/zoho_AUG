import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import {
  ImageInput,
  Input_area,
  Input_checkBox,
  Input_text,
  PDFInput,
  Select_inputs,
} from "../../common/ALLINPUTS/AllInputs";
import Loader from "../../Loader/Loader";

const FilesModal = () => {
  const {
    setErrors,
    loadingTerm,
    setLoadingTerm,
    loading,
    setLoading,
    fileModal,
    setFileModal,
    fileModalData,
    setFileModalData,
    employeeDetails,
    adminData2,
  } = useStateContext();
  console.log(employeeDetails, "employee");
  console.log(adminData2, "admin");
  const { applicationColor } = useThemeContext();
  const [allEmployeeIds, setAllEmployeeIds] = useState([]);
  // console.log(allEmployeeIds, "allemployes")
  useEffect(() => {
    if (
      employeeDetails.adminType === "1" &&
      Object.keys(adminData2).length > 0
    ) {
      setAllEmployeeIds(adminData2.employeeData);
    }
  }, [adminData2, employeeDetails]);

  const [formData, setFormData] = useState(
    Object.fromEntries(
      fileModalData.fields.map((field) => {
        if (fileModalData.edit) {
          return [field, fileModalData.editingItem[field]];
        } else if (
          [
            "employeeView",
            "reportingManagerView",
            "employeeDownload",
            "reportingManagerDownload",
          ].includes(field)
        ) {
          return [field, false];
        } else {
          return [field, ""];
        }
      })
    )
  );

  console.log(formData, "editingItem");

  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{
          background: applicationColor.mainInputBg,
          color: applicationColor.readColor1,
        }}
      >
        <div className="close">
          <h4 className="modal-heading">
            {fileModalData.edit ? "Edit" : "Add"} {fileModalData.heading}
          </h4>
          <span className="icon" onClick={fileModalData.onClose}>
            <RxCross1 />{" "}
          </span>
        </div>

        <form
          style={{ maxHeight: "300px" }}
          onSubmit={async (e) => {
            try {
              await fileModalData.handleSubmit(e, formData);
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          {fileModalData.fields.map((field, index) => {
            if (field === "file") {
              return (
                <div className="form-group" key={field}>
                  {/* <label>{editingItem[field]}</label> */}
                  <PDFInput
                    id={field}
                    name={field}
                    setForm={setFormData}
                    placeholder={fileModalData.placeholders[index]}
                    value={formData[field]}
                    schema={fileModalData.schema[field]}
                    imp
                  />
                </div>
              );
            } else if (
              [
                "employeeView",
                "reportingManagerView",
                "employeeDownload",
                "reportingManagerDownload",
              ].includes(field)
            ) {
              return (
                <div className="form-group" key={field}>
                  {/* <label>{editingItem[field]}</label> */}
                  <Input_checkBox
                    name={field}
                    checked={formData[field]}
                    // schema={schema[field]}
                    setForm={setFormData}
                    placeholder={fileModalData.placeholders[index]}
                  />
                </div>
              );
            } else if (field === "description") {
              return (
                <div className="form-group" key={field}>
                  {/* <label>{fileModalData.editingItem[field]}</label> */}
                  <Input_area
                    type={"textarea"}
                    name={field}
                    placeholder={fileModalData.placeholders[index]}
                    value={formData[field]}
                    setForm={setFormData}
                    schema={fileModalData.schema[field]}
                    imp
                  />
                </div>
              );
            } else if (field === "employeeId") {
              return (
                <div className="form-group" key={field}>
                  {/* <label>{editingItem[field]}</label> */}
                  <Select_inputs
                    name={field}
                    value={formData[field]}
                    options={allEmployeeIds}
                    setForm={setFormData}
                    valueProperty={"employeeId"}
                    property={"employeeName"}
                    placeholder={fileModalData.placeholders[index]}
                    schema={fileModalData.schema[field]}
                    imp
                  />
                </div>
              );
            } else {
              return (
                <div className="form-group" key={field}>
                  {/* <label>{editingItem[field]}</label> */}
                  <Input_text
                    type={"text"}
                    name={field}
                    setForm={setFormData}
                    value={formData[field]}
                    placeholder={fileModalData.placeholders[index]}
                    schema={fileModalData.schema[field]}
                    imp
                  />
                </div>
              );
            }
          })}

          <div
            className="modal-button"
            style={{
              background: applicationColor.cardBg1,
            }}
          >
            <button
              type="submit"
              disabled={
                loadingTerm === "updatingExsistingFile" ||
                loadingTerm === "addNewFile"
              }
              style={{
                background: applicationColor.buttonColor,
                color: "white",
                width: "fit-content",
                padding: "5px 20px",
              }}
            >
              {" "}
              {loading &&
                (loadingTerm === "updatingExsistingFile" ||
                  loadingTerm === "addNewFile") ? (
                <Loader />
              ) : (
                <>
                  {fileModalData.edit ? "Edit" : "Add"} {fileModalData.heading}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilesModal;
