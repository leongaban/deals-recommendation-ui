import React from 'react';

// Material-UI
import Typography from '@material-ui/core/Typography';

// Components
import Table from 'components/Layout/table';

// Constants
import { TABS_DEFINITIONS } from 'constants/tabs';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

const ProductsTabContainer = (props) => {
  const { value } = props;
  const tabDef = TABS_DEFINITIONS[value];

  // Abort if we can't find the value.
  if (!tabDef) return null;

  // Get the list for this products/tab type.
  const list = props[tabDef.list];

  // Determine if this is the "all" list or not.
  const allList = value === 0;

  return (
    <TabContainer>
      <Table {...allList} list={list} />
    </TabContainer>
  );
};

export default (ProductsTabContainer);
