import React from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './input.scss';

const Input = ({ checked, className, label, name, onChange, type, value }) => (
  <div className={toClassNames(className, 'input-container', `${type}-container`)}>
    {!!label && <label className={toClassNames('input-label', `${type}-label`)} htmlFor={name}>{label}</label>}
    <input
      checked={checked}
      className={toClassNames('input', `${type}-input`)}
      type={type}
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange({ name, checked, value })}
    />
  </div>
);

Input.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Input.defaultProps = {
  type: 'text',
};

export { Input };
