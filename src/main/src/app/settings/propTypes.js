import PropTypes from 'prop-types';
import { folderPropType } from '../bookmarks/propTypes';

export const themePropType = PropTypes.shape({
  backgroundColor: PropTypes.string,
});

export const settingsPropType = PropTypes.shape({
  folder: folderPropType, // browser bookmark folder from which to create bookmark tiles
  imagesByUrl: PropTypes.objectOf(PropTypes.string), // bookmark image URLs, keyed by bookmark URL
  initialFolder: folderPropType, // initial browser bookmark folder to show tiles
  sorted: PropTypes.bool, // whether to sort tiles by bookmark title (case insensitive)
  theme: themePropType,
});
