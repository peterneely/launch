import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import { ClickAway } from './ClickAway';
import './dropdown.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleClickInput = () => event => {
    this.handleToggleMenu(event);
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

  render() {
    const { name, onChange, options, value } = this.props;
    const { expanded } = this.state;
    return (
      <div className="dropdown-container">
        <Input name={name} onChange={onChange} onClick={this.handleClickInput} value={value} />
        {expanded && (
          <ClickAway onClick={this.handleToggleMenu}>
            {setRef => (
              <div className="dropdown-menu">
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
