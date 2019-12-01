import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../utils/strings';
import './tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: props.index };
  }

  componentDidUpdate(prevProps) {
    const { index } = this.props;
    if (index !== prevProps.index) {
      this.setState({ activeIndex: index });
    }
  }

  handleClickTab = index => () => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { tabConfigs } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="tabs-container">
        <div className="tabs">
          {tabConfigs.map(({ disabled, renderTitle }, index) => (
            <div
              className={toClassNames('tab', index === activeIndex ? 'mod-active' : null, disabled ? 'is-disabled' : null)}
              key={index}
              onClick={disabled ? undefined : this.handleClickTab(index)}
            >
              {renderTitle()}
            </div>
          ))}
        </div>
        <div className="tab-body">{tabConfigs[activeIndex].renderBody()}</div>
      </div>
    );
  }
}

Tabs.propTypes = {
  index: PropTypes.number,
  tabConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      renderTitle: PropTypes.func.isRequired,
      renderBody: PropTypes.func.isRequired,
    })
  ).isRequired,
};

Tabs.defaultProps = {
  index: 0,
};

export { Tabs };
