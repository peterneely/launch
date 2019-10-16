import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Links } from './Links';
import { getLinks } from '../links';
import { toClassNames } from '../strings';
import './settings.scss';

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { dirty: false, links: [], showSettings: false };
  }

  handleBlurModal = () => {
    const { dirty } = this.state;
    if (!dirty) {
      this.handleToggle();
    }
  }

  handleEditIcon = () => {
    this.setState({ dirty: true });
  }

  handleSave = () => {
    const { links } = this.state;
    const iconsByDomain = links.reduce((iconsByDomain, link) => {
      const { domain, icon } = link;
      iconsByDomain[domain] = icon;
      return iconsByDomain;
    }, {});
    window.chrome.storage.sync.set({ iconsByDomain }, () => {
      window.chrome.storage.sync.get(['iconsByDomain'], results => {
        console.log(results);
      });
    });
  };

  handleToggle = () => {
    const { showSettings: prevShowSettings } = this.state;
    const showSettings = !prevShowSettings;
    this.setState({ showSettings });
    if (showSettings) {
      getLinks().then(links => {
        this.setState({ links });
      });
    }
  };

  renderSettingsButton = () => {
    const { showSettings } = this.state;
    return (
      <div className="button-toggle-container">
        <i className={toClassNames('button-toggle', 'fas', 'fa-cog', showSettings ? 'mod-disabled' : null)} onClick={this.handleToggle} />
      </div>
    );
  };

  renderSettingsModal = () => {
    const { dirty, links, showSettings } = this.state;
    const overlayClasses = toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null);
    return (
      showSettings && (
        <Fragment>
          <div className="modal">
            <Links links={links} onEditIcon={this.handleEditIcon} />
            <button className="button-save" onClick={this.handleSave}>Save</button>
          </div>
          <div className={overlayClasses} onClick={this.handleBlurModal} />
        </Fragment>
      )
    );
  };

  render() {
    const { children } = this.props;
    const childProps = {
      settingsButton: this.renderSettingsButton(),
      settingsModal: this.renderSettingsModal()
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
