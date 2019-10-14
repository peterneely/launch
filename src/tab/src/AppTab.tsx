import React, { Component } from 'react';
import { Tiles } from './launch/Tiles';
import './appTab.scss';

export class AppTab extends Component {
  render() {
    return (
      <div className="tab">
        <Tiles />
      </div>
    );
  }
  
  
}
