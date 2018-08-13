import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { compose, mapProps, setDisplayName } from 'recompose';
import ProjectDashboardPage from './ProjectDashboardPage';
import waitForQueries from './waitForQueries';

const ProjectDashboardQuery = gql`
  query ProjectDashboardQuery($handle: String!) {
    project(handle: $handle) {
      boards {
        id
        name
      }
      collaborators {
        avatarUrl
        handle
        id
        name
      }
      issues {
        handle
        id
        title
      }
      handle
      id
      name
    }
  }
`;

export default compose(
  graphql(ProjectDashboardQuery, {
    name: 'projectDashboardQuery',
    options: ({ handle }) => ({ variables: { handle } }),
  }),
  waitForQueries('projectDashboardQuery'),
  mapProps(({ projectDashboardQuery, ...rest }) => ({
    ...rest,
    project: projectDashboardQuery.project,
  })),
  setDisplayName('ProjectDashboardContainer'),
)(ProjectDashboardPage);
