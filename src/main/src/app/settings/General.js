import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { Dropdown } from '../layout/Dropdown';
import { folderPropType } from '../bookmarks/propTypes';
import { formatFolderPath } from '../bookmarks/factory';
import './general.scss';

class General extends Component {
  constructor(props) {
    super(props);
    this.state = { folderOptions: [] };
  }

  componentDidMount() {
    const { foldersById, loadFolders } = this.props;
    if (isEmpty(foldersById)) {
      loadFolders();
    } else {
      this.setFolderOptions();
    }
  }

  componentDidUpdate(prevProps) {
    this.trySetFolderOptions(prevProps);
  }

  setFolderOptions = () => {
    const { foldersById } = this.props;
    const unorderedFolderOptions = Object.entries(foldersById).map(([id, path]) => ({ value: id, primaryLabel: formatFolderPath(path) }));
    const folderOptions = sortBy(unorderedFolderOptions, 'primaryLabel');
    this.setState({ folderOptions });
  };

  trySetFolderOptions = prevProps => {
    const { foldersById } = this.props;
    const { folderOptions } = this.state;
    if (!folderOptions.length && !isEmpty(foldersById)) {
      this.setFolderOptions();
    }
  };

  render() {
    const { folder: { id: folderId } = {}, foldersById, onChange } = this.props;
    const { folderOptions } = this.state;
    const text = formatFolderPath(foldersById[folderId]);
    return (
      <div className="general-container">
        <Dropdown className="general-folder" name="folderId" onChange={onChange} options={folderOptions} text={text} value={folderId} />
        <pre>{JSON.stringify(folderOptions, null, 2)}</pre>
      </div>
    );
  }
}

General.propTypes = {
  folder: folderPropType,
  foldersById: PropTypes.objectOf(PropTypes.string).isRequired,
  loadFolders: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { General };
