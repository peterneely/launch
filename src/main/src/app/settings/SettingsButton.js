import React from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';

const SettingsButton = ({ disabled, onClick }) => {
  const iconClass = toClassNames('button-toggle', 'fas', 'fa-cog', disabled ? 'mod-disabled' : null);
  return (
    <div className="button-toggle-container">
      <i className={iconClass} onClick={onClick} />
    </div>
  );
};

SettingsButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export { SettingsButton };
