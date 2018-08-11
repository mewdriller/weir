import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';

const QUERY = gql`
  query ProjectQuery($key: String!) {
    project(key: $key) {
      boards {
        id
        name
      }
      collaborators {
        avatarUrl
        name
        username
      }
      issues {
        key
        title
      }
      key
      name
    }
  }
`;

function ProjectPage({ projectKey }) {
  return (
    <Query query={QUERY} variables={{ key: projectKey }}>
      {({ data, error, loading }) => {
        if (error || loading) return null;

        return (
          <React.Fragment>
            <h1>
              {data.project.name} ({data.project.key})
            </h1>
            <h2>Boards</h2>
            <ul>
              {data.project.boards.map(board => (
                <li key={board.id}>{board.name}</li>
              ))}
            </ul>
            <h2>Collaborators</h2>
            <ul>
              {data.project.collaborators.map(user => (
                <li key={user.username}>
                  <img alt={user.name} src={user.avatarUrl} />
                  <span title={user.name}>@{user.username}</span>
                </li>
              ))}
            </ul>
            <h2>Issues</h2>
            <ul>
              {data.project.issues.map(issue => (
                <li key={issue.key}>{issue.title}</li>
              ))}
            </ul>
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default ProjectPage;
