import React from 'react';
import PropTypes from 'prop-types';

const ImagesInput = ({ imagesByUrl }) => {
  const imagesJson = JSON.stringify(imagesByUrl, null, 2, true);
  return <textarea className="images-input">{imagesJson}</textarea>;
};

ImagesInput.propTypes = {
  className: PropTypes.string,
  imagesByUrl: PropTypes.objectOf(PropTypes.string),
};

ImagesInput.defaultProps = {
  t: key => key,
};

export { ImagesInput };
