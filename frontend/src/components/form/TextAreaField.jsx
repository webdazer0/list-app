import React from 'react';
import { FormWrapper } from './FormWrapper';

export const TextAreaField = (props) => {
  return (
    <FormWrapper>
      <label className="w-100">
        {props.name}

        <textarea
          type="text"
          {...props}
          className="form-control"
          rows="3"
        ></textarea>
      </label>
    </FormWrapper>
  );
};
