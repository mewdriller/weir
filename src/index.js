import ApolloClient from 'apollo-boost';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';

const client = new ApolloClient({ uri: 'http://localhost:4000' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <h1>Weir</h1>
  </ApolloProvider>,
  document.getElementById('root'),
);
