import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import { ClickAway } from './ClickAway';
import './dropdown.scss';
import { toClassNames } from '../strings';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleClickInput = () => event => {
    this.handleToggleMenu(event);
  };

  handleCloseMenu = () => {
    this.setState({ expanded: false });
  };

  handleSelectListItem = itemValue => event => {
    const { name, onChange } = this.props;
    this.handleToggleMenu(event);
    onChange({ name, value: itemValue })(event);
  };

  handleToggleMenu = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  renderToggleButton = stateClasses => {
    const { options } = this.props;
    const { expanded } = this.state;
    const dropdownStateClasses = toClassNames(stateClasses, expanded ? 'is-expanded' : null);
    const iconContainerClass = toClassNames('input-command-button', 'mod-dropdown', dropdownStateClasses);
    const iconClass = toClassNames('input-command-icon', 'mod-dropdown', 'fas', 'fa-chevron-down', dropdownStateClasses);
    return (
      <div className="dropdown-menu-container">
        <div className={iconContainerClass} onClick={this.handleToggleMenu}>
          <i className={iconClass} />
        </div>
        {expanded && (
          <div className="dropdown-menu">
            <ul className="dropdown-list">
              {options.map(({ primaryLabel, value: itemValue }) => {
                return (
                  <li key={itemValue} className="dropdown-list-item" onClick={this.handleSelectListItem(itemValue)}>
                    {primaryLabel}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  };

  render() {
    const { className, name, onChange, value } = this.props;
    return (
      <ClickAway onClick={this.handleCloseMenu}>
        {setTarget => (
          <div className={toClassNames('dropdown-container', className)} ref={setTarget}>
            <Input name={name} onChange={onChange} onClick={this.handleClickInput} renderCommands={this.renderToggleButton} value={value} />
          </div>
        )}
      </ClickAway>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      primaryLabel: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.string,
};

export { Dropdown };
