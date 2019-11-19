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

  handleInputChange = ({ name, value, clear }) => event => {
    const { onClear } = this.props;
    if (clear) {
      onClear({ name, value })(event);
    }
  };

  handleInputClick = () => event => {
    this.handleMenuToggle(event);
  };

  handleListItemSelect = itemValue => event => {
    const { name, onSelect } = this.props;
    this.handleMenuToggle(event);
    onSelect({ name, value: itemValue })(event);
  };

  handleMenuToggle = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { name, options, value } = this.props;
    const { expanded } = this.state;
    return (
      <div className="dropdown-container">
        <Input name={name} onChange={this.handleInputChange} onClick={this.handleInputClick} value={value} />
        {expanded && (
          <ClickAway onClick={this.handleMenuToggle}>
            {setRef => (
              <div className="dropdown-menu">
                <ul className="dropdown-list" ref={setRef}>
                  {options.map(({ primaryLabel, value: itemValue }) => {
                    return (
                      <li key={itemValue} className="dropdown-list-item" onClick={this.handleListItemSelect(itemValue)}>
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
  onClear: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      primaryLabel: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.string,
};

export { Dropdown };
