import React from 'react';

function ProjectSummaryPage({ project }) {
  return (
    <React.Fragment>
      <h1>
        {project.name} ({project.handle})
      </h1>
      <h2>Boards</h2>
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
    </React.Fragment>
  );
}

export default ProjectSummaryPage;
