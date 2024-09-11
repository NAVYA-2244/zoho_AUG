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

    const { name, type, checked, id, value: inputValue } = e.target;
    console.log(inputValue,'inputValue')
    let value = inputValue;

    // Define max length based on schema
    let max = schema?._rules?.[1]?.args?.limit || 200;

    // Handle checkbox inputs
    if (type === "checkbox") value = checked;

    // Ensure value doesn't exceed max length (except file type)
    if (value.length > max && type !== "file") return;

    // Handle input sanitization based on field type
    switch (type) {
      case "textarea":
        if (id !== "password") {
          value = value.replace(/[^A-Za-z0-9.,\s\-\\/]/g, ""); // Only allow specific characters
        }
        break;
      case "email":
        if (id !== "password") {
          value = value.replace(/[^A-Za-z0-9@._-]/g, ""); // Allow alphanumeric, @, ., -, and _
        }
        break;
      case "text":
        if (id !== "password") {
          if (name === "organisation_name") {
            value = value.replace(/[^a-zA-Z0-9,. ]/g, "");
          } else if (
            ["company_name", "experience", "expertise"].includes(name)
          ) {
            value = value.replace(/[^A-Za-z0-9.\s,]/g, "");
          } else if (["employee_id"].includes(name)) {
            value = value.replace(/[^A-Z0-9]/g, "").toUpperCase();
          } else if (["degree"].includes(name)) {
            value = value.replace(/[^A-Za-z0-9\s\W]/g, "");
          } else if (["institute_name"].includes(name)) {
            value = value.replace(/[^A-Za-z0-9\s,-]/g, "");
          } else if (
            [
              "pan",
              "passport_number",
              "seating_location",

              "company_name",
              "uan",
            ].includes(name)
          ) {
            value = value.replace(/[^A-Za-z0-9\s,-]/g, ""); // Alphanumeric for PAN and Passport
          } else if (
            !["uan", "longitude", "latitude", "employee_id"].includes(name)
          ) {
            value = value.replace(/[^A-Za-z\s]/g, ""); // Allow letters and spaces
            // Only letters and spaces for other fields
          }
        }
        break;
      case "tel":
        value = value.replace(/[^\d]/g, ""); // Allow only digits for telephone fields
        break;
      default:
        break;
    }

    // Update form state
    {
      console.log(setForm, "form");
    }
    setForm((prevForm) => {
      const newForm = { ...prevForm };
      if (index !== null && fieldName) {
        newForm[fieldName][index][name] = value;
      } else {
        newForm[name] = value;
      }
      return newForm;
    });

    // Validate the field using Joi schema
    const errorMessage = schema?.validate(value)?.error?.message || "";

    // Update errors state
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (index !== null && fieldName) {
        if (!newErrors[fieldName]) newErrors[fieldName] = [];
        newErrors[fieldName][index] = {
          ...newErrors[fieldName][index],
          [name]: errorMessage,
        };
      } else {
        newErrors[name] = errorMessage;
      }
      return newErrors;
    });
  };

  const checkErrors = async (schema, formData) => {
    console.log("hello");
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
