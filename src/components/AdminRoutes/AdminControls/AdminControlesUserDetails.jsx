import { useEffect, useState } from "react";
import Joi from "joi";
import { IoArrowBackSharp } from "react-icons/io5";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { useStateContext } from "../../Contexts/StateContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { Input_text, Select_inputs } from "../../common/ALLINPUTS/AllInputs";
import { backEndCallObjNothing } from "../../../services/mainService";
import Loader from "../../Loader/Loader";
import { toastOptions } from "../../../Utils/FakeRoutes";

const AdminControlesUserDetails = ({ selectedLocation }) => {
  const { applicationColor } = useThemeContext();
  const { loading, setLoading, orgDetails, setOrgDetails } = useStateContext();
  const { checkErrors } = useFunctionContext();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    organisation_id: "",
    location_id: "",
    name_to_be_displayed: "FIRST_LAST",
    date_format: "DDMMYYYY",
    time_format: "24",
    chat: false,
    send_mail_notifications: false,
    announcements: false,
    dual_reporting: false,
    hide_birthday: false,
    hide_work_anniversary: false,
    hide_mobile_number: false,
    find_other_emp_by_mobile_number: false,
  });

  // const settingsSchema = {
  //   organisation_id: Joi.string().min(10).max(18).required(),
  //   location_id: Joi.string().min(15).max(17).required(),
  //   name_to_be_displayed: Joi.string()
  //     .valid("FIRST_LAST", "LAST_FIRST")
  //     .required(),
  //   date_format: Joi.string()
  //     .valid("DDMMYYYY", "MMDDYYYY", "YYYYMMDD")
  //     .required(),
  //   time_format: Joi.string().valid("12", "24").required(),
  //   chat: Joi.boolean().required(),
  //   send_mail_notifications: Joi.boolean().required(),
  //   announcements: Joi.boolean().required(),
  //   dual_reporting: Joi.boolean().required(),
  //   hide_birthday: Joi.boolean().required(),
  //   hide_work_anniversary: Joi.boolean().required(),
  //   hide_mobile_number: Joi.boolean().required(),
  //   find_other_emp_by_mobile_number: Joi.boolean().required(),
  // };

  // Update formData when selectedLocation or orgDetails changes
  useEffect(() => {
    if (orgDetails && selectedLocation) {
      setFormData({
        organisation_id: orgDetails?.organisation_id || "",
        // location_id: selectedLocation.location_id || "",
        name_to_be_displayed:
          selectedLocation.display_settings?.name_to_be_displayed ||
          "FIRST_LAST",
        date_format:
          selectedLocation.display_settings?.date_format || "DDMMYYYY",
        time_format: selectedLocation.display_settings?.time_format || "24",
        chat: selectedLocation.chat_settings?.status || false,
        send_mail_notifications:
          selectedLocation.notifications?.send_mail_notifications || false,
        announcements: selectedLocation.notifications?.announcements || false,
        dual_reporting:
          selectedLocation.employee_setting?.dual_reporting || false,
        hide_birthday:
          selectedLocation.employee_setting?.hide_birthday || false,
        hide_work_anniversary:
          selectedLocation.employee_setting?.hide_work_anniversary || false,
        hide_mobile_number:
          selectedLocation.employee_setting?.hide_mobile_number || false,
        find_other_emp_by_mobile_number:
          selectedLocation.employee_setting?.find_other_emp_by_mobile_number ||
          false,
      });
    }
  }, [orgDetails, selectedLocation]);
  const settingsSchema = {
    organisation_id: Joi.string().min(10).max(18).required(),
    // location_id: Joi.string().min(15).max(17).required(),
    name_to_be_displayed: Joi.string()
      .valid("FIRST_LAST", "LAST_FIRST")
      .required(),
    date_format: Joi.string()
      .valid("DDMMYYYY", "MMDDYYYY", "YYYYMMDD")
      .required(),
    time_format: Joi.string().valid("12", "24").required(),
    chat: Joi.boolean().required(),
    send_mail_notifications: Joi.boolean().required(),
    announcements: Joi.boolean().required(),
    dual_reporting: Joi.boolean().required(),
    hide_birthday: Joi.boolean().required(),
    hide_work_anniversary: Joi.boolean().required(),
    hide_mobile_number: Joi.boolean().required(),
    find_other_emp_by_mobile_number: Joi.boolean().required(),
  };
  const getTimeFormat = (timeFormat) => {
    const format = (timeFormat || "24").toString().trim();
    return format === "12" || format === "24" ? format : "24";
  };
  // Update formData when selectedLocation or orgDetails changes
  useEffect(() => {
    if (orgDetails && selectedLocation) {
      setFormData({
        organisation_id: orgDetails?.organisation_id || "",
        // location_id: selectedLocation.location_id || "",
        name_to_be_displayed:
          selectedLocation.display_settings?.name_to_be_displayed ||
          "FIRST_LAST",
        date_format:
          selectedLocation.display_settings?.date_format || "DDMMYYYY",
        time_format:
          getTimeFormat(selectedLocation.display_settings?.time_format) || "24",
        chat: selectedLocation.chat_settings?.status || false,
        send_mail_notifications:
          selectedLocation.notifications?.send_mail_notifications || false,
        announcements: selectedLocation.notifications?.announcements || false,
        dual_reporting:
          selectedLocation.employee_setting?.dual_reporting || false,
        hide_birthday:
          selectedLocation.employee_setting?.hide_birthday || false,
        hide_work_anniversary:
          selectedLocation.employee_setting?.hide_work_anniversary || false,
        hide_mobile_number:
          selectedLocation.employee_setting?.hide_mobile_number || false,
        find_other_emp_by_mobile_number:
          selectedLocation.employee_setting?.find_other_emp_by_mobile_number ||
          false,
      });
    }
  }, [orgDetails, selectedLocation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await checkErrors(settingsSchema, formData);
      const response = await backEndCallObjNothing(
        "/user/add_employee_related_setings_from_admin",
        formData
      );
      setOrgDetails(response.data);
      toastOptions.success(response.success || "Settings updated successfully");
    } catch (error) {
      toastOptions.error(
        error?.response?.data || error[0]?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setEditMode(false);
  };

  return (
    <div
      className="admin-controls mt-4"
      //   style={{
      //     background: applicationColor.cardBg1,
      //     color: applicationColor.readColor1,
      //   }}
    >
      <section
      // className=""
      // style={{
      //   background: applicationColor.cardBg1,
      //   color: applicationColor.readColor1,
      // }}
      >
        {editMode && (
          <div className="fs-3 mb-3">
            <IoArrowBackSharp
              onClick={handleGoBack}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        <form onSubmit={handleSaveChanges}>
          <div className="row">
            <div className="form-button">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary m-0 px-3"
                style={{
                  background: applicationColor.buttonColor,
                  color: "white",
                }}
              >
                {loading ? <Loader /> : "Save Changes"}
              </button>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-10">
              <div
                className="admin-controls-card"
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                <h4 className="mt-1 mb-4">Display Settings</h4>
                <div className="mb-3">
                  {/* <label htmlFor="name_to_be_displayed" className="form-label">
                    Name to Display
                  </label> */}
                  <Select_inputs
                    id="name_to_be_displayed"
                    name="name_to_be_displayed"
                    placeholder={"Name to Display"}
                    options={[
                      { value: "FIRST_LAST", label: "First Last" },
                      { value: "LAST_FIRST", label: "Last First" },
                    ]}
                    value={formData.name_to_be_displayed}
                    setForm={setFormData}
                    valueProperty="value"
                    property="label"
                  />
                </div>

                <div className="mb-3 date-format">
                  {/* <label htmlFor="date_format" className="form-label">
                    Date Format
                  </label> */}

                  <Select_inputs
                    id="date_format"
                    name="date_format"
                    placeholder={"Date Format"}
                    options={[
                      { value: "DDMMYYYY", label: "DD/MM/YYYY" },
                      { value: "MMDDYYYY", label: "MM/DD/YYYY" },
                      { value: "YYYYMMDD", label: "YYYY/MM/DD" },
                    ]}
                    value={formData.date_format}
                    setForm={setFormData}
                    valueProperty="value"
                    property="label"
                  />
                  <p style={{ fontSize: "13px", paddingLeft: "4px 0 0 7px" }}>
                    example:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {formData.date_format}
                    </span>
                  </p>
                </div>

                <div className="mb-3">
                  {/* <label htmlFor="time_format" className="form-label">
                    Time Format
                  </label> */}
                  <Select_inputs
                    id="time_format"
                    name="time_format"
                    placeholder={"Time Format"}
                    options={[
                      { value: "12", label: "12 Hour" },
                      { value: "24", label: "24 Hour" },
                    ]}
                    value={formData.time_format}
                    setForm={setFormData}
                    valueProperty="value"
                    property="label"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-10">
              <div
                className="admin-controls-card mb-3"
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                <h4 className="mt-1 mb-3 h4">Chat Settings</h4>
                <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center">
                  <label className="form-check-label me-3" htmlFor="chatSwitch">
                    Chat Facility
                  </label>
                  {/* <div className="">
                    {formData.chat ? "Enable" : "Disable"}
                  </div> */}
                  <div className="">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="chatSwitch"
                      name="chat"
                      checked={formData.chat}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div
                className="admin-controls-card"
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                <h4 className="mt-1 mb-3">Notifications Settings</h4>
                <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label"
                    htmlFor="sendMailNotificationsSwitch"
                  >
                    Send Mail Notifications
                  </label>
                  {/* <div className="">
                    {formData.send_mail_notifications ? "Enable" : "Disable"}
                  </div> */}
                  <div className="">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sendMailNotificationsSwitch"
                      name="send_mail_notifications"
                      checked={formData.send_mail_notifications}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label"
                    htmlFor="announcementsSwitch"
                  >
                    Announcements
                  </label>
                  {/* <div className="">
                    {formData.announcements ? "Enable" : "Disable"}
                  </div> */}
                  <div className="">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="announcementsSwitch"
                      name="announcements"
                      checked={formData.announcements}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-10">
              <div
                className="admin-controls-card"
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                <h4 className="mt-1 mb-3">Employee Settings</h4>

                <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label"
                    htmlFor="dualReportingSwitch"
                  >
                    Dual Reporting
                  </label>
                  {/* <div className="">
                    {formData.dual_reporting ? "Enable" : "Disable"}
                  </div> */}
                  <div className="">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="dualReportingSwitch"
                      name="dual_reporting"
                      checked={formData.dual_reporting}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label"
                    htmlFor="hideBirthdaySwitch"
                  >
                    Hide Birthday
                  </label>
                  {/* <div className="">
                    {formData.hide_birthday ? "Enable" : "Disable"}
                  </div> */}
                  <div className="">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hideBirthdaySwitch"
                      name="hide_birthday"
                      checked={formData.hide_birthday}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label"
                    htmlFor="hideWorkAnniversarySwitch"
                  >
                    Hide Work Anniversary
                  </label>
                  {/* <div className="">
                    {formData.hide_work_anniversary ? "Enable" : "Disable"}
                  </div> */}
                  <div className="">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hideWorkAnniversarySwitch"
                      name="hide_work_anniversary"
                      checked={formData.hide_work_anniversary}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label"
                    htmlFor="hideMobileNumberSwitch"
                  >
                    Hide Mobile Number
                  </label>
                  {/* <div className="">
                    {formData.hide_mobile_number ? "Enable" : "Disable"}
                  </div> */}
                  <div className="">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hideMobileNumberSwitch"
                      name="hide_mobile_number"
                      checked={formData.hide_mobile_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label"
                    htmlFor="findOtherEmpByMobileNumberSwitch"
                    style={{ textWrap: "balance" }}
                  >
                    Find Other Employees by Mobile Number
                  </label>
                  {/* <div className="">
                    {formData.find_other_emp_by_mobile_number
                      ? "Enable"
                      : "Disable"}
                  </div> */}
                  <div className="">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="findOtherEmpByMobileNumberSwitch"
                      name="find_other_emp_by_mobile_number"
                      checked={formData.find_other_emp_by_mobile_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AdminControlesUserDetails;
