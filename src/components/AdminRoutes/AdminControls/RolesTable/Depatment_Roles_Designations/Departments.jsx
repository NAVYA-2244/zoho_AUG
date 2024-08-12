import React, { useState, useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useStateContext } from "../../../../Contexts/StateContext";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
import {
  Input_checkBox,
  Input_text,
  Select_inputs,
  Time_Input,
} from "../../../../common/ALLINPUTS/AllInputs";
import Loader from "../../../../Loader/Loader";
import { useFunctionContext } from "../../../../Contexts/FunctionContext";
import { toastOptions } from "../../../../../Utils/FakeRoutes";
import { backEndCallObjNothing } from "../../../../../services/mainService";
import Joi from "joi";
import { IoArrowBackSharp } from "react-icons/io5";
import { inputStepMap } from "./../../../../AllSchema/EmployeeSchema";
import { newConvertTo12HourFormat } from "../../../../../Utils/Helpers";

const Departments = ({ selectedLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { applicationColor } = useThemeContext();
  const [editingItem, setEditingItem] = useState({});
  const [settingId, setSettingId] = useState("");
  const { loading, setErrors, setLoading, orgDetails, setOrgDetails } =
    useStateContext();
  const [mergedData, setMergedData] = useState([]);
  const { checkErrors } = useFunctionContext();

  const fields = ["shift_name", "checkin_time", "checkout_time", "grace_time"];
  const placeholders = [
    "Shift Name",
    "Check-in Time",
    "Check-out Time",
    "Grace Period",
  ];
  const types = ["text", "time", "time", "number"];
  const options = {}; // Define your options here if needed
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const shiftsSchema = {
    shift_id: Joi.string().optional(),
    organisation_id: Joi.string().min(10).max(18).required(),
    location_id: Joi.string().min(15).max(17).required(),
    shift_name: Joi.string().trim().strip().min(1).max(20).required(),
    checkin_time: Joi.string().required().label("Check-in Time"),
    checkout_time: Joi.string().required().label("Check-out Time"),
    grace_time: Joi.number().positive().required().label("Grace Period"),
    working_days: Joi.object({
      0: Joi.boolean().required(),
      1: Joi.boolean().required(),
      2: Joi.boolean().required(),
      3: Joi.boolean().required(),
      4: Joi.boolean().required(),
      5: Joi.boolean().required(),
      6: Joi.boolean().required(),
    }).required(),
  };

  const [formData, setFormData] = useState(() => ({
    shift_name: "",
    checkin_time: "",
    checkout_time: "",
    grace_time: "",
    working_days: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    },
  }));
  useEffect(() => {
    if (edit && editingItem) {
      // Editing mode
      setFormData({
        ...editingItem,
        organisation_id: orgDetails?.organisation_id || "",
        location_id: selectedLocation?.location_id || "",
        working_days: editingItem.working_days,
      });
    } else {
      // Adding mode
      setFormData({
        shift_name: "",
        checkin_time: "",
        checkout_time: "",
        grace_time: "",
        organisation_id: orgDetails?.organisation_id || "",
        location_id: selectedLocation?.location_id || "",
        working_days: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        },
      });
    }
  }, [edit, editingItem, orgDetails, selectedLocation]);

  const handleAddItems = () => {
    setShowModal(true);
    setEdit(false);
  };

  const handleEditItems = (id, item) => {
    setEditingItem(item);
    setEdit(true);
    setShowModal(true);
    setSettingId(id);
  };

  const handleCloseModal = () => {
    setErrors({});
    setShowModal(false);
    setLoading(false);
    setEdit(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("working_days.")) {
      const day = parseInt(name.split(".")[1], 10);

      setFormData((prev) => ({
        ...prev,
        working_days: {
          ...prev.working_days,
          [day]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await checkErrors(shiftsSchema, formData);
      const dataToSubmit = {
        ...formData,
      };

      const response = await backEndCallObjNothing(
        "/user/add_shift",
        dataToSubmit
      );

      setMergedData((prevMergedData) => [...prevMergedData, response]);
      setOrgDetails(response.data);
      toastOptions.success(response.success || "Operation Successful");

      setFormData({
        shift_name: "",
        checkin_time: "",
        checkout_time: "",
        grace_time: "",
        working_days: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        },
      });
      setEdit(false);
      setShowModal(false);
    } catch (error) {
      toastOptions.error(
        error?.response?.data || error[0]?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="">
        <section
          className="roles-table"
          style={{
            background: applicationColor.cardBg1,
            color: applicationColor.readColor1,
          }}
        >
          <div className={`shift-cards ${showModal ? "d-none" : "d-block"}`}>
            <section className="row">
              <div className="mb-4 text-end">
                <button
                  className="dropdown-item d-flex align-items-center justify-content-end"
                  type="button"
                  onClick={handleAddItems}
                >
                  <span className="add-role me-1">Add</span>
                  <RiAddCircleFill />
                </button>
              </div>
              {selectedLocation?.shifts?.length > 0 ? (
                selectedLocation.shifts.map((item, index) => {
                  // Count occurrences of true in working_days
                  const trueCount = Object.values(item.working_days).filter(
                    (value) => value === true
                  ).length;

                  return (
                    <div className="col-xl-4 mb-3" key={index}>
                      <div
                        className="admin-controls-card"
                        style={{
                          background: applicationColor.cardBg1,
                          color: applicationColor.readColor1,
                        }}
                      >
                        <div
                          onClick={() => handleEditItems(item.shift_id, item)}
                        >
                          <h5 className="mt-1 mb-4">
                            Shift Name:&nbsp;
                            <span className="text-primary fw-semi-bold">
                              {item.shift_name}
                            </span>
                          </h5>

                          <div className="checkIn-time">
                            {/* <p className="text-success">Check In</p>
                            <p>:</p> */}
                            <p className="text-success">
                              {" "}
                              {newConvertTo12HourFormat(
                                item?.checkin_time
                              )}{" "}
                            </p>
                            <p>-</p>
                            <p className="text-danger">
                              {" "}
                              {newConvertTo12HourFormat(item?.checkout_time)}
                            </p>
                            <p className="">
                              <strong>Grace: </strong>
                              {item.grace_time} Min
                            </p>
                          </div>
                          <div className="totol-workingDays">
                            <p>
                              <strong>Working Days:</strong> {trueCount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12 text-center">
                  There is no data in your location
                </div>
              )}{" "}
            </section>
          </div>

          <div className={`shift-form ${showModal ? "d-block" : "d-none"}`}>
            {showModal && (
              <>
                <div className="fs-3">
                  <IoArrowBackSharp
                    onClick={handleGoBack}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row justify-content-between">
                    <div className="form-button mb-4">
                      <button
                        className="py-2 px-3"
                        type="submit"
                        disabled={loading}
                        style={{
                          background: applicationColor.buttonColor,
                          color: "white",
                        }}
                      >
                        {loading ? (
                          <Loader />
                        ) : edit ? (
                          "Update Shift"
                        ) : (
                          "Add Shift"
                        )}
                      </button>
                    </div>

                    <div className="col-lg-9">
                      <div className="row">
                        {fields.map((field, index) => (
                          <div className="form-group col-lg-6" key={field}>
                            {["adminType", "dayType"].includes(field) ? (
                              <Select_inputs
                                name={field}
                                value={formData[field]}
                                options={options}
                                setForm={setFormData}
                                placeholder={placeholders[index]}
                                onChange={handleChange}
                              />
                            ) : ["isHoliday"].includes(field) ? (
                              <Input_checkBox
                                name={field}
                                checked={formData[field]}
                                setForm={setFormData}
                                placeholder={placeholders[index]}
                                onChange={handleChange}
                              />
                            ) : ["checkin_time", "checkout_time"].includes(
                                field
                              ) ? (
                              <Time_Input
                                type="time"
                                name={field}
                                className="custom-date-input"
                                setForm={setFormData}
                                value={formData[field]}
                                placeholder={placeholders[index]}
                                style={{ background: "", color: "#fff" }}
                                onChange={handleChange}
                              />
                            ) : (
                              <Input_text
                                type={types[index]}
                                name={field}
                                setForm={setFormData}
                                value={formData[field]}
                                placeholder={placeholders[index]}
                                onChange={handleChange}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <section
                        className="org_wolking_days"
                        // style={{ color: applicationColor.readColor1 }}
                        style={{
                          background: applicationColor.cardBg1,
                          color: applicationColor.readColor1,
                        }}
                      >
                        <div className="org-heading">
                          <h3>Working days</h3>
                        </div>
                        <div className="new-div">
                          {Object.keys(formData.working_days).map(
                            (day, index) => (
                              <section
                                className="checkbox-card"
                                style={{
                                  color: applicationColor.readColor1,
                                }}
                                key={day}
                              >
                                <div class="form-check form-switch">
                                  <input
                                    type="checkbox"
                                    class="form-check-input"
                                    role="switch"
                                    // id="flexSwitchCheckDefault"
                                    id="day"
                                    name={`working_days.${day}`}
                                    checked={formData.working_days[day]}
                                    onChange={handleChange}
                                  />
                                </div>
                                <span class="form-check-label" for="day">
                                  {dayNames[index]}
                                </span>
                              </section>
                            )
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Departments;
