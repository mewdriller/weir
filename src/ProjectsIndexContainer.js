import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { branch, compose, mapProps, renderNothing } from 'recompose';
import ProjectsIndexPage from './ProjectsIndexPage';

const ProjectSummaryFragment = gql`
  fragment ProjectSummary on Project {
    collaborators {
      id
      username
    }
    id
    issues {
      id
      key
    }
    key
    name
  }
`;

const ProjectsQuery = gql`
  ${ProjectSummaryFragment}

  query ProjectsQuery {
    projects {
      ...ProjectSummary
    }
  }
`;

const CreateProjectMutation = gql`
  ${ProjectSummaryFragment}

  mutation CreateProjectMutation($key: String!, $name: String!) {
    project: createProject(key: $key, name: $name) {
      ...ProjectSummary
    }
  }
`;

export default compose(
  graphql(ProjectsQuery, { name: 'projectsQuery' }),
  graphql(CreateProjectMutation, {
    name: 'onCreateProject',
    options: {
      update: (proxy, { data: { project } }) => {
        const queryData = proxy.readQuery({ query: ProjectsQuery });

        proxy.writeQuery({
          query: ProjectsQuery,
          data: { projects: [...queryData.projects, project] },
        });
      },
    },
    props: props => ({
      onCreateProject: variables => props.onCreateProject({ variables }),
    }),
  }),
  branch(
    ({ projectsQuery }) => projectsQuery.loading || projectsQuery.error,
    renderNothing,
  ),
  mapProps(({ projectsQuery, ...rest }) => ({
    ...rest,
    projects: projectsQuery.projects,
  })),
)(ProjectsIndexPage);
