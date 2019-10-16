import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Settings } from './Settings';

const SettingsModal = props => {
    return (
        <Fragment>
          <div className="modal">
            <Settings />
          </div>
          <div className="modal-overlay" />
        </Fragment>
    );
};

// SettingsModal.propTypes = {
// 	t: PropTypes.func.isRequired
// };

// SettingsModal.defaultProps = {
// 	t: key => key
// };

export { SettingsModal };
