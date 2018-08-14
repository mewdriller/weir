import { branch, renderNothing } from 'recompose';

const waitForQueries = (...queryNames) =>
  branch(
    props =>
      queryNames.some(name => {
        const query = props[name];

        return query && (query.loading || query.error);
      }),
    renderNothing,
  );

export default waitForQueries;
