import React, { useEffect, useState } from "react";
import { Input_checkBox } from "../../../common/ALLINPUTS/AllInputs";
// import "./AdminSettingOrgWorkingDays.scss";
import { useThemeContext } from "../../../Contexts/ThemesContext";
import { useStateContext } from "../../../Contexts/StateContext";
import { makeNetworkCall } from "../../../../HttpServices/HttpService";
import Loader from "../../../Loader/Loader";
import { toastOptions } from "../../../../Utils/FakeRoutes";

const AdminSettingOrgWorkingDays = () => {
  const { applicationColor } = useThemeContext();
  const {
    setLoadingTerm,
    setLoading,
    loadingTerm,
    loading,
    employeeDetails,
    // adminData1,
  } = useStateContext();

  const placeholders = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [formData, setFormData] = useState({
    // mon: true,
    // tue: true,
    // wed: true,
    // thu: true,
    // fri: true,
    // sat: false,
    // sun: false,
  });

  // useEffect(() => {
  //   if (
  //     employeeDetails.adminType === "1" &&
  //     Object.keys(adminData1).length > 0
  //   ) {
  //     setFormData(adminData1?.workDays[0].week);
  //   }
  // }, [employeeDetails]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadingTerm("orgWorkingDays");
      setLoading(true);
      const data = { week: formData };
      const { detail } = await makeNetworkCall(
        data,
        "addUpdateWorkDays",
        "headers"
      );
      const response = await makeNetworkCall({}, "getAdminData1", "headers");
      setFormData(response.detail.workDays[0].week);
      setLoading(false);
      setLoadingTerm("");
      toastOptions.success(detail);
    } catch (error) {
      setLoading(false);
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured"
      );
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };
  return (
    <section
      className="roles-table"
      style={{
        background: applicationColor.cardBg1,
        color: applicationColor.readColor1,
      }}>

      <div className="org-heading">
        <h3>Working days</h3>
      </div>

      <form
        className="org_working_form"
        onSubmit={handleSubmit}
        style={{
          color: applicationColor.readColor1,

          background: applicationColor.cardBg1,
        }}
      >
        <div className="new-div">
          {Object.keys(formData).map((item, index) => {
            return (
              <section
                className="checkbox-card"
                style={{
                  //   background: applicationColor.cardBg2,
                  color: applicationColor.readColor1,
                }}
                key={item}
              >
                <div className="label-section">
                  <Input_checkBox
                    name={item}
                    checked={formData[item]}
                    placeholder={placeholders[index]}
                    setForm={setFormData}
                  />
                </div>

                <label
                  htmlFor={item}
                  className="option"
                  style={{
                    background: `${formData[item] ? "#f74f9e" : "#b3b4b3"}`,
                  }}
                >
                  <span
                    // htmlFor={item}
                    className="circle"
                    style={{
                      transform: `translateX(${formData[item] ? 24 : 0}px)`,
                    }}
                  ></span>
                </label>
              </section>
            );
          })}
        </div>

        <section className="org-days-submit">
          <div>
            <button
              type="submit"
              style={{
                background: applicationColor.buttonColor,
                // color: applicationColor.readColor1,
              }}
              disabled={loading || loadingTerm === "orgWorkingDays"}
            >
              {loading && loadingTerm === "orgWorkingDays" ? (
                <Loader />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};

export default AdminSettingOrgWorkingDays;

// Second Component(AdminLoginLeaveDisableEnable) below in this file

export const AdminLoginLeaveDisableEnable = () => {
  const { applicationColor } = useThemeContext();
  const {
    setLoadingTerm,
    setLoading,
    loadingTerm,
    loading,
    employeeDetails,
    adminData1,
  } = useStateContext();

  const placeholders = [
    "Regiseter",
    "Login",
    "Check In",
    "Check Out",
    "Apply Leave",
    "Employee Files Upload",
  ];
  const [formData, setFormData] = useState({
    // register: true,
    // login: true,
    // checkin: true,
    // checkout: true,
    // applyLeave: true,
    // employeeFilesUpload: true,
  });

  // useEffect(() => {
  //   if (
  //     employeeDetails.adminType === "1" &&
  //     Object.keys(adminData1).length > 0
  //   ) {
  //     const {
  //       register,
  //       checkin,
  //       checkout,
  //       login,
  //       employeeFilesUpload,
  //       applyLeave,
  //     } = adminData1?.adminControls;
  //     setFormData({
  //       register: register === "Enable" ? true : false,
  //       login: login === "Enable" ? true : false,
  //       checkin: checkin === "Enable" ? true : false,
  //       checkout: checkout === "Enable" ? true : false,
  //       applyLeave: applyLeave === "Enable" ? true : false,
  //       employeeFilesUpload: employeeFilesUpload === "Enable" ? true : false,
  //     });
  //   }
  // }, [employeeDetails, adminData1]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadingTerm("adminControls");
      setLoading(true);
      // const data = {week:formData}

      const data = {
        register: formData.register ? "Enable" : "Disable",
        login: formData.login ? "Enable" : "Disable",
        checkin: formData.checkin ? "Enable" : "Disable",
        checkout: formData.checkout ? "Enable" : "Disable",
        applyLeave: formData.applyLeave ? "Enable" : "Disable",
        employeeFilesUpload: formData.employeeFilesUpload
          ? "Enable"
          : "Disable",
      }

      const { detail } = await makeNetworkCall(
        data,
        "updateAdminControls",
        "headers"
      );

      const response = await makeNetworkCall({}, "getAdminData1", "headers");
      const {
        register,
        checkin,
        checkout,
        login,
        employeeFilesUpload,
        applyLeave,
      } = response?.detail?.adminControls;
      setFormData({
        register: register === "Enable" ? true : false,
        login: login === "Enable" ? true : false,
        checkin: checkin === "Enable" ? true : false,
        checkout: checkout === "Enable" ? true : false,
        applyLeave: applyLeave === "Enable" ? true : false,
        employeeFilesUpload: employeeFilesUpload === "Enable" ? true : false,
      });
      setLoadingTerm("");
      toastOptions.success(
        typeof detail === "object" ? "Controls Updated Successfully" : detail
      );
    } catch (error) {
      setLoading(false);
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured"
      );
    } finally {
      setLoading(false);
      setLoadingTerm("");
    }
  };
  return (
    <section
      className="org_wolking_days"
      style={{ color: applicationColor.readColor1 }}
    >
      <div className="org-heading">
        <h3>Controls</h3>
      </div>

      <form
        className="org_working_form"
        onSubmit={handleSubmit}
        style={{
          color: applicationColor.readColor1,

          background: applicationColor.cardBg1,
        }}
      >
        <div className="new-div">
          {Object.keys(formData).map((item, index) => {
            return (
              <section
                className="checkbox-card"
                style={{
                  //   background: applicationColor.cardBg2,
                  color: applicationColor.readColor1,
                }}
                key={item}
              >
                <div className="label-section">
                  <Input_checkBox
                    name={item}
                    checked={formData[item]}
                    placeholder={placeholders[index]}
                    setForm={setFormData}
                  />
                </div>
                <label
                  htmlFor={item}
                  className="option"
                  style={{
                    background: `${formData[item] ? "#f74f9e" : "#b3b4b3"}`,
                  }}
                >
                  <span
                    // htmlFor={item}
                    className="circle"
                    style={{
                      transform: `translateX(${formData[item] ? 24 : 0}px)`,
                    }}
                  ></span>
                </label>
              </section>
            );
          })}
        </div>

        <section className="org-days-submit">
          <div>
            <button
              type="submit"
              style={{
                background: applicationColor.buttonColor,
                // color: applicationColor.readColor1,
              }}
              disabled={loading || loadingTerm === "adminControls"}
            >
              {loading && loadingTerm === "adminControls" ? (
                <Loader />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};
