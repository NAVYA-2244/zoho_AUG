import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
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
import Joi from "joi";
import toast from "react-hot-toast";
import { toastOptions } from "../../../../Utils/FakeRoutes";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { publicIpv4 } from "public-ip";
import { fullBrowserVersion } from "react-device-detect";

const SingleEmployeeProfileEdit = () => {
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);
  const { setLoadingTerm, setLoading, setEmployeedata } = useStateContext();
  const [browserId, setBrowserId] = useState("");
  const { checkErrors } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const { loading } = useStateContext();
  
  const { employeeProfileData } = location.state || {};
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  const schema = {
    organisation_id: Joi.string().min(15).max(17).required(),
    employee_id: Joi.string().min(5).max(10).required(),
    nick_name: Joi.string().max(15).allow(null, "").optional(),

    expertise: Joi.string().allow(null, "").optional(),
    
    marital_status: Joi.string().valid("married", "unmarried").required(),
    about_me: Joi.string().allow(null, "").optional(),
    uan: Joi.string().length(12).allow("").optional(),
    pan: Joi.string().length(10).required(),
    aadhaar: Joi.string().length(12).optional(),
    passport: Joi.string().length(12).allow("").optional(),
    work_phone_number: Joi.string().allow(null, "").optional().min(10).max(10),
    personal_mobile_number: Joi.string().required().min(10).max(10),
    personal_email_address: Joi.string().email({ tlds: { allow: ["com", "net", "org"] } }).required(),
    company_name: Joi.string().min(10).max(40).allow("").optional(),
    job_title: Joi.string().min(3).max(30).allow("").optional(),
    from_date: Joi.date().max("now").allow("").optional(),
    to_date: Joi.date().max("now").allow("").optional(),
    job_description: Joi.string().min(3).max(250).allow("").optional(),
    experience: Joi.number().max(50).required(),
    institute_name: Joi.string().min(10).max(50).allow("").required(),
    degree: Joi.string().min(5).max(15).allow("").required(),
    specialization: Joi.string().min(5).max(100).allow("").required(),
    year_of_completion: Joi.number().required(),
    name: Joi.string().min(3).max(50).allow("").optional(),
    relation: Joi.string().min(3).max(50).allow("").optional(),
    dependent_date_of_birth: Joi.date().max("now").allow("").optional(),
    last_ip: Joi.string().ip().required(),
    browserid: Joi.string().min(3).max(50).required(),
    fcm_token: Joi.string().min(3).max(50).required(),
    device_id: Joi.string().min(3).max(50).required(),
  };

  useEffect(() => {
    const getBrowserId = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setBrowserId(result.visitorId.toString());
    };
    getBrowserId();
  }, []);

  useEffect(() => {
    const fetchIpAndBrowserDetails = async () => {
      const ip = await publicIpv4();
      setFormData(prevData => ({
        ...prevData,
        last_ip: ip,
        device_id: fullBrowserVersion,
        browserid: browserId,
        fcm_token: "staging"
      }));
    };

    if (browserId) {
      fetchIpAndBrowserDetails();
    }
  }, [browserId]);

  const [formData, setFormData] = useState(() => {
    if (!employeeProfileData) return {};
    return {
      last_ip: "",
      device_id: "",
      browserid: "",
      fcm_token: "staging",
      organisation_id: employeeProfileData.profile.organisation_id || "",
      employee_id: employeeProfileData.profile.employee_id || "",
      nick_name: employeeProfileData.profile.basic_info.nick_name || "",
      expertise: employeeProfileData.profile.personal_details.expertise || "",
      marital_status: employeeProfileData.profile.personal_details.marital_status || "",
      about_me: employeeProfileData.profile.personal_details.about_me || "",
      aadhaar: employeeProfileData.profile.identity_info.aadhaar || "",
      pan: employeeProfileData.profile.identity_info.pan || "",
      passport: employeeProfileData.profile.identity_info.passport || "",
      uan: employeeProfileData.profile.identity_info.uan || "",
      work_phone_number: employeeProfileData.profile.contact_details.work_phone_number || "",
      personal_mobile_number: employeeProfileData.profile.contact_details.personal_mobile_number || "",
      personal_email_address: employeeProfileData.profile.contact_details.personal_email_address || "",

      company_name: employeeProfileData.profile.work_experience?.[0]?.company_name || "",
      job_title: employeeProfileData.profile.work_experience?.[0]?.job_title || "",
      from_date: employeeProfileData.profile.work_experience?.[0]?.from_date || "",
      to_date: employeeProfileData.profile.work_experience?.[0]?.to_date || "",
      experience: employeeProfileData.profile.work_experience?.[0]?.experience || 0,
      
      job_description: employeeProfileData.profile.work_experience?.[0]?.job_description || "",
      institute_name: employeeProfileData.profile.educational_details?.[0]?.institute_name || "",
      degree: employeeProfileData.profile.educational_details?.[0]?.degree || "",
      specialization: employeeProfileData.profile.educational_details?.[0]?.specialization || "",
      year_of_completion: employeeProfileData.profile.educational_details?.[0]?.year_of_completion || 0,
      dependent_date_of_birth: employeeProfileData.profile.dependent_details?.[0]?.dependent_date_of_birth || "",

      name: employeeProfileData.profile.dependent_details?.[0]?.name || "",
      relation: employeeProfileData.profile.dependent_details?.[0]?.relation || "",

      last_ip: employeeProfileData.profile.last_ip || "",
      browserid: employeeProfileData.profile.browserid || "",
      fcm_token: employeeProfileData.profile.fcm_token || "",
      device_id: employeeProfileData.profile.device_id || "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setLoadingTerm("Update Profile");
      await checkErrors(schema, formData);

      const formattedData = {
        organisation_id: employeeProfileData.profile.organisation_id || "",
        employee_id: employeeProfileData.profile.employee_id || "",
        marital_status: employeeProfileData.profile.personal_details.marital_status || "",
        personal_mobile_number: employeeProfileData.profile.contact_details.personal_mobile_number || "",
        personal_email_address: employeeProfileData.profile.contact_details.personal_email_address || "",
        last_ip: formData.last_ip,
        browserid: formData.browserid,
        fcm_token: formData.fcm_token,
        device_id: formData.device_id,
        identity_info: {
          aadhaar: formData.aadhaar,
          pan: formData.pan,
          uan: formData.uan,
          passport: formData.passport,
        },
        work_experience: formData.company_name ? [{
          company_name: formData.company_name,
          job_title: formData.job_title,
          from_date: formData.from_date,
          to_date: formData.to_date,
          experience: formData.experience,
          job_description: formData.job_description,
        }] : [],
        educational_details: formData.institute_name ? [{
          institute_name: formData.institute_name,
          degree: formData.degree,
          specialization: formData.specialization,
          year_of_completion: formData.year_of_completion,
        }] : [],
        dependent_details: formData.name ? [{
          dependent_date_of_birth: formData.dependent_date_of_birth,
          name: formData.name,
          relation: formData.relation,
        }] : [],
      };
      

      // Clean up redundant properties
      // const cleanData = {
      //   ...formattedData,
      //   identity_info: formattedData.identity_info,
      //   work_experience: formattedData.work_experience,
      //   educational_details: formattedData.educational_details,
      //   dependent_details: formattedData.dependent_details,
      //   last_ip: formData.last_ip,
      //   browserid: formData.browserid,
      //   fcm_token: formData.fcm_token,
      //   device_id: formData.device_id,
      // };
console.log(formattedData,"cleanData")
      const response = await backEndCallObjNothing(`/emp/edit_profile
`, formattedData);
      setLoading(false);

     
        toast.success("Profile updated successfully!", toastOptions);
        setEmployeedata(response?.data);
        setRedirect(true);
      
      
      
    } catch (error) {
      setLoading(false);
      console.log(error,"error")
   toastOptions.error(error?.response?.data||"samething went wrong")
    }
  };

  if (redirect) {
    return <Navigate to="/profile" />;
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
          {/* <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type="text"
              name="organisation_id"
              placeholder="Organization ID"
              onChange={handleChange}
              setForm={setFormData}
              schema={schema.organisation_id}
              value={formData.organisation_id}
              maxLength={15}
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
              schema={schema.employee_id}
              maxLength={15}
            />
          </div> */}
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type="text"
              name="nick_name"
              placeholder="Nick Name"
              onChange={handleChange}
              setForm={setFormData}
              value={formData.nick_name}
              schema={schema.nick_name}
              maxLength={15}
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
              schema={schema.expertise}
              maxLength={250}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <Select_inputs
              name={"marital_status"}
              placeholder={"Marital Status"}
              value={formData.marital_status}
              setForm={setFormData}
              options={["unmarried", "married"]}
              onChange={handleChange}
              schema={schema.marital_status}
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
              maxLength={250}
              onChange={handleChange}
              schema={schema.about_me}
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
              schema={schema.aadhaar}
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
              schema={schema.pan}
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
              schema={schema.passport}
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
              schema={schema.uan}
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
              schema={schema.work_phone_number}
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
              schema={schema.personal_mobile_number}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <Input_text
              type={"text"}
              name={"institute_name"}
              placeholder={"Institute Name"}
              value={formData.institute_name}
              setForm={setFormData}
              schema={schema.institute_name}
              maxLength={50}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <Input_text
              type={"text"}
              name={"degree"}
              placeholder={"Degree"}
              value={formData.degree}
              setForm={setFormData}
              schema={schema.degree}
              maxLength={15}
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
              schema={schema.specialization}
              maxLength={100}
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            {" "}
            <Input_text
              type={"tel"}
              name={"year_of_completion"}
              placeholder={"Year of Completion"}
              value={formData.year_of_completion}
              setForm={setFormData}
              schema={schema.year_of_completion}
              maxLength={4}
              
            />
          </div>
          <div className="col-lg-4 col-md-4 col sm-6">
            <InputEmail
              type="email"
              name="personal_email_address"
              placeholder="Personal Email Address"
              onChange={handleChange}
              setForm={setFormData}
              maxLength={50}
              value={formData.personal_email_address}
              schema={schema.personal_email_address}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
             type={"text"}
              name={"company_name"}
              placeholder={"Company Name"}
              value={formData?.company_name}
              setForm={setFormData}
              schema={schema.company_name}
              maxLength={30}
            />
            {/* <Input_text
              name="pan"
              placeholder="PAN Number"
              setForm={setFormData}
              onChange={handleChange}
              value={formData.pan}
              schema={schema.pan}
            /> */}
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type={"text"}
              name={"job_title"}
              placeholder={"Job Title"}
              value={formData?.job_title}
              setForm={setFormData}
              schema={schema.job_title}
              maxLength={30}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <Date_Input
              name={"from_date"}
              placeholder={"Start Date"}
              value={formData?.from_date}
              setForm={setFormData}
              schema={schema.from_date}
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
              schema={schema.to_date}
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
              schema={schema.experience}
              maxLength={2}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_area
              type={"textarea"}
              name={"job_description"}
              placeholder={"Job Description"}
              value={formData?.job_description}
              setForm={setFormData}
              schema={schema.job_description}
              maxLength={250}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type={"text"}
              name={"name"}
              placeholder={"Name"}
              value={formData?.name}
              setForm={setFormData}
              schema={schema.name}
              maxLength={50}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <Input_text
              type={"text"}
              name={"relation"}
              placeholder={"Relation"}
              value={formData?.relation}
              setForm={setFormData}
              schema={schema.relation}
              maxLength={50}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <Date_Input
              type={"date"}
              placeholder={"Dependent DOB"}
              name={"dependent_date_of_birth"}
              value={formData.dependent_date_of_birth}
              setForm={setFormData}
              schema={schema.dependent_date_of_birth}
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
