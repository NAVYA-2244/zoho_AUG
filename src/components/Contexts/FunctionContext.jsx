import { createContext, useContext, useState } from "react";
import Joi from "joi";
import { useStateContext } from "./StateContext";
import { makeNetworkCall } from "../../HttpServices/HttpService";
const FunctionContext = createContext();
export const FunctionContextProvider = ({ children }) => {
  const {
    setErrors,
    refs,
    setLocation,
    setEventData,
    setCheckInModal,
    employeeDetails,
  } = useStateContext();
  //  const navigate= useNavigate()
  const handleChange = (e, schema, setForm, index = null, fieldName = null) => {
    console.log("hiiiiiiiiii")
    const { name, type, checked, id } = e.target;
    let value = e.target.value;
    let max = schema?._rules[1]?.args?.limit || 200;
    if (type === "checkbox") {
      value = checked;
    }
    if (value.length > max && type !== "file") {
      return;
    }
    // if ((type === "textarea" || type === "email") && id !== "password") {
    //   value = value.replace(/[^A-Za-z0-9@.\s-]/g, "");
    // }
    if (type === "textarea" && id !== "password") {
      // For textarea: Allow alphanumeric characters, spaces, dots, commas, and hyphens
      value = value.replace(/[^A-Za-z0-9.,\s-]/g, "");
    } else if (type === "email" && id !== "password") {
      // For email: Allow alphanumeric characters, @, ., -, and _
      value = value.replace(/[^A-Za-z0-9@._-]/g, "");
    }
    
    
    // if (
    //   type === "text" &&
    //   name !== "uan" &&
    //   name !== "pan" &&
    //   name !== "longitude" &&
    //   name !== "latitude" &&
    //   name !== "employee_id" &&
    //   id !== "password"
    // ) {
    //   value = value.replace(/[^A-Za-z" "]/g, "");
    // }
    if (type === "text" && id !== "password") {
      if (name === "pan") {
        // Allow only uppercase letters and numbers for "pan" field
        value = value.replace(/[^A-Z0-9]/g, "");
      }
      
      if (name === "organisation_name") {
        // Allow both uppercase, lowercase letters, and numbers for "company name" field
        value = value.replace(/[^a-zA-Z0-9]/g, "");
      }
      if (name === "company_name") {
        // Allow both uppercase, lowercase letters, and numbers for "company name" field
        value = value.replace(/[^a-zA-Z0-9]/g, "");
      }
      
       else if (
        name !== "uan" &&
        name !== "longitude" &&
        name !== "latitude" &&
        name !== "employee_id"
      ) {
        // Allow only alphabetic characters and spaces for other text fields
        value = value.replace(/[^A-Za-z\s]/g, "");
      }
    }
    
    if (type === "text" && name === "employee_id") {
      value = value.replace(/[^A-Za-z0-9]/g, "");
    }
    if (
      (type === "text" && name === "uan") ||
      (type === "text" && name === "pan")
    ) {
      value = value.replace(/[^A-Za-z0-9]/g, "");
    }
    if (name === "taskName" && type === "textarea") {
      value = value.replace(/[^A-Za-z0-9&,\/\s-]/g, "");
    }
    if (type === "tel") {
      value = value.replace(/[^\d]/g, "");
    }

    setForm((prevForm) => {
      let newForm = { ...prevForm };
      if (index !== null && fieldName) {
        newForm[fieldName][index][name] = value;
      } else {
        newForm[name] = value;
      }
      return newForm;
    });
    let errormessage = schema?.validate(value)?.error?.message;
    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
      if (index !== null && fieldName) {
        if (!newErrors[fieldName]) newErrors[fieldName] = [];
        newErrors[fieldName][index] = {
          ...newErrors[fieldName][index],
          [name]: errormessage,
        };
      } else {
        newErrors[name] = errormessage;
      }
      return newErrors;
    });
  };

  const checkErrors = async (schema, formData) => {
    console.log("hello")
    const mainSchema = Joi.object(schema);
    // console.log(mainSchema, "mainschema")
    const { error } = mainSchema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        if (Array.isArray(detail.path) && detail.path.length > 1) {
          let current = newErrors;
          detail.path.forEach((key, index) => {
            if (index === detail.path.length - 1) {
              current[key] = detail.message;
            } else {
              if (!current[key]) {
                current[key] = Number.isInteger(detail.path[index + 1])
                  ? []
                  : {};
              }
              current = current[key];
            }
          });
        } else {
          newErrors[detail.path[0]] = detail.message;
        }
      });
      setErrors(newErrors);
      // Scroll to the first error element if possible
      const firstError = error.details[0].path[0];
      if (refs.current[firstError]) {
        setTimeout(() => {
          refs.current[firstError].scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
      return Promise.reject(error.details);
    }

    setErrors({});
    return Promise.resolve([]);
  };

  const updateWidth = async (setWidth, ref) => {
    setWidth(ref.current.clientWidth);
  };
  // Function to trigger the map when needed
  const handleShowLocation = (item, type) => {
    console.log(item, type);
    if (type === "Check In Location") {
      let lat = item.checkIn.latitude;
      let lng = item.checkIn.longitude;
      setLocation({ lat, lng });
    } else {
      let lat = item.checkOut.latitude;
      let lng = item.checkOut.longitude;
      setLocation({ lat, lng });
    }
  };
  //It Opens the Modal and shwo the check in , checkout time to the user
  const handleSelectEvent = (event) => {
    setEventData(event);
    setCheckInModal(true);
  };

  // console.log(employeeDetails);

  const employeeTypeCheck = () => {
    let employeeType;
    if (employeeDetails.collection === "USER") {
      employeeType = true;
    } else {
      employeeType = false;
    }
    return employeeType;
  };

  const [mainAdmin, setMainAdmin] = useState(employeeTypeCheck());

  const checkingDataThere = async (data, navigate) => {
    console.log(data, "data");

    // Check if either condition is not met
    if (!data?.images?.logo) {
      setTimeout(() => {
        navigate("/admin/company");
      }, 0);
    } else if (data?.locations.length === 0) {
      setTimeout(() => {
        navigate("/company");
      }, 0);
    }
  };

  return (
    <FunctionContext.Provider
      value={{
        handleChange,
        checkErrors,
        updateWidth,
        handleShowLocation,
        handleSelectEvent,
        employeeTypeCheck,
        mainAdmin,
        setMainAdmin,
        checkingDataThere,
      }}
    >
      {children}
    </FunctionContext.Provider>
  );
};
export const useFunctionContext = () => {
  return useContext(FunctionContext);
};
