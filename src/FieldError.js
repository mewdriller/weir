import { connect } from 'formik';
import React from 'react';

function FieldError({ formik, id, name }) {
  const key = id || name;
  const { errors, touched } = formik;

  if (!touched[key] || !errors[key]) return null;

  return <div>{errors[key]}</div>;
}

export default connect(FieldError);
