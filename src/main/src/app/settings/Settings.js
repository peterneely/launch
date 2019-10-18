import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../layout/Button';
import { LinkConfigs } from './LinkConfigs';
import { getLinkConfigs } from '../links';
import { toClassNames } from '../strings';
import './settings.scss';

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { dirty: false, linkConfigs: [], show: false };
  }

  handleBlurModal = () => {
    const { dirty } = this.state;
    if (!dirty) {
      this.handleToggle();
    }
  };

  handleEditConfig = index => event => {
    const { linkConfigs: prevLinkConfigs } = this.state;
    const linkConfigs = [...prevLinkConfigs];
    linkConfigs[index] = { ...linkConfigs[index], image: event.target.value };
    this.setState({ dirty: true, linkConfigs });
  };

  handleSave = () => {
    const { linkConfigs } = this.state;
    const imagesByDomain = linkConfigs.reduce((imagesByDomain, linkImage) => {
      const { domain, image } = linkImage;
      imagesByDomain[domain] = image;
      return imagesByDomain;
    }, {});
    window.chrome.storage.sync.set({ imagesByDomain }, () => {
      window.chrome.storage.sync.get(['imagesByDomain'], results => {
        console.log(results);
      });
    });
  };

  handleToggle = async () => {
    const { show } = this.state;
    if (show) {
      this.setState({ show: false, dirty: false });
    } else {
      this.setState({ show: true });
      const linkConfigs = await getLinkConfigs();
      this.setState({ linkConfigs });
    }
  };

  renderSettingsButton = () => {
    const { show } = this.state;
    const iconClass = toClassNames(
      'button-toggle',
      'fas',
      'fa-cog',
      show ? 'mod-disabled' : null
    );
    return (
      <div className="button-toggle-container">
        <i className={iconClass} onClick={this.handleToggle} />
      </div>
    );
  };

  renderSettingsModal = () => {
    const { dirty, linkConfigs, show } = this.state;
    const createOverlayClass = () =>
      toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null);
    return (
      show && (
        <Fragment>
          <div className="modal">
            <div className="modal-body">
              <LinkConfigs
                linkConfigs={linkConfigs}
                onEditConfig={this.handleEditConfig}
              />
            </div>
            <div className="modal-footer">
              <Button className="button-cancel" label="Cancel" onClick={this.handleToggle} />
              <Button className="button-save" label="Save" onClick={this.handleSave} />
            </div>
          </div>
          <div
            className={createOverlayClass()}
            onClick={this.handleBlurModal}
          />
        </Fragment>
      )
    );
  };

  render() {
    const { children } = this.props;
    const childProps = {
      settingsButton: this.renderSettingsButton(),
      settingsModal: this.renderSettingsModal(),
    };
    return <Fragment> {children(childProps)} </Fragment>;
  }
}

Settings.propTypes = {
  children: PropTypes.func.isRequired,
};
