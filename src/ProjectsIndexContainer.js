import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { compose, mapProps, setDisplayName } from 'recompose';
import ProjectsIndexPage from './ProjectsIndexPage';
import waitForQueries from './waitForQueries';

const ProjectsIndexEntryFragment = gql`
  fragment ProjectsIndexEntry on Project {
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

const ProjectsIndexQuery = gql`
  ${ProjectsIndexEntryFragment}

  query ProjectsIndexQuery {
    organizations {
      handle
      id
      name
    }
    projects {
      ...ProjectsIndexEntry
    }
  }
`;

const CreateProjectMutation = gql`
  ${ProjectsIndexEntryFragment}

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
      ...ProjectsIndexEntry
    }
  }
`;

export default compose(
  graphql(ProjectsIndexQuery, { name: 'projectsIndexQuery' }),
  graphql(CreateProjectMutation, {
    name: 'onCreateProject',
    options: {
      update: (proxy, { data: { project } }) => {
        const queryData = proxy.readQuery({ query: ProjectsIndexQuery });

        proxy.writeQuery({
          query: ProjectsIndexQuery,
          data: { ...queryData, projects: [...queryData.projects, project] },
        });
      },
    },
    props: props => ({
      onCreateProject: variables => props.onCreateProject({ variables }),
    }),
  }),
  waitForQueries('projectsIndexQuery'),
  mapProps(({ projectsIndexQuery, ...rest }) => ({
    ...rest,
    organizations: projectsIndexQuery.organizations,
    projects: projectsIndexQuery.projects,
  })),
  setDisplayName('ProjectsIndexContainer'),
)(ProjectsIndexPage);
