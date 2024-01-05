import React from 'react';
import { FormWrapper } from './FormWrapper';

export const DropdownField = ({ items, ...props }) => {
  return (
    <FormWrapper>
      <select {...props} className="form-control">
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </FormWrapper>
  );
};
