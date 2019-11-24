import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ClickAway extends Component {
  constructor(props) {
    super(props);
    this.targets = [];
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickAway);
  }

  handleClickAway = event => {
    if (this.targets.length && this.targets.every(ref => !ref.contains(event.target))) {
      this.props.onClick(event);
    }
  };

  setTarget = ref => {
    this.targets.push(ref);
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children(this.setTarget)}</Fragment>;
  }
}

ClickAway.propTypes = {
  children: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { ClickAway };
