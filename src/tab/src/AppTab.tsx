import React, { Component } from 'react';
import { Tiles } from './tiles/Tiles';
import { SettingsActivator } from './settings/SettingsActivator';
import './appTab.scss';

export class AppTab extends Component {
  render() {
    return <div className="app"><SettingsActivator /><Tiles /></div>;
  }
}
