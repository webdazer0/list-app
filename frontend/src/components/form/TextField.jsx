import React from 'react';
import { FormWrapper } from './FormWrapper';

// { value, onChange, name }
export const TextField = (props) => {
  return (
    <FormWrapper>
      <label className="w-100">
        {props.name}
        <input type="text" {...props} className="form-control" />
      </label>
    </FormWrapper>
  );
};
