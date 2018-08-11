import { Redirect, Router } from '@reach/router';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import ProjectPage from './ProjectPage';
import ProjectsPage from './ProjectsPage';

const client = new ApolloClient({ uri: 'http://localhost:4000' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Redirect from="/" to="/projects" />
      <Layout path="/">
        <ProjectsPage path="/projects" />
        <ProjectPage path="/projects/:projectKey" />
      </Layout>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
