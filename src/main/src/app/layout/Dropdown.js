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
    console.log('handleClickInput');
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
    const { expanded } = this.state;
    const iconContainerClass = toClassNames('input-command-button', 'mod-dropdown', stateClasses);
    const iconClass = toClassNames('input-command-icon', 'fas', 'fa-chevron-down', expanded ? 'is-expanded' : null);
    return (
      <span className={iconContainerClass} onClick={this.handleToggleMenu}>
        <i className={iconClass} />
      </span>
    );
  };

  render() {
    const { className, name, onChange, options, title, value } = this.props;
    const { expanded } = this.state;
    return (
      <ClickAway onClick={this.handleCloseMenu}>
        {setTarget => (
          <div className={toClassNames('dropdown-container', className)} ref={setTarget}>
            <Input name={name} onChange={onChange} onClick={this.handleClickInput} renderCommands={this.renderToggleButton} value={value} />
            {expanded && (
              <div className="dropdown-menu">
                {/* <div className="dropdown-header label mod-sub">{title}</div> */}
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
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export { Dropdown };
