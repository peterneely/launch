import React, { Component, Fragment } from 'react';
import { Fade } from './layout/Fade';
import { Settings } from './settings/Settings';
import { Tiles } from './tiles/Tiles';
import { getLinkConfigs } from './links';
import './appTab.scss';

export class AppTab extends Component {
  constructor(props) {
    super(props);
    this.state = { linkConfigs: [] };
  }

  componentDidMount() {
    getLinkConfigs().then(linkConfigs => {
      this.setBackgroundColor();
      this.setState({ linkConfigs });
    });
  }

  setBackgroundColor = () => {
    document.documentElement.classList.add('mod-loaded'); // set background color for html element
  };

  render() {
    const { linkConfigs } = this.state;
    return (
      <Fade show={!!linkConfigs.length} className="app">
        <Settings>
          {({ settingsButton, settingsModal }) => (
            <Fragment>
              {settingsButton}
              <Tiles linkConfigs={linkConfigs} disabled={!!settingsModal} />
              {settingsModal}
            </Fragment>
          )}
        </Settings>
      </Fade>
    );
  }
}
