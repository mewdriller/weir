import { Form, withFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button, FormGroup, Modal } from '../common';

function AddProjectModal({ isSubmitting, onClose, open, organizations }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Form>
        <Modal.Header>
          <h2>Add a Project</h2>
        </Modal.Header>
        <Modal.Body>
          <FormGroup label="Name" name="name" />
          <FormGroup label="Handle" name="handle" />
          <FormGroup
            component="select"
            label="Organization"
            name="organizationId"
          >
            <option disabled />
            {organizations.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Cancel</Button>
          <Button contained disabled={isSubmitting} type="submit">
            Create Project
          </Button>
        </Modal.Footer>
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
