import {
  Select_inputs,
  Input_text,
  Date_Input,
  Input_email,
  Input_area,
  DynamicInput_text,
  DynamicDate_Input,
  DynamicInput_area,
} from "../../common/ALLINPUTS/AllInputs";
import React, { useState } from "react";
import schema from "../../AllSchema/EmployeeSchema";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import Joi from "joi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

const HierarchyData = ({ formData, setFormData }) => {
  const { isAdmin, refs } = useStateContext();
  const { applicationColor } = useThemeContext();

  const addWorkExperience = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      work_experience: [
        ...prevData?.work_experience,
        {
          company_name: "",
          job_title: "",
          from_date: "",
          to_date: "",
          job_description: "",
          experience: "",
        },
      ],
    }));

    // setTimeout(() => {
    //   window.scrollBy(0, 500);
    // }, 500);

    // document.getElementById(`workExperience${index}`).scrollIntoView({
    //   behavior: "smooth",
    //   block: "center",
    //   inline: "center",
    // });
  };

  const removeWorkExperience = (index) => {
    const filterFormData = formData?.work_experience?.filter((item, i) => {
      return i !== index;
    });

    setFormData((prevForm) => {
      return { ...prevForm, work_experience: filterFormData };
    });
  };
  return (
    <>
      <div
        className="row basic-row"
        style={{
          background: applicationColor.mainInputBg,

          color: applicationColor.readColor1,
        }}
      >
        <h6 className="heading-form">Contact Information</h6>

        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_text
            type={"tel"}
            name={"mobile_number"}
            label="Mobile Number"
            placeholder={"Ex: 9876543456"}
            value={formData.mobile_number}
            setForm={setFormData}
            schema={schema.mobile_number}
            inputRef={(el) => (refs.current.mobile_number = el)}
            imp={true}
            // readOnly={isAdmin}
          />
        </div>
        {/* <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_text
            type={"tel"}
            name={"personal_mobile_number"}
            placeholder={"Personal Mobile Number"}
            value={formData.personal_mobile_number}
            setForm={setFormData}
            schema={schema.personal_mobile_number}
            inputRef={(el) => (refs.current.personal_mobile_number = el)}
            imp
            // readOnly={isAdmin}

          />
        </div> */}
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_email
            type={"email"}
            name={"personal_email_address"}
            label="Email"
            placeholder={"jackson@gmail.com"}
            value={formData.personal_email_address}
            setForm={setFormData}
            schema={schema.personal_email_address}
            maxLength={50}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.personal_email_address = el)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_text
            type={"text"}
            name={"seating_location"}
            label="Seating Location"
            placeholder={"Ex: Ws-17"}
            value={formData.seating_location}
            setForm={setFormData}
            schema={schema.seating_location}
            inputRef={(el) => (refs.current.seating_location = el)}
            // readOnly={isAdmin}
            imp
          />
        </div>

        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_area
            type={"textarea"}
            name={"permanent_address"}
            label="Permanent Address"
            placeholder={"Permanent Address"}
            value={formData.permanent_address}
            setForm={setFormData}
            schema={schema.permanent_address}
            length={250}
            imp
            inputRef={(el) => (refs.current.permanent_address = el)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_area
            permanent_address
            type={"textarea"}
            name={"present_address"}
            label="Present Address"
            placeholder={"Present Address"}
            value={formData.present_address}
            setForm={setFormData}
            schema={schema.present_address}
            length={250}
            imp
            inputRef={(el) => (refs.current.present_address = el)}
          />
        </div>
      </div>
      <hr style={{ marginTop: "20px" }} />

      <section
        className="row basic-row new-basic-row"
        style={{
          background: applicationColor.mainInputBg,
          color: applicationColor.readColor1,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="heading-form"> Previous Experience Data</h6>
          <button
            className="btn btn-success btn-sm"
            onClick={addWorkExperience}
            type="button"
          >
            <FaPlus />
          </button>
        </div>

        {formData.work_experience?.map((data, index) => {
          return (
            <div
              key={index}
              className="row"
              style={{
                background: applicationColor.mainInputBg,
                color: applicationColor.readColor1,
                marginBottom: "1rem",
              }}
            >
              <div className="row w-100">
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <Input_text
                    type={"text"}
                    name={"company_name"}
                    placeholder={"Company Name"}
                    value={data?.company_name}
                    setForm={setFormData}
                    schema={schema?.company_name}
                    // readOnly={isAdmin}
                    // inputRef={(el) => (refs.current.company = el)}
                    index={index}
                    fieldName="work_experience"
                  />
                </div>

                <div className="col-lg-3 col-md-3 col-sm-6">
                  <Input_text
                    type={"text"}
                    name={"job_title"}
                    placeholder={"Job Title"}
                    value={data?.job_title}
                    setForm={setFormData}
                    schema={schema?.job_title}
                    // readOnly={isAdmin}
                    // inputRef={(el) => (refs.current.company = el)}
                    index={index}
                    fieldName="work_experience"
                  />
                </div>
                <div
                  className="col-lg-3 col-md-3 col-sm-6"
                  style={{
                    color: applicationColor.readColor2,
                  }}
                >
                  <Date_Input
                    name={"from_date"}
                    placeholder={"Start Date"}
                    value={data?.from_date}
                    bv
                    setForm={setFormData}
                    schema={schema?.from_date}
                    // readOnly={isAdmin}
                    index={index}
                    fieldName="work_experience"
                    min={
                      new Date(
                        new Date().getFullYear() - 55,
                        new Date().getMonth(),
                        new Date().getDate()
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div
                  className="col-lg-3 col-md-3 col-sm-6"
                  style={{
                    color: applicationColor.readColor2,
                  }}
                >
                  <Date_Input
                    name={"to_date"}
                    placeholder={"End Date"}
                    value={data?.to_date}
                    setForm={setFormData}
                    schema={schema?.to_date}
                    // readOnly={isAdmin}
                    index={index}
                    fieldName="work_experience"
                    min={
                      new Date(
                        new Date().getFullYear() - 55,
                        new Date().getMonth(),
                        new Date().getDate()
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="col-lg-3 col-md-3 col-sm-6">
                  <Input_text
                    type={"text"}
                    name={"experience"}
                    placeholder={"Relavent Experience"}
                    value={data?.experience}
                    setForm={setFormData}
                    schema={schema?.experience}
                    maxLength={3}
                    // readOnly={isAdmin}
                    inputRef={(el) => (refs.current.company = el)}
                    index={index}
                    fieldName="work_experience"
                  />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <Input_area
                    index={index}
                    type={"textarea"}
                    name={"job_description"}
                    placeholder={"Job Description"}
                    value={data?.job_description}
                    setForm={setFormData}
                    schema={schema?.job_description}
                    length={250}
                    maxLength={250}
                    fieldName="work_experience"
                    // readOnly={isAdmin}
                  />
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 mt-5">
                  {formData.work_experience.length > 1 ? (
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => removeWorkExperience(index)}
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
            </div>
          );
        })}
      </section>
    </>
  );
};
export default HierarchyData;
