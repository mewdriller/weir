import { Link } from '@reach/router';
import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';

const QUERY = gql`
  query ProjectsQuery {
    projects {
      collaborators {
        username
      }
      issues {
        key
      }
      key
      name
    }
  }
`;

function ProjectsPage() {
  return (
    <Query query={QUERY}>
      {({ data, error, loading }) => {
        if (error || loading) return null;

        return (
          <React.Fragment>
            <h1>Projects</h1>
            <ul>
              {data.projects.map(project => (
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
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default ProjectsPage;
