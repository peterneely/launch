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

  handleSelectListItem = itemValue => event => {
    const { name, onChange } = this.props;
    this.handleToggleMenu(event);
    onChange({ name, value: itemValue })(event);
  };

  handleToggleMenu = event => {
    // event.stopPropagation();
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  renderToggleButton = stateClasses => {
    const className = toClassNames('input-command-icon', 'mod-dropdown', 'fas', 'fa-caret-down', stateClasses);
    return <i className={className} onClick={this.handleToggleMenu} />;
  };

  render() {
    const { className, name, onChange, options, title, value } = this.props;
    const { expanded } = this.state;
    return (
      <div className={toClassNames('dropdown-container', className)}>
        <Input name={name} onChange={onChange} onClick={this.handleClickInput} renderCommands={this.renderToggleButton} value={value} />
        {expanded && (
          <ClickAway onClick={this.handleToggleMenu}>
            {setRef => (
              <div className="dropdown-menu">
                {/* <div className="dropdown-header label mod-sub">{title}</div> */}
                <ul className="dropdown-list" ref={setRef}>
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
          </ClickAway>
        )}
      </div>
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
