import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
import { formatDate } from "date-fns";
import toast from "react-hot-toast";
import { toastOptions } from "../../../../Utils/FakeRoutes";
import { useThemeContext } from "../../../Contexts/ThemesContext";

const SingleEmployeeProfileEdit = () => {
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);

  const { setLoadingTerm, setLoading } = useStateContext();
  const { setEmployeedata, employeeData } = useStateContext();

  const { checkErrors } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const { loading } = useStateContext();

  const { employeeProfileData } = location.state || {};
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  console.log(employeeProfileData, "data");

  // educational_details: Array.isArray(formData?.educational_details);
  //   ? formData.educational_details.filter((item) =>
  //       Object.values(item).some((value) => value.length > 0)
  //     )
  //   : [],
  const schema = {
    organisation_id: Joi.string().min(15).max(17).required(),
    employee_id: Joi.string().min(5).max(10).required(),
    nick_name: Joi.string().max(15).allow(null, "").optional(),
    expertise: Joi.string().allow(null, "").optional(),
    marital_status: Joi.string().valid("married", "unmarried").required(),
    about_me: Joi.string().allow(null, "").optional(),

    uan: Joi.string()
      .length(12)
      .allow("")
      .messages({
        "string.length": '"UAN" should be exactly 12 characters long',
        "string.pattern.base": '"UAN" should not include special characters',
        "any.required": '"UAN" is required',
      })
      .label("UAN")
      .optional(),

    pan: Joi.string()
      .length(10)
      .messages({
        "string.pattern.base":
          '"PAN" should consist of 5 letters followed by 4 digits and 1 letter, and should not include special characters',
        "string.length": '"Pan" should be exactly 10 characters long',
        "any.required": '"PAN" is required',
      })
      .required()
      .label("PAN"),

    aadhaar: Joi.string()
      .length(12)
      .allow("")
      .messages({
        "string.length": '"Aadhaar" should be exactly 12 characters long',
        "string.pattern.base":
          '"Aadhaar" should not include special characters',
        "any.required": '"Aadhaar" is required',
      })
      .label("Aadhaar")
      .required(),

    passport: Joi.string()
      .length(12)
      .allow("")
      .optional()
      .messages({
        "string.length": '"Passport" should be exactly 12 characters long',
        "string.pattern.base":
          '"Passport" should not include special characters',
        "any.required": '"Passport" is required',
      })
      .label("Passport"),

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

    company_name: Joi.string()
      .min(10)
      .max(30)
      .allow("")
      .optional()
      .messages({
        "string.pattern.base":
          '"company" should not include special characters',
      })
      .label("Company Name"),
    job_title: Joi.string()
      .min(3)
      .max(30)
      .allow("")
      .optional()
      .messages({
        "string.pattern.base":
          '"jobTitle" should not include special characters',
      })
      .label("Job Title"),

    from_date: Joi.date().max("now").allow("").label("From Date").optional(),
    to_date: Joi.date().max("now").allow("").label("End Date").optional(),
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
      .optional()
      .label("Relevant Experience"),

    institute_name: Joi.string()
      .min(10)
      .max(50)
      .allow("")
      .optional()
      .messages({
        "string.pattern.base":
          '"instituteName" should not include special characters',
      })
      .label("Institute Name"),
    degree: Joi.string()
      .min(5)
      .max(15)
      .allow("")
      .optional()
      .messages({
        "string.pattern.base":
          '"degreeOrDiploma" should not include special characters',
      })
      .label("Degree or Diploma"),
    specialization: Joi.string()
      .min(5)
      .max(100)
      .allow("")
      .optional()
      .messages({
        "string.pattern.base":
          '" Locationspecialization" should not include special characters',
      })
      .label("Specialization"),
    year_of_completion: Joi.date()
      .max("now")
      .allow("")
      .optional()

      .label("Date of Completion"),

    name: Joi.string()
      .min(3)
      .max(50)
      .allow("")
      .optional()
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
      .optional()
      .messages({
        "date.base": `"Date Of Birth" should be a valid date`,
        "date.max": `"Date Of Birth" cannot be in the future`,
        "date.less": `"Date Of Birth" must be at least 18 years ago`,
        "any.required": `"Date Of Birth" is a required field`,
      }),

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

    aadhaar: employeeProfileData.profile.identity_info.aadhaar || "",
    pan: employeeProfileData.profile.identity_info.pan || "",
    passport: employeeProfileData.profile.identity_info.passport || "",
    uan: employeeProfileData.profile.identity_info.uan || "",

    work_phone_number:
      employeeProfileData.profile.contact_details.work_phone_number || "",
    personal_mobile_number:
      employeeProfileData.profile.contact_details.personal_mobile_number || "",
    personal_email_address:
      employeeProfileData.profile.contact_details.personal_email_address || "",
    tags: employeeProfileData.profile.contact_details.tags || "",

    company_name:
      employeeProfileData.profile.work_experience &&
      employeeProfileData.profile.work_experience.length > 0
        ? employeeProfileData.profile.work_experience[0].company_name || ""
        : "",

    job_title:
      employeeProfileData.profile.work_experience &&
      employeeProfileData.profile.work_experience.length > 0
        ? employeeProfileData.profile.work_experience[0].job_title || ""
        : "",

    from_date:
      employeeProfileData.profile.work_experience &&
      employeeProfileData.profile.work_experience.length > 0
        ? employeeProfileData.profile.work_experience[0].from_date || ""
        : "",

    to_date:
      employeeProfileData.profile.work_experience &&
      employeeProfileData.profile.work_experience.length > 0
        ? employeeProfileData.profile.work_experience[0].to_date || ""
        : "",
    experience:
      employeeProfileData.profile.work_experience &&
      employeeProfileData.profile.work_experience.length > 0
        ? employeeProfileData.profile.work_experience[0].experience || ""
        : "",

    job_description:
      employeeProfileData.profile.work_experience &&
      employeeProfileData.profile.work_experience.length > 0
        ? employeeProfileData.profile.work_experience[0].job_description || ""
        : "",
    institute_name:
      employeeProfileData.profile.educational_details &&
      employeeProfileData.profile.educational_details.length > 0
        ? employeeProfileData.profile.educational_details[0].institute_name ||
          ""
        : "",

    degree:
      employeeProfileData.profile.educational_details &&
      employeeProfileData.profile.educational_details.length > 0
        ? employeeProfileData.profile.educational_details[0].degree || ""
        : "",

    specialization:
      employeeProfileData.profile.educational_details &&
      employeeProfileData.profile.educational_details.length > 0
        ? employeeProfileData.profile.educational_details[0].specialization ||
          ""
        : "",

    year_of_completion:
      employeeProfileData.profile.educational_details &&
      employeeProfileData.profile.educational_details.length > 0
        ? employeeProfileData.profile.educational_details[0]
            .year_of_completion || ""
        : "",

    // employeeProfileData.profile.educational_details.year_of_completion || "",
    dependent_date_of_birth:
      employeeProfileData.profile.dependent_details &&
      employeeProfileData.profile.dependent_details.length > 0
        ? employeeProfileData.profile.dependent_details[0]
            .dependent_date_of_birth || ""
        : "",
    name:
      employeeProfileData.profile.dependent_details &&
      employeeProfileData.profile.dependent_details.length > 0
        ? employeeProfileData.profile.dependent_details[0].name || ""
        : "",

    relation:
      employeeProfileData.profile.dependent_details &&
      employeeProfileData.profile.dependent_details.length > 0
        ? employeeProfileData.profile.dependent_details[0].relation || ""
        : "",

    last_ip: employeeProfileData.profile.last_ip || "",
    browserid: employeeProfileData.profile.browserid || "",
    fcm_token: employeeProfileData.profile.fcm_token || "",
    device_id: employeeProfileData.profile.device_id || "",
  });

  const handleChange = (e) => {
    console.log(e);

    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formData.year_of_completion, "for,");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("akash");

    try {
      setLoading(true);
      setLoadingTerm("Update Profile");
      await checkErrors(schema, formData);
      const formatYearOnly = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.getFullYear().toString();
      };

      const formattedData = {
        ...formData,

        identity_info: {
          aadhaar: formData.aadhaar,
          pan: formData.pan,
          uan: formData.uan,
          passport: formData.passport,
        },

        work_experience: [
          {
            company_name: formData.company_name,

            job_title: formData.job_title,

            from_date: formData.from_date,

            to_date: formData.to_date,

            experience: formData.experience,

            job_description: formData.job_description,
          },
        ],
        educational_details: [
          {
            institute_name: formData.institute_name,
            degree: formData.degree,
            specialization: formData.specialization,
            year_of_completion: formatYearOnly(formData.year_of_completion),
          },
        ],
        dependent_details: [
          {
            dependent_date_of_birth: formData.dependent_date_of_birth,
            name: formData.name,
            relation: formData.relation,
          },
        ],
      };

      delete formattedData.aadhaar;
      delete formattedData.pan;
      delete formattedData.passport;
      delete formattedData.uan;
      delete formattedData.company_name;
      delete formattedData.from_date;
      delete formattedData.to_date;
      delete formattedData.experience;
      delete formattedData.job_title;
      delete formattedData.job_description;
      delete formattedData.institute_name;
      delete formattedData.specialization;
      delete formattedData.degree;
      delete formattedData.year_of_completion;
      delete formattedData.dependent_date_of_birth;
      delete formattedData.name;
      delete formattedData.relation;
      const response = await backEndCallObjNothing(
        "/emp/edit_profile",
        formattedData
      );
      setEmployeedata(response.data);
      setRedirect(true);
      console.log(response);

      toastOptions.success(response.success);
      // Handle response if needed
    } catch (error) {
      // Handle error
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };
  if (redirect) {
    return <Navigate to="/admin/profile" />;
  }

  return (
    <div
      className="profile-edit-wrapper"
      style={{
        background: applicationColor.cardItem,
        color: applicationColor.readColor1,
        // border:`0.3px solid ${applicationColor.readColor2} `
      }}
    >
      {/* <div className="p-3">
        <h5>Edit Profile</h5>
      </div> */}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="row py-5">
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
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type="text"
              name="employee_id"
              placeholder="Employee ID"
              onChange={handleChange}
              setForm={setFormData}
              value={formData.employee_id}
              // schema={schema.employee_id}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type="text"
              name="nick_name"
              placeholder="Nick Name"
              onChange={handleChange}
              setForm={setFormData}
              value={formData.nick_name}
              // schema={schema.nick_name}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type="text"
              name="expertise"
              placeholder="Expertise"
              setForm={setFormData}
              onChange={handleChange}
              value={formData.expertise}
              // schema={schema.expertise}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            {" "}
            <Select_inputs
              name={"marital_status"}
              placeholder={"Marital Status"}
              value={formData.marital_status}
              schema={schema.marital_status}
              setForm={setFormData}
              options={["unmarried", "married"]}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_area
              type={"textarea"}
              name={"about_me"}
              placeholder={"About Me"}
              value={formData.about_me}
              setForm={setFormData}
              length={250}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type="tel"
              name="aadhaar"
              placeholder="Aadhaar Number"
              onChange={handleChange}
              setForm={setFormData}
              value={formData.aadhaar}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            {" "}
            <Input_text
              name="pan"
              placeholder="PAN Number"
              setForm={setFormData}
              onChange={handleChange}
              value={formData.pan}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type="tel"
              name="passport"
              placeholder="Passport"
              onChange={handleChange}
              setForm={setFormData}
              value={formData.passport}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <Input_text
              type="tel"
              name="uan"
              placeholder="UAN"
              setForm={setFormData}
              onChange={handleChange}
              value={formData.uan}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <Input_text
              type="tel"
              name="work_phone_number"
              placeholder="Work Phone Number"
              onChange={handleChange}
              setForm={setFormData}
              value={formData.work_phone_number}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            {" "}
            <Input_text
              type={"tel"}
              name={"personal_mobile_number"}
              placeholder={"Personal Mobile Number"}
              value={formData.personal_mobile_number}
              setForm={setFormData}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <Input_text
              type={"text"}
              name={"institute_name"}
              placeholder={"Institute Name"}
              value={formData.institute_name}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <Input_text
              type={"text"}
              name={"degree"}
              placeholder={"Degree"}
              value={formData.degree}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            {" "}
            <Input_text
              type={"text"}
              name={"specialization"}
              placeholder={"Specialization"}
              value={formData.specialization}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            {" "}
            <Input_text
              type={"tel"}
              name={"year_of_completion"}
              placeholder={"Date of Completion"}
              value={formData.year_of_completion}
              setForm={setFormData}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <InputEmail
              type="email"
              name="personal_email_address"
              placeholder="Personal Email Address"
              onChange={handleChange}
              setForm={setFormData}
              value={formData.personal_email_address}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <Input_text
              type="text"
              name="tags"
              placeholder="Tags"
              onChange={handleChange}
              setForm={setFormData}
              value={formData.tags}
            />
          </div>

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
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "fit-content",
              padding: "5px 10px",
              marginRight: "0",
            }}
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleEmployeeProfileEdit;
