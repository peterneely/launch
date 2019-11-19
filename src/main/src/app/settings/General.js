import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../layout/Dropdown';
import { folderPropType } from '../folders/propTypes';
import './general.scss';

class General extends Component {
  componentDidMount() {
    const { loadFolders } = this.props;
    loadFolders();
  }

  handleFolderClear = ({ name, value }) => () => {
    console.log('clear folder', { name, value });
  };

  render() {
    const { folderId, folders, onSelectFolder } = this.props;
    const folderOptions = folders.map(({ id, path }) => ({ value: id, primaryLabel: path }));
    return (
      <div className="general-container">
        <Dropdown name="folder" onClear={this.handleFolderClear} onSelect={onSelectFolder} options={folderOptions} value={folderId} />
        <pre>{JSON.stringify(folders, null, 2)}</pre>
      </div>
    );
  }
}

General.propTypes = {
  folderId: PropTypes.string,
  folders: PropTypes.arrayOf(folderPropType).isRequired,
  loadFolders: PropTypes.func.isRequired,
  onSelectFolder: PropTypes.func.isRequired,
};

export { General };
