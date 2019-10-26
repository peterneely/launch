import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './input.scss';

const Input = ({ checked, className, label, name, onChange, type, value }) => {
  const input = (
    <Fragment>
      <input
        checked={checked}
        className={toClassNames('input', `mod-${type}`)}
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange({ name, checked, value })}
      />
      {type === 'checkbox' && <i className={toClassNames('checked-icon', checked ? 'mod-checked fas fa-check-circle' : 'mod-unchecked')} />}
    </Fragment>
  );
  const containerClasses = toClassNames(className, 'input-container', `mod-${type}`);
  return label ? (
    <label className={toClassNames(containerClasses, `mod-${name}`)}>
      <span className="label">{label}</span>
      {input}
    </label>
  ) : (
    <div className={containerClasses}>{input}</div>
  );
};

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
