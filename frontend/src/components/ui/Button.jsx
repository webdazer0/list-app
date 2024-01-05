import React from 'react';

const btnTypeMap = {
  primary: 'btn-primary',
  success: 'btn-success',
  warning: 'btn-warning',
};

export default function Button({ variant }) {
  const btnVariant = btnTypeMap[variant];
  const btnStyle = `btn ${btnVariant} btn-block`;
  return <button className={btnStyle}>Update</button>;
}
