import { Input_text, Date_Input } from "../../common/ALLINPUTS/AllInputs";
import React from "react";
import schema from "../../AllSchema/EmployeeSchema";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { FaMinus, FaPlus } from "react-icons/fa6";

const PersonalDetailsData = ({ formData, setFormData }) => {
  const { refs } = useStateContext();
  const { applicationColor } = useThemeContext();

  const addEducationDetails = () => {
    setFormData((prevData) => ({
      ...prevData,
      educational_details: [
        ...prevData.educational_details,
        {
          institute_name: "",
          degree: "",
          specialization: "",
          year_of_completion: "",
        },
      ],
    }));
  };

  const removeEducationDetails = (index) => {
    const newFormData = formData?.educational_details.filter((item, i) => {
      return i !== index;
    });
    setFormData((prevForm) => {
      return { ...prevForm, educational_details: newFormData };
    });
  };

  const addDependentDetails = () => {
    setFormData((prevData) => ({
      ...prevData,
      dependent_details: [
        ...prevData.dependent_details,
        {
          name: "",
          relation: "",
          dependent_date_of_birth: "",
        },
      ],
    }));
  };

  const removeDependentDetails = (index) => {
    const newFormData = formData?.dependent_details.filter((item, i) => {
      return i !== index;
    });
    setFormData((prevForm) => {
      return { ...prevForm, dependent_details: newFormData };
    });
  };

  return (
    <>
      <hr style={{ marginTop: "20px" }} />

      <section
        className="row basic-row new-basic-row"
        style={{
          background: applicationColor.mainInputBg,
          color: applicationColor.readColor1,
        }}
      >
        <div className="heading-button">
          <h6 className="heading-form"> Educational Details </h6>
          {formData?.educational_details?.length === 0 && (
            <div className="additional-btns">
              <button
                className="add-button"
                onClick={addEducationDetails}
                type="button"
              >
                add new
              </button>
            </div>
          )}
        </div>
        {formData?.educational_details?.map((data, index) => {
          return (
            <div
              key={index}
              className="row "
              style={{
                background: applicationColor.mainInputBg,
                color: applicationColor.readColor1,
              }}
            >
              {index >= 1 ? <hr style={{ marginTop: "20px" }} /> : ""}

              <div className="additional-btns">
                <h6>Academic Details {index + 1}</h6>
                {index + 1 === formData?.educational_details?.length ? (
                  <button
                    className="add-button"
                    onClick={addEducationDetails}
                    type="button"
                  >
                    {/* add new */}
                    <FaPlus />
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <Input_text
                  type={"text"}
                  name={"institute_name"}
                  placeholder={"Institute Name"}
                  value={data?.institute_name}
                  setForm={setFormData}
                  schema={schema?.institute_name}
                  index={index}
                  fieldName="educational_details"
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <Input_text
                  type={"text"}
                  name={"degree"}
                  placeholder={"Degree"}
                  value={data?.degree}
                  setForm={setFormData}
                  schema={schema?.degree}
                  index={index}
                  fieldName="educational_details"
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <Input_text
                  type={"text"}
                  name={"specialization"}
                  placeholder={"Specialization"}
                  value={data?.specialization}
                  setForm={setFormData}
                  schema={schema.specialization}
                  index={index}
                  maxLength={100}
                  fieldName="educational_details"
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <Input_text
                  type={"tel"}
                  name={"year_of_completion"}
                  placeholder={"Year of Completion"}
                  value={data?.year_of_completion}
                  setForm={setFormData}
                  schema={schema.year_of_completion}
                  maxLength={4}
                  inputRef={(el) => (refs.current.dateOfCompletion = el)}
                  index={index}
                  fieldName="educational_details"
                  // min={
                  //   new Date(
                  //     new Date().getFullYear() - 55,
                  //     new Date().getMonth(),
                  //     new Date().getDate()
                  //   )
                  //     .toISOString()
                  //     .split("T")[0]
                  // }
                  // max={new Date().toISOString().split("T")[0]}
                  // min={new Date().getFullYear() - 55}
                  // max={new Date().getFullYear()}
                />
              </div>

              {/* <Input_text
                type={"text"}
                name={"instituteName"}
                placeholder={"Institute Name"}
                value={data?.instituteName}
                setForm={setFormData}
                schema={schema.instituteName}
                // inputRef={(el) => (refs.current.instituteName = el)}
                index={index}
                fieldName="educationDetials"
              /> */}

              <div className="additional-btns">
                {formData?.educational_details?.length > 1 ? (
                  <button
                    className="remove-button"
                    onClick={() => removeEducationDetails(index)}
                    type="button"
                  >
                    {/* remove */}
                    <FaMinus />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </section>
      <hr style={{ marginTop: "20px" }} />

      {/* Dependent detials */}

      <section
        className="row basic-row new-basic-row"
        style={{
          background: applicationColor.mainInputBg,
          color: applicationColor.readColor1,
        }}
      >
        <div className="heading-button">
          <h6 className="heading-form"> Dependent Details </h6>
          {formData?.dependent_details?.length === 0 && (
            <div className="additional-btns">
              <button
                className="add-button"
                onClick={addDependentDetails}
                type="button"
              >
                {/* add new */}
                <FaPlus />
              </button>
            </div>
          )}
        </div>
        {formData?.dependent_details?.map((data, index) => {
          return (
            <div
              key={index}
              className="row "
              style={{
                background: applicationColor.mainInputBg,
                color: applicationColor.readColor1,
              }}
            >
              {index >= 1 ? <hr style={{ marginTop: "20px" }} /> : ""}

              <div className="additional-btns">
                <h6>Dependant Details {index + 1}</h6>
                {index + 1 === formData?.dependent_details?.length ? (
                  <button
                    className="add-button"
                    onClick={addDependentDetails}
                    type="button"
                  >
                    add new
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <Input_text
                  type={"text"}
                  name={"name"}
                  placeholder={"Name"}
                  value={data?.name}
                  setForm={setFormData}
                  schema={schema?.name}
                  index={index}
                  maxLength={50}
                  fieldName="dependent_details"
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <Input_text
                  type={"text"}
                  name={"relation"}
                  placeholder={"Relation  Ex : (Mother)"}
                  value={data?.relation}
                  setForm={setFormData}
                  schema={schema?.relation}
                  index={index}
                  fieldName="dependent_details"
                />
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6">
                <Date_Input
                  type={"date"}
                  placeholder={"Dependent DOB"}
                  name={"dependent_date_of_birth"}
                  value={data.dependent_date_of_birth}
                  setForm={setFormData}
                  schema={schema.dependent_date_of_birth}
                  min={
                    new Date(
                      new Date().getFullYear() - 90,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  max={
                    new Date(
                      new Date().getFullYear() - 2,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  index={index}
                  fieldName="dependent_details"
                />
              </div>

              <div className="additional-btns">
                {formData?.dependent_details?.length > 1 ? (
                  <button
                    className="remove-button"
                    onClick={() => removeDependentDetails(index)}
                    type="button"
                  >
                    {/* remove */}
                    <FaMinus />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </section>

      <hr style={{ marginTop: "20px" }} />
    </>
  );
};

export default PersonalDetailsData;
