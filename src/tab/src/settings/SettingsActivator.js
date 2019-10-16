import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import './settings.scss';

export class SettingsActivator extends Component {
  constructor(props) {
    super(props);
    this.state = { showSettings: false };
  }

  handleToggleSettings = () => {
    const { showSettings } = this.state;
    this.setState({ showSettings: !showSettings });
  };

  renderActivator = () => (
    <div className="activator-container">
      <i className="activator fas fa-cog" onClick={this.handleToggleSettings} />
    </div>
  );
  
  render() {
    const { children } = this.props;
    const { showSettings } = this.state;
    return (
      <Fragment>{children(this.renderActivator, showSettings)}</Fragment>
    );
  }
};

// SettingsActivator.propTypes = {
//   t: PropTypes.func.isRequired,
// };

// SettingsActivator.defaultProps = {
//   t: key => key,
// };
