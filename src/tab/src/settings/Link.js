import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Link = ({ link }) => {
  const { title, domain, image } = link;
  return (
        <Fragment>
            <div className="link-column mod-title">{title}</div>
            <div className="link-column mod-domain">{domain}</div>
            <input className="link-column mod-image" type="text" value={image}/>
        </Fragment>
    );
};

Link.propTypes = {
	link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

// Link.defaultProps = {
// 	t: key => key
// };

export { Link };
