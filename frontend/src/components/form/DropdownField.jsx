import React from 'react';
import { FormWrapper } from './FormWrapper';

export const DropdownField = ({ items, ...props }) => {
  return (
    <FormWrapper>
      <label className="w-100">
        Owner
        <select {...props} className="custom-select">
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </FormWrapper>
  );
};
