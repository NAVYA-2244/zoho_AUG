import React, { useEffect, useState } from "react";
import RolesTable from "../RolesTable";
import { useStateContext } from "../../../../Contexts/StateContext";
import { toastOptions } from "../../../../../Utils/FakeRoutes";
import { makeNetworkCall } from "../../../../../HttpServices/HttpService";
import { useFunctionContext } from "../../../../Contexts/FunctionContext";
import Joi from "joi";
import { useThemeContext } from "../../../../Contexts/ThemesContext";
import { Link } from "react-router-dom";
import { backEndCallObjNothing } from "../../../../../services/mainService";
import ShiftDetailsForm from "./ShiftDetailsForm";
import LeavesSettings from "./LeavesSettings";
import AdminControlesUserDetails from "../../AdminControlesUserDetails";
import FileUploadForm from "./Folder";

const Roles = () => {
  const { applicationColor } = useThemeContext();
  const {
    roles,
    departments,
    designations,
    setLoading,
    shifts,
    locations,
    events,
    leaveTypes,
    adminFolders,
    orgDetails,
  } = useStateContext();

  const {
    setDepartments,
    setDesignations,
    setRoles,
    setShifts,
    setLocations,
    setEvents,
    setLeaveTypes,
    setAdminFolders,
    setOrgDetails,
  } = useStateContext();

  const [allLocations, setAllLocations] = useState([]);
  const [locationname, setloctionname] = useState("vijaywada");
  const { checkErrors } = useFunctionContext();
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedtab, setSelectedTab] = useState(null);

  useEffect(() => {
    if (orgDetails && orgDetails.locations) {
      setAllLocations(orgDetails.locations);
      setSelectedLocation(orgDetails.locations[0]);
      setSelectedTab("roles");
    }
  }, [orgDetails]);

  // console.log(selectedLocation, "selectedLocation");

  // Schema to check the roles or valid or not
  const roleSchema = {
    role_name: Joi.string().min(5).max(20).required().label("Role Name"),
    role_id: Joi.string().label("Role Name"),
  };
  const folderSchema = {
    folderName: Joi.string().min(3).max(30).required().label("Folder Name"),
  };

  // Departement  schema to check the added or updated department is valid or not
  const departementSchema = {
    department_name: Joi.string()
      .min(3)
      .max(20)
      .required()
      .label("Department Name"),
  };

  //Desingation schema to check the added or updated desingation is valid or not
  const designationSchema = {
    designation_name: Joi.string()
      .min(5)
      .max(20)
      .required()
      .label("Designation Name"),
  };

  // const shiftsSchema = {
  //   shift_name: Joi.string()
  //     .min(3)
  //     .max(30)
  //     .required()
  //     .label("Shift Name")
  //     .messages({
  //       "string.base": "{#label} should be a type of 'text'",
  //       "string.empty": "{#label} cannot be an empty field",
  //       "string.min": "{#label} should have a minimum length of {#limit}",
  //       "string.max": "{#label} should have a maximum length of {#limit}",
  //       "any.required": "{#label} is a required field",
  //     }),
  //   checkin_time: Joi.string()
  //     // .pattern(new RegExp("^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$"))
  //     .required()
  //     .label("Shift From")
  //     .messages({
  //       "string.pattern.base": "{#label} should be in the format HH:MM AM/PM",
  //       "any.required": "{#label} is a required field",
  //     }),
  //   checkout_time: Joi.string()
  //     // .pattern(new RegExp("^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$"))
  //     .required()
  //     .label("Shift To")
  //     .messages({
  //       "string.pattern.base": "{#label} should be in the format HH:MM AM/PM",
  //       "any.required": "{#label} is a required field",
  //     }),
  //   grace_time: Joi.string()
  //     // .pattern(new RegExp("^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$"))
  //     .required()
  //     .label("Grace Period"),
  // };

  const eventsSchema = {
    eventName: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Event Name")
      .messages({
        "string.base": "{#label} should be a type of 'text'",
        "string.empty": "{#label} cannot be an empty field",
        "string.min": "{#label} should have a minimum length of {#limit}",
        "string.max": "{#label} should have a maximum length of {#limit}",
        "any.required": "{#label} is a required field",
      }),
    fromDate: Joi.string().required().label("From Date"),
    toDate: Joi.string().required().label("To Date"),

    fromTime: Joi.string()
      .required()
      .messages({
        "string.pattern.base": "{#label} should be in the format HH:MM AM/PM",
        "any.required": "{#label} is a required field",
      })
      .label("From Time"),
    toTime: Joi.string()
      .required()
      .messages({
        "string.pattern.base": "{#label} should be in the format HH:MM AM/PM",
        "any.required": "{#label} is a required field",
      })
      .label("To Time"),
    dayType: Joi.string().required().label("Day Type").messages({
      "any.required": "{#label} is a required field",
    }),
    isHoliday: Joi.boolean().label("Is Holiday"),
  };

  const locationSchema = {
    locationName: Joi.string().min(3).max(30).required().label("Location Name"),
    latitude: Joi.string()
      .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/)
      .required()
      .messages({
        "string.pattern.base": "{#label} should be a valid latitude value",
        "any.required": "{#label} is a required field",
      }),
    longitude: Joi.string()
      .pattern(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
      .required()
      .messages({
        "string.pattern.base": "{#label} should be a valid longitude value",
        "any.required": "{#label} is a required field",
      }),
  };

  // const leaveTypeSchema = {
  //   leaveType: Joi.string()
  //     .min(3)
  //     .max(30)
  //     .required()
  //     .label("Leave Type")
  //     .messages({
  //       "string.base": "{#label} should be a type of 'text'",
  //       "string.empty": "{#label} cannot be an empty field",
  //       "string.min": "{#label} should have a minimum length of {#limit}",
  //       "string.max": "{#label} should have a maximum length of {#limit}",
  //       "any.required": "{#label} is a required field",
  //     }),
  //   maxLeaves: Joi.number().max(20).allow("").label("Max Leaves"),
  // };

  // This function is responsible to add the role and update the role
  const onRoleAdd = async (data, property, id) => {
    try {
      setLoading(true);
      await checkErrors(roleSchema, data);
      if (edit) {
        data[property] = id;
      }
      data.organisation_id = orgDetails.organisation_id;
      data.location_id = selectedLocation.location_id;
      const response = await backEndCallObjNothing("/user/add_role", data);

      setOrgDetails(response.data);
      toastOptions.success("Roles Updated Successfully");
      setLoading(false);
      setEdit(false);
    } catch (error) {
      setLoading(false);
      if (error) {
        toastOptions.error(
          error?.response?.data || error[0].message || "something went wrong"
        );
        return Promise.reject(error);
      }
    } finally {
      setLoading(false);
      delete data.organisation_id;
      delete data.location_id;
    }
  };

  // this function is responsible to add and update the department
  const onDepartmentAdd = async (data, property, id) => {
    try {
      setLoading(true);
      await checkErrors(departementSchema, data);
      if (edit) {
        data[property] = id;
      }
      data.organisation_id = orgDetails.organisation_id;
      data.location_id = selectedLocation.location_id;
      const response = await backEndCallObjNothing(
        "/user/add_department",
        data
      );

      setOrgDetails(response.data);
      toastOptions.success("Departments Updated Successfully");
      setLoading(false);
      setEdit(false);
    } catch (error) {
      setLoading(false);
      if (error) {
        toastOptions.error(
          error?.error?.response?.data?.detail ||
            error[0].message ||
            "something went wrong"
        );
        return Promise.reject(error);
      }
    } finally {
      setLoading(false);
      delete data.organisation_id;
      delete data.location_id;
    }
  };

  // this function is responsible to add and update the desingation
  const onDesignationAdd = async (data, property, id) => {
    try {
      setLoading(true);
      await checkErrors(designationSchema, data);

      if (edit) {
        data[property] = id;
      }

      data.organisation_id = orgDetails.organisation_id;
      data.location_id = selectedLocation.location_id;

      const response = await backEndCallObjNothing(
        "/user/add_designation",
        data
      );

      setOrgDetails(response.data);
      toastOptions.success("Designation Updated Successfully");
      setEdit(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      if (error) {
        toastOptions.error(
          error?.response?.data || error[0].message || "something went wrong"
        );
        return Promise.reject(error);
      }
    } finally {
      setLoading(false);
      delete data.designation_id;
      delete data.organisation_id;
      delete data.location_id;

      console.log(data);
    }
  };

  // This function is responsible to add , update the shifts data , time , grace period etc
  // const onShiftAdd = async (data, property, id) => {
  //   try {
  //     setLoading(true);

  //     await checkErrors(shiftsSchema, data);
  //     if (edit) {
  //       data[property] = id;
  //     }
  //     const response = await makeNetworkCall(
  //       data,
  //       edit ? "updateShift" : "createShift",
  //       "headers"
  //     );
  //     const { detail } = await makeNetworkCall(
  //       {
  //         employeesSearch: "",
  //       },
  //       "getOrgData2",
  //       "headers"
  //     );
  //     setShifts([...detail.shifts]);
  //     toastOptions.success(response?.detail || "Shift Added SuccessFully");
  //     setLoading(false);
  //   } catch (error) {
  //     if (error) {
  //       toastOptions.error(
  //         error?.error?.response?.data?.detail || error[0].message
  //       );
  //     }
  //     return Promise.reject(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onLocationAdd = async (data, property, id) => {
    try {
      setLoading(true);

      await checkErrors(locationSchema, data);
      if (edit) {
        data[property] = id;
      }
      const response = await makeNetworkCall(
        data,
        edit ? "updateLocation" : "createLocation",
        "headers"
      );
      const { detail } = await makeNetworkCall(
        {
          employeesSearch: "",
        },
        "getOrgData2",
        "headers"
      );
      setLocations([...detail.locations]);
      toastOptions.success(response?.detail || "Location Added SuccessFully");
      setLoading(false);
    } catch (error) {
      if (error) {
        toastOptions.error(
          error?.error?.response?.data?.detail || error[0].message
        );
      }
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  //This function is responsibel to add the event
  const onEventAdd = async (data, property, id) => {
    try {
      setLoading(true);
      await checkErrors(eventsSchema, data);
      if (edit) {
        data[property] = id;
      }
      const response = await makeNetworkCall(
        data,
        edit ? "updateEvent" : "createEvent",
        "headers"
      );
      const { detail } = await makeNetworkCall(
        {
          employeesSearch: "",
        },
        "getOrgData2",
        "headers"
      );
      setEvents([...detail.events]);
      toastOptions.success(response?.detail || "Event Added SuccessFully");
      setLoading(false);
    } catch (error) {
      if (error) {
        toastOptions.error(
          error?.error?.response?.data?.detail || error[0].message
        );
      }
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // const onLeaveTypeAdd = async (data, property, id) => {
  //   try {
  //     setLoading(true);
  //     await checkErrors(leaveTypeSchema, data);
  //     if (edit) {
  //       data[property] = id;
  //     }
  //     const response = await makeNetworkCall(
  //       data,
  //       edit ? "updateLeaveType" : "createLeaveType",
  //       "headers"
  //     );
  //     const { detail } = await makeNetworkCall({}, "getOrgData1", "headers");
  //     setLeaveTypes([...detail.leaveTypes]);
  //     toastOptions.success(response?.detail || "Leave Type Added SuccessFully");
  //     setLoading(false);
  //   } catch (error) {
  //     if (error) {
  //       toastOptions.error(
  //         error?.error?.response?.data?.detail || error[0].message
  //       );
  //     }
  //     return Promise.reject(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onFolderAdd = async (data, property, id) => {
    try {
      setLoading(true);
      await checkErrors(folderSchema, data);
      if (edit) {
        data[property] = id;
      }
      const response = await makeNetworkCall(
        data,
        edit ? "updateFolder" : "createFolder",
        "headers"
      );
      const { detail } = await makeNetworkCall({}, "getAdminData1", "headers");
      setAdminFolders([...detail.foldersData]);
      toastOptions.success(response?.detail || "Folder created SuccessFully");
      setLoading(false);
    } catch (error) {
      if (error) {
        toastOptions.error(
          error?.error?.response?.data?.detail || error[0].message
        );
      }
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // This function is resposibel to delete the role
  const onDeleteRole = async (id) => {
    try {
      setLoading(true);
      const data = {
        id: id,
      };
      setValue(id); //to show loader nothing else this state for

      const response = await makeNetworkCall(data, "deleteRole", "headers");
      const { detail } = await makeNetworkCall(
        { employeesSearch: "" },
        "getOrgData2",
        "headers"
      );
      setRoles([...detail.roles]);
      toastOptions.success(response?.detail || "Role Deleted successfully");
      setLoading(false);
      setValue("");
    } catch (error) {
      setLoading(false);
      setValue("");
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured while deletion"
      );
    } finally {
      setValue("");
      setLoading(false);
    }
  };

  // this function is responseible to delete the department
  const onDeleteDepartment = async (id) => {
    try {
      setValue(id); //to show loader nothing else this state for

      setLoading(true);
      const data = {
        id: id,
      };
      const response = await makeNetworkCall(
        data,
        "deleteDepartment",
        "headers"
      );
      const { detail } = await makeNetworkCall(
        { employeesSearch: "" },
        "getOrgData2",
        "headers"
      );
      setDepartments([...detail.departments]);
      toastOptions.success(
        response?.detail || "Department Deleted successfully"
      );
      setLoading(false);
      setValue("");
    } catch (error) {
      setValue("");
      setLoading(false);
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured while deletion"
      );
    } finally {
      setValue("");
      setLoading(false);
    }
  };

  // this function is respobseible to delete the designation
  const onDeleteDesignation = async (id) => {
    try {
      setValue(id); //to show loader nothing else this state for

      setLoading(true);

      const data = {
        id: id,
      };
      const response = await makeNetworkCall(
        data,
        "deleteDesignation",
        "headers"
      );
      const { detail } = await makeNetworkCall(
        { employeesSearch: "" },
        "getOrgData2",
        "headers"
      );
      setDesignations([...detail.designations]);
      toastOptions.success(
        response?.detail || "Designation Deleted successfully"
      );
      setLoading(false);
      setValue("");
    } catch (error) {
      setValue("");

      setLoading(false);
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured while deletion"
      );
    } finally {
      setValue("");
      setLoading(false);
    }
  };

  // This function is responsibel to delete the shift
  const onShiftDelete = async (id) => {
    try {
      setLoading(true);
      const data = {
        id: id,
      };
      setValue(id); //to show loader nothing else this state for

      const response = await makeNetworkCall(data, "deleteShift", "headers");
      const { detail } = await makeNetworkCall(
        { employeesSearch: "" },
        "getOrgData2",
        "headers"
      );
      setShifts([...detail.shifts]);
      toastOptions.success(response?.detail || "Shift Deleted successfully");
      setLoading(false);
      setValue("");
    } catch (error) {
      setLoading(false);
      setValue("");
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured while deletion"
      );
    } finally {
      setValue("");
      setLoading(false);
    }
  };

  // This function is responsible to delete the location
  const onLocationDelete = async (id) => {
    try {
      setLoading(true);
      const data = {
        id: id,
      };
      setValue(id); //to show loader nothing else this state for

      const response = await makeNetworkCall(data, "deleteLocation", "headers");
      const { detail } = await makeNetworkCall(
        { employeesSearch: "" },
        "getOrgData2",
        "headers"
      );
      setLocations([...detail.locations]);
      toastOptions.success(response?.detail || "Location Deleted successfully");
      setLoading(false);
      setValue("");
    } catch (error) {
      setLoading(false);
      setValue("");
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured while deletion"
      );
    } finally {
      setValue("");
      setLoading(false);
    }
  };
  // This function is responsible to delete the location
  const onEventDelete = async (id) => {
    try {
      setLoading(true);
      const data = {
        id: id,
      };
      setValue(id); //to show loader nothing else this state for
      const response = await makeNetworkCall(data, "deleteEvent", "headers");
      const { detail } = await makeNetworkCall(
        { employeesSearch: "" },
        "getOrgData2",
        "headers"
      );
      setEvents([...detail.events]);
      toastOptions.success(response?.detail || "Event Deleted successfully");
      setLoading(false);
      setValue("");
    } catch (error) {
      setLoading(false);
      setValue("");
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured while deletion"
      );
    } finally {
      setValue("");
      setLoading(false);
    }
  };

  // const onLeaveTypeDelete = async (id) => {
  //   try {
  //     setLoading(true);
  //     const data = {
  //       id: id,
  //     };
  //     setValue(id); //to show loader nothing else this state for
  //     const response = await makeNetworkCall(
  //       data,
  //       "deleteLeaveType",
  //       "headers"
  //     );
  //     const { detail } = await makeNetworkCall({}, "getOrgData1", "headers");
  //     setLeaveTypes([...detail.leaveTypes]);
  //     toastOptions.success(
  //       response?.detail || "Leave type Deleted successfully"
  //     );
  //     setLoading(false);
  //     setValue("");
  //   } catch (error) {
  //     setLoading(false);
  //     setValue("");
  //     toastOptions.error(
  //       error?.error?.response?.data?.detail || "Error Occured while deletion"
  //     );
  //   } finally {
  //     setValue("");
  //     setLoading(false);
  //   }
  // };

  const onFolderDelete = async (id) => {
    try {
      setLoading(true);
      const data = {
        id: id,
      };
      setValue(id); //to show loader nothing else this state for
      const response = await makeNetworkCall(data, "deleteFolder", "headers");
      const { detail } = await makeNetworkCall({}, "getAdminData1", "headers");

      console.log(detail, "details");
      setAdminFolders([...detail.foldersData]);
      toastOptions.success(response?.detail || "Folder Deleted successfully");
      setLoading(false);
      setValue("");
    } catch (error) {
      setLoading(false);
      setValue("");
      toastOptions.error(
        error?.error?.response?.data?.detail || "Error Occured while deletion"
      );
    } finally {
      setValue("");
      setLoading(false);
    }
  };

  return (
    <section className="roles-department">
      <div className="add-locations my-4 d-flex justify-content-between align-items-center">
        <h3
          style={{
            color: applicationColor.readColor1,
          }}
        >
          {selectedLocation?.location_name || ""}
        </h3>
        <div>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Locations
          </button>
          <ul className="dropdown-menu location-list dropdown-menu-end">
            {allLocations.map((location, location_id) => {
              return (
                <li key={location_id}>
                  <Link
                    className="dropdown-item"
                    href="!#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedLocation(location);
                    }}
                  >
                    {location.location_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ul
        className="nav nav-pills d-inline-flex px-3 flex-nowrap categorys rounded-3 py-2 default-shadow"
        id="pills-tab"
        role="tablist"
        style={{
          background: applicationColor.cardBg1,
          color: applicationColor.readColor1,
        }}
      >
        <li className="nav-item">
          <a
            className="nav-link active"
            id="admin-roles-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#admin-roles"
            aria-controls="admin-roles"
            aria-selected="true"
          >
            Roles
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="departments-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#departments"
            aria-controls="departments"
            aria-selected="false"
          >
            Departments
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="designations-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#designations"
            aria-controls="designations"
            aria-selected="false"
          >
            Designations
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="shifts-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#shifts"
            aria-controls="shifts"
            aria-selected="false"
          >
            Shifts
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="shifts-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#Leaves"
            aria-controls="shifts"
            aria-selected="false"
          >
            Leaves
          </a>
        </li>
        <a
          className="nav-link"
          id="shifts-tab"
          data-bs-toggle="pill"
          role="tab"
          href="#AdminControles"
          aria-controls="shifts"
          aria-selected="false"
        >
          Admin Controls
        </a>
        <li className="nav-item">
          <a
            className="nav-link"
            id="events-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#events"
            aria-controls="events"
            aria-selected="false"
          >
            Events
          </a>
        </li>
        {/* <li className="nav-item">
          <a
            className="nav-link"
            id="leavestypes-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#leavestypes"
            aria-controls="leavestypes"
            aria-selected="false"
          >
            Leave Types
          </a>
        </li> */}
        <li className="nav-item">
          <a
            className="nav-link"
            id="folders-tab"
            data-bs-toggle="pill"
            role="tab"
            href="#folders"
            aria-controls="folders"
            aria-selected="false"
          >
            Folders
          </a>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="admin-roles"
          role="tabpanel"
          aria-labelledby="admin-roles-tab"
        >
          <RolesTable
            heading={"Roles"}
            data={selectedLocation?.roles}
            property1={"role_id"}
            property2={"role_name"}
            fields={["role_name"]}
            placeholders={["Role Name"]}
            types={["text"]}
            schema={roleSchema}
            onAdd={onRoleAdd}
            onDelete={onDeleteRole}
            value={value} // for deleting the specific item
            setValue={value} // for deleting the specific item
            edit={edit}
            setEdit={setEdit}
            options={["0", "1", "2", "3", "4", "5"]}
          />
        </div>
        <div
          className="tab-pane fade"
          id="departments"
          role="tabpanel"
          aria-labelledby="departments-tab"
        >
          <RolesTable
            heading={"Departments"}
            data={selectedLocation?.departments}
            property1={"department_id"}
            property2={"department_name"}
            fields={["department_name"]}
            placeholders={["Department Name"]}
            types={["text"]}
            schema={departementSchema}
            onAdd={onDepartmentAdd}
            onDelete={onDeleteDepartment}
            value={value}
            setValue={value}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
        <div
          className="tab-pane fade"
          id="designations"
          role="tabpanel"
          aria-labelledby="designations-tab"
        >
          <RolesTable
            heading={"Designations"}
            data={selectedLocation?.designations}
            property1={"designation_id"}
            property2={"designation_name"}
            fields={["designation_name"]}
            placeholders={["Designation Name"]}
            types={["text"]}
            schema={designationSchema}
            onAdd={onDesignationAdd}
            onDelete={onDeleteDesignation}
            value={value}
            setValue={value}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
        <div
          className="tab-pane fade"
          id="shifts"
          role="tabpanel"
          aria-labelledby="shifts-tab"
        >
          <ShiftDetailsForm
            selectedLocation={selectedLocation}
            // heading={"Shifts"}
            // data={selectedLocation?.shifts}
            // property1={"shiftId"}
            // property2={"shift_name"}
            // fields={["shift_name", "checkin_time", "checkout_time", "grace_time"]}
            // placeholders={[
            //   "Shift Name",
            //   "checkin_time",
            //   "checkout_time",
            //   "grace_time",
            // ]}
            // types={["text", "time", "time", "tel"]}
            // schema={shiftsSchema}
            // onAdd={onShiftAdd}
            // onDelete={onShiftDelete}
            // value={value}
            // setValue={value}
            // edit={edit}
            // setEdit={setEdit}
          />
        </div>
        <div
          className="tab-pane fade"
          id="Leaves"
          role="tabpanel"
          aria-labelledby="shifts-tab"
        >
          <LeavesSettings selectedLocation={selectedLocation} />
        </div>
        <div
          className="tab-pane fade"
          id="AdminControles"
          role="tabpanel"
          aria-labelledby="shifts-tab"
        >
          <AdminControlesUserDetails selectedLocation={selectedLocation} />
        </div>

        {/* <div
          className="tab-pane fade"
          id=" AdminControles"
          role="tabpanel"
          aria-labelledby="shifts-tab"
        >
          <AdminControlesUserDetails
            selectedLocation={selectedLocation}

          />

        </div> */}
        <div
          className="tab-pane fade"
          id="events"
          role="tabpanel"
          aria-labelledby="events-tab"
        >
          <RolesTable
            heading={"Events"}
            data={events}
            property1={"eventId"}
            property2={"eventName"}
            fields={[
              "eventName",
              "fromDate",
              "toDate",
              "fromTime",
              "toTime",
              "dayType",
              "isHoliday",
            ]}
            placeholders={[
              "Event Name",
              "From Date",
              "To Date",
              "From Time",
              "To Time",
              "Day Type",
              "Is Holiday",
            ]}
            types={[
              "text",
              "date",
              "date",
              "time",
              "time",
              "select",
              "checkbox",
            ]}
            schema={eventsSchema}
            onAdd={onEventAdd}
            onDelete={onEventDelete}
            value={value}
            setValue={value}
            edit={edit}
            setEdit={setEdit}
            options={["Half", "Full"]}
          />
        </div>
        {/* <div
          className="tab-pane fade"
          id="leavestypes"
          role="tabpanel"
          aria-labelledby="leavestypes-tab"
        >
          <RolesTable
            heading={"LeaveTypes"}
            data={leaveTypes}
            property1={"leaveTypeId"}
            property2={"leaveType"}
            fields={["leaveType", "maxLeaves"]}
            placeholders={["Leave Type", "Max Leaves"]}
            types={["text", "tel"]}
            schema={leaveTypeSchema}
            onAdd={onLeaveTypeAdd}
            onDelete={onLeaveTypeDelete}
            value={value}
            setValue={value}
            edit={edit}
            setEdit={setEdit}
          />
        </div> */}
        <div
          className="tab-pane fade"
          id="folders"
          role="tabpanel"
          aria-labelledby="folders-tab"
        >
          {/* <RolesTable
            heading={"Folders"}
            data={adminFolders}
            property1={"folderId"}
            property2={"folderName"}
            fields={["folderName"]}
            placeholders={["Folder Name"]}
            types={["text"]}
            schema={folderSchema}
            onAdd={onFolderAdd}
            onDelete={onFolderDelete}
            value={value}
            setValue={value}
            edit={edit}
            setEdit={setEdit}
          /> */}
          <FileUploadForm selectedLocation={selectedLocation} />
        </div>
      </div>
    </section>
  );
};

export default Roles;

// "eventName": "Bakrid1",
// "fromDate": "2024-04-17",
// "toDate": "2024-04-17",
// "fromTime": "12:00", --> allowing ""
// "toTime": "07:00", --> allowing ""
// "dayType": "Half", --> allowing ""
// "isHoliday": true
