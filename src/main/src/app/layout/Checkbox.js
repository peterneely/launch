import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';

const Checkbox = ({ checked, className, label, name, onChange }) => {
  const handleChange = info => event => {
    onChange({ ...info, toggle: true })(event);
  }
  return (
    <Input className={className} label={label} name={name} onChange={handleChange} type="checkbox" value={checked} />
  );
};

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
