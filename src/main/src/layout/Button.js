import React from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './button.scss'

const Button = ({ className, label, onClick }) => (
  <button className={toClassNames('button', className)} onClick={onClick}>
      {label}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export { Button };
