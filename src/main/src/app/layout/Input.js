import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './input.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false, hovering: false };
    this.input = createRef();
  }

  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleClear = event => {
    const { name, onChange, value } = this.props;
    onChange({ name, prevValue: value, clear: true })(event);
    this.input.current.focus();
  }

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleHoverEnd = () => {
    this.setState({ hovering: false });
  };

  handleHoverStart = () => {
    this.setState({ hovering: true });
  };

  renderInput = containerClasses => {
    const { autoFocus, name, onChange, onClick, placeholder, type, value } = this.props;
    const { focused, hovering } = this.state;
    const isCheckbox = type === 'checkbox';
    const classes = toClassNames(
      containerClasses,
      'input-wrapper',
      focused ? 'mod-focused' : null,
      hovering ? 'mod-hovering' : null,
      !value ? 'mod-empty' : null
    );
    return (
      <span
        className={classes || undefined}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseOver={this.handleHoverStart}
        onMouseOut={this.handleHoverEnd}
      >
        <input
          autoFocus={autoFocus}
          checked={isCheckbox && value}
          className={toClassNames('input', `mod-${type}`)}
          name={name}
          onChange={onChange({ name, prevValue: value })}
          onClick={onClick({ name, prevValue: value })}
          placeholder={placeholder}
          ref={this.input}
          type={type}
          value={value || ''}
        />
        {isCheckbox ? (
          <i className={toClassNames('checked-icon', value ? 'mod-checked fas fa-check-circle' : 'mod-unchecked')} />
        ) : (
          <i className="input-icon mod-clear fas fa-times" onClick={this.handleClear} />
        )}
      </span>
    );
  };

  render() {
    const { className, label, name, type } = this.props;
    const containerClasses = toClassNames(className, 'input-container', `mod-${type}`, `mod-${name}`);
    return label ? (
      <label className={containerClasses}>
        <span className="label mod-input">{label}</span>
        {this.renderInput()}
      </label>
    ) : (
      this.renderInput(containerClasses)
    );
  }
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
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
  onClick: () => () => {},
};

export { Input };
