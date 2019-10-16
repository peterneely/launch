import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Links } from './Links';
import { getLinks } from '../links';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }

  componentDidMount() {
    getLinks().then(links => {
      this.setState({ links });
    });
  }

  handleSaveIcons = () => {
    const { links } = this.state;
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

  render() {
    const { links } = this.state;
    return (
      <div className="settings">
        <Links links={links} />
        {!!links.length && <button onClick={this.handleSaveIcons}>Save</button>}
      </div>
    );
  }
}

// Settings.propTypes = {
//   t: PropTypes.func.isRequired,
// };

// Settings.defaultProps = {
//   t: key => key,
// };

export { Settings };
