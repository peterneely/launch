import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const LinkConfigs = ({ linkConfigs, onEditConfig }) => {
  return (
    <div className="link-configs">
      {linkConfigs.map((linkConfig, index) => {
        const { title, domain, image } = linkConfig;
        return (
          <Fragment key={index}>
            <div className="link-config mod-title">{title}</div>
            <div className="link-config mod-domain">{domain}</div>
            <input
              className="link-config mod-image"
              type="text"
              value={image}
              onChange={onEditConfig(index)}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

LinkConfigs.propTypes = {
  linkConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      domain: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
  onEditConfig: PropTypes.func.isRequired,
};

export { LinkConfigs };
