import { css, cx } from 'emotion';
import { Form, withFormik } from 'formik';
import { isEmpty, omitBy } from 'lodash';
import React from 'react';
import * as Yup from 'yup';
import { Button, FormGroup, Modal } from '../common';

const cRow = css`
  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: 16px;
  }
`;

const cColumn = css``;

const uGreedy = css`
  flex: 1;
`;

function AddIssueModal({ isSubmitting, onClose, open, projects }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Form>
        <Modal.Header>
          <h2>Add an Issue</h2>
        </Modal.Header>
        <Modal.Body className={cRow}>
          <div className={cx(cColumn, uGreedy)}>
            <FormGroup label="Title" name="title" />
            <FormGroup component="textarea" label="Body" name="body" />
          </div>
          <div className={cColumn}>
            <FormGroup component="select" label="Estimate" name="estimate">
              <option>None</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </FormGroup>
            <FormGroup component="select" label="Priority" name="priority">
              <option value="BLOCKER">Blocker</option>
              <option value="CRITICAL">Critical</option>
              <option value="MAJOR">Major</option>
              <option value="MINOR">Minor</option>
              <option value="TRIVIAL">Trivial</option>
            </FormGroup>
            <FormGroup component="select" label="Project" name="projectId">
              <option disabled />
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </FormGroup>
            <FormGroup component="select" label="Type" name="type">
              <option value="BUG">Bug</option>
              <option value="EPIC">Epic</option>
              <option value="STORY">Story</option>
              <option value="TASK">Task</option>
            </FormGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Cancel</Button>
          <Button contained disabled={isSubmitting} type="submit">
            Create Issue
          </Button>
        </Modal.Footer>
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
