import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { Dropdown } from '../layout/Dropdown';
import './general.scss';

class General extends Component {
  constructor(props) {
    super(props);
    this.state = { folderOptions: [] };
  }

  componentDidMount() {
    const { loadFolders } = this.props;
    loadFolders();
  }

  componentDidUpdate(prevProps) {
    this.trySetFolderOptions(prevProps);
  }

  trySetFolderOptions = prevProps => {
    const { foldersById } = this.props;
    const { folderOptions } = this.state;
    if (isEmpty(folderOptions) && !isEmpty(foldersById)) {
      const unorderedFolderOptions = Object.entries(foldersById).map(([id, path]) => ({ value: id, primaryLabel: path }));
      const folderOptions = sortBy(unorderedFolderOptions, 'primaryLabel');
      this.setState({ folderOptions });
    }
  }

  render() {
    const { folderId, foldersById, onChange } = this.props;
    const { folderOptions } = this.state;
    return (
      <div className="general-container">
        <Dropdown name="folderId" onChange={onChange} options={folderOptions} value={foldersById[folderId]} />
        <pre>{JSON.stringify(folderOptions, null, 2)}</pre>
      </div>
    );
  }
}

General.propTypes = {
  folderId: PropTypes.string,
  foldersById: PropTypes.objectOf(PropTypes.string).isRequired,
  loadFolders: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { General };
