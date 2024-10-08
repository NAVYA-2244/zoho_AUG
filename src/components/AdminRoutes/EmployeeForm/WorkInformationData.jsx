import React from "react";
import { Input_text } from "../../common/ALLINPUTS/AllInputs";
import schema from "../../AllSchema/EmployeeSchema";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";

const WorkInformationData = ({ formData, setFormData }) => {
  const { refs } = useStateContext();
  const { applicationColor } = useThemeContext();

  return (
    <>
      <hr style={{ marginTop: "20px" }} />
      <div
        className="row basic-row"
        style={{
          background: applicationColor.mainInputBg,
          color: applicationColor.readColor1,
        }}
      >
        <h6 className="heading-form">Identity Details</h6>

        <div className="col-lg-3 col-md-3 col-sm-6">
          <Input_text
            type={"text"}
            name={"uan"}
            label="UAN Number"
            placeholder={" Ex: 7738299899"}
            value={formData.uan}
            setForm={setFormData}
            schema={schema.uan}
            inputRef={(el) => (refs.current.uan = el)}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6">
          <Input_text
            type={"text"}
            name={"pan"}
            label="PAN Number"
            placeholder={"Ex: AFZPK7190K"}
            value={formData.pan}
            setForm={setFormData}
            maxLength={10}
            schema={schema.pan}
            inputRef={(el) => (refs.current.pan = el)}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6">
          <Input_text
            type={"tel"}
            name={"aadhaar"}
            label="Aadhaar Number"
            placeholder={"Ex: 2653 8564 4663"}
            value={formData.aadhaar}
            setForm={setFormData}
            schema={schema.aadhaar}
            inputRef={(el) => (refs.current.aadhaar = el)}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6">
          <Input_text
            type={"text"}
            name={"passport_number"}
            label="Passport Number"
            placeholder={"Ex: JF887654389"}
            value={formData.passport_number}
            setForm={setFormData}
            schema={schema.passport_number}
            inputRef={(el) => (refs.current.passport_number = el)}
          />
        </div>
      </div>
      <hr />
    </>
  );
};

export default WorkInformationData;
