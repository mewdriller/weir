import { Form, withFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button, FormGroup, Modal } from '../common';

function AddBoardModal({ isSubmitting, onClose, open }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Form>
        <Modal.Header>
          <h1>Add a Board</h1>
        </Modal.Header>
        <Modal.Body>
          <FormGroup label="Name" name="name" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Cancel</Button>
          <Button contained disabled={isSubmitting} type="submit">
            Create Board
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default withFormik({
  displayName: 'AddBoardModal',
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
  mapPropsToValues: () => ({ name: '' }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required.'),
  }),
})(AddBoardModal);
