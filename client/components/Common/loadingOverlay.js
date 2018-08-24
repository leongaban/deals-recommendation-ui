import React from 'react';

// Material-ui
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <h1>UPDATING RULES.</h1>
    <CircularProgress size={250} />
  </div>);

export default LoadingOverlay;
