import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import './checkbox.scss';

const Checkbox = ({ checked, className, label, name, onChange }) => (
  <Input checked={checked} className={className} label={label} name={name} onChange={onChange} type="checkbox" />
);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  value: false,
};

export { Checkbox };
