import React from 'react';
import { FormWrapper } from './FormWrapper';

export const NumberField = (props) => {
  return (
    <FormWrapper>
      <input type="number" {...props} className="form-control" />
    </FormWrapper>
  );
};
