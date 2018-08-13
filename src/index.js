import { Redirect, Router } from '@reach/router';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import AppLayout from './AppLayout';
import IssuesIndexContainer from './IssuesIndexContainer';
import ProjectDashboardContainer from './ProjectDashboardContainer';
import ProjectsIndexContainer from './ProjectsIndexContainer';

const client = new ApolloClient({ uri: 'http://localhost:4000' });
const rootEl = document.getElementById('root');

Modal.setAppElement(rootEl);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Redirect from="/" to="/projects" />
      <AppLayout path="/">
        <IssuesIndexContainer path="issues" />
        <ProjectsIndexContainer path="projects" />
        <ProjectDashboardContainer path="projects/:handle" />
      </AppLayout>
    </Router>
  </ApolloProvider>,
  rootEl,
);
