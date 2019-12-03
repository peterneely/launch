import React from 'react';
import PropTypes from 'prop-types';
import './tabImagesJson.scss';

const TabImagesJson = ({ imagesByUrl, onChange }) => {
  const imagesJson = JSON.stringify(imagesByUrl, null, 2, true);
  return (
    <div>
      <div className="label mod-sub mod-json">Please note, you can only edit bookmark <span className="italics">images</span> here. Edit bookmarks directly in the browser.</div>
      <textarea className="images-json" onChange={onChange} value={imagesJson} />
    </div>
  );
};

TabImagesJson.propTypes = {
  imagesByUrl: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

export { TabImagesJson };
