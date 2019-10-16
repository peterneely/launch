import React, { Component, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Tiles } from './tiles/Tiles';
import { Settings } from './settings/Settings';
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
    const hasLinks = !!links.length;
    return (
      <CSSTransition in={hasLinks} timeout={200} classNames="app-container">
        <div className="app">
          {hasLinks && (
            <Settings>
              {({ renderSettingsButton, renderSettingsModal, settingsModalOpen }) => (
                <Fragment>
                  {renderSettingsButton()}
                  <Tiles links={links} disabled={settingsModalOpen} />
                  {renderSettingsModal()}
                </Fragment>
              )}
            </Settings>
          )}
        </div>
      </CSSTransition>
    );
  }
}
