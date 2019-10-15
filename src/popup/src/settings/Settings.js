import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Links } from './Links';
import { getLinks } from '../links';
import './settings.scss';

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
  render() {
    const { links } = this.state;
    return (
      <div className="settings">
        <Links links={links} />
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
