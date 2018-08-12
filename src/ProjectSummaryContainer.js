import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { compose, mapProps, setDisplayName } from 'recompose';
import ProjectSummaryPage from './ProjectSummaryPage';
import waitForQueries from './waitForQueries';

const ProjectSummaryQuery = gql`
  query ProjectSummaryQuery($handle: String!) {
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
  graphql(ProjectSummaryQuery, {
    name: 'projectSummaryQuery',
    options: ({ handle }) => ({ variables: { handle } }),
  }),
  waitForQueries('projectSummaryQuery'),
  mapProps(({ projectSummaryQuery, ...rest }) => ({
    ...rest,
    project: projectSummaryQuery.project,
  })),
  setDisplayName('ProjectSummaryContainer'),
)(ProjectSummaryPage);
