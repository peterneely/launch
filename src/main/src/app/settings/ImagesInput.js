import React from 'react';
import PropTypes from 'prop-types';

const ImagesInput = ({ imagesByUrl, onChange, onPaste }) => {
  const imagesJson = JSON.stringify(imagesByUrl, null, 2, true);
  return <textarea className="images-input" onChange={onChange} onPaste={onPaste} value={imagesJson} />;
};

ImagesInput.propTypes = {
  imagesByUrl: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
};

export { ImagesInput };
