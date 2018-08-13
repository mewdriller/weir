import { Field, Form, withFormik } from 'formik';
import React from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import FieldError from './FieldError';

function AddProjectModal({ isSubmitting, onClose, open, organizations }) {
  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <Form>
        <h2>Add a project</h2>
        <button onClick={onClose}>
          <span aria-label="Cross Mark" role="img">
            ❌
          </span>
        </button>
        <label htmlFor="name">Project name</label>
        <Field name="name" />
        <FieldError name="name" />
        <label htmlFor="handle">Project handle</label>
        <Field name="handle" />
        <FieldError name="handle" />
        <label htmlFor="organizationId">Organization</label>
        <Field component="select" name="organizationId">
          <option>Select an organization</option>
          {organizations.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Field>
        <FieldError name="organizationId" />
        <button disabled={isSubmitting} type="submit">
          Create project
        </button>
      </Form>
    </Modal>
  );
}

export default withFormik({
  displayName: 'AddProjectModal',
  handleSubmit: (values, { props, resetForm, setSubmitting }) => {
    props
      .onCreate(values)
      .then(() => {
        resetForm();
        props.onClose();
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  mapPropsToValues: () => ({
    handle: '',
    name: '',
    organizationId: '',
  }),
  validationSchema: Yup.object().shape({
    handle: Yup.string().required('Handle is required.'),
    name: Yup.string().required('Name is required.'),
    organizationId: Yup.string().required('Organization is required.'),
  }),
})(AddProjectModal);
