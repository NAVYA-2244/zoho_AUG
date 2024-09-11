import Joi from "joi";
import React, { useEffect, useState } from "react";
import {
  InputText,
  Input_text,
  SelectInputs,
  Select_inputs,
} from "../../common/ALLINPUTS/AllInputs";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { RiAddCircleFill } from "react-icons/ri";
import "./LocationForm.scss";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";
import Loader from "../../Loader/Loader";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { MdMovieEdit, MdOutlineDelete } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaArrowLeft, FaRegTrashAlt } from "react-icons/fa";
import moment from "moment-timezone";

const LocationForm = () => {
  const initalObj = {
    organisation_id: "",
    location_name: "",
    time_zone: "",
    country_region: "",
    latitude: "",
    longitude: "",
    radius: "",
  };

  const timeZones = moment.tz.names();

  const [formData, setFormData] = useState(initalObj);
  const [edit, setEdit] = useState(false);
  const { locations } = useStateContext();

  // const [locations, setLocations] = useState([]);
  const [formPage, setFormPage] = useState(false);
  const { checkErrors } = useFunctionContext();
  const {
    setLoadingTerm,
    setLoading,
    loading,
    loadingTerm,
    setErrors,
    orgDetails,
    setOrgDetails,
  } = useStateContext();
  const { applicationColor } = useThemeContext();

  let timeZoness = [
    {
      label: "dubai",
      value: "IST (GMT+8:00)",
    },
    {
      label: "india",
      value: "IST (GMT+5:30)",
    },
  ];
  const schema = {
    organisation_id: Joi.string(),
    location_name: Joi.string()
      .min(5)
      .max(15)
      .messages({
        "string.pattern.base":
          '"Location Name" should not include special characters',
        "any.required": '"Location Name" is required',
      })
      .required()
      .label("Location Name"),
    country_region: Joi.string()
      .min(5)
      .max(15)
      .messages({
        "string.pattern.base":
          '"Country Region" should not include special characters',
        "any.required": '"country Region" is required',
      })
      .required()
      .label("Country Region"),
    time_zone: Joi.string().required().label("Time Zone"),
    latitude: Joi.string().required().messages({
      "string.pattern.base":
        '"Latitude " should not include special characters',
      "any.required": '"Latitude" is required',
    }),
    longitude: Joi.string().required().messages({
      "string.pattern.base": "{#label} should be a valid longitude value",
      "any.required": "{#label} is a required field",
    }),
    radius: Joi.string().required().label("Radius In Meters"),
  };

  const onLocationSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoadingTerm("creatingLocation");
      formData.organisation_id = orgDetails.organisation_id || "";
      await checkErrors(schema, formData);

      // Make network call here

      const res = await backEndCallObjNothing("/user/add_location", formData);

      setOrgDetails(res.data);
      toastOptions.success(res.success);
      setLoading(false);
      setLoadingTerm("");
      setFormPage(false);
    } catch (error) {
      toastOptions.error(error?.response?.data || "ddd");
      setLoading(false);
      setLoadingTerm("");
      toastOptions.error(error?.response?.data || error?.[0].message);
    }
  };

  const handleEditItems = (item) => {
    console.log(item, "item");
    setFormData({
      location_name: item.location_name,
      time_zone: item.time_zone,
      country_region: item.country_region,
      latitude: item.geo_coordinates.latitude,
      longitude: item.geo_coordinates.longitude,
      radius: item.geo_coordinates.radius,
    });
    setEdit(true);
    setFormPage(true);
  };

  return (
    <section
      className="form-cards"
      style={{
        background: applicationColor.cardItem,
        color: applicationColor.readColor1,
      }}
    >
      {formPage ? (
        <section className="form-section">
          <div className="back-button">
            <div>
              <span
                className="add-role me-1"
                onClick={() => {
                  setFormPage(false);
                  setErrors({});
                }}
              >
                <FaArrowLeft />
              </span>
            </div>

            <div className="locationform_heading">
              <h2> {edit ? "Edit" : "Add"} Location</h2>
            </div>
          </div>

          <form className="location_form" onSubmit={onLocationSubmit}>
            <div>
              <InputText
                type={"text"}
                name={"location_name"}
                placeholder={"Location Name"}
                value={formData["location_name"]}
                setForm={setFormData}
                schema={schema?.location_name}
                readOnly={edit}
              />

              <SelectInputs
                name={"country_region"}
                placeholder={"Country"}
                options={["India", "China", "Singapore"]}
                value={formData.country_region}
                schema={schema.country_region}
                setForm={setFormData}
              />
              <SelectInputs
                name={"time_zone"}
                placeholder={"Time Zone"}
                options={timeZoness}
                valueProperty={"value"}
                property={"label"}
                // value={formData.time_zone}
                schema={schema.time_zone}
                setForm={setFormData}
              />

              <InputText
                type={"text"}
                name={"latitude"}
                placeholder={"Latitude"}
                value={formData["latitude"]}
                setForm={setFormData}
                schema={schema?.latitude}
              />
              <InputText
                type={"text"}
                name={"longitude"}
                placeholder={"Longitude"}
                value={formData["longitude"]}
                setForm={setFormData}
                schema={schema?.longitude}
              />
              <InputText
                type={"number"}
                name={"radius"}
                placeholder={"Radius in Meters"}
                value={formData["radius"]}
                setForm={setFormData}
                schema={schema?.radius}
              />
            </div>

            <button type="submit" disabled={loadingTerm === "creatingLocation"}>
              {loading && loadingTerm === "creatingLocation" ? (
                <Loader />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </section>
      ) : (
        <section className="location-cards">
          <div
            className="mb-4 text-end"
            onClick={() => {
              setFormData(initalObj);
              setFormPage(true);
              setEdit(false);
            }}
          >
            <button
              className="dropdown-item d-flex align-items-center justify-content-end"
              type="button"
            >
              <span className="add-role me-1">Add</span>
              <RiAddCircleFill />
            </button>
          </div>

          <div className="">
            <h2>Locations</h2>
          </div>
          <section className="row">
            {locations?.map((item) => {
              const { _id, time_zone, country_region, location_name } = item;
              return (
                <div
                  className="col-xl-4 mb-3 cursor-pointer single_card"
                  key={_id}
                  onClick={() => {
                    handleEditItems(item);
                  }}
                >
                  <div className="d-flex flex-column p-3 rounded-3 default-border">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="role-name">
                        <span className="name" style={{ marginRight: "10px" }}>
                          {country_region}
                        </span>
                        <span className="name" style={{ marginRight: "10px" }}>
                          {location_name}
                        </span>
                      </div>

                      <button className="bg-transparent border-0 outline-0 text-danger">
                        {" "}
                        <FaRegTrashAlt />{" "}
                      </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="role-name">
                        <span>Description here..</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      )}
    </section>
  );
};

export default LocationForm;
