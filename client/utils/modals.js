// Utils
import { isUndefined } from 'utils/common';
import { capitalizeFirst as cap } from 'utils/formatter';

// Copy
import { PRODUCT_NAME } from 'copy/Components/modals';

// ProductModal
export const modalName = isEdit => (isEdit ? 'Edit' : 'Add');
export const enabledValue = value => (isUndefined(value) ? 'false' : value.toString());

// ProductModal (Edit)
export const setChecked = (type) => {
  switch (type) {
    case 'E': return 'Exclude';
    case 'O': return 'Override';
    case 'D':
    default: return 'Default';
  }
};

// ProductInput utils
const isDesc = id => id === 'description';
const renderDesc = edit => (edit ? cap(PRODUCT_NAME) : `Friendly ${PRODUCT_NAME}`);
export const classer = id => (isDesc(id) ? '' : 'col');
export const titler = (id, edit) => (isDesc(id) ? renderDesc(edit) : cap(id));
export const placeholder = id => (isDesc(id) ? 'Ex: Cookies' : '');
