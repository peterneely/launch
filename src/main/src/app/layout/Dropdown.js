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

  handleToggleOptions = () => () => {
    console.log('handleToggleOptions');
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { name, onSelect, options, value } = this.props;
    const { expanded } = this.state;
    return (
      <div className="dropdown-container">
        <Input name={name} onChange={() => () => {}} onClick={this.handleToggleOptions} value={value} />
        {expanded && (
          <ClickAway onClick={this.handleToggleOptions()}>
            {setRef => (
              <div className="dropdown-menu">
                <ul className="dropdown-list" ref={setRef}>
                  {options.map(({ primaryLabel, value }) => {
                    return (
                      <li key={value} className="dropdown-list-item" onClick={onSelect({ name, value })}>
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
