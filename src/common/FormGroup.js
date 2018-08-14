import { css, cx } from 'emotion';
import { connect, Field } from 'formik';
import React from 'react';

const sFormGroup = css`
  margin: 16px 8px 8px 0;
`;

const sLabel = css`
  color: rgba(0, 0, 0, 0.6);
  display: block;
  font-size: 12px;
  line-height: 14px;
`;

const sField = css`
  display: block;
  margin: 0 0 8px;
  min-width: 280px;
  outline-style: none;
  width: 100%;
`;

const sSelect = css`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  font-size: 16px;
  line-height: 28px;
  padding: 4px 26px 4px 0;

  &:disabled {
  }

  &:focus:not(:disabled) {
    border-bottom-width: 2px;
    border-color: #6200ee;
  }

  &:hover:not(:disabled) {
  }
`;

const sInput = css`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  caret-color: #6200ee;
  color: rgba(0, 0, 0, 0.87);
  cursor: text;
  font-size: 16px;
  height: 30px;
  line-height: 28px;
  padding: 0 0 1px;

  &:disabled {
  }

  &:focus:not(:disabled) {
    border-bottom-width: 2px;
    border-color: #6200ee;
  }

  &:hover:not(:disabled) {
  }
`;

const sTextArea = css``;

const sFieldError = css`
  border-color: #b00020ff !important;
  border-bottom-width: 2px !important;
`;

const sError = css`
  color: #b00020ff;
  font-size: 12px;
  line-height: 20px;
  margin: 0 0 8px;
`;

function FormGroup({ component = 'input', formik, id, label, name, ...rest }) {
  const key = id || name;
  const { errors, touched } = formik;
  const hasError = touched[key] && errors[key];

  return (
    <div className={sFormGroup}>
      <label className={sLabel} htmlFor={key}>
        {label}
      </label>
      <Field
        {...rest}
        className={cx(sField, {
          [sFieldError]: hasError,
          [sInput]: component === 'input',
          [sSelect]: component === 'select',
          [sTextArea]: component === 'textarea',
        })}
        component={component}
        name={key}
      />
      {hasError && <p className={sError}>{errors[key]}</p>}
    </div>
  );
}

export default connect(FormGroup);
