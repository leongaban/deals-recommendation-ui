import React from 'react';

// React Sortable
import { SortableContainer } from 'react-sortable-hoc';

const TableRowsContainer = ({ children }) => (
  <tbody>{children}</tbody>
);

export default SortableContainer(TableRowsContainer);
