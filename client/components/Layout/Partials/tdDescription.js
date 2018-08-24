import React from 'react';

export default ({ style, rule }) => (
  <td className="description" style={style}>
    <section>
      <span>{ rule.description }</span>
      <span>{ rule.base }, { rule.class }, { rule.prod }, { rule.size }</span>
    </section>
  </td>);
