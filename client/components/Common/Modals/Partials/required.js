import React from 'react';

const setRequired = ({ id }) => {
  switch (id) {
    case 'description':
    case 'classId':
      return <span className="red">*</span>;
    default:
      return null;
  }
};

export default id => (<span>{setRequired(id)}</span>);
