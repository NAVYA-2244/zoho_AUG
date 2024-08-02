import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Date_Input,
  Input_area,
  Input_text,
  InputEmail,
  Select_inputs,
} from "../../../common/ALLINPUTS/AllInputs";
import { useStateContext } from "../../../Contexts/StateContext";
import { backEndCallObjNothing } from "../../../../services/mainService";

import { useFunctionContext } from "../../../Contexts/FunctionContext";
import { ExpirementSchema } from "../../../AllSchema/EmployeeSchema";
import Joi from "joi";

const SingleEmployeeProfileEdit = () => {
  const location = useLocation();
  const { setLoadingTerm, setLoading } = useStateContext();
  const { checkErrors } = useFunctionContext();
  const { employeeProfileData } = location.state || {};
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  console.log(employeeProfileData, "data");

  const schema = {
    organisation_id: Joi.string().min(15).max(17).required(),
    employee_id: Joi.string().min(5).max(10).required(),
    nick_name: Joi.string().max(15).allow(null, "").optional(),
    expertise: Joi.string().allow(null, "").optional(),
    marital_status: Joi.string().valid("married", "unmarried").required(),
    about_me: Joi.string().allow(null, "").optional(),
    identity_info: Joi.object().min(2).required(),
    work_phone_number: Joi.string().allow(null, "").optional(),
    personal_mobile_number: Joi.string().required(),

    personal_email_address: Joi.string()
      .min(5)
      .max(35)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.pattern.base": '"Email" should not include special characters',
        "any.required": '"Email" is required',
      })
      .label("Email Id"),
    tags: Joi.string().allow(null, "").optional(),

    work_experience: Joi.array()
      .items(
        Joi.object({
          company_name: Joi.string()
            .min(3)
            .max(30)
            .allow("")
            .messages({
              "string.pattern.base":
                '"company" should not include special characters',
            })
            .label("Company Name"),
          job_title: Joi.string()
            .min(3)
            .max(30)
            .allow("")
            .messages({
              "string.pattern.base":
                '"jobTitle" should not include special characters',
            })
            .label("Job Title"),

          from_date: Joi.date().max("now").allow("").label("From Date"),
          to_date: Joi.date().max("now").allow("").label("End Date"),
          job_description: Joi.string()
            .min(3)
            .max(250)
            .allow("")
            .messages({
              "string.pattern.base":
                '"jobDescription" should not include special characters',
            })
            .label("Job Description")
            .optional(),
          experience: Joi.number()
            .max(50)
            .allow("")
            .label("Relevant Experience"),
        })
      )
      .label("Work Experience"),

    educational_details: Joi.array()
      .items(
        Joi.object({
          institute_name: Joi.string()
            .min(5)
            .max(50)
            .allow("")
            .messages({
              "string.pattern.base":
                '"instituteName" should not include special characters',
            })
            .label("Institute Name"),
          degree: Joi.string()
            .min(5)
            .max(35)
            .allow("")
            .messages({
              "string.pattern.base":
                '"degreeOrDiploma" should not include special characters',
            })
            .label("Degree or Diploma"),
          specialization: Joi.string()
            .min(5)
            .max(35)
            .allow("")
            .messages({
              "string.pattern.base":
                '" Locationspecialization" should not include special characters',
            })
            .label("Specialization"),
          year_of_completion: Joi.date()
            .max("now")
            .allow("")
            .label("Date of Completion"),
        })
      )
      .label("Education Details"),

    dependent_details: Joi.array()
      .items(
        Joi.object({
          name: Joi.string()
            .min(3)
            .max(50)
            .allow("")

            .messages({
              "string.pattern.base":
                '"dependentName" should not include special characters',
            })
            .label("Dependent Name"),

          relation: Joi.string()
            .min(3)
            .max(50)
            .allow("")
            .messages({
              "string.pattern.base":
                '"dependentName" should not include special characters',
            })
            .label("Dependent Name")
            .label("Relation"),
          dependent_date_of_birth: Joi.date()
            .max("now")
            .less(eighteenYearsAgo)
            .allow("")
            .messages({
              "date.base": `"Date Of Birth" should be a valid date`,
              "date.max": `"Date Of Birth" cannot be in the future`,
              "date.less": `"Date Of Birth" must be at least 18 years ago`,
              "any.required": `"Date Of Birth" is a required field`,
            }),
        })
      )
      .label("Dependent Details"),

    last_ip: Joi.string().ip().required(),
    browserid: Joi.string().min(3).max(50).required(),
    fcm_token: Joi.string().min(3).max(50).required(),
    device_id: Joi.string().min(3).max(50).required(),
  };
  const [formData, setFormData] = useState({
    organisation_id: employeeProfileData.profile.organisation_id || "",
    employee_id: employeeProfileData.profile.employee_id || "",
    nick_name: employeeProfileData.profile.basic_info.nick_name || "",
    expertise: employeeProfileData.profile.personal_details.expertise || "",
    marital_status:
      employeeProfileData.profile.personal_details.marital_status || "",
    about_me: employeeProfileData.profile.personal_details.about_me || "",
    identity_info: {
      aadhaar: employeeProfileData.profile.identity_info.aadhaar || "",
      pan: employeeProfileData.profile.identity_info.pan || "",
      passport: employeeProfileData.profile.identity_info.passport || "",
      uan: employeeProfileData.profile.identity_info.uan || "",
    },
    work_phone_number:
      employeeProfileData.profile.contact_details.work_phone_number || "",
    personal_mobile_number:
      employeeProfileData.profile.contact_details.personal_mobile_number || "",
    personal_email_address:
      employeeProfileData.profile.contact_details.personal_email_address || "",
    tags: employeeProfileData.profile.contact_details.tags || "",
    work_experience: [
      {
        company_name:
          employeeProfileData.profile.work_experience.company_name || "",
      },
      {
        job_title: employeeProfileData.profile.work_experience.job_title || "",
      },
      {
        from_date: employeeProfileData.profile.work_experience.from_date || "",
      },
      {
        to_date: employeeProfileData.profile.work_experience.to_date || "",
      },
      {
        experience:
          employeeProfileData.profile.work_experience.experience || "",
      },
      {
        job_description:
          employeeProfileData.profile.work_experience.job_description || "",
      },
    ],
    educational_details: [
      {
        institute_name:
          employeeProfileData.profile.educational_details.institute_name || "",
      },
      {
        degree: employeeProfileData.profile.educational_details.degree || "",
      },
      {
        specialization:
          employeeProfileData.profile.educational_details.specialization || "",
      },
      {
        year_of_completion:
          employeeProfileData.profile.educational_details.year_of_completion ||
          "",
      },
    ],

    dependent_details: [
      {
        dependent_date_of_birth:
          employeeProfileData.profile.dependent_details
            .dependent_date_of_birth || "",
      },
      {
        name: employeeProfileData.profile.dependent_details.name || "",
      },
      {
        relation: employeeProfileData.profile.dependent_details.relation || "",
      },
    ],
    last_ip: employeeProfileData.profile.last_ip || "",
    browserid: employeeProfileData.profile.browserid || "",
    fcm_token: employeeProfileData.profile.fcm_token || "",
    device_id: employeeProfileData.profile.device_id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(formData, "for,");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Profile updated successfully");
      setLoading(true);
      setLoadingTerm("Update Profile");
      await checkErrors(schema, formData);
      console.log(formData, "form");
      const response = await backEndCallObjNothing(
        "/emp/edit_profile",
        formData
      );
      console.log(response, "response");
      // Handle response if needed
    } catch (error) {
      // Handle error
      console.error("Error updating profile", error);
    }
  };

  return (
    <>
      <h1>Edit Profile</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_text
            type="text"
            name="organisation_id"
            placeholder="Organization ID"
            onChange={handleChange}
            setForm={setFormData}
            // schema={schema.organisation_id}
            value={formData.organisation_id}
          />
          <Input_text
            type="text"
            name="employee_id"
            placeholder="Employee ID"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.employee_id}
            // schema={schema.employee_id}
          />
          <Input_text
            type="text"
            name="nick_name"
            placeholder="Nick Name"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.nick_name}
            // schema={schema.nick_name}
          />
          <Input_text
            type="text"
            name="expertise"
            placeholder="Expertise"
            setForm={setFormData}
            onChange={handleChange}
            value={formData.expertise}
            // schema={schema.expertise}
          />
          <Select_inputs
            name={"marital_status"}
            placeholder={"Marital Status"}
            value={formData.marital_status}
            schema={schema.marital_status}
            setForm={setFormData}
            options={["unmarried", "married"]}
            onChange={handleChange}
          />
          <Input_area
            type={"textarea"}
            name={"about_me"}
            placeholder={"About Me"}
            value={formData.about_me}
            setForm={setFormData}
            length={250}
            onChange={handleChange}
          />
          <Input_text
            type="tel"
            name="aadhaar"
            placeholder="Aadhaar Number"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.identity_info.aadhaar}
          />
          <Input_text
            name="pan"
            placeholder="PAN Number"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.identity_info.pan}
          />
          <Input_text
            type="tel"
            name="passport"
            placeholder="Passport"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.identity_info.passport}
          />
          <Input_text
            type="tel"
            name="uan"
            placeholder="UAN"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.identity_info.uan}
          />
          <Input_text
            type="tel"
            name="work_phone_number"
            placeholder="Work Phone Number"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.work_phone_number}
          />
          <Input_text
            type={"tel"}
            name={"personal_mobile_number"}
            placeholder={"Personal Mobile Number"}
            value={formData.personal_mobile_number}
            setForm={setFormData}
            onChange={handleChange}
          />
          <Input_text
            type={"text"}
            name={"institute_name"}
            placeholder={"Institute Name"}
            value={formData.educational_details.institute_name}
            setForm={setFormData}
          />
          <Input_text
            type={"text"}
            name={"degree"}
            placeholder={"Degree"}
            value={formData.educational_details.degree}
            setForm={setFormData}
          />{" "}
          <Input_text
            type={"text"}
            name={"specialization"}
            placeholder={"Specialization"}
            value={formData.educational_details.specialization}
            setForm={setFormData}
          />{" "}
          <Date_Input
            type={"date"}
            name={"year_of_completion"}
            placeholder={"Date of Completion"}
            value={formData.educational_details.year_of_completion}
            setForm={setFormData}
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
          <InputEmail
            type="email"
            name="personal_email_address"
            placeholder="Personal Email Address"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.personal_email_address}
          />
          <Input_text
            type="text"
            name="tags"
            placeholder="Tags"
            onChange={handleChange}
            setForm={setFormData}
            value={formData.tags}
          />
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type={"text"}
              name={"company_name"}
              placeholder={"Company Name"}
              value={formData?.company_name}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type={"text"}
              name={"job_title"}
              placeholder={"Job Title"}
              value={formData?.job_title}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Date_Input
              name={"from_date"}
              placeholder={"Start Date"}
              value={formData?.from_date}
              setForm={setFormData}
              schema={schema?.from_date}
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
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Date_Input
              name={"to_date"}
              placeholder={"End Date"}
              value={formData?.to_date}
              setForm={setFormData}
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
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type={"tel"}
              name={"experience"}
              placeholder={"Relavent Experience"}
              value={formData?.experience}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_area
              type={"textarea"}
              name={"job_description"}
              placeholder={"Job Discription"}
              value={formData?.job_description}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type={"text"}
              name={"name"}
              placeholder={"Name"}
              value={formData?.name}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type={"text"}
              name={"relation"}
              placeholder={"Relation"}
              value={formData?.relation}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Date_Input
              type={"date"}
              placeholder={"Dependent DOB"}
              name={"dependent_date_of_birth"}
              value={formData.dependent_date_of_birth}
              setForm={setFormData}
              min={
                new Date(
                  new Date().getFullYear() - 60,
                  new Date().getMonth(),
                  new Date().getDate()
                )
                  .toISOString()
                  .split("T")[0]
              }
              max={
                new Date(
                  new Date().getFullYear() - 21,
                  new Date().getMonth(),
                  new Date().getDate()
                )
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default SingleEmployeeProfileEdit;
