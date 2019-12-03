import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FolderPicker } from '../bookmarks/FolderPicker';
import { folderPropType } from '../bookmarks/propTypes';
import './tabGeneral.scss';

class TabGeneral extends Component {
  render() {
    const { folder, onChange } = this.props;
    return (
      <div className="general-container">
        <FolderPicker className="general-folder" folder={folder} onChange={onChange} />
      </div>
    );
  }
}

TabGeneral.propTypes = {
  folder: folderPropType,
  onChange: PropTypes.func.isRequired,
};

export { TabGeneral };
