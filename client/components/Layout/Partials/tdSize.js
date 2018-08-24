import React from 'react';

export default ({ style, rule }) => (
  <td className="tl" style={style}>
    <span className="top-15">
      { rule.size }
    </span>
  </td>);
