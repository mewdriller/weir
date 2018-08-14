import React from 'react';
import { AddIcon, Button } from '../common';
import AddIssueModal from './AddIssueModal';

class IssuesIndexPage extends React.Component {
  state = {
    showModal: false,
  };

  handleToggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { issues, onCreateIssue, projects } = this.props;
    const { showModal } = this.state;

    return (
      <React.Fragment>
        <h1>Issues</h1>
        <Button icon={AddIcon} onClick={this.handleToggleModal} outlined>
          Add Issue
        </Button>
        <ul>
          {issues.map(issue => (
            <li key={issue.handle}>
              <h2>
                {issue.handle} / {issue.title}
              </h2>
              <dl>
                <dt>Estimate</dt>
                <dd>{issue.estimate}</dd>
                <dt>Priority</dt>
                <dd>{issue.priority}</dd>
                <dt>Project</dt>
                <dd>
                  {issue.project.name} ({issue.project.handle})
                </dd>
                <dt>Status</dt>
                <dd>{issue.status}</dd>
                <dt>Type</dt>
                <dd>{issue.type}</dd>
              </dl>
              <p>{issue.body}</p>
            </li>
          ))}
        </ul>
        <AddIssueModal
          onClose={this.handleToggleModal}
          onCreate={onCreateIssue}
          open={showModal}
          projects={projects}
        />
      </React.Fragment>
    );
  }
}

export default IssuesIndexPage;
