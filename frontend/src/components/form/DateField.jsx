import React from 'react';
import { FormWrapper } from './FormWrapper';

export function DateField(props) {
  return (
    <FormWrapper>
      <label className="w-100">
        {props.name}
        <input type="date" {...props} className="form-control" />
      </label>
    </FormWrapper>
  );
}
