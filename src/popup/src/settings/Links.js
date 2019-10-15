import React from 'react';
import PropTypes from 'prop-types';
import { Link } from './Link';

const Links = ({ links }) => {
  const handleSaveIcons = () => {
    const iconsByDomain = links.reduce((iconsByDomain, link) => {
      const { domain, icon } = link;
      iconsByDomain[domain] = icon;
      return iconsByDomain;
    }, {});
    window.chrome.storage.sync.set({ iconsByDomain }, () => {
      window.chrome.storage.sync.get(['iconsByDomain'], results => {
        console.log(results);
      });
    });
  };
  return (
    <div className="links">
      {links.map((link, index) => {
        return <Link key={index} link={link} />
      })}
      <button onClick={handleSaveIcons}>Save</button>
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
};

// Links.defaultProps = {
// 	t: key => key
// };

export { Links };
