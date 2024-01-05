import React from 'react';
import { FormWrapper } from './FormWrapper';

export const TextAreaField = (props) => {
  return (
    <FormWrapper>
      <textarea type="text" {...props} className="form-control"></textarea>
    </FormWrapper>
  );
};
