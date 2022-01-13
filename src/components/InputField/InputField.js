import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const InputField = ({
  field,
  autoComplete,
  placeholder,
  type,
  form: { errors, touched, values },
}) => {
  return (
    <div
      className={`input-field ${
        errors[field.name] && touched[field.name] ? "error" : ""
      }`}
    >
      <label htmlFor={field.name}>{placeholder}</label>
      <input
        {...field}
        autoComplete={autoComplete}
        id={field.name}
        type={type}
        placeholder={placeholder}
      />
      {errors[field.name] && touched[field.name] && (
        <span>{errors[field.name]}</span>
      )}
    </div>
  );
};

InputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
};

export default InputField;
