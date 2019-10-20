import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './input.scss';

const Input = ({ checked, className, label, name, onChange, type, value }) => (
  <Fragment>
    {!!label && <span className={toClassNames(className, `${type}-label`)}>{label}</span>}
    <input
      checked={checked}
      className={toClassNames(className, `${type}-input`)}
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange({ name, checked, value })}
    />
  </Fragment>
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
