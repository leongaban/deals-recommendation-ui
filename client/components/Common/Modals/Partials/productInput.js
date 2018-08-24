import React from 'react';

import Required from 'components/Common/Modals/Partials/required';

// Utils
import {
  classer,
  placeholder,
  titler
} from 'utils/modals';

const ProductInput = ({
  id, val, handler, edit
}) => (
  <div className={classer(id)}>
    <p>{titler(id, edit)} <Required id={id} /></p>
    <input
      id={id}
      value={val}
      onChange={handler}
      type="text"
      placeholder={placeholder(id)}
    />
  </div>
);

export default ProductInput;
