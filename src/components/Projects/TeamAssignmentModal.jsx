import React, { useState, useEffect, useRef } from "react";
import Joi from "joi";
import { backEndCallObjNothing } from "../../services/mainService";
import { useThemeContext } from "../Contexts/ThemesContext";
import { useFunctionContext } from "../Contexts/FunctionContext";
import { Select_inputs } from "../common/ALLINPUTS/AllInputs";
import Loader from "../Loader/Loader";
import { toastOptions } from "../../Utils/FakeRoutes";
import { IoArrowBackSharp } from "react-icons/io5";

const TeamAssignmentModal = ({ projectId, setIsTeamModalVisible, fetchProjects }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: "",
    action: "",
  });
const[btndisabled,setBtndisabled]=useState(false)
  const [errors, setErrors] = useState({});
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { checkErrors } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  
  const refs = useRef({});

  const schema = {
    action: Joi.string().valid("remove", "add").required(),
    employee_id: Joi.string().min(5).max(12).required(),
    project_id: Joi.string().min(5).max(12).required(),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    const payload = {
      action: formData.action,
      employee_id: formData.employee_id,
      project_id: projectId,
    };
    try {
        setBtndisabled(true)
      await checkErrors(schema, payload);
    const res=  await backEndCallObjNothing("/admin/add_remove_team", payload);
      toastOptions.success(res);
      fetchProjects();
      setIsTeamModalVisible(false);
      setBtndisabled(false)
    } catch (error) {
      console.log(error);
      setBtndisabled(false)
      toastOptions.error(error?.response?.data);
    } finally {
    //   setLoading(false);
    setBtndisabled(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);
        const employees = await backEndCallObjNothing("/admin_get/get_employee_list", { skip: 0 });
        if (employees?.employees?.length) {
          const managers = employees.employees.filter(employee => {
            const roleName = employee?.work_info?.role_name?.toLowerCase();
            return roleName === "team incharge";
          });
          setFilteredEmployees(managers);
        }
      } catch (error) {
        toastOptions.error(error?.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, []);
const handleGoBack=()=>{
    setIsTeamModalVisible(false)
}
  return (

<div className="team-assignment-modal">
<div className="fs-3 mb-3">
    <IoArrowBackSharp
      onClick={handleGoBack}
      style={{ cursor: "pointer" }}
    />
  </div>
  
<div
  className="admin-controls-card col-lg-6 col-md-8 mx-auto mb-3"
  style={{
    background: applicationColor.cardBg1,
    color: applicationColor.readColor1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRadius: "10px",
  }}
>
<h6 className="mb-2">Assign or Remove Team Member</h6>
  <p className="text-muted mb-4">
    Please select the team incharge and action you want to perform.
  </p>
  
  <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
    <div className="mb-3">
      <Select_inputs
        name="employee_id"
        placeholder="Select Team Incharge"
        value={formData.employee_id}
        setForm={setFormData}
        options={filteredEmployees?.map((employee) => ({
          ...employee,
          displayName: `${employee.basic_info.first_name} ${employee.basic_info.last_name}`,
        }))}
        property="displayName"
        valueProperty="employee_id"
        error={errors.employee_id}
        inputRef={(el) => (refs.current.employee_id = el)}
      />
    </div>
    <div className="mb-3">
      <Select_inputs
        name="action"
        placeholder="Select Action"
        value={formData.action}
        options={[
          { label: "Add", value: "add" },
          { label: "Remove", value: "remove" },
        ]}
        setForm={setFormData}
        onChange={handleChange}
        property="label"
        valueProperty="value"
        error={errors.action}
      />
    </div>
    <div className="form-button">
      <button
        className="py-2 px-3 w-100"
        type="submit"
        disabled={btndisabled}
        style={{
          background: applicationColor.buttonColor,
          color: "white",
        }}
      >
        {loading ? <Loader /> : "Submit"}
      </button>
    </div>
  </form>
</div>
</div>
  );
};

export default TeamAssignmentModal;
