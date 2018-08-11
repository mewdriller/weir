import { Link } from '@reach/router';
import React from 'react';

function Layout({ children }) {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </React.Fragment>
  );
}

export default Layout;
