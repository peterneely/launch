import React from 'react';
import PropTypes from 'prop-types';
import { toClassNames } from '../strings';
import './checkedIcon.scss';

const CheckedIcon = ({ checked, onChange }) => (
  <span className="checkbox-input-icon-container" onClick={onChange}>
    <i className={toClassNames('checkbox-input-icon', checked ? 'fas fa-check-circle mod-checked' : 'mod-unchecked')} />
  </span>
);

CheckedIcon.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { CheckedIcon };
