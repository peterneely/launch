import React, { Component } from 'react';
import { Fade } from './layout/Fade';
import { Settings } from './settings/Settings';
import { Tiles } from './tiles/Tiles';
import { getLinkConfigs } from './links';
import './app.scss';

interface IState {
  linkConfigs: string[];
}

interface IProps {}

export class App extends Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
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
          {settingsOpen => <Tiles linkConfigs={linkConfigs} disabled={settingsOpen} />}
        </Settings>
      </Fade>
    );
  }
}
