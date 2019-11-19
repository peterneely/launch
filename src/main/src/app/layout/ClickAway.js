import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ClickAway extends Component {
  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickAway);
  }

  handleClickAway = event => {
    if (this.ref && !this.ref.contains(event.target)) {
      this.props.onClick(event);
    }
  };

  setRef = ref => {
    this.ref = ref;
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children(this.setRef)}</Fragment>;
  }
}

ClickAway.propTypes = {
  children: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { ClickAway };
