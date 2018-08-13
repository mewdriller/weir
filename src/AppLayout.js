import { Link } from '@reach/router';
import React from 'react';

function AppLayout({ children }) {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/issues">Issues</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </React.Fragment>
  );
}

export default AppLayout;
