import {
  Input_text,
  Input_email,
  Date_Input,
  Select_inputs,
  Input_area,
  InputPassword,
} from "../../common/ALLINPUTS/AllInputs";
import React, { useEffect, useState } from "react";
import schema from "../../AllSchema/EmployeeSchema";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import ProfilePhoto from "./ProfilePhoto";
import { backEndCallObjNothing } from "../../../services/mainService";
import { toastOptions } from "../../../Utils/FakeRoutes";
import { MdOutlineKey } from "react-icons/md";

const BasicEmployeeData = ({ formData, setFormData,disableobj,type }) => {
  const {
    isAdmin,
    refs,
    locations,
    loading,
    setErrors,
    setLoading,
    orgDetails,
    setOrgDetails,
    employeeDetails,
    reportingmangers,
     setreportingmangers,
     recentemployeeid
  } = useStateContext();
  console.log(reportingmangers,"reportingmangers")
  const { applicationColor } = useThemeContext();
  const [employeesList, setEmployeesList] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [options, setOptions] = useState({});
  const [optionss, setOptionss] = useState({});
  const [optionsss, setoptionsss] = useState({});

  console.log("filteredEmployees",filteredEmployees)
  useEffect(() => {
    if (orgDetails.departments) {
      setOptions({
        departments: orgDetails.departments,
      });
    }
  }, [orgDetails]);
  useEffect(() => {
    if (orgDetails.designations) {
      setOptionss({
        designations: orgDetails.designations,
      });
    }
  }, [orgDetails]);
  useEffect(() => {
    if (orgDetails.roles) {
      setoptionsss({
        roles: orgDetails.roles,
      });
    }
  }, [orgDetails]);
  // useEffect(() => {
  //   const a = locations.filter((item) => {
  //     return item.location_id === formData.location_id;
  //   });
  //   setOptions(settingOptionsByLoications[0]);
  //   console.log(options, "ee");
  // }, [formData.location_id]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);

        // Filter employees with role "Director" or "Manager"
        const managers = reportingmangers.filter((employee) => {
          const roleName = employee?.work_info?.role_name?.toLowerCase();
          return roleName === "admin" || roleName === "manager";
        });

        setFilteredEmployees(managers);
        setEmployeesList(managers); // Assuming this is also needed

      } catch (error) {
        toastOptions.error(error?.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (employeeDetails.admin_type === "1"||employeeDetails.admin_type === "2") {
      fetchingData();
    }
  }, [employeeDetails.admin_type, reportingmangers, setLoading]);

console.log(orgDetails,"navya")
 
  return (
    <>
      <div
        className="row basic-row"
        style={{
          background: applicationColor.mainInputBg,
          color: applicationColor.readColor1,
        }}
      >
        {/* <ProfilePhoto formData={formData} setFormData={setFormData} /> */}

        <h6 className="heading-form mt-4">Basic Information</h6>

        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_text
            type={"text"}
            name={"employee_id"}
            placeholder={"Employee ID"}
            value={formData["employee_id"]}
            setForm={setFormData}
            schema={schema?.employee_id}
            imp={true}
            maxLength={10}
            // readOnly={isAdmin || type === "Update Employee"}
            inputRef={(el) => (refs.current.employee_id = el)}
          /> 
          {console.log(employeeDetails.employees,"navya")}

          {/* {employeeDetails.admin_type === "1"|| employeeDetails.admin_type === "2"&& */}
          
          <p className="note-heading" style={{ color: "green" }}>
            This should be a recent employee Id "
           {recentemployeeid?.employee_id}".
          </p>
          {/* } */}
          
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_text
            type={"text"}
            name={"first_name"}
            placeholder={"First Name"}
            value={formData["first_name"]}
            setForm={setFormData}
            schema={schema.first_name}
            imp={true}
            // readOnly={isAdmin}
            maxLength={20}
            inputRef={(el) => (refs.current.first_name = el)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_text
            type={"text"}
            name={"last_name"}
            placeholder={"Last Name"}
            value={formData["last_name"]}
            setForm={setFormData}
            schema={schema["last_name"]}
            imp={true}
            maxLength={20}
            // readOnly={isAdmin}
            inputRef={(el) => (refs.current.last_name = el)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          {" "}
          <Input_text
            type={"text"}
            name={"nick_name"}
            placeholder={"Nick Name"}
            value={formData["nick_name"]}
            setForm={setFormData}
            schema={schema["nick_name"]}
            maxLength={15}
            inputRef={(el) => (refs.current.nick_name = el)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Select_inputs
            name={"gender"}
            placeholder={"Gender"}
            options={["male", "female", "others"]}
            value={formData.gender}
            schema={schema.gender}
            setForm={setFormData}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.gender = el)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Input_email
            type={"email"}
            name={"email"}
            placeholder={"Email"}
            value={formData["email"]}
            setForm={setFormData}
            schema={schema["email"]}
            maxLength={50}
            imp={true}
            // readOnly={isAdmin}
            inputRef={(el) => (refs.current.email = el)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Select_inputs
            name={"marital_status"}
            placeholder={"Marital Status"}
            value={formData.marital_status}
            schema={schema.marital_status}
            setForm={setFormData}
            options={["unmarried", "married"]}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.marital_status = el)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Date_Input
            type={"date"}
            name={"date_of_birth"}
            placeholder={"Date of Birth"}
            value={formData.date_of_birth}
            setForm={setFormData}
            schema={schema.date_of_birth}
            imp
            inputRef={(el) => (refs.current.date_of_birth = el)}
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
            // imp
            required
          />
        </div>
        {disableobj?.password && (
     <div className="col-lg-4 col-md-4 col-sm-6">
        <InputPassword
            type={"password"}
            placeholder={"Password"}
            name={"password"}
            value={formData["password"]}
            setForm={setFormData}
            id={"password"}
            // maxLength={15} 
            schema={schema.password}
            imp
            icon={<MdOutlineKey />}
            disabled={disableobj?.password} 
          />
        </div>)}
        <div className="col-lg-12 col-md-4 col-sm-6">
          <Input_area
            type={"textarea"}
            name={"about_me"}
            placeholder={"About Me"}
            value={formData.about_me}
            setForm={setFormData}
            schema={schema.about_me}
            length={250}
            maxLength={250}
            inputRef={(el) => (refs.current.about_me = el)}
          />
        </div>
        {/* <div className="col-lg-6 col-md-6"></div> */}
      </div>
      <hr style={{ marginTop: "20px" }} />

      {/* work information */}
      <div
        className="row basic-row"
        style={{
          background: applicationColor.mainInputBg,
          color: applicationColor.readColor1,
        }}
      >
        <h6 className="heading-form"> Work Information</h6>
        <div className="col-lg-4 col-md-4 col-sm-6">
        {employeeDetails.admin_type === "1"||employeeDetails.admin_type === "2"?
          <Select_inputs
            name={"role_id"}
            placeholder={"Role"}
            value={formData.role_id}
            schema={schema.role_id}
            setForm={setFormData}
            options={optionsss.roles || []}
            property={"role_name"}
            valueProperty={"role_id"}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.currentemployment_typerole_id = el)}
          />:
          <Input_text
            type={"text"}
            name={"role_name"}
            placeholder={"role_name"}
            value={formData.role_name}
            setForm={setFormData}
            schema={schema.role_id}
            property={"role_name"}
            readOnly={isAdmin}
          />
          }
        </div>
        {/* 
        <div className="col-lg-4 col-md-4 col-sm-6">
          {/* <Select_inputs
            name={"location_id"}
            placeholder={"Location"}
            value={formData?.location_id}
            schema={schema?.location_id}
            setForm={setFormData}
            options={locations}
            property={"location_name"}
            valueProperty={"location_id"}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.designation = el)}
          /> */}
        {/* </div>  */}

        <div className="col-lg-4 col-md-4 col-sm-6">
        {employeeDetails.admin_type === "1"||employeeDetails.admin_type === "2"
        ?
          <Select_inputs
            name={"department_id"}
            placeholder={"Department"}
            value={formData.department_id}
            schema={schema.department_id}
            setForm={setFormData}
            options={options.departments || []}
            property={"department_name"}
            valueProperty={"department_id"}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.department_id = el)}
          />:
          <Input_text
            type={"text"}
            name={"department_name"}
            placeholder={"department_name"}
            value={formData.department_name}
            setForm={setFormData}
            schema={schema.department_id}
            property={"department_name"}
            readOnly={isAdmin}
          />
}
          
        </div>
        
        <div className="col-lg-4 col-md-4 col-sm-6">
        {employeeDetails.admin_type === "1"||employeeDetails.admin_type === "2"?
          <Select_inputs
            name={"designation_id"}
            placeholder={"Designation"}
            value={formData.designation_id}
            schema={schema.designation_id}
            setForm={setFormData}
            options={optionss.designations || []}
            property={"designation_name"}
            valueProperty={"designation_id"}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.designation_id = el)}
          />:
          <Input_text
            type={"text"}
            name={"designation_name"}
            placeholder={"designation_name"}
            value={formData.designation_name}
            setForm={setFormData}
            schema={schema.designation_id}
            property={"designation_name"}
            readOnly={isAdmin}
          />
          }
        </div>
       
        
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Select_inputs
            name={"employment_type"}
            placeholder={"Employement Type"}
            value={formData.employment_type}
            schema={schema.employment_type}
            setForm={setFormData}
            options={["Full-time", "Part-time"]}
            // readOnly={isAdmin}
            inputRef={(el) => (refs.current.employment_type = el)}
            imp
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <Select_inputs
            name={"source_of_hire"}
            placeholder={"Source of Hire"}
            value={formData.source_of_hire}
            schema={schema.source_of_hire}
            setForm={setFormData}
            options={["Direct", "Social Media"]}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.source_of_hire = el)}
          />
        </div>

        <div className="col-lg-4 col-md-4 col-sm-6">
          <Date_Input
            type={"date"}
            name={"date_of_join"}
            placeholder={"Date of Joining"}
            value={formData.date_of_join}
            setForm={setFormData}
            schema={schema.date_of_join}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.date_of_join = el)}
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
          {" "}
          <Input_text
            type={"text"}
            name={"expertise"}
            placeholder={"Expertise"}
            value={formData["expertise"]}
            setForm={setFormData}
            schema={schema["expertise"]}
            maxLength={250}
            inputRef={(el) => (refs.current.expertise = el)}
            // readOnly={isAdmin}
          />
        </div>

        {/* <div className="col-lg-4 col-md-4 col-sm-6">
        <InputPassword
            type={"password"}
            placeholder={"Password"}
            name={"password"}
            value={formData["password"]}
            setForm={setFormData}
            id={"password"}
            maxLength={15} 
            schema={schema.password}
            imp
            icon={<MdOutlineKey />}
          />
        </div> */}

        <div className="col-lg-4 col-md-4 col-sm-6">
          <Select_inputs
            name={"employee_status"}
            placeholder={"Employee Status"}
            value={formData.employee_status}
            schema={schema.employee_status}
            setForm={setFormData}
            options={["active", "disable", "terminated"]}
            // readOnly={isAdmin}
            imp
            inputRef={(el) => (refs.current.employee_status = el)}
          />
        </div>

        <div className="col-lg-4 col-md-4 col-sm-6">
      
{/* <Select_inputs
  name={"reporting_manager"}
  placeholder={"Reporting Manager"}
  value={formData.reporting_manager}
  schema={schema.reporting_manager}
  setForm={setFormData}
  options={filteredEmployees.map((employee) => ({
    displayName: `${employee.basic_info.email} `, // Display email and last name
    employeeId: employee.employee_id, // Store employee ID for payload
    email: employee.basic_info.email, // Store email for payload
  }))}
  property={"displayName"} // Display email and last name
  valueProperty={"email"} // Store email in the formData
  imp
  inputRef={(el) => (refs.current.reporting_manager = el)}
/> */}

{employeeDetails.admin_type === "1"||employeeDetails.admin_type === "2"?
<Select_inputs
  name={"reporting_manager"}
  placeholder={"Reporting Manager"}
  value={formData.reporting_manager}
  schema={schema.reporting_manager}
  setForm={setFormData}
  options={filteredEmployees.map((employee) => ({
    displayName: `${employee.basic_info.first_name}`, // Display email
    email: employee.email, // Store employee ID for payload
    email: employee.basic_info.email, // Store email for payload
  }))}
  property={"displayName"} // Display email
  valueProperty={"email"} // Store email in the formData
  imp
  // readOnly={isAdmin}
  inputRef={(el) => (refs.current.reporting_manager = el)}
/>
:
<Input_text
            type={"text"}
            name={"reporting_manager"}
            placeholder={"Reporting_manager"}
            value={formData.reporting_manager}
            setForm={setFormData}
            schema={schema.reporting_manager}
           
            readOnly={isAdmin}
          />
}


        </div>
      </div>
    </>
  );
};

export default BasicEmployeeData;
