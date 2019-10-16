import React, { Component, Fragment } from 'react';
import { Fade } from './layout/Fade';
import { Settings } from './settings/Settings';
import { Tiles } from './tiles/Tiles';
import { getLinks } from './links';
import './appTab.scss';

export class AppTab extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }

  componentDidMount() {
    getLinks().then(links => {
      this.setBackgroundColor();
      this.setState({ links });
    });
  }

  setBackgroundColor = () => {
    document.documentElement.classList.add('mod-loaded'); // set background color for html element
  };

  render() {
    const { links } = this.state;
    return (
      <Fade show={!!links.length} className="app">
        <Settings>
          {({ renderSettingsButton, renderSettingsModal, settingsModalOpen }) => (
            <Fragment>
              {renderSettingsButton()}
              <Tiles links={links} disabled={settingsModalOpen} />
              {renderSettingsModal()}
            </Fragment>
          )}
        </Settings>
      </Fade>
    );
  }
}
