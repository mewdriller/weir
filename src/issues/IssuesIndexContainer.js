import { gql } from 'apollo-boost';
import { concat, update } from 'lodash/fp';
import { graphql } from 'react-apollo';
import { compose, mapProps, setDisplayName } from 'recompose';
import { waitForQueries } from '../common';
import IssuesIndexPage from './IssuesIndexPage';

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
          data: update('issues', concat(issue), queryData),
          query: IssuesIndexQuery,
        });
      },
    },
    props: ({ onCreateIssue }) => ({
      onCreateIssue: variables => onCreateIssue({ variables }),
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
