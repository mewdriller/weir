import mem from 'mem';
import React from 'react';
import Modal from 'react-modal';

class AddProjectModal extends React.Component {
  state = { handle: '', name: '', organizationId: '' };

  handleInputChange = mem(fieldName => event => {
    this.setState({ [fieldName]: event.target.value });
  });

  handleSubmit = () => {
    const { handle, name, organizationId } = this.state;

    this.props.onCreate({ handle, name, organizationId }).then(() => {
      this.setState({ handle: '', name: '', organizationId: '' });
      this.props.onClose();
    });
  };

  render() {
    const { onClose, open, organizations } = this.props;
    const { handle, name, organizationId } = this.state;

    return (
      <Modal isOpen={open}>
        <h2>Add a project</h2>
        <button onClick={onClose}>
          <span aria-label="Cross Mark" role="img">
            ❌
          </span>
        </button>
        <label>
          Project name
          <input
            onChange={this.handleInputChange('name')}
            type="text"
            value={name}
          />
        </label>
        <label>
          Project handle
          <input
            onChange={this.handleInputChange('handle')}
            type="text"
            value={handle}
          />
        </label>
        <label>
          Organization
          <select
            onChange={this.handleInputChange('organizationId')}
            value={organizationId}
          >
            <option>Select an organization</option>
            {organizations.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={this.handleSubmit}>Create project</button>
      </Modal>
    );
  }
}

export default AddProjectModal;
