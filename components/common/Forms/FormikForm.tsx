import { Formik } from "formik";
import React, { ReactNode } from "react";

interface FormProps {
  initialValues: Object;
  validationSchema: Object;
  onSubmit: any; // find out what to do
  children: ReactNode;
}

const FormikForm = ({ initialValues, validationSchema, onSubmit, children }: FormProps) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <form>{children}</form>
    </Formik>
  );
};

export default FormikForm;
