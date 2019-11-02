import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './input.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { blurring: false, focused: false };
  }

  componentDidUpdate() {
    const { blurring, focused } = this.state;
    if (blurring && focused) {
      this.willBlur = setTimeout(() => {
        this.willBlur = null;
        this.setState({ blurring: false, focused: false });
      }, 300);
    }
  }

  componentWillUnmount() {
    if (this.willBlur) {
      clearTimeout(this.willBlur);
      this.willBlur = null;
    }
  }

  handleBlur = () => {
    this.setState({ blurring: true });
  };

  handleClear = event => {
    const { checked, name, onChange, value } = this.props;
    onChange({ name, checked, value, clear: true })(event);
  };

  handleFocus = () => {
    this.setState({ blurring: false, focused: true });
  };

  renderInput = () => {
    const { checked, className, name, onChange, type, value } = this.props;
    const { blurring, focused } = this.state;
    const containerClasses = toClassNames(
      className,
      'input-container',
      `mod-${type}`,
      `mod-${name}`,
      focused ? 'mod-focused' : null,
      blurring ? 'mod-blurring' : null,
      !value ? 'mod-empty' : null
    );
    return (
      <span className={containerClasses} onBlur={this.handleBlur} onFocus={this.handleFocus}>
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
          <i className="input-icon icon-close fas fa-times" onClick={this.handleClear} />
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
