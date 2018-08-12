import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { compose, mapProps, setDisplayName } from 'recompose';
import ProjectIndexPage from './ProjectIndexPage';
import waitForQueries from './waitForQueries';

const ProjectIndexEntryFragment = gql`
  fragment ProjectIndexEntry on Project {
    collaborators {
      handle
      id
    }
    handle
    id
    issues {
      handle
      id
    }
    name
    organization {
      handle
      id
      name
    }
  }
`;

const ProjectIndexQuery = gql`
  ${ProjectIndexEntryFragment}

  query ProjectIndexQuery {
    organizations {
      handle
      id
      name
    }
    projects {
      ...ProjectIndexEntry
    }
  }
`;

const CreateProjectMutation = gql`
  ${ProjectIndexEntryFragment}

  mutation CreateProjectMutation(
    $handle: String!
    $name: String!
    $organizationId: String!
  ) {
    project: createProject(
      handle: $handle
      name: $name
      organizationId: $organizationId
    ) {
      ...ProjectIndexEntry
    }
  }
`;

export default compose(
  graphql(ProjectIndexQuery, { name: 'projectIndexQuery' }),
  graphql(CreateProjectMutation, {
    name: 'onCreateProject',
    options: {
      update: (proxy, { data: { project } }) => {
        const queryData = proxy.readQuery({ query: ProjectIndexQuery });

        proxy.writeQuery({
          query: ProjectIndexQuery,
          data: { ...queryData, projects: [...queryData.projects, project] },
        });
      },
    },
    props: props => ({
      onCreateProject: variables => props.onCreateProject({ variables }),
    }),
  }),
  waitForQueries('projectIndexQuery'),
  mapProps(({ projectIndexQuery, ...rest }) => ({
    ...rest,
    organizations: projectIndexQuery.organizations,
    projects: projectIndexQuery.projects,
  })),
  setDisplayName('ProjectIndexContainer'),
)(ProjectIndexPage);
