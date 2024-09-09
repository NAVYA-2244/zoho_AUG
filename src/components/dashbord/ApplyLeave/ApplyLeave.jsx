import React, { useState, useEffect } from "react";
import {
  Date_Input,
  Input_area,
  Select_inputs,
  Input_text,
} from "../../common/ALLINPUTS/AllInputs";
import { TbMoodSick } from "react-icons/tb";
import { MdSick } from "react-icons/md";

import CircularLoader from "../../SVGCircler/Circular";
import { addDays, differenceInDays, format, parse } from "date-fns";
import Joi from "joi";
// import "./ApplyLeave.scss";
import { useStateContext } from "../../Contexts/StateContext";
import { makeNetworkCall } from "../../../HttpServices/HttpService";
import Loader from "../../Loader/Loader";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import EmployeeLeaveApplicationsTable from "./EmployeeLeavesApplicationsTable/EmployeeLeaveApplicationTable";
import { FcLeave } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import { useThemeContext } from "../../Contexts/ThemesContext";

const ApplyLeave = () => {
  const {
    loading,
    setLoading,
    employeeData,
    setEmployeeLeaveApplications,
    setLoadingTerm,
    loadingTerm,
    leaveTypes,
  } = useStateContext();

  const { checkErrors, employeeDetails } = useFunctionContext();
  const { applicationColor } = useThemeContext();

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    reason: "",
    daysTaken: "",
  });

  //This useEffect will calucates the dates between the from date and to date when ever the fromdate and to date changes
  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const fromDateObj = parse(formData.fromDate, "yyyy-MM-dd", new Date());
      const toDateObj = parse(formData.toDate, "yyyy-MM-dd", new Date());
      const daysTaken = differenceInDays(toDateObj, fromDateObj) + 1;
      setFormData((prevFormData) => ({
        ...prevFormData,
        daysTaken: daysTaken.toString(),
      }));
    }
  }, [formData.fromDate, formData.toDate]);

  const leaveForm = {
    leaveType: Joi.string().required().label("Leave type"),

    fromDate: Joi.date()
      .required()
      .messages({
        "any.required": `"From Date" is a required field`,
      })
      .label("From Date"),
    toDate: Joi.date()
      .required()
      .messages({
        "any.required": `"To Date" is a required field`,
      })
      .label("To Date"),
    reason: Joi.string().required().label("Reason"),
    daysTaken: Joi.string().allow("").label("Days Taken"),
  };

  const onLeaveApply = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoadingTerm("applying_leave");
      await checkErrors(leaveForm, formData);
      const { detail } = await makeNetworkCall(
        formData,
        "applyLeave",
        "headers"
      );
      const employeeData = await makeNetworkCall(
        {
          totalAttendanceFilters: {
            year: "",
            month: "",
            fromDate: "",
            toDate: "",
          },
        },
        "getEmployeeData",
        "headers"
      );
      setEmployeeLeaveApplications(employeeData.detail.leaveApplications);
      setFormData({
        fromDate: "",
        toDate: "",
        leaveType: "",
        reason: "",
        daysTaken: "",
      });
      toastOptions.success(detail || "Successfully Leave Application Raised");
      setLoadingTerm("");
      setLoading(false);
    } catch (error) {
      console.log("errors", error);
      toastOptions.error(
        error?.error?.response?.data?.detail || error[0].message
      );
      setLoading(false);
    } finally {
      setLoadingTerm("");
      setLoading(false);
    }
  };

  return (
    <section className="leave-report">
      <section className="leave-types">
        {Object.keys(employeeData).length > 0 ? (
          employeeData?.leaveReport.map((item) => {
            return (
              <section
                className="type"
                key={item.type}
                style={{
                  background: applicationColor.cardBg1,
                  color: applicationColor.readColor1,
                }}
              >
                {console.log(
                  employeeData.leaveReport,
                  "employeeData leaveReport"
                )}
                <div className="leave-img d-flex flex-column">
                  <i className={`${item.type}`} alt={item.type}>
                    {item.type === "Casual" ? <FcLeave /> : <FaUserDoctor />}
                  </i>
                  <h5 className={`leave-type-${item.type}`}>{item.type}</h5>
                </div>
                <div className="leave-availability">
                  <div className="available">
                    <span className="leaves-avialable">
                      Total Leaves : &nbsp; <b>{item.total}</b>
                    </span>
                    <br />
                    <span className="leave-used">
                      Used : &nbsp;<b>{item.used}</b>{" "}
                    </span>
                  </div>
                </div>
                <CircularLoader max={item?.total} min={item.used} />
              </section>
            );
          })
        ) : (
          <div className="row">
            <section>
              <div className="text-center">
                <Loader />
              </div>
            </section>
          </div>
        )}
      </section>
      <br />

      <div className="apply-leave-section">
        <section
          className="apply-leave my-4 py-4 leave-types d-flex justify-content-end"
          style={{
            background: applicationColor.cardBg1,
            color: applicationColor.readColor1,
          }}
        >
          <h5
            className="apply-leave-heading"
            style={{
              color: applicationColor.readColor1,
            }}
          >
            Apply Leave
          </h5>
          <form action="" className="leave-form" onSubmit={onLeaveApply}>
            <div className="row">
              <div className="col-lg-6 col-md-6 ">
                <section className="">
                  <Select_inputs
                    name={"leaveType"}
                    placeholder={"Leave Type"}
                    setForm={setFormData}
                    imp
                    schema={leaveForm["leaveType"]}
                    options={leaveTypes || []}
                    property={"leaveType"}
                    valueProperty={"leaveTypeId"}
                  />

                  <Date_Input
                    type={"date"}
                    value={formData["toDate"]}
                    name={"toDate"}
                    placeholder={"To Date"}
                    setForm={setFormData}
                    schema={leaveForm["toDate"]}
                    imp={true}
                  />

                  <Input_area
                    value={formData["reason"]}
                    name={"reason"}
                    placeholder={"Reason"}
                    schema={leaveForm["reason"]}
                    setForm={setFormData}
                    length={250}
                    imp
                  />
                </section>
              </div>
              <div className="col-lg-6 col-md-6">
                <section className="">
                  {/* <Select_inputs
                    name={"reportingManagerEmail"}
                    placeholder={"Reporting Manager Email"}
                    value={formData.reportingManagerEmail}
                    setForm={setFormData}
                    schema={leaveForm["reportingManagerEmail"]}
                    options={["pavan@gmail.com"]}
                    imp={true}
                  /> */}

                  <Date_Input
                    type={"date"}
                    value={formData["fromDate"]}
                    name={"fromDate"}
                    placeholder={"From Date"}
                    setForm={setFormData}
                    schema={leaveForm["fromDate"]}
                    imp={true}
                  />

                  <Input_text
                    value={
                      formData["daysTaken"] > 0 ? formData["daysTaken"] : ""
                    }
                    name={"daysTaken"}
                    placeholder={"Days Taken"}
                    setForm={setFormData}
                    readOnly={true}
                  />
                </section>
              </div>

              <div className="apply-leave-button">
                <button
                  type="submit"
                  disabled={loading && loadingTerm === "applying_leave"}
                  style={{
                    background: applicationColor.tabColor,
                    float: "right",
                  }}
                >
                  {loading && loadingTerm === "applying_leave" ? (
                    <Loader />
                  ) : (
                    "Applye Leave"
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>

      <EmployeeLeaveApplicationsTable />
    </section>
  );
};

export default ApplyLeave;
