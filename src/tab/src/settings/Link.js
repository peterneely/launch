import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Link = ({ link }) => {
  const { title, domain, icon } = link;
  // console.log(link, { title, domain, icon });
  return (
        <Fragment>
            <div className="link-column mod-title">{title}</div>
            <div className="link-column mod-domain">{domain}</div>
            <input className="link-column mod-icon" type="text" value={icon}/>
        </Fragment>
    );
};

Link.propTypes = {
	link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

// Link.defaultProps = {
// 	t: key => key
// };

export { Link };
