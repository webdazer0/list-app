import React from 'react';

const btnTypeMap = {
  primary: 'btn-primary',
  success: 'btn-success',
  warning: 'btn-warning',
};

export default function Button({ variant, onClick, children }) {
  const btnVariant = btnTypeMap[variant];
  const btnStyle = `btn py-2 ${btnVariant} btn-block`;
  return (
    <button onClick={onClick} className={btnStyle}>
      {children}
    </button>
  );
}
