import { Link } from '@reach/router';
import React from 'react';
import { AddIcon, Button } from '../common';
import AddProjectModal from './AddProjectModal';

class ProjectsIndexPage extends React.Component {
  state = {
    showModal: false,
  };

  handleToggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { organizations, projects, onCreateProject } = this.props;
    const { showModal } = this.state;

    return (
      <React.Fragment>
        <h1>Projects</h1>
        <Button icon={AddIcon} onClick={this.handleToggleModal} outlined>
          ADD PROJECT
        </Button>
        <ul>
          {projects.map(project => (
            <li key={project.handle}>
              <Link to={`/projects/${project.handle}`}>
                <h2>
                  {project.name} ({project.handle})
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
        <AddProjectModal
          onClose={this.handleToggleModal}
          onCreate={onCreateProject}
          open={showModal}
          organizations={organizations}
        />
      </React.Fragment>
    );
  }
}

export default ProjectsIndexPage;
