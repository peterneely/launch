import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export const Fade = ({ children, className, show }) => (
  <CSSTransition in={show} timeout={200} classNames="mod">
    <div className={className}>
      {show && children}
    </div>
  </CSSTransition>
);

Fade.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
	show: PropTypes.bool,
};
