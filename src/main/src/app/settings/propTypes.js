import PropTypes from 'prop-types';

export const themePropType = PropTypes.shape({
  backgroundColor: PropTypes.string,
});

export const settingsPropType = PropTypes.shape({
  imagesByUrl: PropTypes.objectOf(PropTypes.string),
  sorted: PropTypes.bool,
  theme: themePropType,
});
