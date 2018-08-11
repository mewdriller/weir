import { Link } from '@reach/router';
import React from 'react';
import AddProjectModal from './AddProjectModal';

class ProjectsIndexPage extends React.Component {
  state = {
    showModal: false,
  };

  handleToggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { projects, onCreateProject } = this.props;
    const { showModal } = this.state;

    return (
      <React.Fragment>
        <h1>Projects</h1>
        <ul>
          {projects.map(project => (
            <li key={project.key}>
              <Link to={`/projects/${project.key}`}>
                <h2>
                  {project.name} ({project.key})
                </h2>
                <dl>
                  <dt>Collaborators</dt>
                  <dd>{project.collaborators.length}</dd>
                  <dt>Issues</dt>
                  <dd>{project.issues.length}</dd>
                </dl>
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={this.handleToggleModal}>
          <span aria-label="Heavy Plus Sign" role="img">
            ➕
          </span>
          Add Project
        </button>
        <AddProjectModal
          onClose={this.handleToggleModal}
          onCreate={onCreateProject}
          open={showModal}
        />
      </React.Fragment>
    );
  }
}

export default ProjectsIndexPage;
