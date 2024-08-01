import React, { useState, useEffect } from "react";
import { parse, differenceInDays } from "date-fns";
import Joi from "joi";
import { useStateContext } from "../../Contexts/StateContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  Date_Input,
  Input_area,
  Select_inputs,
  Input_text,
  Input_email,
} from "../../common/ALLINPUTS/AllInputs";
import Loader from "../../Loader/Loader";
import { useNavigate, useLocation } from "react-router";
import { backEndCallObjNothing } from "../../../services/mainService";

function ApplyLeaveForm() {
  const Navigate = useNavigate();
  const location = useLocation();
  const leaveTypes = location.state?.leaveTypes || [];
  const {
    loading,
    setLoading,
    setEmployeeLeaveApplications,
    setLoadingTerm,
    employeedata,
    setEmployeedata,
  } = useStateContext();
  const { checkErrors, employeeDetails } = useFunctionContext();
  const { applicationColor } = useThemeContext();

  const [formData, setFormData] = useState({
    from_date: "",
    to_date: "",
    leave_type: "",
    reason: "",
    // days_taken: '',
    team_mail_id: "",
  });

  // useEffect(() => {
  //   if (formData.from_date && formData.to_date) {
  //     const from_dateObj = parse(formData.from_date, 'yyyy-MM-dd', new Date());
  //     const to_dateObj = parse(formData.to_date, 'yyyy-MM-dd', new Date());
  //     const days_taken = Math.max(differenceInDays(to_dateObj, from_dateObj) + 1, 1);
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       days_taken: days_taken.toString(),
  //     }));
  //   }
  // }, [formData.from_date, formData.to_date]);

  const leaveFormSchema = {
    from_date: Joi.date().required().label("From Date"),
    to_date: Joi.date().required().label("to date"),
    leave_type: Joi.string().min(10).required().label("Leave Type"),
    reason: Joi.string()
      .pattern(/[a-zA-Z0-9 ]*/)
      .required()
      .label("Reason"),
    team_mail_id: Joi.string()
      .min(5)
      .max(35)
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.pattern.base": '"Email" should not include special characters',
        "any.required": '"Email" is required',
      })
      .label("Email Id"),
  };

  const onLeaveApply = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await checkErrors(leaveFormSchema, formData);
      const response = await backEndCallObjNothing(
        "/emp/apply_leave",
        formData
      );
      Navigate("/leaveApplications");
      setEmployeeLeaveApplications(response);
      setFormData({
        from_date: "",
        to_date: "",
        leave_type: "",
        reason: "",
        // days_taken: '',
        team_mail_id: "",
      });
      toastOptions.success(
        response.success,
        "Successfully Leave Application Raised"
      );
      setLoading(false);
    } catch (error) {
      toastOptions.error(error?.response?.data?.detail || error.message);
      setLoading(false);
      setLoadingTerm("");
    }
  };

  return (
    <div className="apply-leave-section">
      <section
        className="apply-leave my-4 py-4 leave-types"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <div className="fs-20">
          <IoArrowBackSharp
            onClick={() => Navigate("/leaveApplications")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <h5
          className="apply-leave-heading"
          style={{ color: applicationColor.readColor1 }}
        >
          Apply Leave
        </h5>
        <form className="leave-form" onSubmit={onLeaveApply}>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <section>
                <Select_inputs
                  name="leave_type"
                  placeholder="Leave Type"
                  options={employeedata.map((leave) => ({
                    leave_typeId: leave.leave_id,
                    leave_type: leave.leave_name,
                  }))}
                  value={formData.leave_type}
                  setForm={setFormData}
                  schema={leaveFormSchema.leave_type}
                  property="leave_type"
                  valueProperty="leave_typeId"
                />
                <Date_Input
                  type="date"
                  value={formData.from_date}
                  name="from_date"
                  placeholder="From Date"
                  setForm={setFormData}
                  schema={leaveFormSchema.from_date}
                  imp
                />
                <Input_area
                  value={formData.reason}
                  name="reason"
                  placeholder="Reason"
                  schema={leaveFormSchema.reason}
                  setForm={setFormData}
                  length={250}
                  imp
                />
              </section>
            </div>
            <div className="col-lg-6 col-md-6">
              <section>
                <Date_Input
                  type="date"
                  value={formData.to_date}
                  name="to_date"
                  placeholder="To Date"
                  setForm={setFormData}
                  schema={leaveFormSchema.to_date}
                  imp
                />
                {/* <Input_text
                  value={formData.days_taken}
                  name="days_taken"
                  placeholder="Days Taken"
                  schema={leaveFormSchema.days_taken}
                  setForm={setFormData}
                  imp
                  readOnly
                /> */}
                {/* <Input_email
                  type="email"
                  placeholder="Team Email ID"
                  name="team_mail_id"
                  value={formData.team_mail_id}
                  setForm={setFormData}
                  schema={leaveFormSchema.team_mail_id}
                  imp
                /> */}
                <Input_email
                  type="email"
                  placeholder="Team Email ID"
                  name="team_mail_id"
                  value={formData.team_mail_id}
                  setForm={setFormData}
                  schema={leaveFormSchema.team_mail_id}
                  imp
                />
              </section>
            </div>
          </div>
          {loading && <Loader />}
          <section className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              Apply Leave
            </button>
          </section>
        </form>
      </section>
    </div>
  );
}

export default ApplyLeaveForm;
