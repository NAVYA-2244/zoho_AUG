import React, { useState } from "react";
import "./AdminAttendanceModal.scss";
import { RxCross1 } from "react-icons/rx";
import { boolean } from "joi";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import { useStateContext } from "../../../Contexts/StateContext";
import { Input_text, Time_Input } from "../../../common/ALLINPUTS/AllInputs";
import Loader from "../../../Loader/Loader";
import { makeNetworkCall } from "../../../../HttpServices/HttpService";

const AdminAttendanceModal = () => {
  const {
    setErrors,
    attendanceModalData,
    loadingTerm,
    setLoadingTerm,
    loading,
    setLoading,
    setAttendanceModal,
  } = useStateContext();
  const { applicationColor } = useThemeContext();

  const [formData, setFormData] = useState(
    Object.fromEntries(
      attendanceModalData.fields.map((item) => {
        if (attendanceModalData.edit) {
          return [item, attendanceModalData.editingItem[item]];
        } else {
          return [item, ""];
        }
      })
    )
  );

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
            {attendanceModalData.edit ? "Edit" : "Add"}{" "}
            {attendanceModalData.heading}
          </h4>
          <span className="icon" onClick={attendanceModalData.onClose}>
            <RxCross1 />{" "}
          </span>
        </div>

        <form
          style={{ maxHeight: "300px" }}
          onSubmit={async (e) => {
            try {
              await attendanceModalData.handleSubmit(e, formData);
              setAttendanceModal(false);
              setErrors({});
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          {attendanceModalData.fields.map((field, index) => {
            if (["checkInTime", "checkOutTime"].includes(field)) {
              return (
                <div className="form-group" key={field}>
                  {/* <label>{editingItem[field]}</label> */}
                  <Time_Input
                    type={"time"}
                    name={field}
                    setForm={setFormData}
                    value={formData[field]}
                    placeholder={attendanceModalData.placeholders[index]}
                    schema={attendanceModalData.schema[field]}
                  />
                </div>
              );
            } else {
              <div className="form-group" key={field}>
                {/* <label>{editingItem[field]}</label> */}
                <Input_text
                  type={"text"}
                  name={field}
                  setForm={setFormData}
                  value={formData[field]}
                  placeholder={attendanceModalData.placeholders[index]}
                  schema={attendanceModalData.schema[field]}
                />
              </div>;
            }

            return (
              <div className="form-group" key={field}>
                {/* <label>{editingItem[field]}</label> */}
                <Input_text
                  type={attendanceModalData.types[index]}
                  name={field}
                  setForm={setFormData}
                  value={formData[field]}
                  placeholder={attendanceModalData.placeholders[index]}
                  schema={attendanceModalData.schema[field]}
                />
              </div>
            );
          })}

          <div
            className="modal-button"
            style={{
              background: applicationColor.cardBg1,
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                background: applicationColor.buttonColor,
                color: "white",
                width: "fit-content",
                padding: "5px 20px",
              }}
            >
              {" "}
              {loading && loadingTerm === "updatingEmployeeAttendance" ? (
                <Loader />
              ) : (
                <>
                  {attendanceModalData.edit ? "Edit" : "Add"}{" "}
                  {attendanceModalData.heading}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAttendanceModal;
