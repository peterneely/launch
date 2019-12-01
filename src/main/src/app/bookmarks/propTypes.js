import PropTypes from 'prop-types';

export const bookmarkPropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
});

export const folderPropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
});
