import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { SettingsContent } from './SettingsContent';
import { toClassNames } from '../strings';
import './settings.scss';

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { dirty: false, showSettings: false };
  }

  handleToggle = () => {
    const { showSettings } = this.state;
    this.setState({ showSettings: !showSettings });
  };

  renderSettingsButton = () => {
    const { showSettings } = this.state;
    return (
      <div className="button-container">
        <i className={toClassNames('button', 'fas', 'fa-cog', showSettings ? 'mod-disabled' : null)} onClick={this.handleToggle} />
      </div>
    );
  };

  renderSettingsModal = () => {
    const { dirty, showSettings } = this.state;
    return (
      showSettings && (
        <Fragment>
          <div className="modal">
            <SettingsContent />
          </div>
          <div className={toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null)} onClick={!dirty ? this.handleToggle : undefined} />
        </Fragment>
      )
    );
  };

  render() {
    const { children } = this.props;
    const { showSettings } = this.state;
    const childProps = {
      renderSettingsButton: this.renderSettingsButton,
      renderSettingsModal: this.renderSettingsModal,
      settingsModalOpen: showSettings
    };
    return <Fragment> {children(childProps)} </Fragment>;
  }
}

// Settings.propTypes = {
//   t: PropTypes.func.isRequired,
// };

// Settings.defaultProps = {
//   t: key => key,
// };
