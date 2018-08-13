import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { compose, mapProps, setDisplayName } from 'recompose';
import IssuesIndexPage from './IssuesIndexPage';
import waitForQueries from './waitForQueries';

const IssuesIndexEntryFragment = gql`
  fragment IssuesIndexEntry on Issue {
    body
    createdAt
    estimate
    handle
    id
    priority
    project {
      handle
      id
      name
    }
    status
    title
    type
    updatedAt
  }
`;

const IssuesIndexQuery = gql`
  ${IssuesIndexEntryFragment}

  query IssuesIndexQuery {
    issues {
      ...IssuesIndexEntry
    }
    projects {
      id
      name
    }
  }
`;

const CreateIssueMutation = gql`
  ${IssuesIndexEntryFragment}

  mutation CreateIssueMutation(
    $body: String
    $estimate: Estimate
    $priority: Priority!
    $projectId: String!
    $title: String!
    $type: IssueType!
  ) {
    issue: createIssue(
      body: $body
      estimate: $estimate
      priority: $priority
      projectId: $projectId
      title: $title
      type: $type
    ) {
      ...IssuesIndexEntry
    }
  }
`;

export default compose(
  graphql(IssuesIndexQuery, { name: 'issuesIndexQuery' }),
  graphql(CreateIssueMutation, {
    name: 'onCreateIssue',
    options: {
      update: (proxy, { data: { issue } }) => {
        const queryData = proxy.readQuery({ query: IssuesIndexQuery });

        proxy.writeQuery({
          query: IssuesIndexQuery,
          data: { ...queryData, issues: [...queryData.issues, issue] },
        });
      },
    },
    props: props => ({
      onCreateIssue: variables => props.onCreateIssue({ variables }),
    }),
  }),
  waitForQueries('issuesIndexQuery'),
  mapProps(({ issuesIndexQuery, ...rest }) => ({
    ...rest,
    issues: issuesIndexQuery.issues,
    projects: issuesIndexQuery.projects,
  })),
  setDisplayName('IssuesIndexContainer'),
)(IssuesIndexPage);
