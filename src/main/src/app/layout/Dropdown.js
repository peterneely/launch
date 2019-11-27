import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import { ClickAway } from './ClickAway';
import './dropdown.scss';
import { toClassNames } from '../strings';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.selectedOptionElement = null;
    this.state = { expanded: false };
  }

  componentDidUpdate(prevProps, prevState) {
    this.tryScrollToOption(prevState);
  }

  handleChange = props => event => {
    const { onChange } = this.props;
    if (props.clear) {
      this.setState({ expanded: true });
    }
    onChange({ ...props, clear: true })(event);
  };

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
    const { options, value } = this.props;
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
              {options.map(({ value: itemValue, primaryLabel }) => {
                const selected = itemValue === value;
                const className = toClassNames('dropdown-list-item', selected ? 'is-selected' : null);
                return (
                  <li
                    key={itemValue}
                    className={className}
                    onClick={this.handleSelectListItem(itemValue)}
                    ref={this.setOptionRef(selected)}
                  >
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

  setOptionRef = selected => ref => {
    if (selected) {
      this.selectedOptionElement = ref;
    }
  };

  tryScrollToOption = prevState => {
    const { expanded } = this.state;
    const { expanded: prevExpanded } = prevState;
    if (this.selectedOptionElement && expanded && !prevExpanded) {
      this.selectedOptionElement.scrollIntoView({ block: 'center' });
    }
  };

  render() {
    const { className, name, text } = this.props;
    return (
      <ClickAway onClick={this.handleCloseMenu}>
        {setTarget => (
          <div className={toClassNames('dropdown-container', className)} ref={setTarget}>
            <Input
              name={name}
              onChange={this.handleChange}
              onClick={this.handleClickInput}
              renderCommands={this.renderToggleButton}
              value={text}
            />
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
  text: PropTypes.string, // text to show in the dropdown
  value: PropTypes.string, // value of selected dropdown item
};

export { Dropdown };
