import React from 'react';
import { FormWrapper } from './FormWrapper';

export function CheckboxField({ label, value, ...props }) {
  return (
    <FormWrapper>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          {...props}
          checked={value}
          id={props.name}
        />
        <label className="form-check-label" htmlFor={props.name}>
          {label ?? props.name}
        </label>
      </div>
    </FormWrapper>
  );
}
