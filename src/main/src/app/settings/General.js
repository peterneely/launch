import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FolderPicker } from '../bookmarks/FolderPicker';
import { folderPropType } from '../bookmarks/propTypes';
import './general.scss';

class General extends Component {
  render() {
    const { folder, onChange } = this.props;
    return (
      <div className="general-container">
        <FolderPicker className="general-folder" folder={folder} onChange={onChange} />
      </div>
    );
  }
}

General.propTypes = {
  folder: folderPropType,
  onChange: PropTypes.func.isRequired,
};

export { General };
