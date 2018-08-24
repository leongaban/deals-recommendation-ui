import React from 'react';
import ReactDOM from 'react-dom';

// Copy
import { APP_NAME } from 'copy/Global/common';

// Components
import App from 'containers/appContainer';

// SASS Stylessheet
import 'siskel.scss';

document.title = APP_NAME;

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
