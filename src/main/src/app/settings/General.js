import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { folderPropType } from '../folders/propTypes';
import './general.scss';

class General extends Component {
  componentDidMount() {
    const { loadFolders } = this.props;
    loadFolders();
  }

  render() {
    const { folders } = this.props;
    return (
      <div className="general-container">
        <pre>{JSON.stringify(folders, null, 2)}</pre>
      </div>
    );
  }
}

General.propTypes = {
  folders: PropTypes.arrayOf(folderPropType).isRequired,
  loadFolders: PropTypes.func.isRequired,
};

export { General };
