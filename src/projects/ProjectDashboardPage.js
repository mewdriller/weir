import React from 'react';
import { AddIcon, Button } from '../common';
import AddBoardModal from './AddBoardModal';

class ProjectDashboardPage extends React.Component {
  state = {
    showModal: false,
  };

  handleToggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { onCreateBoard, project } = this.props;
    const { showModal } = this.state;

    return (
      <React.Fragment>
        <h1>
          {project.name} ({project.handle})
        </h1>
        <h2>Boards</h2>
        <Button icon={AddIcon} onClick={this.handleToggleModal} outlined>
          Add Board
        </Button>
        <ul>
          {project.boards.map(board => (
            <li key={board.id}>{board.name}</li>
          ))}
        </ul>
        <h2>Collaborators</h2>
        <ul>
          {project.collaborators.map(user => (
            <li key={user.handle}>
              <img alt={user.name} src={user.avatarUrl} />
              <span title={user.name}>@{user.handle}</span>
            </li>
          ))}
        </ul>
        <h2>Issues</h2>
        <ul>
          {project.issues.map(issue => (
            <li key={issue.handle}>{issue.title}</li>
          ))}
        </ul>
        <AddBoardModal
          onClose={this.handleToggleModal}
          onCreate={onCreateBoard}
          open={showModal}
        />
      </React.Fragment>
    );
  }
}

export default ProjectDashboardPage;
