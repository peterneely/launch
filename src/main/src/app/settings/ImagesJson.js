import React from 'react';
import PropTypes from 'prop-types';
import './imagesJson.scss';

const ImagesJson = ({ imagesByUrl, onChange, onPaste }) => {
  const imagesJson = JSON.stringify(imagesByUrl, null, 2, true);
  return <textarea className="images-json" onChange={onChange} onPaste={onPaste} value={imagesJson} />;
};

ImagesJson.propTypes = {
  imagesByUrl: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
};

export { ImagesJson };
