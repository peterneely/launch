import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Settings } from './Settings';

export class SettingsActivator extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleToggleSettings = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };
  
  render() {
    const { open } = this.state;
    return (
      <div className="activator-container">
        <i className="activator fas fa-cog" onClick={this.handleToggleSettings}>
          {open && <Settings />}
        </i>
      </div>
    );
  }
};

// SettingsActivator.propTypes = {
//   t: PropTypes.func.isRequired,
// };

// SettingsActivator.defaultProps = {
//   t: key => key,
// };
