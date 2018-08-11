import mem from 'mem';
import React from 'react';
import Modal from 'react-modal';

class AddProjectModal extends React.Component {
  state = { key: '', name: '' };

  handleInputChange = mem(fieldName => event => {
    this.setState({ [fieldName]: event.target.value });
  });

  handleSubmit = () => {
    const { key, name } = this.state;

    this.props.onCreate({ key, name }).then(() => {
      this.setState({ key: '', name: '' });
      this.props.onClose();
    });
  };

  render() {
    const { onClose, open } = this.props;
    const { key, name } = this.state;

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
          Project key
          <input
            onChange={this.handleInputChange('key')}
            type="text"
            value={key}
          />
        </label>
        <button onClick={this.handleSubmit}>Create project</button>
      </Modal>
    );
  }
}

export default AddProjectModal;
