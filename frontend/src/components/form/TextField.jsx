import React from 'react';
import { FormWrapper } from './FormWrapper';

// { value, onChange, name }
export const TextField = (props) => {
  return (
    <FormWrapper>
      <input type="text" {...props} className="form-control" />
    </FormWrapper>
  );
};
