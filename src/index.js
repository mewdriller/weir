import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import ProjectsPage from './ProjectsPage';

const client = new ApolloClient({ uri: 'http://localhost:4000' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ProjectsPage />
  </ApolloProvider>,
  document.getElementById('root'),
);
