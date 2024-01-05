import React from 'react';
import { FormWrapper } from './FormWrapper';

export const NumberField = (props) => {
  return (
    <FormWrapper>
      <label className="w-100">
        {props.name}
        <input type="number" {...props} className="form-control" />
      </label>
    </FormWrapper>
  );
};
