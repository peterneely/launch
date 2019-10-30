import React from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';

const SettingsButton = ({ onClick, showSettings }) => {
  const iconClass = toClassNames('button-toggle', 'fas', 'fa-cog', showSettings ? 'mod-disabled' : null);
  return (
    <div className="button-toggle-container">
      <i className={iconClass} onClick={onClick} />
    </div>
  );
};

SettingsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  showSettings: PropTypes.bool
};

export { SettingsButton };
