import { Redirect, Router } from '@reach/router';
import ApolloClient from 'apollo-boost';
import { injectGlobal } from 'emotion';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import AppLayout from './AppLayout';
import { IssuesIndexPage } from './issues';
import { ProjectDashboardPage, ProjectsIndexPage } from './projects';

injectGlobal`
  * {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }
`;

const client = new ApolloClient({ uri: 'http://localhost:4000' });
const rootEl = document.getElementById('root');

Modal.setAppElement(rootEl);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Redirect from="/" to="/projects" />
      <AppLayout path="/">
        <IssuesIndexPage path="issues" />
        <ProjectsIndexPage path="projects" />
        <ProjectDashboardPage path="projects/:handle" />
      </AppLayout>
    </Router>
  </ApolloProvider>,
  rootEl,
);
