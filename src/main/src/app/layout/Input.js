import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './input.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false, hovering: false };
  }

  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleHoverEnd = () => {
    this.setState({ hovering: false });
  };

  handleHoverStart = () => {
    this.setState({ hovering: true });
  };

  renderInput = () => {
    const { checked, className, name, onChange, type, value } = this.props;
    const { focused, hovering } = this.state;
    const containerClasses = toClassNames(
      className,
      'input-container',
      `mod-${type}`,
      `mod-${name}`,
      focused ? 'mod-focused' : null,
      hovering ? 'mod-hovering' : null,
      !value ? 'mod-empty' : null
    );
    return (
      <span
        className={containerClasses}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseOver={this.handleHoverStart}
        onMouseOut={this.handleHoverEnd}
      >
        <input
          checked={checked}
          className={toClassNames('input', `mod-${type}`)}
          name={name}
          onChange={onChange({ name, checked, value })}
          type={type}
          value={value || ''}
        />
        {type === 'checkbox' ? (
          <i className={toClassNames('checked-icon', checked ? 'mod-checked fas fa-check-circle' : 'mod-unchecked')} />
        ) : (
          <i className="input-icon mod-clear fas fa-times" onClick={onChange({ name, checked, value, clear: true })} />
        )}
      </span>
    );
  };

  render() {
    const { className, label, name, type } = this.props;
    return label ? (
      <label className={toClassNames(className, 'input-container', `mod-${type}`, `mod-${name}`)}>
        <span className="label">{label}</span>
        {this.renderInput()}
      </label>
    ) : (
      this.renderInput()
    );
  }
}

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
