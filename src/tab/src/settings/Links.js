import React from 'react';
import PropTypes from 'prop-types';
import { Link } from './Link';

const Links = ({ links }) => {
  return (
    <div className="links-container">
      <div className="links">
        {links.map((link, index) => {
          return <Link key={index} link={link} />
        })}
      </div>
    </div>
  );
};

Links.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      domain: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired
  ),
  onEditIcon: PropTypes.func.isRequired,
};

// Links.defaultProps = {
// 	t: key => key
// };

export { Links };
