import React, { useEffect, useState } from "react";
import {
  ImageInput,
  Input_area,
  Input_email,
  Input_text,
  Select_inputs,
} from "../../common/ALLINPUTS/AllInputs";
// import "./CompanyDetail.scss";
import Joi from "joi";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
// import { FaImage } from "react-icons/fa6";
import Loader from "../../Loader/Loader";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../services/mainService";
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { FaImage, FaCamera } from "react-icons/fa";
const Companydetails = () => {
  const {
    loading,
    loadingTerm,
    setLoadingTerm,
    setLoading,
    employeeDetails,
    setOrgLogo,
    orgDetails,
  } = useStateContext();
  const { applicationColor } = useThemeContext();
  const { checkErrors } = useFunctionContext();
  const [formData, setFormData] = useState({
    organisation_name: "",
    logo: "",
    organisation_type: "",
    org_mail_id: "",
    address: "",
  });
  const orgSchema = {
    organisation_name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .messages({
        "string.pattern.base":
          '"Organisation Name" should not include special characters',
        "any.required": '"Organisation Name" is required',
      })
      .label("Organisation Name"),
    logo: Joi.string().required().label("Organisation Logo"),
    organisation_type: Joi.string().required().label("Organisation Type"),
    org_mail_id: Joi.string()
      .min(5)
      .max(55)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.pattern.base": '"Email" should not include special characters',
        "any.required": '"Email" is required',
      })
      .label("Email Id"),
    address: Joi.string().required().label("Address"),
  };

  useEffect(() => {
    if (!orgDetails?.organisation_details) return;
    const obj = {
      organisation_name: orgDetails.organisation_name,
      address: orgDetails.organisation_details?.address,
      org_mail_id: orgDetails.organisation_details?.org_mail_id,
      organisation_type: orgDetails.organisation_details?.organisation_type,
      logo: orgDetails.images.logo,
    };

    setFormData(obj);
  }, [orgDetails]);

  const orgLogoNameSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setLoadingTerm("orgNameLogo");
      await checkErrors(orgSchema, formData);

      console.log(formData, "formData");

      const response = await backEndCallObjNothing(
        "/org/add_update_org_details",
        formData
      );
      console.log(response, "resss");
      
      // const response = await makeNetworkCall(formData, "orgLogo", "headers");
      // const { detail } = await makeNetworkCall({}, "getAdminData1", "headers");

      // setFormData(response?.images?.logo);

      setOrgLogo(response?.data?.images?.logo);
      setLoading(false);
      setLoadingTerm("");

      toastOptions.success(response?.success);
      setLoading(false);
    } catch (error) {
      toastOptions.error(error?.response?.data || error?.[0].message);
      setLoading(false);
      setLoadingTerm("");
    }
  };
  const [hovered, setHovered] = useState(false);
  return (
    <>
      {/* {Object.keys(adminData1).length === 0 ? (
        <Loader />
      ) : ( */}
      <section
        className="company-details"
        style={{ background: applicationColor.cardBg1 }}
      >
        <form
          className="company-logo-image"
          onSubmit={orgLogoNameSubmit}
          style={{ background: applicationColor.cardBg1 }}
        >
          <div className="row">
            <div className="col-md-6 col-12 company-logo-image logo-image text-center d-flex my-auto ">
              <div className="company-logo">
                <div className="org-logo">
                  <div className="names m-2">
                    <span style={{ color: applicationColor.readColor2 }}>
                      Organisation Logo <sup style={{ color: "red" }}> *</sup>{" "}
                    </span>
                  </div>
                  <label htmlFor="logo">
                    <div
                      className="logo-image "
                      style={{
                        height: "150px",
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px soild black",
                        borderRadius: "50%",
                      }}
                    >
                      <div>
                        {formData.logo && formData.logo !== "string" ? (
                          <div
                            style={{
                              position: "relative",
                              width: "200px",
                              height: "200px",
                              border: "1px soild black",
                              borderRadius: "50%",
                            }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                          >
                            <img
                              src={formData.logo}
                              alt=""
                              style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                border: "1px soild black",
                                borderRadius: "50%",
                              }}
                            />
                            {hovered && (
                              <FaCamera
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  color: "black",
                                  fontSize: "24px",
                                }}
                              />
                            )}
                          </div>
                        ) : (
                          <section className="logo-icon">
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                border: "1px soild black",
                                borderRadius: "50%",
                                backgroundColor: applicationColor.inputBg,
                                position: "relative",
                              }}
                              onMouseEnter={() => setHovered(true)}
                              onMouseLeave={() => setHovered(false)}
                            >
                              <FaImage
                                style={{ width: "120", height: "150" }}
                              />
                              {hovered && (
                                <div
                                  className="hoverCamera"
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: "red",
                                    fontSize: "24px",
                                    backgroundColor: "red",
                                  }}
                                >
                                  <FaCamera />
                                </div>
                              )}
                            </div>
                          </section>
                        )}
                      </div>
                    </div>
                    {/* <div className="delete-editbuttons">
                      {formData.logo && (
                        <button
                          className="delete"
                          onClick={() =>
                            setFormData((prevForm) => {
                              return { ...prevForm, logo: "" };
                            })
                          }
                        >
                          <MdDeleteOutline />{" "}
                        </button>
                      )}
                    </div> */}
                  </label>
                  <ImageInput
                    name="logo"
                    placeholder="Organinsation Logo"
                    value={formData.logo}
                    setForm={setFormData}
                    schema={orgSchema?.logo}
                  />

                  <div className="social-icons">
                    <div>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookF className="social-icon" />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="social-icon" />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="social-icon" />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGoogle className="social-icon" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="org-name">
                <Input_text
                  type={"text"}
                  // type={"companyName"}
                  name={"organisation_name"}
                  placeholder={"Organisation Name"}
                  value={formData["organisation_name"]}
                  setForm={setFormData}
                  schema={orgSchema?.organisation_name}
                  imp={true}
                />
                <Select_inputs
                  name={"organisation_type"}
                  placeholder={"Organisation Type"}
                  options={["IT", "Services", "Mancf"]}
                  value={formData.organisation_type}
                  schema={orgSchema.organisation_type}
                  setForm={setFormData}
                />
                <Input_email
                  type={"email"}
                  placeholder={"Organisation Email Id"}
                  name={"org_mail_id"}
                  value={formData["org_mail_id"]}
                  setForm={setFormData}
                  schema={orgSchema.org_mail_id}
                  maxLength={55}
                />
                {/* <Input_email
                  type={"email"}
                  placeholder={"Hr Email Id"}
                  name={"org_mail_id"}
                  value={formData["org_mail_id"]}
                  setForm={setFormData}
                  schema={orgSchema.org_mail_id}
                />
                <Select_inputs
                  name={"organisation_type"}
                  placeholder={"Organisation Type"}
                  options={["IT", "Services", "Mancf"]}
                  value={formData.organisation_type}
                  schema={orgSchema.organisation_type}
                  setForm={setFormData}
                /> */}
              </div>
            </div>
          </div>
          <div className="col-md-12 col-12 org-textarea">
            <Input_area
              type={"textarea"}
              name={"address"}
              placeholder={"Organisation Address"}
              value={formData.address}
              setForm={setFormData}
              schema={orgSchema.address}
              length={250}
            />

            <div className="orgDetailsSubmit d-flex justify-content-end mt-3">
              <button
                style={{
                  background: applicationColor.tabColor,
                  color: "white",
                }}
                disabled={loading}
              >
                {loading ? <Loader /> : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Companydetails;
