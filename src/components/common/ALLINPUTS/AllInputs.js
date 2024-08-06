import React, { useRef, useState } from "react";
import "./AllInputs.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useStateContext } from "../../Contexts/StateContext";
import { useFunctionContext } from "../../Contexts/FunctionContext";
import { format, parseISO, isValid, parse } from "date-fns";
import { useThemeContext } from "../../Contexts/ThemesContext";
import imageCompression from "browser-image-compression";
import { PDFDocument } from "pdf-lib";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";

export function Input_password({
  id,
  name,
  placeholder,
  value,
  setForm,
  schema,
  imp,
  readOnly,
  icon,
  inputRef,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { errors } = useStateContext();
  const { handleChange } = useFunctionContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
  const { applicationColor } = useThemeContext();

  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>{icon ? icon : "$"}</label>
          </div>
          <div className="input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              name={name}
              id={id}
              value={value}
              onChange={(e) => handleChange(e, schema, setForm)}
              readOnly={readOnly}
              ref={inputRef}
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}
            />

            <div className="eye" onClick={togglePasswordVisibility}>
              <span>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
            </div>
          </div>
        </div>
        {errors[name] && (
          <div className="error-message">
            <span> {errors[name]}</span>
            {/* <span className="exclamatory"></span> */}
          </div>
        )}
      </div>
    </>
  );
}

export function InputPassword({
  id,
  name,
  placeholder,
  value,
  setForm,
  schema,
  imp,
  readOnly,
  icon,
  inputRef,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { errors } = useStateContext();
  const { handleChange } = useFunctionContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
  const { applicationColor } = useThemeContext();

  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>{icon ? icon : "$"}</label>
          </div>
          <div className="input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              name={name}
              id={id}
              value={value}
              onChange={(e) => handleChange(e, schema, setForm)}
              readOnly={readOnly}
              ref={inputRef}
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}
            />

            <div className="eye" onClick={togglePasswordVisibility}>
              <span>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
            </div>
          </div>
        </div>
        {errors[name] && (
          <div className="error-message">
            <span> {errors[name]}</span>
            {/* <span className="exclamatory"></span> */}
          </div>
        )}
      </div>
    </>
  );
}

export function InputText({
  type,
  name,
  placeholder,
  value,
  setForm,
  schema,
  icon,
  imp,
  readOnly,
  inputRef,
  index = "",
  fieldName = "",
}) {
  const { errors } = useStateContext();
  const { handleChange } = useFunctionContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
  const { applicationColor } = useThemeContext();
  // const newErrors = flatternObject(errors);
  // console.log(errors, index, fieldName);
  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>{icon ? icon : "$"}</label>
          </div>
          <div className="input">
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={(e) =>
                handleChange(e, schema, setForm, index, fieldName)
              }
              readOnly={readOnly}
              ref={inputRef}
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}
            />
          </div>
        </div>
        {(errors[name] ||
          (errors?.[fieldName] &&
            errors?.[fieldName][index] &&
            errors?.[fieldName][index][name])) && (
          <div className="error-message">
            <span>{errors[name] || errors?.[fieldName][index][name]}</span>
          </div>
        )}
      </div>
    </>
  );
}

export function Input_text({
  type,
  name,
  placeholder,
  value,
  setForm,
  schema,
  icon,
  imp,
  readOnly,
  inputRef,
  index = "",
  fieldName = "",
}) {
  const { errors } = useStateContext();
  const { handleChange } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;

  const handleInputChange = (e) => {
    handleChange(e, schema, setForm, index, fieldName);
  };

  const error =
    errors[name] || (errors?.[fieldName] && errors?.[fieldName][index]?.[name]);

  return (
    <div className="total-form">
      <div className="main_label">
        <label
          htmlFor={name}
          style={{
            color: applicationColor.readColor2,
          }}
        >
          {imp ? (
            <>
              {placeholder}
              <sup style={{ color: "red" }}> *</sup>
            </>
          ) : (
            placeholder
          )}
        </label>
      </div>
      <div className="main-input">
        <div className="icon-prefix">
          <label htmlFor={name}>{icon ? icon : "$"}</label>
        </div>
        <div className="input">
          <input
            type={type}
            id={name}
            name={name}
            placeholder={computedPlaceholder}
            value={value || ""}
            onChange={handleInputChange}
            readOnly={readOnly}
            ref={inputRef}
            style={{
              background: applicationColor.cardBg2,
              color: applicationColor.readColor1,
            }}
          />
        </div>
      </div>
      {error && (
        <div className="error-message">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// export function Input_text({
//   type,
//   name,
//   placeholder,
//   value,
//   setForm,
//   schema,
//   icon,
//   imp,
//   readOnly,
//   inputRef,
//   index = "",
//   fieldName = "",
// }) {
//   const { errors } = useStateContext();
//   const { handleChange } = useFunctionContext();
//   const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
//   const { applicationColor } = useThemeContext();
//   // const newErrors = flatternObject(errors);
//   // console.log(errors, index, fieldName);
//   return (
//     <>
//       <div className="total-form">
//         <div className="main_label">
//           <label
//             htmlFor={name}
//             style={{
//               color: applicationColor.readColor2,
//             }}
//           >
//             {imp ? (
//               <>
//                 {placeholder}
//                 <sup style={{ color: "red" }}> *</sup>
//               </>
//             ) : (
//               placeholder
//             )}
//           </label>
//         </div>
//         <div className="main-input">
//           <div className="icon-prefix">
//             <label htmlFor={name}>{icon ? icon : "$"}</label>
//           </div>
//           <div className="input">
//             <input
//               type={type}
//               id={name}
//               name={name}
//               placeholder={placeholder}
//               value={value}
//               onChange={(e) =>
//                 handleChange(e, schema, setForm, index, fieldName)
//               }
//               readOnly={readOnly}
//               ref={inputRef}
//               style={{
//                 background: applicationColor.cardBg2,
//                 color: applicationColor.readColor1,
//               }}
//             />
//           </div>
//         </div>
//         {(errors[name] ||
//           (errors?.[fieldName] &&
//             errors?.[fieldName][index] &&
//             errors?.[fieldName][index][name])) && (
//             <div className="error-message">
//               <span>{errors[name] || errors?.[fieldName][index][name]}</span>
//             </div>
//           )}
//       </div>
//     </>
//   );
// }

export function Input_area({
  name,
  placeholder,
  value,
  setForm,
  schema,
  icon,
  imp,
  length,
  readOnly,
  inputRef,
  index = "",
  fieldName = "",
}) {
  const { errors } = useStateContext();
  const { handleChange } = useFunctionContext();

  const { applicationColor } = useThemeContext();

  return (
    <>
      <div className="total-form">
        <div className="main_label main-labels">
          <label
            htmlFor={name}
            className="main-labels"
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                <span>
                  {" "}
                  {placeholder} <sup style={{ color: "red" }}> *</sup>
                </span>
                <span>{/* {`${length} / ${value.length}`} */}</span>
              </>
            ) : (
              <>
                <span> {placeholder} </span>
                <span>{/* {`${length} / ${value.length}`} */}</span>
              </>
            )}
          </label>
        </div>
        <div className="main-area">
          {/* <div className="length">
            <label>{value.length}/250</label>
          </div> */}
          <div className="input">
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={(e) =>
                handleChange(e, schema, setForm, index, fieldName)
              }
              maxLength={length}
              readOnly={readOnly}
              ref={inputRef}
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}
            />
          </div>
        </div>
        {(errors[name] ||
          (errors?.[fieldName] &&
            errors?.[fieldName][index] &&
            errors?.[fieldName][index][name])) && (
          <div className="error-message">
            <span>{errors[name] || errors?.[fieldName][index][name]}</span>
          </div>
        )}
      </div>
    </>
  );
}

export function InputEmail({
  type,
  name,
  id,
  placeholder,
  value,
  setForm,
  schema,
  imp,
  readOnly,
  icon,
  inputRef,
}) {
  const { errors } = useStateContext();
  const { handleChange } = useFunctionContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
  const { applicationColor } = useThemeContext();

  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>{icon}</label>
          </div>
          <div className="input">
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleChange(e, schema, setForm)}
              readOnly={readOnly}
              ref={inputRef}
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}

              //        onChange={(e) => handleChange(e, schema, setForm)}
            />
          </div>
        </div>
        {errors[name] && (
          <div className="error-message">
            <span>{errors[name]} </span>
            {/* <span className="exclamatory"></span> */}
          </div>
        )}
      </div>
    </>
  );
}

// export function Input_email({
//   type,
//   name,
//   id,
//   placeholder,
//   value,
//   setForm,
//   schema,
//   imp,
//   readOnly,
//   icon,
//   inputRef,
// }) {
//   const { errors } = useStateContext();
//   const { handleChange } = useFunctionContext();
//   const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
//   const { applicationColor } = useThemeContext();

//   return (
//     <>
//       <div className="total-form">
//         <div className="main_label">
//           <label
//             htmlFor={name}
//             style={{
//               color: applicationColor.readColor2,
//             }}
//           >
//             {imp ? (
//               <>
//                 {placeholder}
//                 <sup style={{ color: "red" }}> *</sup>
//               </>
//             ) : (
//               placeholder
//             )}
//           </label>
//         </div>
//         <div className="main-input">
//           <div className="icon-prefix">
//             <label htmlFor={name}>{icon}</label>
//           </div>
//           <div className="input">
//             <input
//               type={type}
//               id={name}
//               name={name}
//               placeholder={placeholder}
//               value={value}
//               onChange={(e) => handleChange(e, schema, setForm)}
//               readOnly={readOnly}
//               ref={inputRef}
//               style={{
//                 background: applicationColor.cardBg2,
//                 color: applicationColor.readColor1,
//               }}

//             //        onChange={(e) => handleChange(e, schema, setForm)}
//             />
//           </div>
//         </div>
//         {errors[name] && (
//           <div className="error-message">
//             <span>{errors[name]} </span>
//             {/* <span className="exclamatory"></span> */}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
export function Input_email({
  type = "email",
  name,
  id,
  placeholder,
  value,
  setForm,
  schema,
  imp,
  readOnly,
  icon,
  inputRef,
}) {
  const { errors } = useStateContext();
  const { handleChange } = useFunctionContext();
  const { applicationColor } = useThemeContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;

  return (
    <div className="total-form">
      <div className="main_label">
        <label htmlFor={name} style={{ color: applicationColor.readColor2 }}>
          {imp ? (
            <>
              {placeholder}
              <sup style={{ color: "red" }}> *</sup>
            </>
          ) : (
            placeholder
          )}
        </label>
      </div>
      <div className="main-input">
        <div className="icon-prefix">
          <label htmlFor={name}>{icon}</label>
        </div>
        <div className="input">
          <input
            type={type}
            id={id || name}
            name={name}
            placeholder={computedPlaceholder}
            value={value}
            onChange={(e) => handleChange(e, schema, setForm)}
            readOnly={readOnly}
            ref={inputRef}
            style={{
              background: applicationColor.cardBg2,
              color: applicationColor.readColor1,
            }}
          />
        </div>
      </div>
      {errors[name] && (
        <div className="error-message">
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );
}
export function Input_checkBox({
  name,
  placeholder,
  setForm,
  checked,
  schema,
  imp = false,
  readOnly = false,
  icon,
  inputRef,
}) {
  const { errors } = useStateContext();
  const { handleChange } = useFunctionContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
  const { applicationColor } = useThemeContext();

  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>

        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>{icon}</label>
          </div>
          <div className="input">
            {console.log(checked, "checked")}
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={checked}
              onChange={(e) => handleChange(e, schema, setForm)}
              readOnly={readOnly}
              ref={inputRef}
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}
            />
          </div>
        </div>
        {errors[name] && (
          <div className="error-message">
            <span>{errors[name]} </span>
            {/* <span className="exclamatory"></span> */}
          </div>
        )}
      </div>
    </>
  );
}

export function SelectInputs({
  placeholder,
  name,
  value,
  schema,
  setForm,
  options,
  property,
  valueProperty,
  readOnly,
  imp,
  inputRef,
}) {
  const { errors } = useStateContext();
  const { applicationColor } = useThemeContext();

  const { handleChange } = useFunctionContext();
  return (
    <>
      <div className="total-form mb-4">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>$</label>
          </div>
          <div className="input custom-select">
            <select
              name={name}
              id={name}
              onChange={(e) => handleChange(e, schema, setForm)}
              value={value || undefined}
              // className={value ? 'showw' : 'dim'}

              ref={inputRef}
              style={{
                background: applicationColor.cardBg2,
                color: value
                  ? applicationColor.readColor1
                  : applicationColor.readColor2,
                textTransform: "none",
              }}
              placeholder={"-- select --"}
              disabled={readOnly}
            >
              <option value="" hidden>
                -- select --
              </option>
              {options &&
                options.map((option, index) => (
                  <option
                    value={
                      option[valueProperty] ? option[valueProperty] : option
                    }
                    style={{ padding: "5px", margin: "10px 0" }}
                    key={index}
                  >
                    {property ? option[property] : option}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {errors[name] && (
          <div className="error-message">
            <span>{errors[name]} </span>
            {/* <span className="exclamatory"></span> */}
          </div>
        )}
      </div>
    </>
  );
}

export function Select_inputs({
  placeholder,
  name,
  value,
  schema,
  setForm,
  options,
  property,
  valueProperty,
  readOnly,
  imp,
  inputRef,
}) {
  const { errors } = useStateContext();
  const { applicationColor } = useThemeContext();
  const { handleChange } = useFunctionContext();
  return (
    <>
      <div className="total-form mb-4">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>$</label>
          </div>
          <div className="input custom-select">
            <select
              name={name}
              id={name}
              onChange={(e) => handleChange(e, schema, setForm)}
              value={value || undefined}
              // className={value ? 'showw' : 'dim'}

              ref={inputRef}
              style={{
                background: applicationColor.cardBg2,
                color: value
                  ? applicationColor.readColor1
                  : applicationColor.readColor2,
                textTransform: "none",
              }}
              placeholder={"-- select --"}
              disabled={readOnly}
            >
              <option value="" hidden>
                -- select --
              </option>
              {options &&
                options.map((option, index) => (
                  <option
                    value={
                      option[valueProperty] ? option[valueProperty] : option
                    }
                    style={{ padding: "5px", margin: "10px 0" }}
                    key={index}
                  >
                    {property ? option[property] : option}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {errors[name] && (
          <div className="error-message">
            <span>{errors[name]} </span>
            {/* <span className="exclamatory"></span> */}
          </div>
        )}
      </div>
    </>
  );
}

export function Date_Input({
  type,
  name,
  placeholder,
  value,
  setForm,
  schema,
  readOnly,
  imp,
  inputRef,
  index,
  fieldName,
  min,
  max,
}) {
  const { errors } = useStateContext();
  const { applicationColor } = useThemeContext();
  const { handleChange } = useFunctionContext();
  const dateInputRef = useRef(null);

  const dateValue = value ? parseISO(value) : null;

  const formatedDate = isValid(dateValue)
    ? format(new Date(dateValue), "yyyy-MM-dd")
    : "";

  const handleClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="icon-prefix ">
            <label htmlFor={name}>$</label>
          </div>
          <div
            className="input date-input"
            style={{
              color: applicationColor.readColor2,
              background: applicationColor.cardBg2,
            }}
          >
            <input
              type="date"
              // onFocus={handleFocus}
              id={name}
              name={name}
              placeholder={placeholder}
              value={formatedDate}
              min={min}
              max={max}
              onChange={(e) =>
                handleChange(e, schema, setForm, index, fieldName)
              }
              readOnly={readOnly}
              className=" custom-date-input"
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor2,
              }}
              ref={dateInputRef}
              onClick={handleClick}
            />
            <span className="custom-calendar-icon" onClick={handleClick}>
              <IoCalendarNumberSharp />
            </span>
          </div>
        </div>
        {(errors[name] ||
          (errors?.[fieldName] &&
            errors?.[fieldName][index] &&
            errors?.[fieldName][index][name])) && (
          <div className="error-message">
            <span>{errors[name] || errors?.[fieldName][index][name]}</span>
          </div>
        )}
      </div>
    </>
  );
}

export function Time_Input({
  type,
  name,
  placeholder,
  value,
  setForm,
  schema,
  readOnly,
  imp,
  inputRef,
}) {
  const { errors } = useStateContext();
  const { applicationColor } = useThemeContext();
  const { handleChange } = useFunctionContext();
  const timeInputref = useRef(null);

  // Convert the time value to "HH:mm" format for the time input
  // const formattedTime = value
  //   ? format(parse(value, 'hh:mm a', new Date()), 'HH:mm')
  //   : '';

  const handleTimeChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue, "value");
    // Handle manual input by checking if the entered value is a valid time
    // if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(inputValue)) {
    //   const formattedValue = format(
    //     parse(inputValue, 'HH:mm', new Date()),
    //     'hh:mm a'
    //   );
    handleChange({ target: { name, value: inputValue } }, schema, setForm);
    // }
  };

  const handleClick = () => {
    if (timeInputref.current) {
      timeInputref.current.showPicker();
    }
  };

  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>$</label>
          </div>
          <div
            className="input time-input"
            style={{
              color: applicationColor.readColor2,
              background: applicationColor.cardBg2,
            }}
          >
            <input
              type="time"
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handleTimeChange}
              readOnly={readOnly}
              className="custom-time-input"
              style={{
                background: applicationColor.cardBg2,
                color: applicationColor.readColor1,
              }}
              ref={timeInputref}
              onClick={handleClick}
            />
            <span className="custom-time-icon" onClick={handleClick}>
              <MdAccessTimeFilled />
            </span>
          </div>
        </div>
        {errors[name] && (
          <div className="error-message">
            <span>{errors[name]} </span>
          </div>
        )}
      </div>
    </>
  );
}

export const ImageInput = ({
  name,
  placeholder,
  value,
  setForm,
  schema,
  inputRef,
}) => {
  const { handleChange } = useFunctionContext();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        `Compressed file size: ${(compressedFile.size / (1024 * 1024)).toFixed(
          2
        )} MB`
      );
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        const event = {
          target: {
            name: name,
            value: base64data,
            type: "file",
          },
        };
        handleChange(event, schema, setForm);
      };
    } catch (error) {
      console.error("Error compressing the image:", error);
    }
  };

  return (
    <div className="input">
      <input
        type="file"
        id={name}
        name={name}
        placeholder={placeholder}
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        ref={inputRef}
      />
    </div>
  );
};

export const PDFInput = ({
  name,
  placeholder,
  value,
  setForm,
  schema,
  inputRef,
  imp,
  // value
}) => {
  const { handleChange } = useFunctionContext();
  const { errors } = useStateContext();
  const { applicationColor } = useThemeContext();

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      let pdfDoc = await PDFDocument.load(await file.arrayBuffer());

      let pdfBytes;
      let compressedFile;

      // Compress the PDF repeatedly until it is under 2MB
      do {
        pdfBytes = await pdfDoc.save({ useObjectStreams: false });
        compressedFile = new Blob([pdfBytes], { type: "application/pdf" });

        if (compressedFile.size > 2 * 1024 * 1024) {
          pdfDoc = await PDFDocument.load(await compressedFile.arrayBuffer());
        }
      } while (compressedFile.size > 2 * 1024 * 1024);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        const event = {
          target: {
            name: name,
            value: base64data,
            type: "file",
          },
        };
        handleChange(event, schema, setForm);
      };

      console.log(
        `Compressed file size: ${(compressedFile.size / (1024 * 1024)).toFixed(
          2
        )} MB`
      );
    } catch (error) {
      console.error("Error compressing the PDF:", error);
    }
  };

  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>
        <div className="main-input">
          <div className="input">
            <input
              type="file"
              id={name}
              name={name}
              placeholder={placeholder}
              accept="application/pdf"
              onChange={handlePDFUpload}
              ref={inputRef}
              schema={schema}
              // value={value}
            />
          </div>
        </div>
        {errors[name] && (
          <div className="error-message">
            <span> {errors[name]}</span>
            {/* <span className="exclamatory"></span> */}
          </div>
        )}
      </div>
    </>
  );
};

/*


export function Select_input({
  placeholder,
  name,
  value,
  schema,
  setForm,
  options,
  property,
  valueProperty,
  imp,
  readOnly,
  inputRef,
}) {
  const { errors } = useStateContext();
  const { applicationColor } = useThemeContext();
  const { handleChange } = useFunctionContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
  return (
    <>
      <div className="total-form">
        <div className="main_label">
          <label
            htmlFor={name}
            style={{
              color: applicationColor.readColor2,
            }}
          >
            {imp ? (
              <>
                {placeholder}
                <sup style={{ color: "red" }}> *</sup>
              </>
            ) : (
              placeholder
            )}
          </label>
        </div>

        <div className="main-input">
          <div className="icon-prefix">
            <label htmlFor={name}>$</label>
          </div>
          <Select
            value={value || undefined}
            disabled={readOnly}
            placeholder={`Select ${placeholder} `}
            onChange={(value) =>
              handleChange({ target: { name, value } }, schema, setForm)
            }
            className="custom_select"
            id={name}
            name={name}
          >
            {options.map((option, index) => {
              return (
                <Option
                  value={option[valueProperty] ? option[valueProperty] : option}
                  className="option"
                  key={index}
                >
                  {property ? option[property] : option}
                </Option>
              );
            })}
          </Select>
        </div>

        {errors[name] && (
          <div className="error-message">
            <span>{errors[name]} </span>
            
            </div>
            )}
          </div>
        </>
      );
    }

*/
