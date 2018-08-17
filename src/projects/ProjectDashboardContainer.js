import { gql } from 'apollo-boost';
import { concat, update } from 'lodash/fp';
import { graphql } from 'react-apollo';
import { compose, mapProps, setDisplayName } from 'recompose';
import { waitForQueries } from '../common';
import ProjectDashboardPage from './ProjectDashboardPage';

const BoardSummaryFragment = gql`
  fragment BoardSummary on Board {
    id
    name
  }
`;

const ProjectDashboardQuery = gql`
  ${BoardSummaryFragment}

  query ProjectDashboardQuery($handle: String!) {
    project(handle: $handle) {
      boards {
        ...BoardSummary
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

const CreateBoardMutation = gql`
  ${BoardSummaryFragment}

  mutation CreateBoardMutation($name: String!, $projectId: String!) {
    board: createBoard(name: $name, projectId: $projectId) {
      ...BoardSummary
    }
  }
`;

export default compose(
  graphql(ProjectDashboardQuery, {
    name: 'projectDashboardQuery',
    options: ({ handle }) => ({ variables: { handle } }),
  }),
  graphql(CreateBoardMutation, {
    name: 'onCreateBoard',
    options: ({ handle }) => ({
      update: (proxy, { data: { board } }) => {
        const queryData = proxy.readQuery({
          query: ProjectDashboardQuery,
          variables: { handle },
        });

        proxy.writeQuery({
          data: update('project.boards', concat(board), queryData),
          query: ProjectDashboardQuery,
          variables: { handle },
        });
      },
    }),
    props: ({ onCreateBoard, ownProps }) => ({
      onCreateBoard: variables =>
        onCreateBoard({
          variables: {
            ...variables,
            projectId: ownProps.projectDashboardQuery.project.id,
          },
        }),
    }),
  }),
  waitForQueries('projectDashboardQuery'),
  mapProps(({ projectDashboardQuery, ...rest }) => ({
    ...rest,
    project: projectDashboardQuery.project,
  })),
  setDisplayName('ProjectDashboardContainer'),
)(ProjectDashboardPage);
