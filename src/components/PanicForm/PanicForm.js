import React from "react";
import "./styles.scss";
import axios from "axios";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../InputField";
import InputSelect from "../InputSelect";
import LocationInput from "../LocationInput";
import InputArea from "../InputArea";

const PanicForm = () => {
  const validation = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    age: Yup.number().typeError("Invalid Age").min(0, "Invalid Age"),
    location: Yup.string().required("This field is required"),
  });

  const submitPanicEvent = (data, callback) => {
    axios
      .post(`${process.env.REACT_APP_API}/processEvent`, data)
      .then((response) => {
        console.log(response);
        callback();
      });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        gender: "",
        age: "",
        location: "",
        details: "",
      }}
      enableReinitialize
      validationSchema={validation}
      onSubmit={(values, actions) => {
        const callback = () => {
          actions.resetForm({});
          actions.setSubmitting(false);
        };
        submitPanicEvent(values, callback);
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit} className="panic-form">
            <h2>Send Panic Alert</h2>
            <Field
              component={InputField}
              name={"name"}
              placeholder={"Full Name*"}
              autoComplete="off"
            />
            <Field
              component={LocationInput}
              name={"location"}
              placeholder={"Location*"}
              autoComplete="off"
            />
            <Field
              component={InputField}
              name={"age"}
              placeholder={"Age"}
              autoComplete="off"
            />
            <Field
              component={InputSelect}
              name={"gender"}
              placeholder={"Gender"}
              autoComplete="off"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
            <Field
              component={InputArea}
              name={"details"}
              placeholder={"Details*"}
              autoComplete="off"
            />
            <div className="panic-form-buttons">
              <button type="submit" className="button" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default PanicForm;
