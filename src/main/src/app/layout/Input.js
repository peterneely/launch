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

  eventProps = {
    onBlur: () => {
      this.setState({ focused: false });
    },
    onFocus: () => {
      this.setState({ focused: true });
    },
    onMouseOver: () => {
      this.setState({ hovering: true });
    },
    onMouseOut: () => {
      this.setState({ hovering: false });
    },
  };

  handleClear = event => {
    const { name, onChange, value } = this.props;
    onChange({ name, prevValue: value, clear: true })(event);
    this.input.current.focus();
  };

  renderInput = ({ containerClasses, stateClasses }) => {
    const { autoFocus, dirtyOnChange, name, onChange, onClick, placeholder, renderCommands, type, value } = this.props;
    const isCheckbox = type === 'checkbox';
    const eventProps = containerClasses ? this.eventProps : {};
    return (
      <div className={toClassNames(containerClasses, 'input-wrapper', stateClasses)} {...eventProps}>
        <input
          autoFocus={autoFocus}
          checked={isCheckbox && value}
          className={toClassNames('input', `mod-${type}`, stateClasses)}
          name={name}
          onChange={onChange({ name, prevValue: value, dirty: dirtyOnChange })}
          onClick={onClick({ name, prevValue: value })}
          placeholder={placeholder}
          ref={this.input}
          type={type}
          value={value || ''}
        />
        {isCheckbox ? (
          <i className={toClassNames('checked-icon', value ? 'mod-checked fas fa-check-circle' : 'is-unchecked', stateClasses)} />
        ) : (
          <div className={toClassNames('input-commands', stateClasses)}>
            <i className={toClassNames('input-command-icon', 'mod-clear', 'fas', 'fa-times', stateClasses)} onClick={this.handleClear} />
            {renderCommands(stateClasses)}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { className, label, name, type, value } = this.props;
    const { focused, hovering } = this.state;
    const containerClasses = toClassNames(className, 'input-container', `mod-${type}`, `mod-${name}`);
    const stateClasses = toClassNames(
      focused ? 'is-focused-container' : null,
      hovering ? 'is-hovering-container' : null,
      !value ? 'is-empty' : null
    );
    return label ? (
      <label className={toClassNames(containerClasses, stateClasses)} {...this.eventProps}>
        <span className="label mod-input">{label}</span>
        {this.renderInput({ stateClasses })}
      </label>
    ) : (
      this.renderInput({ containerClasses, stateClasses })
    );
  }
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  dirtyOnChange: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  renderCommands: PropTypes.func, // render other command buttons inside input
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
  dirtyOnChange: true,
  onClick: () => () => {},
  renderCommands: () => {},
  type: 'text',
};

export { Input };
