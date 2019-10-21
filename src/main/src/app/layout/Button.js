import React from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './button.scss'

const Button = ({ className, label, onClick, primary }) => (
  <button className={toClassNames('button', className, primary ? 'mod-primary' : null)} onClick={onClick}>
      {label}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export { Button };
