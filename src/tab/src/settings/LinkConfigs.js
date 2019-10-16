import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const LinkConfigs = ({ linkConfigs }) => {
  return (
    <div className="link-configs-container">
      <div className="link-configs">
        {linkConfigs.map((linkConfig, index) => {
          const { title, domain, image } = linkConfig;
          return (
              <Fragment key={index}>
                  <div className="link-config mod-title">{title}</div>
                  <div className="link-config mod-domain">{domain}</div>
                  <input className="link-config mod-image" type="text" value={image}/>
              </Fragment>
          )
        })}
      </div>
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
  onEditImage: PropTypes.func.isRequired,
};

// LinkConfigs.defaultProps = {
// 	t: key => key
// };

export { LinkConfigs };
