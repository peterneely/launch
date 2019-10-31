import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: props.controlledIndex };
  }

  componentDidUpdate(prevProps) {
    const { controlledIndex } = this.props;
    if (controlledIndex !== prevProps.controlledIndex) {
      this.setState({ activeIndex: controlledIndex });
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
          {tabConfigs.map(({ renderTitle }, index) => (
            <div
              className={toClassNames('tab', index === activeIndex ? 'mod-active' : null)}
              key={index}
              onClick={this.handleClickTab(index)}
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
  controlledIndex: PropTypes.number,
  tabConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      renderTitle: PropTypes.func.isRequired,
      renderBody: PropTypes.func.isRequired,
    })
  ).isRequired,
};

Tabs.defaultProps = {
  controlledIndex: 0,
};

export { Tabs };
