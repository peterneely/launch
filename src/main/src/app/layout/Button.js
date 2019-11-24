import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './button.scss';

const Button = ({ className, disabled, icon, label, onClick, primary }) => {
  const classNames = toClassNames(
    'button',
    className,
    primary ? 'mod-primary' : null,
    !label ? 'mod-icon-only' : null,
    disabled ? 'is-disabled' : null
  );
  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      <Fragment>
        {icon}
        {label}
      </Fragment>
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export { Button };
