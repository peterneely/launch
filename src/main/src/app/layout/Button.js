import React from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './button.scss'

const Button = ({ className, disabled, label, onClick, primary }) => {
  const classNames = toClassNames('button', className, primary ? 'mod-primary' : null, disabled ? 'mod-disabled' : null);
  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
        {label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export { Button };
