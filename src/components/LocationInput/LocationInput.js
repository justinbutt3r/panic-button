import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Geosuggest from "react-geosuggest";

// import {  } from "react-leaflet";

const LocationInput = ({
  field,
  autoComplete,
  placeholder,
  type,
  form: { errors, touched, values, setFieldValue, setFieldTouched },
}) => {
  const geosuggestEl = useRef(null);
  const onChange = (values) => {};

  useEffect(() => {
    if (field.value === "") {
      geosuggestEl.current.clear();
      setFieldTouched(field.name, false);
    }
  }, [field.value]);

  const onSuggestSelect = (values) => {
    console.log(values);
    if (values && values.gmaps) {
      const {
        formatted_address,
        geometry: { location },
      } = values.gmaps;

      console.log(location, formatted_address);

      setFieldValue(field.name, formatted_address);
      setFieldValue("lat", location.lat());
      setFieldValue("lng", location.lng());
    }
  };

  const onSuggestNoResults = (userInput) => {
    console.log("onSuggestNoResults for :" + userInput);
  };

  return (
    <div
      className={`location-input ${
        errors[field.name] && touched[field.name] ? "error" : ""
      }`}
    >
      <label>{placeholder}</label>
      <Geosuggest
        ref={geosuggestEl}
        className={" input-field"}
        placeholder={"Search For Address"}
        onChange={onChange}
        onSuggestSelect={onSuggestSelect}
        onSuggestNoResults={onSuggestNoResults}
        onBlur={() => setFieldTouched(field.name, true)}
        placeDetailFields={["geometry.location", "formatted_address"]}
        country={["ZA"]}
        minLength={5}
        queryDelay={500}
        maxFixtures={5}
        autoComplete="off"
      />
      {errors[field.name] && touched[field.name] && (
        <span>{errors[field.name]}</span>
      )}
    </div>
  );
};

LocationInput.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

LocationInput.defaultProps = {
  type: "text",
};

export default LocationInput;
