import PropTypes from 'prop-types';

export const tilePropType = PropTypes.shape({
  title: PropTypes.string.isRequired, // tile title
  url: PropTypes.string.isRequired, // tile URL to launch
  domain: PropTypes.string.isRequired, // tile URL domain
  image: PropTypes.string, // tile image URL
});
