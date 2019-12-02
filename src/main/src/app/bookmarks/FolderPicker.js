import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import sortBy from 'lodash/sortBy';
import * as bookmarksActions from './actions';
import { Dropdown } from '../layout/Dropdown';
import { folderPropType } from '../bookmarks/propTypes';
import { formatFolderPath } from './actionUtils';

class FolderPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { folderOptions: [] };
  }

  componentDidMount() {
    const { actions: { bookmarks: { loadFolders } = {} } = {}, foldersById } = this.props;
    if (isEmpty(foldersById)) {
      loadFolders();
    } else {
      this.setFolderOptions();
    }
  }

  componentDidUpdate() {
    this.trySetFolderOptions();
  }

  setFolderOptions = () => {
    const { foldersById } = this.props;
    const unorderedFolderOptions = Object.entries(foldersById).map(([value, folders]) => ({ value, primaryLabel: formatFolderPath(folders) }));
    const folderOptions = sortBy(unorderedFolderOptions, 'primaryLabel');
    this.setState({ folderOptions });
  };

  trySetFolderOptions = () => {
    const { foldersById } = this.props;
    const { folderOptions } = this.state;
    if (!folderOptions.length && !isEmpty(foldersById)) {
      this.setFolderOptions();
    }
  };

  handleChangeFolder = ({ name, value: folderId }) => event => {
    const { foldersById, onChange } = this.props;
    const folders = foldersById[folderId];
    const folder = last(folders);
    onChange({ name, value: folder })(event);
  };

  render() {
    const { className, folder: { id: folderId } = {}, foldersById } = this.props;
    const { folderOptions } = this.state;
    const text = formatFolderPath(foldersById[folderId]);
    console.log({ text });
    return (
      <Dropdown className={className} name="folder" onChange={this.handleChangeFolder} options={folderOptions} text={text} value={folderId} />
    );
  }
}

FolderPicker.propTypes = {
  className: PropTypes.string,
  folder: folderPropType,
  foldersById: PropTypes.objectOf(PropTypes.arrayOf(folderPropType)).isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const {
    bookmarks: { foldersById },
  } = state;
  return { foldersById };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    bookmarks: bindActionCreators(bookmarksActions, dispatch),
  },
});

const component = connect(mapStateToProps, mapDispatchToProps)(FolderPicker);

export { component as FolderPicker };
