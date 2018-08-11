import { Redirect, Router } from '@reach/router';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Layout from './Layout';
import ProjectPage from './ProjectPage';
import ProjectsIndexContainer from './ProjectsIndexContainer';

const client = new ApolloClient({ uri: 'http://localhost:4000' });
const rootEl = document.getElementById('root');

Modal.setAppElement(rootEl);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Redirect from="/" to="/projects" />
      <Layout path="/">
        <ProjectsIndexContainer path="/projects" />
        <ProjectPage path="/projects/:projectKey" />
      </Layout>
    </Router>
  </ApolloProvider>,
  rootEl,
);
