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
    const { checked, name, onChange, value } = this.props;
    onChange({ name, checked, value, clear: true })(event);
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

  styles = {
    createContainerClasses: () => {
      const { className, name, type, value } = this.props;
      const { focused, hovering } = this.state;
      return toClassNames(
        className,
        'input-container',
        `mod-${type}`,
        `mod-${name}`,
        focused ? 'mod-focused' : null,
        hovering ? 'mod-hovering' : null,
        !value ? 'mod-empty' : null
      );
    },
  };

  renderInput = () => {
    const { autoFocus, checked, name, onChange, placeholder, type, value } = this.props;
    return (
      <span
        className={this.styles.createContainerClasses()}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseOver={this.handleHoverStart}
        onMouseOut={this.handleHoverEnd}
      >
        <input
          autoFocus={autoFocus}
          checked={checked}
          className={toClassNames('input', `mod-${type}`)}
          name={name}
          onChange={onChange({ name, checked, value })}
          placeholder={placeholder}
          ref={this.input}
          type={type}
          value={value || ''}
        />
        {type === 'checkbox' ? (
          <i className={toClassNames('checked-icon', checked ? 'mod-checked fas fa-check-circle' : 'mod-unchecked')} />
        ) : (
          <i className="input-icon mod-clear fas fa-times" onClick={this.handleClear} />
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
  autoFocus: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
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
};

export { Input };
