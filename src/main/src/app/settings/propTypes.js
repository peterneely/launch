import PropTypes from 'prop-types';

export const themePropType = PropTypes.shape({
  backgroundColor: PropTypes.string,
});

export const settingsPropType = PropTypes.shape({
  folderId: PropTypes.string, // browser bookmark folder ID from which to create bookmark tiles
  imagesByUrl: PropTypes.objectOf(PropTypes.string), // bookmark image URLs, keyed by bookmark URL
  sorted: PropTypes.bool, // whether to sort tiles by bookmark title (case insensitive)
  theme: themePropType,
});
