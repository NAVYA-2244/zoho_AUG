import { useState } from "react";
import { useStateContext } from "../../Contexts/StateContext";
import { useThemeContext } from "../../Contexts/ThemesContext";
import { parseISO, format, isValid, isBefore } from "date-fns";
export const Input_text = ({
  type,
  name,
  placeholder,
  value,
  setForm,
  schema,
  imp,
  icon,
  inputRef,
  readOnly,
}) => {
  const { errors } = useStateContext();
  const computedPlaceholder = imp ? `${placeholder} *` : placeholder;
  const { applicationColor } = useThemeContext();
  const handleChange = (e) => {
    setForm(name, e.target.value);
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
            <label htmlFor={name}>{icon ? icon : "$"}</label>
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
            />
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
};
export const Date_Input = ({
  type,
  name,
  placeholder,
  value,
  setForm,
  schema,
  readOnly,
  imp,
  inputRef,
}) => {
  const { errors, setErrors } = useStateContext(); // Assuming setErrors is available from context
  const { applicationColor } = useThemeContext();
  const [inputError, setInputError] = useState(""); // Local state for input error

  const dateValue = value ? parseISO(value) : null;
  const formatedDate = isValid(dateValue)
    ? format(new Date(dateValue), "yyyy-MM-dd")
    : "";

  const handleFocus = (e) => {
    console.log(e);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setForm(name, newValue);

    // Validation logic
    const date = parseISO(newValue);
    if (!isValid(date)) {
      setInputError("Invalid date format.");
    } else if (isBefore(date, new Date())) {
      setInputError("Date cannot be in the past.");
    } else {
      setInputError("");
    }
  };
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
          <label htmlFor={name}>$</label>
        </div>
        <div className="input">
          <input
            type="date"
            onFocus={handleFocus}
            id={name}
            name={name}
            placeholder={placeholder}
            value={formatedDate}
            onChange={(e) => handleChange(e, schema, setForm)}
            readOnly={readOnly}
            className="custom-date-input"
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
        </div>
      )}
    </div>
  );
};
export const Input_area = ({
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
}) => {
  const { errors } = useStateContext();
  //  const { handleChange } = useFunctionContext();
  const { applicationColor } = useThemeContext();

  const handleChange = (e) => {
    setForm(name, e.target.value);
  };

  return (
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
              <span>
                {" "}
                {value.length} / {length}{" "}
              </span>
            </>
          ) : (
            <>
              <span> {placeholder} </span>
              <span>
                {" "}
                {value.length} / {length}{" "}
              </span>
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
            onChange={(e) => handleChange(e, schema, setForm)}
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
      {errors[name] && (
        <div className="error-message">
          <span>{errors[name]} </span>
        </div>
      )}
    </div>
  );
};
