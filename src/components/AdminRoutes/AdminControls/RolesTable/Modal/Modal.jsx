import React, { useState } from "react";
// import "./Modal.scss";
import {
  Input_checkBox,
  Input_text,
  Select_inputs,
  Time_Input,
} from "../../../../common/ALLINPUTS/AllInputs";
import Loader from "../../../../Loader/Loader";
import { useStateContext } from "../../../../Contexts/StateContext";
import { RxCross1 } from "react-icons/rx";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
const Modal = ({
  fields,
  onSubmit,
  onClose,
  heading,
  schema,
  edit,
  settingId,
  editingItem,
  placeholders,
  types,
  options,
}) => {
  const { loading, setErrors } = useStateContext();
  const { applicationColor } = useThemeContext();

  

  const [formData, setFormData] = useState(
    // edit
    //   ?
    Object.fromEntries(
      fields.map((item) => {
        // if (item === "isHoliday") {
        //   return [item, editingItem[item]];
        // } else {
        console.log(item, "item", editingItem?.[item] || "");
        return [item, editingItem[item]];
        // }
      })
    )
    // : Object.fromEntries(
    //     fields.map((item) => {
    //       if (item === "isHoliday") {
    //         return [item, false];
    //       } else {
    //         return [item, ""];
    //       }
    //     })
    //   )
  );

 

  const handleSubmit = async (e, property, id) => {
    e.preventDefault();
    try {
      await onSubmit(formData, property, id);
      onClose();
      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  const getIdFromHeading = (heading) => {
    switch (heading) {
      case "Roles":
        return "role_id";
      case "Departments":
        return "department_id";
      case "Designations":
        return "designation_id";
      case "Shifts":
        return "shiftId";
      case "Locations":
        return "locationId";
      case "Events":
        return "eventId";
      case "LeaveTypes":
        return "leaveTypeId";
      case "Folders":
        return "folderId";
      default:
        return null;
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{
          background: applicationColor.mainInputBg,
        }}
      >
        <div className="close">
          <h4 className="modal-heading">
            {edit ? "Edit" : "Add"} {heading}
          </h4>
          <span className="icon" onClick={onClose}>
            <RxCross1 />
          </span>
        </div>
        <form
          onSubmit={(e) =>
            edit
              ? handleSubmit(
                  e,
                  getIdFromHeading(heading),
                  settingId // this setting Id helps us to set the id to the handlesubmit function to update the specific item either the item in deisgnation or department or roles etc
                )
              : handleSubmit(e, "", "")
          }
        >
          {fields.map((field, index) => {
            if (["adminType", "dayType"].includes(field)) {
              return (
                <div className="form-group" key={field}>
                  <Select_inputs
                    name={field}
                    value={formData[field]}
                    options={options}
                    setForm={setFormData}
                    placeholder={placeholders[index]}
                    schema={schema.field}
                  />
                </div>
              );
            } else if (["isHoliday"].includes(field)) {
              return (
                <div className="form-group" key={field}>
                  <Input_checkBox
                    name={field}
                    checked={formData[field]}
                    schema={schema[field]}
                    setForm={setFormData}
                    placeholder={placeholders[index]}
                  />
                </div>
              );
            } else if (
              ["fromTime", "toTime", "shiftFrom", "shiftTo"].includes(field)
            ) {
              return (
                <div className="form-group" key={field}>
                  <Time_Input
                    type={"time"}
                    name={field}
                    className=" custom-date-input"
                    setForm={setFormData}
                    value={formData[field]}
                    placeholder={placeholders[index]}
                    schema={schema[field]}
                    style={{
                      background: "",
                      color: "#fff",
                    }}
                  />
                </div>
              );
            } else {
              return (
                <div className="form-group" key={field}>
                  <Input_text
                    type={types[index]}
                    name={field}
                    setForm={setFormData}
                    value={formData[field]}
                    placeholder={placeholders[index]}
                    schema={schema[field]}
                  />
                
                </div>
              );
            }
          })}

          <div className="modal-button">
            <button
              type="submit"
              disabled={loading}
              style={{
                background: applicationColor.buttonColor,
                color: "white",
              }}
            >
              {loading ? (
                <Loader />
              ) : (
                `${edit ? "Edit" : "Add"} ${heading.slice(
                  0,
                  heading.length - 1
                )}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
