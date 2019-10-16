import React, { Component, Fragment } from 'react';
import { Tiles } from './tiles/Tiles';
import { SettingsActivator } from './settings/SettingsActivator';
import { SettingsModal } from './settings/SettingsModal';
import './appTab.scss';

export class AppTab extends Component {
  render() {
    return (
      <div className="app">
        <SettingsActivator>
          {(renderActivator, showSettings) => (
            <Fragment>
              {renderActivator()}
              <Tiles />
              {showSettings && <SettingsModal />}
            </Fragment>
          )}
        </SettingsActivator>
      </div>
    );
  }
}
