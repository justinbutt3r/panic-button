import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const InputArea = ({
  field,
  autoComplete,
  placeholder,
  type,
  form: { errors, touched, values },
}) => {
  return (
    <div
      className={`input-area ${
        errors[field.name] && touched[field.name] ? "error" : ""
      }`}
    >
      <label htmlFor={field.name}>{field.name}</label>
      <textarea
        {...field}
        autoComplete={autoComplete}
        id={field.name}
        placeholder={" "}
      />
      {errors[field.name] && touched[field.name] && (
        <span>{errors[field.name]}</span>
      )}
    </div>
  );
};

InputArea.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

InputArea.defaultProps = {
  type: "text",
};

export default InputArea;
