import { Field, Form, withFormik } from 'formik';
import { isEmpty, omitBy } from 'lodash';
import React from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import FieldError from './FieldError';

function AddIssueModal({ isSubmitting, onClose, open, projects }) {
  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <Form>
        <h2>Add an issue</h2>
        <button onClick={onClose} type="button">
          <span aria-label="Cross Mark" role="img">
            ❌
          </span>
        </button>
        <label htmlFor="title">Title*</label>
        <Field name="title" />
        <FieldError name="title" />
        <label htmlFor="estimate">Estimate</label>
        <Field component="select" name="estimate">
          <option>None</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </Field>
        <FieldError name="estimate" />
        <label htmlFor="priority">Priority*</label>
        <Field component="select" name="priority">
          <option value="BLOCKER">Blocker</option>
          <option value="CRITICAL">Critical</option>
          <option value="MAJOR">Major</option>
          <option value="MINOR">Minor</option>
          <option value="TRIVIAL">Trivial</option>
        </Field>
        <FieldError name="priority" />
        <label htmlFor="projectId">Project*</label>
        <Field component="select" name="projectId">
          <option>Select a project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </Field>
        <FieldError name="projectId" />
        <label htmlFor="type">Type*</label>
        <Field component="select" name="type">
          <option value="BUG">Bug</option>
          <option value="EPIC">Epic</option>
          <option value="STORY">Story</option>
          <option value="TASK">Task</option>
        </Field>
        <FieldError name="type" />
        <label htmlFor="body">Body</label>
        <Field component="textarea" name="body" />
        <FieldError name="body" />
        <button disabled={isSubmitting} type="submit">
          Create issue
        </button>
      </Form>
    </Modal>
  );
}

export default withFormik({
  displayName: 'AddIssueModal',
  handleSubmit: (values, { props, resetForm, setSubmitting }) => {
    const payload = omitBy(values, isEmpty);

    props
      .onCreate(payload)
      .then(() => {
        resetForm();
        props.onClose();
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  mapPropsToValues: () => ({
    body: '',
    estimate: '',
    priority: 'MAJOR',
    projectId: '',
    title: '',
    type: 'STORY',
  }),
  validationSchema: Yup.object().shape({
    body: Yup.string(),
    estimate: Yup.string(),
    priority: Yup.string().required('Priority is required.'),
    projectId: Yup.string().required('Project is required.'),
    title: Yup.string().required('Title is required.'),
    type: Yup.string().required('Type is required.'),
  }),
})(AddIssueModal);
