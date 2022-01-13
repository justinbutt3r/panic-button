import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "./styles.scss";

const InputField = ({
  field,
  autoComplete,
  placeholder,
  type,
  options,
  form: { errors, touched, values, setFieldValue, setFieldTouched },
}) => {
  const onChange = ({ value }) => {
    if (field.value === "" && value === "null") {
      return false;
    }

    if (field.value !== value) {
      setFieldValue(field.name, value);
    }
  };

  const customStyles = {
    valueContainer: (provided) => {
      return {
        ...provided,
        textAlign: "left",
        padding: "0.625em 1.25em",
        lineHeight: 1.25,
      };
    },
    control: (provided) => {
      return {
        ...provided,
        lineHeight: 1.25,
        border: `1px solid ${
          errors[field.name] && touched[field.name] ? "red" : "gray"
        }`,
      };
    },
    input: (provided) => {
      return {
        ...provided,
        lineHeight: 1.25,
        margin: 0,
      };
    },
  };

  return (
    <div
      className={`input-select ${
        errors[field.name] && touched[field.name] ? "error" : ""
      }`}
    >
      <label htmlFor={field.name}>{field.name}</label>
      <Select
        value={options.find((option) => option.value === field.value) || ""}
        styles={customStyles}
        onChange={onChange}
        onBlur={() => setFieldTouched(field.name, true)}
        options={options}
        name={field.name}
        isClearable
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
