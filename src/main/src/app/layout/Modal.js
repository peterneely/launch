import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../layout/Button';
import { toClassNames } from '../utils/strings';
import './modal.scss';

const Modal = ({ body, dirty, onClose, onSubmit, title }) => {
  const handleBlur = event => {
    if (!dirty) {
      onClose(event);
    }
  };
  const handleSave = event => {
    onSubmit(event);
    onClose(event);
  };
  const overlayClasses = toClassNames('modal-overlay', !dirty ? 'mod-clickable' : null);
  return (
    <Fragment>
      <div className="modal">
        <div className="modal-content mod-top">
          <div className="modal-header">
            <h1 className="label label-title">{title}</h1>
            <Button className="button-close" icon={<i className="fas fa-times icon-close" />} onClick={onClose} />
          </div>
          <div className="modal-body">{body}</div>
        </div>
        <div className="modal-footer modal-content mod-bottom">
          <Button className="button-cancel" label="Cancel" onClick={onClose} />
          <Button className="button-save" label="Save" onClick={handleSave} primary disabled={!dirty} />
        </div>
      </div>
      <div className={overlayClasses} onClick={handleBlur} />
    </Fragment>
  );
};

Modal.propTypes = {
  body: PropTypes.node.isRequired,
  dirty: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
};

export { Modal };
